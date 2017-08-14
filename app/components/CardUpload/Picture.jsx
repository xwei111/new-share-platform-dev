import React, { PropTypes } from 'react';
import { Form } from 'antd';
import { IMAGE_TYPE } from 'config/constants';
// import { formItemLayout } from '../constants.js';

import { CardUploadPro } from 'components';

const FormItem = Form.Item;

Picture.propTypes = {
  form: PropTypes.object.isRequired,
};
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 14 },
};

export default function Picture({form,GoodsDetailsAll}) {
  return (
    <FormItem label="商品图片：" {...formItemLayout}
      help="建议：请上传800*600，小于300K的bmp,png,jpeg,jpg或gif格式图片">
      {form.getFieldDecorator('picture',{rules: [{required: false}]})(
        <CardUploadPro type={IMAGE_TYPE.PRODUCT.value} GoodsDetailsAll={GoodsDetailsAll}/>
      )}
    </FormItem>
  );
}
