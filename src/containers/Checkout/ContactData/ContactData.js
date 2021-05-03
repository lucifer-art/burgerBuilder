import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/WithErrorHandler/WithErrorHandler';
import * as actions from '../../../store/actions/index';
import { updatedObject } from '../../../store/utility'

class ContactData extends Component{
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your name'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                value: ''
            },
            zip: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Zip code'
                },
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false,
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                validation:{
                    required:true
                },
                valid:false,
                touched:false,
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{ value: 'fastest', displayValue: 'Fastest' },
                    { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                validation:{
                    required:true
                },
                value: 'fastest',
                valid: true
            },
        },
        formIsValid:false,
    }
    
    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for(let formElementIdentifier in this.state.orderForm){
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData:formData,
            userId: this.props.userId
        }
        this.props.onOrderBurger(order,this.props.token);
    }

    checkValidity(value,rules){
        let isValid = true;

        if(rules && rules.required){
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength){
            isValid = value.length >= rules.maxLength && isValid;
        }
        return isValid;
    }

    inputChangedHandler = (event,inputIdentifier)=>{
        const updatedFormElement = updatedObject(this.state.orderForm[inputIdentifier],{
            value:event.target.value,
            valid:this.checkValidity(event.target.value,this.state.orderForm[inputIdentifier].validation),
            touched:true
        })
        const updatedOrderForm = updatedObject(this.state.orderForm,{
            [inputIdentifier]:updatedFormElement
        })
        let formIsValid = true;
        for(let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrderForm,formIsValid:formIsValid}) 
    }

    render(){ 
        const fromElementArray = [];
        for (let key in this.state.orderForm){
            fromElementArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        let form = null;
        if(this.props.loading) {
            form = <Spinner />
        } else {
            form = (
                <form onSubmit={this.orderHandler}> 
                    {fromElementArray.map(formElement=>{
                        return <Input
                        key={formElement.id} 
                        elementType={formElement.config.elementType} 
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        shouldValidate={formElement.config.validation}
                        changed={(event)=>this.inputChangedHandler(event,formElement.id)}
                        />
                    })}
                    <Button disabled={!this.state.formIsValid} btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            );
        }
    
        return(
            <div className={classes.ContactData}>
                <h4>Provide your Contact Details</h4>
                <div className={classes.formDisplay}>
                    {form}
                </div>
            </div>
        )
    }
}

const mapStateToProps = state=>{
    return{
        ings:state.reducer.ingredients,
        price: state.reducer.totalPrice,
        loading: state.order.loading,
        token:state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchTOProps = dispatch => {
    return {
        onOrderBurger: (orderData,token)=> dispatch(actions.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchTOProps)(withErrorHandler(ContactData,axios));