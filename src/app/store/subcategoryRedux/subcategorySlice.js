import { createSlice } from "@reduxjs/toolkit";

const inintialsubcategories={
    subcatgeoryDetails:[],
    subcategoryUpdatedMessage : ''
}

const subcategorySlice= createSlice({
    name: 'subcategory',
    initialState: inintialsubcategories,
    reducers: {
    postSubcategoryData : (state,action) => {
        console.log(action.payload);
    },
    getSubcategoryData : (state,action) => {
        console.log(action.payload);
        state.subcatgeoryDetails = action.payload;
    },
    deleteSubcategoryData : (state,action) => {
        console.log(action.payload);
    },
    putSubcategoryData : (state,action) => {
        state.subcategoryUpdatedMessage = action.payload;
        console.log(action.payload,"in slice");
    }   
}
})

export const {postSubcategoryData,getSubcategoryData,deleteSubcategoryData,putSubcategoryData} = subcategorySlice.actions;
export default subcategorySlice.reducer;