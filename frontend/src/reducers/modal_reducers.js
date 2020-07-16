import { SHOW_MODAL, HIDE_MODAL } from '../actions/modal_actions';

const _DEFAULT_STATE = { modal: false };
export default (state = _DEFAULT_STATE, action) => {
  switch (action.type) {
    case SHOW_MODAL:
      return { modal: true };
    case HIDE_MODAL:
      return _DEFAULT_STATE;
    default:
      return state;
  }
};
