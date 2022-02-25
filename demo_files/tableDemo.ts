import { FileHelper } from "../helpers/fileHelper";
import { NavHelper } from "../helpers/navHelper";

let navHelper = new NavHelper();
let fileHelper = new FileHelper();
(async() => {
    await navHelper.createBrowser();
    await navHelper.goTo('https://www.w3schools.com/html/html_tables.asp');
    await fileHelper.getTableAndWritetoJson("//table[@id='customers']/descendant::th","//table[@id='customers']/descendant::tr/td", navHelper);
    navHelper.closeBrowser();
})();