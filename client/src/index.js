import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter }  from 'react-router-dom';

import App from './components/App';
import reducers from './store/reducers';

import './index.scss';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

const MyAppWithStore = () => (
  <Provider store={store}>
    <BrowserRouter basename='/'>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<MyAppWithStore />,
  document.getElementById('root')
);
