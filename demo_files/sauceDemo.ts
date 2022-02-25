import { NavHelper } from "../helpers/navHelper";

console.log('beginning test');
(async() => {
    await NavHelper.createBrowser();
    await NavHelper.goToUrl('https://www.saucedemo.com');
    await NavHelper.enterText("//input[@id='user-name']", "standard_user");
    await NavHelper.enterText("//input[@id='password']", "secret_sauce");
    await NavHelper.clickOnElement("//input[@id='login-button']");
    await NavHelper.waitForElement("//div[@class='app_logo']")
    await NavHelper.clickOnElement("//div[text()='Sauce Labs Backpack']/../../..//button")
    await NavHelper.closeBrowser();
})();