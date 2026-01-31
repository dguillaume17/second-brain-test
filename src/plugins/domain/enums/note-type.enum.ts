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

    export function executeFn<T>(type: NoteType, functions: Record<NoteType, () => T>): T {
        return functions[type]?.();
    }

    export function getDefaultNoteType(): NoteType {
        return NoteType.Other;
    }

    export function getAssociatedSlugPrefix(type: NoteType): string | null { // TODO : remove
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

    export function getRelativeFilePathPrefix(type: NoteType): string | null {
        const wikiLinkPrefix = getWikiLinkPrefix(type);

        if (wikiLinkPrefix == null) {
            return null;
        }

        switch (type) {
            case NoteType.Concept:
                return `docs/concepts/${wikiLinkPrefix}`;
            case NoteType.Reference:
                return `docs/references/${wikiLinkPrefix}`;
            case NoteType.Snippet:
                return `docs/snippets/${wikiLinkPrefix}`;
            default:
                return null;
        }
    }

    export function getWikiLinkPrefix(type: NoteType): string | null {
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
}