import React, {Component, PropTypes} from 'react';
import * as styles from './styles.css';
import {ActivitySelectionContainer,TradesManContainer} from 'containers/admin/RealtimeData/VisualData/TradesMan';
import {cardable} from 'hoc';

@cardable(['零售商&门店数据分析'])

export default class TradesMan extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ActivitySelectionContainer/>
                <TradesManContainer/>
            </div>
        )
    }
}
