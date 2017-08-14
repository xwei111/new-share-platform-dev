import React, { PropTypes, Component } from 'react';
import { PublishFormContainer } from 'containers/admin/CouponPublish';
import styles from './styles.css';
import { cardable } from 'hoc';

@cardable(['券发行'])
export default class CouponPublish extends Component {
  render() {
    return (
            <PublishFormContainer {...this.props}/>
    );
  }
}
