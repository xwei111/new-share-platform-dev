import React, {Component, PropTypes} from 'react';

import {ActivitySelectionContainer,InsideCouponContainer} from 'containers/admin/RealtimeData/VisualData/InsideCoupon';
import styles from './styles.css';
import {cardable} from 'hoc';

@cardable(['体内券数据总览'])

export default class InsideCoupon extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ActivitySelectionContainer/>
                <InsideCouponContainer/>
            </div>
        )
    }
}
