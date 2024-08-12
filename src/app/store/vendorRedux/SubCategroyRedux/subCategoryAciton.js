import { update } from 'lodash';
import * as requestFromSubCategoryCRUD from './subCategoryCRUD';
import {postVendorSubCategory,getVendorSubCategory,updateVendorSubCategory,deleteVendorSubCategory} from './subCategorySlice'
// category data object consists of category name and status; -$SAM
export const postSubCategoryFromVendor=(SubCategoryData)=>async(dispatch)=>{
    console.log("hi action")
    // sending CategoryData object to categoryCrud 
    try{
        const response = await requestFromSubCategoryCRUD.postSubCategoryData(SubCategoryData);
        // sending category data from vendor side
        dispatch(postVendorSubCategory(response.data));
    }
    catch(error)
    {
        console.log("failed to post in dispatch -> vendor/category/categoryAction",error);
    }
}

//HITTING GET CALL FOR subCATEGORIES based on caytegory FOR VENDOR VIEW  -$SAM
export const getSubCategoriesFromVendor=(categoryKey)=>async(dispatch)=>{
    try{
        console.log("hitting");
        // fetching data from crud -> route.js
        const response = await requestFromSubCategoryCRUD.getSubCategoriesData(categoryKey);
        console.log("response",response)
        dispatch(getVendorSubCategory(response.data));
     
    }catch(error)
    {
        // if failed to fetch 
        console.log("falied to get subcategories {actionVendor}");
    }
}

//HITTING GET CALL FOR all subCATEGORIES FOR VENDOR VIEW  -$SAM
export const getAllSubCategoriesFromVendor=()=>async(dispatch)=>{
    try{
        console.log("hitting");
        // fetching data from crud -> route.js
        const response = await requestFromSubCategoryCRUD.getAllSubCategoriesData();
        console.log("response",response)
        dispatch(getVendorSubCategory(response.data));
     
    }catch(error)
    {
        // if failed to fetch 
        console.log("falied to get subcategories {actionVendor}");
    }
}

// Updating Category by id  for changing name and status
export const updateSubCategoryById=(updateObject)=>async(dispatch)=>{
    console.log(updateObject)
    try{
        const response=await requestFromSubCategoryCRUD.updateSubCategoriesData(updateObject);
        dispatch(updateVendorSubCategory(response.data));
        const responseData = await requestFromSubCategoryCRUD.getAllSubCategoriesData();
        console.log("response",responseData)
        dispatch(getVendorSubCategory(responseData.data));
    }catch(error)
    {
        console.log("failed updating category Vendor",error);
    }
}

// delete category by id 
export const deleteSubCategoryById=(deleteObject)=>async(dispatch)=>{
    try{
        const response=await requestFromSubCategoryCRUD.deleteCategoriesData(deleteObject);
        dispatch(deleteVendorSubCategory(response.data));
        const responseData = await requestFromSubCategoryCRUD.getAllSubCategoriesData();
        console.log("response",responseData)
        dispatch(getVendorSubCategory(responseData.data));
    }catch(error)
    {
        console.log(`falied to delete in Category ${error}`);
    }
}