export class CodeBlockItem {

    // Model properties

    name: string;
    content: string;

    // Lifecycle

    constructor(fields: Pick<CodeBlockItem, 'name' | 'content'>) {
        Object.assign(this, fields);
    }
}