import React, {PropTypes} from 'react';
import {Row, Col, Icon, Button} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataReportsActionCreators from 'redux/modules/dataReports';
import * as styles from 'components/admin/DataReports/styles.css';
import { PieChartsTotal, PieChartsMarkets, PieChartsAvg, AreasMapChart, AreasHistogramChart, MarketPayChart, MarketsExcel } from 'components/admin/DataReports/Charts';
import { MapOfMarkets } from 'components/admin/DataReports';

const ButtonGroup = Button.Group;

@connect(({dataReports}) => ({

    activeid: dataReports.activeid,
    totalpie: dataReports.totalpie,
    marketspie: dataReports.marketspie,
    avgpie: dataReports.avgpie,
    provinceArr: dataReports.provinceArr,
    cityname: dataReports.cityname,
    cityArr: dataReports.cityArr,
    marketArr: dataReports.marketArr,
    marketspay: dataReports.marketspay,
    visible: dataReports.visible,
    selectName: dataReports.selectName,
    start:dataReports.start,
    end:dataReports.end,
    numIn: dataReports.numIn

}), dispatch => bindActionCreators(dataReportsActionCreators, dispatch))

export default class ChannelContainer extends React.Component {
    static propTypes = {

    }
    
    state = {
        plotCfg: {
          margin: [20, 80, 80, 100],
        },
        show:'down',
        showMarkets:'none',
        key: 0
    }
    
    isEmptyObject(obj) { //判断是否为一个空对象

        for (var key in obj) {
            return false
        };
        return true
    };


    componentDidMount() {
        const { start, end, handleFetchProvince, handleFetchTotalPie, handleFetchMarketsPie, handleFetchAvgPie, handleFetchMarketsPay, numIn } = this.props;
        
        if (numIn) {
            const {activeid, start, end} = this.props;
            
            handleFetchProvince(activeid);
            handleFetchTotalPie(activeid);
            handleFetchMarketsPie(activeid);
            handleFetchAvgPie(activeid);
            handleFetchMarketsPay(activeid,start,end);
        }
    }
    
    handleFetchCityArr(cityname) {
        const { handleSetCityArr, activeid } = this.props;
        handleSetCityArr(activeid,cityname);
    }
    
    handleFetchMarketArr(cityname) {
        const { handleSetMarketArr, activeid } = this.props;
        handleSetMarketArr(activeid,cityname);
    }

    componentWillReceiveProps(nextProps) {
        const {activeid,numIn, start, end, setNumIn} = nextProps;
        if (activeid != '' && !numIn) {
            setNumIn(true);
            this.props.handleFetchProvince(activeid);
            this.props.handleFetchTotalPie(activeid);
            this.props.handleFetchMarketsPie(activeid);
            this.props.handleFetchAvgPie(activeid);
            this.props.handleFetchMarketsPay(activeid,start,end);
        }
    }
    
    onHandleOpen(cityname) {
        const { setVisible, setCityName } = this.props;
        setVisible(true);
        setCityName(cityname)
    }
    
    onHandleClose() {
        const { setVisible } = this.props;
        setVisible(false);
    }
    
    handlelLookDetailMarkets(){
        const { show, showMarkets } = this.state;
        this.setState({
            show:'up',
            showMarkets:'block',
        })
        if (show=='up') {
            this.setState({
                show:'down',
                showMarkets:'none',
            })
        }
    }
    
    onClickButton(m,n) {
        const { setLimit, handleFetchMarketsPay, activeid } = this.props;
        this.setState({key: m});
        const start = n.split('-')[0];
        const end = n.split('-')[1];
        setLimit(start,end);
        handleFetchMarketsPay(activeid,start, end);
    }

