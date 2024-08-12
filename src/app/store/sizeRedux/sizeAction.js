import * as requestFromServer from './sizeCrud';
import {postSizeData , getSizeData, deleteSizeData} from './sizeSlice';

export const postSize = (data) => async (dispatch) => {
    console.log(data);
    try {
        const response = await requestFromServer.postSizeDetails(data);
        // Dispatch the action with the response data
        dispatch(postSizeData(response.data));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const getSize = () => async (dispatch) => {
    // console.log(data);
    try {
        const response = await requestFromServer.getSizeDetails();
        // Dispatch the action with the response data
        console.log("hello",response.sizes);
        dispatch(getSizeData(response.sizes));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const deleteSize = (data) => async (dispatch) => {
    // console.log(data);
    try {
        console.log("inacion",data);
        const response = await requestFromServer.deleteSizeDetails(data);
        // Dispatch the action with the response data
        console.log("hello",response.id);
        dispatch(deleteSizeData(response.id));
    } catch (error) {
        console.error("Error in action:", error);
    }
};