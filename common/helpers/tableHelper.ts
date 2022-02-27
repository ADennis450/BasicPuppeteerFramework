import { NavHelper } from "./navHelper";

export class TableHelper
{
public static async extractTableData(headerElements:string, cellElements:string): Promise<Map<string, string[]>>
    {
        const tableHash: Map<string, string[]> = new Map();
        let headersList:string[] = [];
        //Get table headers
        const headers = await NavHelper.getPage().$x(headerElements);
        for (let i = 0; i < headers.length; i++)
        {
           headersList.push(await NavHelper.getPage().evaluate(el => el.innerText, headers[i]));
        }
        //Get table cell values
        //Map cell values to table headers
        for(let i = 0; i < headersList.length; i++)
        {
            let cellValuesLists:string[] = [];
            const cellValues = await NavHelper.getPage().$x(cellElements + `[${i+1}]`);
            for(let j = 0; j < cellValues.length; j++)
            {
                cellValuesLists.push(await NavHelper.getPage().evaluate(el => el.innerText, cellValues[j]));
            }
            tableHash.set(headersList[i], cellValuesLists);
        }
        return tableHash;
    }
}