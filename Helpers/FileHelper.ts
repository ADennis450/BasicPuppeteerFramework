import * as fs from 'fs';
import * as path from 'path';
import { NavHelper } from "../Helpers/NavHelper";
export class FileHelper
{

    private createFile(filelocation:string,text:string)
    {
        fs.writeFileSync(filelocation, text);
    }

    public async getTableAndWritetoJson(headerElements:string, cellElements:string)
    {
        let navHelper = new NavHelper();
        const tableData:string = JSON.stringify(
            Object.fromEntries(await navHelper.extractTableData("//table[@id='customers']/descendant::th","//table[@id='customers']/descendant::tr/td" )
            )
        );
        this.createFile("OutputFiles", tableData);
    }
}

