import { createSlice } from "@reduxjs/toolkit";

const inintialSizes={
    sizeDetails:[],
}

const sizeSlice= createSlice({
    name: 'size',
    initialState: inintialSizes,
    reducers: {
    postSizeData : (state,action) => {
        console.log(action.payload);
    },
    getSizeData : (state,action) => {
        console.log(action.payload);
        state.sizeDetails = action.payload;
    },
    deleteSizeData : (state,action) => {
        console.log(action.payload);
    }   
}
})

export const {postSizeData,getSizeData,deleteSizeData} = sizeSlice.actions;
export default sizeSlice.reducer;