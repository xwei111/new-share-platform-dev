import React, {Component, PropTypes} from 'react';
import {Row, Col, Tabs, Spin, Icon} from 'antd';
import * as styles from './styles.css';

import {realDataApi} from 'api';

import DataCoupon from '../../Charts/DataCoupon';
import DataPeople from '../../Charts/DataPeople';

const TabPane = Tabs.TabPane;

export default class TrendCharts extends Component {

    static propTypes = {
        dataSource: PropTypes.shape({day: PropTypes.array, pv: PropTypes.array, uv: PropTypes.array}).isRequired,
        chartsVal : PropTypes.object.isRequired,
    }

    static defaultProps = {
        dataSource: {day: [0], cget: [0], cuse: [0]},
        chartsVal : {},
    }

    state = {
        type : 'coupon',
        couponData: { day: [0], cget: [0], cuse: [0]},
        userData: { day: [0], uget: [0], uuse: [0]},
        info : 'day'
    }

    componentWillReceiveProps(nextProps) {
        const {dataSource,trendKey} = this.props;
        if (trendKey == 'coupon') {
            this.setState({couponData: dataSource})
        } else {
            this.setState({userData: dataSource})
        }
    }

    callback(key) {
        this.setState({type : key});
        const {chartsVal, tabCallBack} = this.props;
        tabCallBack(key);
        const {info} = this.state;
        chartsVal.type = key;
        chartsVal.dataformat = info;

        realDataApi.dataCurve(chartsVal)
            .then(data => {
              if (key == 'coupon') {
                  this.setState({couponData: data.couponData})
              } else if (key == 'user') {
                  this.setState({userData: data.userData})
              }
            })
            .catch(e => console.log(e));
    }

    render() {
        const { trendKey } = this.props;
        const {type, couponData, userData} = this.state;
        return (
            <div>
                <p className={styles.modelTitle}>数据走势图</p>
                <div className={styles.modelWrap}>
                    <Tabs defaultActiveKey={trendKey} onChange={:: this.callback} type='card'>
                        <TabPane tab="领核券数" key="coupon">
                        {
                          couponData ?
                          <DataCoupon dataSource={couponData}/> :
                          <p style={{
                              width: '100%',
                              height: '350px',
                              lineHeight: '350px',
                              textAlign: 'center'
                          }}><Icon type="frown-o"/>暂无数据</p>
                        }

                        </TabPane>
                        <TabPane tab="领核券人数" key="user">
                            {
                                userData ?
                                <DataPeople dataSource={userData}/> :
                                <p style={{
                                    width: '100%',
                                    height: '350px',
                                    lineHeight: '350px',
                                    textAlign: 'center'
                                }}><Icon type="frown-o"/>暂无数据</p>
                            }
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        )
    }
}
