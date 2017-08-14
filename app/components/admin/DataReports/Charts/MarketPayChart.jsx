import createG2 from 'g2-react';
import { Stat,Frame } from 'g2';
import React, { Component } from 'react';
import { Button, Icon } from 'antd';

const ButtonGroup = Button.Group;

export default class MarketPayChart extends React.Component {

  constructor(props, ...others) {
    super(props, ...others);
    this.Chart = createG2(chart => {
      this.chart = chart;
      
      chart.source(this.props.data, {
        x: {
          alias: '交易次数', // 定义别名
          nice: false // 不对最大最小值优化
        },
        y: {
          alias: '客单价',
        },
        hqNum: {
          alias: '核销量'
        }
      });
        
      //x
      chart.axis('x', {
        formatter: function(val) {
          return val + '次'; // 格式化坐标轴显示文本
        },
        grid: {
          line: {
            stroke: '#d9d9d9',
            lineWidth: 1,
            lineDash: [2,2]
          }
        }
      });
      //y
      chart.axis('y', {
        formatter: function(val) {
          if (val > 0) {
              if (val > 1000 && val < 10000) {
                  return val / 1000 + '千元';
              } else if (val > 10000) {
                  return val / 10000 + '万元';
              } else if (val < 1000) {
                  return val + '元';
              }
            
          }
        }
      });
      chart.legend(false);
      chart.tooltip({
        map: {
          title: 'marketName'
        }
      });
        
      chart.point().position('x*y').size('hqNum', 40, 10).label('marketName*marketName', {
        offset:20, // 文本距离图形的距离
        label: {
          fill: '#000',
          fontWeight: 'bold', // 文本粗细
          shadowBlur: 5, // 文本阴影模糊
          shadowColor: '#fff' // 阴影颜色
        },
      }).color('#3182bd').opacity(0.5).shape('isCircle').tooltip('x*y*hqNum');
    
      
      chart.render();
    });
  }
    
    
  state = {
      key : 0
  }

  componentDidMount() {
    this.chart.clear();
    this.chart.point().position('x*y').size('hqNum', 40, 10).label('marketName*marketName', {
      offset:0, // 文本距离图形的距离
      label: {
        fill: '#000',
        fontWeight: 'bold', // 文本粗细
        shadowBlur: 5, // 文本阴影模糊
        shadowColor: '#fff' // 阴影颜色
      },
    }).color('#3182bd').opacity(0.5).shape('circle').tooltip('x*y*hqNum');
    this.chart.guide().tag([this.props.data[0].xx, 'min'], [this.props.data[0].xx, 'max'], '交易次数平均值:'+this.props.data[0].xx+'次');
    this.chart.guide().tag(['min', this.props.data[0].yy], ['max', this.props.data[0].yy], '客单价平均值:'+this.props.data[0].yy+'元');
    this.chart.render();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.chart.clear();
     
      this.chart.point().position('x*y').size('hqNum', 40, 10).label('marketName*marketName', {
        offset:0, // 文本距离图形的距离
        label: {
          fill: '#000',
          fontWeight: 'bold', // 文本粗细
          shadowBlur: 5, // 文本阴影模糊
          shadowColor: '#fff' // 阴影颜色
        },
      }).color('#3182bd').opacity(0.5).shape('circle').tooltip('x*y*hqNum');
      this.chart.guide().tag([nextProps.data[0].xx, 'min'], [nextProps.data[0].xx, 'max'], '交易次数平均值:'+nextProps.data[0].xx+'次');
      this.chart.guide().tag(['min', nextProps.data[0].yy], ['max', nextProps.data[0].yy], '客单价平均值:'+nextProps.data[0].yy+'元');
      this.chart.render();
    }
  }
    
  

  render() {
    const { key } = this.state;
    return (
        <div>
            <this.Chart {...this.props} />
        </div>
    );
  }
}