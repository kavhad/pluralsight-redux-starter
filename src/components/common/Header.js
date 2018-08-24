import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './LoadingDots';

const Header = ({loading, coursesLoaded, numOfCourses}) =>
  <nav>
    <IndexLink to="/" activeClassName="active">Home</IndexLink>
    {" - "}
    <Link to="/courses" activeClassName="active">Courses{coursesLoaded && " (" + numOfCourses + ")"}</Link>
    {" - "}
    <Link to="/about" activeClassName="active">About</Link>

    {loading && <LoadingDots interval={100} dots={20} />}
  </nav>;

Header.propTypes = {
  loading: PropTypes.bool.isRequired,
  coursesLoaded: PropTypes.bool.isRequired,
  numOfCourses: PropTypes.number.isRequred
};

export default Header;
