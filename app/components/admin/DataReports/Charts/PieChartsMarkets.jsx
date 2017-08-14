import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';
import {Spin} from 'antd';
// 基于准备好的dom，初始化echarts实例
export default class PieChartsMarkets extends Component {

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
        // option = {
        //     tooltip: {
        //         trigger: 'item',
        //         formatter: "{a} <br/>{b} : {c} ({d}%)"
        //     },
        //     series: [
        //         {
        //             name: '店均核销',
        //             type: 'pie',
        //             radius: '55%',
        //             label: {
        //                 normal: {
        //                     normal: true,
        //                     position: "outside",
        //                     formatter: "{b}: \n ({d}%)"
        //                 }
        //             },
        //             center: [
        //                 '50%', '60%'
        //             ],
        //             data: rcord,
        //             itemStyle: {
        //                 emphasis: {
        //                     shadowBlur: 10,
        //                     shadowOffsetX: 0,
        //                     shadowColor: 'rgba(0, 0, 0, 0.5)'
        //                 }
        //             }
        //         }
        //     ],
        //     color: ['#FFBD9C', '#FF9C6A', '#FF772C']
        // };

        option = {
            color: ['#FF9C6A'],
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
                    name: '店均核销',
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
