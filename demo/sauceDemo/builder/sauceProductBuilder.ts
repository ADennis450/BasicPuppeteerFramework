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

    price(price: number): SauceProductsBuilder
    {
        this.product.price = price 
        return this;
    }

    build()
    {
        return this.product;
    }
} 