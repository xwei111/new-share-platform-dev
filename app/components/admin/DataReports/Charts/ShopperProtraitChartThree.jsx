import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
export default class ShopperProtraitChartTwo extends Component {

    static defaultProps = {
        width: '400px',
        height: '240px',
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
        const { dataSource } = props;
        let avg='',potentialFans='',juniorFans='',intermediateFans='';
        if(dataSource!=undefined){
            avg=parseFloat(dataSource.avg).toFixed(1);
            potentialFans=parseFloat(dataSource.potentialFans).toFixed(1);
            juniorFans=parseFloat(dataSource.juniorFans).toFixed(1);
            intermediateFans=parseFloat(dataSource.intermediateFans).toFixed(1);
            if(avg>=10000){
                avg=(avg/10000).toFixed(1)+'万';
            }
            if(potentialFans>=10000){
                potentialFans=(potentialFans/10000).toFixed(1)+'万';
            }
            if(juniorFans>=10000){
                juniorFans=(juniorFans/10000).toFixed(1)+'万';
            }
            if(intermediateFans>=10000){
                intermediateFans=(intermediateFans/10000).toFixed(1)+'万';
            }
        }
        let option;
        option = {
            title: {
                text: '交易频次',
                textStyle: {'fontWeight': 'normal', 'fontSize': 14},
                textAlign: 'center',
                top: 100,
                left: 60,
                subtext: '(平均频次:'+avg+'次)'
            },
            tooltip: {},
            color: ['#ff5145', '#ff884b', '#76c5e3'],
            legend: {
                x: 'left',
                y: 'top',
                data: ['潜在粉丝', '初级粉丝', '中级粉丝']
            },
            grid: {left: 125,right:100},
            xAxis: [
                {
                    show: false
                }
            ],
            yAxis: [
                {
                    type: 'category',
                    axisTick: {show: false},
                    data: [],
                    axisLabel: {
                        inside: true,
                        textStyle: {
                            color: '#000'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '潜在粉丝',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            // formatter: potentialFans+'次',
                            formatter: '{c}次',
                            textStyle: {color: '#333'}
                        }
                    },
                    data: [
                        {value: potentialFans, name: '交易频次'},
                    ]
                },
                {
                    name: '初级粉丝',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{c}次',
                            textStyle: {color: '#333'}
                        }
                    },
                    data: [
                        {value: juniorFans, name: '交易频次'}
                    ]
                },
                {
                    name: '中级粉丝',
                    type: 'bar',
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            formatter: '{c}次',
                            textStyle: {color: '#333'}
                        }
                    },
                    data: [
                        {value: intermediateFans, name: '交易频次'}
                    ]
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
                display:'inline-block',
                verticalAlign:'middle'
            }}></div>
        );
    }

}





