import { NoteType } from "../enums/note-type.enum";
import { Slug } from "./slug.model";

export class WikiLinkNoMatchError extends Error {}

export class WikiLink {

    // Public properties

    public readonly path: string; // example value: "r-git"
    public readonly title: string; // example value:
        // undefined, if rawLink = "[[r-git]]"
        // OR "Git", if rawLink = "[[r-git|Git]]"

    public readonly displayableLabel: string;

    // Constructor

    constructor(
        public readonly rawLink: string // example value: "[[r-git]]" ou "[[r-git|Git]]"
    ) {
        const content = WikiLink.getContentWithErrorHandling(rawLink);

        this.path = content.path;
        this.title = content.title;
        this.displayableLabel = this.title ?? this.path;
    }

    // Public work

    public castToSlug(): Slug {
        const noteType = this._castToNoteType();
        const associatedSlugPrefix = NoteType.getAssociatedSlugPrefix(noteType);
        const slugValue = associatedSlugPrefix == null
            ? this.path
            : `${associatedSlugPrefix}/${this.path}`;

        return new Slug(slugValue);
    }

    // Inner work

    private _castToNoteType(): NoteType {
        return NoteType.getAll().find(type => {
            const associatedWikiLinkPrefix = NoteType.getAssociatedWikiLinkPrefix(type);

            if (associatedWikiLinkPrefix == null) {
                return false;
            }

            return this.path.startsWith(associatedWikiLinkPrefix);
        }) ?? NoteType.getDefaultNoteType();
    }

    // Static work

    public static getContentWithErrorHandling(rawLink: string): {
        path: string,
        title: string
    } {
        const matches = [...rawLink.matchAll(/\[\[(.*?)(?:\|(.*?))?\]\]/g)];

        if (matches.length === 0) {
            throw new WikiLinkNoMatchError(`WikiLink "${rawLink}" : Expected exactly one match, but none found`); // TODO error handling
        }

        if (matches.length != 1) {
            throw new Error(`WikiLink "${rawLink}" : Expected exactly one match, but found ${matches.length}`); // TODO error handling
        }
        
        const uniqueMatchPath = matches[0][1];
        const uniqueMatchTitle = matches[0][2];
        const uniqueMatchRawLink = `[[${uniqueMatchPath}${uniqueMatchTitle == null ? '' : '|' + uniqueMatchTitle}]]`;

        if (uniqueMatchRawLink != rawLink) {
            throw new Error(`WikiLink "${rawLink}" : Content does not exactly match the expected format: ${uniqueMatchRawLink} <> ${rawLink}`); // TODO error handling
        }

        return {
            path: uniqueMatchPath,
            title: uniqueMatchTitle
        };
        
    }
}