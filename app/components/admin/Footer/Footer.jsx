import React, {PropTypes} from 'react';
import {Layout} from 'antd';
import classnames from 'classnames';
import * as styles from './styles.css';

const { Footer } = Layout;

export default function Foot() {
    return (
        <Layout style={{overflow: 'hidden'}}>
            <Footer style={{background: '#FFF',padding: '0'}}>
              <div className={styles.container}>
                <p>浙ICP备 15014474 号　｜　浙公安网备 33010802006011 号　|　Copyright © 2015  MiYa Technology  All rights Reserved</p>
              </div>
            </Footer>
        </Layout>
    );
}
