import React, {PropTypes,Component} from 'react';
import { Row, Col, Form, Input, Select, Checkbox, Icon, message, DatePicker, Cascader, Button } from 'antd';
import { transformProviceAndCity } from 'helpers/util';
const Search = Input.Search;
import * as styles from './styles.css';

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

const form1 = ['全部', '潜在粉丝', '低级粉丝', '高级粉丝'];

const form2 = ['全部', '甜', '咸', '酸'];

const form3 = ['全部', '商圈门店', '社区门店'];

const form4 = ['全部', '周一', '周二', '周三', '周四', '周五', '周六', '周日'];

const form5 = ['全天'];

const form6 = ['全部', '大卖场', '便利店'];

const form7 = ['全部', '线下物料', '公众号'];

const form8 = ['全部', '支付宝', '微信'];

const form9 = ['全部', '收银台卡', '货架卡'];

const form10 = ['全部', '低级', '中级', '高级'];

const form11 = ['全部', '低级', '中级', '高级'];

const form12 = ['全部', '低级', '中级', '高级'];

const form13 = ['全部', '低级', '中级', '高级'];

const form14 = ['全部', '常温液态奶', '低温酸奶'];

const form15 = ['全部', '味可滋', '舒化奶'];

const form16 = ['全部', '箱装', '瓶装'];

export default class AddNewTag extends Component {
	
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

    handleRegionChange(value) {
	    this.props.setRegion(value);
	  }
	
	render() {

		const { provinceAndCity, region } = this.props;
		const { getFieldDecorator } = this.props.form;

	    return (
	      <div className={styles.content}>
	      	<p style={{textAlign: 'center',fontSize: '16px'}}>新增会员标签</p>

	      	<Form onSubmit={this.handleSubmit}>
	      		<div className={styles.commonTit}><p><span></span>基础信息筛选</p></div>

	      		<FormItem className={styles.size} label="粉丝等级" {...formItemLayout}>
	                {getFieldDecorator('form-1', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择粉丝等级!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form1} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>

	            <FormItem className={styles.size} label="饮食偏好" {...formItemLayout}>
	                {getFieldDecorator('form-2', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择饮食偏好!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form2} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>

	            <FormItem className={styles.size} label="粉丝地理位置" {...formItemLayout}>
                    <Cascader placeholder="请选择区域"
		                options={transformProviceAndCity(provinceAndCity)}
		                value={region}
		                style={{width: '150px'}}
		                onChange={::this.handleRegionChange}/>
	            </FormItem>

	            <div className={styles.commonTit}><p><span></span>消费信息筛选</p></div>

	            <FormItem className={styles.size} label="消费门店偏好类型" {...formItemLayout}>
	                {getFieldDecorator('form-4', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择消费门店偏好类型!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form3} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>

	            <FormItem className={styles.size} label="消费星期偏好" {...formItemLayout}>
	                {getFieldDecorator('form-2', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择消费星期偏好!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form4} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>

	            <FormItem className={styles.size} label="消费时间偏好" {...formItemLayout}>
	                {getFieldDecorator('form-5	', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择消费时间偏好!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form5} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>

	            <FormItem className={styles.size} label="消费业态偏好" {...formItemLayout}>
	                {getFieldDecorator('form-5	', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择消费业态偏好!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form6} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>

	            <FormItem className={styles.size} label="活动渠道偏好" {...formItemLayout}>
	                {getFieldDecorator('form-5	', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择活动渠道偏好!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form7} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>

	            <FormItem className={styles.size} label="支付方式偏好" {...formItemLayout}>
	                {getFieldDecorator('form-5	', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择支付方式偏好!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form8} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>

	            <FormItem className={styles.size} label="敏感物料" {...formItemLayout}>
	                {getFieldDecorator('form-5	', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择敏感物料!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form9} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>

	            <FormItem className={styles.size} label="客单价等级" {...formItemLayout}>
	                {getFieldDecorator('form-5	', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择客单价等级!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form10} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>

	            <FormItem className={styles.size} label="消费频次等级" {...formItemLayout}>
	                {getFieldDecorator('form-5	', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择消费频次等级!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form11} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>	

	            <FormItem className={styles.size} label="活动参与度" {...formItemLayout}>
	                {getFieldDecorator('form-5	', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择活动参与度!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form12} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>	

	            <FormItem className={styles.size} label="囤货等级" {...formItemLayout}>
	                {getFieldDecorator('form-5	', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择囤货等级!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form13} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>	

	            <div className={styles.commonTit}><p><span></span>商品偏好信息筛选</p></div>

	            <FormItem className={styles.size} label="购买品类偏好" {...formItemLayout}>
	                {getFieldDecorator('form-5	', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择购买品类偏好!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form14} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>	

	            <FormItem className={styles.size} label="购买商品偏好" {...formItemLayout}>
	                {getFieldDecorator('form-5	', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择购买商品偏好!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form15} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>	

	            <FormItem className={styles.size} label="购买规格偏好" {...formItemLayout}>
	                {getFieldDecorator('form-5	', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择购买规格偏好!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    <CheckboxGroup options={form16} onChange={:: this.onChangeCheckBox} />
	                </div>
	                )}
	            </FormItem>	

	            <FormItem className={styles.size} label="购买价格区间" {...formItemLayout}>
	                {getFieldDecorator('form-5	', {
	                    rules: [
	                        {
	                            required: true,
	                            message: '请选择购买价格区间!'
	                        }
	                    ],
	                    onChange: e=> {
	                        
	                    }
	                })(
	                <div>
	                    大于 <Input placeholder="输入金额" style={{width: '80px'}} /> 元
	                    小于 <Input placeholder="输入金额" style={{width: '80px'}} /> 元
	                </div>
	                )}
	            </FormItem>	

	            <div style={{ textAlign: 'center', padding: '20px 0' }}>
                    <Button type="primary" style={{ background: '#FFF', border: '1px solid #CCC', color: '#419BF9', marginRight: '10px', marginLeft: '-200px' }}>返回</Button>
                    <Button type="primary" style={{ background: '#419BF9', color: '#FFF', border: '1px solid #419BF9' }}>下一步</Button>
                </div>

                <div style={{display: 'none'}}>

	                <div className={styles.commonTit}><p><span></span>确定会员标签名称</p></div>

	                <FormItem className={styles.size} label="确定会员标签名称" {...formItemLayout}>
		                {getFieldDecorator('form-5	', {
		                    rules: [
		                        {
		                            required: true,
		                            message: '请输入会员标签名称!'
		                        }
		                    ],
		                    onChange: e=> {
		                        
		                    }
		                })(
		                <div>
		                	<Input placeholder="请输入会员标签名称" style={{width: '200px'}} />
		                </div>
		                )}
		            </FormItem>	

	                <div className={styles.commonTit}><p><span></span>数据汇总</p></div>

	                <p style={{textAlign: 'center',margin: '50px 0',marginLeft: '-200px'}}>根据以上条件已筛选出<span>1000</span>万名消费者,占总粉丝数为<span>36.67%</span></p>

	                <div style={{ textAlign: 'center', padding: '20px 0' }}>
	                    <Button type="primary" style={{ background: '#FFF', border: '1px solid #CCC', color: '#419BF9', marginRight: '10px', marginLeft: '-200px' }}>上一步</Button>
	                    <Button type="primary" style={{ background: '#419BF9', color: '#FFF', border: '1px solid #419BF9' }}>完成</Button>
	                </div>

	            </div>

	      	</Form>


	      </div>
	    );
	}
}
