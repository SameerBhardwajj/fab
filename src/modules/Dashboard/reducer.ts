import {actions} from '../../utils';

const initialState = {
  newsData: [],
};

const Reducer = (state = initialState, action: any) => {
  console.log(action);
  
  switch (action.type) {
    case actions.NEWS_DATA:
      return {...state, ...action.payload};
    default:
      return state;
  }
};

export default Reducer;
