import React, {Component, PropTypes} from 'react';
import echarts from 'echarts';
import moment from "moment";
import {Form, Spin, Select, Row, Col} from 'antd';
import * as styles from './styles.css';
import {realData, realDataCharts} from 'api/realData';
import {cardable} from 'hoc';
import { getDatavUrl } from 'helpers/util';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as realDataActionCreators from 'redux/modules/realData';
import {generateOptions} from 'helpers/util';
import {SubAndRestBtns} from 'components/admin/RealtimeData';
import {RealChart} from 'components/admin/RealtimeData/realData';
const FormItem = Form.Item;
const Option = Select.Option;

@cardable(['实时直播'])


export default class RealData extends Component {
    

    async componentDidMount() {
        
    }

    handleSelectChange(v) {
       
    }

    render() {
        const URL = getDatavUrl();
        return (
            <div className={styles.container}>
                <iframe src={URL} style={{display: 'block',width: '900px', height: '600px',margin: '0 auto'}}></iframe>
            </div>
        )
       
            
        
    }
}
