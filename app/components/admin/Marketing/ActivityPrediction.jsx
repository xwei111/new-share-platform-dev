import React, { PropTypes, Component } from 'react';
import { Row, Col, Form, Input, Select, Checkbox, Icon, message, DatePicker, Button } from 'antd';
import { SearchGoodsInput } from 'components/admin/CouponPublish';
import classnames from 'classnames';
import * as styles from './styles.css';
import {disabledDate, dayCut} from 'helpers/util';
import moment from 'moment';
import {DATE_INTERVAL} from 'config/constants';
import {marketingApi} from 'api';


const { RangePicker } = DatePicker;

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

export default class ActivityPrediction extends Component {

    state ={
        wuliao: [],
        day: 0,
        huizhuan: 0,
        display: 'none'
    }

    componentDidMount() {
    }
    handleSubmit = (e) => {
        e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                // console.log('Received values of form: ', values);
                let { goodid, efforts, other, markets, actiontype } = values;
                const { wuliao, day, huizhuan } = this.state;

                // const queryData = Object.assign(wuliao, day, huizhuan,goodid, efforts, other, markets, actiontype);
                if (wuliao.length == 0) {
                    message.error('请选择物料资源');
                    return;
                }

                marketingApi.getSPlatCoefficientDao(goodid.text, efforts, other || 0, markets, huizhuan, wuliao.length, day, actiontype).then(data => {
                    const queryData = Object.assign(this.state,values,data);
                    this.props.handleSetYuceData(queryData);
                    this.props.returnConfig('/admin/activity/result');
                })

            }
        });
    }

    handleChange(value) {
        if (value == '无') {
            this.setState({display: 'none'});
        } else if (value == '有') {
            this.setState({display: 'inline-block'});
        }
    }

    handleHuizhuanChange(value) {
        this.setState({huizhuan: value})
    }

    onChangeCheckBox(checkedValues) {
        this.setState({wuliao: checkedValues});
    }

    handleActiveTime(val, str) {
        const day = dayCut(str[0],str[1]);
        this.setState({day: parseInt(day) + 1})
    }

    handeleJump(a) {
        this.props.returnConfig('/admin/activity/'+a+'');
    }

    render() {
        const { form } = this.props;
        const { display } = this.state;
        const { getFieldDecorator } = form;
        const rangeConfig = {
            rules: [
                {
                    type: 'array',
                    required: true,
                    message: '请选择活动时间!'
                }
            ]
        };

        return (
            <div>

                <div className={styles.commonTit}><p><span></span>活动商品信息</p></div>



                <Form onSubmit={this.handleSubmit}>

                    <SearchGoodsInput form={form}/>

                    <FormItem className={styles.size} label="优惠力度：" {...formItemLayout}>
                        {getFieldDecorator('efforts', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择优惠力度!'
                                }
                            ],
                            onChange: e=> {
                                if(!isNaN(e.target.value)){
                                    var dot = e.target.value.indexOf(".");
                                    if(dot != -1){
                                        var dotCnt = e.target.value.substring(dot+1,e.target.value.length);
                                        if(dotCnt.length > 2){
                                            message.error("小数位已超过2位！");
                                        }
                                    } else if (parseInt(e.target.value) >=1 ) {
                                        message.error("请输入1以为的数字");
                                    }
                                }else{
                                    message.error("数字不合法！");
                                }
                            }
                        })(
                        <div>
                            <Input placeholder="请选择优惠力度" style={{
                                width: '300px'
                            }}/> <label>折</label>
                        </div>
                        )}
                    </FormItem>

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
                                        }
                                    } else if (parseInt(e.target.value) >=1 ) {
                                        message.error("请输入1以为的数字");
                                    }
                                }else{
                                    message.error("数字不合法！");
                                }
                            }
                        })(
                        <div>
                            <Select defaultValue="无" style={{ width: '120px', marginRight: '40px' }} onChange={:: this.handleChange}>
                                <Option value="无">无</Option>
                                <Option value="有">有</Option>
                            </Select>
                            <Input placeholder="请输入活动优惠力度" style={{
                                width: '140px',
                                display: display
                            }}/>
                        </div>
                        )}
                    </FormItem>

                    <div className={styles.commonTit}><p><span></span>活动渠道信息</p></div>

                    <FormItem className={styles.size} label="活动门店" {...formItemLayout}>
                        {getFieldDecorator('markets', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入门店数量!'
                                }
                            ],
                            onChange: e=> {

                            }
                        })(
                        <div>
                            <Input placeholder="请输入门店数量" style={{
                                width: '100px'
                            }}/><label>　家门店参与</label>
                        </div>
                        )}
                    </FormItem>

                    <FormItem className={styles.size} label="是否使用会赚" {...formItemLayout}>
                        {getFieldDecorator('is_hz', {
                            initialValue: '用',
                            rules: [
                                {
                                    required: false
                                }
                            ]
                        })(
                        <div>
                            <Select defaultValue="0" style={{ width: '80px', marginRight: '10px' }} onChange={:: this.handleHuizhuanChange}>
                                <Option value="0">用</Option>
                                <Option value="1">不用</Option>
                            </Select>
                        </div>
                        )}
                    </FormItem>

                    <FormItem className={styles.size} label="物料资源" {...formItemLayout}>
                        {getFieldDecorator('is_hz', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择物料资源!'
                                }
                            ],
                            onChange: e=> {

                            }
                        })(
                        <div>
                            <CheckboxGroup options={plainOptions} onChange={:: this.onChangeCheckBox} />
                        </div>
                        )}
                    </FormItem>

                    <div className={styles.commonTit}><p><span></span>活动形式信息</p></div>


                    <FormItem className={styles.size} label="活动时间：" {...formItemLayout}>
                        {getFieldDecorator('range-picker', rangeConfig)(<RangePicker style={{
                            width: '220px'
                        }} size='normal' onChange={:: this.handleActiveTime} disabledDate={disabledDate(DATE_INTERVAL.BEFORE, 1)}/>)}
                    </FormItem>


                    <FormItem className={styles.size} label="活动形式" {...formItemLayout}>
                        {getFieldDecorator('actiontype', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择活动形式!'
                                }
                            ]
                        })(
                            <Select style={{ width: '220px' }} placeholder="请选择活动形式" onChange={:: this.handleChange}>
                                <Option value="立减">立减</Option>
                                <Option value="买一送X">买一送X</Option>
                                <Option value="抽奖">抽奖</Option>
                            </Select>
                        )}
                    </FormItem>

                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <Button type="primary" style={{ background: '#FFF', border: '1px solid #CCC', color: '#419BF9', marginRight: '10px', marginLeft: '-200px' }} onClick={e => {this.handeleJump('activity')}}>返回</Button>
                        <Button type="primary" style={{ background: '#FB6666', color: '#FFF', border: '1px solid #FB6666' }} onClick={:: this.handleSubmit}>立即开始预测</Button>
                    </div>

                </Form>
            </div>
        );
    }
}
