import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'antd';
import moment from "moment";
import styles from './styles.css';

export default class SummaryData extends Component {
    render() {
        const {dataSource} = this.props;
        const {yesterday, total} = dataSource;
        return (
            <div>
                <p className={styles.modelTitle}>数据概要</p>
                <div className={styles.modelWrap}>
                    <Row>
                        <Col span={11} offset={1}>
                            <p className={styles.DataTitle}>昨日数据 <span style={{fontSize: '12px'}}>(数据截止：{moment().subtract(1, 'days').format('YYYY-MM-DD')}日)</span></p>
                            <Row>
                                <Col className={styles.textCommon} span={12}>
                                    <span>领券数量</span>
                                    <span>{yesterday
                                            ? yesterday.takenCnt
                                            : '--'}</span>
                                </Col>
                                <Col className={styles.textCommon} span={12}>
                                    <span>领券人数</span>
                                    <span>{yesterday
                                            ? yesterday.takenUserCnt
                                            : '--'}</span>
                                </Col>
                                <Col className={styles.textCommon} span={12}>
                                    <span>核券数量</span>
                                    <span>{yesterday
                                            ? yesterday.usedCnt
                                            : '--'}</span>
                                </Col>
                                <Col className={styles.textCommon} span={12}>
                                    <span>核券人数</span>
                                    <span>{yesterday
                                            ? yesterday.usedUserCnt
                                            : '--'}</span>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={11}>
                            <p className={styles.DataTitle}>累计数据 <span style={{fontSize: '12px'}}>(数据截止：{moment().subtract(1, 'days').format('YYYY-MM-DD')}日)</span></p>
                            <Row>
                                <Col className={styles.textCommon} span={12}>
                                    <span>领券数量</span>
                                    <span>{total
                                            ? total.takenCnt
                                            : '--'}</span>
                                </Col>
                                <Col className={styles.textCommon} span={12}>
                                    <span>领券人数</span>
                                    <span>{total
                                            ? total.takenUserCnt
                                            : '--'}</span>
                                </Col>
                                <Col className={styles.textCommon} span={12}>
                                    <span>核券数量</span>
                                    <span>{total
                                            ? total.usedCnt
                                            : '--'}</span>
                                </Col>
                                <Col className={styles.textCommon} span={12}>
                                    <span>核券人数</span>
                                    <span>{total
                                            ? total.usedUserCnt
                                            : '--'}</span>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
