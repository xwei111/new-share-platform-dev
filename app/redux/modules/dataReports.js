import {
    realDataApi,
    dataReportsApi
} from 'api';

const PREFIX = '@@DATAREPORTS/';

const FETCH_ACTIVITY_LIST_SUCCESS = PREFIX + 'FETCH_ACTIVITY_LIST_SUCCESS';
const SET_ACTIVITY_ID = PREFIX + 'SET_ACTIVITY_ID';
const SET_ACTIVE_NAME = PREFIX + 'SET_ACTIVE_NAME';
const SET_START_TIME = PREFIX + 'SET_START_TIME';
const SET_END_TIME = PREFIX + 'SET_END_TIME';

const FETCH_TOTAL_PIE = PREFIX + 'FETCH_TOTAL_PIE';
const FETCH_MARKETS_PIE = PREFIX + 'FETCH_MARKETS_PIE';
const FETCH_AVG_PIE = PREFIX + 'FETCH_AVG_PIE';

const SET_CITY_NAME = PREFIX + 'SET_CITY_NAME';
const SET_CITY_ARR = PREFIX + 'SET_CITY_ARR';
const SET_MARKET_ARR = PREFIX + 'SET_MARKET_ARR';
const SET_VISIBLE = PREFIX + 'SET_VISIBLE';
const FETCH_PROVINCE_ARR = PREFIX + 'FETCH_PROVINCE_ARR';
const FETCH_CHANNEL_DATA = PREFIX + 'FETCH_CHANNEL_DATA';
const FETCH_MARKETS_PAY = PREFIX + 'FETCH_MARKETS_PAY';

// zq
const GET_ACTIVE_MARKET_TIME = PREFIX + 'GET_ACTIVE_MARKET_TIME';
const GET_ACTIVE_MARKET_WEEK = PREFIX + 'GET_ACTIVE_MARKET_WEEK';
const LOADING_STYELTIME = PREFIX + 'LOADING_STYELTIME';
const LOADING_STYEWEEK = PREFIX + 'LOADING_STYEWEEK';

const SET_SELECT_NAME = PREFIX + 'SET_SELECT_NAME';

const SET_LIMIT = PREFIX + 'SET_LIMIT';

const SET_NUM_IN = PREFIX + 'SET_NUM_IN';


// about new
const ACTIVE_ANSYS_SELECT = PREFIX + 'ACTIVE_ANSYS_SELECT';


const FETCH_ACT_INFO = PREFIX + 'FETCH_ACT_INFO';


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

export function setActiveName(activename) {
    return {
        type: SET_ACTIVE_NAME,
        activename
    };
}

export function setStartTime(starttime) {
    return {
        type: SET_START_TIME,
        starttime
    }
}

export function setEndTime(endtime) {
    return {
        type: SET_END_TIME,
        endtime
    }
}

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

export function fetchChannelData(channeldata) {
    return {
        type: FETCH_CHANNEL_DATA,
        channeldata
    }
}

export function fetchMarketsPay(marketspay) {
    return {
        type: FETCH_MARKETS_PAY,
        marketspay
    }
}

export function setLimit(start,end) {
    return {
        type: SET_LIMIT,
        start,
        end
    }
}

export function setNumIn(numIn) {
    return {type: SET_NUM_IN, numIn};
}

// new about
export function fetchActInfo(actInfo) {
    return {type: FETCH_ACT_INFO, actInfo};
}

