import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as marketingActionCreators from 'redux/modules/marketing';
import { chooseCouponType } from 'redux/modules/publishForm';
import {USER_TYPE} from 'config/constants';
import {InitActivities} from 'components/admin';
import {generateUUID} from 'helpers/util';

@connect(({marketing}) => ({
    moudleName: marketing.moudleName,
}), dispatch => bindActionCreators({...marketingActionCreators, chooseCouponType}, dispatch),)

export default class InitActivitiesContainer extends Component {
    static propTypes = {
        moudleName: PropTypes.string.isRequired
    }

    onActivityStart (name,num){
        const { setMoudleName, setTempActid, chooseCouponType } = this.props;
        const _uid = generateUUID();
        setTempActid(_uid);
        setMoudleName(name);
        chooseCouponType(num)
    }

    onCouponChoose (num) {
        const { chooseCouponType } = this.props;
        chooseCouponType(num)
    }

    render() {
        return (
            <InitActivities dataProps={this.props} onChoose={:: this.onCouponChoose} onChageAct={:: this.onActivityStart}/>
        );
    }
}
