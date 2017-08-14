import React, {PropTypes} from 'react';
import {Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataReportsActionCreators from 'redux/modules/dataReports';
import * as styles from 'components/admin/DataReports/styles.css';
import { ChannelExcel } from 'components/admin/DataReports/Charts';
import { VerificationTime } from 'components/admin/DataReports/VerificationTime'


@connect(({dataReports}) => ({
    activeid: dataReports.activeid,
    channeldata: dataReports.channeldata,
    getActiveMarketTimeAll:dataReports.getActiveMarketTimeAll,
    getActiveMarketTimeWorkday:dataReports.getActiveMarketTimeWorkday,
    getActiveMarketTimeWeekend:dataReports.getActiveMarketTimeWeekend,
    loadingTime:dataReports.loadingTime,
    loadingWeek:dataReports.loadingWeek,
    amount:dataReports.amount,
    num:dataReports.num,
    numIn: dataReports.numIn
}), dispatch => bindActionCreators(dataReportsActionCreators, dispatch))

export default class TicketUsageContainer extends React.Component {
    static propTypes = {

    }
    
    state = {
        show:'down',
        showTable:'none',
        showWeek:'down',
        showTableWeek:'none',
    }
    
    isEmptyObject(obj) { //判断是否为一个空对象

        for (var key in obj) {
            return false
        };
        return true
    };


    componentDidMount() {
        const { handleGetActiveMarketTime, handleGetActiveMarketTimeWeek, handleFetchChannelData, numIn } = this.props;
        
        if (numIn) {
            const {activeid} = this.props;
            
            handleGetActiveMarketTime(activeid);
            handleGetActiveMarketTimeWeek(activeid);
            handleFetchChannelData(activeid);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {activeid,numIn, setNumIn} = nextProps;
        if (activeid != '' && !numIn) {
            setNumIn(true);
            this.props.handleGetActiveMarketTime(activeid);
            this.props.handleGetActiveMarketTimeWeek(activeid);
            this.props.handleFetchChannelData(activeid);
        }
    }

    
    handlelLookDetail(){
        const { show, showTable } = this.state;
        this.setState({
            show:'up',
            showTable:'block',
        })
        if (show=='up') {
            this.setState({
                show:'down',
                showTable:'none',
            })
        }
    }
    handlelLookDetailWeek(){
        const { showWeek, showTableWeek } = this.state;
        this.setState({
            showWeek:'up',
            showTableWeek:'block',
        })
        if (showWeek=='up') {
            this.setState({
                showWeek:'down',
                showTableWeek:'none',
            })
        }
    }

    render() {

        const { channeldata, getActiveMarketTimeAll, getActiveMarketTimeWorkday, getActiveMarketTimeWeekend, loadingTime, loadingWeek, amount, num, activeid } = this.props;
        const { show, showTable, showWeek, showTableWeek } = this.state;

        return (
            <div className={styles.mainContainer}>
                                
                {
                    this.isEmptyObject(getActiveMarketTimeAll) ? 
                        
                        <p style={{
                              width: '100%',
                              height: '350px',
                              lineHeight: '350px',
                              textAlign: 'center'
                          }}><Icon type="frown-o"/>暂无数据</p>
                        :
                        <VerificationTime
                            lookDetail={::this.handlelLookDetail}
                            show={show}
                            showTable={showTable}
                            lookDetailWeek={::this.handlelLookDetailWeek}
                            showWeek={showWeek}
                            showTableWeek={showTableWeek}
                            getActiveMarketTimeAll={getActiveMarketTimeAll}
                            getActiveMarketTimeWorkday={getActiveMarketTimeWorkday}
                            getActiveMarketTimeWeekend={getActiveMarketTimeWeekend}
                            loadingTime={loadingTime}
                            loadingWeek={loadingWeek}
                            amount={amount}
                            num={num}
                        />
                }
                
                
                <div className={styles.commonTit}><p><span></span>购物动线效果评估</p></div>
                {
                    channeldata.length ? 
                        <ChannelExcel channeldata={channeldata}/>
                        :
                        <p style={{
                              width: '100%',
                              height: '350px',
                              lineHeight: '350px',
                              textAlign: 'center'
                          }}><Icon type="frown-o"/>暂无数据</p>
                }
                
            </div>
        );
    }
}
