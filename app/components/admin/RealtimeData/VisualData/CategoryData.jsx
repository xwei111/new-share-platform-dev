import React, {Component, PropTypes} from 'react';
import * as styles from './styles.css';
import {ActivitySelectionContainer, CategoryDataContainer} from 'containers/admin/RealtimeData/VisualData/CategoryData';
import {cardable} from 'hoc';

@cardable(['单品数据分析'])

export default class CategoryData extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ActivitySelectionContainer/>
                <CategoryDataContainer/>
            </div>
        )
    }
}
