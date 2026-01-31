import { NoteType } from "../plugins/domain/enums/note-type.enum";

export class Slug {

    // Getters

    public get noteType(): NoteType {
        return NoteType.getAll()
            .find(noteType => {
                const associatedSlugPrefix = NoteType.getAssociatedSlugPrefix(noteType);
                const associatedWikiLinkPrefix = NoteType.getWikiLinkPrefix(noteType);

                return this.value.startsWith(`${associatedSlugPrefix}/${associatedWikiLinkPrefix}`);
            }) ?? NoteType.getDefaultNoteType();
    }

    // Constructor

    constructor(
        public readonly value: string
    ) {}

    // Static work

    public static isEqualToSlug(slugA: Slug, slugB: Slug): boolean {
        return slugA.value === slugB.value;
    }

}