import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';
import {Spin} from 'antd';
// 基于准备好的dom，初始化echarts实例
export default class PieChartsAvg extends Component {

    static defaultProps = {
        width: '350px',
        height: '275px',
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
        const {data} = props;
        let rcord = [];
        let cnt = [];

        function ObjStory(rcord, channelname) {
            this.value = rcord;
            this.name = channelname;
        }

        if (data.length !== 0) {
            data.map(item => {
                cnt.push(item.marketType);
                rcord.push(item.value);
            })
        }

        let option;
        option = {
            color: ['#FF772C'],
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
                            return value+ '元';
                        }
                    }
                }
            ],
            series: [
                {
                    name: '客单价',
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

        const {width, height} = this.props;

        return (
            <div ref={dom => this._dom = dom} style={{
                width,
                height,
                margin: '0 auto'
            }}></div>
        );
    }

}
