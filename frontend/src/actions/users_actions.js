import * as UsersAPIUtil from '../util/users_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const REMOVE_USER = 'REMOVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';

export const receiveUser = (user) => ({
  type: RECEIVE_USER,
  user,
});

export const removeUser = (userId) => ({
  type: REMOVE_USER,
  userId,
});

export const receiveUserErrors = (errors) => ({
  type: RECEIVE_USER_ERRORS,
  errors,
});

export const fetchUser = (userId) => (dispatch) => {
  UsersAPIUtil.fetchUser(userId).then(
    (user) => dispatch(receiveUser(user)),
    (err) => dispatch(receiveUserErrors(err))
  );
};

export const updateUser = (user) => (dispatch) => {
  UsersAPIUtil.updateUser(user).then(
    (user) => dispatch(receiveUser(user)),
    (err) => dispatch(receiveUserErrors(err))
  );
};

export const deleteUser = (userId) => (dispatch) => {
  UsersAPIUtil.deleteUser(userId).then((userId) =>
    dispatch(removeUser(userId))
  );
};
