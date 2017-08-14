import React, { PropTypes, Component } from 'react';
import { Row, Col, Form, Input, Select, Checkbox, Icon, message, DatePicker, Button } from 'antd';
import classnames from 'classnames';
import * as styles from './styles.css';
import {getStrLeng} from 'helpers/util';
import moment from 'moment';


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


@Form.create()
export default class ActivityPrediction extends Component {
    
    componentDidMount() {
    }
    handleSubmit = (e) => {
        e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleChange(value) {
        console.log(`selected ${value}`);
    }

    onChangeCheckBox(checkedValues) {
        console.log('checked = ', checkedValues);
    }

    
    render() {
    
        const { getFieldDecorator } = this.props.form;
        
        return (
            <div>
                
                <div className={styles.commonTit}><p><span></span>活动商品信息</p></div>
                
                
                
                <Form layout="inline" onSubmit={this.handleSubmit}>
                    <FormItem className={styles.size} label="活动商品：" {...formItemLayout}>
                        {getFieldDecorator('activeName', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择活动商品!'
                                }
                            ],
                            onChange: e=> {
                                if (getStrLeng(e.target.value) > 60) {
                                    message.error('活动商品不能超过20个汉字');
                                    e.target.value = e.target.value.substr(0, 20);
                                }
                            }
                        })(<Input placeholder="请选择活动商品" style={{
                            width: '400px'
                        }}/>)}
                    </FormItem>
                    
                    <FormItem className={styles.size} label="优惠力度：" {...formItemLayout}>
                        {getFieldDecorator('efforts', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择优惠力度!'
                                }
                            ],
                            onChange: e=> {
                                
                            }
                        })(<Input placeholder="请选择优惠力度" style={{
                            width: '400px'
                        }}/>)}
                    </FormItem>

                    <FormItem className={styles.size} label="去年同期销量：" {...formItemLayout}>
                        {getFieldDecorator('lastyear', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入去年同期销量!'
                                }
                            ],
                            onChange: e=> {
                                
                            }
                        })(<Input placeholder="请输入去年同期销量" style={{
                            width: '400px'
                        }}/>)}
                    </FormItem>

                    <FormItem className={styles.size} label="上月同期销量：" {...formItemLayout}>
                        {getFieldDecorator('lastmonth', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入上月同期销量!'
                                }
                            ],
                            onChange: e=> {
                                
                            }
                        })(<Input placeholder="请输入上月同期销量" style={{
                            width: '400px'
                        }}/>)}
                    </FormItem>

                    <FormItem className={styles.size} label="近三月销量：" {...formItemLayout}>
                        {getFieldDecorator('threemonth', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入近三月销量!'
                                }
                            ],
                            onChange: e=> {
                                
                            }
                        })(<Input placeholder="请输入近三月销量" style={{
                            width: '400px'
                        }}/>)}
                    </FormItem>

                    <FormItem className={styles.size} label="近一月是否有促销：" {...formItemLayout}>
                        {getFieldDecorator('onemonth', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择促销与否!'
                                }
                            ],
                            onChange: e=> {
                                
                            }
                        })(
                        <div>
                            <Select defaultValue="有" style={{ width: '120px', marginRight: '40px' }} onChange={:: this.handleChange}>
                                <Option value="有">有</Option>
                                <Option value="无">无</Option>
                            </Select>
                            <Input placeholder="请输入核销量" style={{
                                width: '240px'
                            }}/>
                        </div>
                        )}
                    </FormItem>

                    <FormItem className={styles.size} label="竞争对手是否有促销" {...formItemLayout}>
                        {getFieldDecorator('other', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择促销与否!'
                                }
                            ],
                            onChange: e=> {
                                
                            }
                        })(
                        <div>
                            <Select defaultValue="有" style={{ width: '120px', marginRight: '40px' }} onChange={:: this.handleChange}>
                                <Option value="有">有</Option>
                                <Option value="无">无</Option>
                            </Select>
                            <Input placeholder="请输入活动优惠力度" style={{
                                width: '240px'
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
                                    message: '请选择促销与否!'
                                }
                            ],
                            onChange: e=> {
                                
                            }
                        })(
                        <div>
                            <Select defaultValue="请选择活动商户" style={{ width: '150px', marginRight: '10px' }} onChange={:: this.handleChange}>
                                <Option value="请选择活动商户">请选择活动商户</Option>
                                <Option value="暂无">暂无</Option>
                            </Select>
                            <Select defaultValue="请选择活动地区" style={{ width: '120px', marginRight: '10px' }} onChange={:: this.handleChange}>
                                <Option value="请选择活动地区">请选择活动地区</Option>
                                <Option value="暂无">暂无</Option>
                            </Select>
                            <Input placeholder="请输入门店数量" style={{
                                width: '100px'
                            }}/><label>　家门店参与</label>
                        </div>
                        )}
                    </FormItem>

                    <FormItem className={styles.size} label="是否使用会赚" {...formItemLayout}>
                        {getFieldDecorator('huizhuan', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择促销与否!'
                                }
                            ],
                            onChange: e=> {
                                
                            }
                        })(
                        <div>
                            <Select defaultValue="用" style={{ width: '80px', marginRight: '10px' }} onChange={:: this.handleChange}>
                                <Option value="用">用</Option>
                                <Option value="不用">不用</Option>
                            </Select>
                  
                            <Input placeholder="请输入奖励额度" style={{
                                width: '100px'
                            }}/><label> 元/张</label>
                        </div>
                        )}
                    </FormItem>

                    <FormItem className={styles.size} label="物料资源" {...formItemLayout}>
                        {getFieldDecorator('huizhuan', {
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

                    <FormItem className={styles.size} label="活动时间长度" {...formItemLayout}>
                        {getFieldDecorator('activetime', {
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
                            <RangePicker style={{ width: '220px' }} defaultValue={[moment('2015/01/01', dateFormat), moment('2015/01/01', dateFormat)]} format={dateFormat}
                            />
                        </div>
                        )}
                    </FormItem>

                    <FormItem className={styles.size} label="活动形式" {...formItemLayout}>
                        {getFieldDecorator('action', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择活动形式!'
                                }
                            ],
                            onChange: e=> {
                                
                            }
                        })(
                        <div>
                            <Select defaultValue="立减" style={{ width: '220px' }} onChange={:: this.handleChange}>
                                <Option value="立减">立减</Option>
                                <Option value="满减">满减</Option>
                            </Select>
                        </div>
                        )}
                    </FormItem>

                    <FormItem className={styles.size} label="使用限制" {...formItemLayout}>
                        {getFieldDecorator('action', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入使用限制!'
                                }
                            ],
                            onChange: e=> {
                                
                            }
                        })(
                        <div>
                            <Input placeholder="请输入使用限制" style={{
                                width: '220px'
                            }}/><label> 张/人</label>
                        </div>
                        )}
                    </FormItem>
                    <div style={{ textAlign: 'center', padding: '20px 0' }}>
                        <Button type="primary" style={{ background: '#FFF', border: '1px solid #CCC', color: '#419BF9', marginRight: '10px', marginLeft: '-200px' }}>返回</Button>
                        <Button type="primary" style={{ background: '#FB6666', color: '#FFF', border: '1px solid #FB6666' }}>立即开始预测</Button>
                    </div>

                </Form>
            </div>
        );
    }
}
