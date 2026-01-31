import { ConceptNote } from "./concept-note.model";
import { OtherNote } from "./other-note.model";
import { ReferenceNote } from "./reference-note.model";
import { SnippetNote } from "./snippet-note.model";

export class NoteDataset {

    // Constructor

    constructor(
        public readonly conceptNotes: ConceptNote[],
        public readonly otherNotes: OtherNote[],
        public readonly referenceNotes: ReferenceNote[],
        public readonly snippetNotes: SnippetNote[]
    ) {}

}