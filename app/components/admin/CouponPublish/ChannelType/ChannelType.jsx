import React, { PropTypes  ,Component} from 'react';
import { Form, Col, DatePicker, Input,Radio } from 'antd';
import { channelTypeDecorator } from '../PublishForm/validator.js';
import { DATE_INTERVAL,COUPON_TYPE } from 'config/constants';
import { disabledDate } from 'helpers/util';
import styles from './styles.css';

const FormItem = Form.Item;
const RangePicker = DatePicker.RangePicker;
const RadioGroup = Radio.Group;
const {REBATECOUPON,FRESH}=COUPON_TYPE;

export default class ChannelType extends Component {
  state={
    value:this.props.form.getFieldsValue().channel_type?this.props.form.getFieldsValue().channel_type:"0",
    eDisplay: 'none',
    iDisplay: 'none'
  }
  onChange(e) {
    const {form} = this.props;
     
    this.setState({
      value: e.target.value,
    });
  }
  render() {
  const {form,couponType, isSelectMode, isMyVip} = this.props;
  const {value,eDisplay,iDisplay}=this.state;
   const radioStyle = {
      display: 'inline',
    };
    return (
      <div style={isSelectMode !== 0 ? {display:'none'}: {display:'block'}}>

         <FormItem label="券展示渠道" labelCol={{ span: 5 }} wrapperCol={{ span: 18 }} required>
          {
              form.getFieldDecorator("channel_type",{initialValue: value})(
                <RadioGroup  onChange={::this.onChange}>
                    <Radio style={radioStyle} key="lbs"  value={"0"}>lbs显示
                    </Radio>
                    <Radio style={radioStyle} key="app" value={"a"}>app显示
                    </Radio>
                </RadioGroup>
              )
          }
        </FormItem>
      </div>
    );
  }
}
