import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as orderActions from '../../../store/actions/order';
import axios from '../../../axios/axiosOrders';
import classes from './ContactData.module.css';

const mapStateToProps = state => ({
  ings: state.ingredients,
  price: state.totalPrice
});
const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData) => dispatch(orderActions.purchaseBurgerStart(orderData))
});
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name',
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false,
      },
      address: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      zipCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP',
        },
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 8
        },
        valid: false,
        touched: false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your e-mail',
        },
        value: '',
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'cheapest', displayValue: 'Cheapest' },
          ]
        },
        value: '',
        validation: {},
        valid: true
      },
    },
    formIsValid: false,
    loading: false
  }

  orderHandler = (e) => {
    e.preventDefault();
    const { ings, price } = this.props;
    const { orderForm } = this.state;
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value
    };
    const order = {
      ingredients: ings,
      orderData: formData,
      price
    };
    this.props.onOrderBurger(order);
  }

  inputChangedHandler = (e, inputIdentifier) => {
    const updatedOrderForm = {
      ...this.state.orderForm
    };

    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };

    updatedFormElement.value = e.target.value;
    updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    };
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    };

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    };

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    };

    return isValid;
  }

  render() {
    const { loading, orderForm, formIsValid } = this.state;
    const formElementsArray = [];
    for (let key in orderForm) {
      formElementsArray.push({
        id: key,
        config: orderForm[key]
      });
    };
    let form = (
      <form onSubmit={this.orderHandler}>
        {
          formElementsArray.map(frEl => (
            <Input key={frEl.id}
              elementType={frEl.config.elementType}
              elementConfig={frEl.config.elementConfig}
              value={frEl.config.value}
              invalid={!frEl.config.valid}
              shouldValidate={frEl.config.validation}
              touched={frEl.config.touched}
              valueType={frEl.id}
              changed={(event) => this.inputChangedHandler(event, frEl.id)}
            />
          ))
        }
        <Button btnType="Success" disabled={!formIsValid}>Order</Button>
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

export default withErrorHandler(connect(mapStateToProps, mapDispatchToProps)(withRouter(ContactData)), axios);