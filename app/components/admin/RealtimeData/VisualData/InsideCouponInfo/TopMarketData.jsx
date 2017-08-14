import React, {Component, PropTypes} from 'react';
import {Row, Col, Tooltip} from 'antd';
import styles from './styles.css';

export default class TopMarketData extends Component {
    render() {
        const {dataSource} = this.props;

        const {topToday, topToatl} = dataSource;

        return (
            <div>
                <p className={styles.modelTitle}>门店TOP10</p>
                <div className={styles.modelWrap}>
                    <Row>
                        <Col span={11}>
                            <p className={styles.DataTitle} style={{
                                textAlign: 'center'
                            }}>昨日数据TOP10</p>

                            <ul className={styles.ulTit}>
                                <li>门店名称</li>
                                <li>昨日核销数量</li>
                                <li>占比</li>
                            </ul>
                            <div>
                                <ul className={styles.ulInfo}>
                                    {topToday
                                        ? (topToday.datas.length
                                            ? topToday.datas.map((item, index) => (

                                                <li key={index}>

                                                    <Tooltip placement="right" title={item.market_name}>
                                                        <span>{item.storeName}</span>
                                                    </Tooltip>
                                                    <span>{item.totalUsedCnt}</span>
                                                    <span>{parseFloat(parseInt(item.totalUsedCnt) / parseInt(topToday.total)||0).toFixed(2)||0}</span>
                                                </li>

                                            ))
                                            : <li style={{
                                                textAlign: 'center'
                                            }}>暂无</li>)
                                        : <li style={{
                                            textAlign: 'center'
                                        }}>暂无</li>
}
                                </ul>
                            </div>

                        </Col>
                        <Col span={11} offset={1}>
                            <p className={styles.DataTitle} style={{
                                textAlign: 'center'
                            }}>累计数据TOP10</p>

                            <ul className={styles.ulTit}>
                                <li>门店名称</li>
                                <li>累计核销数量</li>
                                <li>占比</li>
                            </ul>

                            <div>
                                <ul className={styles.ulInfo}>
                                    {topToatl
                                        ? (topToatl.datas.length
                                            ? topToatl.datas.map((item, index) => (

                                                <li key={index}>

                                                    <Tooltip placement="right" title={item.market_name}>
                                                        <span>{item.storeName}</span>
                                                    </Tooltip>
                                                    <span>{item.totalUsedCnt}</span>
                                                    <span>{parseFloat(parseInt(item.totalUsedCnt) / parseInt(topToatl.total)||0).toFixed(2)||0}</span>
                                                </li>

                                            ))
                                            : <li style={{
                                                textAlign: 'center'
                                            }}>暂无</li>)
                                        : <li style={{
                                            textAlign: 'center'
                                        }}>暂无</li>
}
                                </ul>
                            </div>

                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}
