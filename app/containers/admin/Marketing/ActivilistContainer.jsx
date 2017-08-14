import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {ActivityList} from 'components/admin';
import * as styles from 'components/admin/Marketing/styles.css';
import * as activilistActionCreators from 'redux/modules/activilist';


@connect(
  ({activilist}) => ({
    getdate: activilist.getdate,
    getdateSearch:activilist.getdateSearch,
    getdateSearchHeight:activilist.getdateSearchHeight,
    getdateDetail:activilist.getdateDetail,
    getdateUpdate:activilist.getdateUpdate,
    getdateDelete:activilist.getdateDelete,
    getdateQuerydetail:activilist.getdateQuerydetail
  }),
  dispatch => bindActionCreators(activilistActionCreators, dispatch),
)

export default class ActivilistContainer extends Component {
  static propTypes = {

  }
  state={
    show:false,
    showtitle:false,
    showpicture:false,
    showpeople:false,
    showNonepeople:false,
    picContent:'',
    marketListPeople:'',
    chose:"1",
    hide:true,
    searchstatu:0,
    num:0,
    marketList:'',
    activeid:'',
    activeName:'',
    columns: [{
      title: '序号',
      dataIndex: 'goodsID',
      key: 'goodsID'
    }, {
      title: '活动名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '券种类',
      dataIndex: 'kind',
      key: 'kind',
    }, {
      title: '活动时间',
      dataIndex: 'time',
      key: 'time',
    }, {
      title: '总预算',
      dataIndex: 'budget',
      key: 'money',
    }, {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },{
      title: '操作',
      key: 'action',
      render: (text, record,index) => (
        <span>
          <p className={record.status=="已结束"?styles.clicksearchB:styles.clicksearchC} data-id={index} onClick={(e,id,goodsID)=> this.handleClick(e,record.id,record.goodsID)}>查看详情</p>
        </span>
      ),
    }]
  }
  componentDidMount() {
    const getdate = this.props.datelist();
  }
  handleClick(e,id,goodsID){
    this.setState({
      activeid:id
    })
    this.setState({
        num:goodsID
    })
    this.setState({
        show:true
    })
    const getdateDetail = this.props.datelistDetail(id);
  }

  closeClick(){
    this.setState({
        show:false
    })
    this.setState({
      showtitle:false
    })
    this.setState({
      showpeople:false
    })
    this.setState({
      showpicture:false
    })
    this.setState({
      showNonepeople:false
    })
  }

  handlemenu(){
    this.setState({
        hide:!this.state.hide
    })
  }

  handleSearch(){
    this.setState({
        hide:!this.state.hide
    })
    const getdateSearchHeight = this.props.datelistSearchHeight(this.state.activeName,this.state.chose);

    this.setState({
      searchstatu:2
    })

    document.getElementById('searchIpt').value=""
  }

  handleSearchWork(value){
    const getdateSearch = this.props.datelistSearch(value);
    if(value==""){
      this.setState({
        searchstatu:0
      })
    }else{
      this.setState({
        searchstatu:1
      })
    }
  }

  onChange(e){
    if(e.target.value==""){
        this.setState({
          searchstatu:0
        })
    }
  }

  handleChose(e){
      var id=e.target.getAttribute('data-id');
      this.setState({
          chose:id
      })
  }

  hightChange(e){
      this.setState({
        activeName:e.target.value
      })
  }

  handlereset(){
    this.setState({
        chose:1
    })
    this.setState({
      searchstatu:0
    })
    document.getElementById('searchIpt').value=""
  }

  cancel(){
    // console.log("取消下架")
  }

  confirm(){
    // console.log("确定下架")
    this.props.datelistUpdate(this.state.activeid);
    setTimeout(e=>{
        this.props.datelist();
    },200);
    this.setState({
      searchstatu:0
    })
    this.setState({
      show:false
    })
    this.setState({
      chose:5
    })
  }

