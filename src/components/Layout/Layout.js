import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerOpenHandler = () => {
    this.setState({ showSideDrawer: true });
  }

  render() {
    const { showSideDrawer } = this.state;
    return (
      <Aux>
        <Toolbar openSideDrawer={this.sideDrawerOpenHandler} />
        <SideDrawer open={showSideDrawer} closed={this.sideDrawerCloseHandler} />
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }

};

export default Layout;
