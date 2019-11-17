import * as actions from './index';
import * as types from './types';
import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import expect from 'expect';
import "jest";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('FETCH_ACCOUNTS action', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it ('create FETCH_ACCOUNTS action', async () => {
    fetchMock.getOnce('/api/accounts', {
      headers: { 'content-type': 'application/json'}
    });

    const store = mockStore({ accounts: null});
    return store.dispatch(actions.fetchAccounts())
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.SET_ACCOUNTS);
        expect(actions[0].payload.length).toBeGreaterThanOrEqual(0);
        expect(actions[0].payload[0]).toHaveProperty('id');
        expect(actions[0].payload[0]).toHaveProperty('accountName');
        expect(actions[0].payload[0]).toHaveProperty('accountNumber');
        expect(actions[0].payload[0]).toHaveProperty('ccy');
        expect(actions[0].payload[0]).toHaveProperty('amount');
        expect(actions[0].payload[0]).toHaveProperty('createdAt');
        expect(actions[0].payload[0]).toHaveProperty('updatedAt');
      });
  });
});

describe('FETCH_TRANSACTIONS action', () => {
  beforeEach(() => {
    jest.resetModules();
  });

  afterEach(() => {
    fetchMock.restore();
  });
  it ('create FETCH_TRANSACTIONS action', async () => {
    const store = mockStore({ transactions: []});
    return store.dispatch(actions.fetchTransactions('6d829248-e55d-48ac-8be5-73599fe36a2a'))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.SET_TRANSACTIONS);
        expect(actions[0].payload.length).toBeGreaterThanOrEqual(0);
        expect(actions[0].payload[0]).toHaveProperty('id');
        expect(actions[0].payload[0]).toHaveProperty('accountId');
        expect(actions[0].payload[0]).toHaveProperty('description');
        expect(actions[0].payload[0]).toHaveProperty('action');
        expect(actions[0].payload[0]).toHaveProperty('ccy');
        expect(actions[0].payload[0]).toHaveProperty('amount');
        expect(actions[0].payload[0]).toHaveProperty('ccyInForeign');
        expect(actions[0].payload[0]).toHaveProperty('amountInForeign');
        expect(actions[0].payload[0]).toHaveProperty('rate');
        expect(actions[0].payload[0]).toHaveProperty('createdAt');
        expect(actions[0].payload[0]).toHaveProperty('updatedAt');
      });
  });
});

// This test will send test data to server
describe('ADD_TRANSFER action', () => {  
  beforeEach(() => {
    jest.resetModules();    
  });

  afterEach(() => {
    fetchMock.restore();
  });
  it ('create ADD_TRANSFER action', async () => {
    const store = mockStore({ transactions: [], accounts: []});
    return store.dispatch(actions.addTransfer({
        fromId: 'c98743c3-6299-4c8c-9d3b-2daef4ab02fe',
        toId: 'ea515c46-acbe-4161-b507-b5020861a6ad',
        ccy: 'sgd',      
        amount: 1,
        ccyInForeign: 'sgd',
        amountInForeign: 1,
        rate: 1
      }))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toEqual(types.SET_TRANSFER);        
        expect(actions[0].payload).toHaveProperty('id');
        expect(actions[0].payload).toHaveProperty('accountId');
        expect(actions[0].payload).toHaveProperty('description');
        expect(actions[0].payload).toHaveProperty('action');
        expect(actions[0].payload).toHaveProperty('ccy');
        expect(actions[0].payload).toHaveProperty('amount');
        expect(actions[0].payload).toHaveProperty('ccyInForeign');
        expect(actions[0].payload).toHaveProperty('amountInForeign');
        expect(actions[0].payload).toHaveProperty('rate');
        expect(actions[0].payload).toHaveProperty('createdAt');
        expect(actions[0].payload).toHaveProperty('updatedAt');

        expect(actions[1].type).toEqual(types.SET_ACCOUNTS);
        expect(actions[1].payload.length).toBeGreaterThanOrEqual(0);
        expect(actions[1].payload[0]).toHaveProperty('id');
        expect(actions[1].payload[0]).toHaveProperty('accountName');
        expect(actions[1].payload[0]).toHaveProperty('accountNumber');
        expect(actions[1].payload[0]).toHaveProperty('ccy');
        expect(actions[1].payload[0]).toHaveProperty('amount');
        expect(actions[1].payload[0]).toHaveProperty('createdAt');
        expect(actions[1].payload[0]).toHaveProperty('updatedAt');        
      });
  });
});
