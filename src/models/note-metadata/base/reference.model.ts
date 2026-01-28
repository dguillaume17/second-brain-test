import { ConceptLite } from "./concept-lite.model";
import { ReferenceLite } from "./reference-lite.model";

export class Reference extends ReferenceLite {

    constructor(
        slug: string,
        title: string,
        public readonly conceptsLite: ConceptLite[]
    ) {
        super(slug, title);
    }
}