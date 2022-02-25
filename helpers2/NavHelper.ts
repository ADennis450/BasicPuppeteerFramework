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
            [this.page] = await this.browser.pages();
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

    public async switchTabs(index: number)
    {
        await this.page.waitFor(5000);
        const tabs = await this.browser.pages()
        tabs[index].bringToFront();
        this.page.waitFor(5000);
    }

    public async closepage(index: number)
    {
        const tabs = await this.browser.pages();
        await tabs[index].close();
    }

    public async changeAttributeValue(selector:string)
    {
        const newDate = '20211212'
        // await this.page.evaluate((selector, newDate) => {

        //     console.log(selector + newDate);
        
        // },selector,newDate);

        await this.page.evaluate((selector, newDate) => {

            document.querySelector(selector).setAttribute('value', newDate)
        
        },selector,newDate);
       // await this.page.evaluate((selector, newDate) => console.log(selector + " " + newDate ),(selector, newDate))
       // await this.page.$eval((selector,  (e, newDate) => e.setAttribute("value", newDate));
    }
    
    public async extractTableData(headerElements:string, cellElements:string): Promise<Map<string, string[]>>
    {
        const tableHash: Map<string, string[]> = new Map();
        let headersList:string[] = [];
        //Get table headers
        const headers = await this.page.$x(headerElements);
        for (let i = 0; i < headers.length; i++)
        {
           headersList.push(await this.page.evaluate(el => el.innerText, headers[i]));
        }
        //Get table cell values
        //Map cell values to table headers
        for(let i = 0; i < headersList.length; i++)
        {
            let cellValuesLists:string[] = [];
            const cellValues = await this.page.$x(cellElements + `[${i+1}]`);
            for(let j = 0; j < cellValues.length; j++)
            {
                cellValuesLists.push(await this.page.evaluate(el => el.innerText, cellValues[j]));
            }
            tableHash.set(headersList[i], cellValuesLists);
        }
        return tableHash;
    } 

    public async closeBrowser()
    {
        console.log('closing browser');
         await this.browser.close();
    }
}