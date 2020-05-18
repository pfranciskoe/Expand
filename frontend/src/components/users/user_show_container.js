import {connect} from 'react-redux';
import UserShow from './user_show';
import {fetchUser} from '../../actions/users_actions';

const mapStateToProps = ({entities: {users}}, {match: {params}}) => ({
    userId: params.userId,
    user: Object.values(users).length ? users[params.userId] : undefined,
});

const mapDispatchToProps = dispatch => ({
    fetchUser: (userId) => dispatch(fetchUser(userId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserShow);