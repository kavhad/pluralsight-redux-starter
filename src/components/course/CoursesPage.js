import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';

 class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    // this.state = {
    //   course: { title: '' }
    // };

    // this.onTitleChange = this.onTitleChange.bind(this);
    // this.onClickSave = this.onClickSave.bind(this);

  }

  // onTitleChange(event) {
  //   const course = this.state.course;
  //   course.title = event.target.value;
  //   this.setState({course: course});
  // }

  // onClickSave(event) {
  //   this.props.actions.createCourse(this.state.course);
  // }

  // courseRow(course, index) {
  //   return <div key={index}>{course.title}</div>;
  // }

  render() {

    const {courses} = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <CourseList courses={courses} />
      </div>
    );
  }
 }

 CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired
 };

 const mapStateToProps = (state, ownProps) => ({courses : state.courses});

 const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(courseActions, dispatch)
 });

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

