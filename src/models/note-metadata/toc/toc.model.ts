import { TocItem } from "./toc-item.model";

export class Toc {

    // Constructor

    constructor(
        public readonly children: Array<TocItem>
    ) {}
}