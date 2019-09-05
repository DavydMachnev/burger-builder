import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const buildControls = (props) => {
  const { ingredientAdded } = props;
  const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
  ]
  return (
    <div className={classes.BuildControls}>
      {
        controls.map(ctrl => {
          return <BuildControl
            added={() => ingredientAdded(ctrl.type)}
            key={ctrl.label}
            label={ctrl.label}
          />
        })
      }
    </div>
  )
}

export default buildControls;
