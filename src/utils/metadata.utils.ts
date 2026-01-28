import { DocMetadata } from '@docusaurus/plugin-content-docs';
import { CustomDocMetadata } from '../models/custom-metadata/custom-doc-metadata.model';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { CustomRawDocMetadata } from '../models/custom-metadata/custom-raw-doc-metadata.model';

export namespace MetadataUtils {
    export function castDocMetaDataAsCustomDocMetadata(docMetadata: DocMetadata): CustomDocMetadata {
        const relativeFilePath = docMetadata.source.replace('@site/', '');
        const filePath = path.join(process.cwd(), relativeFilePath);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const { data: frontMatter, content: noteContent } = matter(fileContent);

        return new CustomDocMetadata(
            fileContent,
            filePath,
            noteContent,
            docMetadata.slug,
            new CustomRawDocMetadata(
                frontMatter,
                docMetadata
            )
        );
    }
}