    render() {

        const { totalpie, marketspie, avgpie, provinceArr, cityname, cityArr, marketArr, selectName, channeldata, marketspay, visible, getActiveMarketTimeAll, getActiveMarketTimeWorkday, getActiveMarketTimeWeekend, setCityName, loadingTime, loadingWeek, amount, num, activeid } = this.props;
        const { show, showMarkets, key } = this.state;

        return (
            <div className={styles.mainContainer}>
                <div className={styles.commonTit}><p><span></span>各地区活动效果分析</p></div>
                
                <div style={{overflow: 'hidden'}}>
                    {provinceArr.length ? 
                        <div>
                            <AreasMapChart provinceArr={provinceArr} onHandleOpen={:: this.onHandleOpen}/>
                            <AreasHistogramChart provinceArr={provinceArr}/>
                            <MapOfMarkets visible={visible} selectName={selectName} cityname={cityname} cityArr={cityArr} marketArr={marketArr} onHandleClose={:: this.onHandleClose} handleFetchCityArr={:: this.handleFetchCityArr} handleFetchMarketArr={:: this.handleFetchMarketArr} setSelectName={:: this.props.setSelectName} setCityName={setCityName} activeid={activeid}/>
                        </div>
                        :
                        <p style={{
                              width: '100%',
                              height: '350px',
                              lineHeight: '350px',
                              textAlign: 'center'
                          }}><Icon type="frown-o"/>暂无数据</p>
                    }
                    
                </div>
                
                <div className={styles.commonTit}><p><span></span>各门店类型活动效果分析</p></div>
                {
                    totalpie.length ? 
                        <div>
                            <p className={styles.lookDetail} onClick={:: this.handlelLookDetailMarkets}>查看数据详情<Icon type={show} /></p>
                            <Row>
                                <Col span={12} offset={6}>
                                    <PieChartsTotal
                                        data={totalpie}
                                    />
                                    <p style={{textAlign:'center', fontSize: '14px', marginBottom: '20px'}}>核销总量</p>
                                </Col>

                                <Col span={12}>
                                    <PieChartsMarkets
                                        data={marketspie}
                                    />
                                    <p style={{textAlign:'center', fontSize: '14px', marginBottom: '20px'}}>店均核销</p>
                                </Col>
                                <Col span={12}>
                                    <PieChartsAvg
                                        data={avgpie}
                                    />
                                    <p style={{textAlign:'center', fontSize: '14px', marginBottom: '20px'}}>客单价</p>
                                </Col>
           
                            </Row>
                            
                            <MarketsExcel totalpie={totalpie} marketspie={marketspie} avgpie={avgpie} showMarkets={showMarkets}/>
                        </div>
                        : 
                        <p style={{
                              width: '100%',
                              height: '350px',
                              lineHeight: '350px',
                              textAlign: 'center'
                          }}><Icon type="frown-o"/>暂无数据</p>
                }
                
                
                <div className={styles.commonTit}><p><span></span>门店消费能力与活动效果评估</p></div>
                <p style={{textAlign: 'center',marginBottom: '10px'}}>选择门店范围<span style={{color: '#CCC'}}>(按评级排名)</span></p>
                <ButtonGroup style={{display: 'block',textAlign: 'center',marginBottom: '20px'}}>
                    <Button style={key == 0 ? {background: '#2DB7F5',color: '#FFF'} : null} onClick={m => {this.onClickButton('0','1-50')}}>1~50名</Button>
                    <Button style={key == 1 ? {background: '#2DB7F5',color: '#FFF'} : null} onClick={m => {this.onClickButton('1','51-100')}}>51~100名</Button>
                    <Button style={key == 2 ? {background: '#2DB7F5',color: '#FFF'} : null} onClick={m => {this.onClickButton('2','101-150')}}>101~150名</Button>
                </ButtonGroup>
                {
                    marketspay.length ?
                        <MarketPayChart
                            data={marketspay}
                            width={800}
                            height={500}
                            plotCfg={this.state.plotCfg}
                            setLimit={:: this.props.setLimit}
                            handleFetchMarketsPay={:: this.props.handleFetchMarketsPay}
                            activeid={activeid}
                        />
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
