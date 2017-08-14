import React, { PropTypes, Component } from 'react';
import {Message} from "antd";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Newdata} from 'components/admin/TagManagement';
import XLSX from 'xlsx';
import * as commodityTagActionCreators from 'redux/modules/commodityTag';
var that;

var _num = 0;

@connect(
  ({commodityTag}) => ({
    newdate: commodityTag.newdate,
    newdateload:commodityTag.newdateload
  }),
  dispatch => bindActionCreators(commodityTagActionCreators, dispatch),
)

export default class NewdataContainer extends Component{
  state={
    columns: [{
      title: '商品名称',
      dataIndex: '商品名称',
      key: '商品名称'
    }, {
      title: '商品条码',
      dataIndex: '商品条码',
      key: '商品条码',
    }, {
      title: '所属品牌',
      dataIndex: '所属品牌',
      key: '所属品牌',
    }, {
      title: '所属品类',
      dataIndex: '所属品类',
      key: '所属品类',
    }, {
      title: '零售价',
      dataIndex: '零售价',
      key: '零售价',
    }],
    formdate:'',
    num:0,
    numcontent:0,
    allcontentnameGoodsContent:0,
    showtitle:false,
    showrepeat:false,
    titlecontent:'',
    repeatcontent:'',
    alldate:[],
    filename:'',
  }

  componentDidMount(){
    var newdatelist=this.props.newdatelist();
    that=this;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible === true && _num === 0) {
      _num = 1;
    } 

