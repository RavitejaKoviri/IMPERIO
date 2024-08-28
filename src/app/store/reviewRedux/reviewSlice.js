import { createSlice } from "@reduxjs/toolkit";

const inintialReviews={
    reviewDetails:[],
}

const reviewSlice= createSlice({
    name: 'review',
    initialState: inintialReviews,
    reducers: {
    postReviewData : (state,action) => {
    },
    getReviewData : (state,action) => {
        state.reviewDetails = action.payload;
    } 
}
})

export const {postReviewData,getReviewData} = reviewSlice.actions;
export default reviewSlice.reducer;