import React, { Component } from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Aux from '../../hoc/Aux';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
}

export default class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    purchasable: false,
    purchasing: false,
    totalPrice: 4
  }

  addIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;
    // get the count value for a certain ingredient type
    const oldCount = ingredients[type];
    const updatedCount = oldCount + 1;
    // do a copy of the object since we are about to change it
    const updatedIngredients = {
      ...ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = totalPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  removeIngredientHandler = (type) => {
    const { ingredients, totalPrice } = this.state;
    const oldCount = ingredients[type];
    if (oldCount <= 0) return;
    const updatedCount = oldCount - 1;
    // do a copy of the object since we are about to change it
    const updatedIngredients = {
      ...ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const newPrice = totalPrice - priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  updatePurchaseState = (igredients) => {
    const sum = Object.keys(igredients)
      .map(igKey => {
        return igredients[igKey];
      })
      .reduce((final, item) => {
        return final += item;
      }, 0);
    this.setState({
      purchasable: sum > 0
    });
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  }

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  }

  purchaseContinueHandler = () => {
    alert('You continue!');
  }

  render() {
    const { ingredients, totalPrice, purchasable, purchasing } = this.state;
    const disabledInfo = {
      ...ingredients
    };
    for (let key in disabledInfo) {
      // return true or false for the button
      disabledInfo[key] = disabledInfo[key] <= 0
    };

    return (
      <Aux>
        <Burger ingredients={ingredients} />
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          ingredientRemoved={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={totalPrice}
          purchasable={purchasable}
          ordered={this.purchaseHandler}
        />
        <Modal show={purchasing} modalClosed={this.purchaseCancelHandler}>
          <OrderSummary
            price={totalPrice}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={ingredients} />
        </Modal>
      </Aux>
    )
  }
};
