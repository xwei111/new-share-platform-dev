import React, {PropTypes, Component} from 'react';
import {Row, Col} from 'antd';
import echarts from 'echarts';
import * as styles from './styles.css';
import classnames from 'classnames';


// 基于准备好的dom，初始化echarts实例
export default class Datafunnel extends Component {

    static defaultProps = {
        funnelData: {
            uuse: '0',
            uget:  '0',
            uv:  '0'
        }
    }

    chartInstance = null
    componentDidMount() {
      const {funnelData} = this.props;
      const {uuse,uget,uv} = funnelData;
    }

    render() {

      const {funnelData} = this.props;
      const {uuse,uget,uv} = funnelData;
      let gus = parseInt(uuse) / (parseInt(uget) === 0 ? 1 : uget) * 100;

        return (
            <div className={styles.FunnelWrap}>
                <p style={{textAlign: 'center',fontWeight: 'bold',fontSize: '16px'}}>领核券转化漏斗</p>
                <div className={styles.funnelBox}>
                    <img className={styles.funnelTit} src={require('images/funnel_tit.png')}/>
                    <p className={classnames(styles.funnelInfo,styles.n2)}><span>领券数量</span><span>{uget}</span></p>
                    <p className={classnames(styles.funnelInfo,styles.n3)}><span>核券数量</span><span>{uuse}</span></p>

                    <div className={classnames(styles.funnelData,styles.c2)}><p>{gus}%</p></div>


                </div>
            </div>
        );
    }
}
