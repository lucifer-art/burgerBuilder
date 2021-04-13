import React, { Component } from 'react';
import CheckoutSummary from '../../components/UI/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData'
class Checkout extends Component{
    state = {
        ingredients:null,
        price:0
    }
    componentWillMount(){
        let price = 0;
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for (let i of query.entries()){
            if(i[0]==='price'){
                price = i[1]
            } else {
                ingredients[i[0]] = +i[1]
            }
            
        }
        this.setState({ingredients:ingredients,totalPrice: price})
    }
    checkoutCancelledHandler =()=>{
        this.props.history.goBack();
    }
    checkoutContinuedHandler = ()=>{
        console.log("dasda",this.props.match.path);
        this.props.history.replace('/checkout/contact-data')
    }
    render(){
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                checkoutCancelled={this.checkoutCancelledHandler}
                checkoutContinued={this.checkoutContinuedHandler} />
                <Route path={this.props.match.path + '/contact-data'} render={(props)=><ContactData ingredients={this.state.ingredients} price={this.state.price} {...props} />} />
            </div>
        )
    }
}

export default Checkout;