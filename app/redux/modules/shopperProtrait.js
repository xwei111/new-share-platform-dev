import {shopperProtraitApi} from 'api';

const PREFIX = '@@SHOPPERPROTRAIT/';
const TAG_CONSUMP=PREFIX+'TAG_CONSUMP';
const FANS_NUMBER=PREFIX+'FANS_NUMBER';

function dataSuccessConsump(getdata){
    return {
        type:TAG_CONSUMP,
        getdata
    }
}

function dataSuccessFansNumber(getFansNumber){
    return {
        type:FANS_NUMBER,
        getFansNumber
    }
}

export function dataConsump(active_id){
    return (dispatch)=>{
        return shopperProtraitApi.getTagConsump(active_id)
            .then(data=> dispatch(dataSuccessConsump(data)) )
    }
}

export function dataFansNumber(active_id){
    return (dispatch)=>{
        return shopperProtraitApi.getFansNumber(active_id)
            .then(data=> dispatch(dataSuccessFansNumber(data)) )
    }
}

const initialState={
    getdata: [],
    getFansNumber: []
};

export default function reducer(state = initialState,action){
    switch(action.type){
        case TAG_CONSUMP:
            return {...state, getdata: action.getdata};
        case FANS_NUMBER:
            return {...state, getFansNumber: action.getFansNumber};
        default:
            return state;
    }
}