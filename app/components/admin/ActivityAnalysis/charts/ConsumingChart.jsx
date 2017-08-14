import React, {PropTypes, Component} from 'react';
import echarts from 'echarts';

// 基于准备好的dom，初始化echarts实例
export default class ConsumingChart extends Component {

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
      const { fansChart } = props;
      let intermediateFans = [];
      let juniorFans = [];
      let loyalFans = [];
      let potentialFans = [];
      let active_name = [];
      if (fansChart) {
        fansChart.map(item => (
          intermediateFans.push(item.intermediateFans),
          juniorFans.push(item.juniorFans),
          loyalFans.push(item.loyalFans),
          potentialFans.push(item.potentialFans),
          active_name.push(item.active_name)
        ))

      }
      let option;
      option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        color:['#5ABBFF','#00D8F3','#84EAFB','#B8D6D8'],
        legend: {
            data: ['潜在粉丝', '初级粉丝','中级粉丝','铁杆粉丝']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis:  {
            type: 'value'
        },
        yAxis: {
            type: 'category',
            data:active_name
        },
        series: [
            {
                name: '潜在粉丝',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: potentialFans
            },
            {
                name: '初级粉丝',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: juniorFans
            },
            {
                name: '中级粉丝',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: intermediateFans
            },
            {
                name: '铁杆粉丝',
                type: 'bar',
                stack: '总量',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: loyalFans
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
