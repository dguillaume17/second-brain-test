import { NoteType } from "../enums/note-type.enum";
import { Slug } from "./slug.model";

export class WikiLinkNoMatchError extends Error {}

export class WikiLink {

    // Public properties

    public readonly content: string; // example value: "r-git"

    // Constructor

    constructor(
        public readonly rawLink: string // example value: "[[r-git]]"
    ) {
        this.content = WikiLink.getContentWithErrorHandling(rawLink);
    }

    // Public work

    public castToSlug(): Slug {
        const noteType = this._castToNoteType();
        const associatedSlugPrefix = NoteType.getAssociatedSlugPrefix(noteType);
        const slugValue = associatedSlugPrefix == null
            ? this.content
            : `${associatedSlugPrefix}/${this.content}`;

        return new Slug(slugValue);
    }

    // Inner work

    private _castToNoteType(): NoteType {
        return NoteType.getAll().find(type => {
            const associatedWikiLinkPrefix = NoteType.getAssociatedWikiLinkPrefix(type);

            if (associatedWikiLinkPrefix == null) {
                return false;
            }

            return this.content.startsWith(associatedWikiLinkPrefix);
        }) ?? NoteType.getDefaultNoteType();
    }

    // Static work

    public static getContentWithErrorHandling(rawLink: string): string | null {
        const matches = [...rawLink.matchAll(/\[\[(.*?)\]\]/g)];

        if (matches.length === 0) {
            throw new WikiLinkNoMatchError(`WikiLink "${rawLink}" : Expected exactly one match, but none found`); // TODO error handling
        }

        if (matches.length != 1) {
            throw new Error(`WikiLink "${rawLink}" : Expected exactly one match, but found ${matches.length}`); // TODO error handling
        }
        
        const uniqueMatchLink = matches[0][1];
        const formattedUniqueMatchLink = `[[${uniqueMatchLink}]]`;

        if (formattedUniqueMatchLink != rawLink) {
            throw new Error(`WikiLink "${rawLink}" : Content does not exactly match the expected format in strict mode: ${formattedUniqueMatchLink} <> ${rawLink}`); // TODO error handling
        }

        return uniqueMatchLink;
        
    }
}