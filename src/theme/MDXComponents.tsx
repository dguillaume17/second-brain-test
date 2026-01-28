import React from 'react';
import OriginalComponents from '@theme-original/MDXComponents';
import { DocContextValue, useDoc } from '@docusaurus/plugin-content-docs/client';
import useGlobalData from '@docusaurus/useGlobalData';
import { NoteType } from '../enums/note-type.enum';
import { ActionComponent } from '../components/action-component';
import { NOTE_METADATA_PLUGIN_NAME } from '../constants/constants';
import { NoteLite } from '../models/note-metadata/base/note-lite.model';

function overridenUseDoc(): DocContextValue {
  try {
    // On tente de récupérer le contexte de la doc
    return useDoc();
  } catch {
    return null;
  }
}

function SnippetComponent({ children }) {
  return <>
    <div>coucou</div>
    <div>{children}</div>
  </>;
}

function OtherComponent({ children }) {
  return <>{children}</>;
}

export default {
  ...OriginalComponents,

  wrapper: function ({ children }) {
    const doc = overridenUseDoc();
    const slug = doc == null ? null : doc.metadata.slug;

    const noteType = NoteType.fromNullableSlug(slug);

    const globalData = useGlobalData();

    const customPluginData = globalData[NOTE_METADATA_PLUGIN_NAME].default as NoteLite;

    console.log(customPluginData);

    return NoteType.getAssociatedJsxElement(noteType, {
      [NoteType.Concept]: () => (<ActionComponent title={doc.metadata.title}>{children}</ActionComponent>),
      [NoteType.Other]: () => (<OtherComponent>{children}</OtherComponent>),
      [NoteType.Reference]: () => (<OtherComponent>{children}</OtherComponent>),
      [NoteType.Snippet]: () => (<SnippetComponent>{children}</SnippetComponent>),
    });
  },
};