import React, {Component, PropTypes} from 'react';
import createG2 from 'g2-react';
import { Stat } from 'g2';
import styles from './styles.css';



export default class ChartsproductTwo extends Component {

    state={
      data: '',
      forceFit: true,
      width: 500,
      height: 620,
      plotCfg: {
        margin: [10, 50, 100, 85],
        border: {
            fill: '',
            radius: 20
          }
      },
    }
    
    isEmptyObject(obj) { //判断是否为一个空对象

        for (var key in obj) {
            return false
        };
        return true
    };

    componentDidMount(){
    	
    }

    render() {
        const allcontent=this.props.getdate;
        const goodsname=[];
        if(!this.isEmptyObject(allcontent)){
          var communityValueList=allcontent.communityValueList;
          var schoolDistrictValueList=allcontent.schoolDistrictValueList;
          var tradingAreaValueList=allcontent.tradingAreaValueList;
          var clen=communityValueList.length;
          var slen=schoolDistrictValueList.length;
          var tlen=tradingAreaValueList.length;
          function deletcopy(arr,len){
              for(var i=0;i<len;i++){
                  if(goodsname.indexOf(arr[i].couponName)==-1){
                      goodsname.push(arr[i].couponName)
                  }
              }
          }
          deletcopy(communityValueList,clen); 
          deletcopy(schoolDistrictValueList,slen);
          deletcopy(tradingAreaValueList,tlen);
        }
        if(goodsname.length>1){
          var Chart = createG2(chart => {
            
            chart.col('门店类型', {
              type: 'cat',
              values: ['商圈', '社区', '学区']
            });
            chart.col('优惠券', {
              type: 'cat',
              values: goodsname
            });
            chart.axis('门店类型', {
              title: '',
              grid: {
                line: {
                  stroke: '#d9d9d9',
                  lineWidth: 0,
                  lineDash: [2, 2]
                }
              }
            });

            chart.axis('优惠券', {
              title: '',
              grid: {
                line: {
                  stroke: '#d9d9d9',
                  lineWidth: 0,
                  lineDash: [2, 2]
                }
              },
              formatter:function(val){
                var couponname=val;
                var couponnameStrOne=couponname.substring(0,6);
                var couponnameStrTwo=couponname.substring(6,11);
                var couponnameString=couponnameStrOne+'\n'+couponnameStrTwo+'....';
                return couponnameString;
              }
            });
            chart.polygon()
              .position('门店类型*优惠券')
              .color('核券数量', '#fff0e9-#ff7931')
              .label('核券数量', {
                offset: -2,
                label: {
                  fill: '#000',
                  fontWeight: 'bold'
                }
              }).tooltip('门店类型*优惠券*核券数量')
              .style({
                lineWidth: 1,
                stroke:'#fff'
              });
             chart.legend(false);

            chart.render();      
          });
          var a=0;
          var a1=0;
          var a2=0;
          var a3=0;
          var a4=0;
          var a5=0;
          var b=-1;
          var c=-1;
          var s=-1;
          var numlist='';
          var datalistOne=[];
          var datalistTwo=[];
          var datalistThree=[];
          var datadeletecopyThree=[];
          var length=goodsname.length

          for(var i=0;i<length;i++){
            for(var j=0;j<tlen;j++){
              if(tradingAreaValueList[j].couponName==goodsname[i]){
                b=i
              }
            }
          }
          for(var i=0;i<length;i++){
            for(var j=0;j<clen;j++){
              if(communityValueList[j].couponName==goodsname[i]){
                c=i
              }
            }
          }
          for(var i=0;i<length;i++){
            for(var j=0;j<slen;j++){
              if(schoolDistrictValueList[j].couponName==goodsname[i]){
                s=i
              }
            }
          }
          if(tlen==length){
              for(var i=0;i<tlen;i++){
                datalistOne.push([0,a++,tradingAreaValueList[i].hq_num])
              }
          }else if(tlen<length){
                for(var i=0;i<length;i++){
                  datalistOne.push([0,a4++,0]);
                  for(var j=0;j<tlen;j++){
                    if(tradingAreaValueList[j].couponName==goodsname[i]){
                      datalistOne.push([0,i,tradingAreaValueList[j].hq_num])
                    }
                  }
                }
                var datalistOneLength=datalistOne.length
                for(var i=0;i<datalistOneLength;i++){
                  for(var j=0;j<datalistOneLength;j++){
                    if(datalistOne[i][1]==datalistOne[j][1]){
                      if(i!=j){
                        if(datalistOne[i][2]==0){
                          datalistOne[i][2]=''
                        }
                      }
                      
                    }
                  }
                }

          }
          if(clen==length){
              for(var i=0;i<clen;i++){
                datalistTwo.push([1,a1++,communityValueList[i].hq_num])
              }
          }else if(clen<length){ 
              for(var i=0;i<length;i++){
                datalistTwo.push([1,a5++,0]);
                for(var j=0;j<clen;j++){
                  if(communityValueList[j].couponName==goodsname[i]){
                    datalistTwo.push([1,i,communityValueList[j].hq_num])
                  }
                }
              }
              var datalistTwoLength=datalistTwo.length
              for(var i=0;i<datalistTwoLength;i++){
                for(var j=0;j<datalistTwoLength;j++){
                  if(datalistTwo[i][1]==datalistTwo[j][1]){
                    if(i!=j){
                      if(datalistTwo[i][2]==0){
                        datalistTwo[i][2]=''
                      }
                    }
                    
                  }
                }
              }
          }
          if(slen==length){
              for(var i=0;i<slen;i++){
                datalistThree.push([2,a2++,schoolDistrictValueList[i].hq_num])
              }
          }else if(slen<length){  
              for(var i=0;i<length;i++){
                datalistThree.push([2,a3++,0]);
                for(var j=0;j<slen;j++){
                  if(schoolDistrictValueList[j].couponName==goodsname[i]){
                    datalistThree.push([2,i,schoolDistrictValueList[j].hq_num])
                  }
                }
              }
              var datalistThreeLength=datalistThree.length
              for(var i=0;i<datalistThreeLength;i++){
                for(var j=0;j<datalistThreeLength;j++){
                  if(datalistThree[i][1]==datalistThree[j][1]){
                    if(i!=j){
                      if(datalistThree[i][2]==0){
                        datalistThree[i][2]=''
                      }
                    }
                    
                  }
                }
              }
          }

          
          var dataOne=datalistOne.concat(datalistTwo);
          var data=dataOne.concat(datalistThree);
          

          
          var source = [];
          for(var i = 0; i < data.length; i ++) {
              var item = data[i];
              var obj = {};
              obj.门店类型 = item[0];
              obj.优惠券 = item[1];
              obj.核券数量 = item[2];
              source.push(obj);
          }
          for(var i=0;i<source.length;i++){
            if(source[i].核券数量==''&&i<source.length-1){
              source[i].核券数量=source[i+1].核券数量||0
            }
          }
        }else{
        var Chart = createG2(chart => {
            chart.col('门店类型', {
              type: 'cat',
              values: ['商圈', '社区', '学区']
            });
            chart.col('优惠券', {
              type: 'cat',
              values: ['商品1']
            });
            chart.axis('门店类型', {
              title: '',
              grid: {
                line: {
                  stroke: '#d9d9d9',
                  lineWidth: 1,
                  lineDash: [2, 2]
                }
              }
            });
            chart.axis('优惠券', {
              title: ''
            });
            chart.polygon()
              .position('门店类型*优惠券')
              .label('核券数量', {
                offset: -2,
                label: {
                  fill: '#fff',
                  fontWeight: 'bold'
                }
              })
              .style({
                lineWidth: 0
              });
             chart.legend(false);
            chart.render();      
          });
          var data = [[0, 0,1]];
          var source = [];
          for(var i = 0; i < data.length; i ++) {
              var item = data[i];
              var obj = {};
              obj.门店类型 = item[0];
              obj.优惠券 = item[1];
              obj.核券数量 = item[2];
              source.push(obj);
          }
          for(var i=0;i<source.length;i++){
            if(source[i].核券数量==''&&i<source.length-1){
              source[i].核券数量=source[i+1].核券数量||0
            }
          }
        }
        
      
        

        return (
            <div className={styles.labelall}>
            	<Chart
	              data={source}
	              width={this.state.width}
	              height={this.state.height}
	              plotCfg={this.state.plotCfg}
	              forceFit={this.state.forceFit} />
              <p className={styles.kind}>(商品种类)</p>
              <p className={styles.dress}>(门店类型)</p>
            </div>
        )
    }
}
