import { NoteType } from "../enums/note-type.enum";

export class Slug {

    // Getters

    public get noteType(): NoteType {
        return NoteType.getAll()
            .find(noteType => {
                const associatedSlugPrefix = NoteType.getAssociatedSlugPrefix(noteType);
                const associatedWikiLinkPrefix = NoteType.getAssociatedWikiLinkPrefix(noteType);

                return this.value.startsWith(`${associatedSlugPrefix}/${associatedWikiLinkPrefix}`);
            }) ?? NoteType.getDefaultNoteType();
    }

    // Constructor

    constructor(
        public readonly value: string
    ) {}

    // Public work

    public isEqualToSlug(slug: Slug): boolean {
        return this.value === slug.value;
    }

}