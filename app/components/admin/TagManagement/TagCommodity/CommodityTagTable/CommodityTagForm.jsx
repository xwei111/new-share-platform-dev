import React, { PropTypes, Component } from 'react';
import { Input,Form,Button  } from 'antd';
const FormItem = Form.Item;

import * as styles from '../styles.css';


export default class CommodityTagForm extends Component {
  render() {
    const { showCustom,custom,CheckCustom,setRed,setState ,color,CheckState,SearchPull,ResetPull,GetGoodsName,GetGoodsId,GetCatName,form } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { getFieldDecorator } = this.props.form;
    return (
    <div>
      <Form>
        <FormItem
          {...formItemLayout}
          label="商品名称："
           style={{display: 'inline-block'}}
        >
        {getFieldDecorator('input1')(
            <Input placeholder="请输入商品名称" style={{width:'200px'}} onBlur={e => GetGoodsName(e.target.value)}/>
        )}
        </FormItem>
        <FormItem
           style={{display: 'inline-block',marginLeft:'10px'}}
          {...formItemLayout}
          label="商品条码："
        >
          {getFieldDecorator('input2')(
            <Input placeholder="请输入商品条码" style={{width:'200px'}} onBlur={e => GetGoodsId(e.target.value)}/>
          )}
        </FormItem>
        <FormItem
           style={{display: 'inline-block',marginLeft:'10px'}}
          {...formItemLayout}
          label="商品品类："
        >
        {getFieldDecorator('input3')(
            <Input placeholder="请输入商品品类名称" style={{width:'200px'}} onBlur={e => GetCatName(e.target.value)}/>
        )}
        </FormItem>
      </Form>



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
