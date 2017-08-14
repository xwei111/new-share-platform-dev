import React, {PropTypes, Component} from 'react';
import {
    Form,
    Row,
    Col,
    Select,
    DatePicker,
    Button
} from 'antd';
import {generateOptions, generateOptionsByTime, YESTERDAY} from 'helpers/util';
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
        starttime: PropTypes.string.isRequired,
        endtime: PropTypes.string.isRequired
    }

    disabledDate(current) {
        const {startTime, endTime} = this.props;



        let _s = startTime.replace('-', '/');
        let _e = endTime.replace('-', '/');
        let _y = YESTERDAY.replace('-', '/');

        let _st = new Date(_s);
        let _et = new Date(_e);
        let _yt = new Date(_y);

        let start = _st.getTime();
        let end = _et.getTime();
        let yet = _yt.getTime();
        if (Date.parse(endTime)<Date.parse(YESTERDAY)) {
            return current && current.valueOf() > end || current.valueOf() < start;
        } else {
            return current && current.valueOf() > yet || current.valueOf() < start;
        }
    }

    render() {
        const {
            form,
            activityList,
            activeid,
            activename,
            activityFieldName = 'activeId',
            onListChange,
            onDateChange,
            starttime,
            endtime
        } = this.props;
        const {getFieldDecorator} = form;
        const activityFieldDecorator = getFieldDecorator(activityFieldName, {
            initialValue: activityList.length > 0
                ? `${activeid}_${starttime}_${endtime}_${activityList[0].status}_${activename}`
                : undefined,
            onChange: onListChange,
            rules: [
                {
                    required: true,
                    message: '请选择活动'
                }
            ]
        });
        const rangeConfig = {
            initialValue: activityList.length > 0 && starttime != ''
                ? [
                    moment(starttime, 'YYYYMMDD'),
                    moment(endtime, 'YYYYMMDD')
                ]
                : undefined,
            onChange: onDateChange,
            rules: [
                {
                    type: 'array',
                    required: true,
                    message: '请选择时间'
                }
            ]
        };
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

                                {generateOptionsByTime(activityList, 'activeid', 'starttime', 'endtime', 'status', 'name')}
                            </Select>
                        )}
                    </FormItem>
                </Col>
                <Col span={2} offset={1} style={{
                    lineHeight: '20px'
                }}>数据时间:</Col>
                <Col span={6} style={{
                    marginTop: '-5px'
                }}>
                    <FormItem>
                        {getFieldDecorator('dateTime', rangeConfig)(<RangePicker disabledDate={:: this.disabledDate} ranges={{
                            Today: [
                                moment(), moment()
                            ],
                            'This Month': [moment(), moment().endOf('month')]
                        }} size="small" allowClear={false}/>)}
                    </FormItem>
                </Col>
            </div>
        );
    }
}
