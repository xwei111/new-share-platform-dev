import React, { PropTypes, Component } from 'react';
import { Link } from 'react-router';
import store from 'config/store';
import { setMenu } from 'redux/modules/tab';

export default class HLink extends Component {
  handleLinkClick(ho,co) {
    store.dispatch(setMenu(ho, co));
  }
  render() {

    const {ho, co} = this.props;

    return (
      <Link {...this.props} onClick={(h,c) => this.handleLinkClick(ho,co)}>
        {this.props.children}
      </Link>
    );
  }
}
