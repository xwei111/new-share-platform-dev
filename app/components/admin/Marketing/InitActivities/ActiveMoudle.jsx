import React, {PropTypes, Component} from 'react';
import {Modal, Button, Input} from 'antd';
import globalStyles from 'sharedStyles/global.css';
import * as styles from './styles.css';
import {TYPEARR} from 'config/constants';

export default class ActiveMoudle extends React.Component {
    render() {
        const {actName, actVisible, setVisible, startTime, endTime, selectedMarketList, targetKeys, couponData, onSubmit, fetchLoading} = this.props;

        const marketList = selectedMarketList.reduce((result, item) => [
            ...result,
            ...item.targetKeys
        ], []).map(item => item.split(':')[2]).join(',');

        const couponList = couponData.reduce((result, item) => [
            ...result,
            item.couponname
        ], []).join(',');

        return (
            <Modal title="确认创建" visible={actVisible} onCancel={v => setVisible(false)} footer={[< Button key = "back" size = "large" onClick = {
                    v => setVisible(false)
                } > 返回 < /Button>, <Button key="submit" type="primary" size="large" loading={fetchLoading} onClick={onSubmit}>确认</Button>]}>
                <table className={styles.tabContainer}>
                    <tbody>
                        <tr className={styles.row}>
                            <td>活动名称：</td>
                            <td>{actName}</td>
                        </tr>
                        <tr className={styles.row}>
                            <td>活动时间：</td>
                            <td>{startTime}-{endTime}</td>
                        </tr>
                        <tr className={styles.row}>
                            <td>参与门店：</td>
                            <td>{marketList}</td>
                        </tr>
                        <tr className={styles.row}>
                            <td>所含优惠券：</td>
                            <td>{couponList}</td>
                        </tr>
                    </tbody>
                </table>
            </Modal>
        );
    }
}
