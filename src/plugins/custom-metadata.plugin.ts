import { CUSTOM_PLUGIN_NAME } from "../constants/constants";
import { CustomMetadata } from "../models/custom-metadata/custom-metadata.model";
import { MetadataUtils } from "../utils/metadata.utils";
import { DocMetadata } from '@docusaurus/plugin-content-docs';

export function CustomMetadataPlugin(context, options) {
    return {
        name: CUSTOM_PLUGIN_NAME,
        async allContentLoaded({ allContent, actions }) {
            const { setGlobalData } = actions;
            
            // Extraction des docs (exemple sécurisé)
            const docsPluginData = allContent['docusaurus-plugin-content-docs'] as any;

            if (!docsPluginData) {
                return;
            }

            const docs = docsPluginData.default.loadedVersions[0].docs as DocMetadata[];

            const customMetadata = new CustomMetadata(
                docs.map(doc => MetadataUtils.castDocMetaDataAsCustomDocMetadata(doc))
            );

            setGlobalData(customMetadata);
        },
    };
};