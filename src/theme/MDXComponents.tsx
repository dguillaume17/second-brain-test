import React from 'react';
import OriginalComponents from '@theme-original/MDXComponents';
import { DocContextValue, useDoc } from '@docusaurus/plugin-content-docs/client';
import useGlobalData from '@docusaurus/useGlobalData';
import { NoteType } from '../enums/note-type.enum';
import { SnippetComponent } from '../components/snippet-component';
import { NOTE_METADATA_PLUGIN_NAME } from '../constants/constants';
import { ConceptComponent } from '../components/concept-component';
import { NoteDataset } from '../models/note-metadata/note-dataset.model';
import { Slug } from '../models/slug.model';
import { Concept } from '../models/note-metadata/base/concept.model';
import { Snippet } from '../models/note-metadata/base/snippet.model';
import { Reference } from '../models/note-metadata/base/reference.model';

function overridenUseDoc(): DocContextValue {
  try {
    // On tente de récupérer le contexte de la doc
    return useDoc();
  } catch {
    return null;
  }
}

function OtherComponent({ children }) {
  return <>{children}</>;
}

export default {
  ...OriginalComponents,

  wrapper: function ({ children }) {
    const doc = overridenUseDoc();
    const globalData = useGlobalData();

    const slug = doc == null ? null : new Slug(doc.metadata.slug);
    const noteType = slug == null ? NoteType.getDefaultNoteType() : slug.noteType;

    const noteDataset = globalData[NOTE_METADATA_PLUGIN_NAME].default as NoteDataset;
  
    return NoteType.getAssociatedJsxElement(noteType, {
      [NoteType.Concept]: () => {
        if (slug == null) {
          <OtherComponent>{children}</OtherComponent>
        }

        const concept = NoteDataset.findConcept(noteDataset, slug);

        return (
          <ConceptComponent title={doc.metadata.title} toc={concept.toc}>{children}</ConceptComponent>
        )
      },
      [NoteType.Other]: () => (<OtherComponent>{children}</OtherComponent>),
      [NoteType.Reference]: () => (<OtherComponent>{children}</OtherComponent>),
      [NoteType.Snippet]: () => {
        if (slug == null) {
          <OtherComponent>{children}</OtherComponent>
        }

        const snippet = NoteDataset.findSnippet(noteDataset, slug);
        const stackblitzTemplate = snippet.stackblitzTemplate;

        return (
          <SnippetComponent title={doc.metadata.title} markdownContent={snippet.markdownContent} concepts={snippet.conceptsLite} stackblitzTemplate={stackblitzTemplate}>{children}</SnippetComponent>
        );
      },
    });
  },
};