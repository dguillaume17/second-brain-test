import { Slug } from "../../slug.model";
import { NoteLite } from "./note-lite.model";

export class ConceptLite extends NoteLite {

    constructor(
        slug: Slug,
        title: string
    ) {
        super(slug, title);
    }
}