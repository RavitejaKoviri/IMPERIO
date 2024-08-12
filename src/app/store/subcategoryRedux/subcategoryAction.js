import * as requestFromServer from './subcategoryCRUD';
import {postSubcategoryData , getSubcategoryData, deleteSubcategoryData, putSubcategoryData} from './subcategorySlice';

export const postSubcategory = (data) => async (dispatch) => {
    console.log(data);
    try {
        const response = await requestFromServer.postSubcategoryDetails(data);
        // Dispatch the action with the response data
        dispatch(postSubcategoryData(response.data));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const getSubcategory = () => async (dispatch) => {
    // console.log(data);
    try {
        const response = await requestFromServer.getSubcategoryDetails();
        // Dispatch the action with the response data
        console.log("hello",response);
        dispatch(getSubcategoryData(response));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const putSubcategory = (data) => async (dispatch) => {
    console.log("in action",data);
    try {
        const response = await requestFromServer.putSubcategoryDetails(data);
        // Dispatch the action with the response data
        console.log("hello",response);
        dispatch(putSubcategoryData(response));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const deleteSubcategory = (data) => async (dispatch) => {
    // console.log(data);
    try {
        console.log("inaction",data);
        const response = await requestFromServer.deleteSubcategoryDetails(data);
        // Dispatch the action with the response data
        console.log("hello",response.id);
        dispatch(deleteSizeData(response.id));
    } catch (error) {
        console.error("Error in action:", error);
    }
};