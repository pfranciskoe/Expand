import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchUser } from '../../actions/users_actions';
import NavBar from './navbar';
import { getUserCourses } from '../../actions/courses_actions';

const mapStateToProps = ({entities: {courses}, session}) => {
    let userId = undefined;
    if (session.user) 
    return {
        loggedIn: session.isAuthenticated,
        userId,
        currentUser: session.user,
        courses
    }
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    getUserCourses: (userId) => dispatch(getUserCourses(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);