import {activilistApi} from 'api';

const PREFIX = '@@ACTIVILIST/';
const ACTIVILIST_SUCCESS=PREFIX+'ACTIVILIST_SUCCESS';
const ACTIVILIST_SUCCESSSEARCH=PREFIX+'ACTIVILIST_SUCCESSSEARCH';
const ACTIVILIST_SUCCESSSEARCHHEIGHT=PREFIX+'ACTIVILIST_SUCCESSSEARCHHEIGHT';

const ACTIVILIST_DETAIL=PREFIX+'ACTIVILIST_DETAIL';

const ACTIVILIST_UPDATE=PREFIX+'ACTIVILIST_UPDATE';

const ACTIVILIST_DELETE=PREFIX+'ACTIVILIST_DELETE';

const ACTIVILIST_QUERYDELETE=PREFIX+'ACTIVILIST_QUERYDELETE';

function datesuccess(getdate){
	return {
		type:ACTIVILIST_SUCCESS,
		getdate
	}
}

function datesuccessSearch(getdateSearch){
	return {
		type:ACTIVILIST_SUCCESSSEARCH,
		getdateSearch
	}
}

function datesuccessSearchHeight(getdateSearchHeight){
	return {
		type:ACTIVILIST_SUCCESSSEARCHHEIGHT,
		getdateSearchHeight
	}
}

function datesuccessDetail(getdateDetail){
	return {
		type:ACTIVILIST_DETAIL,
		getdateDetail
	}
}

function datesuccessUpdate(getdateUpdate){
	return {
		type:ACTIVILIST_UPDATE,
		getdateUpdate
	}
}

function datedelete(getdateDelete){
	return {
		type:ACTIVILIST_DELETE,
		getdateDelete
	}
}

function datequerydetail(getdateQuerydetail){
	return {
		type:ACTIVILIST_QUERYDELETE,
		getdateQuerydetail
	}
}



export function datelist(){
	return (dispatch)=>{
		return activilistApi.activilist()
		.then(data=> dispatch(datesuccess(data)) )
	}
}

export function datelistSearch(activename){
	return (dispatch)=>{
		return activilistApi.activilistSearch(activename)
		.then(data=> dispatch(datesuccessSearch(data)) )
	}
}

export function datelistSearchHeight(activeHeightname,type){
	return (dispatch)=>{
		return activilistApi.activilistHeightSearch(activeHeightname,type)
		.then(data=> dispatch(datesuccessSearchHeight(data)) )
	}
}

export function datelistDetail(activeid){
	return (dispatch)=>{
		return activilistApi.activilistDetail(activeid)
		.then(data=> dispatch(datesuccessDetail(data)) )
	}
}

export function datelistUpdate(updateActiveid){
	return (dispatch)=>{
		return activilistApi.updateActiveStatus(updateActiveid)
		.then(data=> dispatch(datesuccessDetail(data)) )
	}
}

export function datelistDelete(deleteActiveid,tempActid){
	return (dispatch)=>{
		return activilistApi.deleteActiveById(deleteActiveid,tempActid)
		.then(data=> dispatch(datesuccess(data)) )
	}
}

export function datelistQuerydetail(pubid){
	return (dispatch)=>{
		return activilistApi.querydetail(pubid)
		.then(data=> dispatch(datequerydetail(data)) )
	}
}

const initialState={
	getdate: [],
	getdateSearch: [],
	getdateSearchHeight: [],
	getdateDetail: [],
	getdateUpdate: [],
	getdateDelete: [],
	getdateQuerydetail: [],
}

export default function reducer(state = initialState,action){
	switch(action.type){
		case ACTIVILIST_SUCCESS:
			return {...state, getdate: action.getdate};
		case ACTIVILIST_SUCCESSSEARCH:
			return {...state, getdateSearch: action.getdateSearch};
		case ACTIVILIST_SUCCESSSEARCHHEIGHT:
			return {...state, getdateSearchHeight: action.getdateSearchHeight};
		case ACTIVILIST_DETAIL:
			return {...state, getdateDetail: action.getdateDetail};
		case ACTIVILIST_UPDATE:
			return {...state, getdateUpdate: action.getdateUpdate};
		case ACTIVILIST_DELETE:
			return {...state, getdateDelete: action.getdateDelete};
		case ACTIVILIST_QUERYDELETE:
			return {...state, getdateQuerydetail: action.getdateQuerydetail};
		default:
			return state;
	}
}
