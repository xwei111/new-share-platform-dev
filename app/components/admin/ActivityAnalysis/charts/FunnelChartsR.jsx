import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
export default class FunnelChartsR extends Component {

    static defaultProps = {

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
      let option;
      option = {
          legend: {
              data: ['展现','点击'],
              x:'45%',
              y:'bottom',

          },
          series: [
              {
                  name:'漏斗图',
                  type:'funnel',
                   width: '80%',
                  minSize: '50%',
                  maxSize: '80%',
                  label: {
                      normal: {
                          show: true,
                          position: 'inside'
                      },
                      emphasis: {
                          textStyle: {
                              fontSize: 20
                          }
                      }
                  },
                  itemStyle: {
                      normal: {
                          borderWidth:10
                      }
                  },
                  data: [
                      {value: 80, name: '点击'},
                      {value: 100, name: '展现'}
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

        return (
            <div ref={dom => this._dom = dom} style={{width:'300px',height:'200px'}}></div>
        );
    }

}
