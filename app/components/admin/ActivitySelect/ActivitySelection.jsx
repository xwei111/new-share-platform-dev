import React, {PropTypes, Component} from 'react';
import {
    Form,
    Row,
    Col,
    Select,
    DatePicker,
    Button
} from 'antd';
import {generateOptions, YESTERDAY} from 'helpers/util';
import * as styles from './styles.css';
import moment from 'moment';

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
let firstVal = 0;
export default class ActivitySelection extends Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
        activityList: PropTypes.array.isRequired,
    }

    render() {
        const {
            form,
            activityList,
            activeid,
            activityFieldName = 'activeId',
            onListChange,
        } = this.props;
        const {getFieldDecorator} = form;
        const activityFieldDecorator = getFieldDecorator(activityFieldName, {
            // initialValue: activityList.length > 0
            //     ? `${activeid}`
            //     : undefined,
            onChange: onListChange,
            rules: [
                {
                    required: true,
                    message: '请选择活动'
                }
            ]
        });

        return (
            <div>
                <Col offset={7} span={2} style={{
                    fontSize: '20px',
                    color: '#FFF'
                }}>活动名称:</Col>
                <Col span={4}>
                    <FormItem>
                        {activityFieldDecorator(
                            <Select size="large" placeholder="请选择活动名称" style={{
                                width: '100%',
                                borderRadius: '100px 0 0 100px',
                                overflow: 'hidden'
                            }} allowClear={false}>

                                {generateOptions(activityList, 'active_id', 'activeName')}
                            </Select>
                        )}
                    </FormItem>
                </Col>
            </div>
        );
    }
}
