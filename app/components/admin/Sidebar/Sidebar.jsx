import React, {PropTypes, Component} from 'react';
import {Menu} from 'antd';
import * as styles from './styles.css';
import {HLink} from 'components/admin';

const SubMenu = Menu.SubMenu;

export default class Sidebar extends Component {

    propTypes : {
        userType: PropTypes.number.isRequired,
        nav: PropTypes.array.isRequired
    };
    
    render() {
        const {onSlideChange, tabKey, hashKey, childKey, nav} = this.props;
        const { home, activity, monitor, analysis, management, fans } = nav;

        return (
            <div className={styles.sidebar}>
                <Menu style={{
                    width: '180px'
                }} mode="inline" defaultSelectedKeys={[childKey]} selectedKeys={[childKey]} openKeys={[hashKey]} onOpenChange={onSlideChange}>
                    {nav[tabKey].child.map((item, idx) => (item.length === 1
                        ? (item.map((m, i) => (
                            <Menu.Item key={m.hash} className={styles.sideChild}>
                                <p><HLink to={m.path} ho={m.key} co={m.hash}><img src={m.icon} style={{marginRight: '5px'}}/>{m.name}</HLink></p>
                            </Menu.Item>
                        )))
                        : <SubMenu key={item[0].key} title={<span> <img src={item[0].icon} style={{marginRight: '5px'}}/>{
                            item[0].moudle
                        } </span>}>
                            {item.map((itm, ids) => (
                                <Menu.Item key={itm.hash} className={styles.sideMenu}>
                                    <HLink to={itm.path} ho={itm.key} co={itm.hash}>{itm.name}</HLink>
                                </Menu.Item>
                            ))}
                        </SubMenu>))}

                </Menu>
            </div>
        );
    }
}
