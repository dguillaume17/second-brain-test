import { NOTE_METADATA_PLUGIN_NAME } from "../constants/constants";
import { NoteDataset } from "../models/note-metadata/note-dataset.model";
import { DocMetadata } from '@docusaurus/plugin-content-docs';
import { NoteMetadataService } from "./domain/services/note-metadata.service";
import { FileService } from "./domain/services/file.service";
import { MarkdownService } from "./domain/services/markdown.service";
import { LogService } from "./domain/services/log.service";

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

            const logService = new LogService();

            const fileServive = new FileService();
            const markdownService = new MarkdownService(logService);

            const noteMetadataService = new NoteMetadataService(
                fileServive,
                markdownService
            );


            const docs = docsPluginData.default.loadedVersions[0].docs as DocMetadata[];

            const customDocsMetadata = noteMetadataService.createDomainModels(docs);
            const testObject = noteMetadataService.createNoteDataset(docs);

            const conceptsLiteDataset = customDocsMetadata.map(doc => doc.castToConceptLite()).filter(note => note != null);
            const referencesLiteDataset = customDocsMetadata.map(doc => doc.castToReferenceLite()).filter(note => note != null);
            const snippetsLiteDataset = customDocsMetadata.map(doc => doc.castToSnippetLite()).filter(note => note != null);
            
            const concepts = customDocsMetadata.map(doc => doc.castToConcept(referencesLiteDataset, snippetsLiteDataset)).filter(note => note != null);
            const references = customDocsMetadata.map(doc => doc.castToReference(concepts)).filter(note => note != null);
            const snippets = customDocsMetadata.map(doc => doc.castToSnippet(concepts)).filter(note => note != null); 

            const noteDataset = new NoteDataset(
                concepts,
                references,
                snippets,
                testObject
            );

            logService.printAllLogs();

            setGlobalData(noteDataset);
        },
    };
};