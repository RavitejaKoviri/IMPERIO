import { getRatingData, postRatingData } from './ratingSlice';
import * as requestFromServer from './ratingCRUD';

export const postRating = (data) => async (dispatch) => {
    console.log(data);
    try {
        const response = await requestFromServer.postRatingDetails(data);
        // Dispatch the action with the response data
        dispatch(postRatingData(response.data));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const getRating = (proid) => async (dispatch) => {
    console.log(proid,"ddfdf");
    try {
        const response = await requestFromServer.getRatingDetails(proid);
        // Dispatch the action with the response data
        console.log("hello",response);
        dispatch(getRatingData(response));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

