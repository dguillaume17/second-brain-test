import { DocMetadata } from '@docusaurus/plugin-content-docs';
import { CustomDocMetadata } from '../models/note-metadata/custom-doc-metadata.model';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export namespace MetadataUtils {
    export function castDocMetaDataAsCustomDocMetadata(docMetadata: DocMetadata): CustomDocMetadata {
        const relativeFilePath = docMetadata.source.replace('@site/', '');
        const filePath = path.join(process.cwd(), relativeFilePath);
        const content = fs.readFileSync(filePath, 'utf-8');

        const { data: frontMatter, content: noteContent } = matter(content);

        return new CustomDocMetadata(
            content,
            filePath,
            docMetadata.title,
            docMetadata.slug,
            frontMatter
        );
    }
}
