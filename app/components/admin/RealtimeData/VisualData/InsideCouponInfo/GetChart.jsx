import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';
import {Spin} from 'antd';

// 基于准备好的dom，初始化echarts实例
export default class GetChart extends Component {

    static defaultProps = {
        width: '800px',
        height: '400px',
        dataSource: [],
        status: 0
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

        const {dataSource, status} = props;

        let xArr = [];
        let yArrA = [];
        let yArrB = [];

        if (dataSource.curve) {
            if (status === 0) {
                dataSource.curve.map(item => {
                    xArr.push(item.date);
                    yArrA.push(item.content.takenCnt);
                    yArrB.push(item.content.usedCnt);
                })
            } else {
                dataSource.curve.map(item => {
                    xArr.push(item.date);
                    yArrA.push(item.content.takenUserCnt);
                    yArrB.push(item.content.usedUserCnt);
                })
            }
        }

        let option;
        option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    label: {
                        backgroundColor: '#6a7985'
                    }
                }
            },
            legend: {
                icon: 'roundRect',
                data: (status === 0)
                    ? ['领券量', '核券量']
                    : ['领券人数', '核券人数']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: false,
                    data: xArr
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: (status === 0)
                        ? '核券量'
                        : '核券人数',
                    smooth: true,
                    type: 'line',
                    stack: '总量1',
                    areaStyle: {
                        normal: {}
                    },
                    data: yArrB
                }, {
                    name: (status === 0)
                        ? '领券量'
                        : '领券人数',
                    smooth: true,
                    type: 'line',
                    stack: '总量2',
                    areaStyle: {
                        normal: {}
                    },
                    data: yArrA
                }
            ],
            color: ['#73aaf2', '#96d050']
        };

        return option;
    }
    updateChart(props) {
        const option = this.getOption(props);
        // this.chartInstance.clear();
        this.chartInstance.setOption(option);
    }

    render() {
        const {width, height, status} = this.props;

        return (
            <div ref={dom => this._dom = dom} style={{
                width,
                height,
                margin: '20px auto'
            }}></div>
        );
    }

}
