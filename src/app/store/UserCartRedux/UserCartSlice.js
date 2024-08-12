import { createSlice } from "@reduxjs/toolkit";

const initialCartState={
    cartData : []
}


const cartSlice = createSlice({
    name:'cartModified',
    initialState:initialCartState,
    reducers:{
        getCartProductsData : (state,action)=>{
            state.cartData=action.payload;
            console.log("instate cart",state.cartData);
        }
    }
})

export const {getCartProductsData} = cartSlice.actions;
export default cartSlice.reducer;