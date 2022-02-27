import { Global } from "../../../common/global/global";
import { DataHelper } from "../../../common/helpers/dataHelper";
import { NavHelper } from "../../../common/helpers/navHelper";
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
               const product: SauceProduct = new SauceProductsBuilder()
                    .name(await NavHelper.getElementText(ProductSelectors.productTitle, i))  
                    .description(await NavHelper.getElementText(ProductSelectors.productDescription, i))   
                    .price(await NavHelper.getElementText(ProductSelectors.productPrice, i))
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