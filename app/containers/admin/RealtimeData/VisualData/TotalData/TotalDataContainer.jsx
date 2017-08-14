import React, {PropTypes} from 'react';
import {Row, Col, Spin} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as visualdataActionCreators from 'redux/modules/visualdata';
import * as styles from 'components/admin/RealtimeData/VisualData/styles.css';
import {realDataApi} from 'api';

import {SummaryData, TrendCharts, DataFunnel, ViewTop} from 'components/admin/RealtimeData/VisualData/TotalDataInfo';

@connect(({visualdata}) => ({
    totalData: visualdata.totalData,
    trendData: visualdata.trendData,
    dataFunnel: visualdata.dataFunnel,
    viewTopData: visualdata.viewTopData,
    activeid: visualdata.activeid,
    activename: visualdata.activename,
    starttime: visualdata.starttime,
    endtime: visualdata.endtime,
    isloading: visualdata.isloading,
    numIn: visualdata.numIn,
    trendKey: visualdata.trendKey,
}), dispatch => bindActionCreators(visualdataActionCreators, dispatch))

export default class TotalDataContainer extends React.Component {
    static propTypes = {
        activeid: PropTypes.string.isRequired
    }

    componentDidMount() {
        const {numIn} = this.props;
        if (numIn) {
            const {activeid, activename, starttime, endtime,trendKey} = this.props;
            const queryType = {
                activeid,
                activename,
                starttime,
                endtime
            };
            const otherQuery = {
                type: trendKey,
                dataformat: 'day'
            }
            this.props.handleTotalData(queryType, otherQuery);
        }

    }

    componentWillReceiveProps(nextProps) {
        const {activeid, activename, starttime, endtime,numIn,setNumIn,trendKey} = nextProps;
        if (activeid != '' && starttime != '' && endtime != '' && !numIn) {
            setNumIn(true);
            const queryType = {
                activeid,
                activename,
                starttime,
                endtime
            };
            const otherQuery = {
                type: trendKey,
                dataformat: 'day'
            }
            this.props.handleTotalData(queryType,otherQuery);
        }
    }

    tabCallBack(key) {
        const { setTrendKay } = this.props;
        setTrendKay(key);
    }

    render() {

        const {
            totalData,
            trendData,
            dataFunnel,
            viewTopData,
            activeid,
            starttime,
            endtime,
            isloading,
            trendKey
        } = this.props;
        const queryType = { activeid, starttime, endtime };

        return (
            <Spin spinning={isloading}>
                <SummaryData dataSource={totalData}/>
                <TrendCharts dataSource={trendData} chartsVal={queryType} trendKey={trendKey} tabCallBack={:: this.tabCallBack}/>
                <DataFunnel dataSource={dataFunnel}/>
                <ViewTop dataSource={viewTopData}/>
            </Spin>
        );
    }
}
