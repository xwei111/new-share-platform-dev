import React, {PropTypes, Component} from 'react';
import {
    Form,
    Row,
    Col,
    Select,
    DatePicker,
    Button
} from 'antd';
import {generateOptions, generateOptionsByTime} from 'helpers/util';
import * as styles from './styles.css';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
let firstVal = 0;
export default class AlipayActivitySelection extends Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
        activityList: PropTypes.array.isRequired,
    }

    render() {
        const {
            form,
            activityList,
            couponList,
            activityFieldName = 'activeId',
            couponFieldName = 'couponId',
            onListChange,
            onCouponChange,
        } = this.props;
        const {getFieldDecorator} = form;
        const activityFieldDecorator = getFieldDecorator(activityFieldName, {
            initialValue: activityList.length > 0
                ? `${activityList[0].activeid}`
                : undefined,
            onChange: onListChange,
            rules: [
                {
                    required: true,
                    message: '请选择活动'
                }
            ]
        });

        const couponFieldDecorator = getFieldDecorator(couponFieldName, {
            initialValue: couponList.length > 0
                ? `${couponList[0].pubid}`
                : undefined,
            onChange: onCouponChange,
            rules: [
                {
                    required: true,
                    message: '请选择券名称'
                }
            ]
        });

        return (
            <div>
                <Col offset={1} span={2} style={{
                    lineHeight: '20px'
                }}>活动名称:</Col>
                <Col span={4} style={{
                    marginTop: '-5px'
                }}>
                    <FormItem>
                        {activityFieldDecorator(
                            <Select size="large" size="small" placeholder="请选择活动名称" style={{
                                width: '100%'
                            }} allowClear={false}>

                                {generateOptions(activityList, 'activeid', 'name')}
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={2} offset={1} style={{
                    lineHeight: '20px'
                }}>券名称:</Col>
                <Col span={4} style={{
                    marginTop: '-5px'
                }}>
                    <FormItem>
                        {couponFieldDecorator(
                            <Select size="large" size="small" placeholder="请选择券名称" style={{
                                width: '100%'
                            }} allowClear={false}>

                                {generateOptions(couponList, 'pubid', 'couponname')}
                            </Select>
                        )}
                    </FormItem>
                </Col>
            </div>
        );
    }
}
