import { JSX } from "react";

export enum NoteType {
    Action,
    Hub,
    Other,
    Reference
}

export namespace NoteType {
    export function getAll(): NoteType[] {
        return [
            NoteType.Action,
            NoteType.Hub,
            NoteType.Other,
            NoteType.Reference
        ];
    }

    export function getAssociatedSlug(type: NoteType): string | null {
        switch (type) {
            case NoteType.Action:
                return '/actions';
            case NoteType.Hub:
                return '/hub';
            case NoteType.Reference:
                return '/reference';
            default:
                return null;
        }
    }

    export function fromNullableSlug(slug: string | null): NoteType {
        if (slug == null) {
            return NoteType.Other;
        }

        return getAll().find(type => {
            const associatedSlug = getAssociatedSlug(type);

            if (associatedSlug == null) {
                return false;
            }

            return slug.startsWith(associatedSlug);
        }) ?? NoteType.Other;
    }

    export function getAssociatedJsxElement(type: NoteType, jsxElementFns: Record<NoteType, () => JSX.Element>): JSX.Element {
        return jsxElementFns[type]();
    }
}