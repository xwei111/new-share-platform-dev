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
        let option;
        option = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'',
                    type:'pie',
                    radius: ['36%', '60%'],
                    data:[
                        {value:data.potential_Totalfans, name:'潜在粉丝',itemStyle:{
                            normal:{color:'#ff0000'}
                        }},
                        {value:data.junior_Totalfans, name:'初级粉丝',itemStyle:{
                            normal:{color:'#0099cc'}
                        }},
                        {value:data.intermediate_Totalfans, name:'中级粉丝',itemStyle:{
                            normal:{color:'#ff9900'}
                        }},
                        {value:data.loyal_Totalfans, name:'铁杆粉丝',itemStyle:{
                            normal:{color:'#339999'}
                        }}
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
                margin: '0 auto'
            }}></div>
        );
    }

}
