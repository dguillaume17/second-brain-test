import { ConceptLite } from "./concept-lite.model";
import { ReferenceLite } from "./reference-lite.model";
import { SnippetLite } from "./snippet-lite.model";

export class Concept extends ConceptLite {

    constructor(
        slug: string,
        title: string,
        public readonly referencesLite: ReferenceLite[],
        public readonly snippetsLite: SnippetLite[]
    ) {
        super(slug, title);
    }
}