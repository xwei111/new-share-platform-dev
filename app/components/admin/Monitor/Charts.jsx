import React, {Component, PropTypes} from 'react';
import echarts from 'echarts';


export default class Charts extends React.Component {
	
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
        const {getdataData}=props;
        var dayData=[];
        var offsRate=[];
        var offsNum=[];
        var foreoffsNum=[];
        var foreoffsRate=[];
        if(getdataData!=undefined&&getdataData.length>0){
       		var length=getdataData.length;
       		for(var i=0;i<length;i++){
       			dayData.push(getdataData[i].update_dt); 
       			offsRate.push(getdataData[i].offs_rate);
       			offsNum.push(getdataData[i].offs_num);
       			foreoffsNum.push(getdataData[i].fore_offs_num);
       			foreoffsRate.push(getdataData[i].fore_offs_rate);
       		}
        }
        
        option = {
		    tooltip: {
		        trigger: 'axis',
		    },
		    legend: {
		        data: ['核销率', '实际每日核销', '预测日均核销','预测核销率']
		    },
		    xAxis: [{
		        type: 'category',
		        data: dayData
		    }],
		    yAxis: [{
		        type: 'value',
		        position: 'right',
		        axisLabel: {
		            formatter: '{value} %'
		        }
		    }, {
		        type: 'value',
		        position: 'left',
		        axisLabel: {
		            formatter: '{value}'
		        }
		    }],
		    series: [{
		        name: '实际每日核销',
		        type: 'bar',
		        yAxisIndex: 1,
		        data: offsNum,
		        itemStyle:{
		        	normal:{
		        		color:'#c2e0ff'
		        	}
		        }
		    },{
		        name: '核销率',
		        type: 'line',
		        lineStyle: {
		            normal: {
		                width: 3,
		                shadowColor: 'rgba(0,0,0,0.4)',
		                shadowBlur: 10,
		                shadowOffsetY: 10,
		                color:'#ff8456'
		            }
		        },
		        data: offsRate
		    }, {
		        name: '预测日均核销',
		        type: 'bar',
		        yAxisIndex: 1,
		        data: foreoffsNum,
		        itemStyle:{
		        	normal:{
		        		color:'#79b9ff'
		        	}
		        }
		    },{
		    	name:'预测核销率',
		    	type:'line',
		    	data:foreoffsRate,
		    	lineStyle: {
		            normal: {
		                color:'#ff8e63'
		            }
		        },
		    }]
        };
        return option;
    }

    updateChart(props) {
        const option = this.getOption(props);
        this.chartInstance.setOption(option);
    }

    render() {
        return (
            <div>
            	<div ref={dom => this._dom = dom} style={{
                        width:'100%',
                        height:'360px'
                    }}></div>
            </div>
        )
    }
}
