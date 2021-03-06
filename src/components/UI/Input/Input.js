import React from 'react';
import classes from './input.module.css'

const input = (props) => {
    const inputClasses = [classes.InputElement]
    let inputElement = null;
    let ValidationError = null
    if(props.invalid && props.shouldValidate && props.touched){
        inputClasses.push(classes.Invalid);
        ValidationError = <p>Please enter a valid value!</p>
    }

    switch(props.elementType){
        case ('input'):
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ('textarea'):
            inputElement = <textarea className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
        case ("select"):
            inputElement = (<select className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(option=>{
                    return <option key={option.value} value={option.value}>
                        {option.displayValue}
                    </option>
                })}
            </select>)
            break;
        default:
            inputElement = <input className={inputClasses.join(' ')} {...props.elementConfig} value={props.value} onChange={props.changed} />
            break;
    }
    return(
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {ValidationError}
        </div>

    )
}
    
export default input;