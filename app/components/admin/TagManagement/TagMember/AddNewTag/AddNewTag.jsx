import React, {PropTypes,Component} from 'react';
import { Row, Col, Form, Input, Select, Checkbox, Icon, message, DatePicker, Cascader, Button } from 'antd';
import { allPrpos } from 'helpers/util';
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

const week_preference = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];

// const time_preference = ['上午(9-11)','中午(12-14)','下午(15-18)','晚上(19-23)'];
const time_preference = ['早上','上午','中午','下午','晚上'];

export default class AddNewTag extends Component {

	componentDidMount() {

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            	console.log('Received values of form: ', values);
              const queryData = allPrpos(values);
            	this.props.handleSetNewAddQuery(queryData);
            	this.props.returnConfig('/admin/fans/tagaddname');
        	}
        });
    }

    handleChange(value) {
  		console.log(`selected ${value}`);
	}

	isEmptyObject(obj) { //判断是否为一个空对象

        for (var key in obj) {
            return false
        };
        return true
    };

	render() {

		const { newAdd, newAddQuery, form } = this.props;
		const { getFieldDecorator } = form;

	    return (
	      <div className={styles.content}>
	      	<p style={{textAlign: 'center',fontSize: '16px'}}>新增会员标签</p>
	      	<div>
		      	<Form onSubmit={this.handleSubmit}>
		      		<div className={styles.commonTit}><p><span></span>基础信息筛选</p></div>

		      		<FormItem className={styles.size} label='性别' {...formItemLayout}>
					    {getFieldDecorator('sex', {
					    	initialValue: this.isEmptyObject(newAddQuery)
                			? undefined
                			: newAddQuery['sex'].split(","),
					        rules: [
					            {
					                required: true,
					                message: '请选择性别'
					            }
					        ]
					    })(
					      <Select
					      	multiple={true}
					        style={{ width: '100%' }}
					        placeholder='请选择性别'
					        onChange={:: this.handleChange}
					      >
				      		<Option key="男">男</Option>
				      		<Option key="女">女</Option>
					      </Select>
					    )}
					</FormItem>


		      		{newAdd.length !== 0 ?

		      			newAdd.map((item,idx) => (

		      				item.type === '基础信息' ?

			      				<FormItem key={idx} className={styles.size} label={item.key} {...formItemLayout}>
								    {getFieldDecorator(`${item.label_commet}`, {
								    	initialValue: this.isEmptyObject(newAddQuery)
                						? undefined
                						: newAddQuery[`${item.label_commet}`].split(","),
								        rules: [
								            {
								                required: true,
								                message: `请选择${item.key}`
								            }
								        ]
								    })(
								      <Select
								        multiple={true}
								        style={{ width: '100%' }}
								        placeholder={`请选择${item.key}`}
								        onChange={:: this.handleChange}
								      >
								      	{item.value.map(item => (
								      		<Option key={item}>{item}</Option>
								      	))}
								      </Select>
								    )}
								</FormItem>
							: null
		      			))
		      			: <p style={{
	                          width: '100%',
	                          height: '350px',
	                          lineHeight: '350px',
	                          textAlign: 'center'
	                      }}><Icon type="frown-o"/>暂未获取到可填选基础信息</p>
		      		}

		      		<div className={styles.commonTit}><p><span></span>消费信息筛选</p></div>

		      		<FormItem className={styles.size} label='消费星期偏好' {...formItemLayout}>
					    {getFieldDecorator('week_preference', {
					    	initialValue: this.isEmptyObject(newAddQuery)
    						? undefined
    						: newAddQuery['week_preference'].split(","),
					        rules: [
					            {
					                required: true,
					                message: '请选择消费星期偏好'
					            }
					        ]
					    })(
					      <Select
					        multiple={true}
					        style={{ width: '100%' }}
					        placeholder='请选择消费星期偏好'
					        onChange={:: this.handleChange}
					      >
					      	{week_preference.map(item => (
					      		<Option key={item}>{item}</Option>
					      	))}
					      </Select>
					    )}
					</FormItem>

					<FormItem className={styles.size} label='消费时间偏好' {...formItemLayout}>
					    {getFieldDecorator('time_preference', {
					    	initialValue: this.isEmptyObject(newAddQuery)
    						? undefined
    						: newAddQuery['time_preference'].split(","),
					        rules: [
					            {
					                required: true,
					                message: '请选择消费时间偏好'
					            }
					        ]
					    })(
					      <Select
					        multiple={true}
					        style={{ width: '100%' }}
					        placeholder='请选择消费时间偏好'
					        onChange={:: this.handleChange}
					      >
					      	{time_preference.map(item => (
					      		<Option key={item}>{item}</Option>
					      	))}
					      </Select>
					    )}
					</FormItem>

		      		{newAdd.length !== 0 ?

		      			newAdd.map((item,idx) => (

		      				item.type === '消费信息' ?

			      				<FormItem key={idx} className={styles.size} label={item.key} {...formItemLayout}>
								    {getFieldDecorator(`${item.label_commet}`, {
								    	initialValue: this.isEmptyObject(newAddQuery)
			    						? undefined
			    						: newAddQuery[`${item.label_commet}`].split(","),
								        rules: [
								            {
								                required: true,
								                message: `请选择${item.key}`
								            }
								        ]
								    })(
								      <Select
								        multiple={true}
								        style={{ width: '100%' }}
								        placeholder={`请选择${item.key}`}
								        onChange={:: this.handleChange}
								      >
								      	{item.value.map(item => (
								      		<Option key={item}>{item}</Option>
								      	))}
								      </Select>
								    )}
								</FormItem>
							: null
		      			))
		      			: <p style={{
	                          width: '100%',
	                          height: '350px',
	                          lineHeight: '350px',
	                          textAlign: 'center'
	                      }}><Icon type="frown-o"/>暂未获取到可填选消费信息</p>
		      		}

		      		<div className={styles.commonTit}><p><span></span>商品偏好信息筛选</p></div>

		      		{newAdd.length !== 0 ?

		      			newAdd.map((item,idx) => (

		      				item.type === '商品偏好信息' ?

			      				<FormItem key={idx} className={styles.size} label={item.key} {...formItemLayout}>
								    {getFieldDecorator(`${item.label_commet}`, {
								    	initialValue: this.isEmptyObject(newAddQuery)
			    						? undefined
			    						: newAddQuery[`${item.label_commet}`].split(","),
								        rules: [
								            {
								                required: true,
								                message: `请选择${item.key}`
								            }
								        ]
								    })(
								      <Select
								        multiple={true}
								        style={{ width: '100%' }}
								        placeholder={`请选择${item.key}`}
								        onChange={:: this.handleChange}
								      >
								      	{item.value.map(item => (
								      		<Option key={item}>{item}</Option>
								      	))}
								      </Select>
								    )}
								</FormItem>
							: null
		      			))
		      			: <p style={{
	                          width: '100%',
	                          height: '350px',
	                          lineHeight: '350px',
	                          textAlign: 'center'
	                      }}><Icon type="frown-o"/>暂未获取到可填选商品偏好信息</p>
		      		}

					<FormItem className={styles.size} label='购买价格' {...formItemLayout}>
					    {getFieldDecorator('purchase_price', {
					        rules: [
					            {
					                required: true,
					                message: '请输入购买价格'
					            }
					        ]
					    })(
					    	<div>
					    		<Input placeholder='请输入购买价格范围(例如：20-50)' style={{width: '85%'}} defaultValue={this.isEmptyObject(newAddQuery)
    								? undefined
    								: newAddQuery['purchase_price']}/>
					      		<label style={{color: 'rgb(248, 153, 133)'}}>　例如：20-50</label>
					    	</div>
					    )}
					</FormItem>

		            <div style={{ textAlign: 'center', padding: '20px 0' }}>
	                    <Button type="primary" style={{ background: '#FFF', border: '1px solid #CCC', color: '#419BF9', marginRight: '10px', marginLeft: '-200px' }} onClick={e => {this.props.returnConfig('/admin/fans/fanstag')}}>返回</Button>
	                    <Button type="primary" style={{ background: '#419BF9', color: '#FFF', border: '1px solid #419BF9' }} onClick={:: this.handleSubmit}>下一步</Button>
	                </div>

		      	</Form>

	      	</div>

	      </div>
	    );
	}
}
