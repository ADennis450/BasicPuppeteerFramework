import { NavHelper } from "../Helpers/NavHelper";

let navHelper = new NavHelper();
console.log('beginning test');
(async() => {
    await navHelper.createBrowser();
    await navHelper.goTo('https://www.saucedemo.com');
    await navHelper.enterText("//input[@id='user-name']", "standard_user");
    await navHelper.enterText("//input[@id='password']", "secret_sauce");
    await navHelper.clickOn("//input[@id='login-button']")
    await navHelper.waitUtilVisible("//div[@class='app_logo']")
    navHelper.closeBrowser();
})();
