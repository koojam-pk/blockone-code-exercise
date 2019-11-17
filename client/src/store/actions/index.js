import axios from 'axios';

import { SET_ACCOUNTS, SET_TRANSACTIONS, SET_TRANSFER } from './types';

export function fetchAccounts() {
  return (dispatch) => {
    return axios.get('http://localhost:5000/api/accounts')
      .then(res => dispatch({
        type: SET_ACCOUNTS,
        payload: res.data.accounts
      }))
      .catch(err => {
        console.log('[Fetch Accounts Error]\n', err);
      });
  };
}

export function fetchTransactions(accountId) {
  return (dispatch) => {
    return axios.get('http://localhost:5000/api/transactions/' + accountId)
      .then(async (res) => dispatch({
        type: SET_TRANSACTIONS,
        payload: res.data.transactions
      }))
      .catch(err => {
        console.log('[Fetch Transactions Error]\n', err);
      });
  };
}

export function addTransfer(transfer) {
  return (dispatch) => {
    return axios.post('http://localhost:5000/api/transfer', transfer)
      .then(async (res) => {
        dispatch({
          type: SET_TRANSFER,
          payload: res.data.transaction
        });
        dispatch({
          type: SET_ACCOUNTS,
          payload: res.data.accounts
        });
      })
      .catch(err => {
        console.log('[Add Transfer Error]\n', err);
      });
  };
}
