import React, {PropTypes} from 'react';
import {Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataReportsActionCreators from 'redux/modules/dataReports';
import * as chartsproductActionCreators from 'redux/modules/chartsproduct';
import { ChartsproductOne, ChartsproductTwo } from 'components/admin/DataReports/Charts'
import * as styles from 'components/admin/DataReports/styles.css';


@connect(({dataReports, chartsproduct}) => ({
    getdate: chartsproduct.getdate,
    getdateactivity:chartsproduct.getdateactivity,
    numIn: dataReports.numIn,
    activeid: dataReports.activeid
}), dispatch => bindActionCreators({...dataReportsActionCreators,...chartsproductActionCreators}, dispatch))


export default class ProductContainer extends React.Component {
    static propTypes = {

    }

    isEmptyObject(obj) { //判断是否为一个空对象

        for (var key in obj) {
            return false
        };
        return true
    };
    
    componentDidMount(){
        const {numIn, activeid} = this.props;
        if (numIn) {
            this.props.datelist(activeid);
            this.props.datelistactivity(activeid);
        }
    }

    componentWillReceiveProps(nextProps){
        const {activeid, numIn, setNumIn} = nextProps;
        if (activeid != '' && !numIn) {
            setNumIn(true);
            this.props.datelist(activeid);
            this.props.datelistactivity(activeid);
        }

    }

    handleChange(value){
        const {activeid} = this.props;
        var orderColumnName;
        if(value=='核销率'){
            orderColumnName='hql'
        }else if(value=='领券数'){
            orderColumnName='lq_num'
        }else if(value=='核券数'){
            orderColumnName='hq_num'
        }
        this.props.datelistactivity(activeid,orderColumnName);
    }


    render() {
        
        const {getdate, getdateactivity} = this.props;
        
        return (
            <div className={styles.mainContainer}>
                <div className={styles.commonTit}><p><span></span>券种活动效果分析</p></div>
                {
                    getdateactivity.length ?
                        <ChartsproductOne getdateactivity={getdateactivity} handleChange={:: this.handleChange}/>
                        : 
                        <p style={{
                              width: '100%',
                              height: '350px',
                              lineHeight: '350px',
                              textAlign: 'center'
                          }}><Icon type="frown-o"/>暂无数据</p>
                }
                
                <div className={styles.commonTit}><p><span></span>券种活动效果与门店类型分析</p></div>
                
                {
                    !this.isEmptyObject(getdate) ?
                        <ChartsproductTwo getdate={getdate}/>
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


