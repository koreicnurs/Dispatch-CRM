import {createSlice} from "@reduxjs/toolkit";

const name = 'learnings';

const learningsSlice = createSlice({
  name,
  initialState: {
    categories: [],
    category: [],
    article: null,
    loading: false,
    error: null,
    addCategoryLoading: false,
    addCategoryError: null,
    articleLoading: false,
    articleError: null,
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

    addLearningCategoryRequest(state) {
      state.addCategoryLoading = true;
      state.addCategoryError = null;
    },
    addLearningCategorySuccess(state) {
      state.addCategoryLoading = false;
    },
    addLearningCategoryFailure(state, action) {
      state.addCategoryLoading = false;
      state.addCategoryError = action.payload;
    },

    fetchLearningByCategoryRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLearningByCategorySuccess(state, action) {
      state.loading = false;
      state.category = action.payload;
    },
    fetchLearningByCategoryFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },

    addLearningArticleRequest(state) {
      state.articleLoading = true;
      state.articleError = null;
    },
    addLearningArticleSuccess(state) {
      state.articleLoading = false;
    },
    addLearningArticleFailure(state, action) {
      state.articleLoading = false;
      state.articleError = action.payload;
    },

    editLearningArticleRequest(state) {
      state.articleLoading = true;
      state.articleError = null;
    },
    editLearningArticleSuccess(state) {
      state.articleLoading = false;
    },
    editLearningArticleFailure(state, action) {
      state.articleLoading = false;
      state.articleError = action.payload;
    },

    deleteLearningArticleRequest(state) {
      state.articleLoading = true;
      state.articleError = null;
    },
    deleteLearningArticleSuccess(state) {
      state.articleLoading = false;
    },
    deleteLearningArticleFailure(state, action) {
      state.articleLoading = false;
      state.articleError = action.payload;
    },

    fetchLearningArticleRequest(state) {
      state.articleLoading = true;
      state.articleError = null;
    },
    fetchLearningArticleSuccess(state, action) {
      state.articleLoading = false;
      state.article = action.payload;
    },
    fetchLearningArticleFailure(state, action) {
      state.articleLoading = false;
      state.articleError = action.payload;
    },

    clearLearningCategoryErrors(state) {
      state.addCategoryError = null;
      state.error = null;
    },
    clearLearningArticleErrors(state) {
      state.articleError = null;
      state.error = null;
    },
  }
});

export default learningsSlice;