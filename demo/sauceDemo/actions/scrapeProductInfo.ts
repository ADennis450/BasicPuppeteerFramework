import { Global } from "../../../common/global";
import { DataHelper } from "../../../helpers/dataHelper";
import { NavHelper } from "../../../helpers/navHelper";
import { SauceProductsBuilder } from "../builder/sauceProductBuilder";
import { SauceProduct } from "../builder/sauceProductInterface";
import { ProductSelectors } from "../selectors/sauceDemo/productSelectors";

export async function scrapeProductInfo(): Promise<SauceProduct[]>
{
    if(!Global.globalErrors.length)
    {
        
        const inventoryItems = await NavHelper.getPage().$x(ProductSelectors.inventoryItem);  

        const productList: SauceProduct[] = [];
        try
        {
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
        }
        catch(error)
        {
            Global.globalErrors.push(error as Error)
        }
        return productList
        
    }   
}