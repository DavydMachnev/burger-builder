import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      meat: 2,
      cheese: 2
    },
    totalPrice: null
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    this.setIngredients(query);
  };

  setIngredients = query => {
    const ingredients = {};
    let price = null;
    for (let param of query.entries()) {
      const [key, value] = param;
      if (key === 'price') {
        price = value;
      } else {
        ingredients[key] = +value;
      }
    };
    this.setState({
      ingredients: ingredients,
      totalPrice: price
    });
  };
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    const { ingredients, totalPrice } = this.state;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={this.props.match.url + '/contact-data'} render={() => (<ContactData ingredients={ingredients} price={totalPrice} />)} />
      </div>
    );
  };
}

export default Checkout;