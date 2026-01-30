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
        return WikiLink.castToSlug(this);
    }

    // Inner work

    private _castToNoteType(): NoteType {
        return WikiLink.castToNoteType(this);
    }

    // Static work

    public static getRelativeFileName(wikiLink: WikiLink): string {
        const slugValue = WikiLink.castToSlug(wikiLink).value;

        return `./docs${slugValue}.md`;
    }

    public static castToSlug(wikiLink: WikiLink): Slug {
        const noteType = WikiLink.castToNoteType(wikiLink);
        const associatedSlugPrefix = NoteType.getAssociatedSlugPrefix(noteType);
        const slugValue = associatedSlugPrefix == null
            ? wikiLink.path
            : `${associatedSlugPrefix}/${wikiLink.path}`;

        return new Slug(slugValue);
    }

    public static castToNoteType(wikiLink: WikiLink): NoteType {
        return NoteType.getAll().find(type => {
            const associatedWikiLinkPrefix = NoteType.getAssociatedWikiLinkPrefix(type);

            if (associatedWikiLinkPrefix == null) {
                return false;
            }

            return wikiLink.path.startsWith(associatedWikiLinkPrefix);
        }) ?? NoteType.getDefaultNoteType();
    }

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