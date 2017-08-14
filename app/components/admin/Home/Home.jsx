import React, {PropTypes} from 'react';
import {
    Row,
    Col,
    Icon,
    Button,
} from 'antd';
import { Link } from 'react-router';
import classnames from 'classnames';
import * as styles from './styles.css';



export default function Home({dataProps,onChageAct,onJumpPath}) {
    return (
        <div className={styles.content}>
            <div className={styles.homeWrapContainer}>
                <Link to="/admin/fans/fansOverData" onClick={(a,b,c) => {onJumpPath('fans','fansData','fansOverData')}}>
                    <div className={styles.homeInnerBox}>
                        <div></div>
                        <img className={styles.jumpBtn} src={require('images/home_4.png')}/>
                        <h4>粉丝洞察</h4>
                        <p>粉丝才是重点</p>
                    </div>
                </Link>
                <Link to="/admin/activity/activity" onClick={(a,b,c) => {onJumpPath('activity','activityData','activity')}}>
                    <div className={styles.homeInnerBox}>
                        <div></div>
                        <img className={styles.jumpBtn} src={require('images/home_1.png')}/>
                        <h4>发起活动</h4>
                        <p>预测，让活动更有底</p>
                    </div>
                </Link>
                <Link to="/admin/monitor/monitor" onClick={(a,b,c) => {onJumpPath('monitor','monitorData','monitor')}}>
                    <div className={styles.homeInnerBox}>
                        <div></div>
                        <img className={styles.jumpBtn} src={require('images/home_2.png')}/>
                        <h4>活动监测 </h4>
                        <p>随时监控</p>
                        <p>随时调整</p>
                    </div>
                </Link>  
                <Link to="/admin/analysis/select" onClick={(a,b,c) => {onJumpPath('analysis','reportData','select')}}>
                    <div className={styles.homeInnerBox}>
                        <div></div>
                        <img className={styles.jumpBtn} src={require('images/home_3.png')}/>
                        <h4>活动分析</h4>
                        <p>活动，不只有数据</p>
                    </div>
                </Link>
            </div>
            
        </div>
    );
}
