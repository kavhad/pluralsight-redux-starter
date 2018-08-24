import React, {PropTypes} from 'react';
import Header from './common/Header';
import {connect} from 'react-redux';

class App extends React.Component {
  render() {
      return (<div className="container-fluid">
              <Header loading={this.props.loading} coursesLoaded={this.props.coursesLoaded} numOfCourses={this.props.numOfCourses} />
              {this.props.children}
          </div>);
  }
}

App.propTypes = {
    children: PropTypes.object.isRequired,
    loading: PropTypes.bool,
    coursesLoaded: PropTypes.bool.isRequired,
    numOfCourses: PropTypes.number.isRequred
};

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxCallsInProgress > 0,
    coursesLoaded: state.courses.loaded,
    numOfCourses: state.courses.items.length
  };
}

export default connect(mapStateToProps)(App);
