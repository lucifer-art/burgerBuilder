import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';
// import { checkPropTypes } from 'prop-types';

const controls = [
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
]

const priceStyle = {
    fontSize: '20px',
    color:'green',
}

const buildControls = (props) =>{
    return (
        <div className={classes.BuildControls}>
            <p>Current Price : <strong style={priceStyle}>$ {props.price.toFixed(2)}</strong></p>
            {controls.map(ctrl => {
                return <BuildControl key={ctrl.label} label={ctrl.label} type={ctrl.type} added={() => props.ingredientAdded(ctrl.type)} deducted={() => props.ingredientDeducted(ctrl.type)} disabled={props.disabled[ctrl.type]} />
            })}
            <div>
                <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.ordering}>ORDER NOW</button>
            </div>
        </div>
    ) 
}

export default buildControls;