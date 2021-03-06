import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
export default class DifferentDisStore extends Component {

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
      const { dataSourse } = props;
      if (dataSourse) {
        var name=[];
        var avgMarketSales=[];
        dataSourse.map(item=>(
          name.push(item.name),
          avgMarketSales.push(item.avgMarketSales)
        ))
      }
      let option;
      option = {
        color:['#FF8840'],
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            show:false,
            type: 'value',
            boundaryGap: [0, 0.01],

        },
        yAxis: {
            type: 'category',
            data: name,
            axisLine: {
             show: false
            },
             // 去除坐标轴上的刻度线
            axisTick: {
              show: false
            }
        },
        series: [
            {
                name: '单门店核销量',
                type: 'bar',
                data: avgMarketSales
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
            <div ref={dom => this._dom = dom} style={{width:'100%',height:'200px'}}></div>
        );
    }

}
