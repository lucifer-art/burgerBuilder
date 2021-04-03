import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredients/BurgerIngredient';

const burger = (props) =>{
    console.log(props);
    const transformedIngredients = Object.keys(props.ingredients).map(ingredient =>{
        return [...Array(props.ingredients[ingredient])].map((_,i)=>{
            return <BurgerIngredient key={ingredient + i} type={ingredient} />
        });
    })
    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {/* <BurgerIngredient type="cheese" />
            <BurgerIngredient type="meat" /> */}
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;