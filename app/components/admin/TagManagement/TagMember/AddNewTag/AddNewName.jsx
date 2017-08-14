import React, {PropTypes,Component} from 'react';
import { Row, Col, Form, Input, Select, Checkbox, Icon, message, DatePicker, Cascader, Button, notification } from 'antd';
import { allPrpos } from 'helpers/util';
const Search = Input.Search;
import * as styles from './styles.css';
import {tagApi} from 'api';


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

export default class AddNewName extends Component {

	state = {
		display: '1'
	}

	componentDidMount() {

    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
            	const { newAddQuery, newAddRate } = this.props;
            	console.log('Received values of form: ', values);
            	const _queryData = Object.assign(newAddQuery,values, newAddRate);
              const queryData = allPrpos(_queryData);
            	this.props.handleSetNewAddQuery(queryData);
            	tagApi.addNewLabel(queryData).then(data => {
            		message.success('添加成功~');
            		setTimeout(e => {
            			this.props.handleSetNewAddQuery({});
            			this.props.returnConfig('/admin/fans/fanstag');
            		}, 1000);
              })
        	}
        });
    }

    onBlurName(e) {
    	tagApi.getLabelExit(e.target.value).then(data => {
    		console.log(data)
    		if (data.data) {
    			e.target.value = '';
		    	notification.open({
		          message: '温馨提示',
		          description: '当前输入活动名称已被使用，建议修改',
		          icon: <Icon type="smile-circle" style={{ color: '#FB8181' }} />,
		      	});
    		}
    	})
    }

	render() {

		const { form, newAddQuery, newAddRate } = this.props;
		const { getFieldDecorator } = form;

	    return (
	      <div className={styles.content}>
	      	<p style={{textAlign: 'center',fontSize: '16px'}}>新增会员标签</p>

	    	<div className={styles.commonTit}><p><span></span>确定会员标签名称</p></div>

	    	<Form>
			    <FormItem className={styles.size} label="确定会员标签名称" {...formItemLayout}>
			        {getFieldDecorator('label_name', {
			            rules: [
			                {
			                    required: true,
			                    message: '请输入会员标签名称!'
			                }
			            ],
			            onChange: e=> {
			            	// tagApi.getLabelExit(e.target.value).then(data => console.log(data))
			            }
			        })(
			        <div>
			        	<Input placeholder="请输入会员标签名称" style={{width: '200px'}} onBlur={e => this.onBlurName(e)}/>
			        </div>
			        )}
			    </FormItem>
			</Form>

		    <div className={styles.commonTit}><p><span></span>数据汇总</p></div>

		    <p style={{textAlign: 'center',margin: '50px 0',marginLeft: '-200px'}}>根据以上条件已筛选出<span>{newAddRate.key}</span>名消费者,占总粉丝数为<span>{newAddRate.value}%</span></p>

		    <div style={{ textAlign: 'center', padding: '20px 0' }}>
		        <Button type="primary" style={{ background: '#FFF', border: '1px solid #CCC', color: '#419BF9', marginRight: '10px', marginLeft: '-200px' }} onClick={e => {this.props.returnConfig('/admin/fans/tagmanage')}}>上一步</Button>
		        <Button type="primary" style={{ background: '#419BF9', color: '#FFF', border: '1px solid #419BF9' }} onClick={:: this.handleSubmit}>完成</Button>
		    </div>

	      </div>
	    );
	}
}
