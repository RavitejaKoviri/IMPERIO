import { createSlice } from '@reduxjs/toolkit';
import { deleteCategory } from './categoryAction';

const initialCategoryState = {
  categoryData:[],
};

const categorySlice = createSlice({
  name: 'category',
  initialState: initialCategoryState,
  reducers: { 
    postCategoryDetails: (state, action) => {
        console.log(action.payload);
    },

    getCategoryDetails: (state, action) => {
      console.log(action.payload,"in slice")
      state.categoryData=action.payload;
    },

    deleteCategoryDetails: (state,action) => {
      // state.categoryData=action.payload;

      console.log(action.payload)
    },

    editCategoryDetails: (state,action) => {
        // state.categoryData=action.payload;
      console.log(action.payload)
    }
  },
});

export const { postCategoryDetails,getCategoryDetails,deleteCategoryDetails,editCategoryDetails } = categorySlice.actions;
export default categorySlice.reducer;
