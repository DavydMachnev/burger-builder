import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import { withRouter } from 'react-router-dom';
import axios from '../../../axios/axiosOrders';
import classes from './ContactData.module.css';

class ContactData extends Component {
  state = {
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    },
    loading: false
  };

  orderHandler = (e) => {
    e.preventDefault();
    this.setState({ loading: true });
    const { ingredients, price } = this.props;
    const order = {
      ingredients: ingredients,
      price,
      customer: {
        name: 'Davyd',
        address: 'Test st',
        zipCode: '12412412',
        country: 'UK'
      }
    };
    axios.post('/orders.json', order)
      .then(_ => {
        this.setState({ loading: false });
        this.props.history.replace('/');
      })
      .catch(_ => this.setState({
        loading: false,
      }));
  }
  render() {
    const { loading } = this.state;
    let form = (
      <form>
        <input className={classes.Input} type="text" name="name" placeholder="Your name" />
        <input className={classes.Input} type="email" name="email" placeholder="Your email" />
        <input className={classes.Input} type="email" name="street" placeholder="Street" />
        <input className={classes.Input} type="email" name="postal" placeholder="Postal Code" />
        <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
      </form>
    );
    if (loading) {
      form = <Spinner />
    };
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default withRouter(ContactData);