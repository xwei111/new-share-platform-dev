import { monitorApi, realDataApi } from 'api';

const PREFIX = '@@MONITOR/';


const FETCH_ACTIVITY_LIST_SUCCESS = PREFIX + 'FETCH_ACTIVITY_LIST_SUCCESS';
const SET_ACTIVITY_ID = PREFIX + 'SET_ACTIVITY_ID';
const SET_NUM_IN = PREFIX + 'SET_NUM_IN';

const MONITOR_SUCCESS = PREFIX + 'MONITOR_SUCCESS';
const MONITOR_SUCCESSDATA = PREFIX + 'MONITOR_SUCCESSDATA';
const MONITOR_SUCCESSDOOR = PREFIX + 'MONITOR_SUCCESSDOOR';

function fetchActivityListSuccess(activityList) {
    return {
        type: FETCH_ACTIVITY_LIST_SUCCESS,
        activityList
    };
}

export function setActivityId(activeid) {
    return {
        type: SET_ACTIVITY_ID,
        activeid
    }
}

export function setNumIn(numIn) {
    return {type: SET_NUM_IN, numIn};
}

function datesuccess(getdata){
	return {
		type:MONITOR_SUCCESS,
		getdata
	}
}

function datesuccessData(getdataData){
	return {
		type:MONITOR_SUCCESSDATA,
		getdataData
	}
}

function datesuccessDoor(getdataDoor){
	return {
		type:MONITOR_SUCCESSDOOR,
		getdataDoor
	}
}

export function handleFetchActivityList() {
    return (dispatch, getState) => {
        return realDataApi.fetchActivityList().then(data => {
            dispatch(fetchActivityListSuccess(data));
            dispatch(setActivityId(data[0].active_id));
            return data;
        });
    };
}

export function datacodelist(active_id){
	return (dispatch)=>{
		return monitorApi.monitor(active_id)
		.then(data=> dispatch(datesuccess(data)) )
	}
}

export function datacodelistData(active_id){
	return (dispatch)=>{
		return monitorApi.monitorData(active_id)
		.then(data=> dispatch(datesuccessData(data)) )
	}
}

export function datacodelistDoor(active_id){
	return (dispatch)=>{
		return monitorApi.monitorDoor(active_id)
		.then(data=> dispatch(datesuccessDoor(data)) )
	}
}

const initialState={
	activityList: [],
    activeid: '',
    numIn: false,
	getdata:[],
	getdataData:[],
	getdataDoor:[],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
  	case FETCH_ACTIVITY_LIST_SUCCESS:
        return {
            ...state,
            activityList: action.activityList
        };
    case SET_ACTIVITY_ID:
        return {
            ...state,
            activeid: action.activeid
        };
    case SET_NUM_IN:
        return {
            ...state,
            numIn: action.numIn
        };
    case MONITOR_SUCCESS:
      return {...state, getdata: action.getdata}
    case MONITOR_SUCCESSDATA:
      return {...state, getdataData: action.getdataData}
    case MONITOR_SUCCESSDOOR:
      return {...state, getdataDoor: action.getdataDoor}
    default:
      return state;
  }
}