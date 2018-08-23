import * as types from './actionTypes';
import AuthorApi from '../api/mockAuthorApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export const loadAuthorsSuccess = (authors) => ({
  type: types.LOAD_AUTHORS_SUCCESS, authors
});

export const loadAuthors = () =>
  (dispatch) => {
    dispatch(beginAjaxCall());
    return AuthorApi.getAllAuthors()
             .then(authors => dispatch(loadAuthorsSuccess(authors)))
             .catch(error => {
               dispatch(ajaxCallError());
               throw(error);
            });
  };
