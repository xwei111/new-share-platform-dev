import axios from 'axios';
import { host,hosts } from 'config/constants';
import { generateAuthFields } from 'helpers/util';
import store from 'config/store.js';

Array.prototype.max = function(){ 
    return Math.max.apply({},this) 
}

function ObjStory(name, value) {
    this.question = name;
    this.percent = parseFloat(value);
}

// 各地区活动效果分析_省份
export function marketVerificationProvince(activeid) {
    return axios.get(hosts+'/gxpt/marketUsecouponEffDetail_province/?active_id='+activeid)
        .then(data => data.data.data)
}

// 各地区活动效果分析_城市
export function marketUsecouponEffDetailCity(activeid,cityname) {
    return axios.get(hosts+'/gxpt/marketUsecouponEffDetail_city/?active_id='+activeid+'&provinceName='+cityname)
        .then(data => data.data.data)
}

// 各地区活动效果分析_门店
export function marketUsecouponEffDetailMarkets(activeid,cityname) {
    return axios.get(hosts+'/gxpt/marketUsecouponEffDetail_market/?active_id='+activeid+'&cityName='+cityname)
        .then(data => data.data.data)
}

// 各门店类型活动效果分析-核券总数
export function useCouponTotal(activeid) {
    return axios.get(hosts+'/gxpt/useCouponTotal/?active_id='+activeid)
        .then(data => {
            const $data = data.data.data;
            return $data
        })
}

// 各门店类型活动效果分析-店均核销
export function useCouponMarketAvg(activeid) {
    return axios.get(hosts+'/gxpt/useCouponMarketAvg/?active_id='+activeid)
        .then(data => data.data.data)
}

// 各门店类型活动效果分析-客单价
export function avgPrice(activeid) {
    return axios.get(hosts+'/gxpt/avgPrice/?active_id='+activeid)
        .then(data => data.data.data)
}

// 门店类型时段-核销分析的数据（全部，周末，周间）
export function getActiveMarketTimeAll(active_id) {
  return axios.get(hosts+`/gxpt/getActiveMarketTimeAll/`, {
    params: {
      active_id: active_id
      }
  })
  .then(data => ({
      data:JSON.parse(data.data.data)
    }))
  .then(data =>({
    all:data.data.all,
    workday:data.data.workday,
    weekend:data.data.weekend,
  }))
}


// 门店类型星期-核销分析-核销量+核销金额
export function getActiveMarketTimeWeek(active_id) {
  return axios.get(hosts+`/gxpt/getActiveMarketTimeWeek/`, {
    params: {
      active_id: active_id
      }
  })
  .then(data => ({
      data:JSON.parse(data.data.data)
    }))
  .then(data =>({
    amount:data.data.amount,
    num:data.data.num,
  }))
}

export function getActiveChannelAll(activeid) {
    return axios.get(hosts+'/gxpt/getActiveChannelAll/?active_id='+activeid)
        .then(data => data.data.data)
}

function formatProduct(list) {
    return list.map((item,idx) => ({
        marketName: item.marketName,
        hqNum: item.hqNum,
        x: parseFloat(item.totalTimes),
        y: parseFloat(item.avgFee),
        xx: parseFloat(item.avgTotalTimes),
        yy: parseFloat(item.avgAvgFee)
    }));
}


// 门店消费能力与活动效果评估
export function marketPaymentLevel(activeid,start,end) {
    return axios.get(hosts+'/gxpt/marketPaymentLevel/?active_id='+activeid+'&startNo='+start+'&endNo='+end)
        .then(data => formatProduct(data.data.data))
}


// 活动信息及数据表现页面 根据active_id 获取此历史活动的相关信息
export function findHistoryById(activeid) {
    return axios.get(hosts+'/history/findHistoryById/?active_id='+activeid+'')
        .then(data => data.data.data)
}

// 获取活动详情
export function activeAnsysSelect(activeid) {
    return axios.get(hosts+'/gxpt/activeAnsysSelect/?active_id='+activeid+'')
        .then(data => data.data.data)
}

// 获取最近创建的6档活动详情
export function activeAnsysSelectAll() {
    const saasid=store.getState().auth.saasId;
    return axios.get(hosts+'/gxpt/activeAnsysSelectAll/?saasid='+saasid)
        .then(data => data.data.data)
}