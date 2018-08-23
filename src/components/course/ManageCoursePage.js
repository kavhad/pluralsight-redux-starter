import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';
import toastr from 'toastr';
import {authorsFormattedForDropdown} from '../../selectors/selectors';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {},
      saving: false
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourse = this.saveCourse.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if(this.props.course.id !== newProps.course.id) {
      const course = Object.assign({}, newProps.course);
      this.setState({course});
    }
  }

  updateCourseState(event) {
    const field = event.target.name;
    let course = this.state.course;
    course[field] = event.target.value;

    return this.setState({course: course});
  }

  courseFormIsValid() {
    let formIsValid = true;
    let errors = {};

    if(this.state.course.title.length < 5) {
      errors.title = 'Title must be at least 5 characters.';
      formIsValid = false;
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  saveCourse(event) {
    event.preventDefault();

    if(!this.courseFormIsValid()) {
      return;
    }

    this.setState({saving: true});
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.redirect())
      .catch(error => {
        toastr.error(error);
        this.setState({saving: false});
      });
  }

  redirect() {
    toastr.success('Course saved!');
    this.setState({saving: false});
    this.context.router.push('/courses');
  }

  render() {
    return (
        <CourseForm
          allAuthors={this.props.authors}
          course={this.state.course}
          errors={this.state.errors}
          onSave={this.saveCourse}
          onChange={this.updateCourseState}
          saving={this.state.saving} />
    );
  }

}

ManageCoursePage.propTypes = {
  actions: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

const newCourse = () => ({id:'', watchHref:'', title:'', authorId:'', length:'', category:''});

function getCourseById(courses, courseId) {
  if(!courseId)
    return newCourse();

  const coursesFiltered = courses.filter(course => course.id == courseId);

  if(coursesFiltered.length == 0)
    return newCourse();

  return coursesFiltered[0];
}

const mapStateToProps = (state, ownProps) => ({
  course: getCourseById(state.courses, ownProps.params.id),
  authors: authorsFormattedForDropdown(state.authors)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(courseActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
