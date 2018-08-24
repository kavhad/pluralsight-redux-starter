import React, {PropTypes} from 'react';
import {browserHistory} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseList from './CourseList';
import toastr from 'toastr';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.deleteCourse = this.deleteCourse.bind(this);
  }

  redirectToAddCoursePage() {
    browserHistory.push('/course');
  }

  deleteCourse(course) {
    this.props.actions.deleteCourse(course)
    .then(() => {
      toastr.success('Course deleted');
    })
    .catch(error => {
      toastr.error(error);
      this.setState({saving: false});
    });
  }

  renderListOrEmptyMessage(courses, loaded) {
    if(courses.length > 0) {
      return (<CourseList courses={courses} onDelete={this.deleteCourse} />);
    } else if(!loaded) {
      return (<h2>Loading...</h2>);
    } else {
      return (<h2>There are not courses at the moment!</h2>);
    }
  }

  render() {

    const {courses, loaded} = this.props;

    return (
      <div>
        <h1>Courses</h1>
        <input
          type="submit"
          value="Add Course"
          className="btn btn-primary"
          onClick={this.redirectToAddCoursePage} />
        {this.renderListOrEmptyMessage(courses, loaded)}
      </div>
    );
  }
 }

 CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  loaded : PropTypes.bool.isRequired
 };

 const mapStateToProps = (state, ownProps) => ({courses : state.courses.items, loaded: state.courses.loaded});

 const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(courseActions, dispatch)
 });

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);

