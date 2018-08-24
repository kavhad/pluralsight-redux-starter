import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
  switch(action.type) {
    case types.LOAD_COURSES_SUCCESS:
      return Object.assign({}, state, { loaded:true, items: action.courses });
    case types.CREATE_COURSE_SUCCESS:
      return Object.assign({}, state, { items: [...state.items,
        Object.assign({}, action.course)
      ]});
    case types.UPDATE_COURSE_SUCCESS:
      return Object.assign({}, state, { items: [...state.items.filter(course => course.id !== action.course.id),
        Object.assign({}, action.course)
      ]});
    case types.DELETE_COURSE_SUCCESS:
      return Object.assign({}, state, { items: [...state.items.filter(course => course.id !== action.course.id)] });
    default:
      return state;
  }
}
