
import * as requestFromProductCRUD from './productCRUD' 
import { getVendorProduct } from './productSlice';

// category data object consists of category name and status; -$SAM
export const postProductFromVendor=(productData)=>async(dispatch)=>{
    console.log("hi action",productData)
    // sending ProductData object to ProductCrud 
    try{
        const response = await requestFromProductCRUD.postProductData(productData);
        // sending category data from vendor side
        // dispatch(postVendorSubCategory(response.data));
    }
    catch(error)
    {
        console.log("failed to post in dispatch -> vendor/category/categoryAction",error);
    }
}

// //HITTING GET CALL FOR CATEGORIES FOR VENDOR VIEW -$SAM
export const getProductFromVendor=()=>async(dispatch)=>{
    try{
        console.log("hitting");
        // fetching data from crud -> route.js
        const response = await requestFromProductCRUD.getProductsData();
        console.log("response",response)
        dispatch(getVendorProduct(response.data));
     
    }catch(error)
    {
        // if failed to fetch 
        console.log("falied to get subcategories {actionVendor}");
    }
}

// Updating Category by id  for changing name and status
export const updateProductById=(updateObject)=>async(dispatch)=>{
    console.log(updateObject)
    try{
        const response=await requestFromProductCRUD.updateProductsDataById(updateObject);
        console.log("response",response)
        if(response.status==200)
        {
            const response = await requestFromProductCRUD.getProductsData();
            dispatch(getVendorProduct(response.data));
        }
    }catch(error)
    {
        console.log("failed updating category Vendor",error);
    }
}

// delete category by id 
export const deleteProductById=(id)=>async(dispatch)=>{
    try{
        const response=await requestFromProductCRUD.deleteProductData(id);
        if(response.status==200)
            {
                const response = await requestFromProductCRUD.getProductsData();
                dispatch(getVendorProduct(response.data));
            }
    }catch(error)
    {
        console.log(`falied to delete in Category ${error}`);
    }
}