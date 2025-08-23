import { LightningElement } from 'lwc';
import{countryCodeList} from 'c/currencyServiceCom';

export default class CurrencyConvertor extends LightningElement {

    countryList=countryCodeList
    countryFrom="INR"
    countryTo="USD"
    amount=''
    result
    error   
    handleChange(event){
        const {name,value}=event.target
        console.log("currency type is "+ name)
        console.log("the Currencycode selected is " + value)
        this[name]=value
        this.result=''// to clear the previous result
        this.error=''// to clear the previous error
    }
    submitHandler(event)
    {
        event.preventDefault()//prevnt the refersh once submiited 
        this.convert()// call the convert method
        
    }
    async convert() // calling ab API is an asynchronous menthod
    {
        
        const API_KEY='847035a8bc79071e8ffa1e0a'
        const API_URL =`https://v6.exchangerate-api.com/v6/${API_KEY}/pair/${this.countryFrom}/${this.countryTo}`
                        
        try
        {
            const data = await fetch(API_URL)
            const JsonData = await data.json()
            debugger;
            console.log(JsonData)
            console.log("the conversion rate is " + JsonData.conversion_rate);
            console.log("the amount is " + this.amount);
            this.result = (Number(this.amount) * JsonData.conversion_rate).toFixed(2)
            console.log("the result is " + this.result)
        } 
        catch (error) {
            console.error(error);
            this.error="An error occurred. Please try again..."
            
        }
        
    }    
}