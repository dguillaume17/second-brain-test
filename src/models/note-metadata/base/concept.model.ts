import { Slug } from "../../slug.model";
import { Toc } from "../toc/toc.model";
import { ConceptLite } from "./concept-lite.model";
import { ReferenceLite } from "./reference-lite.model";
import { SnippetLite } from "./snippet-lite.model";

export class Concept extends ConceptLite {

    constructor(
        markdownContent: string,
        slug: Slug,
        title: string,
        public readonly flattenReferencesLite: ReferenceLite[],
        public readonly flattenSnippetsLite: SnippetLite[],
        public readonly toc: Toc
    ) {
        super(markdownContent, slug, title);
    }
}