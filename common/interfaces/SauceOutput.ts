import { SauceProduct } from "../../demo/sauceDemo/builder/sauceProductInterface";

export interface SauceOutput
{
    productData: SauceProduct[];
    errors: Error[];
}