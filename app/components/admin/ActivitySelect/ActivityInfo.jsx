import React, {Component, PropTypes} from 'react';

import styles from './styles.css';
import {ActivityInfoContainer, ActivitySelectionContainer} from 'containers/admin/ActivitySelect';

export default class ActivityInfo extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ActivitySelectionContainer/>
                <ActivityInfoContainer/>
            </div>
        )
    }
}
