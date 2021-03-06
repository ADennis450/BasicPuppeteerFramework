import { NavHelper } from "../../common/helpers/navHelper";
import { login } from "./actions/login";
import { Global } from "../../common/global/global";
import { scrapeProductInfo } from "./actions/scrapeProductInfo";
import { FileHelper } from "../../common/helpers/fileHelper";

(async() => {

    Global.globalErrors = [];

    console.log('Launching Browser');
    await NavHelper.createBrowser();
    
    console.log('Loggin into SauceDemos');
    await login();

    console.log('Scraping product info');
    const productData = await scrapeProductInfo();

    console.log('Writing output to file');
    FileHelper.writeToFile(
      {
        productData: productData,
        errors: Global.globalErrors
      }
    );
  
    console.log('Closing Browser')
    await NavHelper.closeBrowser(); 
})();