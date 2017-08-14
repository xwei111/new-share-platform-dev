import React, {Component, PropTypes} from 'react';

import styles from './styles.css';
import {ProductContainer, ActivityProductContainer} from 'containers/admin/DataReports';

export default class ProductAnalysis extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ActivityProductContainer/>
                <ProductContainer/>
            </div>
        )
    }
}
