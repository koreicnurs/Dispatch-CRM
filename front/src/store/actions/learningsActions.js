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
  clearLearningCategoryErrors
} = learningsSlice.actions;