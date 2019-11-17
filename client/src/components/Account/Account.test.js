import React from 'react';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createMount } from '@material-ui/core/test-utils';
// import toJson from 'enzyme-to-json';
import {act} from 'react-dom/test-utils';

import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Account from './Account';

configure({ adapter: new Adapter() });

const mockStore = configureMockStore([thunk]);
const store = mockStore({
  account: {
      accounts: [{
      id: 'ea515c46-acbe-4161-b507-b5020861a6ad',
      accountName: 'SGD Current Account',
      accountNumber: '016-789-123-9',
      amount: 468500.00,
      ccy: 'sgd',
      createdAt: '2019-11-13 23:07:23'
    },
    {
      id: '6d829248-e55d-48ac-8be5-73599fe36a2a',
      accountName: 'GBP Flex Saver',
      accountNumber: '018-456-123-2',
      amount: 10000.00,
      ccy: 'gbp',
      createdAt: '2019-11-13 23:07:23'
    },]
  }
});

const MyAppStore = () => (
  <Provider store={store}>
    <Account />
  </Provider>
);

const preventDefault = jest.fn();

describe('Account Page', () => {
  let mount;
  let wrapper;

  beforeEach(() => {
    mount = createMount({ dive: true});    
    wrapper= mount(<MyAppStore />);
  });  

  afterAll(() => {
    wrapper.unmount();
  });

  it('should render Select and MenuItems (Accounts)', async () => {          
    const selectElement = wrapper.find(Select);
    expect(wrapper.length).toEqual(1);
    expect(selectElement.props().inputProps['data-testid']).toBe('accountSelect');
    expect(selectElement.length).toEqual(1);
    expect(selectElement.props().children[1][0].props.value).toEqual('ea515c46-acbe-4161-b507-b5020861a6ad');
    expect(selectElement.props().children[1][1].props.value).toEqual('6d829248-e55d-48ac-8be5-73599fe36a2a');
    expect(selectElement.props().children[1][0].props.children[0]).toEqual('SGD Current Account');
    expect(selectElement.props().children[1][1].props.children[0]).toEqual('GBP Flex Saver');
    
    act(() => {
      selectElement.find('[role="button"]').simulate('click');    
    });
    selectElement.update();
    const selectedMenuItem = wrapper.find(MenuItem);
    act(() => {
      selectedMenuItem.at(1).simulate('click');
    });
    selectedMenuItem.update();
    expect(selectedMenuItem.at(0).props().selected).toEqual(true);     
  });

  it('should render TextField (Available Balance)', async () => {      
    const textFieldElement = wrapper.find(TextField);    

    expect(wrapper.length).toEqual(1);
    expect(textFieldElement.props().InputProps['id']).toBe('balance');
    textFieldElement.at(0).props.value = '468,500.00 SGD';        
    expect(textFieldElement.at(0).props.value).toEqual('468,500.00 SGD');        
  });
});
