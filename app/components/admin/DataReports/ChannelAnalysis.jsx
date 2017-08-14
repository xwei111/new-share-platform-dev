import React, {Component, PropTypes} from 'react';

import styles from './styles.css';
import {ChannelContainer, ActivityChannelContainer} from 'containers/admin/DataReports';

export default class ChannelAnalysis extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ActivityChannelContainer/>
                <ChannelContainer/>
            </div>
        )
    }
}
