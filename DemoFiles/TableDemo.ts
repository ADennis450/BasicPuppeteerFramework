import { FileHelper } from "../Helpers/FileHelper";
import { NavHelper } from "../Helpers/NavHelper";

let navHelper = new NavHelper();
let fileHelper = new FileHelper();
console.log('beginning test');
(async() => {
    await navHelper.createBrowser();
    await navHelper.goTo('https://www.w3schools.com/html/html_tables.asp');
    const tableData:string = JSON.stringify(Object.fromEntries(await navHelper.extractTableData()));
    navHelper.closeBrowser();
    fileHelper.createFile('OutputFiles/tableData.json',tableData);
})();
