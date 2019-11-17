import * as actionTypes from './../actions/types';

const initialState = {
  transactions: null,
};

const transactionReducer = (state = initialState, action) => {
  switch(action.type) {    
    case actionTypes.SET_TRANSACTIONS:
      return {
        ...state,
        transactions: [...action.payload]
      };
    case actionTypes.SET_TRANSFER:      
      const addTransactions = [...state.transactions];
      addTransactions.unshift(action.payload);
      return {
        ...state,
        transactions: addTransactions
      };
    default:
      return state;
  }
}
export default transactionReducer;