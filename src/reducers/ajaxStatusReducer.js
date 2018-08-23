import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) == '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxCallsInProgress, action) {
  if (action.type == types.BEGIN_AJAX_CALL) {
    return status + 1;
  }
  else if(actionTypeEndsInSuccess(action.type) || action.type === types.AJAX_CALL_ERROR) {
    return status - 1;
  }

  return state;
}
