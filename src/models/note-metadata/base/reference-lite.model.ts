import { NoteLite } from "./note-lite.model";

export class ReferenceLite extends NoteLite {

    constructor(
        slug: string,
        title: string
    ) {
        super(slug, title);
    }
}