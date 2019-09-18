import React from 'react';
import classes from './MenuButton.module.css';

const menuButton = (props) => {
  return (
    <div className={classes.DrawerToggle} onClick={props.clicked}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default menuButton;
