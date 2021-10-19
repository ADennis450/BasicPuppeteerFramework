import * as fs from 'fs';
import * as path from 'path';

export class FileHelper
{

    public createFile(filelocation:string,text:string)
    {
        fs.writeFileSync(filelocation, text);
    }
}

