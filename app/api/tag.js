import axios from 'axios';
import {hosts} from 'config/constants';
import { pickBy } from 'lodash/fp';
import store from 'config/store.js';
import md5 from "md5";
import { PUBLICKEY, PRIVATEKEY, host } from 'config/constants';
import { generateAuthFields,isValidField } from 'helpers/util';



function formatProduct(list) {
  return list.map((item,idx) => ({
    ...item,
    key: parseInt(idx) + 1
  }));
}


//获取标签列表
export function getUserLabelList() {
    const user_code=store.getState().auth.saasId;
    // const user_code='NN0002';
    const time = Math.round(new Date().getTime()/1000);
    const hash= md5("GET"+user_code+time+PRIVATEKEY);
    const sign=PUBLICKEY+":"+hash;
    const muData = ''+user_code+'/'+sign+'/'+time+'';
    return axios.get(hosts+'/getSPLabelList/'+muData)
      .then(data => ({
        dataSource:formatProduct(data.data.data),
        total: data.data.total
      }));
}

//标签搜索模糊匹配
export function getUsersLabelListBySearch(label_name,from,to,label_type,status) {
  const user_code = store.getState().auth.saasId;
  // const user_code='NN0002';
  const time = Math.round(new Date().getTime()/1000);
  const hash= md5("GET"+user_code+time+PRIVATEKEY);
  const sign=PUBLICKEY+":"+hash;
  var muData =''+user_code+'/'+label_name+'/'+from+'/'+to+'/'+label_type+'/'+status+'/'+sign+'/'+time+'';
  return axios.get(hosts+'/getUsersLabelListBySearch/'+muData)
    .then(data => formatProduct(data.data.data));
}

//标签详情
export function getUserLabelDetail(label_name) {
  const user_code = store.getState().auth.saasId;
  // const user_code='NN0002';
  const time = Math.round(new Date().getTime()/1000);
  const hash= md5("GET"+user_code+time+PRIVATEKEY);
  const sign=PUBLICKEY+":"+hash;
  var muData =''+user_code+'/'+label_name+'/'+sign+'/'+time+'';
  return axios.get(hosts+'/getUsersLabelDetail/'+muData)
    .then(data => (
      data:data.data.data
    ));
}

//商品列表
export function getGoodsLabelList(page,goods_name,goods_id,catname,price,avalibale) {
  var saasId = store.getState().auth.saasId;
  const muData = 'account_id='+saasId+'&goods_name='+goods_name+'&goods_id='+goods_id+'&catname='+catname+'&price='+price+'&avalibale='+avalibale+'&page='+page+'';
  // return axios.get( hosts + '/getGoodsLabelList?'+muData)
  return axios.get(hosts+'/getGoodsLabelList?'+muData)
    .then(data => ({
      dataSource:formatProduct(data.data.data),
      total: data.data.total,
    }));
}

//新增商品信息
  export function addGoodsLabel(goods_name,goods_id,price,catname,avalibale,pic) {
    var saasId = store.getState().auth.saasId;
    const muData = 'account_id='+saasId+'&goods_name='+goods_name+'&goods_id='+goods_id+'&price='+price+'&catname='+catname+'&avalibale='+avalibale+'&pic='+pic+'';
    return axios.get(hosts+'/addGoodsLabel?'+muData)
      .then(data => ({
        dataId:data.data.jsondata.data
      }));
  }


//查询一条商品信息
export function getGoodsLabelDetail(id) {
  return axios.get(hosts+'/getGoodsLabelDetail?'+'id='+id+'')
    .then(data => ({
      editdata:data.data.data,
      status:data.status
    }));
}

//修改商品信息
  export function updateGoodsLabel(id,goods_name,goods_id,price,catname,avalibale,pic) {
    var saasId = store.getState().auth.saasId;
    const muData = 'id='+id+'&account_id='+saasId+'&goods_name='+goods_name+'&goods_id='+goods_id+'&price='+price+'&catname='+catname+'&avalibale='+avalibale+'&pic='+pic+'';
    return axios.get( hosts+'/updateGoodsLabel?'+muData)
      .then(data => ({
        dataId:data.data.jsondata.data
      }));
  }

