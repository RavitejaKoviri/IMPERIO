import { createSlice } from '@reduxjs/toolkit';

const initialInvoiceState = {
  invoiceData:[],
};

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState: initialInvoiceState,
  reducers: { 
    postInvoiceDetails: (state, action) => {
        console.log(action.payload);
    },

    getInvoiceDetails: (state, action) => {
      console.log(action.payload,"heyyyy")
      state.invoiceData=action.payload;
    },
  },
});

export const { postInvoiceDetails,getInvoiceDetails } = invoiceSlice.actions;
export default invoiceSlice.reducer;
