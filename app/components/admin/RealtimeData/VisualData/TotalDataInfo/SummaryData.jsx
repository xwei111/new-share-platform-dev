import React, {Component, PropTypes} from 'react';
import {Row, Col} from 'antd';
import styles from './styles.css';

export default class SummaryData extends Component {
    render() {
        const {dataSource} = this.props;

        const {cget, uget, cuse, uuse} = dataSource;
        return (
            <div>
                <p className={styles.modelTitle}>数据概要</p>
                <div className={styles.modelWrap}>
                    <Row>
                        <Col className={styles.textCommon} span={6}>
                            <span>领券数量</span>
                            <span>{cget}</span>
                        </Col>
                        <Col className={styles.textCommon} span={6}>
                            <span>领券用户数</span>
                            <span>{uget}</span>
                        </Col>
                        <Col className={styles.textCommon} span={6}>
                            <span>核券数量</span>
                            <span>{cuse}</span>
                        </Col>
                        <Col className={styles.textCommon} span={6}>
                            <span>核销用户数</span>
                            <span>{uuse}</span>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
