import React, { PropTypes, Component } from 'react';
import { Button, Form, Input, Select,message,Popconfirm,Modal } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import { CardUploadNew } from 'components';
import {  IMAGE_TYPE } from 'config/constants';
import { NewdataContainer } from 'containers/admin/TagManagement';
import * as styles from '../styles.css';


export default class CommodityNewCreate extends Component {
  render() {
    const { handleCancel,showNew,visible,CloseTab,confirmCancel,cancelCancel,confirmFinish,cancelFinish,showNewCreate,showBatchCreate,form ,SixNine } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
    <div>
      <div className={styles.rightButton}>
        <p onClick={showBatchCreate}>+ 批量新增</p>
        <p onClick={showNewCreate}>+ 新增商品</p>
      </div>
      <div style={{display:showNew}} className={styles.animated+' '+styles.fadeInDown}>
        <div className={styles.Z_bg}>
          <p className={styles.title_p}>新增商品</p>

          <div className={styles.tab}>
            <span className={styles.close_tab} onClick={CloseTab}>X</span>
            <div>
              <Form form={form}>
                <FormItem label="单品图片" {...formItemLayout}>
                  {getFieldDecorator('pic', {rules: [{required: true, message: '请选择文件'}]})(
                    <CardUploadNew
                      type={IMAGE_TYPE.PRODUCT.value}
                      ref={upload => this._upload = upload}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="商品名称："
                >
                  {getFieldDecorator('goods_name', {
                    rules: [{ required: true, message: '请输入你的商品名称!', whitespace: true }],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="商品69码："
                >
                  {getFieldDecorator('goods_id', {
                    rules: [{ required: true, message: '请输入你的商品69码!', whitespace: true }],
                  })(
                    <Input onBlur={SixNine}/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="标准售价："
                >
                  {getFieldDecorator('price', {
                    rules: [{ required: true, message: '请输入标准售价!', whitespace: true }],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="所属品类："
                >
                  {getFieldDecorator('catname', {
                    rules: [{ required: false, message: '请输入所属品类!', whitespace: true }],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                 {...formItemLayout}
                 label="当前状态"
               >
                 {getFieldDecorator('avalibale',{initialValue: "1"},{
                   rules: [{ required: true}],
                 })(
                   <Select>
                     <Option value="1">启用</Option>
                     <Option value="0">停用</Option>
                   </Select>
                 )}

               </FormItem>
               <FormItem style={{textAlign:'center'}}>
               <Button type="danger" htmlType="submit" size="large" style={{marginRight:'10px'}}>
                  <Popconfirm title="是否确认取消?" onConfirm={confirmCancel} onCancel={cancelCancel} okText="Yes" cancelText="No">
                    取消
                  </Popconfirm>
                </Button>
                <Button type="primary" htmlType="submit" size="large">
                  <Popconfirm title="是否确认新增商品?" onConfirm={confirmFinish} onCancel={cancelFinish} okText="Yes" cancelText="No">
                    新增
                  </Popconfirm>
                </Button>
               </FormItem>
              </Form>
            </div>
          </div>
        </div>
      </div>


       <Modal visible={visible}
       onCancel={handleCancel}
       width="600px"
       >
         <NewdataContainer visible={visible}/>
       </Modal>

    </div>
    );
  }
}
