import { getReviewData, postReviewData } from './reviewSlice';
import { getRatingData } from '../ratingRedux/ratingSlice';
import * as requestFromServer from './reviewCRUD';
import * as requestFromRatingServer from '../ratingRedux/ratingCRUD'


export const postReview = (data) => async (dispatch) => {
    console.log(data,"hello data coming");
    try {
        let sum=0;
        const response = await requestFromServer.postReviewDetails(data);
        // Dispatch the action with the response data
        console.log(typeof(response.success),"response from review post");
        if(response.success)
        {
            // after posting review calculating overal rating for particualr product
            const response1 = await requestFromServer.getReviewDetails(data.proid);
            console.log(response1,"response test from post");
            for(let i=0;i<response1.length;i++)
            {
                sum=sum+response1[i].rating;
                console.log(sum,"sum");
            }
            console.log(Math.ceil(sum/response1.length),"avg");//caluculate overall rating ;
            dispatch(getReviewData(response1));
            console.log("teest");
            const overallrating = await requestFromRatingServer.postRatingDetails({proid:data.proid,overallRating:Math.ceil(sum/response1.length)});
            console.log(overallrating,"overall rating");
            if(overallrating.success===true)
            {
                const response = await requestFromRatingServer.getRatingDetails(data.proid);
                console.log("hellofor overall",response);
                dispatch(getRatingData(response));
            }



        }
        
    } catch (error) {
        console.error("Error in action:", error);
    }
};

export const getReview = (productid) => async (dispatch) => {
    // console.log(data);
    try {
        const response = await requestFromServer.getReviewDetails(productid);
        // Dispatch the action with the response data
        console.log("hello",response);
        dispatch(getReviewData(response));
    } catch (error) {
        console.error("Error in action:", error);
    }
};

