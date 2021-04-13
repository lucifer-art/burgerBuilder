import React from 'react';
import classes from './NavigationItem.module.css';
import NavigateItem from '../NavigationItem/NavigateItem/NavigateItem';

const navigationItem = () => (
    <ul className={classes.NavigationItem}>
        <NavigateItem link="/" exact>Burger Builder</NavigateItem>
        <NavigateItem link="/orders">Orders</NavigateItem>
    </ul>
);

export default navigationItem;