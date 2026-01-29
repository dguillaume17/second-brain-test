import { Toc } from "../toc/toc.model";
import { ConceptLite } from "./concept-lite.model";
import { ReferenceLite } from "./reference-lite.model";
import { SnippetLite } from "./snippet-lite.model";

export class Concept extends ConceptLite {

    constructor(
        slug: string,
        title: string,
        public readonly flattenReferencesLite: ReferenceLite[],
        public readonly flattenSnippetsLite: SnippetLite[],
        public readonly toc: Toc
    ) {
        super(slug, title);
    }
}