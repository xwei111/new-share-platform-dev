import React, {PropTypes, Component} from 'react';
import {Modal, Button, Input, Popconfirm} from 'antd';
import globalStyles from 'sharedStyles/global.css';
import * as styles from './styles.css';
import {TYPEARR} from 'config/constants';

export default class CouponInfoMoudle extends React.Component {
    render() {
        const {infoVisible, couponInfo, setVisible, moudleName, handleDeleteCoupon, tempActid} = this.props;

        return (
            <Modal visible={infoVisible} onCancel={v => setVisible(false)} footer={[< Button key = "back" size = "large" onClick = {
                    v => setVisible(false)
                } > 返回 < /Button>,
                <Popconfirm title="确定删除吗？" okText="确认" cancelText="取消" onConfirm={handleDeleteCoupon}>
                    <Button key="submit" type="primary" size="large">删除</Button>
                </Popconfirm>
                ]}>

                <h6 style={{
                    textAlign: 'center',
                    fontSize: '18px',
                    fontWeight: 'normal',
                    marginBottom: '20px'
                }}>{couponInfo.couponname}</h6>
                <ul className={styles.couponInfoUl}>
                    <li>
                        <span className={styles.leftName}>券种类:</span>
                        <span className={styles.rightName}>{TYPEARR[couponInfo.type]}</span>
                    </li>
                    <li>
                        <span className={styles.leftName}>活动商品:</span>
                        <span className={styles.rightName}>{couponInfo.goodname}</span>
                    </li>
                    <li>
                        <span className={styles.leftName}>券面额:</span>
                        <span className={styles.rightName}>{parseInt(couponInfo.couponfee) / 100}元</span>
                    </li>
                    <li>
                        <span className={styles.leftName}>预计核销率:</span>
                        <span className={styles.rightName}>{couponInfo.expect}%</span>
                    </li>
                    <li>
                        <span className={styles.leftName}>预计发放总量:</span>
                        <span className={styles.rightName}>{couponInfo.couponcount}张</span>
                    </li>
                    <li>
                        <span className={styles.leftName}>个人领取限制:</span>
                        <span className={styles.rightName}>{couponInfo.count}/张</span>
                    </li>
                    <li>
                        <span className={styles.leftName}>券有效时间:</span>
                        <span className={styles.rightName}>{couponInfo.start}-{couponInfo.end}
                        </span>
                    </li>
                    <li>
                        <span className={styles.leftName}>券领取时间:</span>
                        <span className={styles.rightName}>活动开始前 {couponInfo.predays}天领取</span>
                    </li>
                </ul>
            </Modal>
        );
    }
}
