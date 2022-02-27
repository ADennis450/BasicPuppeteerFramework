import { Product } from "puppeteer";
import { SauceProductsBuilder } from "./builder/sauceProductBuilder";
import { DataHelper } from "../../helpers/dataHelper";
import { NavHelper } from "../../helpers/navHelper";
import { LoginSelectors } from "./selectors/sauceDemo/loginSelectors";
import { ProductSelectors } from "./selectors/sauceDemo/productSelectors";
import { Urls } from "./selectors/sauceDemo/urls";
import { SauceProduct } from "./builder/sauceProductInterface";

console.log('beginning test');
(async() => {  
    await NavHelper.createBrowser();
    await NavHelper.goToUrl(Urls.sauceDemo);
    await NavHelper.enterText(LoginSelectors.usernameField, "standard_user");
    await NavHelper.enterText(LoginSelectors.passwordField, "secret_sauce");
    await NavHelper.clickOnElement(LoginSelectors.loginButton);
    await NavHelper.waitForElement(LoginSelectors.appLogo);
    await NavHelper.getElementText(ProductSelectors.productDescription);
    const inventoryItems = await NavHelper.getPage().$x(ProductSelectors.inventoryItem);  

    const productList: SauceProduct[] = [];

    for(let i = 0; i < inventoryItems.length; i++)
    { 
      const name = await NavHelper.getElementText(ProductSelectors.productTitle, i);  
      const description = await NavHelper.getElementText(ProductSelectors.productDescription, i)    
      const price = DataHelper.convertCurrencyToNumber(
        await NavHelper.getElementText(ProductSelectors.productPrice, i)
      );
      
    const product: SauceProduct = new SauceProductsBuilder()
        .name(name)
        .description(description)
        .price(price)
        .build(); 
    
    productList.push(product);    
    }
    await NavHelper.closeBrowser();
    for(let i = 0; i < productList.length; i++)
    {
        console.log(productList[i]);
    }
    
})();