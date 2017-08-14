import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {message, Form} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as marketingActionCreators from 'redux/modules/marketing';
import {PredictionResult} from 'components/admin/Marketing';
import {marketingApi} from 'api';

@connect(({marketing}) => ({
    yuceData: marketing.yuceData,
    props_next: marketing.props_next
}), dispatch => bindActionCreators(marketingActionCreators, dispatch),)

@Form.create()
export default class ResultContainer extends Component {

    componentDidMount() {
    }

    handleSetYuceData(queryData) {
        this.props.setYuceData(queryData);
    }

    handelSetNextProps(a) {
    	this.props.setNextProps(a);
    }

    render() {

    	console.log(this.props.props_next)

        return (<PredictionResult {...this.props} handleSetYuceData={:: this.handleSetYuceData} handelSetNextProps={:: this.handelSetNextProps}/>);
    }
}
