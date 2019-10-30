import React, { Component } from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios/axiosOrders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/order';
import Spinner from '../../components/UI/Spinner/Spinner';

const mapStateToProps = state => ({
  orders: state.order.orders,
  loading: state.order.loading
});

const mapDispatchToProps = dispatch => ({
  onFetchOrders: () => dispatch(actions.fetchOrders())
});

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  };

  render() {
    let orders = <Spinner />;
    if (!this.props.loading) {
      orders = this.props.orders.map(order => (
        <Order key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    };
    return (
      <div>
        {orders}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
