import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as publishFormActionCreators from 'redux/modules/publishForm';
import { COUPON_TYPE } from 'config/constants';
import { filterHQBusiness, filterKBBusiness, filterWXBusinessCommon, filterWXBusinessFriend, filterHHDXBusiness } from 'helpers/util';

import { CouponType } from 'components/admin/CouponPublish';

const { SINGLE, BRAND } = COUPON_TYPE;

@connect(
  ({auth, publishForm}, ownProps) => ({
    business: auth.business,
    isMyVip: publishForm.get('isMyVip'),
    isSelectMode: publishForm.get('isSelectMode'),
    isWxMode: publishForm.get('isWxMode'),
    couponType: publishForm.get('couponType'),
    ...ownProps
  }),
  dispatch => bindActionCreators(publishFormActionCreators, dispatch),
)
export default class CouponTypeContainer extends Component {
  static proptypes = {
    isEdit: PropTypes.bool.isRequired,
    isSelectMode: PropTypes.number.isRequired,
    isMyVip: PropTypes.bool.isRequired,
    business: PropTypes.array.isRequired,
    couponType: PropTypes.number.isRequired,
    setCouponType: PropTypes.func.isRequired,
  }
  getBusiness() {
    const { isSelectMode, business, isWxMode } = this.props;
    if (isSelectMode === 0) {
      return business;
    } else if (isSelectMode === 1) {
      return filterHQBusiness(business);
    } else if (isSelectMode === 2) {
      return filterKBBusiness(business);
    } else if (isSelectMode === 3) {
      if (isWxMode === 0) {
        return filterWXBusinessCommon(business);
      } else {
        return filterWXBusinessFriend(business);
      }
    } else if (isSelectMode === 4) {
        return filterHHDXBusiness(business);
    }
  }
  render() {
    return (
      <CouponType {...this.props}
        business={this.getBusiness()}
        onCouponTypeChange={this.props.setCouponType}/>
    );
  }
}
