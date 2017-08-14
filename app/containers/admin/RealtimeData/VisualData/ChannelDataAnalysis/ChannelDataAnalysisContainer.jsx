import React, {PropTypes} from 'react';
import {Row, Col, Spin, Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as visualdataActionCreators from 'redux/modules/visualdata';
import * as styles from 'components/admin/RealtimeData/VisualData/styles.css';
import {realDataApi} from 'api';
import {UsePieChart, GetPieChart, UseChart, GetChart} from 'components/admin/RealtimeData/VisualData/ChannelDataAnalysisInfo';

@connect(({visualdata}) => ({
    channelGet: visualdata.channelGet,
    channelUse: visualdata.channelUse,
    activeid: visualdata.activeid,
    starttime: visualdata.starttime,
    endtime: visualdata.endtime,
    isloading: visualdata.isloading,
    numIn : visualdata.numIn
}), dispatch => bindActionCreators(visualdataActionCreators, dispatch))

export default class ChannelDataAnalysisContainer extends React.Component {
    static propTypes = {
        activeid: PropTypes.string.isRequired
    }

    componentDidMount() {
        const {numIn}=this.props;
        if (numIn) {
            const {activeid, starttime, endtime} = this.props;
            const queryType = {
                activeid,
                starttime,
                endtime
            };
            this.props.handleAllChannel(queryType, 'GET');
            this.props.handleAllChannel(queryType, 'USE');
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
            this.props.handleAllChannel(queryType, 'GET');
            this.props.handleAllChannel(queryType, 'USE');
        }
    }

    render() {

        const {channelGet, channelUse, isloading} = this.props;
        return (
            <Spin spinning={isloading}>

                <p className={styles.modelTitle}>渠道汇总数据</p>

                <Row>
                    <Col span={11} offset={1}>
                        <p style={{
                            marginTop: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>领券数据</p>

                        {channelGet
                            ?
                            <GetPieChart dataSource={channelGet}/>
                            : <p style={{
                                width: '100%',
                                height: '200px',
                                lineHeight: '200px',
                                textAlign: 'center'
                            }}><Icon type="frown-o"/>暂无数据</p>}
                        {channelGet
                            ?
                            <GetChart dataSource={channelGet}/>
                            : null}

                    </Col>
                    <Col span={11} offset={1}>
                        <p style={{
                            marginTop: '20px',
                            fontSize: '16px',
                            fontWeight: 'bold'
                        }}>核券数据</p>
                        {channelUse
                            ?
                              <UsePieChart dataSource={channelUse}/>
                            : <p style={{
                                width: '100%',
                                height: '200px',
                                lineHeight: '200px',
                                textAlign: 'center'
                            }}><Icon type="frown-o"/>暂无数据</p>}
                        {channelUse
                            ?
                              <UseChart dataSource={channelUse}/>
                            : null}
                    </Col>
                </Row>
            </Spin>
        );
    }
}
