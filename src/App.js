import React, { Component } from 'react';
import './App.module.css';
import Aux from './hoc/Aux';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {Route,Switch,withRouter,Redirect} from 'react-router-dom';
import Logout from './containers/Auth/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/index';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
})
const asyncOrder = asyncComponent(() => {
  return import('./containers/Orders/Orders');
})
const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
})

class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup();
  }

  render(){
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to="/" />
      </Switch>
    )
    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route path="/checkout" component={asyncCheckout} />
            <Route path="/orders" component={asyncOrder} />
            <Route path="/auth" component={asyncAuth} />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={BurgerBuilder} /> 
            <Redirect to="/" /> 
        </Switch>
      )
    }
    return (
      <Aux>
        <Layout>
          {routes}
        </Layout>
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: ()=>dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
