import React, { PropTypes, Component } from 'react';
import { Input,InputNumber,Form,Button  } from 'antd';
const FormItem = Form.Item;
import * as styles from '../styles.css';


export default class MemberTagForm extends Component {
  render() {
    const { showCustom,custom,CheckCustom,type_tag,status ,color,CheckState,SearchPull,ResetPull,GetHightValue,GetHightType,onChange_first,onChange_last,form,fromNum,toNum } = this.props;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    const { getFieldDecorator } = this.props.form;
    return (
    <div>
      <div className={styles.size}>

        <Form>
          <FormItem
            {...formItemLayout}
            label="标签名称："
            style={{display: 'inline-block'}}
          >
          {getFieldDecorator('input1')(
              <Input placeholder="请输入粉丝标签名称" style={{width:'200px'}} onBlur={e => GetHightValue(e.target.value)}/>
          )}
          </FormItem>
          <FormItem
            labelCol={{ span: 10 }} wrapperCol={{ span: 10 }}
            label="人数范围："
            style={{display: 'inline-block',marginLeft:'20px'}}
          >
          {getFieldDecorator('people1',{initialValue:fromNum})(
              <InputNumber type="number"
                style={{ width: '80px'}}
                onChange={onChange_first}
                />
          )}
          </FormItem>
          -
          <FormItem
             style={{display: 'inline-block'}}
          >
          {getFieldDecorator('people2',{initialValue:toNum})(
              <InputNumber type="number" style={{ width: '80px',marginLeft:'8px'}} onChange={onChange_last}/>
          )}
          </FormItem>
        </Form>



      </div>
      <div className={styles.size}>
        <label className={styles.label}>标签类型：</label>
        <span onClick={e=>{CheckCustom('null')}} style={ type_tag == 'null' ?{ color:color }:null }>不限</span>
        <span onClick={e=>{CheckCustom('系统标签')}} style={ type_tag == '系统标签' ?{ color:color }:null} className={styles.margin}>系统标签</span>
        <span onClick={e=>{CheckCustom('自定义标签')}} style={ type_tag == '自定义标签' ?{ color:color }:null}>自定义标签</span>
        <Input placeholder="请输入粉丝标签类型" style={{width:'200px',height:'28px',marginLeft:'10px',display:custom}} onBlur={e => GetHightType(e.target.value)}/>
      </div>
      <div className={styles.size}>
        <label className={styles.label}>标签状态：</label>
        <span onClick={e=>{CheckState('null')}} style={ status == 'null' ?{ color:color }:null }>不限</span>
        <span onClick={e=>{CheckState('1')}} style={ status == '1' ?{ color:color }:null }><span style={{margin:'0 10px'}}>启用</span></span>
        <span onClick={e=>{CheckState('0')}} style={ status == '0' ?{ color:color }:null }>停用</span>
      </div>
      <div className={styles.button}>
        <Button type="primary" onClick={SearchPull} style={{marginRight: '10px'}}>查询</Button>
        <Button onClick={ResetPull}>重置</Button>
      </div>
    </div>
    );
  }
}
