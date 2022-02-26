import {actions} from '../../utils';

const initialState = {
  loginCredentials: {},
};

const Reducer = (state = initialState, action: any) => {
  console.log(action);

  switch (action.type) {
    case actions.LOGIN:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default Reducer;
