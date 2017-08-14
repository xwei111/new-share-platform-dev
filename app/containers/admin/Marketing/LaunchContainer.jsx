import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {message, notification, Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as marketingActionCreators from 'redux/modules/marketing';
import * as selectMarketActionCreators from 'redux/modules/selectMarket';
import * as publishFormActionCreators from 'redux/modules/publishForm';
import {USER_TYPE} from 'config/constants';
import {Launch} from 'components/admin/Marketing';
import {marketingApi} from 'api';

@connect(({auth, marketing, publishForm, selectMarket}) => ({
    loginname: auth.loginname,
    moudleName: marketing.moudleName,
    actName: marketing.actName,
    couponVisible: marketing.couponVisible,
    tempActid: marketing.tempActid,
    startTime: marketing.startTime,
    endTime: marketing.endTime,
    tagDone: marketing.tagDone,
    selectedMarketList: selectMarket.get('currentMarkets').toJS(),
    couponData: publishForm.get('couponData').toJS(),
    chooseType: publishForm.get('chooseType'),
}), dispatch => bindActionCreators({
    ...marketingActionCreators,
    ...selectMarketActionCreators,
    ...publishFormActionCreators
}, dispatch),)

export default class LaunchContainer extends Component {
    static propTypes = {
        moudleName: PropTypes.string.isRequired,
        couponVisible: PropTypes.bool.isRequired
    }

    handleCouponVisible(visible) {
        const {setcouponVisible, startTime, endTime, selectedMarketList, couponData} = this.props;
        if (startTime == '' || endTime == '') {
            message.error('请先输入活动有效期');
            return;
        }

        if (couponData.length >=10 || couponData.size >= 10) {
            message.error('一次活动最多发放10张优惠券');
            return;
        }
        this.props.returnConfig('/admin/activity/publish');
    }

    handleActiveTime(val, str) {
        const {setActiveTime} = this.props;
        setActiveTime(str[0] + ' 00:00:00', str[1] + ' 23:59:59');
    }

    handleMarketClick() {
        this.props.handleOpenModal();
    }

    openInfoMoudleBox(id) {
        const {setCouponInfoVisible, handleFetchCouponInfo, setPubid} = this.props;

        setCouponInfoVisible(true);
        handleFetchCouponInfo(id);
        setPubid(id);
    }

    onSearchActiveName(e) {
        const ActiveName = e.target.value;
        const {setActName} = this.props;
        if (ActiveName !== '') {
            marketingApi.queryActiveByName(ActiveName).then(data => {
                if (parseInt(data.code) === 200) {
                    if (parseInt(data.count) !== 0) {
                      notification.open({
                          message: '温馨提示',
                          description: '当前输入活动名称已被使用，建议修改',
                          icon: <Icon type="smile-circle" style={{ color: '#FB8181' }} />,
                      });
                    }

                    setActName(ActiveName);

                } else {
                    message.error(data.msg);
                }
            })
        }
    }

    componentDidMount() {
        // this.props.setCouponClear();
        // this.props.handleClearMarket();
        // this.props.setTargetKey([]);
        // this.props.setTagDone([]);
    }

    render() {

        const {selectedMarketList, handleFetchActivityId, couponData} = this.props;
        return (<Launch {...this.props} onBlurName={:: this.onSearchActiveName} onFormSub={:: this.props.handleFetchActivityId} onDateChange={:: this.handleActiveTime} onCouponVisible={:: this.handleCouponVisible} onMarketClick={:: this.handleMarketClick} selectedMarketList={selectedMarketList} openInfo={:: this.openInfoMoudleBox}/>);
    }
}
