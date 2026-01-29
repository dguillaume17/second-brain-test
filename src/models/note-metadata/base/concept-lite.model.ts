import { Slug } from "../../slug.model";
import { NoteLite } from "./note-lite.model";

export class ConceptLite extends NoteLite {

    constructor(
        markdownContent: string,
        slug: Slug,
        title: string
    ) {
        super(markdownContent, slug, title);
    }
}