    if (nextProps.visible === false && _num === 1) {
      this.props.newdatelist();
      _num = 1;
      this.setState({
        formdate:[],
        showtitle:false,
        showrepeat:false,
        alldate:[],
        numcontent: 1
      })
    } 

  }

  importf(e){
    var wb;
    var rABS=false;
    var obj=e.target;

    if(!obj.files) {
        return;
    }
   that.setState({
     formdate:obj.files[0]
   })
   var filename=obj.files[0].name;
   that.setState({
     filename:encodeURI(filename)
   })

   var filenamex=filename.substring(filename.lastIndexOf("."),filename.length)
   if(filenamex=='.xlsx'||filenamex=='.cvs'||filenamex=='.xls'){
         that.setState({
           num:1
         })
        var f = obj.files[0];
        var reader = new FileReader();
        const form=new FormData();
        form.append("goodsfile",obj.files[0]);

        reader.onload = function(e) {
            var data = e.target.result;
            if(rABS) {
                wb = XLSX.read(btoa(fixdata(data)), {
                    type: 'base64'
                })
            }else{
                wb = XLSX.read(data, {
                    type: 'binary'
                })

            }
            var allcontentname=XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]] );

            var len=allcontentname.length;

            for(var i=0;i<len;i++){
              var allcontentnameGoods=allcontentname[i].商品条码;
              var allcontentnameGoodslen=allcontentnameGoods.length;
              for(var j=0;j<allcontentnameGoodslen;j++){
                if(Number(allcontentnameGoods[j])>=0){
                  console.log("nothing")
                }else{
                  that.setState({
                    num:10
                  })
                }
              }

              if(allcontentname[i].商品名称!=undefined&&allcontentname[i].商品条码!=undefined&&allcontentname[i].所属品牌!=undefined&&allcontentname[i].所属品类!=undefined){
                that.setState({
                    numcontent:1
                })

              }else{
                that.setState({
                    numcontent:0
                })
              }
            }
            
            if(that.state.numcontent==0){
              Message.error("文件内容有误");
            }else{
              that.props.newdatelistload(form);
              that.props.newdatelist(XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]] ))
            }
            
            that.setState({
              alldate:XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]] )
            })
            
        };
        if(rABS) {
            reader.readAsArrayBuffer(f);
        } else {
            reader.readAsBinaryString(f);
        }
    }else{
      Message.error("上传文件格式错误");
    }
    
  }

  fixdata(data) { //文件流转BinaryString
      var o = "",
          l = 0,
          w = 10240;
      for(; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
      o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
      return o;
  }

  handlenewdate(){
      if(this.state.num==0){
        Message.error("请上传文件")
      }else if(this.state.num==10){
        Message.error("69码格式错误，请修改为文本型数字格式后重新上传，或使用wps格式上传");
      }else{
        if(this.state.numcontent==0){
          Message.error("文件内容有误")
        }else{
          const form=new FormData();
          form.append("goodsfile",this.state.formdate);
          this.props.newdatelistload(form);
          var newdateload=this.props.newdateload;
          if(newdateload.status==true){
            Message.success(newdateload.message);
            this.setState({
              showtitle:false
            })
            if(newdateload.jsondata.data.repeat!=undefined){
              this.setState({
                showrepeat:true
              })
              this.setState({
                repeatcontent:newdateload.jsondata.data.repeat
              })
            }
          }else if(newdateload.status==false) {
            this.setState({
              showtitle:true
            })
            this.setState({
              titlecontent:newdateload.jsondata.data.content
            })
          }
        }

      }
      // this.props.newdatelistload();

  }

  hanldeclose(){
    this.setState({
      showtitle:false
    })
  }

  hanldecloserepeat(){
    this.setState({
      showrepeat:false
    })
  }

  handledown(){
    
        var json=[{
            "序号":"序号",
            "商品名称":"商品名称",
            "商品条码":"商品条码",
            "所属品牌":"所属品牌",
            "所属品类":"所属品类",
            "零售价":"零售价",
            "状态":"状态"
        },{
            "序号":"1",
            "商品名称":"伊利金典低脂纯牛奶250ML*12/箱",
            "商品条码":"6907992507385",
            "所属品牌":"伊利",
            "所属品类":"奶制品",
            "零售价":"￥68.00",
            "状态":"启用"
        },{
            "序号":"2",
            "商品名称":"伊利金典纯牛奶250ML*12/箱",
            "商品条码":"6907992510835",
            "所属品牌":"伊利",
            "所属品类":"奶制品",
            "零售价":"￥65.00",
            "状态":"启用"
        }];
        var k;
        var type;
        var tmpDown;
        var keyMap = [];//获取键
        for(k in json[0]) {
            keyMap.push(k);
        }
        var tmpdata = [];//用来保存转换好的json
        json.map((v, i) => keyMap.map((k, j) => Object.assign({}, {
            v: v[k],
            position: (j > 25 ? getCharCol(j) : String.fromCharCode(65 + j)) + (i + 1)
        }))).reduce((prev, next) => prev.concat(next)).forEach((v, i) => tmpdata[v.position] = {
            v: v.v
        });
        var outputPos = Object.keys(tmpdata); //设置区域,比如表格从A1到D10
        var tmpWB = {
            SheetNames: ['mySheet'], //保存的表标题
            Sheets: {
                'mySheet': Object.assign({},
                    tmpdata, //内容
                    {
                        '!ref': outputPos[0] + ':' + outputPos[outputPos.length - 1] //设置填充区域
                    })
            }
        };
        tmpDown = new Blob([s2ab(XLSX.write(tmpWB,
            {bookType: (type == undefined ? 'xlsx':type),bookSST: false, type: 'binary'}//这里的数据是用来定义导出的格式类型
            ))], {
            type: ""
        }); //创建二进制对象写入转换好的字节流
        var href = URL.createObjectURL(tmpDown); //创建对象超链接
        document.getElementById("hf").href = href; //绑定a标签
        document.getElementById("hf").click(); //模拟点击实现下载
        setTimeout(function() { //延时释放
            URL.revokeObjectURL(tmpDown); //用URL.revokeObjectURL()来释放这个object URL
        }, 100);

        function s2ab(s) { //字符串转字符流
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for(var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
  }


  getCharCol(n) {
      let temCol = '',
          s = '',
          m = 0
      while(n > 0) {
          m = n % 26 + 1
          s = String.fromCharCode(m + 64) + s
          n = (n - m) / 26
      }
      return s
  }

  handleCancel(){
    this.props.Getvisible(false);
  }
  render(){
    var newdate=this.props.newdate;
    
    const { visible } = this.props;
    return(
        <Newdata handleCancel={:: this.handleCancel} filename={this.state.filename} handledown={:: this.handledown} hanldecloserepeat={:: this.hanldecloserepeat} showrepeat={this.state.showrepeat} repeatcontent={this.state.repeatcontent} titlecontent={this.state.titlecontent} hanldeclose={:: this.hanldeclose} showtitle={this.state.showtitle} importf={this.importf} newdate={newdate} columns={this.state.columns} handlenewdate={:: this.handlenewdate}/>
    )
  }
}
