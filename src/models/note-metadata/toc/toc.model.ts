import { TocItem } from "./toc-item.model";

export class Toc {

    // Constructor

    constructor(
        public readonly children: Array<TocItem>
    ) {}

    // Public work

    public getNestedChildren(): TocItem[] {
        return this.children.flatMap(child => {
            return [
                child,
                ...child.getNestedChildren()
            ]
        });
    }
}