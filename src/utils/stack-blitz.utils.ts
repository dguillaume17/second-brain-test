import { CodeBlock } from "../models/code-block.model";

export namespace StackBlitzUtils {

    export function openStackBlitz(
        title: string,
        codeBlockItems: CodeBlock[]
    ) {
        if (codeBlockItems.length === 0) return;

        const form = document.createElement('form');
        form.method = 'POST';
        form.action = 'https://stackblitz.com/run?view=preview';
        form.target = '_blank';

        const params: any = {
            'project[title]': `Action : ${title}`,
            'project[description]': 'Généré depuis la documentation',
            'project[template]': 'typescript'
        };

        // Ajouter tous les fichiers du MDX
        codeBlockItems.forEach(codeBlockItem => {
            params[`project[files][${codeBlockItem.name}]`] = codeBlockItem.content;
        });

        // Ajouter index.ts si nécessaire
        if (!codeBlockItems.some(f => f.name === 'index.ts')) {
            const firstFile = codeBlockItems[0].name.replace('.ts', '');
            params['project[files][index.ts]'] = `import './${firstFile}';\nconsole.log('🚀 Exécution terminée');`;
        }

        // Ajouter un index.html minimal
        params['project[files][index.html]'] = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>${title}</title>
    </head>
    <body>
    <script type="module" src="index.ts"></script>
    </body>
    </html>
    `;

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