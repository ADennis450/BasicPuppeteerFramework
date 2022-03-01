import { SauceProduct } from "./sauceProductInterface";

export interface SauceOutput
{
    productData: SauceProduct[];
    errors: Error[];
}