import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import WithErrorHandler from '../../hoc/WithErrorHandler/WithErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
    salad:0.6,
    bacon: 0.8,
    meat:1.3,
    cheese:0.4
}

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    // }
    state = {
        ingredients : null,
        totalPrice:4,
        purchasable:false,
        purchasing: false,
        loading:false,
        error:false
    };

    componentDidMount(){
        axios.get('/ingredients.json').then(response=>{
            if(response.status === 200){
                console.log(response.data)
                this.setState({ingredients: response.data});
            }
        }).catch(error=>{
            console.log("fdfsdfdf",error);
            this.setState({error:true});
            // console.log(error);
        })
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
        this.setState({purchasable: sum > 0})
    }

    addIngredientHander = (type)=>{
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition  = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }
    removeIngredientHandler =(type)=>{
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        } else {
            const updatedCount = oldCount - 1;
            const updatedIngredients = {
                ...this.state.ingredients
            };
            updatedIngredients[type] = updatedCount;
            const priceDeduction = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            const newPrice = oldPrice - priceDeduction;
            this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
            this.updatePurchaseState(updatedIngredients);
        }
    }

    purchaseHandler =()=> {
        this.setState({purchasing:true});
    }

    purchaseCancelhandler = () => {
        this.setState({purchasing:false});
    }

    purchaseContinueHandler = () => {
        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        queryParams.push('price=' + this.state.totalPrice);
        const queryString = queryParams.join('&')
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    render(){
        const disableInfo = {
            ...this.state.ingredients
        };
        for (let key in disableInfo){
            disableInfo[key] = disableInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.state.error ? <p style={{textAlign:'center'}}>Ingredients can't be loaded. There is some error on database. Contact to the admin.<a href="tel:0123456789">0123456789</a></p> : <Spinner />;
        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <div>
                        <BuildControls ingredientAdded={this.addIngredientHander} ingredientDeducted={this.removeIngredientHandler} disabled={disableInfo} price={this.state.totalPrice} purchasable={this.state.purchasable} ordering={this.purchaseHandler} />
                    </div>
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} succeed={this.purchaseContinueHandler} cancelled={this.purchaseCancelhandler}></OrderSummary>
            if(this.state.loading){
                orderSummary = <Spinner />
            }
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

export default WithErrorHandler(BurgerBuilder,axios);