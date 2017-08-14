import React, { PropTypes, Component } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as tabActionCreators from 'redux/modules/tab';
import { USER_TYPE } from 'config/constants';

import { Main } from 'components/admin';

@connect(
  ({auth, tab, menu}) => ({
    userType: auth.userType,
    nav: menu.nav,
    tipsPage: menu.tipsPage,
    tabKey: tab.get('tabKey')
  }),
  dispatch => bindActionCreators(tabActionCreators, dispatch),
)
export default class MainContainer extends Component {
  static propTypes = {
    userType: PropTypes.number.isRequired,
  }
  static contextTypes = {
    router: PropTypes.object.isRequired,
  }

  componentDidMount() {
      //初始化加载
  }
  
    handleReturnPath(path) {
      const {router} = this.context;
      router.replaceWith(path);
  }


  render() {

    return (

      <Main {...this.props} handleReturn={:: this.handleReturnPath}/>
    );
  }
}
