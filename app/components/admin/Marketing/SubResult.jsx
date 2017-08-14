import React, {PropTypes} from 'react';
import { Row, Col, Spin, Tooltip, Card } from 'antd';
import classnames from 'classnames';
import { Link } from 'react-router';
import globalStyles from 'sharedStyles/global.css';
import * as styles from './styles.css';


export default function SubResult({dataProps,handleJump}) {
    return (
        <div style={{paddingBottom: '100px'}}>
                <img className={styles.successImg} src={require('images/create_success.png')} />

                <p className={styles.successTit}>恭喜您</p>
                <p className={styles.successInfo}>活动已创建成功！</p>
                <p className={styles.successInfo}>您的优惠券已经发放</p>

                <Link className={styles.successJump} to="/admin/activity/list" onClick={handleJump}>查看活动 ></Link>
        </div>
    );
}
