import React, {PropTypes} from 'react';
import {Form, Row} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as monitorActionCreators from 'redux/modules/monitor';
import * as styles from 'components/admin/Monitor/style.css';

import {ActivitySelection, SubAndRestBtns} from 'components/admin/Monitor';

@connect(({monitor}) => ({
    activeid: monitor.activeid,
    activityList: monitor.activityList}), dispatch => bindActionCreators(monitorActionCreators, dispatch))

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
        const {activeid, form} = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            this.props.datacodelist(activeid);
            this.props.datacodelistData(activeid);
            this.props.datacodelistDoor(activeid);
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
