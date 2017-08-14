import {message} from 'antd';
import axios from 'axios';
import jsonp from 'jsonp';
import md5 from "md5";
import {host,hosts} from 'config/constants';
import {generateAuthFields,TODAY,new_signkey} from 'helpers/util';

import store from 'config/store.js';

// 获取活动列表
// export function fetchActivityList() {
//     return axios.get(`${host}/cp/coupon/query!queryActiveDropList.action`, {
//         params: {
//             ...generateAuthFields()
//         }
//     }).then(data => data.data.data.list);
// }

export function fetchActivityList() {
    const saasId = store.getState().auth.saasId;
    return axios.get(hosts+'/gxpt/activeNameList/?saasid='+saasId+'').then(data => JSON.parse(data.data.data));
}


export function realData(id) {
    const time = Math.round(new Date().getTime()/1000);
    let private_pw = 'miyacouponpassword';
    let public_pw = 'miyacoupon';
    let hash = md5("GET"+TODAY+time+private_pw);
    let sign=public_pw+":"+hash;

    const miuData = ''+TODAY+'/'+id+'/'+sign+'/'+time+'';

    const MapPromise = new Promise(function(resolve, reject) {
        jsonp('http://116.62.53.12/miyacouponplatform/rest/coupon/count/'+miuData, {prefix: 'getMessage',name: 'count',timeout : 20000}, function (err, data) {
            if (err) {
                reject(console.log(err.message));
            } else {
                resolve(data);
            }
        });
    })

    return MapPromise;

}
// 实时图标
export function realDataCharts(id) {
    const time = Math.round(new Date().getTime()/1000);
    let private_pw = 'miyacouponpassword';
    let public_pw = 'miyacoupon';
    let hash = md5("GET"+TODAY+time+private_pw);
    let sign=public_pw+":"+hash;

    const miuData = ''+TODAY+'/'+id+'/'+sign+'/'+time+'';

    const ChartsPromise = new Promise(function(resolve, reject) {
        jsonp('http://116.62.53.12/miyacouponplatform/rest/coupon/couponchart/'+miuData, {prefix: 'getMessage',name: 'couponchart',timeout : 20000}, function (err, data) {
            if (err) {
                reject(console.log(err.message));
            } else {
                resolve(data);
            }
        });
    })

    return ChartsPromise;

}


// 数据概要
export function dataOverview(queryData) {
    return axios.get(`${host}/cp/message/m_dataOverview.action`, {
    // return axios.get(`http://118.178.128.252/test/data.json`, {
        params: {
            ...generateAuthFields(),
            ...queryData
        }
    }).then(e => e.data.data)
}

// 数据走势图
export function dataCurve(queryData,otherData) {
    return axios.get(`${host}/cp/message/m_dataCurve.action`, {
        params: {
            ...generateAuthFields(),
            ...queryData,
            ...otherData
        }
    })
    .then(data => data.data.data)
    .then(data => ({
        pvuvData: data.map(item => ({day: item.day, pv: item.pv, uv: item.uv})).reduce((result, item) => {
            result.day.push(item.day);
            result.pv.push(item.pv);
            result.uv.push(item.uv);
            return result;
        }, {
            day: [],
            pv: [],
            uv: []
        }),
        couponData: data.map(item => ({day: item.day, cget: item.cget, cuse: item.cuse})).reduce((result, item) => {
            result.day.push(item.day);
            result.cget.push(item.cget);
            result.cuse.push(item.cuse);
            return result;
        }, {
            day: [],
            cget: [],
            cuse: []
        }),
        userData: data.map(item => ({day: item.day, uget: item.cget, uuse: item.cuse})).reduce((result, item) => {
            result.day.push(item.day);
            result.uget.push(item.uget);
            result.uuse.push(item.uuse);
            return result;
        }, {
            day: [],
            uget: [],
            uuse: []
        })
    }));
}

// 漏斗图
export function dataFunnel(queryData) {
    return axios.get(`${host}/cp/message/m_dataFunnel.action`, {
        params: {
            ...generateAuthFields(),
            ...queryData
        }
    }).then(data => data.data.data)
}

//用户数据分析
export function userDataAnalysis(queryData,type) {
    return axios.get(`${host}/cp/message/m_userDataAnalysis.action`, {
        params: {
            ...generateAuthFields(),
            ...queryData,
            queryType: type
        }
    }).then(data => {
        if (data.data.code == '200') {
            const dataSource = data.data.data;
            const dataSum = [dataSource.coupon,dataSource.user,dataSource.avg];
            const dataCharts = dataSource.detail;
            const $data = {dataSum, dataCharts};
            return $data;
        } else {
            message.error(data.msg);
        }
    })
}

//渠道数据分析
export function userChannelAnalysis(queryData,type) {
    return axios.get(`${host}/cp/message/m_channelDataAnalysis.action`, {
        params: {
            ...generateAuthFields(),
            ...queryData,
            queryType: type
        }
    }).then(data => {
        if (data.data.code == '200') {
            const dataSource = data.data.data;
            const dataCharts = dataSource.detail;
            const $data = {dataCharts};
            return $data;
        } else {
            message.error(data.msg);
        }
    })
}

