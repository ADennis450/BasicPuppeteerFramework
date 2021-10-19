import puppeteer from  "puppeteer";

export class NavHelper {
    private browser: puppeteer.Browser;
    private page: puppeteer.Page;

    constructor()
    {
        this.browser = null;
        this.page = null;
    }

    public async createBrowser()
    {
        try
        {
            this.browser = await puppeteer.launch({headless: false});
            this.page = await this.browser.newPage()
        }
        catch (Exception)
        {
            throw (Exception.toString());
        }
    }

    public async goTo(url: string)
    {
       console.log('navigating to ' + url);
       await this.page.goto(url);
    }

    public async clickOn(element: string)
    {
        await this.page.$x(element).then(async (ele) => await ele[0].click());
    }

    public async waitUtilVisible(element: string)
    {
        await this.page.waitForXPath(element);
    }

    public async enterText(elementName:string, elementText:string)
    {
        await this.page.$x(elementName).then(async (ele) => await ele[0].type(elementText));
    }

    public async extractTableData(): Promise<Map<string, string[]>>
    {
        const tableHash: Map<string, string[]> = new Map();
        let headersList:string[] = [];
        //Get table headers
        const headers = await this.page.$x("//table[@id='customers']/descendant::th");
        for (let i = 0; i < headers.length; i++)
        {
           headersList.push(await this.page.evaluate(el => el.innerText, headers[i]));
        }
        //Get table rows and map to table headers
        for(let i = 0; i < headersList.length; i++)
        {
            let cellValuesLists:string[] = [];
            const cellValues = await this.page.$x(`//table[@id='customers']/descendant::tr/td[${i + 1}]`);
            for(let i = 0; i < cellValues.length; i++)
            {
                cellValuesLists.push(await this.page.evaluate(el => el.innerText, cellValues[i])as string);
            }
            tableHash.set(headersList[i], cellValuesLists);
        }
        return tableHash;
    } 

    public async closeBrowser()
    {
         await this.browser.close();
    }




}
