import { Global } from "../../../common/global";
import { NavHelper } from "../../../helpers/navHelper";
import { LoginSelectors } from "../selectors/sauceDemo/loginSelectors";
import { Urls } from "../selectors/sauceDemo/urls";

export async function login()
{
    try
    {
        await NavHelper.goToUrl(Urls.sauceDemo);
        await NavHelper.enterText(LoginSelectors.usernameField, "standard_user");
        await NavHelper.enterText(LoginSelectors.passwordField, "secret_sauce");
        await NavHelper.clickOnElement(LoginSelectors.loginButton);
        await NavHelper.waitForElement(LoginSelectors.appLogo);
    }
    catch(error)
    {
        Global.globalErrors.push(error as Error)
    }
}