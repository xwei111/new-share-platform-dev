import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setTab, setMenu} from 'redux/modules/tab';
import * as menuActionCreators from 'redux/modules/menu';

import { SubResult } from 'components/admin/Marketing';


@connect(({menu}) => ({
    tipsPage: menu.tipsPage,
}), dispatch => bindActionCreators({...menuActionCreators, setTab, setMenu}, dispatch),)

export default class SubResultContainer extends Component {
    static propTypes = {
        moudleName: PropTypes.string.isRequired,
    }

    handleJump() {
        const { setTab, setTipsPage, setMenu } = this.props;
        setTab('activity');
        setMenu('listData','list');
        setTipsPage(false);
    }

    componentDidMount() {
        const { setTipsPage } = this.props;
        setTipsPage(true);
    }

    render() {
        return (<SubResult dataProps={this.props} handleJump={:: this.handleJump}/>);
    }
}
