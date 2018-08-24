import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';

describe('Course Reducer', () => {
  it('should add course when passed CREATE_COURSE_SUCCESS', () => {
    const initialState = [
      {title: 'A'},
      {title: 'B'}
    ]

    const newCourse = {title: 'C'};

    const action = actions.createCourseSuccess(newCourse);

    const newState = courseReducer(initialState, action);

    expect(newState.length).toBe(3);
    expect(newState[0].title).toBe('A');
    expect(newState[1].title).toBe('B');
    expect(newState[2].title).toBe('C');

  });

  it('should update course when passed UPDATE_COURSE_SUCESS', () => {
    const initialState = [
      {title: 'A', id: 'A'},
      {title: 'B', id: 'B'},
      {title: 'C', id: 'C'}
    ]

    const updateCourse = {title: 'C2', id: 'C'};

    const action = actions.updateCourseSuccess(updateCourse);

    const newState = courseReducer(initialState, action);

    expect(newState.length).toBe(3);
    expect(newState[0].title).toBe('A');
    expect(newState[1].title).toBe('B');
    expect(newState[2].title).toBe('C2');
  });
});

