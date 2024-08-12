import { createSlice } from "@reduxjs/toolkit";

const inintialRatings={
    ratingDetails:0,
}

const ratingSlice= createSlice({
    name: 'rating',
    initialState: inintialRatings,
    reducers: {
    postRatingData : (state,action) => {
        console.log(action.payload);
    },
    getRatingData : (state,action) => {
        console.log("in sliceeee",action.payload);
        state.ratingDetails = action.payload;
    } 
}
})

export const {postRatingData,getRatingData} = ratingSlice.actions;
export default ratingSlice.reducer;