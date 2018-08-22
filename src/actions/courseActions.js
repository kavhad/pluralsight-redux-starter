import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';


export const loadCoursesSuccess = (courses) => ({
  type: types.LOAD_COURSES_SUCCESS,
  courses
});

export const loadCourses = () =>
    (dispatch) =>
      courseApi.getAllCourses().then(courses => {
        dispatch(loadCoursesSuccess(courses));
      }).catch(error => {
        throw(error);
      });


export const updateCourseSuccess = (course) => ({ type : types.UPDATE_COURSE_SUCCESS, course });
export const createCourseSuccess = (course) => ({ type : types.CREATE_COURSE_SUCCESS, course });

export const saveCourse = (course) =>
      (dispatch, getState) =>
        courseApi.saveCourse(course)
        .then(savedCourse => course.id ? dispatch(updateCourseSuccess(savedCourse)) : dispatch(createCourseSuccess(savedCourse)))
        .catch(error => {
          throw(error);
         });
