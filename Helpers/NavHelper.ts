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
            console.log(Exception);
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

    public async closeBrowser()
    {
        return await this.browser.close();
    }




}
