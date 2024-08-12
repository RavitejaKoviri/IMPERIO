import axios from "axios";

export const addProductToCart=async(productData)=>{
    console.log(productData,"in cart Crud");
    return await axios.post('/api/userCart',productData);
}

export const getCartProducts=async(userid)=>{
    console.log(userid,"in crud to get cart products")
    return await axios.get(`api/userCart?${userid}`);
}