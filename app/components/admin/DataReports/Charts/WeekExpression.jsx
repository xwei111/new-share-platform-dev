import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';
import {Spin} from 'antd';

// 基于准备好的dom，初始化echarts实例
export default class WeekExpression extends Component {

    static defaultProps = {
        width: '300px',
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
      const { dataSource } = props;

        let option;
        option = {
            title: {
                subtext: '(核销量)'
            },
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },

            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            color:['#E9E8E5','#FFBA91','#FF6B00','#FFC4BE'],
            xAxis : [
                {
                    type : 'category',
                    data : ['商圈','社区','学校']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'上午',
                    type:'bar',
                    stack: '广告',
                    data:dataSource.morning
                },
                {
                    name:'中午',
                    type:'bar',
                    stack: '广告',
                    data:dataSource.noon
                },
                {
                    name:'下午',
                    type:'bar',
                    stack: '广告',
                    data:dataSource.afternoon
                },{
                    name:'晚上',
                    type:'bar',
                    stack: '广告',
                    data:dataSource.evening
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
