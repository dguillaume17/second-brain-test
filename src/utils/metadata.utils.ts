import { DocMetadata } from '@docusaurus/plugin-content-docs';
import { CustomDocMetadata } from '../models/note-metadata/custom-doc-metadata.model';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { Slug } from '../models/slug.model';

export namespace MetadataUtils {
    export function castDocMetaDataAsCustomDocMetadata(docMetadata: DocMetadata): CustomDocMetadata {
        const relativeFilePath = docMetadata.source.replace('@site/', '');
        const filePath = path.join(process.cwd(), relativeFilePath);
        const content = fs.readFileSync(filePath, 'utf-8');

        const { data: frontMatter, content: markdownContent } = matter(content);

        const slug = new Slug(docMetadata.slug);

        return new CustomDocMetadata(
            markdownContent,
            filePath,
            docMetadata.title,
            slug,
            frontMatter as any
        );
    }
}
