import { TocItem } from "./toc-item.model";

export class TocHeading {

    // Constructor

    constructor(
        public readonly title: string,
        public readonly children: Array<TocItem>,
    ) {}
}