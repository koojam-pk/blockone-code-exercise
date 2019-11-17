import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { configure } from 'enzyme';
import { createMount } from '@material-ui/core/test-utils';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import TableBody from '@material-ui/core/TableBody';

import Transactions from './Transactions';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  account: {
      accounts: [{
      id: 'ea515c46-acbe-4161-b507-b5020861a6ad',
      accountName: 'SGD Current Account',
      accountNumber: '016-789-123-9',
      amount: 201260.00,
      ccy: 'sgd',
      createdAt: '2019-11-13 23:07:23'
    },
    {
      id: '6d829248-e55d-48ac-8be5-73599fe36a2a',
      accountName: 'GBP Flex Saver',
      accountNumber: '018-456-123-2',
      amount: 16760.00,
      ccy: 'gbp',
      createdAt: '2019-11-13 23:07:23'
    },]
  },
  transaction: {
    transactions: [
      {
        "id" : "c16f0be6-72fb-428f-a6eb-8b239c6c4eb2",
        "accountId" : "ea515c46-acbe-4161-b507-b5020861a6ad",
        "description" : "Account Transfer",
        "action" : "debit",
        "ccy" : "sgd",
        "amount" : 50,
        "ccyInForeign" : "sgd",
        "amountInForeign" : 50,
        "rate" : 1,
        "createdAt" : "2019-11-17T07:57:48Z",
        "updatedAt" : "2019-11-17T07:57:48Z"
      },
      {
        "id" : "411b2edb-a95d-436a-a83b-2aa19b19ad71",
        "accountId" : "ea515c46-acbe-4161-b507-b5020861a6ad",
        "description" : "Account Transfer",
        "action" : "credit",
        "ccy" : "sgd",
        "amount" : 200,
        "ccyInForeign" : "sgd",
        "amountInForeign" : 200,
        "rate" : 1,
        "createdAt" : "2019-11-17T07:58:40Z",
        "updatedAt" : "2019-11-17T07:58:40Z"
      },
      {
        "id" : "abd0087d-3739-4436-bb56-f7b9c2a3e993",
        "accountId" : "ea515c46-acbe-4161-b507-b5020861a6ad",
        "description" : "Account Transfer",
        "action" : "debit",
        "ccy" : "sgd",
        "amount" : 1000,
        "ccyInForeign" : "sgd",
        "amountInForeign" : 1000,
        "rate" : 1,
        "createdAt" : "2019-11-17T08:00:12Z",
        "updatedAt" : "2019-11-17T08:00:12Z"
      },
      {
        "id" : "a5efbdc3-5048-429e-8e04-f6936131dde5",
        "accountId" : "ea515c46-acbe-4161-b507-b5020861a6ad",
        "description" : "Account Transfer",
        "action" : "debit",
        "ccy" : "sgd",
        "amount" : 10,
        "ccyInForeign" : "sgd",
        "amountInForeign" : 10,
        "rate" : 1,
        "createdAt" : "2019-11-17T08:01:41Z",
        "updatedAt" : "2019-11-17T08:01:41Z"
      },
      {
        "id" : "4b1f282f-27da-4b61-ae6d-7a496f7dfecd",
        "accountId" : "ea515c46-acbe-4161-b507-b5020861a6ad",
        "description" : "ATM Cheque Deposit",
        "action" : "credit",
        "ccy" : "sgd",
        "amount" : 75500,
        "ccyInForeign" : null,
        "amountInForeign" : null,
        "rate" : 1,
        "createdAt" : "2019-11-13T15:07:24Z",
        "updatedAt" : null
      },
      {
        "id" : "8eb80aee-e0b1-4707-b150-5d89b5cea190",
        "accountId" : "ea515c46-acbe-4161-b507-b5020861a6ad",
        "description" : "GIRO Transfer",
        "action" : "credit",
        "ccy" : "sgd",
        "amount" : 124500,
        "ccyInForeign" : null,
        "amountInForeign" : null,
        "rate" : 1,
        "createdAt" : "2019-11-13T15:07:24Z",
        "updatedAt" : null
      },      
    ]
  }

});

const accountId = 'ea515c46-acbe-4161-b507-b5020861a6ad';

const MyAppStore = () => (
  <Provider store={store}>
    <Transactions accountId={accountId} />
  </Provider>
);

describe('Transactions Page', () => {
  let mount;
  let wrapper;

  beforeEach(() => {
    mount = createMount({ dive: true});    
    wrapper= mount(<MyAppStore />);
  });  

  afterAll(() => {
    wrapper.unmount();
  });


  it('should render Transactions List', () => {
    // const tableElement = wrapper.find(Table);
    // const tableRowElement = wrapper.find(TableRow);
    
    const tableBodyElement = wrapper.find(TableBody);    
    expect(wrapper.length).toEqual(1);    
    expect(toJson(wrapper.at(0)).children[0].node.props.children.props.accountId).toEqual(accountId);
    expect(toJson(tableBodyElement).node.props.children.length).toEqual(6);    
  });
});