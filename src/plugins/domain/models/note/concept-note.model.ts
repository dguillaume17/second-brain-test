import { FilePath } from "../file-path.model";
import { Markdown } from "../mardown.model";
import { NoteTitle } from "./note-title.model";
import { Note } from "./note.model";

export class ConceptNote extends Note {

    // Constructor

    constructor(
        public readonly referenceNoteFilePathes: FilePath[],
        public readonly snippetNoteFilePathes: FilePath[],
        filePath: FilePath,
        markdown: Markdown,
        title: NoteTitle
    ) {
        super(filePath, markdown, title);
    }

}