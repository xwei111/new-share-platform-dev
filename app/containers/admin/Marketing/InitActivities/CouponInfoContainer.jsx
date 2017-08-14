import React, {PropTypes, Component} from 'react';
import {message} from 'antd';
import {fromJS, Map ,List} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as marketingActionCreators from 'redux/modules/marketing';
import {USER_TYPE} from 'config/constants';
import {setCouponNext} from 'redux/modules/publishForm';
import {CouponInfoMoudle} from 'components/admin/Marketing';
import {marketingApi} from 'api';
import {removeByPub} from 'helpers/util';


@connect(({marketing,publishForm}) => ({
    moudleName: marketing.moudleName,
    tempActid: marketing.tempActid,
    selectData: marketing.selectData,
    infoVisible: marketing.infoVisible,
    couponInfo: marketing.couponInfo,
    couponData: publishForm.get('couponData').toJS(),
    pubid: marketing.pubid
}), dispatch => bindActionCreators({...marketingActionCreators,setCouponNext}, dispatch),)

export default class CouponInfoContainer extends Component {
    static propTypes = {
        moudleName: PropTypes.string.isRequired,
    }

    setInfoBoxVisible(v) {
       const {setCouponInfoVisible} = this.props;
       setCouponInfoVisible(v);
    }

    deleteCoupon() {
        const {couponData, tempActid, pubid, setCouponInfoVisible, setCouponNext} = this.props;
        const couponArr = couponData.slice(0);
        marketingApi.fetchTicketDelete(pubid,tempActid)
        .then(data => {
            if (data.result == '200') {
                message.success(data.msg);
                removeByPub(couponArr,pubid);
                setCouponInfoVisible(false);
                setCouponNext(couponArr);
            } else {
                message.error(data.msg);
            }
        })
    }


    render() {

        return (<CouponInfoMoudle {...this.props} setVisible={:: this.setInfoBoxVisible} handleDeleteCoupon={:: this.deleteCoupon}/>);
    }
}
