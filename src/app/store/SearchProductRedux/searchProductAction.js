import * as requestFromServer from "./searchProductCRUD";
import { searchProduct,clearsearchProduct } from "./searchProductSlice";

export const getSearchProducts = (value)=> async (dispatch) =>{
    try{
        const response = await requestFromServer.getSearchProductCRUD(value);
        console.log("in action",response);
        dispatch(searchProduct(response));
    }
    catch(error){
        console.error("Error in action:", error);
    }
}

export const clearSearchProducts = ()=> async (dispatch) =>{
    console.log("clearSearchProducts")
    try{
        // const response = await requestFromServer.getSearchProductCRUD(value);
        // console.log("in action",response);
        dispatch(clearsearchProduct());
    }
    catch(error){
        console.error("Error in action:", error);
    }
}