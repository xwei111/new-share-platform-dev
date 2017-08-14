import React, { PropTypes, Component } from 'react';
import { Row, Col, Form, Input, Select, Checkbox, Icon, message, DatePicker, Button } from 'antd';
import classnames from 'classnames';
import * as styles from './styles.css';
import {getStrLeng} from 'helpers/util';
import moment from 'moment';
import {marketingApi} from 'api';

const { MonthPicker, RangePicker } = DatePicker;

const FormItem = Form.Item;

const Option = Select.Option;
const CheckboxGroup = Checkbox.Group;

const formItemLayout = {
    labelCol: {
        span: 3
    },
    wrapperCol: {
        span: 14
    }
};

const plainOptions = ['三角立牌', '吊旗', '收银台贴', '货架插卡', '价格签', '跳跳卡'];
const dateFormat = 'YYYY/MM/DD';

export default class PredictionResult extends Component {

    state ={
        pres_trength: 0.5,
        mresource_cnt: [],
        is_hz: 0,
        type: '立减',
        op_trength: 0.5,
        m1: 0,
        m2: 0,
        m3: 0,
        m4: 0,
        m5: 0
    }

    handleSubmit = (e) => {
        e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleHuizhuanChange(value) {
        this.setState({is_hz: value})
    }

    onChangeCheckBox(checkedValues) {
        this.setState({mresource_cnt: checkedValues});
    }

    handleChange(value) {
        this.setState({type: value})
    }

    handeleJump(a) {
        this.props.returnConfig('/admin/activity/'+a+'');
    }

    handleOptimization(a) {
        const {goodid, efforts, other, markets, huizhuan, wuliao, day, actiontype} = this.props.yuceData;

        const {pres_trength, is_hz, type, mresource_cnt, op_trength} = this.state;

        let beforeObj = this.props.yuceData;

        switch (a) {
          case 1:
                beforeObj.efforts = pres_trength;

                marketingApi.getSPlatCoefficientDao(goodid.text, pres_trength, other || 0, markets, huizhuan, wuliao.length, day, actiontype).then(data => {
                    beforeObj.data = data.data;
                    this.props.handleSetYuceData(beforeObj);
                    this.props.handelSetNextProps(1);
                    this.setState({m1: 1});
                    message.success('优化成功！');
                })
          break;
          case 2:
                beforeObj.huizhuan = is_hz;

                marketingApi.getSPlatCoefficientDao(goodid.text, efforts, other || 0, markets, is_hz, wuliao.length, day, actiontype).then(data => {
                    beforeObj.data = data.data;
                    this.props.handleSetYuceData(beforeObj);
                    this.props.handelSetNextProps(2);
                    this.setState({m2: 1});
                    message.success('优化成功！');
                })
          break;
          case 3:
                beforeObj.actiontype = type;

                marketingApi.getSPlatCoefficientDao(goodid.text, efforts, other || 0, markets, huizhuan, wuliao.length, day, type).then(data => {
                    beforeObj.data = data.data;
                    this.props.handleSetYuceData(beforeObj);
                    this.props.handelSetNextProps(3);
                    this.setState({m3: 1});
                    message.success('优化成功！');
                })
          break;
          case 4:
                beforeObj.wuliao = mresource_cnt;

                marketingApi.getSPlatCoefficientDao(goodid.text, efforts, other || 0, markets, huizhuan, mresource_cnt.length, day, actiontype).then(data => {
                    beforeObj.data = data.data;
                    this.props.handleSetYuceData(beforeObj);
                    this.props.handelSetNextProps(4);
                    this.setState({m4: 1});
                    message.success('优化成功！');
                })
          break;
          case 5:
                beforeObj.other = op_trength;

                marketingApi.getSPlatCoefficientDao(goodid.text, efforts, op_trength, markets, huizhuan, wuliao.length, day, actiontype).then(data => {
                    beforeObj.data = data.data;
                    this.props.handleSetYuceData(beforeObj);
                    this.props.handelSetNextProps(5);
                    this.setState({m5: 1});
                    message.success('优化成功！');
                })
          break;
          default:
        }
    }

    render() {

        const { yuceData, form } = this.props;
        const {m1, m2, m3, m4, m5} = this.state;
        const { getFieldDecorator } = form;
        const { efforts ,other, huizhuan, actiontype , wuliao, data } = yuceData;

        const { coupon, off, max_coupon, max_off } = data[0];

        return (
            <div>
                <Row>
                    <Col className={styles.PredictionBox} span={8} offset={4}>
                        <p className={styles.c1}><img src={require("images/icon_quan.png")} />预测核销量</p>
                        <p className={styles.c2} style={{ color: '#FF5656' }}>{Math.abs(coupon)||0}</p>
                        <p className={styles.c3} style={m1 == 1 && m2 == 1 && m3 == 1 && m4 == 1 ? {display: 'none'} : {display: 'block'}}>可提升至: <span>{Math.abs(max_coupon)||0}</span></p>
                    </Col>
                    <Col className={styles.PredictionBox} span={11} offset={1}>
                        <p className={styles.c1}><img src={require("images/icon_serch.png")} />预测核销率</p>
                        <p className={styles.c2} style={{ color: '#27B7FF' }}>{parseFloat(off).toFixed(2) * 100}%</p>
                        <p className={styles.c3} style={m1 == 1 && m2 == 1 && m3 == 1 && m4 == 1 ? {display: 'none'} : {display: 'block'}}>可提升至: <span>{parseFloat(max_off).toFixed(2) * 100}%</span></p>
                    </Col>
                </Row>

                

                <Form layout="inline" onSubmit={this.handleSubmit}>

                <div>

                  <div className={styles.commonTit}><p><span></span>可优化内容</p></div>
                  <FormItem className={styles.size} label="优惠力度：" {...formItemLayout} style={efforts < 0.5 || m1 === 0 ? {display: 'block'} : {display: 'none'}}>
                      {getFieldDecorator('efforts', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入优惠力度!'
                                }
                            ],
                          onChange: e=> {
                              if(!isNaN(e.target.value)){
                                  var dot = e.target.value.indexOf(".");
                                  if(dot != -1){
                                      var dotCnt = e.target.value.substring(dot+1,e.target.value.length);
                                      if(dotCnt.length > 2){
                                          message.error("小数位已超过2位！");
                                          return e.target.value = parseFloat(e.target.value ).toFixed(2);
                                      }
                                  } else if (parseInt(e.target.value) >=1 ) {
                                      message.error("请输入1以为的数字");
                                      return e.target.value = 0.9;
                                  }
                                  this.setState({pres_trength: e.target.value});
                              }else{
                                  message.error("数字不合法！");
                                  return e.target.value = 0;
                              }
                          }
                      })(
                      <div>
                          <Input placeholder="请输入优惠力度" defaultValue="0.5" style={{
                              width: '100px'
                          }}/> <label>折</label> <span className={styles.resultBnt} onClick={e => {this.handleOptimization(1)}}>立即优化</span>
                      </div>
                      )}
                  </FormItem>

                  <FormItem className={styles.size} label="是否使用会赚" {...formItemLayout} style={huizhuan == 1 || m2 === 0 ? {display: 'block'} : {display: 'none'}}>
                      {getFieldDecorator('huizhuan', {
                          initialValue: '用',
                          rules: [
                              {
                                  required: false
                              }
                          ]
                      })(
                      <div>
                          <Select defaultValue="0" style={{ width: '100px' }} onChange={:: this.handleHuizhuanChange}>
                              <Option value="0">用</Option>
                              <Option value="1" disabled>不用</Option>
                          </Select> <label>　</label> <span className={styles.resultBnt} onClick={e => {this.handleOptimization(2)}}>立即优化</span>
                      </div>
                      )}
                  </FormItem>

                  <FormItem className={styles.size} label="活动形式" {...formItemLayout} style={actiontype != '立减' || m3 === 0 ? {display: 'block'} : {display: 'none'}}>
                      {getFieldDecorator('actiontype', {
                          initialValue: '立减',
                          rules: [
                              {
                                  required: true,
                                  message: '请选择活动形式!'
                              }
                          ]
                      })(
                      <div>
                          <Select defaultValue="立减" style={{ width: '100px' }} onChange={:: this.handleChange}>
                              <Option value="立减">立减</Option>
                              <Option value="买一送X" disabled={actiontype == '买一送X' ? true : false}>买一送X</Option>
                              <Option value="抽奖" disabled={actiontype == '抽奖' ? true : false}>抽奖</Option>
                          </Select> <label>　</label> <span className={styles.resultBnt} onClick={e => {this.handleOptimization(3)}}>立即优化</span>
                      </div>
                      )}
                  </FormItem>

