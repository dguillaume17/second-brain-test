import React, { JSX, useRef, useState } from 'react';
import { PowerShellUtils } from '../utils/power-shell.utils';
import { StackBlitzUtils } from '../utils/stack-blitz.utils';
import { NoteUtils } from '../utils/note.utils';
import { ButtonComponent } from './button.component';
import { ConceptLite } from '../models/note-metadata/base/concept-lite.model';
import { LinkedConceptsComponent } from './linked-concepts.components';

export function SnippetComponent({ title, markdownContent, concepts, children }: { title: string, markdownContent: string, concepts: ConceptLite[], children: React.ReactNode }): JSX.Element {
  const [copied, setCopied] = useState(false);

  const handleCopyCommandLine = async () => {
    const codeBlockItems = NoteUtils.extractCodeBlockItemsFrom(markdownContent);

    PowerShellUtils.copyCommandLine(
      codeBlockItems,
      () => setCopied(true),
      () => setCopied(false)
    );
  };

  const handleOpenStackBlitz = () => {
    const codeBlockItems = NoteUtils.extractCodeBlockItemsFrom(markdownContent);

    StackBlitzUtils.openStackBlitz(
      title,
      codeBlockItems
    );
  };

  return (
    <div className="custom-mdx-wrapper">
      <LinkedConceptsComponent concepts={concepts}></LinkedConceptsComponent>
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
