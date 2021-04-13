import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItem from '../NavigationItem/NavigationItem';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const toolbar = (props)=>(
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.opened} />
        <Logo height="80%" />
        <nav className={classes.DesktopOnly}>
            <NavigationItem />
        </nav>
    </header>
);

export default toolbar;