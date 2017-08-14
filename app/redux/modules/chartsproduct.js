import {chartsproductApi} from 'api';

const PREFIX = '@@PRODUCT/';
const PRODUCT_SUCCESS=PREFIX+'PRODUCT_SUCCESS';

const PRODUCT_ACYIVITY=PREFIX+'PRODUCT_ACYIVITY';

function datesuccess(getdate){
	return {
		type:PRODUCT_SUCCESS,
		getdate
	}
}

function dateactivitysuccess(getdateactivity){
	return {
		type:PRODUCT_ACYIVITY,
		getdateactivity
	}
}

export function datelist(active_id){
	return (dispatch)=>{
		return chartsproductApi.chartsproduct(active_id)
		.then(data=> dispatch(datesuccess(data)) )
	}
}

export function datelistactivity(active_id,orderColumnName){
	return (dispatch)=>{
		return chartsproductApi.chartsactivity(active_id,orderColumnName)
		.then(data=> dispatch(dateactivitysuccess(data)) )
	}
}

const initialState={
	getdate: {
        communityValueList: [],
        schoolDistrictValueList: [],
        tradingAreaValueList: [],
    },
	getdateactivity:[],
}

export default function reducer(state = initialState,action){
	switch(action.type){
		case PRODUCT_SUCCESS:
			return {...state, getdate: action.getdate};
		case PRODUCT_ACYIVITY:
			return {...state, getdateactivity: action.getdateactivity};
		default:
			return state;
	}
}