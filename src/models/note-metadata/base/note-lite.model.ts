import { Slug } from "../../slug.model";

export abstract class NoteLite {

    constructor(
        public markdownContent: string,
        public slug: Slug,
        public title: string
    ) {}
}