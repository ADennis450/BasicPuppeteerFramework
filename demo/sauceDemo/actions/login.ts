import { NavHelper } from "../../../helpers/navHelper";
import { LoginSelectors } from "../selectors/sauceDemo/loginSelectors";
import { Urls } from "../selectors/sauceDemo/urls";
//TODO: Implement this in sauce demo class
export async function Login()
{
    let logoutErrors: Error;;
    try
    {
    await NavHelper.createBrowser();
    await NavHelper.goToUrl(Urls.sauceDemo);
    await NavHelper.enterText(LoginSelectors.usernameField, "standard_user");
    await NavHelper.enterText(LoginSelectors.passwordField, "secret_sauce");
    await NavHelper.clickOnElement(LoginSelectors.loginButton);
    await NavHelper.waitForElement(LoginSelectors.appLogo);
    }
    catch(error)
    {
        console.log('Failed to login')
    }
}