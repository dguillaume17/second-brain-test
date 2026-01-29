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
    const slug = doc == null ? null : doc.metadata.slug;

    const noteType = slug == null
      ? NoteType.getDefaultNoteType()
      : new Slug(slug).noteType;

    const globalData = useGlobalData();

    const customPluginData = globalData[NOTE_METADATA_PLUGIN_NAME].default as NoteDataset;
    console.log(customPluginData);
    
    const toc = customPluginData.concepts[1].toc;

    return NoteType.getAssociatedJsxElement(noteType, {
      [NoteType.Concept]: () => (<ConceptComponent title={doc.metadata.title} toc={toc}>{children}</ConceptComponent>),
      [NoteType.Other]: () => (<OtherComponent>{children}</OtherComponent>),
      [NoteType.Reference]: () => (<OtherComponent>{children}</OtherComponent>),
      [NoteType.Snippet]: () => (<SnippetComponent title={doc.metadata.title}>{children}</SnippetComponent>),
    });
  },
};