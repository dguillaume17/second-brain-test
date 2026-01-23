import React, { useRef, useState } from 'react';
import OriginalComponents from '@theme-original/MDXComponents';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

export default {
  ...OriginalComponents,

  wrapper: function({ children }) {
    let doc;
    try {
        // On tente de récupérer le contexte de la doc
        doc = useDoc();
    } catch (e) {
        // Si on n'est pas dans une "Doc", on rend le contenu normalement sans les boutons
        return <>{children}</>;
    }

    const containerRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    if (!doc.metadata.slug.startsWith('/actions')) {
        return <>{children}</>;
    }

    // --- LOGIQUE COMMUNE : Extraction des fichiers ---
    const getFiles = () => {
      if (!containerRef.current) return [];
      const codeContainers = containerRef.current.querySelectorAll('[class*="codeBlockContainer"]');
      
      return Array.from(codeContainers).map((container) => {
        const titleElement = container.querySelector('[class*="codeBlockTitle"]');
        const codeElement = container.querySelector('pre');
        if (!titleElement || !codeElement) return null;

        return {
          name: titleElement.textContent?.trim() || 'file.ts',
          content: codeElement.innerText
        };
      }).filter(item => item !== null) as {name: string, content: string}[];
    };

    // --- BOUTON POWERSHELL (Existant) ---
    const handleCopyPS = async () => {
      const files = getFiles();
      if (files.length === 0) return;

      const psDictionary = files.map(f => `"${f.name}"="${btoa(unescape(encodeURIComponent(f.content)))}"`).join('; ');
      const rawScript = `$f=@{${psDictionary}}; $f.GetEnumerator() | % { $p=$_.Key; $d=Split-Path $p; if($d -and !(Test-Path $d)){mkdir $d -Force | Out-Null}; $bytes=[Convert]::FromBase64String($_.Value); [IO.File]::WriteAllBytes((Join-Path (Get-Location) $p), $bytes); Write-Host "✔ Créé : $p" -ForegroundColor Green }`;
      
      const byteArray = new Uint8Array(new Uint16Array([...rawScript].map(c => c.charCodeAt(0))).buffer);
      let binary = '';
      byteArray.forEach(b => binary += String.fromCharCode(b));
      
      try {
        await navigator.clipboard.writeText(`powershell -EncodedCommand ${btoa(binary)}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) { console.error(err); }
    };

    // --- NOUVEAU : BOUTON STACKBLITZ ---
    const handleOpenStackBlitz = () => {
    const files = getFiles();
    if (files.length === 0) return;

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://stackblitz.com/run?view=preview';
    form.target = '_blank';

    const params: any = {
        'project[title]': `Action : ${doc.metadata.title}`,
        'project[description]': 'Généré depuis la documentation',
        'project[template]': 'typescript'
    };

    // Ajouter tous les fichiers du MDX
    files.forEach(file => {
        params[`project[files][${file.name}]`] = file.content;
    });

    // Ajouter index.ts si nécessaire
    if (!files.some(f => f.name === 'index.ts')) {
        const firstFile = files[0].name.replace('.ts', '');
        params['project[files][index.ts]'] = `import './${firstFile}';\nconsole.log('🚀 Exécution terminée');`;
    }

    // Ajouter un index.html minimal
    params['project[files][index.html]'] = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>${doc.metadata.title}</title>
    </head>
    <body>
    <script type="module" src="index.ts"></script>
    </body>
    </html>
    `;

  for (const key in params) {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = params[key];
    form.appendChild(input);
  }

  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};




    return (
      <div className="custom-mdx-wrapper" ref={containerRef}>
        <div style={{ 
            display: 'flex', 
            gap: '10px', 
            justifyContent: 'flex-end', 
            marginBottom: '1.5rem',
            flexWrap: 'wrap'
        }}>
          <button 
            onClick={handleCopyPS}
            className="button button--secondary button--sm"
            style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
          >
            {copied ? '✅ Copié !' : '🟦 One-Liner PowerShell'}
          </button>

          <button 
            onClick={handleOpenStackBlitz}
            className="button button--primary button--sm"
            style={{ display: 'flex', alignItems: 'center', gap: '5px', backgroundColor: '#1389fd' }}
          >
            ⚡ Ouvrir dans StackBlitz
          </button>
        </div>

        {children}
      </div>
    );
  },
};