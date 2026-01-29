import { Slug } from "../../slug.model";
import { NoteLite } from "./note-lite.model";

export class ReferenceLite extends NoteLite {

    constructor(
        slug: Slug,
        title: string
    ) {
        super(slug, title);
    }
}