import React, {Component, PropTypes} from 'react';

import {ActivitySelectionContainer,TotalDataContainer} from 'containers/admin/RealtimeData/VisualData/TotalData';
import styles from './styles.css';
import {cardable} from 'hoc';

@cardable(['数据总览'])

export default class UserData extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ActivitySelectionContainer/>

                <TotalDataContainer/>
            </div>
        )
    }
}
