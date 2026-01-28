import { ConceptLite } from "./concept-lite.model";
import { NoteLite } from "./note-lite.model";

export class Snippet extends NoteLite {

    constructor(
        slug: string,
        title: string,
        public readonly conceptsLite: ConceptLite[]
    ) {
        super(slug, title);
    }
}