export class NoteItem {

    // Model properties

    filePath: string;
    frontMatter: {
        [key: string]: any;
    };
    content: string;

    // Lifecycle

    constructor(fields: Pick<NoteItem, 'filePath' | 'frontMatter' | 'content'>) {
        Object.assign(this, fields);
    }
}