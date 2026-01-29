import { Slug } from "../../slug.model";

export abstract class NoteLite {

    constructor(
        public slug: Slug,
        public title: string
    ) {}
}