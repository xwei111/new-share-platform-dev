import React, {Component, PropTypes} from 'react';

import styles from './styles.css';
import {TicketUsageContainer, ActivityUsageContainer} from 'containers/admin/DataReports';

export default class TicketUsageAnalysis extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ActivityUsageContainer/>
                <TicketUsageContainer/>
            </div>
        )
    }
}
