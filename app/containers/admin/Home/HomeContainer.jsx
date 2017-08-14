import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as marketingActionCreators from 'redux/modules/marketing';
import * as menuActionCreators from 'redux/modules/menu';
import {setTab, setMenu} from 'redux/modules/tab';
import {USER_TYPE} from 'config/constants';
import {Home} from 'components/admin';
import {generateUUID} from 'helpers/util';

@connect(({marketing,menu}) => ({
    moudleName: marketing.moudleName,
}), dispatch => bindActionCreators({...marketingActionCreators, ...menuActionCreators, setTab, setMenu}, dispatch),)

export default class HomeContainer extends Component {
    static propTypes = {
        moudleName: PropTypes.string.isRequired
    }

    onActivityStart (name){
        const { setMoudleName, setTempActid, setTab, setMenu } = this.props;
        const _uid = generateUUID();
        setTempActid(_uid);
        setMoudleName(name);
        setTab('activity');
        setMenu('activityData','activity');
    }

    onJumpPath(a,b,c) {
        const { setTab, setMenu } = this.props;
        setTab(a);
        setMenu(b,c);
    }

    render() {
        return (
            <Home dataProps={this.props} onChageAct={:: this.onActivityStart} onJumpPath={:: this.onJumpPath}/>
        );
    }
}
