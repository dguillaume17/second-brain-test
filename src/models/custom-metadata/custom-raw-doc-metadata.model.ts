import { DocMetadata } from '@docusaurus/plugin-content-docs';

export class CustomRawDocMetadata {

    constructor(
        public readonly frontMatter: {
            readonly [key: string]: any;
        },
        public readonly metadata: DocMetadata
    ) {}

}