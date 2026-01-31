import { Slug } from "../slug.model";
import { Concept } from "./base/concept.model";
import { NoteLite } from "./base/note-lite.model";
import { Reference } from "./base/reference.model";
import { Snippet } from "./base/snippet.model";

export class NoteDataset {

    // Constructor

    constructor(
        public concepts: Concept[],
        public references: Reference[],
        public snippets: Snippet[],
        public readonly testObject: any
    ) {}

    // Static work

    public static findConcept(dataset: NoteDataset, slug: Slug): Concept {
        return dataset.concepts.find(concept => Slug.isEqualToSlug(concept.slug, slug));
    }

    public static findReference(dataset: NoteDataset, slug: Slug): Reference {
        return dataset.references.find(reference => Slug.isEqualToSlug(reference.slug, slug));
    }

    public static findSnippet(dataset: NoteDataset, slug: Slug): Snippet {
        return dataset.snippets.find(snippet => Slug.isEqualToSlug(snippet.slug, slug));
    }

    public static findNote(dataset: NoteDataset, slug: Slug): NoteLite {
        const concept = NoteDataset.findConcept(dataset, slug);
        const reference = NoteDataset.findReference(dataset, slug);
        const snippet = NoteDataset.findSnippet(dataset, slug);
        return concept ?? reference ?? snippet;

    }
}