                  <FormItem className={styles.size} label="物料资源" {...formItemLayout} style={wuliao.length < 6 || m4 === 0 ? {display: 'block'} : {display: 'none'}}>
                      {getFieldDecorator('wuliao', {
                          rules: [
                              {
                                  required: true,
                                  message: '请选择物料资源!'
                              }
                          ]
                      })(
                      <div>
                          <div  style={{width: '470px', display: 'inline-block'}}>
                              <CheckboxGroup options={plainOptions} defaultValue={wuliao} onChange={:: this.onChangeCheckBox}/>
                          </div>
                          <span className={styles.resultBnt} onClick={e => {this.handleOptimization(4)}}>立即优化</span>
                      </div>
                      )}
                  </FormItem>

                  <p style={m1 == 1 && m2 == 1 && m3 == 1 && m4 == 1 ? {display: 'block',width: '100%',
                      height: '350px',
                      lineHeight: '350px',
                      textAlign: 'center'} : {display: 'none'}}><Icon type="frown-o"/>暂无可优化内容</p>

                </div>

                  <div style={other == undefined || m5 === 0 ? {display: 'block'} : {display: 'none'}}>
                      <div className={styles.commonTit}><p><span></span>可提高预测准确性内容</p></div>


                      <p className={styles.resultTit}>预测准确性　65%</p>
                      <p className={styles.resultInfo}>完善以下信息可以将准确率提高到85%</p>


                      <FormItem className={styles.size} label="竞争对手是否有促销" {...formItemLayout}>
                          {getFieldDecorator('other', {
                              rules: [
                                  {
                                      required: false
                                  }
                              ],
                              onChange: e=> {
                                  if(!isNaN(e.target.value)){
                                      var dot = e.target.value.indexOf(".");
                                      if(dot != -1){
                                          var dotCnt = e.target.value.substring(dot+1,e.target.value.length);
                                          if(dotCnt.length > 2){
                                              message.error("小数位已超过2位！");
                                              return e.target.value = parseFloat(e.target.value ).toFixed(2);
                                          }
                                      } else if (parseInt(e.target.value) >=1 ) {
                                          message.error("请输入1以为的数字");
                                          return e.target.value = 0.9;
                                      }
                                      this.setState({op_trength: e.target.value});
                                  }else{
                                      message.error("数字不合法！");
                                      return e.target.value = 0;
                                  }
                              }
                          })(
                          <div>
                              <Input placeholder="请输入优惠力度" style={{
                                  width: '100px'
                              }}/> <label>折</label> <span className={styles.resultBnt} onClick={e => {this.handleOptimization(5)}}>立即优化</span>
                          </div>
                          )}
                      </FormItem>
                  </div>

                  <div style={{ textAlign: 'center', padding: '20px 0' }}>
                      <Button type="primary" size="large" style={{ background: '#FB6666', color: '#FFF', border: '1px solid #FB6666' }} onClick={e => {this.handeleJump('forecast')}}>重新预测</Button>
                      <Button type="primary" size="large" style={{ background: '#419BF9', border: '1px solid #419BF9', color: '#FFF', marginRight: '10px', marginLeft: '-200px' }} onClick={e => {this.handeleJump('activity')}}>完成</Button>
                  </div>

                </Form>
            </div>
        );
    }
}
