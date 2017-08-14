import {
    fansApi
} from 'api';

const PREFIX = '@@FANSREPORTS/';

const FETCH_TOTAL_PIE = PREFIX + 'FETCH_TOTAL_PIE';
const FETCH_MARKETS_PIE = PREFIX + 'FETCH_MARKETS_PIE';
const FETCH_AVG_PIE = PREFIX + 'FETCH_AVG_PIE';

const SET_CITY_NAME = PREFIX + 'SET_CITY_NAME';
const SET_CITY_ARR = PREFIX + 'SET_CITY_ARR';
const SET_MARKET_ARR = PREFIX + 'SET_MARKET_ARR';
const SET_VISIBLE = PREFIX + 'SET_VISIBLE';
const FETCH_PROVINCE_ARR = PREFIX + 'FETCH_PROVINCE_ARR';

const SET_SELECT_NAME = PREFIX + 'SET_SELECT_NAME';

const FANS_NUMBER=PREFIX+'FANS_NUMBER';


export function fetchTotalPie(totalpie) {
    return {
        type: FETCH_TOTAL_PIE,
        totalpie
    }
}

export function fetchMarketsPie(marketspie) {
    return {
        type: FETCH_MARKETS_PIE,
        marketspie
    }
}

export function fetchAvgPie(avgpie) {
    return {
        type: FETCH_AVG_PIE,
        avgpie
    }
}

export function setCityName(cityname) {
    return {
        type: SET_CITY_NAME,
        cityname
    }
}
export function setVisible(visible) {
    return {
        type: SET_VISIBLE,
        visible
    }
}

export function setCityArr(cityArr) {
    return {
        type: SET_CITY_ARR,
        cityArr
    }
}

export function setSelectName(selectName) {
    return {
        type: SET_SELECT_NAME,
        selectName
    }
}

export function setMarketArr(marketArr) {
    return {
        type: SET_MARKET_ARR,
        marketArr
    }
}

export function fetchProvinceArr(provinceArr) {
    return {
        type: FETCH_PROVINCE_ARR,
        provinceArr
    }
}



function dataSuccessFansNumber(getFansNumber){
    return {
        type:FANS_NUMBER,
        getFansNumber
    }
}

export function dataFansNumber(active_id){
    return (dispatch)=>{
        return fansApi.getFansNumber(active_id)
            .then(data=> dispatch(dataSuccessFansNumber(data)) )
    }
}


export function setNumIn(numIn) {
    return {type: SET_NUM_IN, numIn};
}

export function handleFetchActivityList() {
    return (dispatch, getState) => {
        return realDataApi.fetchActivityList().then(data => {
            dispatch(fetchActivityListSuccess(data));
            dispatch(setActivityId(data[0].activeid));
            dispatch(setActiveName(data[0].name));
            dispatch(setStartTime(data[0].starttime.split(' ')[0]));
            dispatch(setEndTime(data[0].endtime.split(' ')[0]));
            return data;
        });
    };
}

export function handleFetchProvince() {
    return (dispatch, getState) => {
        return fansApi.marketVerificationProvince().then(data => {
            dispatch(fetchProvinceArr(data));
        });
    };
}
// 粉丝分布
export function handleFetchTotalPie() {
    return (dispatch)=>{
        return fansApi.useCouponTotal()
            .then(data=> dispatch(fetchTotalPie(data)) )
    }
}

export function handleFetchMarketsPie(usecode) {
    return (dispatch, getState) => {
        return fansApi.useCouponMarketAvg(usecode).then(data => {
            dispatch(fetchMarketsPie(data));
        });
    };
}

export function handleFetchAvgPie(usecode) {
    return (dispatch, getState) => {
        return fansApi.avgPrice(usecode).then(data => {
            dispatch(fetchAvgPie(data));
        });
    };
}

export function handleSetCityArr(cityname) {
    return (dispatch, getState) => {
        return fansApi.marketUsecouponEffDetailCity(cityname).then(data => {
            dispatch(setCityArr(data));
            dispatch(setMarketArr(data));
        });
    };
}

export function handleSetMarketArr(cityname) {
    return (dispatch, getState) => {
        return fansApi.marketUsecouponEffDetailMarkets(cityname).then(data => {
            dispatch(setMarketArr(data));
        });
    };
}

const initialState = {
    totalpie: [],
    marketspie: [],
    avgpie: [],
    cityname: '',
    cityArr: [],
    selectName: '',
    marketArr: [],
    provinceArr: [],
    getFansNumber: [],
    visible: false,
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_SELECT_NAME:
            return {
                ...state,
                selectName: action.selectName
            };
        case FETCH_TOTAL_PIE:
            return {
                ...state,
                totalpie: action.totalpie
            }
        case FETCH_MARKETS_PIE:
            return {
                ...state,
                marketspie: action.marketspie
            }
        case FETCH_AVG_PIE:
            return {
                ...state,
                avgpie: action.avgpie
            }
        case SET_CITY_NAME:
            return {
                ...state,
                cityname: action.cityname
            }
        case SET_VISIBLE:
            return {
                ...state,
                visible: action.visible
            }
        case FETCH_PROVINCE_ARR:
            return {
                ...state,
                provinceArr: action.provinceArr
            }
        case SET_CITY_ARR:
            return {
                ...state,
                cityArr: action.cityArr
            }
        case SET_MARKET_ARR:
            return {
                ...state,
                marketArr: action.marketArr
            }
        case FANS_NUMBER:
            return {...state, getFansNumber: action.getFansNumber};
        default:
            return state;
    }
}
