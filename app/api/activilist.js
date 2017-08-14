import axios from 'axios';
import store from 'config/store.js';
import md5 from "md5";
import { host } from 'config/constants';

export function activilist(){
	var accountId=store.getState().auth.loginname;
	return axios.get(host + '/cp/active/active!queryActiveListXls.action?account_id='+accountId)
		.then(data=>data.data.data.list)
	// return axios.get('http://localhost:8080/activelist.json')
	// 	.then(data=>data.data.proList)
}

export function activilistSearch(activename){
	var accountId=store.getState().auth.loginname;
	return axios.get(host + '/cp/active/active!queryActiveListXls.action?account_id='+accountId+'&activename='+activename)
		.then(data=>data.data.data.list)
}

export function activilistHeightSearch(activeHeightname,type){
	var accountId=store.getState().auth.loginname;
	return axios.get(host + '/cp/active/active!queryActiveListXls.action?account_id='+accountId+'&activename='+activeHeightname+'&type='+type)
		.then(data=>data.data.data.list)
}

export function activilistDetail(activeid){
	var accountId=store.getState().auth.loginname;
	return axios.get(host + '/cp/active/active!queryActiveDetail.action?account_id='+accountId+'&activeid='+activeid)
		.then(data=>data.data.data)
}

export function updateActiveStatus(updateActiveid){
	var accountId=store.getState().auth.loginname;
	return axios.get(host + '/cp/active/active!updateActiveStatus.action?account_id='+accountId+'&activeid='+updateActiveid)
		.then(data=>data.data)
}

export function deleteActiveById(deleteActiveid,tempActid){
	var accountId=store.getState().auth.loginname;
	return axios.get(host + '/cp/active/active!deleteActiveById.action?account_id='+accountId+'&activeid='+deleteActiveid+'&tempActid='+tempActid)
		.then(data=>data.data)
}

export function querydetail(pubid){
	var accountId=store.getState().auth.loginname;
	var sign=md5('&account_id='+accountId+'&signkey=b881d1c582b5bc357f8b87fcb13dfe72').toUpperCase();
	return axios.get(host + '/cp/coupon/c_querydetail.action?account_id='+accountId+"&pubid="+pubid+"&sign="+sign)
		.then(data=>data.data)
}
