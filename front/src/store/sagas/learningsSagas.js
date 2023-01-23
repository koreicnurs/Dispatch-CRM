import {put, takeEvery} from "redux-saga/effects";
import axiosApi from "../../axiosApi";
import {addNotification} from "../actions/notifierActions";
import {
  addLearningArticleFailure,
  addLearningArticleRequest,
  addLearningArticleSuccess,
  addLearningCategoryFailure,
  addLearningCategoryRequest,
  addLearningCategorySuccess, addLearningCommentFailure,
  addLearningCommentRequest,
  addLearningCommentSuccess,
  deleteLearningArticleFailure,
  deleteLearningArticleRequest,
  deleteLearningArticleSuccess,
  editLearningArticleFailure,
  editLearningArticleRequest,
  editLearningArticleSuccess,
  fetchLearningArticleFailure,
  fetchLearningArticleRequest,
  fetchLearningArticleSuccess,
  fetchLearningByCategoryFailure,
  fetchLearningByCategoryRequest,
  fetchLearningByCategorySuccess,
  fetchLearningCategoriesFailure,
  fetchLearningCategoriesRequest,
  fetchLearningCategoriesSuccess, searchArticleFailure, searchArticleRequest, searchArticleSuccess
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

export function* addLearningArticle({payload}) {
  try {
    yield axiosApi.post('/learnings', payload.data);
    yield put(addLearningArticleSuccess());
    yield put(addNotification({message: 'Learning Article is added!', variant: 'success'}));
    yield put(fetchLearningByCategoryRequest(payload.category));
  } catch (e) {
    yield put(addLearningArticleFailure(e.response.data));
    yield put(addNotification({message: 'Learning Article creation failed!', variant: 'error'}));
  }
}

export function* editLearningArticle({payload}) {
  try {
    yield axiosApi.put('/learnings/' + payload.article, payload.data);
    yield put(editLearningArticleSuccess());
    yield put(addNotification({message: 'You have successfully edited an Article!', variant: 'success'}));
    yield put(fetchLearningByCategoryRequest(payload.category));
  } catch (e) {
    yield put(editLearningArticleFailure(e.response.data));
    yield put(addNotification({message: 'Article editing failed!', variant: 'error'}));
  }
}

export function* deleteLearningArticle({payload: id}) {
  try {
    yield axiosApi.delete('/learnings/' + id);
    yield put(deleteLearningArticleSuccess());
    yield put(addNotification({message: 'You have successfully deleted an Article!', variant: 'success'}));
  } catch (e) {
    yield put(deleteLearningArticleFailure(e.response.data));
    yield put(addNotification({message: 'Article deleting failed!', variant: 'error'}));
  }
}

export function* fetchLearningArticle({payload: id}) {
  try {
    const response = yield axiosApi('/learnings/' + id);
    yield put(fetchLearningArticleSuccess(response.data));
  } catch (e) {
    yield put(fetchLearningArticleFailure(e.response && e.response.data));
    yield put(addNotification({message: 'Learning Article fetch failed!', variant: 'error'}));
  }
}

export function* addLearningComment({payload}) {
  try {
    yield axiosApi.post('/learnings/comment/' + payload.id, {text: payload.data});
    yield put(addLearningCommentSuccess());
    yield put(addNotification({message: 'Your comment is added!', variant: 'success'}));
    yield put(fetchLearningArticleRequest(payload.id));
  } catch (e) {
    yield put(addLearningCommentFailure(e.response.data));
    yield put(addNotification({message: 'Comment creation failed!', variant: 'error'}));
  }
}

export function* searchArticle({payload}) {
  try {
    const response = yield axiosApi('/learnings?category=' + payload.id + '&title=' + payload.title);
    yield put(searchArticleSuccess(response.data));
    yield put(addNotification({message: 'Search has been successful', variant: 'success'}));
  } catch (e) {
    yield put(searchArticleFailure(e.response.data));
    yield put(addNotification({message: 'Search failed', variant: 'error'}));
  }
}

const learningsSaga = [
  takeEvery(fetchLearningCategoriesRequest, fetchLearningCategories),
  takeEvery(addLearningCategoryRequest, addLearningCategory),
  takeEvery(fetchLearningByCategoryRequest, fetchLearningByCategory),
  takeEvery(addLearningArticleRequest, addLearningArticle),
  takeEvery(editLearningArticleRequest, editLearningArticle),
  takeEvery(deleteLearningArticleRequest, deleteLearningArticle),
  takeEvery(fetchLearningArticleRequest, fetchLearningArticle),
  takeEvery(addLearningCommentRequest, addLearningComment),
  takeEvery(searchArticleRequest, searchArticle)
];

export default learningsSaga;