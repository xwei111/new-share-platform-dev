import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataReportsActionCreators from 'redux/modules/dataReports';
import styles from 'components/admin/DataReports/styles.css';
import { DataExpression } from 'components/admin/DataReports';
import {ActivityDataExpressionContainer} from 'containers/admin/DataReports';

@connect(({dataReports}) => ({
    actInfo: dataReports.actInfo,
    numIn: dataReports.numIn,
    activeid: dataReports.activeid
}), dispatch => bindActionCreators(dataReportsActionCreators, dispatch))

export default class ShopperContainer extends React.Component {
    static propTypes = {}

    isEmptyObject(obj) { //判断是否为一个空对象

        for (var key in obj) {
            return false
        };
        return true
    };

    componentDidMount() {
        const {numIn, activeid} = this.props;
        if (numIn) {
            this.props.handleFetchActInfo(activeid);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {activeid, numIn, setNumIn} = nextProps;
        if (activeid != '' && !numIn) {
            setNumIn(true);
            this.props.handleFetchActInfo(activeid);
        }
    }

    render() {

        const { actInfo } = this.props;

        return (
            <div className={styles.mainContainer}>
                <ActivityDataExpressionContainer/>
                <DataExpression actInfo={actInfo}/>
            </div>
        );
    }
}
