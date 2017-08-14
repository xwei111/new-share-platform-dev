import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';
import {Spin} from 'antd';

// 基于准备好的dom，初始化echarts实例
export default class WeekVerificationChart extends Component {

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
      const { dataSource } = props;
        let option;
        option = {
          title: {
              subtext: '(核销量)'
          },
          tooltip: {
              trigger: 'axis'
          },
          color:['#FF6B00','#FF0800','#00BAF5'],
          xAxis:  {
              type: 'category',
              boundaryGap: false,
              data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
              type: 'value',
              axisLabel: {
                  formatter: '{value}'
              }
          },
          series: [
              {
                  name:'商圈',
                  type:'line',
                  data:dataSource.biscenter
              },
              {
                  name:'社区',
                  type:'line',
                  data:dataSource.community
              },
              {
                  name:'学校',
                  type:'line',
                  data:dataSource.school
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
