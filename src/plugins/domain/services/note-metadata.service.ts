import { DocMetadata } from '@docusaurus/plugin-content-docs';
import { FileService } from './file.service';
import { MarkdownService } from './markdown.service';
import { Slug } from '../../../models/slug.model';
import { CustomDocMetadata } from '../../../models/note-metadata/custom-doc-metadata.model';
import { ConceptNote } from '../models/note/concept-note.model';
import { FilePath } from '../models/file-path.model';
import { Markdown } from '../models/mardown.model';
import { NoteTitle } from '../models/note/note-title.model';
import { NoteType } from '../enums/note-type.enum';
import { Note } from '../models/note/note.model';
import { SnippetNote } from '../models/note/snippet-note.model';
import { ReferenceNote } from '../models/note/reference-note.model';
import { OtherNote } from '../models/note/other-note.model';
import { NoteDataset } from '../models/note/note-dataset.model';

export class NoteMetadataService {

    // Constructor

    constructor(
        private _fileService: FileService,
        private _markdownService: MarkdownService
    ) {}

    // Public work

    public createDomainModels(docsMetadata: DocMetadata[]): CustomDocMetadata[] {
        return docsMetadata.map(docMetadata => this._createDomainModel(docMetadata));
    }

    public createNoteDataset(docsMetadata: DocMetadata[]): NoteDataset {
        const conceptNotes: ConceptNote[] = [];
        const otherNotes: OtherNote[] = [];
        const referenceNotes: ReferenceNote[] = [];
        const snippetNotes: SnippetNote[] = [];

        docsMetadata.forEach(docMetadata => {
            const filePath = this._fileService.castSourcePathToFilePath(docMetadata.source);
            const fileContent = this._fileService.getFileContent(filePath);

            const markdown = this._markdownService.getMarkdown(filePath, fileContent);

            const noteTitle = new NoteTitle(
                markdown.frontMatter.titleInEnglish,
                markdown.frontMatter.titleInFrench,
        );

            NoteType.executeFn(filePath.noteType, {
                [NoteType.Concept]: () => conceptNotes.push(this._createConceptNote(filePath, markdown, noteTitle)),
                [NoteType.Other]: () => otherNotes.push(this._createOtherNote(filePath, markdown, noteTitle)),
                [NoteType.Reference]: () => referenceNotes.push(this._createReferenceNote(filePath, markdown, noteTitle)),
                [NoteType.Snippet]: () => snippetNotes.push(this._createSnippetNote(filePath, markdown, noteTitle)),
            });
        });

        return new NoteDataset(
            conceptNotes,
            otherNotes,
            referenceNotes,
            snippetNotes
        );
    }

    // Inner work

    private _createDomainModel(docMetadata: DocMetadata): CustomDocMetadata {
        const filePath = this._fileService.castSourcePathToFilePath(docMetadata.source);
        const fileContent = this._fileService.getFileContent(filePath);

        const markdown = this._markdownService.getMarkdown(filePath, fileContent);
        

        const slug = new Slug(docMetadata.slug);

        return new CustomDocMetadata(
            filePath,
            markdown.content,
            docMetadata.title,
            slug,
            markdown.frontMatter as any
        );
    }

    // Inner work - Concept

    private _createConceptNote(filePath: FilePath, markdown: Markdown, noteTitle: NoteTitle): ConceptNote {

        return new ConceptNote(
            null,
            null,
            filePath,
            markdown,
            noteTitle
        );
    }

    private _createOtherNote(filePath: FilePath, markdown: Markdown, noteTitle: NoteTitle): OtherNote {

        return new OtherNote(
            filePath,
            markdown,
            noteTitle
        );
    }

    private _createReferenceNote(filePath: FilePath, markdown: Markdown, noteTitle: NoteTitle): ReferenceNote {

        return new ReferenceNote(
            filePath,
            markdown,
            noteTitle
        );
    }

    private _createSnippetNote(filePath: FilePath, markdown: Markdown, noteTitle: NoteTitle): SnippetNote {

        return new SnippetNote(
            filePath,
            markdown,
            noteTitle
        );
    }

}