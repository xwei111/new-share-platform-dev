import React, {Component, PropTypes} from 'react';
import { Row, Col, Card, Pagination, Icon } from 'antd';
import { Link } from 'react-router';
import styles from './styles.css';
import {ActivityInfoContainer, ActivitySelectionContainer} from 'containers/admin/ActivitySelect';

export default class ActivityGoodsBox extends Component {
    render() {
    	const { onJumpPath, activeSelect } = this.props;

        return (
            <div className={styles.mainBox}>

			    {activeSelect.length ? 
			    	activeSelect.map((item,idx) => (
			    		<Col span={12} key={idx}>
					        <Link to="/admin/analysis/expression" onClick={(a,b,c) => {onJumpPath('analysis','reportData','expression', item.active_id)}}>
						        <Card className={styles.cardBox} bodyStyle={{padding: '10px'}}>
						        	<img className={styles.cardImg} src={require("images/goods.png")} />
						        	<img className={styles.cardPos} src={require("images/arrow_l.png")} />
						        	<div className={styles.cardInfo}>
						        		<p>{item.active_name}</p>
						        		<span className={styles.boxLimit}>活动商品：{item.active_goods}</span>
						        		<span>活动时间：{item.active_start.split(' ')[0]}~{item.active_end.split(' ')[0]}</span>
						        	</div>
						        </Card>
						    </Link>
					    </Col>
			    	))

			    	: <p style={{
                              width: '100%',
                              height: '350px',
                              lineHeight: '350px',
                              textAlign: 'center'
                          }}><Icon type="frown-o"/>暂无数据</p>
			    }
            </div>
        )
    }
}
