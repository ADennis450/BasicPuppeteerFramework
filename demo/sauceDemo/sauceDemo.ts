import { NavHelper } from "../../helpers/navHelper";
import { login } from "./actions/login";
import { Global } from "../../common/global";
import { scrapeProductInfo } from "./actions/scrapeProductInfo";
import { FileHelper } from "../../helpers/fileHelper";

(async() => {
  try
  {
    Global.globalErrors = [];

    console.log('Launching Browser');
    await NavHelper.createBrowser();
    
    console.log('Loggin into SauceDemos');
    await login();

    console.log('Scraping product info');
    const productData = await scrapeProductInfo();

    FileHelper.writeToFile(
      {
        productData: productData,
        errors: Global.globalErrors
      }
    );
  }
  
  catch(error)
  {
    Global.globalErrors.push(error as Error);
  }
  finally
  {
    console.log('Closing Browser')
    await NavHelper.closeBrowser();
  } 
})();