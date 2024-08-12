import * as requestFromCategoryCRUD from './categoryCRUD';
import { postVendorCategory,getVendorCategory,updateVendorCategory,deleteVendorCategory } from './categorySlice';

// category data object consists of category name and status; -$SAM
export const postCategoryFromVendor=(CategoryData)=>async(dispatch)=>{
    // sending CategoryData object to categoryCrud 
    try{
        const response = await requestFromCategoryCRUD.postCategoryData(CategoryData);
        // sending category data from vendor side
        dispatch(postVendorCategory(response.data));
    }
    catch(error)
    {
        console.log("failed to post in dispatch -> vendor/category/categoryAction",error);
    }
}

//HITTING GET CALL FOR CATEGORIES FOR VENDOR VIEW -$SAM
export const getCategoriesFromVendor=()=>async(dispatch)=>{
    try{
        console.log("hitting");
        // fetching data from crud -> route.js
        const response = await requestFromCategoryCRUD.getCategoriesData();
        dispatch(getVendorCategory(response.data));
    }catch(error)
    {
        // if failed to fetch 
        console.log("falied to get categories {actionVendor}");
    }
}

// Updating Category by id  for changing name and status
export const updateCategoryById=(updateObject)=>async(dispatch)=>{
    try{
        const response=await requestFromCategoryCRUD.updateCategoriesData(updateObject);
        dispatch(updateVendorCategory(response.data));
        if(response.status==200)
        {
            const response = await requestFromCategoryCRUD.getCategoriesData();
            dispatch(getVendorCategory(response.data));
        }
    }catch(error)
    {
        console.log("failed updating category Vendor",error);
    }
}

// delete category by id 
export const deleteCategoryById=(deleteObject)=>async(dispatch)=>{
    try{
        const response=await requestFromCategoryCRUD.deleteCategoriesData(deleteObject);
        dispatch(deleteVendorCategory(response.data));
        if(response.status)
        {
            const response = await requestFromCategoryCRUD.getCategoriesData();
            dispatch(getVendorCategory(response.data));
        }
    }catch(error)
    {
        console.log(`falied to delete in Category ${error}`);
    }
}