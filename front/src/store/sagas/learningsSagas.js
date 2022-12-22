import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {addNotification} from "../actions/notifierActions";
import {
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

const learningsSaga = [
  takeEvery(fetchLearningCategoriesRequest, fetchLearningCategories),
];

export default learningsSaga;