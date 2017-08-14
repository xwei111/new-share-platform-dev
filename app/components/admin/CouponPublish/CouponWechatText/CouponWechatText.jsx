import React, { PropTypes } from 'react';
import { Form, Input } from 'antd';
import { formItemLayout } from '../constants.js';
import { addRequiredDecorator } from 'helpers/util';

const FormItem = Form.Item;

CouponWechatText.propTypes = {
  form: PropTypes.object.isRequired,
};

export default function CouponWechatText({form}) {
  const requiredFieldDecorators = addRequiredDecorator(['couponnWechatText'], form.getFieldDecorator);
  return (
    <FormItem label="券文字描述" {...formItemLayout} required>
      {requiredFieldDecorators('couponnWechatText')(
        <Input placeholder="请输入图文详情页面文字描述" style={{ width: 276 }} type="textarea" rows={4}/>
      )}
    </FormItem>
  );
}
