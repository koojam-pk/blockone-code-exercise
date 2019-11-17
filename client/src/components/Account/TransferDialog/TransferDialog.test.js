import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import TransferDialog from './TransferDialog';

const mockStore = configureMockStore([thunk]);

const setup = () => {
  const selectedAccount =  {
    id: 'c98743c3-6299-4c8c-9d3b-2daef4ab02fe',
    accountName: 'SGD Savings Account',
    accountNumber: '001-123-456-1',
    amount: 500000.00,
    ccy: 'sgd',
    createdAt: '2019-11-13 23:07:23'
  };
  const open = true;
  const accounts = [];
  const handleSubmit = jest.fn();

  const store = mockStore({
    account: {
      accounts: [{
        id: 'ea515c46-acbe-4161-b507-b5020861a6ad',
        accountName: 'SGD Current Account',
        accountNumber: '016-789-123-9',
        amount: 468500.00,
        ccy: 'sgd',
        createdAt: '2019-11-13 23:07:23'
      }]
    }
  });

  store.dispatch = jest.fn();

  const component = render(
    <Provider store={store}>    
      <TransferDialog selectedAccount={selectedAccount} open={open} 
        accounts={accounts} onClose={handleSubmit}>
      </TransferDialog>
    </Provider>);

  const amount = component.getByTestId('amount');
  const transferAmount = component.getByTestId('transferAmount');
  const toAccountId = component.getByTestId('toAccountId');
  const rate = component.getByTestId('rate');

  return {
    amount,
    transferAmount,
    toAccountId,
    rate,
    component,
  }
};

describe('TransferDialog', () => {
  it ('should not allow empty field in toAccountId', async () => {    
    const { toAccountId } = setup();    
    expect(toAccountId.value).toBe('');
    fireEvent.change(toAccountId, { target: { value: 'ea515c46-acbe-4161-b507-b5020861a6ad' } })
    expect(toAccountId.value).toBe('ea515c46-acbe-4161-b507-b5020861a6ad'); 
  });

  it ('should not allow empty field in transferAmount', async () => {    
    const { transferAmount } = setup();    
    expect(+transferAmount.value).toBe(0);
    fireEvent.change(transferAmount, { target: { value: 1000 } });
    expect(+transferAmount.value).toBe(1000);
  });

  it ('should not allow empty field in rate', async () => {    
    const { rate } = setup();
    expect(+rate.value).toBe(1);
    fireEvent.change(rate, { target: { value: 1.235 } });
    expect(+rate.value).toBe(1.235);
  });

})