import React, {PropTypes} from 'react';
import {Form, Row} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataReportsActionCreators from 'redux/modules/dataReports';
import {realDataApi} from 'api';
import * as styles from 'components/admin/DataReports/styles.css';

import {ActivitySelection, SubAndRestBtns} from 'components/admin/DataReports';

@connect(({dataReports}) => ({
    start:dataReports.start,
    end:dataReports.end,
    activeid: dataReports.activeid,
    activityList: dataReports.activityList}), dispatch => bindActionCreators(dataReportsActionCreators, dispatch))

@Form.create()

export default class ActivitySelectionContainer extends React.Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
        activityList: PropTypes.array.isRequired
    }

    async componentDidMount() {
        const { activityList } = this.props;
        if (activityList.length === 0) {
            const activityList = await this.props.handleFetchActivityList();
        } 
    }

    handleSelectChange(v) {
      const {form, setActivityId} = this.props;
      let activeid = v;
      setActivityId(activeid);
      form.resetFields();
    }

    restFormClick() {
        const {form} = this.props;
        form.resetFields();
    }

    handleSubmit() {
        const {activeid, start, end,form} = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            this.props.handleFetchProvince(activeid);
            this.props.handleFetchTotalPie(activeid);
            this.props.handleFetchMarketsPie(activeid);
            this.props.handleFetchAvgPie(activeid);
            this.props.handleFetchMarketsPay(activeid,start,end);
            this.props.handleSetCityArr(activeid,0);
            this.props.setSelectName('')

        })

    }

    render() {
        const {form, activityList, activeid, activityFieldName} = this.props;

        return (
            <div>
                <div className={styles.dateSelecter}>
                    <Form>
                        <Row>
                            <ActivitySelection form={form} activityList={activityList} activeid={activeid} activityFieldName={activityFieldName} onListChange={:: this.handleSelectChange} />
                            <SubAndRestBtns onSubBtnClick={:: this.handleSubmit} onRestBtnClick={:: this.restFormClick}/>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}
