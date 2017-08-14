import React, {Component, PropTypes} from 'react';

import {ActivitySelectionContainer,UserDataContainer} from 'containers/admin/RealtimeData/VisualData/UserData';
import styles from './styles.css';
import {cardable} from 'hoc';

@cardable(['用户数据分析'])

export default class UserData extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ActivitySelectionContainer/>

                <UserDataContainer/>
            </div>
        )
    }
}
