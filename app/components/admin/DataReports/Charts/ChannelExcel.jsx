import React, {PropTypes, Component} from 'react';
import {Row, Col, Spin, Tooltip, Icon} from 'antd';
import * as styles from './styles.css';
import classnames from 'classnames';
// 基于准备好的dom，初始化echarts实例

export default class ChannelExcel extends Component {

    static defaultProps = {
        
    }


    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {

        const { channeldata } = this.props;
        const colorFont = ['color1', 'color2', 'color3', 'color4', 'color5'];

        return (
            <div>
                <Row style={{display: 'none'}}>
                    <Col span={6}><img style={{display: 'block',width: '60%',margin: '0 auto'}} src={require('images/ch_1.png')} /></Col>
                    <Col span={6}><img style={{display: 'block',width: '60%',margin: '0 auto'}} src={require('images/ch_2.png')} /></Col>
                    <Col span={6}><img style={{display: 'block',width: '60%',margin: '0 auto'}} src={require('images/ch_3.png')} /></Col>
                    <Col span={6}><img style={{display: 'block',width: '60%',margin: '0 auto'}} src={require('images/ch_4.png')} /></Col>
                </Row>
                <div className={styles.channelBox}>
                    <div className={styles.channelLeft}>
                        <p>渠道个数<span>　</span></p>
                        <Tooltip placement="right" title='引流贡献度 计算方式：该渠道领券量/总领券量'>
                            <p>引流贡献度<Icon type="question-circle-o" /><span>(领取量)</span></p>
                        </Tooltip>
                        <Tooltip placement="right" title='购买贡献度 计算方式：该渠道核销量/总核销量'>
                            <p>购买贡献度<Icon type="question-circle-o" /><span>(核券量)</span></p>
                        </Tooltip>
                        <Tooltip placement="right" title='转化贡献度 计算方式：核销量/领销量'>
                            <p>转化贡献度<Icon type="question-circle-o" /><span>(核券量)</span></p>
                        </Tooltip>
                        <Tooltip placement="right" title='效率贡献值 计算方式：该渠道核销量/该渠道物料数'>
                            <p>效率贡献值<Icon type="question-circle-o" /><span>(核券量)</span></p>
                        </Tooltip>
                    </div>
                    <div className={styles.channelHeader}>
                        {
                            channeldata.length ?
                                channeldata.map((item,idx) => (
                                    <div key={idx} className={styles.flexItem}>{item.name}</div>
                                ))
                            : null
                        }
                    </div>
                    <div className={styles.channelBody}>
                        {
                            channeldata.length ?
                                channeldata.map((item,idx) => (
                                    <div key={idx} className={classnames(styles.flexItemBody, colorFont[0])}>{item.channelNum}</div>
                                 
                                ))
                            : null
                        }
                    </div>
                    <div className={styles.channelBody}>
                        {
                            channeldata.length ?
                                channeldata.map((item,idx) => (
                                    <div key={idx} className={classnames(styles.flexItemBody, colorFont[1])}>{item.ylgxd}</div>
                                 
                                ))
                            : null
                        }
                    </div>
                    <div className={styles.channelBody}>
                        {
                            channeldata.length ?
                                channeldata.map((item,idx) => (
                                    <div key={idx} className={classnames(styles.flexItemBody, colorFont[2])}>{item.gmgxd}</div>
                                 
                                ))
                            : null
                        }
                    </div>
                    <div className={styles.channelBody}>
                        {
                            channeldata.length ?
                                channeldata.map((item,idx) => (
                                    <div key={idx} className={classnames(styles.flexItemBody, colorFont[3])}>{item.zhgxd}</div>
                                 
                                ))
                            : null
                        }
                    </div>
                    <div className={styles.channelBody}>
                        {
                            channeldata.length ?
                                channeldata.map((item,idx) => (
                                    <div key={idx} className={classnames(styles.flexItemBody, colorFont[4])}>{item.xlgxd}</div>
                                 
                                ))
                            : null
                        }
                    </div>
                    
                </div>
            </div>
        );
    }

}
