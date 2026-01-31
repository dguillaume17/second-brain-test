export namespace ArrayUtils {
    export function groupBy<T>(array: T[], keyGetter: (item: T) => string | number): Record<string, T[]> {
        const result: Record<string, T[]> = {};
        
        for (const item of array) {
            const key = keyGetter(item);
            if (!result[key]) {
            result[key] = [];
            }
            result[key].push(item);
        }
        
        return result;
    }
}

