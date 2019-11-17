import { combineReducers } from 'redux';
import accountReducer from './accountReducer';
import transactionReducer from './transactionReducer';

export default combineReducers({  
  account: accountReducer,
  transaction: transactionReducer
});