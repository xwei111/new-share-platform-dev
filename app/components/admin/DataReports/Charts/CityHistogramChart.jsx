import React, {
    PropTypes,
    Component
} from 'react';
import echarts from 'echarts';
import {
    Spin,
    message
} from 'antd';
import {
    dataReportsApi
} from 'api';
import store from 'config/store.js';
import {
    getResult
} from 'helpers/util';
import * as styles from './styles.css';

// 基于准备好的dom，初始化echarts实例
export default class CityHistogramChart extends Component {

    state = {
        height: '500'
    }

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
            marketArr
        } = props;
        
        let nameReturn = [];
        let valueReturn = [];

        if (marketArr != 0) {
            
            if("marketName" in marketArr[0] === false) {
                marketArr.map(item => {
                    nameReturn.push(item.cityName);
                    valueReturn.push(item.hqNumTotal);
                })
            } else {
                marketArr.map(item => {
                    nameReturn.push(item.marketName);
                    valueReturn.push(item.hqNum);
                })
            }
            
        }
        
        let option;
        option = {
            color: ['#F84541'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'line' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                itemWidth: '10px'
            },
            grid: {
                left: '0',
                right: '10%',
                top: '0',
                containLabel: true
            },
            yAxis: [
                {
                    type: 'category',
                    data: nameReturn,
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLine: {
                        lineStyle: {
                            width: 0
                        }
                    }
                }
            ],
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            },
            xAxis: {
                show: false

            },

            series: [
                {
                    name: '核销数',
                    type: 'bar',
                    data: valueReturn,
                    barWidth: 10,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: '#7FBBED'
                                    },
                                    {
                                        offset: 1,
                                        color: '#69A8DC'
                                    },
                                    {
                                        offset: 0.5,
                                        color: '#7FBBED'
                                    }
                              ]
                            )
                        }
                    },
                    label: {
                        normal: {
                            show: true,
                            position: 'right'
                        }
                    }
                },
            ]

        };
        return option;

    }
    updateChart(props) {
        this.chartInstance.clear();
        const option = this.getOption(props);
        this.chartInstance.setOption(option);
//        this.chartInstance.off('click');
//        this.chartInstance.on('click', function (params) {
//            props.setCityName(params.name);
//        });
    }

    render() {
        const {selectName} = this.props;
        return ( <
            div style = {
                {
                    width: '300px',
                    float: 'right'
                }
            } >
            <
            p style = {
                {
                    color: '#000',
                    marginTop: '20px'
                }
            } > {selectName == '' ? '城市内' : selectName}门店核销明细: < /p> <
            div ref = {
                dom => this._dom = dom
            }
            style = {
                {
                    width: '300px',
                    height: '380px'
                }
            } > < /div> <
            /div>
        );
    }

}
