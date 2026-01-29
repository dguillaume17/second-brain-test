import { Slug } from "../../slug.model";
import { NoteLite } from "./note-lite.model";

export class SnippetLite extends NoteLite {

    constructor(
        content: string,
        slug: Slug,
        title: string
    ) {
        super(content, slug, title);
    }
}