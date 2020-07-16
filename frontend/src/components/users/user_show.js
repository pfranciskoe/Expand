import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../stylesheets/profile.css';

class UserShow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { userId, fetchUser } = this.props;
    fetchUser(userId);
  }

  render() {
    const { user } = this.props;
    if (!user) return null;
    return (
      <div className="profile-container">
        <div className="user-details-box">
          <div className="profile-pic"></div>
          <div className="user-info">
            <h1>{`${user.firstName} ${user.lastName}`}</h1>
            <h3>{user.email}</h3>
          </div>
        </div>
        <ul className="user-courses-box">
          <h1>My Courses</h1>
          {user.courses.map((course, idx) => {
            return (
              <NavLink key={idx} to={`/courses/${course._id}`}>
                <li key={course._id} className="course-info">
                  {course.title}
                </li>
              </NavLink>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default UserShow;
