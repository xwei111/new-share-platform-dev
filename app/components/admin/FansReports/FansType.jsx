import React, {Component, PropTypes} from 'react';

import styles from './styles.css';
import {FansTypeContainer} from 'containers/admin/FansReports';

export default class FansType extends Component {
    render() {
        return (
            <div className={styles.container}>
                <FansTypeContainer/>
            </div>
        )
    }
}
