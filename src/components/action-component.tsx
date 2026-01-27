import React, { useRef, useState } from 'react';
import { PowerShellUtils } from '../utils/power-shell.utils';
import { StackBlitzUtils } from '../utils/stack-blitz.utils';
import { CodeBlockItemExtractorUtils } from '../utils/code-block-item-extractor.utils';

export function ActionComponent({ title, children }: { title: string, children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const getCodeBlockItems = () => {
    if (!containerRef.current) return [];
    const codeContainers = containerRef.current.querySelectorAll('[class*="codeBlockContainer"]');

    return CodeBlockItemExtractorUtils.extractCodeBlockItemsFrom(codeContainers);
  };

  const handleCopyCommandLine = async () => {
    const files = getCodeBlockItems();

    PowerShellUtils.copyCommandLine(
      files,
      () => setCopied(true),
      () => setCopied(false)
    );
  };

  const handleOpenStackBlitz = () => {
    const files = getCodeBlockItems();

    StackBlitzUtils.openStackBlitz(
      title,
      files
    );
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
          onClick={handleCopyCommandLine}
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
}
