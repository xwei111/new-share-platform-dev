import React, {PropTypes, Component} from 'react';
import {message} from 'antd';
import {fromJS, Map ,List} from 'immutable';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as marketingActionCreators from 'redux/modules/marketing';
import {USER_TYPE} from 'config/constants';
import {setCouponNext} from 'redux/modules/publishForm';
import {ActiveMoudle} from 'components/admin/Marketing';
import {marketingApi} from 'api';
import {removeByPub} from 'helpers/util';


@connect(({marketing,publishForm,selectMarket}) => ({
    actVisible: marketing.actVisible,
    startTime: marketing.startTime,
    endTime: marketing.endTime,
    selectedMarketList: selectMarket.get('currentMarkets').toJS(),
    couponData: publishForm.get('couponData').toJS(),
    targetKeys: marketing.targetKeys,
    actName: marketing.actName,
    fetchLoading: marketing.fetchLoading,
}), dispatch => bindActionCreators({...marketingActionCreators,setCouponNext}, dispatch),)

export default class ActiveMoudleContainer extends Component {
    static propTypes = {
        moudleName: PropTypes.string.isRequired,
    }

    setActiveBoxVisible(v) {
       const {setActiveVisible} = this.props;
       setActiveVisible(v);
    }

    render() {

        return (<ActiveMoudle {...this.props} setVisible={:: this.setActiveBoxVisible} activeName={this.props.activeName} onSubmit={this.props.onSubmit}/>);
    }
}
