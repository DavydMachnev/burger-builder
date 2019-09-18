import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const buildControls = (props) => {
  const { ingredientAdded, ingredientRemoved, disabled, price, purchasable, ordered } = props;
  const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
  ]
  return (
    <div className={classes.BuildControls}>
      <p>Current price: <strong>${price.toFixed(2)}</strong> </p>
      {
        controls.map(ctrl => {
          return <BuildControl
            added={() => ingredientAdded(ctrl.type)}
            removed={() => ingredientRemoved(ctrl.type)}
            key={ctrl.label}
            label={ctrl.label}
            disabled={disabled[ctrl.type]}
          />
        })
      }
      <button
        onClick={ordered}
        disabled={!purchasable}
        className={classes.OrderButton}>
        ORDER NOW
      </button>
    </div>
  )
}

export default buildControls;
