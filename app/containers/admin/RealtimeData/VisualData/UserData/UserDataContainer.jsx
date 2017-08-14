import React, {PropTypes} from 'react';
import {Row, Col, Spin} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as visualdataActionCreators from 'redux/modules/visualdata';
import * as styles from 'components/admin/RealtimeData/VisualData/styles.css';
import {realDataApi} from 'api';

import {SummaryData, GetChart, UseChart, UsePieChart, GetPieChart} from 'components/admin/RealtimeData/VisualData/UserDataInfo';

@connect(({visualdata}) => ({
    sumData: visualdata.sumData,
    sumDataGet: visualdata.sumDataGet,
    sumDataUse: visualdata.sumDataUse,
    useData: visualdata.useData,
    getData: visualdata.getData,
    activeid: visualdata.activeid,
    starttime: visualdata.starttime,
    endtime: visualdata.endtime,
    isloading: visualdata.isloading,
    numIn: visualdata.numIn,
}), dispatch => bindActionCreators(visualdataActionCreators, dispatch))

export default class UserDataContainer extends React.Component {
    static propTypes = {
        activeid: PropTypes.string.isRequired
    }

    componentDidMount() {
        const {numIn} = this.props;
        if (numIn) {
            const {activeid, starttime, endtime} = this.props;
            const queryType = {
                activeid,
                starttime,
                endtime
            };
            this.props.handleAllUserData(queryType, 'GET');
            this.props.handleAllUserData(queryType, 'USE');
        }

    }

    componentWillReceiveProps(nextProps) {
        const {activeid, starttime, endtime,numIn,setNumIn} = nextProps;
        if (activeid != '' && starttime != '' && endtime != '' && !numIn) {
            setNumIn(true)
            const queryType = {
                activeid,
                starttime,
                endtime
            };
            this.props.handleAllUserData(queryType, 'GET');
            this.props.handleAllUserData(queryType, 'USE');
        }
    }

    render() {

        const {
            sumData,
            sumDataGet,
            sumDataUse,
            useData,
            getData,
            isloading
        } = this.props;
        return (
            <Spin spinning={isloading}>
                <SummaryData dataSource={sumData}/>

                <p className={styles.modelTitle}>领核券汇总</p>

                <Row>
                    <Col span={11} offset={1}>
                        <p style={{
                            marginTop: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>领券数汇总</p>


                        <GetChart dataSource={getData}/>
                    </Col>
                    <Col span={11} offset={1}>
                        <p style={{
                            marginTop: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>核券数汇总</p>

                        <UseChart dataSource={useData}/>
                    </Col>

                    <Col span={11} offset={1}>
                        <p style={{
                            marginTop: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>领券数汇总</p>


                        <GetPieChart dataSource={getData}/>
                    </Col>
                    <Col span={11} offset={1}>
                        <p style={{
                            marginTop: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>核券数汇总</p>


                        <UsePieChart dataSource={useData}/>
                    </Col>
                </Row>
            </Spin>
        );
    }
}
