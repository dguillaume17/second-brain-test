import { NoteType } from "../enums/note-type.enum";

export class FilePath {

    // Calculated properties

    public get displayablePath(): string {
        return this.projectPath;
    }

    public get noteType(): NoteType {
        return NoteType.getAll()
            .find(noteType => {
                const relativeFilePathPrefix = NoteType.getRelativeFilePathPrefix(noteType);

                if (relativeFilePathPrefix == null) {
                    return false;
                }

                return this.projectPath.startsWith(relativeFilePathPrefix);
            }) ?? NoteType.getDefaultNoteType();
    }

    // Constructor

    constructor(
        public readonly projectPath: string,
        public readonly systemPath: string
    ) {}

}