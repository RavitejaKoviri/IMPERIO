import { createSlice } from "@reduxjs/toolkit";

const initialSearchState = {
    searchData:[],
}

const searchSlice = createSlice({
    name : 'search',
    initialState : initialSearchState,
    reducers : {
        searchProduct : (state,action)=>{
            console.log("in slice",action.payload);
            state.searchData = action.payload;
        },
        clearsearchProduct:(state,action)=>{
            state.searchData =[];
        }
    }
})

export const {searchProduct,clearsearchProduct} = searchSlice.actions;
export default searchSlice.reducer;