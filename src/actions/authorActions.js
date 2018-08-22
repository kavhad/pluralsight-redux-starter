import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';

export const loadAuthorsSuccess = (authors) => ({
  type: types.LOAD_AUTHORS_SUCCESS, authors
});

export const loadAuthors = () =>
  (dispatch) =>
    AuthorApi.getAllAuthors()
             .then(authors => dispatch(loadAuthorsSuccess(authors)))
             .catch(error => { throw(error); });
