import React from 'react';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary= Object.keys(props.ingredients).map(igKey=>{
    return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span> : {props.ingredients[igKey]}</li>
    })
    return(
        <Aux>
            <h3 style={{textAlign:'center'}}>Your Order</h3>
            <hr />
            <p>A healthy and delicious burger with the ingredients details:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Fare: <span style={{color:'green'}}>$ {props.totalPrice.toFixed(2)}</span></strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={props.cancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.succeed}>CONTINUE</Button>
        </Aux>
    )
};

export default orderSummary;