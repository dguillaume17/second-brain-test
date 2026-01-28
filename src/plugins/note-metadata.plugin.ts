import { NOTE_METADATA_PLUGIN_NAME } from "../constants/constants";
import { NoteDataset } from "../models/note-metadata/note-dataset.model";
import { MetadataUtils } from "../utils/metadata.utils";
import { DocMetadata } from '@docusaurus/plugin-content-docs';

export function NoteMetadataPlugin(context, options) {
    return {
        name: NOTE_METADATA_PLUGIN_NAME,
        async allContentLoaded({ allContent, actions }) {
            const { setGlobalData } = actions;
            
            // Extraction des docs (exemple sécurisé)
            const docsPluginData = allContent['docusaurus-plugin-content-docs'] as any;

            if (!docsPluginData) {
                return;
            }

            const docs = docsPluginData.default.loadedVersions[0].docs as DocMetadata[];

            const customDocsMetadata = docs.map(doc => MetadataUtils.castDocMetaDataAsCustomDocMetadata(doc));

            const conceptsLiteDataset = customDocsMetadata.map(doc => doc.castToConceptLite()).filter(note => !!note);
            const referencesLiteDataset = customDocsMetadata.map(doc => doc.castToReferenceLite()).filter(note => !!note);
            const snippetsLiteDataset = customDocsMetadata.map(doc => doc.castToSnippetLite()).filter(note => !!note);

            const concepts = customDocsMetadata.map(doc => doc.castToConcept(referencesLiteDataset, snippetsLiteDataset)).filter(note => !!note);
            const references = customDocsMetadata.map(doc => doc.castToReference(concepts)).filter(note => !!note);
            const snippets = customDocsMetadata.map(doc => doc.castToSnippet(concepts)).filter(note => !!note);

            console.log(concepts);
            

            const noteDataset = new NoteDataset(
                concepts,
                references,
                snippets
            );

            setGlobalData(noteDataset);
        },
    };
};