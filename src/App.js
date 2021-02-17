import React, {Component} from 'react';
import Layout from './hoc/Layout/Layout';
import Checkout from './Containers/Checkout/Checkout';
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder';
import {Route,Switch} from 'react-router-dom';

function App() {
  return (
    <div >
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout}/>
          <Route path="/" exact component={BurgerBuilder}/>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
