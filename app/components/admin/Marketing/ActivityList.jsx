import React, {PropTypes} from 'react';
import { Row, Col, Spin, Tooltip ,Input,Menu,Dropdown,Icon,Table,Button,Pagination,Popconfirm,Tag} from 'antd';
import globalStyles from 'sharedStyles/global.css';
import * as styles from './styles.css';

const Search = Input.Search;

export default function ActivityList({showNonepeople,queryDetail,handleWatchInside,marketListPeople,showpicture,picContent,showpeople,marketList,dataSource,showtitle,show,columns,closeClick,handlemenu,hide,handleSearch,num,handleSearchWork,onChange,chose,handleChose,hightChange,handlereset,getdateDetail,confirm,cancel,handleDelete,handleSeeAll,handleCloseAll,handleSeeAllpeple,handleSeeNonepeple}) {
    var queryDetailDate=[];
    var imgSrc=[];
    var mList=[];
    var mListPeople=[];
    if(queryDetail.data!=undefined){
      queryDetailDate=queryDetail.data;
      var channelName='';
      var tyeName='';
      var starTm=queryDetailDate.starttime.substring(0,10);
      var endTm=queryDetailDate.endtime.substring(0,10);
      var channel=queryDetailDate.channel;
      var typedate=queryDetailDate.type;
      var budgetMoney=queryDetailDate.budget*1/100;
      var couponfeeMoney=queryDetailDate.couponfee*1/100;
      if(channel=="z"){
        channelName="支付宝"
      }else if(channel=="w"){
        channelName="微信"
      }else{
        channelName="会花"
      }
      if(typedate=="1"){
        tyeName="单品券"
      }else if(typedate=="2"){
        tyeName="品牌满减券"
      }else if(typedate=="3"){
        tyeName="全场券"
      }else if(typedate=="4"){
        tyeName="生鲜券"
      }else if(typedate=="5"){
        tyeName="返券"
      }else if(typedate=="6"){
        tyeName="单品折扣券"
      }else if(typedate=="7"){
        tyeName="全场折扣券"
      }
    }

    if(marketList){
      for(var i=0;i<marketList.length;i++){
        mList.push(
          <li className={styles.marklist}>{marketList[i].name}</li>
        )
      }
    }
    if(marketListPeople){
      for(var i=0;i<marketListPeople.length;i++){
        mListPeople.push(
          <li className={styles.marklist}>{marketListPeople[i].tag}</li>
        )
      }
    }
    if(getdateDetail.publist!=undefined){
        for(var i=0;i<getdateDetail.publist.length;i++){
            imgSrc.push(
            <Col span={24}>
                <div key={i} className={styles.couponInfo}>
                  <p className={getdateDetail.publist[i].pic1_path==""?styles.couponPic:styles.hide}></p>
                  <img className={getdateDetail.publist[i].pic1_path==""?styles.hide:styles.couponPic} src={getdateDetail.publist[i].pic1_path}/>
                  <p className={styles.couponTit}>{getdateDetail.publist[i].couponname}</p>
                  <p className={styles.couponFee}>
                      <span>{getdateDetail.publist[i].couponfee*1/100}元</span>代金券</p>
                  <p data-id={i} onClick={handleWatchInside} className={styles.watchInside}>查看详情</p>
                </div>
            </Col>
            )
        }
    }
    const obje={total:dataSource.length,defaultPageSize:10,showSizeChanger:true,showQuickJumper:true,size: 'large'}
    var stating='';
    var obj = dataSource[num];
    if(obj==undefined){
      stating=0;
    }else{
      if(obj.status=="进行中"){
          stating=1
      }else if(obj.status=="未开始"){
          stating=2
      }else{
          stating=3
      }
    }
    return (
        <div>
            <div className={globalStyles.containerWidth}>
                <Row className={globalStyles.mainTopArea}>
                </Row>
            </div>
            <div className={styles.mainContainerrightC}>
                  <div className={styles.searchBigBox}>
                      <div className={styles.searchBox}>
                        <Search
                          id="search"
                          size='middle'
                          placeholder="请输入活动名称"
                          style={{ width: 180,height:26 }}
                          onSearch={handleSearchWork}
                          onChange={onChange}
                        />
                      </div>
                      <a onClick={handlemenu} className={styles.antdownC} id={hide==true?'':styles.antdownC}>
                        高级搜索 <Icon className={hide==true?'':styles.hide} type="down" />
                        <Icon className={hide==true?styles.hide:""} type="up" />
                      </a>
                  </div>
                  <div className={hide==true?styles.hide:''}>
                    <div className={styles.menu}>
                      <div className={styles.actyBox}>
                          <span className={styles.activeName}>营销活动名称 : </span>
                          <input id="searchIpt" onChange={hightChange} className={styles.activeInpt} type="text" placeholder='请输入"营销活动名称"'/>
                      </div>
                      <div className={styles.activeContent}>
                          <p>活动状态:</p>
                          <ul>
                              <li data-id="1" className={chose=="1"?styles.clickColor:''} onClick={handleChose}>不限</li>
                              <li data-id="2" className={chose=="2"?styles.clickColor:''} onClick={handleChose}>未开始</li>
                              <li data-id="3" className={chose=="3"?styles.clickColor:''} onClick={handleChose}>进行中</li>
                              <li data-id="4" className={chose=="4"?styles.clickColor:''} onClick={handleChose}>已结束</li>
                              <li data-id="5" className={chose=="5"?styles.clickColor:''} onClick={handleChose}>已下架</li>
                          </ul>
                      </div>
                      <div className={styles.activeButton}>
                          <p onClick={handlereset}>重置</p>
                          <div onClick={handleSearch}>查询</div>
                      </div>
                    </div>
                  </div>
            </div>
            <div className={styles.mainContainer}>
              <Table className={styles.tabC} style={{width:880}} size='middle' columns={columns} dataSource={dataSource} pagination={obje} />
            </div>
            <div>
              {show ?
                <div key="a">
                    <div className={styles.activityDetailsBox} id={show==true?styles.activityDetailsBox:''} style={{position: 'fixed',top: '40px'}}>
                        <div className={styles.header}>
                            <p>活动详情</p>
                            <Icon onClick={closeClick} className={styles.closeBox} type="close"/>
                        </div>
                        <div className={styles.detailBox}>
                          <h2 className={styles.actName}>{getdateDetail.name}</h2>
                          <Row style={{marginBottom:'16px'}} gutter={24}><Col span={6} className={styles.formLeft}>所用营销模板 :</Col><Col span={18}><span>{getdateDetail.footfall}</span></Col></Row>
                          <Row style={{marginBottom:'16px'}} gutter={24}><Col span={6} className={styles.formLeft}>活动时间 :</Col><Col span={18}><span>{getdateDetail.starttime}--{getdateDetail.endtime}</span></Col></Row>
                          <Row style={{marginBottom:'16px'}} gutter={24}><Col span={6} className={styles.formLeft}>活动总预算 :</Col><Col span={18}><span>{getdateDetail.budget}</span></Col></Row>
                          <Row style={{marginBottom:'16px'}} gutter={24}><Col span={6} className={styles.formLeft}>活动参与门店 :</Col><Col span={18}><span>{getdateDetail.market[0].name}等{getdateDetail.market.length}家门店</span><span onClick={handleSeeAll} className={styles.viewAll}>查看全部</span></Col></Row>
                          <Row style={{marginBottom:'16px'}} gutter={24}><Col span={6} className={styles.formLeft}>活动参与人群 :</Col><Col span={18}><span>{getdateDetail.tags[0].tag}<span className={getdateDetail.tags[0].tag==''?styles.hide:''}>等</span>{getdateDetail.tags[0].tag==''?0:getdateDetail.tags.length}个标签人群</span><span onClick={getdateDetail.tags[0].tag==''?handleSeeNonepeple:handleSeeAllpeple} className={styles.viewAll}>查看全部</span></Col></Row>
                          <Row style={{marginBottom:'16px'}} gutter={24}><Col span={6} className={styles.formLeft}>包含优惠券 :</Col>
                                  {imgSrc}
                          </Row>
                        </div>
                        <div className={styles.btnWrap} id={stating==3?styles.btnWrap:''}>
                            <Popconfirm title="你是否删除活动?" onConfirm={handleDelete} onCancel={cancel} okText="确定" cancelText="取消">
                                <Button className={stating==1||stating==3?styles.hide:''} size="small" type="primary">删除</Button>
                            </Popconfirm>
                            <Popconfirm title="你是否下架活动?" onConfirm={confirm} onCancel={cancel} okText="确定" cancelText="取消">
                                <Button className={stating==2||stating==3?styles.hide:''} size="small" type="primary">下架</Button>
                            </Popconfirm>
                        </div>
                        { showtitle?
                            <div className={styles.allContent}>
                              <div className={styles.titleTop}>
                                  <div className={styles.titleName}>活动参与门店</div>
                                  <Icon onClick={handleCloseAll} className={styles.titleX} type="close"/>
                              </div>
                              <div className={styles.titleList}>
                                <ul className={styles.titleUl}>
                                  {mList}
                                </ul>
                              </div>
                            </div>
                        :null}
                        { showpeople?
                            <div className={styles.allContent}>
                              <div className={styles.titleTop}>
                                  <div className={styles.titleName}>人群</div>
                                  <Icon onClick={handleCloseAll} className={styles.titleX} type="close"/>
                              </div>
                              <div className={styles.titleList}>
                                <ul className={styles.titleUl}>
                                  {mListPeople}
                                </ul>
                              </div>
                            </div>
                        :null}
                        { showNonepeople?
                            <div className={styles.allContentNonePeople}>
                                  暂无人群
                                  <Icon onClick={handleCloseAll} className={styles.titleXXX} type="close"/>
                            </div>
                        :null}
                        { showpicture?
                            <div className={styles.allContents}>
                              <div className={styles.titleTops}>
                                  {queryDetailDate.couponname}
                                  <Icon onClick={handleCloseAll} className={styles.titleXX} type="close"/>
                              </div>
                              <ul>
                                  <li><p className={styles.nameC}><span>券类型：</span></p><p className={styles.nameB}>{channelName}</p></li>
                                  <li><p className={styles.nameC}><span>券种类：</span></p><p className={styles.nameB}>{tyeName}</p></li>
                                  <li><p className={styles.nameC}><span>选择活动商品：</span></p><p className={styles.nameB}>{queryDetailDate.goodname}</p></li>
                                  <li><p className={styles.nameC}><span>总预算：</span></p><p className={styles.nameB}>{budgetMoney} &nbsp;&nbsp;元</p></li>
                                  <li><p className={styles.nameC}><span>券面额：</span></p><p className={styles.nameB}>{couponfeeMoney} &nbsp;&nbsp;元代金券</p></li>
                                  <li><p className={styles.nameC}><span>预计核销率：</span></p><p className={styles.nameB}>{queryDetailDate.expect}%</p></li>
                                  <li><p className={styles.nameC}><span>预计发放总量：</span></p><p className={styles.nameB}>{queryDetailDate.couponcount}&nbsp;&nbsp;张</p></li>
                                  <li><p className={styles.nameC}><span>个人领取限制：</span></p><p className={styles.nameB}>{queryDetailDate.count}&nbsp;&nbsp;张/人</p></li>
                                  <li><p className={styles.nameC}><span>券有效期：</span></p><p className={styles.nameB}>{starTm}~{endTm}</p></li>
                                  <li><p className={styles.nameC}><span>券领取时间：</span></p><p className={styles.nameB}>活动开始前&nbsp;&nbsp; {queryDetailDate.predays}&nbsp;&nbsp; 天领取</p></li>
                              </ul>
                            </div>
                        :null}
                    </div>
                </div>
               : null}
            </div>
        </div>
    );
}
