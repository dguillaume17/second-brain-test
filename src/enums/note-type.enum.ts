import { JSX } from "react";

export enum NoteType {
    Concept,
    Other,
    Reference,
    Snippet
}

export namespace NoteType {
    export function getAll(): NoteType[] {
        return [
            NoteType.Concept,
            NoteType.Other,
            NoteType.Reference,
            NoteType.Snippet,
        ];
    }

    export function getAssociatedSlugPrefix(type: NoteType): string | null {
        switch (type) {
            case NoteType.Concept:
                return '/concepts';
            case NoteType.Reference:
                return '/references';
            case NoteType.Snippet:
                return '/snippets';
            default:
                return null;
        }
    }

    export function getAssociatedFileNamePrefix(type: NoteType): string | null {
        switch (type) {
            case NoteType.Concept:
                return 'c-';
            case NoteType.Reference:
                return 'r-';
            case NoteType.Snippet:
                return 's-';
            default:
                return null;
        }
    }

    export function fromNullableSlug(slug: string | null): NoteType {
        if (slug == null) {
            return NoteType.Other;
        }

        return getAll().find(type => {
            const associatedSlugPrefix = getAssociatedSlugPrefix(type);

            if (associatedSlugPrefix == null) {
                return false;
            }

            return slug.startsWith(associatedSlugPrefix);
        }) ?? NoteType.Other;
    }

    export function getAssociatedJsxElement(type: NoteType, jsxElementFns: Record<NoteType, () => JSX.Element>): JSX.Element {
        return jsxElementFns[type]();
    }
}