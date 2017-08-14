import React, {PropTypes} from 'react';
import {Row, Col, Spin, Icon} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as fansReportsActionCreators from 'redux/modules/fansReports';
import { FansNumberChart} from 'components/admin/FansReports/Charts'
import {FansOverData} from 'components/admin/FansReports'
import styles from 'components/admin/FansReports/styles.css';

@connect(({fansReports}) => ({
    getFansNumber:fansReports.getFansNumber,
}), dispatch => bindActionCreators(fansReportsActionCreators, dispatch))

export default class FansContainer extends React.Component {

    isEmptyObject(obj) { //判断是否为一个空对象

        for (var key in obj) {
            return false
        };
        return true
    };

    componentDidMount() {
        this.props.dataFansNumber('20170417001');
    }

    render() {

        const {getFansNumber} = this.props;
        if(this.props.getFansNumber&&this.props.getFansNumber.actives){
            var datasrc=getFansNumber;
            var totalFans=datasrc.totalFans;
            var hqNum=datasrc.hqNum;
        }
        
        return (
            <div className={styles.mainContainer}>

                <div className={styles.commonTit}><p><span></span>粉丝数据总览</p></div>
                
                <FansOverData totalFans={totalFans} hqNum={hqNum} />

                <div className={styles.commonTit}><p><span></span>粉丝等级分布</p></div>
                {
                    !this.isEmptyObject(datasrc) ?
                        <FansNumberChart dataSource={datasrc.actives} />
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
