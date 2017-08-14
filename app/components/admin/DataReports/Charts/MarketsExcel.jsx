import React, {PropTypes, Component} from 'react';
import {Row, Col, Spin} from 'antd';
import * as styles from './styles.css';
import classnames from 'classnames';
// 基于准备好的dom，初始化echarts实例

export default class MarketsExcel extends Component {

    static defaultProps = {
        
    }


    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }
    
    Persion(marketType,value){
      this.marketType=marketType;
      this.value=value;
    }

    render() {

        const { totalpie, marketspie, avgpie, showMarkets } = this.props;
        
        const _a =[]; 
        const _b =[]; 
        const _c =[]; 
        
        if (totalpie.length !== 0) {
            totalpie.map(item => (
                _a.push(item.value)
            ))
        }
        
        if (marketspie.length !== 0) {
            marketspie.map(item => (
                _b.push(item.value)
            ))
        }
        
        if (avgpie.length !== 0) {
            avgpie.map(item => (
                _c.push(item.value)
            ))
        }
        
        
        return (
            <div style={{width: '80%',overflow: 'hidden',margin: '0 auto',display:showMarkets}}>
                <ul className={styles.marketsExcelUl}>
                    <li className={styles.borderNone}>门店类型</li>
                    <li className={styles.borderNone}>核券总数</li>
                    <li className={styles.borderNone}>店均核销</li>
                    <li>客单价</li>
                </ul>
                <ul className={styles.bodyUl}>
                    <li>商圈</li>
                    <li>学校</li>
                    <li>社区</li>
                    <li>总计</li>
                </ul>
                <ul className={styles.bodyUl}>
                    {
                        totalpie.length !== 0 ?
                        totalpie.map((item,idx) => (
                            <li key={idx}>{item.value}</li>
                        )) : null
                    }
                    <li>{parseInt(eval(_a.join('+')))}</li>
                </ul>
                <ul className={styles.bodyUl}>
                    {
                        marketspie.length !== 0 ?
                        marketspie.map((item,idx) => (
                            <li key={idx}>{item.value}</li>
                        )) : null
                    }
                    <li>{parseInt(eval(_b.join('+')))}</li>
                </ul>
                <ul className={classnames(styles.bodyUl, styles.borderRight)}>
                    {
                        avgpie.length !== 0 ?
                        avgpie.map((item,idx) => (
                            <li key={idx}>{item.value}</li>
                        )) : null
                    }
                    <li>{parseInt(eval(_c.join('+')))}</li>
                </ul>
            </div>
        );
    }

}
