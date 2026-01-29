import { WikiLink } from "../../wiki-link.model";
import { ReferenceLite } from "../base/reference-lite.model";
import { SnippetLite } from "../base/snippet-lite.model";
import { TocHeading } from "./toc-heading.model";

export class TocItem {

    // Public properties

    public readonly id = TocItem.getNextId();

    // Constructor

    constructor(
        public readonly ghostWikiLink: WikiLink | null,
        public readonly level: number,
        public readonly referenceLink: ReferenceLite | null,
        public readonly snippetLink: SnippetLite | null,
        public readonly tocHeading: TocHeading,
    ) {}

    // Public work

    public getNestedChildren(): TocItem[] {
        if (this.tocHeading == null) {
            return [];
        }

        return this.tocHeading.children.flatMap(child => {
            return [
                child,
                ...child.getNestedChildren()
            ];
        });
    }

    // Static work

    private static _nextId = 0;

    public static getNextId(): number {
        return TocItem._nextId++;
    }
}