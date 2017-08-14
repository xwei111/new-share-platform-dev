import React, {PropTypes} from 'react';
import {Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataReportsActionCreators from 'redux/modules/dataReports';
import * as shopperProtraitActionCreators from 'redux/modules/shopperProtrait';
import { FansNumberChart,ShopperProtraitChartOne,ShopperProtraitChartTwo,ShopperProtraitChartThree} from 'components/admin/DataReports/Charts'

import styles from 'components/admin/DataReports/styles.css';
@connect(({dataReports,shopperProtrait}) => ({
    getdata:shopperProtrait.getdata,
    getFansNumber:shopperProtrait.getFansNumber,
    numIn: dataReports.numIn,
    activeid: dataReports.activeid
}), dispatch => bindActionCreators({...dataReportsActionCreators,...shopperProtraitActionCreators}, dispatch))

export default class ShopperContainer extends React.Component {
    static propTypes = {}

    isEmptyObject(obj) { //判断是否为一个空对象

        for (var key in obj) {
            return false
        };
        return true
    };

    componentDidMount() {
        const {numIn, activeid} = this.props;
        if (numIn) {
            this.props.dataConsump(activeid);
            this.props.dataFansNumber(activeid);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {activeid, numIn, setNumIn} = nextProps;
        if (activeid != '' && !numIn) {
            setNumIn(true);
            this.props.dataConsump(activeid);
            this.props.dataFansNumber(activeid);
        }
    }

    render() {

        const {getdata, getFansNumber} = this.props;
        
        return (
            <div className={styles.mainContainer}>
                <div className={styles.commonTit}><p><span></span>粉丝累计数量概览</p></div>
                {
                    !this.isEmptyObject(getFansNumber) ?
                        <FansNumberChart dataSource={getFansNumber} />
                        : 
                        <p style={{
                              width: '100%',
                              height: '350px',
                              lineHeight: '350px',
                              textAlign: 'center'
                          }}><Icon type="frown-o"/>暂无数据</p>
                }
                    
                
                <div className={styles.commonTit}><p><span></span>各级别粉丝消费能力</p></div>
                {
                    !this.isEmptyObject(getdata) ? 
                        <div>
                            <ShopperProtraitChartOne dataSource={getdata.totalfee} />
                            <ShopperProtraitChartTwo dataSource={getdata.avgfee} />
                            <ShopperProtraitChartThree dataSource={getdata.totaltimes} />
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
