import { NoteLite } from "./note-lite.model";

export class ConceptLite extends NoteLite {

    constructor(
        slug: string,
        title: string
    ) {
        super(slug, title);
    }
}