// 查询报表顶部数据
export function queryReportTopData(queryData) {
    return axios.get(`${host}/cp/message/m_queryReportTopData.action`, {
        params: {
            ...generateAuthFields(),
            ...queryData,
        }
    }).then(data => {
        if (data.data.code == '200') {
            const dataSource = data.data.data;
            const $data = {dataSource};
            return $data;
        } else {
            message.error(data.msg);
        }
    })
}

//渠道数据分析
export function goodsDataAnalysis(queryData,type) {
    return axios.get(`${host}/cp/message/m_goodsDataAnalysis.action`, {
        params: {
            ...generateAuthFields(),
            ...queryData,
            queryType: type
        }
    }).then(data => {
        if (data.data.code == '200') {
            const dataSource = data.data.data;
            const dataCharts = dataSource.detail;
            const $data = {dataCharts};
            return $data;
        } else {
            message.error(data.msg);
        }
    })
}
//门店数据分析
export function marketTagDataAnalysis(queryData) {
    return axios.get(`${host}/cp/message/m_marketDataAnalysis.action`, {
        params: {
            ...generateAuthFields(),
            ...queryData
        }
    }).then(data => {
        if (data.data.code == '200') {
            const dataSource = data.data.data;
            const dataCharts = dataSource.detail;
            const $data = {dataCharts};
            return $data;
        } else {
            message.error(data.msg);
        }
    })
}
//门店标签数据分析
export function marketDataAnalysisByTag(queryData,type) {
    return axios.get(`${host}/cp/message/m_marketDataAnalysisByTag.action`, {
        params: {
            ...generateAuthFields(),
            ...queryData,
            tag: type
        }
    }).then(data => {
        if (data.data.code == '200') {
            const dataSource = data.data.data;
            const dataCharts = dataSource.detail;
            const $data = {dataCharts};
            return $data;
        } else {
            message.error(data.msg);
        }
    })
}

// 支付宝获取活动列表
export function fetchAlipayActivityList() {
    return axios.get(`${host}/cp/coupon/query!queryZfbActiveList.action`, {
        params: {
            ...generateAuthFields()
        }
    }).then(data => data.data.data.list);
}

// 支付宝获取券列表
export function fetchAlipayCouponList(id) {
    return axios.get(`${host}/cp/coupon/query!queryZfbCouponByActiveid.action`, {
        params: {
            ...generateAuthFields(),
            activeid: id
        }
    }).then(data => data.data.data.list);
}

// 支付宝获取数据概要
export function fetchAlipaycouponData(id,key) {
    return axios.get(`${hosts}/Member/Activity/coupondata`, {
        params: {
            partner_id: id,
            camp_ids: key,
            sign: new_signkey(id,key)
        }
    }).then(data => {
      if (data.data.code == '200') {
          const $data = data.data.data
          const curve = $data.curve;
          const today = $data.today;
          const total = $data.total;
          const yesterday = $data.yesterday;
          const $list = {curve,today,total,yesterday};
          return $list;
      } else {
          message.error(data.data.msg);
      }
    });
}
// 支付宝获取累计数据Top10
export function fetchAlipayShopData(id,key) {
    return axios.get(`${hosts}/Member/Activity/memshoptotaldata`, {
        params: {
            partner_id: id,
            camp_ids: key,
            sign: new_signkey(id,key)
        }
    }).then(data => {
      if (data.data.code == '200') {
          const $data = data.data.data
          return $data;
      } else {
          message.error(data.data.msg);
      }
    });
}

// 支付宝获取今日数据Top10
export function fetchAlipayTodayData(id,key) {
    return axios.get(`${hosts}/Member/Activity/couponshopdata`, {
        params: {
            partner_id: id,
            camp_ids: key,
            sign: new_signkey(id,key)
        }
    }).then(data => {
      if (data.data.code == '200') {
          const $data = data.data.data
          return $data;
      } else {
          message.error(data.data.msg);
      }
    });
}

// 查询有没有订阅米雅营销会员
export function queryIsSubscribe() {
  return axios.get(`${host}/cp/market/saas!isSubscribe.action`, {
    params: { ...generateAuthFields() },
  })
    .then(data => data.data)
}

export function overViewTop(id,st,end) {
    const time = Math.round(new Date().getTime()/1000);
    let private_pw = 'miyacouponpassword';
    let public_pw = 'miyacoupon';
    let hash = md5("GET"+st+time+private_pw);
    let sign=public_pw+":"+hash;

    const miuData = ''+id+'/'+st+'/'+end+'/'+sign+'/'+time+'';

    const ViewTop = new Promise(function(resolve, reject) {
        jsonp('http://116.62.53.12/miyacouponplatform/rest/overviewtop/datatop/'+miuData, {prefix: 'getMessage',name: 'datatop'}, function (err, data) {
            if (err) {
                reject(console.log(err.message));
            } else {
                resolve(data.data);
            }
        });
    })

    return ViewTop;

}
