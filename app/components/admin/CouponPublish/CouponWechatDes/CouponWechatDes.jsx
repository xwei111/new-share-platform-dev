import React, { PropTypes } from 'react';
import { Form, Input } from 'antd';
import { formItemLayout } from '../constants.js';
import { addRequiredDecorator } from 'helpers/util';

const FormItem = Form.Item;

CouponWechatDes.propTypes = {
  form: PropTypes.object.isRequired,
};

export default function CouponWechatDes({form}) {
  const requiredFieldDecorators = addRequiredDecorator(['couponnWechatDes'], form.getFieldDecorator);
  return (
    <FormItem label="封面摘要简介" {...formItemLayout} required>
      {requiredFieldDecorators('couponnWechatDes')(
        <Input placeholder="请输入封面摘要简介" style={{ width: 276 }}/>
      )}
    </FormItem>
  );
}
