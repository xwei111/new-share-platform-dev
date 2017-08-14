import React, { PropTypes, Component } from 'react';
import {Menu} from 'antd';
import * as styles from './styles.css';
import { USER_TYPE } from 'config/constants';
import classnames from 'classnames';

export default class Header extends Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    userType: PropTypes.number.isRequired,
    onLogoutBtnClick: PropTypes.func.isRequired,
  }

  render() {
    const { username, loginname, userType, tabKey, onLogoutBtnClick, nav, onTabChange } = this.props;
    const { main, home, activity, monitor, analysis, management, fans} = nav;
    const selfStyle = 'myMenu';
    return (
        <div className={styles.colorWrapper}>
            <div className={styles.container}>
                <h2 className={styles.title}><img style={{verticalAlign: 'middle'}} src={require('images/header.png')} /></h2>
            
                <Menu className={classnames(styles.menuStyle, selfStyle)} mode="horizontal" defaultSelectedKeys={['home']} selectedKeys={[tabKey]}>
                    {
                      main.map((item,index)=>(
                          <Menu.Item key={item.key}>
                              <h6 onClick={(tabKey,hashKey,childKey) => {onTabChange(item.key,item.hash,item.clKey)}}>{item.name}</h6>
                          </Menu.Item>
                      ))
                    }
                </Menu>
            
                <div className={styles.info}>
                    <span className={styles.infoPos}><img style={{width: '48px',position: 'relative',top: '10px'}} src={require('images/yili_logo.png')} />{username}</span>
                    <a className={styles.logout} onClick={onLogoutBtnClick}>退出</a>
                </div>
            </div>
        </div>
    );
  }
}
