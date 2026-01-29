import React, { JSX } from 'react';
import { ButtonComponent } from './button.component';
import { Toc } from '../models/note-metadata/toc/toc.model';
import { TocComponent } from './toc/toc.component';

export function ConceptComponent({ title, toc, children }: { title: string, toc: Toc, children: React.ReactNode }): JSX.Element {
  return <>
    <ButtonComponent
      title={title}
      onClick={() => alert('coucou')}>
    </ButtonComponent>
    <TocComponent toc={toc}></TocComponent>
  </>;
}


