import React, { useRef, useState } from 'react';
import OriginalComponents from '@theme-original/MDXComponents';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

export default {
  ...OriginalComponents,

  wrapper: function({ children }) {
    const doc = useDoc();
    const containerRef = useRef<HTMLDivElement>(null);
    const [copied, setCopied] = useState(false);

    if (!doc.metadata.slug.startsWith('/actions')) {
        return <>{children}</>;
    }

    const handleCopyOneLiner = async () => {
      if (!containerRef.current) return;

      const codeContainers = containerRef.current.querySelectorAll('[class*="codeBlockContainer"]');
      
      const fileData = Array.from(codeContainers).map((container) => {
        const titleElement = container.querySelector('[class*="codeBlockTitle"]');
        const codeElement = container.querySelector('pre');
        if (!titleElement || !codeElement) return null;

        return {
          fileName: titleElement.textContent?.trim(),
          base64Content: btoa(unescape(encodeURIComponent(codeElement.innerText)))
        };
      }).filter(item => item !== null);

      if (fileData.length === 0) return;

      // 1. On prépare le dictionnaire de fichiers
      const psDictionary = fileData.map(f => `"${f.fileName}"="${f.base64Content}"`).join('; ');
      
      // 2. Le script complet tel qu'il doit être exécuté par PowerShell
      const rawScript = `$f=@{${psDictionary}}; $f.GetEnumerator() | % { $p=$_.Key; $d=Split-Path $p; if($d -and !(Test-Path $d)){mkdir $d -Force | Out-Null}; $bytes=[Convert]::FromBase64String($_.Value); [IO.File]::WriteAllBytes((Join-Path (Get-Location) $p), $bytes); Write-Host "✔ Créé : $p" -ForegroundColor Green }`;

      // 3. Encodage en UTF-16LE pour PowerShell -EncodedCommand
      const byteArray = new Uint8Array(new Uint16Array([...rawScript].map(c => c.charCodeAt(0))).buffer);
      let binary = '';
      byteArray.forEach(b => binary += String.fromCharCode(b));
      const encodedScript = btoa(binary);

      const finalCommand = `powershell -EncodedCommand ${encodedScript}`;

      try {
        await navigator.clipboard.writeText(finalCommand);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Erreur :', err);
      }
    };

    return (
      <div className="custom-mdx-wrapper" ref={containerRef}>
        <div style={{ marginBottom: '1.5rem', textAlign: 'right' }}>
          <button 
            onClick={handleCopyOneLiner}
            className="button button--primary button--outline"
          >
            {copied ? '✅ Commande prête !' : '⚡ Copier le One-Liner (Auto-création)'}
          </button>
        </div>
        {children}
      </div>
    );
  },
};