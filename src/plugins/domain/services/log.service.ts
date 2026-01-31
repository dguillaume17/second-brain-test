import { ArrayUtils } from "../../../utils/array.utils";
import { FilePath } from "../models/file-path.model";

export class LogService {

    // Inner properties

    private _logs: {filePath: FilePath, message: string}[] = [];

    // Public work

    public addLog(filePath: FilePath, message: string) {
        this._logs.push({
            filePath,
            message: message
        });
    }

    public printAllLogs() {

        const groups = ArrayUtils.groupBy(this._logs, log => log.filePath.displayablePath);

        Object.keys(groups).forEach(group => {
            console.warn(`--- ${group}`)

            groups[group].forEach((log, index) => {
                console.warn(`${index}: ${log.message}`);
            })
        });

        
    }

}