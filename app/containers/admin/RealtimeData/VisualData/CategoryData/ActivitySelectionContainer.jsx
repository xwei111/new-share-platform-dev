import React, {PropTypes} from 'react';
import {Form, Row} from 'antd';
import * as styles from 'components/admin/RealtimeData/TotalData/styles.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as visualdataActionCreators from 'redux/modules/visualdata';
import {realDataApi} from 'api';

import {ActivitySelection, SubAndRestBtns} from 'components/admin/RealtimeData/VisualData';

@connect(({visualdata}) => ({
    activeid: visualdata.activeid,
    activename: visualdata.activename,
    activityList: visualdata.activityList,
    starttime: visualdata.starttime,
    endtime: visualdata.endtime
}), dispatch => bindActionCreators(visualdataActionCreators, dispatch))

@Form.create()

export default class ActivitySelectionContainer extends React.Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
        activityList: PropTypes.array.isRequired
    }

    state = {
        start: '',
        end: ''
    }

    async componentDidMount() {
        const { activityList, starttime, endtime } = this.props;
        if (activityList.length === 0) {
            const activityList = await this.props.handleFetchActivityList();
            this.setState({start: activityList[0].starttime, end: activityList[0].endtime});
        } else {
            this.setState({start: starttime, end: endtime});
        }
    }

    handleSelectChange(v) {
      const {form, setStartTime, setEndTime, setActivityId, setActiveName} = this.props;
      let activeid = v.split('_')[0];
      let starttime = v.split('_')[1];
      let endtime = v.split('_')[2];
      let status = v.split('_')[3];
      let _name = v.split('_')[4];
      setActivityId(activeid);
      setActiveName(_name);
      setStartTime(starttime);
      setEndTime(endtime);
      this.setState({start: starttime, end: endtime});
      form.resetFields();
    }

    handleDateChange(a, b) {
        const {setStartTime, setEndTime} = this.props;
        setStartTime(b[0]);
        setEndTime(b[1]);
    }

    restFormClick() {
        const {form} = this.props;
        form.resetFields();
    }

    handleSubmit() {
        const {activeid, starttime, endtime, form} = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            const queryType = {
                activeid,
                starttime,
                endtime
            };
            this.props.handleAllCate(queryType, 'GET');
            this.props.handleAllCate(queryType, 'USE');
        })
    }

    render() {
        const {form, activityList, activeid, activename, starttime, endtime, activityFieldName} = this.props;
        const {start, end} = this.state;
        return (
            <div>
                <div className={styles.dateSelecter}>
                    <Form>
                        <Row>
                            <ActivitySelection form={form} activityList={activityList} activeid={activeid} activename={activename} activityFieldName={activityFieldName} starttime={starttime} endtime={endtime} onListChange={:: this.handleSelectChange} onDateChange={:: this.handleDateChange} startTime={start} endTime={end}/>
                            <SubAndRestBtns onSubBtnClick={:: this.handleSubmit} onRestBtnClick={:: this.restFormClick}/>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}