export function activeAnsysSelect(activeSelect) {
    return {type: ACTIVE_ANSYS_SELECT, activeSelect};
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

export function handleFetchProvince(activeid) {
    return (dispatch, getState) => {
        return dataReportsApi.marketVerificationProvince(activeid).then(data => {
            dispatch(fetchProvinceArr(data));
        });
    };
}

export function handleFetchTotalPie(activeid) {
    return (dispatch, getState) => {
        return dataReportsApi.useCouponTotal(activeid).then(data => {
            dispatch(fetchTotalPie(data));
        });
    };
}

export function handleFetchMarketsPie(activeid) {
    return (dispatch, getState) => {
        return dataReportsApi.useCouponMarketAvg(activeid).then(data => {
            dispatch(fetchMarketsPie(data));
        });
    };
}

export function handleFetchAvgPie(activeid) {
    return (dispatch, getState) => {
        return dataReportsApi.avgPrice(activeid).then(data => {
            dispatch(fetchAvgPie(data));
        });
    };
}

export function handleSetCityArr(activeid,cityname) {
    return (dispatch, getState) => {
        return dataReportsApi.marketUsecouponEffDetailCity(activeid,cityname).then(data => {
            dispatch(setCityArr(data));
            dispatch(setMarketArr(data));
        });
    };
}

export function handleSetMarketArr(activeid,cityname) {
    return (dispatch, getState) => {
        return dataReportsApi.marketUsecouponEffDetailMarkets(activeid,cityname).then(data => {
            dispatch(setMarketArr(data));
        });
    };
}

export function handleFetchChannelData(activeid) {
    return (dispatch, getState) => {
        return dataReportsApi.getActiveChannelAll(activeid).then(data => {
            dispatch(fetchChannelData(data));
        });
    };
}

export function handleFetchMarketsPay(activeid,start,end) {
    return (dispatch, getState) => {
        return dataReportsApi.marketPaymentLevel(activeid,start,end).then(data => {
            dispatch(fetchMarketsPay(data));
        });
    };
}

// zq
export function getActiveMarketTime(getActiveMarketTimeAll,getActiveMarketTimeWorkday,getActiveMarketTimeWeekend) {
  return {
    type: GET_ACTIVE_MARKET_TIME,
    getActiveMarketTimeAll,
    getActiveMarketTimeWorkday,
    getActiveMarketTimeWeekend,
  };
}

export function LoadingStyleTime(loadingTime){
  return {
    type:LOADING_STYELTIME,
    loadingTime
  }
}

export function LoadingStyleWeek(loadingWeek){
  return {
    type:LOADING_STYEWEEK,
    loadingWeek
  }
}

export function getActiveMarketTimeWeek(amount,num) {
  return {
    type: GET_ACTIVE_MARKET_WEEK,
    amount,
    num,
  };
}
export function handleGetActiveMarketTime(active_id) {
    return (dispatch, getState) => {
        dispatch(LoadingStyleTime(true))
        dataReportsApi.getActiveMarketTimeAll(active_id)
        .then(({all,workday,weekend}) =>{
          dispatch(getActiveMarketTime(all,workday,weekend))
          dispatch(LoadingStyleTime(false))
    });
  }
}

export function handleGetActiveMarketTimeWeek(active_id) {
    return (dispatch, getState) => {
      dispatch(LoadingStyleWeek(true))
        dataReportsApi.getActiveMarketTimeWeek(active_id)
        .then(({amount,num}) =>{
          dispatch(getActiveMarketTimeWeek(amount,num))
          dispatch(LoadingStyleWeek(false))
    });
  }
}


// new add
export function handleFetchActInfo(active_id) {
    return (dispatch, getState) => {
        dataReportsApi.findHistoryById(active_id)
        .then( data => dispatch(fetchActInfo(data)));
    }
}

export function handleActiveAnsysSelect(active_id) {
    return (dispatch, getState) => {
        dataReportsApi.activeAnsysSelect(active_id)
        .then( data => dispatch(activeAnsysSelect(data)));
    }
}

export function handleFetchHistorySix() {
    return (dispatch, getState) => {
        dataReportsApi.activeAnsysSelectAll()
        .then( data => dispatch(activeAnsysSelect(data)));
    }
}

const initialState = {
    activityList: [],
    activeid: '',
    activename: '',
    starttime: '',
    endtime: '',
    totalpie: [],
    marketspie: [],
    avgpie: [],
    cityname: '',
    cityArr: [],
    selectName: '',
    marketArr: [],
    provinceArr: [],
    channeldata: [],
    marketspay: [],
    visible: false,
    start: '1',
    end: '50',
    getActiveMarketTimeAll: [],
    getActiveMarketTimeWorkday: [],
    getActiveMarketTimeWeekend: [],
    amount:[],
    num:[],
    numIn: false,
    loadingTime:false,
    loadingWeek:false,
    actInfo: {},
    activeSelect: []
};

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
        case SET_ACTIVE_NAME:
            return {
                ...state,
                activename: action.activename
            };
        case SET_START_TIME:
            return {
                ...state,
                starttime: action.starttime
            };
        case SET_END_TIME:
            return {
                ...state,
                endtime: action.endtime
            };
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
        case FETCH_CHANNEL_DATA:
            return {
                ...state,
                channeldata: action.channeldata
            }
        case FETCH_MARKETS_PAY:
            return {
                ...state,
                marketspay: action.marketspay
            }
        case SET_LIMIT:
            return {
                ...state,
                start: action.start,
                end: action.end,
            }
        case SET_NUM_IN:
            return {
                ...state,
                numIn: action.numIn
            };
        case GET_ACTIVE_MARKET_TIME:
              return {...state,getActiveMarketTimeAll: action.getActiveMarketTimeAll,getActiveMarketTimeWorkday: action.getActiveMarketTimeWorkday,getActiveMarketTimeWeekend: action.getActiveMarketTimeWeekend};
        case GET_ACTIVE_MARKET_WEEK:
              return {...state,amount: action.amount,num: action.num};
        case LOADING_STYELTIME:
              return {...state,loadingTime: action.loadingTime};
        case LOADING_STYEWEEK:
              return {...state,loadingWeek: action.loadingWeek};
        case FETCH_ACT_INFO:
              return {...state,actInfo: action.actInfo};
        case ACTIVE_ANSYS_SELECT:
              return {...state,activeSelect: action.activeSelect};
        default:
            return state;
    }
}
