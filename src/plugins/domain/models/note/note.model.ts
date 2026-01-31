import { FilePath } from "../file-path.model";
import { Markdown } from "../mardown.model";
import { NoteTitle } from "./note-title.model";

export abstract class Note {

    // Calculated properties

    public get id(): string {
        return this.filePath.projectPath;
    }

    // Constructor

    constructor(
        public readonly filePath: FilePath,
        public readonly markdown: Markdown,
        public readonly title: NoteTitle
    ) {}

    // Public work

    public isEqualTo(note: this): boolean {
        return this.id === note.id;
    }

}