import { Slug } from "../../slug.model";

export abstract class NoteLite {

    constructor(
        public content: string,
        public slug: Slug,
        public title: string
    ) {}
}