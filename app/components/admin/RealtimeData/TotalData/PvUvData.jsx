import React, {Component, PropTypes} from 'react';
import {Row, Col, Spin} from 'antd';
import * as styles from './styles.css';

export default class PvUvData extends Component {
    render() {

        const {loading,pv,pvp,uv,uvp,cget,cgetp,uget,ugetp,cuse,cusep,uuse,uusep,hideEle} = this.props;

        return (
            <div>
                <p className={styles.modelTitle}>数据概要</p>
                <Spin spinning={loading}>
                    <div className={styles.modelWrap}>
                        <Row>
                            <Col className={styles.textCommon} span={6}>
                                <span>领券数量</span>
                                <span>{cget}</span>
                                <span style={{display:hideEle}}>同比昨日:<i className={styles.iconN}>{cgetp}</i>
                                </span>
                            </Col>
                            <Col className={styles.textCommon} span={6}>
                                <span>领券用户数</span>
                                <span>{uget}</span>
                                <span style={{display:hideEle}}>同比昨日:<i className={styles.iconS}>{ugetp}</i>
                                </span>
                            </Col>
                            <Col className={styles.textCommon} span={6}>
                                <span>核券数量</span>
                                <span>{cuse}</span>
                                <span style={{display:hideEle}}>同比昨日:<i className={styles.iconS}>{cusep}</i>
                                </span>
                            </Col>
                            <Col className={styles.textCommon} span={6}>
                                <span>核销用户数</span>
                                <span>{uuse}</span>
                                <span style={{display:hideEle}}>同比昨日:<i className={styles.iconS}>{uusep}</i>
                                </span>
                            </Col>
                        </Row>
                    </div>
                </Spin>
            </div>
        )
    }
}
