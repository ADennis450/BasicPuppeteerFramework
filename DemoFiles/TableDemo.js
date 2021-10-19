"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const FileHelper_1 = require("../Helpers/FileHelper");
const NavHelper_1 = require("../Helpers/NavHelper");
let navHelper = new NavHelper_1.NavHelper();
let fileHelper = new FileHelper_1.FileHelper();
console.log('beginning test');
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield navHelper.createBrowser();
    yield navHelper.goTo('https://www.w3schools.com/html/html_tables.asp');
    const tableData = JSON.stringify(Object.fromEntries(yield navHelper.extractTableData()));
    navHelper.closeBrowser();
    fileHelper.createFile('OutputFiles/tableData.json', tableData);
}))();
//# sourceMappingURL=TableDemo.js.map