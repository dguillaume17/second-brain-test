import { ReferenceLite } from "../base/reference-lite.model";
import { SnippetLite } from "../base/snippet-lite.model";
import { TocHeading } from "./toc-heading.model";

export class TocItem {

    // Constructor

    constructor(
        public readonly level: number,
        public readonly referenceLink: ReferenceLite | null,
        public readonly snippetLink: SnippetLite | null,
        public readonly tocHeading: TocHeading,
    ) {}
}