import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';
import {Spin} from 'antd';
// 基于准备好的dom，初始化echarts实例
export default class GetPieChart extends Component {

    static defaultProps = {
        width: '400px',
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
        const {dataSource} = props;
        let rcord = [];
        let cnt = [];

        function ObjStory(rcord, channelname) {
            this.value = rcord;
            this.name = channelname;
        }

        if (dataSource.length !== 0) {
            dataSource.filter(item => {
               return item.rcord != '0';
            }).map(item => {
                cnt.push(item.channelname);
                rcord.push(new ObjStory(item.rcord,item.channelname));
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
                    name: '领券数',
                    type: 'pie',
                    radius: '55%',
                    center: [
                        '50%', '60%'
                    ],
                    data: rcord,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
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
                height
            }}></div>
        );
    }

}
