import * as requestFromUserCartCrud from './UserCartCrud'
import { getCartProductsData } from './UserCartSlice';
export const addProductToCart = (productData) => async (dispatch) => {
    try {
        console.log("inside cart action", productData);
        const response = await requestFromUserCartCrud.addProductToCart(productData);
        if (response.status == 200) {
            const response = await requestFromUserCartCrud.getCartProducts(productData.userid);
            console.log(response, "in getcart action");
            dispatch(getCartProductsData(response.data));
        }
        console.log(response, "iam in cart action.js");
    } catch (error) {
        console.log("error in adding product to cart", error); ``
    }
}

export const getCartProducts = (userid) => async (dispatch) => {
    try {
        const response = await requestFromUserCartCrud.getCartProducts(userid);
        console.log(response, "in getcart action");
        dispatch(getCartProductsData(response.data));
    } catch (error) {
        console.log("getting cart products failed ", error);
    }
}