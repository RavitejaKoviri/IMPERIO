import * as requestFromServer from "./cartCRUD";
import { postCartDetails, getCartDetails } from "./cartSlice";

export const addProductToCart = (data) => async (dispatch) => {
  try {
    console.log("in action productData", data);
    const response = await requestFromServer.addProduct(data);
    console.log("response in action", response.data);
    if(response.data==1){
      console.log("product exists");
    }
    dispatch(postCartDetails(response.data));
  } catch (error) {
    console.log("Failed to add product to cart:", error.message);
  }
};
// New action to check if a product is in the wishlist
export const getProductInCart = (userId) => async (dispatch) => {
  try {
    const response = await requestFromServer.getProduct(userId);
    console.log(response.data, "respones in action");
    dispatch(getCartDetails(response.data));
  } catch (error) {
    console.log("Failed to check product in cart:", error.message);
    return false;
  }
};

export const removeProductFromCart = (productData) => async (dispatch) => {
  try {
    const response = await requestFromServer.removeProduct(productData);
    dispatch(removeFromCart(response.data));
  } catch (error) {
    console.log("Failed to remove product from cart:", error.message);
  }
};
