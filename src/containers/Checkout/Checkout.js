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
    }
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    this.setIngredients(query);
  };

  setIngredients = query => {
    const ingredients = {};
    for (let param of query.entries()) {
      const [key, value] = param;
      ingredients[key] = +value;
    };
    this.setState({
      ingredients: ingredients
    });
  };
  checkoutCanceledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    const { ingredients } = this.state;
    return (
      <div>
        <CheckoutSummary
          ingredients={ingredients}
          checkoutCanceled={this.checkoutCanceledHandler}
          checkoutContinued={this.checkoutContinuedHandler}
        />
        <Route path={this.props.match.url + '/contact-data'} component={ContactData} />
      </div>
    );
  };
}

export default Checkout;