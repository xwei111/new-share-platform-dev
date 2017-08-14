import React, {PropTypes, Component} from 'react';
import {Tooltip, Icon} from 'antd';

import styles from 'components/admin/DataReports/Charts/styles.css';

export default class FansNumberChart extends Component {

    static defaultProps = {}

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps) {

    }

    render() {
        const {dataSource} = this.props;
        return (
            <div className={styles.fansNumberChart} style={{position: 'relative'}}>
                <div className={styles.visualMapWrap}>
                    <p>用户价值忠诚度</p>
                    <span></span>
                </div>

                <div className={styles.pyramidChart}>
                    {dataSource.map((item, index) =>
                        <div key={index}>
                            <Tooltip placement="top" title={item.explain}>
                                <div className={styles.bak}>{item.name}</div>
                            </Tooltip>
                            <div className={styles.fansNumber}>{item.value}个</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

}