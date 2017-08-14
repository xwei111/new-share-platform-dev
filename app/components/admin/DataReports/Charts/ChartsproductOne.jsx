import React, {Component, PropTypes} from 'react';
import echarts from 'echarts';
import {Icon,Select } from 'antd';
import styles from './styles.css';


export default class ChartsproductOne extends Component {

    static defaultProps = {
        width: '960px',
        height: '500px'
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
        const { getdateactivity } = props;
        var goodsName=[];
        var goodsNamelittle=[];
    	var hq_num=[];
    	var hql=[];
    	var lq_num=[];
    	
    	if(getdateactivity.length){
            
    		for(var i=0;i<getdateactivity.length;i++){
    			goodsName.push(getdateactivity[i].couponname);
    			var couponname=getdateactivity[i].couponname;
    			var couponnameStrOne=couponname.substring(0,6);
    			var couponnameStrTwo=couponname.substring(6,11);
    			var couponnameString=couponnameStrOne+'\n'+couponnameStrTwo+'....';
    			goodsNamelittle.push(couponnameString);
    			hq_num.push(getdateactivity[i].hq_num);
    			hql.push(Number((getdateactivity[i].hql*100).toFixed(2)));
    			lq_num.push(getdateactivity[i].lq_num);
    		}
    	}

        let option;
        option = {
	            title: {
				    text: ''
				},
			    yAxis: {
			    	type:'category',
			        interval: 0,
			        data: goodsNamelittle,
			        axisTick:{
			        	show:false
			        },
			        axisLine:{
				      	lineStyle:{
				      		color:'#999'
				      	}
				    },
				    axisLabel: {
				       textStyle: {
				          color: '#000'
				       },
				    },
			    },
			    tooltip: {
			    	trigger:'axis',
			    	formatter:function(params){
			    		return (goodsName[params[0].dataIndex]+'<br/>核券数:'+params[1].data+'<br/>领券数：'+params[2].data+'<br/>核销率：'+params[0].data)

			    	}
			    },
			    xAxis: [
			    {
			      name: '(核销率)',
			      nameLocation: 'end',
			      axisTick: {
			        show: false
			      },
			      axisLine:{
			      	lineStyle:{
			      		color:'#999'
			      	}
			      },
			      axisLabel: {
			        textStyle: {
			          color: '#000'
			        },
			        formatter:'{value}%'
			      },
			      splitLine: {
			      	show:false,
			        lineStyle:{
			        	type:'dashed'
			        }
			      }
			    }, {
			      name: '',
			      nameLocation: 'end',
			      axisLine:{
			      	show:false
			      },
			      axisTick: {
			        show: false
			      },
			      axisLabel: {
			        textStyle: {
			          color: '#000'
			        }
			      },
			      splitLine: {
			        lineStyle:{
			        	type:'dashed'
			        }
			      }
			    }],
			    series: [{
			      name: '核销率',
			      type: 'line',
			      symbol:'circle',
			      lineStyle: {
			        normal: {
			          color: '#017da9',
			          width: 1
			        },
			        type:'dashed'
			      },
			      itemStyle: {
			        normal: {
			          color: '#017da9',
			          borderWidth: 10
			        }
			      },
			      symbolSize: 6,
			      data:hql
			    }, {
			      name: '核券数',
			      type: 'bar',
			      stack: '总量',
			      itemStyle: {
			        normal: {
			          color: '#ff9c66'
			        }
			      },
			      data: hq_num,
			      xAxisIndex: 1
			    },{
			      name: '领券数',
			      type: 'bar',
			      stack: '总量',
			      itemStyle: {
			        normal: {
			          color: '#ccc'
			        }
			      },
			      data: lq_num,
			      xAxisIndex: 1
			    }],
			    legend: {
			      data: ['核券数', '领券数','核销率'],
			      top: 30,
			      left:95
			    },
			    grid: {
			      left: 80,
			      top: 100,
			      right: 135,
			      bottom:100
			    }
      };
        return option;
    }
    updateChart(props) {
        const option = this.getOption(props);
        this.chartInstance.setOption(option);
    }

    

    render() {
    	const {handleChange,width,height}=this.props;
        return (
            <div className={styles.labelall}>
            	<div className={styles.labelshun}>
            		<p>排序<Icon type="arrow-down" /></p>

            		<Select onChange={handleChange} defaultValue="核券数"  style={{ width: 120 }}>
				      <Option value="核券数">核券数</Option>
				      <Option value="领券数">领券数</Option>
				      <Option value="核销率">核销率</Option>
				    </Select>
				    <p className={styles.goodskind}>(商品种类)<br/><span style={{position: 'relative',top: '-10px'}}>(核销数)</span></p>
            	</div>
            	<div ref={dom => this._dom = dom} style={{
	                width,
	                height
	            }}></div>
            </div>
        )
    }
}
