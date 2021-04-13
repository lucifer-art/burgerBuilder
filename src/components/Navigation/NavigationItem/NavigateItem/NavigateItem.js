import React from 'react';
import classes from './NavigateItem.module.css';
import { NavLink } from 'react-router-dom'

const navigationItem = (props) => (
    <li className={classes.NavigateItem}>
        <NavLink exact={props.exact} activeClassName={classes.active} to={props.link} >{props.children}</NavLink>
    </li>
);

export default navigationItem;