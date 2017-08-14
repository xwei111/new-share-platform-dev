import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { List } from 'immutable';
import { PublishForm } from 'components/admin/CouponPublish';
import * as couponTypeActionCreators from 'redux/modules/publishForm';
import * as selectMarketActionCreators from 'redux/modules/selectMarket';
import * as marketingActionCreators from 'redux/modules/marketing';

@connect(
  ({auth, publishForm, selectMarket, marketing}, ownProps) => ({
    userType: auth.userType,
    business: auth.business,
    couponType: publishForm.get('couponType'),
    isSelectMode: publishForm.get('isSelectMode'),
    isWxMode: publishForm.get('isWxMode'),
    dxMode: publishForm.get('dxMode'),
    isMyVip: publishForm.get('isMyVip'),
    partnerId: publishForm.get('partnerId'),
    balance: publishForm.get('balance'),
    chooseType: publishForm.get('chooseType'),
    selectedMarketList: selectMarket.get('currentMarkets').toJS(),
    tagData: marketing.tagData,
    targetKeys: marketing.targetKeys,
    tagDone: marketing.tagDone,
    ...ownProps,
  }),
  dispatch => bindActionCreators({...couponTypeActionCreators, ...selectMarketActionCreators, ...marketingActionCreators}, dispatch)
)
export default class PublishFormContainer extends Component {
  static propTypes = {
    userType: PropTypes.number.isRequired,
    business: PropTypes.array.isRequired,
    couponType: PropTypes.number.isRequired,
    isSelectMode: PropTypes.number.isRequired,
    selectedMarketList: PropTypes.array.isRequired,
    setCouponType: PropTypes.func.isRequired,
    handleOpenModal: PropTypes.func.isRequired,
    handlePreSubmit: PropTypes.func.isRequired,
    handleIsMyVip: PropTypes.func.isRequired,
    resetMarkets: PropTypes.func.isRequired,
    isMyVip: PropTypes.bool.isRequired,
    partnerId: PropTypes.string.isRequired,
    params: PropTypes.object,
  }
  handleCouponTypeChange(value) {
    this.props.setCouponType(value);
  }
  handleMarketClick() {
    this.props.handleOpenModal();
  }
  handleSubmit(data) {
    this.props.handlePreSubmit(data);
  }
  handleMyVip(){
    this.props.handleIsMyVip();
  }
  handWxBalance(){
    this.props.handlefetchWxBalance();
  }

  handleSetTargetKey() {
    this.props.setTargetKey([]);
    this.props.setTagDone([]);
  }

  componentWillMount(){
      this.handleMyVip();
      this.handWxBalance();
  }

  render() {
    const { userType, couponType, selectedMarketList, resetMarkets, business, isSelectMode, isMyVip, partnerId, handleMyVip, isWxMode } = this.props;
    return (
      <PublishForm {...this.props}
        userType={userType}
        handleMyVip={handleMyVip}
        business={business}
        couponType={couponType}
        isSelectMode={isSelectMode}
        isMyVip={isMyVip}
        isWxMode={isWxMode}
        partnerId={partnerId}
        selectedMarketList={List(selectedMarketList.reduce((result, item) => [...result, ...item.targetKeys], []))}
        onMarketClick={::this.handleMarketClick}
        onCouponTypeChange={::this.handleCouponTypeChange}
        onSubmit={::this.handleSubmit}
        resetMarkets={resetMarkets}
        handleSetTargetKey={::this.handleSetTargetKey}/>
    );
  }
}
