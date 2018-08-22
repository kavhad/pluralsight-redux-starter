import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as courseActions from '../../actions/courseActions';
import CourseForm from './CourseForm';

class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      errors: {}
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

  saveCourse(event) {
    event.preventDefault();
    this.props.actions.saveCourse(this.state.course)
      .then(() => this.context.router.push('/courses'));
  }

  render() {
    return (
        <CourseForm
          allAuthors={this.props.authors}
          course={this.state.course}
          errors={this.state.errors}
          onSave={this.saveCourse}
          onChange={this.updateCourseState} />
    );
  }

}

ManageCoursePage.propTypes = {
  actions: PropTypes.object.isRequired,
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired
  //myProp: PropTypes.string.isRequired
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
  authors: state.authors.map(author => ({value:author.id, text:author.firstName + ' ' + author.lastName}))
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(courseActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
