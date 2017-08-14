import createG2 from 'g2-react';
import { Stat,Frame } from 'g2';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class PieChartsTotal extends React.Component {

  constructor(props, ...others) {
    super(props, ...others);
    this.Chart = createG2(chart => {
      this.chart = chart;
      const frame = new Frame(this.props.data); // 加工数据
      frame.addCol('odd',function(obj,index){
        return index % 2;
      });

      const defs = {
        'percent': {min: 0,max: 1},
        'odd': {type: 'cat'}
      };
      chart.source(frame,defs);
      chart.tooltip({
        map: {
          value: 'percent',
          name: '占比',
          title: 'question'
        }
      });
      
      chart.legend(false);
      chart.coord('polar',{inner: 0.3}).transpose();
      chart.interval().position('question*percent')
        .color('odd',function(value){
        return ['rgb(255,189,156)', 'rgb(255,119,44)'][value];
      })
        .label('percent',{offset: -5});
      frame.each(function(obj){
        chart.guide().text([obj.question,0],obj.question + ' ',{
          textAlign: 'right',
        });
      });
      chart.render();
    });
  }
    
  componentDidMount() {
      
  }

  componentWillReceiveProps(nextProps) {
//    if (nextProps.shape !== this.props.shape) {
//      this.chart.clear();
//      chart.interval().position('question*percent')
//        .color('odd',function(value){
//        return ['rgb(224,74,116)', 'rgb(211,0,57)'][value];
//      })
//      this.chart.render();
//    }
      this.Chart = createG2(chart => {
      this.chart = chart;
      const frame = new Frame(nextProps.data); // 加工数据
      frame.addCol('odd',function(obj,index){
        return index % 2;
      });

      const defs = {
        'percent': {min: 0,max: 1},
        'odd': {type: 'cat'}
      };
      chart.source(frame,defs);
      chart.tooltip({
        map: {
          value: 'percent',
          name: '占比',
          title: 'question'
        }
      });
      
      chart.legend(false);
      chart.coord('polar',{inner: 0.3}).transpose();
      chart.interval().position('question*percent')
        .color('odd',function(value){
        return ['rgb(255,189,156)', 'rgb(255,119,44)'][value];
      })
        .label('percent',{offset: -5});
      frame.each(function(obj){
        chart.guide().text([obj.question,0],obj.question + ' ',{
          textAlign: 'right',
        });
      });
      chart.render();
    });
  }

  render() {
    return (<this.Chart {...this.props} />);
  }
}