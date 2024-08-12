import { createSlice } from "@reduxjs/toolkit";

const inintialUserAddress={
    addressDetails:[],
}

const addressSlice= createSlice({
    name: 'address',
    initialState: inintialUserAddress,
    reducers: {
    postAddressData : (state,action) => {
        console.log(action.payload);
        console.log("Data:", action.payload);
    },
    getAddressData : (state,action) => {
        console.log(action.payload);
        state.addressDetails = action.payload;
    },   
    deleteAddressData: (state, action) => {
        console.log(action.payload);
    }, 
    updateAddressData: (state, action) => {
        console.log(action.payload);
      }
}
});

export const {postAddressData, getAddressData, deleteAddressData, updateAddressData} = addressSlice.actions;
export default addressSlice.reducer;