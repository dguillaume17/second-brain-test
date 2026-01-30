
import { ConceptLite } from "./base/concept-lite.model";
import { ReferenceLite } from "./base/reference-lite.model";
import { SnippetLite } from "./base/snippet-lite.model";
import { Concept } from "./base/concept.model";
import { Reference } from "./base/reference.model";
import { Snippet } from "./base/snippet.model";
import { NoteType } from "./../../enums/note-type.enum";
import { MarkdownUtils } from "../../utils/markdown.utils";
import { Slug } from "../slug.model";

export class CustomDocMetadata {

    // Getters

    public get noteType(): NoteType {
        return this.slug.noteType;
    }

    public get isConcept(): boolean {
        return this.noteType === NoteType.Concept;
    }

    public get isReference(): boolean {
        return this.noteType === NoteType.Reference;
    }

    public get isSnippet(): boolean {
        return this.noteType === NoteType.Snippet;
    }

    // Constructor

    constructor(
        public readonly markdownContent: string,
        public readonly path: string,
        public readonly title: string,
        public readonly slug: Slug,
        public readonly frontMatter: {
            readonly [key: string]: any;
            readonly stackblitzTemplate: string;
        }
    ) {}

    // Public work

    public castToConceptLite(): ConceptLite {
        if (!this.isConcept) { return null; }

        return new ConceptLite(
            this.markdownContent,
            this.slug,
            this.title
        );
    }

    public castToConcept(referencesLiteDataset: ReferenceLite[], snippetsLiteDataset: SnippetLite[]): Concept {
        if (!this.isConcept) { return null; }
 
        const toc =  MarkdownUtils.extractTocFrom(this.slug, this.markdownContent, referencesLiteDataset, snippetsLiteDataset);
        const tocNestedChildren = toc.getNestedChildren();

        const referencesLite = tocNestedChildren.map(child => child.referenceLink).filter(referenceLink => referenceLink != null);
        const snippetsLite = tocNestedChildren.map(child => child.snippetLink).filter(snippetLink => snippetLink != null);

        return new Concept(
            this.markdownContent,
            this.slug,
            this.title,
            referencesLite,
            snippetsLite,
            toc
        );
    }
 
    public castToReferenceLite(): ReferenceLite {
        if (!this.isReference) { return null; }

        return new ReferenceLite(
            this.markdownContent,
            this.slug,
            this.title
        );
    }

    public castToReference(conceptsDataset: Concept[]): Reference {
        if (!this.isReference) { return null; }

        const concepts = conceptsDataset.filter(concept => concept.flattenReferencesLite.some(reference => reference.slug === this.slug));

        return new Reference(
            this.markdownContent,
            this.slug,
            this.title,
            concepts
        );
    }

    public castToSnippetLite(): SnippetLite {
        if (!this.isSnippet) { return null; }

        return new SnippetLite(
            this.markdownContent,
            this.slug,
            this.title
        );
    }

    public castToSnippet(conceptsDataset: Concept[]): Snippet {
        if (!this.isSnippet) { return null; }

        const concepts = conceptsDataset.filter(concept => concept.flattenSnippetsLite.some(snippet => snippet.slug === this.slug));

        return new Snippet(
            this.markdownContent,
            this.slug,
            this.title,
            concepts,
            this.frontMatter.stackblitzTemplate
        );
    }

}