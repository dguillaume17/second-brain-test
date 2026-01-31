import { MarkdownFrontMatter } from "./markdown-front-matter.model";

export class Markdown {

    // Constructor

    constructor(
        public readonly content: string,
        public readonly frontMatter: MarkdownFrontMatter
    ) {}

}