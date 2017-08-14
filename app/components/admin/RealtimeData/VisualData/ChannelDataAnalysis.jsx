import React, {Component, PropTypes} from 'react';
import * as styles from './styles.css';
import {ActivitySelectionContainer,ChannelDataAnalysisContainer} from 'containers/admin/RealtimeData/VisualData/ChannelDataAnalysis';
import {cardable} from 'hoc';

@cardable(['渠道数据分析'])

export default class ChannelDataAnalysis extends Component {
    render() {
        return (
            <div className={styles.container}>
                <ActivitySelectionContainer/>
                <ChannelDataAnalysisContainer/>
            </div>
        )
    }
}
