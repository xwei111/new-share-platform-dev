import React, {PropTypes} from 'react';
import {Row, Col, Spin, Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as visualdataActionCreators from 'redux/modules/visualdata';
import * as styles from 'components/admin/RealtimeData/VisualData/styles.css';
import {realDataApi} from 'api';
import {SummaryData, UsePieChart, GetPieChart} from 'components/admin/RealtimeData/VisualData/CategoryDataInfo';

@connect(({visualdata}) => ({
    topData: visualdata.topData,
    useCate: visualdata.useCate,
    getCate: visualdata.getCate,
    activeid: visualdata.activeid,
    starttime: visualdata.starttime,
    endtime: visualdata.endtime,
    isloading: visualdata.isloading,
    numIn: visualdata.numIn
}), dispatch => bindActionCreators(visualdataActionCreators, dispatch))

export default class CategoryDataContainer extends React.Component {
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
            this.props.handleAllCate(queryType, 'GET');
            this.props.handleAllCate(queryType, 'USE');
        }
    }

    componentWillReceiveProps(nextProps) {
        const {activeid, starttime, endtime,numIn,setNumIn} = nextProps;
        if (activeid != '' && starttime != '' && endtime != '' && !numIn) {
            setNumIn(true);
            const queryType = {
                activeid,
                starttime,
                endtime
            };
            this.props.handleAllCate(queryType, 'GET');
            this.props.handleAllCate(queryType, 'USE');
        }
    }

    render() {

        const {topData, useCate, getCate, isloading} = this.props;
        return (
            <Spin spinning={isloading}>
                <SummaryData dataSource={topData}/>
                <p className={styles.modelTitle}>领核券汇总</p>
                <Row>
                    <Col span={11} offset={1}>
                        <p style={{
                            marginTop: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>领券数汇总</p>
                        {getCate
                            ? <GetPieChart dataSource={getCate}/>
                            : <p style={{
                                width: '100%',
                                height: '200px',
                                lineHeight: '200px',
                                textAlign: 'center'
                            }}><Icon type="frown-o"/>暂无数据</p>}
                    </Col>
                    <Col span={11} offset={1}>
                        <p style={{
                            marginTop: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>核券数汇总</p>
                        {useCate
                            ? <UsePieChart dataSource={useCate}/>
                            : <p style={{
                                width: '100%',
                                height: '200px',
                                lineHeight: '200px',
                                textAlign: 'center'
                            }}><Icon type="frown-o"/>暂无数据</p>}
                    </Col>
                </Row>
            </Spin>
        );
    }
}
