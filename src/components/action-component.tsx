import React, { JSX, useRef, useState } from 'react';
import { PowerShellUtils } from '../utils/power-shell.utils';
import { StackBlitzUtils } from '../utils/stack-blitz.utils';
import { NoteUtils } from '../utils/note.utils';
import { ButtonComponent } from './button.component';

export function ActionComponent({ title, children }: { title: string, children: React.ReactNode }): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const getCodeBlockItems = () => {
    if (!containerRef.current) return [];
    const codeContainers = containerRef.current.querySelectorAll('[class*="codeBlockContainer"]');

    return NoteUtils.extractCodeBlockItemsFrom(codeContainers);
  };

  const handleCopyCommandLine = async () => {
    const codeBlockItems = getCodeBlockItems();

    PowerShellUtils.copyCommandLine(
      codeBlockItems,
      () => setCopied(true),
      () => setCopied(false)
    );
  };

  const handleOpenStackBlitz = () => {
    const codeBlockItems = getCodeBlockItems();

    StackBlitzUtils.openStackBlitz(
      title,
      codeBlockItems
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
        <ButtonComponent
          title={copied ? '✅ Copié !' : '🟦 One-Liner PowerShell'}
          onClick={handleCopyCommandLine}>
        </ButtonComponent>

        <ButtonComponent
          title="⚡ Ouvrir dans StackBlitz"
          onClick={handleOpenStackBlitz}>
        </ButtonComponent>
      </div>

      {children}
    </div>
  );
}
