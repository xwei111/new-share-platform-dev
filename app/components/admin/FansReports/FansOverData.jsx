import React, {Component, PropTypes} from 'react';
import {Row, Col,Icon} from 'antd';
import styles from './styles.css';

import {ShopperContainer, ActivityShopperContainer} from 'containers/admin/DataReports';

export default class FansOverData extends Component {
    render() {
        var show=false;
        if(this.props.totalFans!=undefined&&this.props.hqNum!=undefined){
            show=true
        }else{
            show=false
        }

        var totalfans=this.props.totalFans+'';
        totalfans=totalfans.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');

        var hqnum=this.props.hqNum+'';
        hqnum=hqnum.split('').reverse().join('').replace(/(\d{3})/g,'$1,').replace(/\,$/,'').split('').reverse().join('');
        return (
            <div className={styles.mainContainer}>
                {
                    show?
                        <Row>
                            <Col span={12}>
                                <div>
                                    <img className={styles.rightImg1} src={require("images/pic_1.png")} />
                                    <div className={styles.leftData}>
                                        <div>粉丝总数</div>
                                        <p>{totalfans}</p>
                                    </div>
                                </div>
                            </Col>
                            <Col span={12}>
                                <div>
                                    <img className={styles.rightImg2} src={require("images/pic_2.png")} />
                                    <div className={styles.leftData}>
                                        <div>核券总数</div>
                                        <p>{hqnum}</p>
                                    </div>
                                </div>
                            </Col>
                            
                        </Row>
                    :
                        <div className={styles.nothing}><Icon type="frown-o" />暂无数据</div>

                }
            	
            </div>
        )
    }
}
