import React from 'react';
import OriginalComponents from '@theme-original/MDXComponents';
import { DocContextValue, useDoc } from '@docusaurus/plugin-content-docs/client';
import useGlobalData from '@docusaurus/useGlobalData';
import { NoteType } from '../enums/note-type.enum';
import { ActionComponent } from '../components/action-component';
import { CUSTOM_PLUGIN_NAME } from '../constants/constants';
import { CustomMetadata } from '../models/custom-metadata/custom-metadata.model';

function overridenUseDoc(): DocContextValue {
  try {
    // On tente de récupérer le contexte de la doc
    return useDoc();
  } catch {
    return null;
  }
}

function HubComponent({ children }) {
  console.log('test');
  
  const globalData = useGlobalData();

    const customPluginData = globalData[CUSTOM_PLUGIN_NAME].default as CustomMetadata;

    console.log(customPluginData);

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

    return NoteType.getAssociatedJsxElement(noteType, {
      [NoteType.Action]: () => (<ActionComponent title={doc.metadata.title}>{children}</ActionComponent>),
      [NoteType.Hub]: () => (<HubComponent>{children}</HubComponent>),
      [NoteType.Other]: () => (<OtherComponent>{children}</OtherComponent>),
      [NoteType.Reference]: () => (<OtherComponent>{children}</OtherComponent>),
    });
  },
};