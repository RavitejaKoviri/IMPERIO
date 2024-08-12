import { createSlice } from '@reduxjs/toolkit';

const initialProductState = {
  productData:[],
};

const productSlice = createSlice({
  name: 'product',
  initialState: initialProductState,
  reducers: { 
    postProductDetails: (state, action) => {
        console.log("in slice",action.payload);
        console.log(productData);

    },

    getProductDetails: (state, action) => {
      console.log("in Slice",action.payload);
      state.productData=action.payload;
    },
  },
});

export const { postProductDetails,getProductDetails } = productSlice.actions;
export default productSlice.reducer;
