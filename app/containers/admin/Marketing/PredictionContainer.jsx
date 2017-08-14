import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {message, Form} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as marketingActionCreators from 'redux/modules/marketing';
import {ActivityPrediction} from 'components/admin/Marketing';
import {marketingApi} from 'api';

@connect(({marketing}) => ({
    yuceData: marketing.yuceData,
}), dispatch => bindActionCreators(marketingActionCreators, dispatch),)

@Form.create()
export default class PredictionContainer extends Component {

    handleSetYuceData(queryData) {
        this.props.setYuceData(queryData);
    }
    render() {
        return (<ActivityPrediction {...this.props} handleSetYuceData={:: this.handleSetYuceData}/>);
    }
}
