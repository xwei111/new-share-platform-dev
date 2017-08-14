import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';
import {Spin} from 'antd';
// 基于准备好的dom，初始化echarts实例
export default class PieChartsTotal extends Component {

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

        function ObjStory(rcord, channelname) {
            this.value = rcord;
            this.name = channelname;
        }

        if (data.length !== 0) {
            data.map(item => {
                rcord.push(new ObjStory(item.value,item.marketType));
            })
        }

        let option;
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            series: [
                {
                    name: '核券数',
                    type: 'pie',
                    radius: '55%',
                    center: [
                        '50%', '60%'
                    ],
                    label: {
                        normal: {
                            normal: true,
                            position: "outside",
                            formatter: "{b}: \n ({d}%)"
                        }
                    },
                    data: rcord,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ],
            color: ['#FFBD9C', '#FF9C6A', '#FF772C']
            
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
