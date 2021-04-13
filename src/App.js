import React, { Component } from 'react';
import './App.module.css';
import Aux from './hoc/Aux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import {Route,Switch} from 'react-router-dom';

class App extends Component {
  render(){
    return (
      <Aux>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </Aux>
    );
  }
}

export default App;
