export class DataHelper
{
   static convertCurrencyToNumber(currency: string)
   {
     return Number(currency.replace(/[^0-9.-]+/g,""));
   }
}