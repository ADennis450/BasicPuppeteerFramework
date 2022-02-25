import puppeteer, { ElementHandle } from  "puppeteer";

export class NavHelper {
    private static page: puppeteer.Page;
    private static browser: puppeteer.Browser;

    public static async createBrowser()
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

    public static getPage()
    {
       return this.page;
    }

    public static async goToUrl(url: string, clearLocalStorage = false)
    {
       await this.page.goto(url, {waitUntil: 'networkidle0'});
       if (clearLocalStorage)
       {
           await this.page.evaluate(() => localStorage.claer());
       }
    }

    public static async clickOnElement(selector: string)
    {
        const element = await this.waitForElement(selector)
        await element.click();
    }

    public static async waitForElement(selector: string, options?: any): Promise<ElementHandle | null>
    {
        if(options == null)
        {
          return await this.page.waitForXPath(selector);
        }
        else
        {
          return await this.page.waitForXPath(selector, options);
        }
    }

    public static async enterText(selector:string, elementText:string)
    {
        const element = await this.waitForElement(selector);
        await element.type(elementText);
    }

    public static async getElementText(selector: string )
    {
        const element = await this.waitForElement(selector);
        await this.getPage().evaluate(el => el.innerText)
    }

    public static async switchTabs(index: number)
    {
        const tabs = await this.browser.pages()
        tabs[index].bringToFront();
    }

    public static async closepage(index: number)
    {
        const tabs = await this.browser.pages();
        await tabs[index].close();
    }

    public static async changeAttributeValue(selector:string, newValue: string)
    {
        await this.page.evaluate((selector, newValue) => {

            document.querySelector(selector).setAttribute('value', newValue)
        
        },selector, newValue);
    }
     
    public static async closeBrowser()
    {
        await this.browser.close();
    }
}