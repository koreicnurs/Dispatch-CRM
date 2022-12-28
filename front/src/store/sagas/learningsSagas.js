import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {addNotification} from "../actions/notifierActions";
import {
  addLearningCategoryFailure,
  addLearningCategoryRequest,
  addLearningCategorySuccess,
  fetchLearningByCategoryFailure,
  fetchLearningByCategoryRequest,
  fetchLearningByCategorySuccess,
  fetchLearningCategoriesFailure,
  fetchLearningCategoriesRequest,
  fetchLearningCategoriesSuccess
} from "../actions/learningsActions";

export function* fetchLearningCategories() {
  try {
    const response = yield axiosApi('/learningCategories');
    yield put(fetchLearningCategoriesSuccess(response.data));
  } catch (e) {
    yield put(fetchLearningCategoriesFailure(e.response && e.response.data));
    yield put(addNotification({message: 'Learning Categories fetch failed!', variant: 'error'}));
  }
}

export function* addLearningCategory({payload: data}) {
  try {
    yield axiosApi.post('/learningCategories', data);
    yield put(addLearningCategorySuccess());
    yield put(addNotification({message: 'Learning Category is added!', variant: 'success'}));
    yield put(fetchLearningCategoriesRequest());
  } catch (e) {
    yield put(addLearningCategoryFailure(e.response.data));
    yield put(addNotification({message: 'Learning Category creation failed!', variant: 'error'}));
  }
}

export function* fetchLearningByCategory({payload: id}) {
  try {
    const response = yield axiosApi('/learnings?category=' + id);
    yield put(fetchLearningByCategorySuccess(response.data));
  } catch (e) {
    yield put(fetchLearningByCategoryFailure(e.response && e.response.data));
    yield put(addNotification({message: 'Learning Category Articles fetch failed!', variant: 'error'}));
  }
}

const learningsSaga = [
  takeEvery(fetchLearningCategoriesRequest, fetchLearningCategories),
  takeEvery(addLearningCategoryRequest, addLearningCategory),
  takeEvery(fetchLearningByCategoryRequest, fetchLearningByCategory),
];

export default learningsSaga;