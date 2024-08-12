import { createSlice } from "@reduxjs/toolkit";

const inintialReviews={
    reviewDetails:[],
}

const reviewSlice= createSlice({
    name: 'review',
    initialState: inintialReviews,
    reducers: {
    postReviewData : (state,action) => {
        console.log(action.payload);
    },
    getReviewData : (state,action) => {
        console.log("in slice",action.payload);
        state.reviewDetails = action.payload;
    } 
}
})

export const {postReviewData,getReviewData} = reviewSlice.actions;
export default reviewSlice.reducer;