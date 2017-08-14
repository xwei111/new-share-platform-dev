import React, {PropTypes} from 'react';
import { Row, Col, Spin, Tooltip, Card } from 'antd';
import classnames from 'classnames';
import { Link } from 'react-router';
import globalStyles from 'sharedStyles/global.css';
import * as styles from './styles.css';

export default function InitActivities({dataProps, onChageAct, onChoose}) {
    return (
        <div>
            <div className={globalStyles.containerWidth} style={{textAlign: 'center'}}>

                <Link className={styles.createActivity} to="/admin/activity/publish" onClick={num => {onChoose(0)}}>日常H5营销</Link>

                <Link className={classnames(styles.createActivity,styles.bg2)} to="/admin/activity/launch" onClick={(name,num)=>{onChageAct('自定义营销活动',1)}}>会员精准营销</Link>

                <Link className={classnames(styles.createActivity,styles.bg3)} to="/admin/activity/forecast">活动预测版</Link>
            </div>

            <div className={globalStyles.mainContainer}>

                  <Row style={{marginTop: '20px'}}>
                      <Col span={20}>
                          <p className={globalStyles.homeTitle}>
                              <span></span>
                              高效推荐营销
                          </p>
                      </Col>
                  </Row>
                  <Row style={{marginTop: '20px',paddingBottom: '300px',borderTop: '1px solid #DCE1E5'}}>
                      <Col span={8}>
                          <div className={styles.createWrap}>
                              <p className={styles.tips}>0次</p>
                              <div>
                                  <img src={require('images/create_moudle1.png')} />
                                  <p className={styles.createTit}>新品推广</p>
                                  <p>策略特征：采用赠饮或者以一元试饮券的形式将券定向推送给偏好相似品类爱好者的手里</p>
                              </div>
                              <Link to="/ad in/activity/launch" className={classnames(styles.cBtn,styles.cbg1)} onClick={(name,num)=>{onChageAct('提高毛利营销活动',1)}}>敬请期待</Link>
                          </div>
                      </Col>
                      <Col span={8}>
                          <div className={styles.createWrap}>
                              <p className={styles.tips}>0次</p>
                              <div>
                                  <img src={require('images/create_moudle2.png')} />
                                  <p className={styles.createTit}>清理库存</p>
                                  <p>策略特征：采用赠饮或者以一元试饮券的形式将券定向推送给偏好相似品类爱好者的手里</p>
                              </div>
                              <Link to="/admin/activity/launch" className={classnames(styles.cBtn,styles.cbg2)} onClick={(name,num)=>{onChageAct('提高销售营销活动',1)}}>敬请期待</Link>
                          </div>
                      </Col>
                      <Col span={8}>
                          <div className={styles.createWrap}>
                              <p className={styles.tips}>0次</p>
                              <div>
                                  <img src={require('images/create_moudle3.png')} />
                                  <p className={styles.createTit}>粉丝忠诚度</p>
                                  <p>策略特征：采用赠饮或者以一元试饮券的形式将券定向推送给偏好相似品类爱好者的手里</p>
                              </div>
                              <Link to="/admin/activity/launch" className={classnames(styles.cBtn,styles.cbg3)} onClick={(name,num)=>{onChageAct('提高客流营销活动',1)}}>敬请期待</Link>
                          </div>
                      </Col>
                      {/*<Col span={8}>
                                                <div className={styles.createWrap}>
                                                    <p className={styles.tips}>0次</p>
                                                    <div>
                                                        <img src={require('images/create_moudle4.png')} />
                                                        <p className={styles.createTit}>清理库存</p>
                                                        <p>策略特征：门店周边的消费次数较多，活动参与度较高人群。</p>
                                                    </div>
                                                    <Link to="/admin/activity/launch" className={classnames(styles.cBtn,styles.cbg3)} onClick={(name,num)=>{onChageAct('清理库存营销活动',1)}}>选择运营模版</Link>
                                                </div>
                                            </Col>
                                            <Col span={8}>
                                                <div className={styles.createWrap}>
                                                    <p className={styles.tips}>0次</p>
                                                    <div>
                                                        <img src={require('images/create_moudle5.png')} />
                                                        <p className={styles.createTit}>增加新会员</p>
                                                        <p>策略特征：门店周边的潜在消费人群。</p>
                                                    </div>
                                                    <Link to="/admin/activity/launch" className={classnames(styles.cBtn,styles.cbg2)} onClick={(name,num)=>{onChageAct('增加新会员营销活动',1)}}>选择运营模版</Link>
                                                </div>
                                            </Col>
                                            <Col span={8}>
                                                <div className={styles.createWrap}>
                                                    <p className={styles.tips}>0次</p>
                                                    <div>
                                                        <img src={require('images/create_moudle6.png')} />
                                                        <p className={styles.createTit}>唤醒流失会员</p>
                                                        <p>策略特征：最近未消费，且有历史消费记录的人群。</p>
                                                    </div>
                                                    <Link to="/admin/activity/launch" className={classnames(styles.cBtn,styles.cbg1)} onClick={(name,num)=>{onChageAct('唤醒流失会员营销活动',1)}}>选择运营模版</Link>
                                                </div>
                                            </Col>*/}
                  </Row>

            </div>

        </div>
    );
}
