import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
export default class MoreYChart extends Component {

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
      const { effOverview } = props;
      let tran_amount = [];
      let offs_num = [];
      let offs_rate = [];
      let active_name = [];
      if (effOverview) {
        effOverview.map(item => (
          tran_amount.push(item.tran_amount),
          offs_num.push(item.offs_num),
          offs_rate.push(item.offs_rate),
          active_name.push(item.active_name)
        ));
      }
      let option;
      var colors = ['#5ABBFF', '#BCE2FF', '#FF7948'];
      option = {
        color: colors,
        tooltip: {
            trigger: 'axis',
        },
        legend: {
            data:['核销数','销售额','核销率']
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: active_name
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '核销数',
                position: 'left',
            },
            {
                type: 'value',
                name: '销售额',
                position: 'right',
            },
            {
                type: 'value',
                name: '核销率',
                position: 'right',
                offset:50,
            }
        ],
        series: [
            {
                name:'核销数',
                type:'bar',
                data:offs_num
            },
            {
                name:'销售额',
                type:'bar',
                yAxisIndex: 1,
                data:tran_amount
            },
            {
                name:'核销率',
                type:'line',
                yAxisIndex: 2,
                data:offs_rate
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
            <div ref={dom => this._dom = dom} style={{width:'100%',height:'400px',marginLeft:'-50px'}}></div>
        );
    }

}
