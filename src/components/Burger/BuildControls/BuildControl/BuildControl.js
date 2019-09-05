import React from 'react';
import classes from './BuildControl.module.css';

const buildControl = (props) => {
  const { added, label } = props;
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{label}</div>
      <button className={classes.Less}>Less</button>
      <button className={classes.More} onClick={added}>More</button>
    </div>
  )
}

export default buildControl;
