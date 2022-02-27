import { SauceOutput } from "../common/interfaces/SauceOutput";

export class FileHelper
{
    public static writeToFile(data:SauceOutput, filePath = 'output_files/output.json')
    {
        const FileSystem = require("fs");
        FileSystem.writeFile(filePath, JSON.stringify(data), (error: Error) => {
        if (error) throw error;
        });
    }
}