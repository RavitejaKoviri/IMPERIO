import * as requestFromServer from "./wishlistCrud";
import { postWishlistDetails, getWishlistDetails ,updateWishlistAction} from "./wishlistSlice";

export const addProductToWishlist = (data) => async (dispatch) => {
  try {
    console.log("in action productData", data);
    const response = await requestFromServer.addProduct(data);
    console.log("response in action", response);
    if (response.status == 201) {
      const response = await requestFromServer.getProduct(data.userId);
    console.log(response.data, "respones in action");
    dispatch(getWishlistDetails(response.data));
    }
    // dispatch(postWishlistDetails(response.data));

  } catch (error) {
    console.log("Failed to add product to wishlist:", error.message);
  }
};
// New action to check if a product is in the wishlist
export const getProductInWishlist = (userId) => async (dispatch) => {
  try {
    const response = await requestFromServer.getProduct(userId);
    console.log(response.data, "respones in action");
    dispatch(getWishlistDetails(response.data));
  } catch (error) {
    console.log("Failed to check product in wishlist:", error.message);
    return false;
  }
};

export const clearWishlistData=()=>async (dispatch)=>{
  dispatch(getWishlistDetails([]))
}

export const removeProductFromWishlist =
  (productId, userId) => async (dispatch) => {
    try {
      const response = await requestFromServer.removeProduct(productId, userId);
      if(response.status === 200){
        const response = await requestFromServer.getProduct(userId);
        dispatch(getWishlistDetails(response.data));
      }
    } catch (error) {
      console.log("Failed to remove product from wishlist:", error.message);
    }
  };

  
