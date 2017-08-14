import React, {PropTypes} from 'react';
import { message } from 'antd';
import {Header} from 'components/admin';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as authActionCreators from 'redux/modules/auth';
import * as tabActionCreators from 'redux/modules/tab';
import store, {RESET} from 'config/store';
import {USER_TYPE} from 'config/constants';

@connect(({auth, menu, tab}) => ({
    username: auth.username,
    loginname: auth.loginname,
    userType: auth.userType,
    nav: menu.nav,
    tabKey: tab.get('tabKey'),
    hashKey : tab.get('hashKey'),
    childKey : tab.get('childKey')
}), dispatch => bindActionCreators({
    ...authActionCreators,...tabActionCreators
}, dispatch))
class HeaderContainer extends React.Component {
    static propTypes = {
        username: PropTypes.string.isRequired,
        userType: PropTypes.number.isRequired,
        handleLogout: PropTypes.func.isRequired
    }
    static contextTypes = {
        router: PropTypes.object.isRequired
    }
    handleLogoutBtnClick() {
        this.props.handleLogout().then(this.context.router.replaceWith('/')).then(() => store.dispatch({type: RESET}));
    }

    handleTabChange(tabKey,hashKey,childKey) {
        const {userType, setTab, setMenu} = this.props;
        setTab(tabKey);
        setMenu(hashKey,childKey);
        this.changeUrl(tabKey, userType);
    }

    changeUrl(tabKey, userType) {
        const {router} = this.context;
        switch (tabKey) {
            case 'home':
                router.replaceWith('/admin');
                break;
            case 'activity':
                router.replaceWith('/admin/activity/activity');
                break;
            case 'monitor':
                router.replaceWith('/admin/monitor/monitor');
                break;
            case 'analysis':
                router.replaceWith('/admin/analysis/select');
                break;
            case 'management':
                router.replaceWith('/admin/management/goods');
                break;
            case 'fans':
                router.replaceWith('/admin/fans/fansOverData');
                break;
            default:
                message.error('has error in router');
        }
    }

    render() {
        return (<Header {...this.props} onLogoutBtnClick={:: this.handleLogoutBtnClick} onTabChange={:: this.handleTabChange}/>);
    }
}

export default HeaderContainer;
