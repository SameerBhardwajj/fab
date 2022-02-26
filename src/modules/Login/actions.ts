import {actions} from '../../utils';

export const getLogin = (payload: Object, callback: Function) => {
  return (dispatch: Function) => {
    dispatch({
      type: actions.LOGIN,
      payload: {loginCredentials: payload},
    });
    callback();
  };
};
