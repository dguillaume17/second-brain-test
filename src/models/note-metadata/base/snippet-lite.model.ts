import { NoteLite } from "./note-lite.model";

export class SnippetLite extends NoteLite {

    constructor(
        slug: string,
        title: string
    ) {
        super(slug, title);
    }
}