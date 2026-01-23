import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
const webpack = require('webpack'); // <--- Ajoutez cette ligne
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
// import DocsList from './src/pages/docs-list';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

function getAllMarkdownFiles(dir: string, baseDir = dir): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...getAllMarkdownFiles(fullPath, baseDir));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      // chemin relatif depuis docs
      files.push(path.relative(baseDir, fullPath));
    }
  }

  return files;
}

const config: Config = {
    plugins: [
  [
    require.resolve('@cmfcmf/docusaurus-search-local'),
    {
      indexDocs: true,       // indexer la doc
      indexPages: true,      // indexer les pages
      indexBlog: false,
      language: "fr",        // langue
      style: undefined,      // utiliser le style par défaut
    },
  ],
  

  function myPlugin(context, options) {
      return {
        name: 'docusaurus-extended-fallbacks',
        configureWebpack(config, isServer, utils) {
          return {
            resolve: {
              fallback: {
                // Les nouveaux venus :
                // "os": require.resolve("os-browserify/browser"),
                // "crypto": require.resolve("crypto-browserify"),

                // // --- Modules avec Polyfills ---
                // "assert": require.resolve("assert/"),
                // "constants": require.resolve("constants-browserify"),
                // "tty": require.resolve("tty-browserify"),
                // "vm": require.resolve("vm-browserify"),
                // "path": require.resolve("path-browserify"), // déjà vu précédemment
                // "stream": require.resolve("stream-browserify"),
                // "buffer": require.resolve("buffer/"),
                
                // // --- Modules SANS Polyfills (On les désactive) ---
                // // Ces modules sont liés au système et ne peuvent pas tourner dans Chrome/Firefox
                // "async_hooks": false,
                // "module": false,
                // "v8": false,
                // "perf_hooks": false,
                // "readline": false,
                // "fs": false,
                // "net": false,
                // "tls": false,
                // "child_process": false,
              },
            },
            plugins: [
            //   new webpack.ProvidePlugin({
            //     process: 'process/browser',
            //     Buffer: ['buffer', 'Buffer'],
            //   }),
            ],
          };
        },
      };
    },
    function myMetadataPlugin(context, options) {
      return {
        name: 'my-metadata-plugin',
        async contentLoaded({ content, actions, ...rest }) {
            const { setGlobalData } = actions;

        const docsDir = path.join(process.cwd(), 'docs'); // ton dossier docs
        const mdFiles = getAllMarkdownFiles(docsDir);

       const docsData: DocData[] = mdFiles
        .map(relPath => {
            const fullPath = path.resolve(docsDir, relPath);
            const raw = fs.readFileSync(fullPath, 'utf-8');
            const { data: frontMatter } = matter(raw);
            if (!frontMatter.id) return null; // skip files sans id
            return { filePath: relPath, frontMatter };
        })
        .filter(Boolean) as DocData[];

        setGlobalData({ docs: docsData });
        },
      };
    },
],
  title: 'My Site',
  tagline: 'Dinosaurs are cool',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://dguillaume17.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/second-brain-test/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'dguillaume17', // Usually your GitHub org/user name.
  projectName: 'second-brain-test', // Usually your repo name.

  onBrokenLinks: 'throw',
  trailingSlash: false,

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
        //   docRootComponent: require.resolve('./src/pages/docs-list.tsx'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
            async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
          const sidebarItems = await defaultSidebarItemsGenerator(args);
          
          // On parcourt les items pour leur injecter les métadonnées YAML
          return sidebarItems.map((item) => {
            if (item.type === 'doc') {
              // On récupère le frontMatter du document et on le met dans customProps
              return {
                ...item,
                customProps: {
                  ...args.docs.find(d => d.id === item.id)?.frontMatter
                },
              };
            }
            return item;
          });
        },
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'My Site',
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Tutorial',
        },
        {
          href: 'https://github.com/facebook/docusaurus',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
