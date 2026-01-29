import React, { JSX, useRef, useState } from 'react';
import { PowerShellUtils } from '../utils/power-shell.utils';
import { StackBlitzUtils } from '../utils/stack-blitz.utils';
import { NoteUtils } from '../utils/note.utils';
import { ButtonComponent } from './button.component';
import { ConceptLite } from '../models/note-metadata/base/concept-lite.model';
import { LinkedConceptsComponent } from './linked-concepts.components';
import { CodePenUtils } from '../utils/code-pen.utils';

export function SnippetComponent({ title, markdownContent, concepts, stackblitzTemplate, children }: { title: string, markdownContent: string, concepts: ConceptLite[], stackblitzTemplate: string | null, children: React.ReactNode }): JSX.Element {
  const [copied, setCopied] = useState(false);

  const codeBlockItems = NoteUtils.extractCodeBlockItemsFrom(markdownContent);

  const handleCopyCommandLine = () => {
    PowerShellUtils.copyCommandLine(
      codeBlockItems,
      () => setCopied(true),
      () => setCopied(false)
    );
  };

  const handleOpenStackBlitz = () => {
    StackBlitzUtils.openStackBlitz(
      title,
      codeBlockItems,
      stackblitzTemplate
    );
  };

  const handleOpenCodePen = () => {
    CodePenUtils.openCodePen(
      title,
      codeBlockItems
    );
  }; 

  return (
    <div className="custom-mdx-wrapper">
      <LinkedConceptsComponent concepts={concepts}></LinkedConceptsComponent>
      {codeBlockItems.length > 0 ?
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

          <ButtonComponent
            title="⚡ Ouvrir dans CodePen"
            onClick={handleOpenCodePen}>
          </ButtonComponent>
        </div>
        : <></>
      }

      {children}
    </div>
  );
}
