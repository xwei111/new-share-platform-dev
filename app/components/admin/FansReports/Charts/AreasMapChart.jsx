import React, {
    PropTypes,
    Component
} from 'react';
import echarts from 'echarts';
import 'echarts/map/js/china';
import {
    Spin,
    message,
    Icon
} from 'antd';
import {
    dataReportsApi
} from 'api';
import store from 'config/store.js';
import * as styles from './styles.css';

function randomData() {
    return Math.round(Math.random() * 1000);
}



export default class AreasMapChart extends Component {

    state = {}

    chartInstance = null

    componentDidMount() {

        this.chartInstance = echarts.init(this._dom);
        this.updateChart(this.props);

    }
    componentWillReceiveProps(nextProps) {
        this.updateChart(nextProps);
    }

    getOption(props) {

        const {
            provinceArr
        } = props;

        Array.prototype.max = function () {
            var max = this[0];
            var len = this.length;
            for (var i = 1; i < len; i++) {
                if (this[i] > max) {
                    max = this[i];
                }
            }
            return max;
        }

        function ObjStory(totalFans, provinceName) {
            this.value = totalFans;
            this.name = provinceName.substr(0, provinceName.length - 1);
        }

        let maxReturn = [];
        let $list = [];

        if (provinceArr.length !== 0) {
            provinceArr.map(item => {
                maxReturn.push(item.totalFans);
                $list.push(new ObjStory(item.totalFans, item.provinceName));
            })
        }

        if (!$list.length) {
            $list = [
                {
                    name: '北京',
                    value: 0
                }
            ]
            maxReturn = [10];
        }
        let option;
        option = {

            tooltip: {
                trigger: 'item'
            },
            visualMap: {
                min: 0,
                max: maxReturn.max(),
                left: 'left',
                top: 'bottom',
                orient: 'horizontal',
                text: ['高', '低'], // 文本，默认为数值文本
                calculable: true,
                inverse: true,
                itemHeight: 80,
                inRange: {
                    color: ['#F4F8FC', '#3D8AC8']
                },
            },

            series: [
                {
                    name: '粉丝总数',
                    type: 'map',
                    mapType: 'china',
                    roam: false,
                    label: {
                        normal: {
                            show: true,
                            textStyle: {
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                color: 'rgba(0,0,0,0)'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: '#FFF',
                            areaColor: '#F4F8FB'
                        },
                        emphasis: {
                            areaColor: '#78A2C6',
                        }
                    },
                    data: $list
                }
            ]
        };
        return option;

    }
    updateChart(props) {
        this.chartInstance.clear();
        const option = this.getOption(props);
        this.chartInstance.setOption(option);
        this.chartInstance.off('click');
        this.chartInstance.on('click', function (params) {
            if (!params.value) {
                message.error('当前区域暂无门店');
                return;
            }
            props.onHandleOpen(params.name);
        });
    }

    render() {
        
        const {provinceArr} = this.props;
        
        return ( 

            <div ref = {dom => this._dom = dom}
                style = {{
                        width: '500px',
                        height: '350px',
                        float: 'left'
                    }}></div>

            
        );
    }

}
