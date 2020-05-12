import { connect } from 'react-redux';
import { logout } from '../../actions/session_actions';
import { fetchUser } from '../../actions/users_actions';
import NavBar from './navbar';
import { getUserCourses } from '../../actions/courses_actions';

const mapStateToProps = ({entities: {users, courses}, session}) => {
    let userId = undefined;
    let currentUser = undefined;
    if (session.user){
        userId = session.user.id;
        currentUser = users[userId];
    }
    return {
        loggedIn: session.isAuthenticated,
        userId,
        currentUser,
        courses
    }
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
    fetchUser: (userId) => dispatch(fetchUser(userId)),
    getUserCourses: (userId) => dispatch(getUserCourses(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);