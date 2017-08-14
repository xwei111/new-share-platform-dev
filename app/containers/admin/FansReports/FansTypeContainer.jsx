import React, {PropTypes} from 'react';
import {Row, Col, Spin, Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fansReportsActionCreators from 'redux/modules/fansReports';
import * as styles from 'components/admin/FansReports/styles.css';
import { PieChartsTotal, PieChartsMarkets, PieChartsAvg, AreasMapChart, AreasHistogramChart } from 'components/admin/FansReports/Charts';
import { MapOfMarkets } from 'components/admin/FansReports';

import { fansReportsApi } from 'api';


@connect(({fansReports}) => ({
    totalpie: fansReports.totalpie,
    provinceArr: fansReports.provinceArr,
    cityname: fansReports.cityname,
    cityArr: fansReports.cityArr,
    marketArr: fansReports.marketArr,
    visible: fansReports.visible,
    selectName: fansReports.selectName,

}), dispatch => bindActionCreators(fansReportsActionCreators, dispatch))

export default class FansTypeContainer extends React.Component {
    static propTypes = {

    }

    componentDidMount() {
        const { handleFetchProvince,handleFetchTotalPie } = this.props;
        handleFetchProvince();
        handleFetchTotalPie();
    }
    
    handleFetchCityArr(cityname) {
        const { handleSetCityArr } = this.props;
        handleSetCityArr(cityname);
    }
    
    handleFetchMarketArr(cityname) {
        const { handleSetMarketArr } = this.props;
        handleSetMarketArr(cityname);
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

    render() {

        const { totalpie, provinceArr, cityname, cityArr, marketArr, selectName, channeldata, visible, setCityName } = this.props;

        
        if(totalpie.length){
            for(var i=0;i<totalpie.length;i++){
                if(totalpie[i].market_type=="商圈"){
                    var shangData=totalpie[i];
                    var shangallData=shangData.potential_Totalfans+shangData.junior_Totalfans+shangData.intermediate_Totalfans+shangData.loyal_Totalfans
                }
                if(totalpie[i].market_type=="学校"){
                    var schoolData=totalpie[i];
                    var scoolallData=schoolData.potential_Totalfans+schoolData.junior_Totalfans+schoolData.intermediate_Totalfans+schoolData.loyal_Totalfans
                }
                if(totalpie[i].market_type=="社区"){
                    var socityData=totalpie[i];
                    var socityallData=socityData.potential_Totalfans+socityData.junior_Totalfans+socityData.intermediate_Totalfans+socityData.loyal_Totalfans
                }
            }
        }

        return (
            <div className={styles.mainContainer}>
                <div className={styles.commonTit}><p><span></span>门店核销效果明细展示</p></div>
                
                <div style={{overflow: 'hidden'}}>
                    {provinceArr.length ? 
                        <div>
                            <AreasMapChart provinceArr={provinceArr} onHandleOpen={:: this.onHandleOpen}/>
                            <AreasHistogramChart provinceArr={provinceArr}/>
                            <MapOfMarkets visible={visible} selectName={selectName} cityname={cityname} cityArr={cityArr} marketArr={marketArr} onHandleClose={:: this.onHandleClose} handleFetchCityArr={:: this.handleFetchCityArr} handleFetchMarketArr={:: this.handleFetchMarketArr} setSelectName={:: this.props.setSelectName} setCityName={setCityName}/>
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
                
                <div className={styles.commonTit}><p><span></span>门店类型差异和核销效果分析</p></div>
                {
                    totalpie.length ? 
                        <div>
                            
                                <div className={styles.bigBox}>
                                    <h3>商圈</h3>
                                    <p className={styles.fansNum}>{shangallData}粉丝</p>
                                    <PieChartsTotal
                                        data={shangData}
                                    />

                                </div>

                                <div className={styles.bigBox}>
                                    <h3>社区</h3>
                                    <p className={styles.fansNum}>{socityallData}粉丝</p>
                                    <PieChartsMarkets
                                        data={socityData}
                                    />
                                </div>
                                <div className={styles.bigBox}>
                                    <h3>学校</h3>
                                    <p className={styles.fansNum}>{scoolallData}粉丝</p>
                                    <PieChartsAvg
                                        data={schoolData}
                                    />
                                </div>
           
                            
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
        );
    }
}
