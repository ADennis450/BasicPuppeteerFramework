import * as fs from 'fs';
import * as path from 'path';
import { NavHelper } from "./navHelper";
export class FileHelper
{
    private createFile(filelocation:string,text:string)
    {
        fs.writeFileSync(filelocation, text);
    }

    public async getTableAndWritetoJson(headerElements:string, cellElements:string, navHelper:NavHelper)
    {
        const tableData:string = JSON.stringify(
            Object.fromEntries(await navHelper.extractTableData(headerElements,cellElements)
            )
        );
        this.createFile("OutputFiles/tableData.json", tableData);
    }
}

