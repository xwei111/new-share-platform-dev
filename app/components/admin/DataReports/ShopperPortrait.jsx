import React, {Component, PropTypes} from 'react';

import styles from './styles.css';

import {ShopperContainer, ActivityShopperContainer} from 'containers/admin/DataReports';

export default class ShopperPortrait extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ActivityShopperContainer/>
                <ShopperContainer/>
            </div>
        )
    }
}
