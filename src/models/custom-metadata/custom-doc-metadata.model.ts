import { NoteType } from "@site/src/enums/note-type.enum";
import { CustomRawDocMetadata } from "./custom-raw-doc-metadata.model";

export class CustomDocMetadata {

    constructor(
        public readonly fileContent: string,
        public readonly filePath: string,
        public readonly noteContent: string,
        public readonly noteTitle: string,
        public readonly noteType: NoteType,
        public readonly slug: string,
        public readonly rawData: CustomRawDocMetadata
    ) {}

}