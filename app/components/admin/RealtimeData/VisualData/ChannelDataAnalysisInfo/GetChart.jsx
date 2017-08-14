import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';
import {Spin} from 'antd';

// 基于准备好的dom，初始化echarts实例
export default class GetChart extends Component {

    static defaultProps = {
        width: '400px',
        height: '300px',
        dataSource: [],
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
        const {dataSource} = props;
        let rcord = [];
        let cnt = [];

        if (dataSource.length !== 0) {
            dataSource.filter(item => {
                return item.rcord != '0';
            }).map(item => {
                rcord.push(item.rcord);
                cnt.push(item.channelname);
            })
        }

        let option;
        option = {
            color: ['#3398DB'],
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
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
                    data: cnt,
                    axisTick: {
                        alignWithLabel: true
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    axisLabel: {
                        formatter: function(value, index) {
                            return value+ '张';
                        }
                    }
                }
            ],
            series: [
                {
                    name: '领券数',
                    type: 'bar',
                    barWidth: '60%',
                    data: rcord
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

        const {width,height}=this.props;

        return (
            <div ref={dom => this._dom = dom} style={{
                width,
                height
            }}></div>
        );
    }

}
