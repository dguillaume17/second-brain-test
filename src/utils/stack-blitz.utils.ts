import { CodeBlock } from "../models/code-block.model";

export namespace StackBlitzUtils {

    export function openStackBlitz(
        title: string,
        codeBlockItems: CodeBlock[],
        stackblitzTemplate: string
    ) {
        if (codeBlockItems.length === 0) return;

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://stackblitz.com/run?view=preview';
        form.target = '_blank';
        
        const params: any = {
            'project[title]': `Action : ${title}`,
            'project[description]': 'Généré depuis la documentation',
            'project[template]': stackblitzTemplate
        };

        // Ajouter tous les fichiers du MDX
        codeBlockItems.forEach(codeBlockItem => {
            params[`project[files][${codeBlockItem.title}]`] = codeBlockItem.code;
        });

        if (stackblitzTemplate === 'typescript') {
            // Ajouter un index.html minimal
            params['project[files][index.html]'] = ``;
        }

        for (const key in params) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = params[key];
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    }

}