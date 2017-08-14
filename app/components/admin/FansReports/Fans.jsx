import React, {Component, PropTypes} from 'react';

import styles from './styles.css';

import {FansContainer} from 'containers/admin/FansReports';

export default class Fans extends Component {
    render() {
        return (
            <div className={styles.container}>
                <FansContainer/>
            </div>
        )
    }
}
