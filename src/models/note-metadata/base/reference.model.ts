import { Slug } from "../../slug.model";
import { ConceptLite } from "./concept-lite.model";
import { ReferenceLite } from "./reference-lite.model";

export class Reference extends ReferenceLite {

    constructor(
        markdownContent: string,
        slug: Slug,
        title: string,
        public readonly conceptsLite: ConceptLite[]
    ) {
        super(markdownContent, slug, title);
    }
}