export enum StackBlitzTemplate {
    Typescript = 'typescript'
}

export namespace StackBlitzTemplate {

    export function getAll(): StackBlitzTemplate[] {
        return [
            StackBlitzTemplate.Typescript
        ];
    }

    export function findByValue(value: string): StackBlitzTemplate | null {
        return getAll().find(template => template === value);
    }

}