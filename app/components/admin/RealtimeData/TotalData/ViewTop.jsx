import React, {Component, PropTypes} from 'react';
import {Row, Col, Spin} from 'antd';
import * as styles from './styles.css';

export default class ViewTop extends Component {

    isEmptyObject(obj) { //判断是否为一个空对象

        for (var key in obj) {
            return false
        };
        return true
    };

    render() {

        const {loading, dataSource} = this.props;
        return (
            <div>
                <p className={styles.modelTitle}>核券TOP 10</p>
                <Row style={{
                    marginTop: '10px'
                }}>
                    <Col span={11}>
                        <p style={{marginLeft: '20px,fontSize: 14px',fontWeight: 'bold'}}>区域Top10</p>
                        <ul className={styles.viewTopArea}>
                            {!this.isEmptyObject(dataSource.areatop)
                                ? dataSource.areatop.map((item,index) => (
                                  <li key={index}>
                                      <p>{item.cityname}</p>
                                      <p>{item.cnt}</p>
                                      <div>
                                          <p style={{width: ''+(20 + parseFloat(item.rate))+'%'}}><span>{item.rate}%</span></p>
                                      </div>
                                  </li>
                                ))
                                : <li style={{textAlign: 'center'}}>暂无</li>}
                        </ul>
                    </Col>
                    <Col span={10} offset={1}>
                        <p style={{marginLeft: '20px,fontSize: 14px',fontWeight: 'bold'}}>渠道Top10</p>
                        <ul className={styles.viewTopArea}>
                            {!this.isEmptyObject(dataSource.channeltop)
                                ? dataSource.channeltop.map((item,index) => (
                                  <li key={index}>
                                      <p>{item.channelname}</p>
                                      <p>{item.cnt}</p>
                                      <div>
                                          <p style={{width: ''+(20 + parseFloat(item.rate))+'%'}}><span>{item.rate}%</span></p>
                                      </div>
                                  </li>
                                ))
                                : <li style={{textAlign: 'center'}}>暂无</li>}
                        </ul>
                    </Col>
                </Row>

                <Row style={{
                    marginTop: '10px',
                    borderTop: '1px solid #CCC',
                    paddingTop: '20px'
                }}>
                    <Col span={11}>
                        <p style={{marginLeft: '20px,fontSize: 14px',fontWeight: 'bold'}}>商户Top10</p>
                        <ul className={styles.viewTopArea}>
                            {!this.isEmptyObject(dataSource.merchanttop)
                                ? dataSource.merchanttop.map((item,index) => (
                                  <li key={index}>
                                      <p>{item.shortname}</p>
                                      <p>{item.cnt}</p>
                                      <div>
                                          <p style={{width: ''+(20 + parseFloat(item.rate))+'%'}}><span>{item.rate}%</span></p>
                                      </div>
                                  </li>
                                ))
                                : <li style={{textAlign: 'center'}}>暂无</li>}
                        </ul>
                    </Col>
                    <Col span={10} offset={1}>
                        <p style={{marginLeft: '20px,fontSize: 14px',fontWeight: 'bold'}}>门店Top10</p>
                        <ul className={styles.viewTopArea}>
                            <li>
                                <p style={{width: '40%'}}>门店名称</p>
                                <p style={{width: '30%'}}>核销数量</p>
                                <div style={{width: '30%'}}>
                                    <p style={{background: 'none',textAlign: 'left'}}>占比</p>
                                </div>
                            </li>

                            {!this.isEmptyObject(dataSource.markettop)
                                ? dataSource.markettop.map((item,index) => (
                                  <li key={index}>
                                      <p style={{width: '40%'}}>{item.saas_marketname}</p>
                                      <p style={{width: '30%'}}>{item.cnt}</p>
                                      <div style={{width: '30%'}}>
                                          <p style={{background: 'none'}}>{item.rate}%</p>
                                      </div>
                                  </li>
                                ))
                                : <li style={{textAlign: 'center'}}>暂无</li>}
                        </ul>
                    </Col>
                </Row>
            </div>
        )
    }
}
