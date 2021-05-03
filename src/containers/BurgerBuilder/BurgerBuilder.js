import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/actions/index';

class BurgerBuilder extends Component{
    state = {
        purchasable:false,
        purchasing: false,
    };

    componentDidMount(){
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients){
        // const ingredients = {
        //     ...this.state.ingredients
        // }
        const sum = Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey];
        }).reduce((sum,el)=>{
            return sum + el;
        },0);
        return sum > 0
    }

    purchaseHandler =()=> {
        if(this.props.isAuthenticated){
            this.setState({purchasing:true});
        } else {
            this.props.OnSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
        
    }

    purchaseCancelhandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        this.props.onInitPurchased();
        this.props.history.push('/checkout');
    }

    render(){
        const disableInfo = {
            ...this.props.ings
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p style={{textAlign:'center'}}>Ingredients can't be loaded. There is some error on database. Contact to the admin.<a href="tel:0123456789">0123456789</a></p> : <Spinner />;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <div>
                        <BuildControls isAuth={this.props.isAuthenticated} ingredientAdded={this.props.onIngredientAdded} ingredientDeducted={this.props.onIngredientRemoved} disabled={disableInfo} price={this.props.price} purchasable={this.updatePurchaseState(this.props.ings)} ordering={this.purchaseHandler} />
                    </div>
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ings} totalPrice={this.props.price} succeed={this.purchaseContinueHandler} cancelled={this.purchaseCancelhandler}></OrderSummary>
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelhandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStatetoProps = state =>{
    return {
        ings: state.reducer.ingredients,
        price:state.reducer.totalPrice,
        error: state.reducer.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (ingName) =>dispatch(actionCreator.addIngredient(ingName)),
        onIngredientRemoved: (ingName) =>dispatch(actionCreator.removeIngredient(ingName)),
        onInitIngredients: () =>dispatch(actionCreator.initIngredient()),
        onInitPurchased: ()=> dispatch(actionCreator.purchaseInit()),
        OnSetAuthRedirectPath: (path) => dispatch(actionCreator.setAuthRedirectPath(path))
    }
}

export default connect(mapStatetoProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder,axios));