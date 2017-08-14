import React, { PropTypes, Component } from 'react';
import {  Input,Form,Button  } from 'antd';
const FormItem = Form.Item;
import * as styles from '../styles.css';


export default class MarketTagForm extends Component {
  render() {
    const { setState,_setState ,color,CheckState,_CheckState,SearchPull,ResetPull,GetGoodsName,form } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { getFieldDecorator } = this.props.form;
    return (
    <div>
      <Form style={{display: 'inline-block'}}>
        <FormItem
          {...formItemLayout}
          label="门店名称："
        >
        {getFieldDecorator('input1')(
            <Input placeholder="请输入门店名称" style={{width:'200px'}} onBlur={e => GetGoodsName(e.target.value)}/>
        )}
        </FormItem>
      </Form>

      <div className={styles.size}>
        <label>门店类型：</label>
        <span onClick={e=>{_CheckState('')}} style={ _setState == '' ?{ color:color }:null }>不限</span>
        <span onClick={e=>{_CheckState('商圈')}} style={ _setState == '商圈' ?{ color:color }:null }><span style={{marginLeft:'10px'}}>商圈</span></span>
        <span onClick={e=>{_CheckState('社区')}} style={ _setState == '社区' ?{ color:color }:null }><span style={{margin:'0 10px'}}>社区</span></span>
        <span onClick={e=>{_CheckState('学校')}} style={ _setState == '学校' ?{ color:color }:null }>学校</span>
      </div>
      <div className={styles.size}>
        <label>标签状态：</label>
        <span onClick={e=>{CheckState('')}} style={ setState == '' ?{ color:color }:null }>不限</span>
        <span onClick={e=>{CheckState('1')}} style={ setState == '1' ?{ color:color }:null }><span style={{margin:'0 10px'}}>启用</span></span>
        <span onClick={e=>{CheckState('0')}} style={ setState == '0' ?{ color:color }:null }>停用</span>
      </div>

      <div className={styles.button}>
        <Button type="primary" onClick={SearchPull} style={{marginRight: '10px'}}>查询</Button>
        <Button onClick={ResetPull}>重置</Button>
      </div>
    </div>
    );
  }
}
