import matter from 'gray-matter';
import { Markdown } from '../models/mardown.model';
import { MarkdownFrontMatter } from '../models/markdown-front-matter.model';
import { LogService } from './log.service';
import { StackBlitzTemplate } from '../enums/stack-blitz-template.enum';
import { FilePath } from '../models/file-path.model';

type FrontMatterType = { [key: string]: any }

export class MarkdownService {

    // Constructor

    constructor(
        private _logService: LogService
    ) {}

    // Public work

    public getMarkdown(filePath: FilePath, fileContent: string): Markdown {
        const { data: markdownRawData, content: markdownContent } = matter(fileContent);

        const { english: titleInEnglish, french: titleInFrench } = this._getTitles(filePath, markdownRawData);
        const stackBlitzTemplate = this._getStackBlitzTemplate(filePath, markdownRawData);

        const markdownFrontMatter = new MarkdownFrontMatter(
            stackBlitzTemplate,
            titleInEnglish,
            titleInFrench
        );

        return new Markdown(
            markdownContent,
            markdownFrontMatter
        );
    }

    // Inner work

    private _getStackBlitzTemplate(filePath: FilePath, markdownRawData: FrontMatterType): StackBlitzTemplate | null {
        const stackBlitzTemplateRawValue = markdownRawData.stackblitzTemplate;
        
        if (stackBlitzTemplateRawValue == null || stackBlitzTemplateRawValue == '') {
            return null;
        }

        const stackBlitzTemplate = StackBlitzTemplate.findByValue(stackBlitzTemplateRawValue);

        if (stackBlitzTemplate == null) {
            this._logService.addLog(filePath, `The StackBlitz template "${stackBlitzTemplateRawValue}" does not exist.`);
        }

        return stackBlitzTemplate;
    }

    private _getTitles(filePath: FilePath, markdownRawData: FrontMatterType): { english: string, french: string } {
        const englishProperty = 'englishTitle';
        const frenchProperty = 'title';

        const english = markdownRawData[englishProperty];
        const french = markdownRawData[frenchProperty];

        if (english == null || english === '') {
            this._logService.addLog(filePath, `The english title is empty (property "${englishProperty}").`);
        }

        if (french == null || french === '') {
            this._logService.addLog(filePath, `The french title is empty (property "${frenchProperty}").`);
        }

        return {
            english,
            french
        }
    }

}