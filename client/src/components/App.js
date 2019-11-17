import React from 'react';
import {  Route, Switch, Redirect }  from 'react-router-dom';

import Header from './Header/Header';
import Account from '../components/Account/Account';

const app = props => { 
  let routes = (
    <Switch>
      <Route exact path="/" component={ Account } />      
      <Redirect to="/" />
    </Switch>
  );
  return (
    <React.Fragment>
      <Header />
      <main>
        {routes}      
      </main>
    </React.Fragment>
  );
};

export default app;