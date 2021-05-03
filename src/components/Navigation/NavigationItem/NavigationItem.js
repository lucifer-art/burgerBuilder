import React from 'react';
import classes from './NavigationItem.module.css';
import NavigateItem from '../NavigationItem/NavigateItem/NavigateItem';

const navigationItem = (props) => (
    <ul className={classes.NavigationItem}>
        <NavigateItem link="/" exact>Burger Builder</NavigateItem>
        {props.isAuthenticated ? <NavigateItem link="/orders">Orders</NavigateItem>:null}
        { !props.isAuthenticated ? 
        <NavigateItem link="/auth">Authenticate</NavigateItem> : 
        <NavigateItem link="/logout">Logout</NavigateItem>}
    </ul>
);

export default navigationItem;