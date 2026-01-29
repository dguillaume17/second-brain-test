import { Slug } from "../../slug.model";
import { ConceptLite } from "./concept-lite.model";
import { NoteLite } from "./note-lite.model";

export class Snippet extends NoteLite {

    constructor(
        content: string,
        slug: Slug,
        title: string,
        public readonly conceptsLite: ConceptLite[]
    ) {
        super(content, slug, title);
    }
}