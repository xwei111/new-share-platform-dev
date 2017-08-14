import React, { PropTypes, Component } from 'react';
import echarts from 'echarts';
import { Spin,message } from 'antd';
import { dataReportsApi } from 'api';
import store from 'config/store.js';
import { getResult } from 'helpers/util';
import * as styles from './styles.css';

// 基于准备好的dom，初始化echarts实例
export default class AreasHistogramChart extends Component {

  state={
      loading:true,
      height: '350'
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
        const { provinceArr } = props;

        let nameReturn = [];
        let valueReturn = [];
        let midvalueReturn = [];
        let tievalueReturn = [];
        var qianvalueRetrun= [];
        
        if ( provinceArr.length !== 0 ) {
            if (provinceArr.length < 5) {
                this.setState({height: '150'});
            } else {
                this.setState({height: '350'});
            }
            provinceArr.map(item => {
              nameReturn.push(item.provinceName);
              valueReturn.push(item.juniorFansTotal);
              midvalueReturn.push(item.intermediateFansTotal);
              tievalueReturn.push(item.loyalFansTotal);
              qianvalueRetrun.push(item.potentialFansTotal)
            })
        }

        let option;
        option = {
            color: ['#F84541'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                itemWidth: '10px'
            },
            grid: {
                left: '0',
                right: '10%',
                top: '0',
                height: this.state.height,
                containLabel: true
            },
            yAxis : [
                {
                    type : 'category',
                    data : nameReturn,
                    axisTick: {
                        alignWithLabel: true,
                    },
                    axisLine: {
                        lineStyle: {
                            width: 0
                        }
                    }
                }
            ],
            axisLabel: {
                textStyle: {
                    color: '#999'
                }
            },
            xAxis: {
                show: false
             
            },

            series : [
                {
                    name:'初级粉丝数 ',
                    type:'bar',
                    stack: '粉丝',
                    data:valueReturn,
                    barWidth: 10,
                    itemStyle: {
                      normal: {
                          color: '#0099cc'
                      }
                    }
                },
                {
                    name:'中级粉丝数 ',
                    type:'bar',
                    stack: '粉丝',
                    data:midvalueReturn,
                    barWidth: 10,
                    itemStyle: {
                      normal: {
                          color: '#ff9900'
                      }
                    }
                },
                {
                    name:'铁杆粉丝数 ',
                    type:'bar',
                    stack: '粉丝',
                    data:tievalueReturn,
                    barWidth: 10,
                    itemStyle: {
                      normal: {
                          color: '#339999'
                      }
                    }
                },
                {
                    name:'潜在粉丝数 ',
                    type:'bar',
                    stack: '粉丝',
                    data:qianvalueRetrun,
                    barWidth: 10,
                    itemStyle: {
                      normal: {
                          color: '#ff0000'
                      }
                    }
                }
            ]
            
        };
        return option;
      
    }
    updateChart(props) {
     this.chartInstance.clear();
     const option = this.getOption(props);
     this.chartInstance.setOption(option);
   }
    
    render() {
        const { provinceArr } = this.props;
        return (
            <div style={provinceArr.length ? {display: 'block'} : {display: 'none'}}>
                <p style={{color: '#000',marginTop: '20px'}}>省内门店核销明细:</p>
                <div ref={dom => this._dom = dom} style={{width: '300px',height: '350px',float: 'left'}}></div>
            </div>
        );
    }

}
