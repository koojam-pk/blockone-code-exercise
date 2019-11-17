import * as actionTypes from './../actions/types';

const initialState = {
  accounts: null,
};

const accountReducer = (state=initialState, action) => {
  switch(action.type) {
    case actionTypes.SET_ACCOUNTS:
      return {
        ...state,
        accounts: [...action.payload]
      };
    default:
      return state;
  }

}
export default accountReducer;