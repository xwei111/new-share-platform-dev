import axios from 'axios';
import { hosts } from 'config/constants';
import store from 'config/store.js';

//活动粉丝对比----活动粉丝累计情况
export function ActiveFansGrandCondition(){
	return axios.get(hosts+'/activeFans/getAllActiveFansNum')
		.then(data=>data.data.data)
}

//活动效果对比分析-活动效果总览
export function getActiveEffOverview(){
	const saasid=store.getState().auth.saasId;
	return axios.get(hosts+'/gxpt/activeEffCompare?saasid='+ saasid)
		.then(data=>data.data.data)
}

//活动效果对比分析-活动效果机会地图
export function getActiveEffPossMap(){
	const saasid=store.getState().auth.saasId;
	return axios.get(hosts+'/gxpt/activeEffPossMap?saasid='+ saasid)
		.then(data=>data.data.data)
}

//活动效果对比分析-活动效果不同优惠力度表现_按商品查找
export function getActiveEffGoodsDiscount(goodsid){
	const saasid=store.getState().auth.saasId;
	return axios.get(hosts+'/gxpt/activeEffGoodsDiscount?saasid='+saasid+'&goodsid='+goodsid)
		.then(data=>data.data.data)
}

//活动效果对比分析-活动效果不同优惠力度表现_按优惠力度查找
export function getActiveEffDiscountStr(discountStr){
	const saasid=store.getState().auth.saasId;
	return axios.get(encodeURI(hosts+'/gxpt/activeEffDiscountStr?saasid='+saasid+'&discountStr='+discountStr))
		.then(data=>data.data.data)
}

//活动效果对比分析-活动效果不同优惠力度表现_商品列表
export function getActiveEffGoodsList(){
	const saasid=store.getState().auth.saasId;
	return axios.get(hosts+'/gxpt/activeEffGoodsList?saasid='+ saasid)
		.then(data=>JSON.parse(data.data.data))
}

//活动效果对比分析-活动效果不同优惠力度表现_优惠力度列表
export function getActiveEffDiscountList(){
	const saasid=store.getState().auth.saasId;
	return axios.get(hosts+'/gxpt/activeEffDiscountList?saasid='+ saasid)
		.then(data=>JSON.parse(data.data.data))
}

//活动粉丝对比分析-粉丝累计总览（包含所有活动）
export function getAllActiveFansNumTotal(){
	const saasid=store.getState().auth.saasId;
	return axios.get(hosts+'/activeFans/getAllActiveFansNumTotal?saasid='+ saasid)
		.then(data=>data.data.data)
}