//判断商品69码在库中是否存在
export function checkGoodsId(goods_id) {
  var saasId = store.getState().auth.saasId;
  const muData = 'account_id='+saasId+'&goods_id='+goods_id+'';
  return axios.get(hosts+'/checkGoodsId?'+muData)
    .then(data => ({
      data:data.data
    }));
}


  //批量
  export function newdata(form){
      var saasId = store.getState().auth.saasId;
      return axios.post(hosts+'/loadGoodsLabelFile?account_id='+saasId+'',form,{
        method:'post',
        headers:{'Content-Type': 'multipart/form-data'}
      })
      .then(data=>data.data)
  }


//门店
export function getMarketLabelList() {
  var saasId = store.getState().auth.saasId;
  const muData = 'saasid='+saasId+'';
  return axios.get(hosts+'/market/getMarketList?'+muData)
    .then(data =>formatProduct(data.data.data));
}
//门店管理列表搜索功能
export function searchMarketList(storename,markettype,status) {
  var saasId = store.getState().auth.saasId;
  const muData = 'saasid='+saasId+'&storename='+storename+'&markettype='+markettype+'&status='+status+'';
  return axios.get(hosts+'/market/searchMarketList?'+muData)
    .then(data =>formatProduct(data.data.data));
}

//编辑门店信息
export function updateMarketInfo(id,storename,markettype,promoters,promoters_phone,status) {

  const muData = 'id='+id+'&storename='+storename+'&markettype='+markettype+'&promoters='+trim(promoters)+'&promoters_phone='+trim(promoters_phone)+'&status='+status+'';
  return axios.get(hosts+'/market/updateMarketInfo?'+muData)
    .then(data =>data.data.data);
}

//获取自定义标签内容
export function getSPlatBaseLabelDao() {
    const saasId=store.getState().auth.saasId;
    const time = Math.round(new Date().getTime()/1000);
    const hash= md5("GET"+saasId+time+PRIVATEKEY);
    const sign=PUBLICKEY+":"+hash;
    const miuData = ''+saasId+'/'+sign+'/'+time+'';
    return axios.get(hosts+'/getSPlatBaseLabelDao/'+miuData)
        .then(data=>data.data.data)
}

//判断标签是否存在
export function getLabelExit(labelname) {
    const saasId=store.getState().auth.saasId;
    const time = Math.round(new Date().getTime()/1000);
    const hash= md5("GET"+saasId+time+PRIVATEKEY);
    const sign=PUBLICKEY+":"+hash;
    const miuData = ''+saasId+'/'+labelname+'/'+sign+'/'+time+'';
    return axios.get(hosts+'/getLabelExit/'+miuData)
        .then(data=>data.data)
}

//获取圈人比例人数
export function getLabelCountAndRate(queryData) {
    const saasId=store.getState().auth.saasId;
    const time = Math.round(new Date().getTime()/1000);
    const hash= md5("GET"+saasId+time+PRIVATEKEY);
    const sign=PUBLICKEY+":"+hash;
    const miuData = ''+saasId+'/'+sign+'/'+time+'';
    const data = {
        ...queryData,
        label_name: null,
        user_code: saasId,
        timeStamp: time,
        sign: sign
    }

    return axios.post(hosts+'/getLabelCountAndRate',data)
      .then(data=>data.data.data)
}



//新增自定义标签
export function addNewLabel(queryData) {
    const saasId=store.getState().auth.saasId;
    const time = Math.round(new Date().getTime()/1000);
    const hash= md5("GET"+saasId+time+PRIVATEKEY);
    const sign=PUBLICKEY+":"+hash;
    const miuData = ''+saasId+'/'+sign+'/'+time+'';
    const data = {
        ...queryData,
        user_code: saasId,
        timeStamp: time,
        sign: sign
    }

    return axios.post(hosts+'/addNewLabel',data)
        .then(data=>{
          // data.data
        })
}



function trim(str){ //删除左右两端的空格
  return str.replace(/(^\s*)|(\s*$)/g, "");
}
