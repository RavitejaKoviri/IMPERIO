import * as requestFromServer from './productCRUD';
import { postProductDetails,getProductDetails } from './productSlice'; // Ensure correct import

export const postProduct = (data) => async (dispatch) => {
    // console.log(data);
    try {
        const response = await requestFromServer.postProductData(data);
        console.log("response in action",response.config.data);
        dispatch(postProductDetails(response.config.data));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const getProduct = () => async (dispatch) => {
    // console.log(data);
    try {
        const response = await requestFromServer.getProductData();
        // Dispatch the action with the response data
        dispatch(getProductDetails(response.data));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const getProductById=(id)=>async (dispatch) => {
    try {
        const response = await requestFromServer.getProductDataById(id);
        // Dispatch the action with the response data
        dispatch(getProductDetails(response.data));
    } catch (error) {
        console.error("Error in action:", error);
    }
}

