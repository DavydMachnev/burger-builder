import React, { Component } from 'react';
import Button from '../../UI/Button/Button';
import Aux from '../../../hoc/Aux/Aux';

class OrderSummary extends Component {
  render() {
    const { ingredients, purchaseCanceled, purchaseContinued, price } = this.props;
    const igredientSummary = Object.keys(ingredients)
      .map(igKey => (
        <li key={igKey}>
          <span style={{ textTransform: 'capitalize' }}>{igKey}</span>: {ingredients[igKey]}
        </li>
      ));
    return (
      <Aux>
        <h3>Your order!</h3>
        <p>A delicious burger with following ingredients:</p>
        <ul>
          {
            igredientSummary
          }
        </ul>
        <p><strong>Total Price: ${price.toFixed(2)}</strong></p>
        <p>Continue to checkout?</p>
        <Button
          clicked={purchaseCanceled}
          btnType="Danger">Cancel</Button>
        <Button
          clicked={purchaseContinued}
          btnType="Success">Continue</Button>
      </Aux>
    );
  };

}

export default OrderSummary;
