import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const doCallWith = (myFunc, arg) => () => myFunc(arg);

const CourseListRow = ({course, onClickDelete}) => (
  <tr>
      <td><a href={course.watchHref} target="_blank">Watch</a></td>
      <td><Link to={'/course/'+ course.id}>{course.title}</Link></td>
      <td>{course.authorId}</td>
      <td>{course.category}</td>
      <td>{course.length}</td>
      <td><button className="btn btn-primary" onClick={doCallWith(onClickDelete, course)}>Delete</button></td>
  </tr>
);

CourseListRow.propTypes = {
  course: PropTypes.object.isRequired,
  onClickDelete: PropTypes.func.isRequired
};

export default CourseListRow;
