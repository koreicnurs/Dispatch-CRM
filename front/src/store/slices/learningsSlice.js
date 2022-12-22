import {createSlice} from "@reduxjs/toolkit";

const name = 'learnings';

const learningsSlice = createSlice({
  name,
  initialState: {
    categories: [],
    loading: false,
    error: null,
    addCategoryLoading: false,
    addCategoryError: null,
  },
  reducers: {
    fetchLearningCategoriesRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLearningCategoriesSuccess(state, action) {
      state.loading = false;
      state.categories = action.payload;
    },
    fetchLearningCategoriesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  }
});

export default learningsSlice;