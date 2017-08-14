import React, {Component, PropTypes} from 'react';
import {Row, Col, Spin,Icon,Table} from 'antd';
import styles from './styles.css';
import { ConsumeTime,WeekendExpression,WeekExpression,WeekVerificationChart,WeekTradeChart } from 'components/admin/DataReports/Charts'


export default class VerificationTime extends Component {
    render() {
      const { lookDetail,show,showTable,lookDetailWeek,showWeek,showTableWeek,getActiveMarketTimeAll,getActiveMarketTimeWorkday,getActiveMarketTimeWeekend,loadingTime,loadingWeek,amount,num }=this.props;
        return (
            <div>
              <div className={styles.commonTit}><p><span></span>门店类型时段核销分析</p></div>
              <div className={styles.styleRelative}>
                <p className={styles.lookDetail} onClick={lookDetail}>查看数据详情<Icon type={show} /></p>
                <Spin spinning={loadingTime}>
                <Row style={{marginTop:'20px'}}>
                  <Col span={7}>
                    <ConsumeTime dataSource={getActiveMarketTimeAll}/>
                    <p style={{textAlign:'center'}}>消费时段</p>
                  </Col>
                  <Col span={7} offset={1}>
                    <WeekExpression dataSource={getActiveMarketTimeWorkday}/>
                    <p style={{textAlign:'center'}}>周间表现</p>
                  </Col>
                  <Col span={7} offset={1}>
                    <WeekendExpression dataSource={getActiveMarketTimeWeekend} />
                    <p style={{textAlign:'center'}}>周末表现</p>
                  </Col>
                </Row>
                </Spin>
                <div className={styles.DetailTable+' '+styles.fadeInDown} style={{display:showTable}}>

                  <table className={styles.tableStyle}>
                    <tr>
                      <td></td>
                      <td></td>
                      <td>商圈门店</td>
                      <td>社区门店</td>
                      <td>学校门店</td>
                    </tr>
                    <tr>
                      <td rowSpan='4'>全部数据</td>
                      <td>上午核销</td>
                      <td>{getActiveMarketTimeAll==''?null:getActiveMarketTimeAll.morning[0]}</td>
                      <td>{getActiveMarketTimeAll==''?null:getActiveMarketTimeAll.morning[1]}</td>
                      <td>{getActiveMarketTimeAll==''?null:getActiveMarketTimeAll.morning[2]}</td>
                    </tr>
                    <tr>
                      <td>中午核销</td>
                      <td>{getActiveMarketTimeAll==''?null:getActiveMarketTimeAll.noon[0]}</td>
                      <td>{getActiveMarketTimeAll==''?null:getActiveMarketTimeAll.noon[1]}</td>
                      <td>{getActiveMarketTimeAll==''?null:getActiveMarketTimeAll.noon[2]}</td>
                    </tr>
                    <tr>
                      <td>下午核销</td>
                      <td>{getActiveMarketTimeAll==''?null:getActiveMarketTimeAll.afternoon[0]}</td>
                      <td>{getActiveMarketTimeAll==''?null:getActiveMarketTimeAll.afternoon[1]}</td>
                      <td>{getActiveMarketTimeAll==''?null:getActiveMarketTimeAll.afternoon[2]}</td>
                    </tr>
                    <tr>
                      <td>晚上核销</td>
                      <td>{getActiveMarketTimeAll==''?null:getActiveMarketTimeAll.evening[0]}</td>
                      <td>{getActiveMarketTimeAll==''?null:getActiveMarketTimeAll.evening[1]}</td>
                      <td>{getActiveMarketTimeAll==''?null:getActiveMarketTimeAll.evening[2]}</td>
                    </tr>
                    <tr>
                      <td rowSpan='4'>周间数据</td>
                        <td>上午核销</td>
                        <td>{getActiveMarketTimeWorkday==''?null:getActiveMarketTimeWorkday.morning[0]}</td>
                        <td>{getActiveMarketTimeWorkday==''?null:getActiveMarketTimeWorkday.morning[1]}</td>
                        <td>{getActiveMarketTimeWorkday==''?null:getActiveMarketTimeWorkday.morning[2]}</td>
                      </tr>
                      <tr>
                        <td>中午核销</td>
                        <td>{getActiveMarketTimeWorkday==''?null:getActiveMarketTimeWorkday.noon[0]}</td>
                        <td>{getActiveMarketTimeWorkday==''?null:getActiveMarketTimeWorkday.noon[1]}</td>
                        <td>{getActiveMarketTimeWorkday==''?null:getActiveMarketTimeWorkday.noon[2]}</td>
                      </tr>
                      <tr>
                        <td>下午核销</td>
                        <td>{getActiveMarketTimeWorkday==''?null:getActiveMarketTimeWorkday.afternoon[0]}</td>
                        <td>{getActiveMarketTimeWorkday==''?null:getActiveMarketTimeWorkday.afternoon[1]}</td>
                        <td>{getActiveMarketTimeWorkday==''?null:getActiveMarketTimeWorkday.afternoon[2]}</td>
                      </tr>
                      <tr>
                        <td>晚上核销</td>
                        <td>{getActiveMarketTimeWorkday==''?null:getActiveMarketTimeWorkday.evening[0]}</td>
                        <td>{getActiveMarketTimeWorkday==''?null:getActiveMarketTimeWorkday.evening[1]}</td>
                        <td>{getActiveMarketTimeWorkday==''?null:getActiveMarketTimeWorkday.evening[2]}</td>
                      </tr>
                  <tr>
                    <td rowSpan='4'>周末数据</td>
                      <td>上午核销</td>
                      <td>{getActiveMarketTimeWeekend==''?null:getActiveMarketTimeWeekend.morning[0]}</td>
                      <td>{getActiveMarketTimeWeekend==''?null:getActiveMarketTimeWeekend.morning[1]}</td>
                      <td>{getActiveMarketTimeWeekend==''?null:getActiveMarketTimeWeekend.morning[2]}</td>
                    </tr>
                    <tr>
                      <td>中午核销</td>
                      <td>{getActiveMarketTimeWeekend==''?null:getActiveMarketTimeWeekend.noon[0]}</td>
                      <td>{getActiveMarketTimeWeekend==''?null:getActiveMarketTimeWeekend.noon[1]}</td>
                      <td>{getActiveMarketTimeWeekend==''?null:getActiveMarketTimeWeekend.noon[2]}</td>
                    </tr>
                    <tr>
                      <td>下午核销</td>
                      <td>{getActiveMarketTimeWeekend==''?null:getActiveMarketTimeWeekend.afternoon[0]}</td>
                      <td>{getActiveMarketTimeWeekend==''?null:getActiveMarketTimeWeekend.afternoon[1]}</td>
                      <td>{getActiveMarketTimeWeekend==''?null:getActiveMarketTimeWeekend.afternoon[2]}</td>
                    </tr>
                    <tr>
                      <td>晚上核销</td>
                      <td>{getActiveMarketTimeWeekend==''?null:getActiveMarketTimeWeekend.evening[0]}</td>
                      <td>{getActiveMarketTimeWeekend==''?null:getActiveMarketTimeWeekend.evening[1]}</td>
                      <td>{getActiveMarketTimeWeekend==''?null:getActiveMarketTimeWeekend.evening[2]}</td>
                    </tr>
                  </table>
                </div>
              </div>
              <div className={styles.commonTit}><p><span></span>门店类型星期核销分析</p></div>
              <div className={styles.styleRelativeWeek}>
                <p className={styles.lookDetail} onClick={lookDetailWeek}>查看数据详情<Icon type={showWeek} /></p>
                <Spin spinning={loadingWeek}>
                  <Row style={{marginTop:'20px'}}>
                    <Col span={10}>
                      <WeekTradeChart dataSource={amount}/>
                    </Col>
                    <Col span={10} offset={2}>
                      <WeekVerificationChart dataSource={num} />
                    </Col>
                  </Row>
                </Spin>
                <div className={styles.DetailTable_two+' '+styles.fadeInDown} style={{display:showTableWeek}}>
                  <Row style={{marginBottom: '15px'}}>
                    <Col span={11} style={{marginRight: '10px'}}>
                      <table className={styles.tableStyle_two}>
                        <tr>
                          <td>交易额</td>
                          <td>商圈门店</td>
                          <td>社区门店</td>
                          <td>学校门店</td>
                        </tr>
                        <tr>
                          <td>周一</td>
                          <td>{amount==''?null:amount.biscenter[0]}</td>
                          <td>{amount==''?null:amount.community[0]}</td>
                          <td>{amount==''?null:amount.school[0]}</td>
                        </tr>
                        <tr>
                          <td>周二</td>
                          <td>{amount==''?null:amount.biscenter[1]}</td>
                          <td>{amount==''?null:amount.community[1]}</td>
                          <td>{amount==''?null:amount.school[1]}</td>
                        </tr>
                        <tr>
                          <td>周三</td>
                          <td>{amount==''?null:amount.biscenter[2]}</td>
                          <td>{amount==''?null:amount.community[2]}</td>
                          <td>{amount==''?null:amount.school[2]}</td>
                        </tr>
                        <tr>
                          <td>周四</td>
                          <td>{amount==''?null:amount.biscenter[3]}</td>
                          <td>{amount==''?null:amount.community[3]}</td>
                          <td>{amount==''?null:amount.school[3]}</td>
                        </tr>
                        <tr>
                          <td>周五</td>
                          <td>{amount==''?null:amount.biscenter[4]}</td>
                          <td>{amount==''?null:amount.community[4]}</td>
                          <td>{amount==''?null:amount.school[4]}</td>
                        </tr>
                        <tr>
                          <td>周六</td>
                          <td>{amount==''?null:amount.biscenter[5]}</td>
                          <td>{amount==''?null:amount.community[5]}</td>
                          <td>{amount==''?null:amount.school[5]}</td>
                        </tr>
                        <tr>
                          <td>周日</td>
                          <td>{amount==''?null:amount.biscenter[6]}</td>
                          <td>{amount==''?null:amount.community[6]}</td>
                          <td>{amount==''?null:amount.school[6]}</td>
                        </tr>
                      </table>
                    </Col>
                    <Col span={11} offset={1}>
                      <table className={styles.tableStyle_two}>
                        <tr>
                          <td>核销量</td>
                          <td>商圈门店</td>
                          <td>社区门店</td>
                          <td>学校门店</td>
                        </tr>
                        <tr>
                          <td>周一</td>
                          <td>{num==''?null:num.biscenter[0]}</td>
                          <td>{num==''?null:num.community[0]}</td>
                          <td>{num==''?null:num.school[0]}</td>
                        </tr>
                        <tr>
                          <td>周二</td>
                          <td>{num==''?null:num.biscenter[1]}</td>
                          <td>{num==''?null:num.community[1]}</td>
                          <td>{num==''?null:num.school[1]}</td>
                        </tr>
                        <tr>
                          <td>周三</td>
                          <td>{num==''?null:num.biscenter[2]}</td>
                          <td>{num==''?null:num.community[2]}</td>
                          <td>{num==''?null:num.school[2]}</td>
                        </tr>
                        <tr>
                          <td>周四</td>
                          <td>{num==''?null:num.biscenter[3]}</td>
                          <td>{num==''?null:num.community[3]}</td>
                          <td>{num==''?null:num.school[3]}</td>
                        </tr>
                        <tr>
                          <td>周五</td>
                          <td>{num==''?null:num.biscenter[4]}</td>
                          <td>{num==''?null:num.community[4]}</td>
                          <td>{num==''?null:num.school[4]}</td>
                        </tr>
                        <tr>
                          <td>周六</td>
                          <td>{num==''?null:num.biscenter[5]}</td>
                          <td>{num==''?null:num.community[5]}</td>
                          <td>{num==''?null:num.school[5]}</td>
                        </tr>
                        <tr>
                          <td>周日</td>
                          <td>{num==''?null:num.biscenter[6]}</td>
                          <td>{num==''?null:num.community[6]}</td>
                          <td>{num==''?null:num.school[6]}</td>
                        </tr>
                      </table>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
        )
    }
}