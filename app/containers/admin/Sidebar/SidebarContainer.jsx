import React, {PropTypes, Component} from 'react';
import {message} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tabActionCreators from 'redux/modules/tab';
import {USER_TYPE} from 'config/constants';

import {Sidebar} from 'components/admin';

@connect(({auth, tab, menu}) => ({userType: auth.userType, nav: menu.nav, tabKey: tab.get('tabKey'), hashKey: tab.get('hashKey'), childKey: tab.get('childKey')}), dispatch => bindActionCreators(tabActionCreators, dispatch),)
export default class SidebarContainer extends Component {
    static propTypes = {
        userType: PropTypes.number.isRequired,
        setTab: PropTypes.func.isRequired
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    }

    onOpenChange = (openKeys) => {
        const {hashKey, setHash} = this.props;
        const hashArr = [hashKey];
        const latestOpenKey = openKeys.find(key => !(hashArr.indexOf(key) > -1));
        const latestCloseKey = hashArr.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        setHash(nextOpenKeys[0]);
    }

    getAncestorKeys = (key) => {
        const map = {};
        return map[key] || [];
    }

    render() {
        return (<Sidebar {...this.props} onSlideChange={:: this.onOpenChange}/>);
    }
}
