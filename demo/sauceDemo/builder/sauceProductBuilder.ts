import { DataHelper } from "../../../common/helpers/dataHelper";
import { SauceProduct as SauceProduct } from "./sauceProductInterface";

export class SauceProductsBuilder
{
    private product: SauceProduct

    constructor()
    {
        this.product = {
            name: '',
            description: '',
            price: 0
        }
    }
    name(name: string): SauceProductsBuilder
    {
        this.product.name = name;
        return this;
    }

    description(description: string): SauceProductsBuilder
    {
        this.product.description = description;
        return this;
    }

    price(price: string): SauceProductsBuilder
    {
        this.product.price = DataHelper.convertCurrencyToNumber(price);
        return this;
    }

    build()
    {
        return this.product;
    }
} 