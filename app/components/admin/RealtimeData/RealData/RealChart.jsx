import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';
import {Spin} from 'antd';

// 基于准备好的dom，初始化echarts实例
export default class RealChart extends Component {

    static defaultProps = {
        width: '100%',
        height: '300px',
        dataSource: []
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
        const {timeData,getData,useData} = props;

        let option;
        option = {
            title: {
                text: '实时核销领券曲线图',
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'normal',
                    color: '#333' // 主标题文字颜色
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['实时领券数', '实时核销数']
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: timeData
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}'
                }
            },
            series: [
                {
                    name: '实时领券数',
                    type: 'line',
                    smooth: true,
                    data: getData,
                    markPoint: {
                        data: [
                            {
                                type: 'max',
                                name: '最大值'
                            }, {
                                type: 'min',
                                name: '最小值'
                            }
                        ]
                    },
                    markLine: {
                        data: [
                            {
                                type: 'average',
                                name: '平均值'
                            }
                        ]
                    }
                }, {
                    name: '实时核销数',
                    type: 'line',
                    smooth: true,
                    data: useData,
                    markPoint: {
                        data: [
                            {
                                type: 'max',
                                name: '最大值'
                            }, {
                                type: 'min',
                                name: '最小值'
                            }
                        ]
                    },
                    markLine: {
                        data: [
                            {
                                type: 'average',
                                name: '平均值'
                            }
                        ]
                    }
                }
            ]
        };
        return option;
    }
    updateChart(props) {
        const option = this.getOption(props);
        // this.chartInstance.clear();
        this.chartInstance.setOption(option);
    }

    render() {

        const {width, height} = this.props;

        return (
            <div ref={dom => this._dom = dom} style={{
                width,
                height,
                margin: '10px auto'
            }}></div>
        );
    }

}
