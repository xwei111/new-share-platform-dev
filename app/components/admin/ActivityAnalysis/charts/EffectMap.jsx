import createG2 from 'g2-react';
import React, { Component } from 'react';


export default class EffectMap extends React.Component {
  constructor(props, ...others) {
    super(props, ...others);
    this.Chart = createG2(chart => {
      this.chart = chart;
      chart.source(this.props.data, {
        avgMarket_hq: {
          alias: '店均核销量 ', // 定义别名
        },
        offs_rate: {
          alias: '核销率',
        }
      });

      chart.legend(false);
      chart.tooltip({
        map: {
          title: 'active_name'
        }
      });

      chart.point().position('avgMarket_hq*offs_rate').size(20).label('active_name*active_name', {
        offset:20, // 文本距离图形的距离
        label: {
          fill: '#000',
          fontWeight: 'bold', // 文本粗细
          shadowBlur: 5, // 文本阴影模糊
          shadowColor: '#fff' // 阴影颜色
        },
      }).color('#3182bd').shape('isCircle').tooltip('avgMarket_hq*offs_rate');

      chart.render();
    });
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {

      this.chart.clear();

      this.chart.point().position('avgMarket_hq*offs_rate').size(20).label('active_name*active_name', {
        offset:0, // 文本距离图形的距离
        label: {
          fill: '#000',
          fontWeight: 'bold', // 文本粗细
          shadowBlur: 5, // 文本阴影模糊
          shadowColor: '#fff' // 阴影颜色
        },
      }).color('#3182bd').opacity(0.5).shape('circle').tooltip('avgMarket_hq*offs_rate');
      this.chart.render();
    }
  }



  render() {
    return (
        <div>
            <this.Chart {...this.props} style={{marginLeft:'20px'}}/>
        </div>
    );
  }
}