  handleDelete(){
      this.props.datelistDelete(this.state.activeid,this.props.getdateDetail.tempActid);
      this.props.datelistUpdate(this.state.activeid);
      setTimeout(e=>{
          this.props.datelist();
      },200);
      this.setState({
        searchstatu:0
      })
      this.setState({
        show:false
      })
  }

  handleSeeAll(){
    this.setState({
      showtitle:true
    })
    const getdateDetail=this.props.getdateDetail;
    this.setState({
      marketList:getdateDetail.market
    })
  }

  handleSeeAllpeple(){
    this.setState({
      showpeople:true
    })
    const getdateDetail=this.props.getdateDetail;
    this.setState({
      marketListPeople:getdateDetail.tags
    })
  }

  handleWatchInside(e){
    var numPic=e.target.getAttribute('data-id')*1;
    this.setState({
      showpicture:true
    })
    const getdateDetail=this.props.getdateDetail;
    const pubid=getdateDetail.publist[numPic].pubid;
    this.props.datelistQuerydetail(pubid);
  }

  handleCloseAll(){
    this.setState({
      showtitle:false
    })
    this.setState({
      showpeople:false
    })
    this.setState({
      showpicture:false
    })
    this.setState({
      showNonepeople:false
    })
  }

  handleSeeNonepeple(){
    this.setState({
      showNonepeople:true
    })
  }

  render() {
    const getdateDetail=this.props.getdateDetail;
    const getdateUpdate=this.props.getdateUpdate;
    const getdateQuerydetail=this.props.getdateQuerydetail;

    const dataSource=[];
    if(this.state.searchstatu==0){
      const getdate = this.props.getdate;
      const len=getdate.length;
      for(var i=0;i<len;i++){
        dataSource.push({
          key:i,
          goodsID:i+1,
          name:getdate[i].name,
          kind:getdate[i].kind,
          budget:getdate[i].budget,
          status:getdate[i].status,
          time:getdate[i].starttime+"~"+getdate[i].endtime,
          id:getdate[i].id
        })
      }
    }else if(this.state.searchstatu==1){
      const getdate = this.props.getdateSearch;
      const len=getdate.length;
      for(var i=0;i<len;i++){
        dataSource.push({
          key:i,
          goodsID:i+1,
          name:getdate[i].name,
          kind:getdate[i].kind,
          budget:getdate[i].budget,
          status:getdate[i].status,
          time:getdate[i].starttime+"~"+getdate[i].endtime,
          id:getdate[i].id
        })
      }
    }else if(this.state.searchstatu==2){
      const getdate = this.props.getdateSearchHeight;
      const len=getdate.length;
      for(var i=0;i<len;i++){
        dataSource.push({
          key:i,
          goodsID:i+1,
          name:getdate[i].name,
          kind:getdate[i].kind,
          budget:getdate[i].budget,
          status:getdate[i].status,
          time:getdate[i].starttime+"~"+getdate[i].endtime,
          id:getdate[i].id
        })
      }
    }
    return (
      <ActivityList showNonepeople={this.state.showNonepeople} handleSeeNonepeple={:: this.handleSeeNonepeple} queryDetail={getdateQuerydetail} picContent={this.state.picContent} showpicture={this.state.showpicture} handleWatchInside={:: this.handleWatchInside} marketListPeople={this.state.marketListPeople} handleSeeAllpeple={:: this.handleSeeAllpeple} showpeople={this.state.showpeople} marketList={this.state.marketList} handleCloseAll={:: this.handleCloseAll} handleDelete={:: this.handleDelete} handleSeeAll={:: this.handleSeeAll} showtitle={this.state.showtitle} getdateDetail={getdateDetail} confirm={:: this.confirm} cancel={:: this.cancel} dataSource={dataSource} handlereset={:: this.handlereset} onChange={:: this.onChange} handleChose={:: this.handleChose} chose={this.state.chose} show={this.state.show} hide={this.state.hide} columns={this.state.columns} closeClick={:: this.closeClick} handlemenu={:: this.handlemenu} handleSearch={:: this.handleSearch} num={this.state.num} handleSearchWork={:: this.handleSearchWork} hightChange={:: this.hightChange}/>
    );
  }
}
