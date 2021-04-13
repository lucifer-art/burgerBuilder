import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component{
    state = {
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }
    
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true })
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Shivang',
                address: {
                    street: "Sector test",
                    zip: '123456',
                    country: 'India'
                },
                email: 'test@Test.com'
            },
            deliveryMethod: 'fastest'
        }
        axios.post('/orders.json', order).then(response => {
            console.log(response);
            this.setState({ loading: false });
            this.props.history.push('/');
        }).catch(error => {
            this.setState({ loading: false });
            console.log(error);
        })
    }

    render(){ let form = null;
        if(this.state.loading) {
            form = <Spinner />
        } else {
            form = (
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email" />
                    <input className={classes.Input} type="text" name="street" placeholder="Street" />
                    <input className={classes.Input} type="text" name="postalCode" placeholder="Postal code" />
                    <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
            );
        }
        // console.log(this.props)
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
export default ContactData;