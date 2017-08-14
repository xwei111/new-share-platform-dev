import axios from 'axios';
import md5 from "md5";
import {host,hosts} from 'config/constants';
import { generateAuthFields, dayCut } from 'helpers/util';
import { PUBLICKEY, PRIVATEKEY } from 'config/constants';
import store from 'config/store.js';


function formatProduct(list) {
  return list.map((item, idx) => ({
    ...item,
    key: item.label_name
  }));
}

function formatTag(list) {
//  const shiftList1 = {
//      label_name: '水果味爱好者'
//  };
//
//  const shiftList2 = {
//      label_name: '原味爱好者'
//  };
//
//  list.unshift(shiftList1,shiftList2);

  return list.map((item, idx) => ({
    ...item,
    key: item.label_name
  }))

}

function formatCoupon(list) {
    list.start=list.starttime.split(" ")[0];
    list.end=list.endtime.split(" ")[0];
    return list;
}

// 标签
export function fetchTagData() {
    const saasId=store.getState().auth.saasId;
    const time = Math.round(new Date().getTime()/1000);
    const hash= md5("GET"+saasId+time+PRIVATEKEY);
    const sign=PUBLICKEY+":"+hash;
    const muData = ''+saasId+'/'+sign+'/'+time+'';
    return axios.get(hosts+'/getSPLabelList/'+muData)
      .then(data => ({
        dataSource:formatTag(data.data.data),
        total: data.data.total
      }));
}
// 创建活动
export function createActivity(queryData) {
     return axios.get(`${host}/cp/active/active!addActiveGxpt.action`, {
        params: {...queryData}
     })
    .then(data => data.data);
}
//券查询
export function fetchTicketDetail(pubid) {
  return axios.get(`${host}/cp/coupon/c_querydetail.action`, {
    params: {...generateAuthFields(), pubid}
  })
    .then(data => formatCoupon(data.data.data));
}

//券删除
export function fetchTicketDelete(pubid,tempActid) {
  const account_id = store.getState().auth.loginname;
  return axios.get(`${host}/cp/operate/operate!deleteCouponBypubid.action`, {
    params: {account_id, pubid, tempActid}
  })
    .then(data => data.data);
}

//活动名筛选
export function queryActiveByName(activename) {
  const account_id = store.getState().auth.loginname;
  return axios.get(`${host}/cp/active/active!queryActiveByName.action`, {
    params: {account_id, activename}
  })
    .then(data => data.data);
}


//活动预测，基于活动id
export function getSPlatCoefficientDaoByActiveid(stores_cnt,goods) {
    const saasId=store.getState().auth.saasId;
    const active_id = store.getState().marketing.activityId;
    const active_name=store.getState().marketing.actName;
    const startTime=store.getState().marketing.startTime.split(" ")[0];
    const endTime=store.getState().marketing.endTime.split(" ")[0];
    const pres_trength = '0.5';
    let days_cnt = dayCut(startTime,endTime);

    if (goods == '') {
      goods = '米雅商品'
    }

    if (days_cnt == 0) {
      days_cnt = 1;
    }

    const time = Math.round(new Date().getTime()/1000);
    const hash= md5("GET"+saasId+time+PRIVATEKEY);
    const sign=PUBLICKEY+":"+hash;
    const miuData = ''+saasId+'/'+active_id+'/'+active_name+'/'+goods+'/'+pres_trength+'/'+stores_cnt+'/'+days_cnt+'/'+sign+'/'+time+'';
    return axios.get(hosts+'/getSPlatCoefficientDaoByActiveid/'+miuData)
        .then(data=>data.data)
}

//  获取活动预测值
export function getSPlatCoefficientDao(goods,pres_trength,op_trength,stores_cnt,is_hz,mresource_cnt,days_cnt,type) {
    const saasId=store.getState().auth.saasId;
    // const saasId='NN0002';
    const time = Math.round(new Date().getTime()/1000);
    const hash= md5("GET"+saasId+time+PRIVATEKEY);
    const sign=PUBLICKEY+":"+hash;
    const miuData = ''+saasId+'/'+goods+'/'+pres_trength+'/'+op_trength+'/'+stores_cnt+'/'+is_hz+'/'+mresource_cnt+'/'+days_cnt+'/'+type+'/'+sign+'/'+time+'';
    return axios.get(hosts+'/getSPlatCoefficientDao/'+miuData)
        .then(data=>data.data)
}

//  获取可优惠选项
export function getOptimizable(pres_trength,is_hz,mresource_cnt,type) {
    const saasId=store.getState().auth.saasId;
    // const saasId='NN0002';
    const time = Math.round(new Date().getTime()/1000);
    const hash= md5("GET"+saasId+time+PRIVATEKEY);
    const sign=PUBLICKEY+":"+hash;
    const miuData = ''+saasId+'/'+pres_trength+'/'+is_hz+'/'+mresource_cnt+'/'+type+'/'+sign+'/'+time+'';
    return axios.get(hosts+'/getOptimizable/'+miuData)
        .then(data=>data.data)
}
