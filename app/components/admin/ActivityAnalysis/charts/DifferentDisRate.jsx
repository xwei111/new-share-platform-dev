import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
export default class DifferentDisRate extends Component {

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
        var hxl=[];
        dataSourse.map(item=>(
          name.push(item.name),
          hxl.push(item.hxl)
        ))
      }
      let option;
      option = {
        color:['#5ABBFF'],
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
            show: false,
            type: 'category',
            data: name
        },
        series: [
            {
                name: '核销率',
                type: 'bar',
                data: hxl
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
