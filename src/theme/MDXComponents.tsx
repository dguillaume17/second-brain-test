import React, { useRef, useState } from 'react';
import OriginalComponents from '@theme-original/MDXComponents';
import { DocContextValue, useDoc } from '@docusaurus/plugin-content-docs/client';
import useGlobalData from '@docusaurus/useGlobalData';
import { NoteType } from '../enums/note-type.enum';
import { ActionComponent } from '../components/action-component';

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
    const globalData = useGlobalData();
    const myData = globalData['my-metadata-plugin'].default.docs as Array<{ filePath: string, frontMatter: Object }>;

    console.log(myData);

    const doc = overridenUseDoc();
    const slug = doc == null ? null : doc.metadata.slug;

    const noteType = NoteType.fromNullableSlug(slug);

    return NoteType.getAssociatedJsxElement(noteType, {
      [NoteType.Action]: () => (<ActionComponent title={doc.metadata.title}>{children}</ActionComponent>),
      [NoteType.Hub]: () => (<OtherComponent>{children}</OtherComponent>),
      [NoteType.Other]: () => (<OtherComponent>{children}</OtherComponent>),
      [NoteType.Reference]: () => (<OtherComponent>{children}</OtherComponent>),
    });
  },
};