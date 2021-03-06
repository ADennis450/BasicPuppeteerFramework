import puppeteer, { ElementHandle } from  "puppeteer";

export class NavHelper {
    private static page: puppeteer.Page;
    private static browser: puppeteer.Browser;

    public static async createBrowser(navigationTimeout = 10000, defaultTimeout = 5000)
    {
        try
        {
            this.browser = await puppeteer.launch({ 
                headless: false,
                defaultViewport: null,
                args: ['--start-maximized'] 
            });
            [this.page] = await this.browser.pages();
            this.page.setDefaultNavigationTimeout(navigationTimeout);
            this.page.setDefaultTimeout(defaultTimeout);
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

    public static async getElementText(selector: string, index?: number): Promise<string>
        {
        if(index == null)
        {
            const element = await this.waitForElement(selector);
            return await this.getPage().evaluate(el => el.innerText, element);
        }
        else
        {
            const elements = await NavHelper.getPage().$x(selector);
            return await this.getPage().evaluate(el => el.innerText, elements[index]);   
        }
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