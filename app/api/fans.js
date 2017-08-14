import axios from 'axios';
import { host, hosts } from 'config/constants';
import { generateAuthFields } from 'helpers/util';
import store from 'config/store';

Array.prototype.max = function(){ 
    return Math.max.apply({},this) 
}

function ObjStory(name, value) {
    this.question = name;
    this.percent = parseFloat(value);
}
//  粉丝地区分布_省份
export function marketVerificationProvince() {
    var saasId = store.getState().auth.saasId;
    return axios.get(hosts+'/gxpt/marketFansEffDetail_province?saasid='+saasId)
        .then(data => data.data.data)
}
//  粉丝地区分布_城市
export function marketUsecouponEffDetailCity(cityname) {
    var saasId = store.getState().auth.saasId;
    return axios.get(hosts+'/gxpt/marketFansEffDetail_city?saasid='+saasId+'&provinceName='+cityname)
        .then(data => data.data.data)
}
// 粉丝地区分布_门店
export function marketUsecouponEffDetailMarkets(cityname) {
    var saasId = store.getState().auth.saasId;
    return axios.get(hosts+'/gxpt/marketFansEffDetail_market?saasid='+saasId+'&cityName='+cityname)
        .then(data => data.data.data)
}

export function useCouponTotal(usecode) {
    var saasId = store.getState().auth.saasId;
    return axios.get(hosts+'/gxpt/marketFansDistribute?saasid='+saasId)
        .then(data => {
            const $data = data.data.data;
            return $data
        })
}

export function useCouponMarketAvg(usecode) {
    return axios.get(hosts+'/gxpt/useCouponMarketAvg/?active_id='+usecode)
        .then(data => data.data.data)
}

export function avgPrice(usecode) {
    return axios.get(hosts+'/gxpt/avgPrice/?active_id='+usecode)
        .then(data => data.data.data)
}

//粉丝等级分布
export function getFansNumber(active_id){
    const saasid=store.getState().auth.saasId;
    return axios.get(hosts+'/activeFans/getAllActiveFansNumTotal?saasid='+ saasid)
        .then(data=>data.data.data)
}