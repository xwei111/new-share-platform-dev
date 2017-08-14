import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'antd';
import styles from './styles.css';

export default class SummaryData extends Component {
    render() {
        const {dataSource} = this.props;
        return (
            <div>
                <p className={styles.modelTitle}>数据概要</p>
                <div className={styles.modelWrap}>
                    <Row>
                        <Col className={styles.textCommon} span={8}>
                            <span>领券人数</span>
                            <span>{dataSource
                                    ? dataSource.getusers
                                    : "--"}</span>
                        </Col>
                        <Col className={styles.textCommon} span={8}>
                            <span>核券人数</span>
                            <span>{dataSource
                                    ? dataSource.useusers
                                    : "--"}</span>
                        </Col>
                        <Col className={styles.textCommon} span={8}>
                            <span>人均用券量</span>
                            <span>{dataSource
                                    ? parseFloat(dataSource.useavg).toFixed(2)
                                    : "--"}</span>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
