import learningsSlice from "../slices/learningsSlice";

export const {
  fetchLearningCategoriesRequest,
  fetchLearningCategoriesSuccess,
  fetchLearningCategoriesFailure,
  addLearningCategoryRequest,
  addLearningCategorySuccess,
  addLearningCategoryFailure,
  fetchLearningByCategoryRequest,
  fetchLearningByCategorySuccess,
  fetchLearningByCategoryFailure,
  addLearningArticleRequest,
  addLearningArticleSuccess,
  addLearningArticleFailure,
  editLearningArticleRequest,
  editLearningArticleSuccess,
  editLearningArticleFailure,
  deleteLearningArticleRequest,
  deleteLearningArticleSuccess,
  deleteLearningArticleFailure,
  clearLearningCategoryErrors,
  clearLearningArticleErrors
} = learningsSlice.actions;