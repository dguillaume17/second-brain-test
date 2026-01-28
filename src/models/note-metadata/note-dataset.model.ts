import { Concept } from "./base/concept.model";
import { Reference } from "./base/reference.model";
import { Snippet } from "./base/snippet.model";

export class NoteDataset {

    constructor(
        public concepts: Concept[],
        public references: Reference[],
        public snippets: Snippet[]
    ) {}
}