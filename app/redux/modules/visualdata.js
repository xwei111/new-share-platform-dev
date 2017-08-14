import {realDataApi} from 'api';
import {message} from 'antd';
const PREFIX = '@@VISUALDATA/';
const FETCH_ACTIVITY_LIST_SUCCESS = PREFIX + 'FETCH_ACTIVITY_LIST_SUCCESS';
const FETCH_COUPON_LIST_SUCCESS = PREFIX + 'FETCH_COUPON_LIST_SUCCESS';
const SET_ACTIVITY_ID = PREFIX + 'SET_ACTIVITY_ID';
const SET_COUPON_ID = PREFIX + 'SET_COUPON_ID';
const SET_START_TIME = PREFIX + 'SET_START_TIME';
const SET_END_TIME = PREFIX + 'SET_END_TIME';
const SET_QUERT_TYPE = PREFIX + 'SET_QUERT_TYPE';

const FETCH_ALIPAYACTIVITY_LIST_SUCCESS = PREFIX + 'FETCH_ALIPAYACTIVITY_LIST_SUCCESS';
const SET_ALIPAYACTIVITY_ID = PREFIX + 'SET_ALIPAYACTIVITY_ID';
const SET_ALIPAYSTART_TIME = PREFIX + 'SET_ALIPAYSTART_TIME';
const SET_ALIPAYEND_TIME = PREFIX + 'SET_ALIPAYEND_TIME';

const FETCH_SUM_DATA = PREFIX + 'FETCH_SUM_DATA';
const FETCH_SUM_USE_DATA = PREFIX + 'FETCH_SUM_USE_DATA';
const FETCH_SUM_GET_DATA = PREFIX + 'FETCH_SUM_GET_DATA';

const FETCH_TOTAL_DATA = PREFIX + 'FETCH_TOTAL_DATA';
const FETCH_TREND_DATA = PREFIX + 'FETCH_TREND_DATA';
const FETCH_FUNNEL_DATA = PREFIX + 'FETCH_FUNNEL_DATA';
const FETCH_VIEW_DATA = PREFIX + 'FETCH_VIEW_DATA';

const FETCH_USE_DATA = PREFIX + 'FETCH_USE_DATA';
const FETCH_GET_DATA = PREFIX + 'FETCH_GET_DATA';

const FETCH_GET_CHANNEL = PREFIX + 'FETCH_GET_CHANNEL';
const FETCH_USE_CHANNEL = PREFIX + 'FETCH_USE_CHANNEL';

const FETCH_MARKET_DATA = PREFIX + 'FETCH_MARKET_DATA';
const FETCH_TAG_DATA = PREFIX + 'FETCH_TAG_DATA';

const FETCH_GET_CATE = PREFIX + 'FETCH_GET_CATE';
const FETCH_USE_CATE = PREFIX + 'FETCH_USE_CATE';
const FETCH_TOP_CATE = PREFIX + 'FETCH_TOP_CATE';

const FETCH_ALIPAY_DATA = PREFIX + 'FETCH_ALIPAY_DATA';

const SET_LOADING = PREFIX + 'SET_LOADING';
const SET_NUM_IN = PREFIX + 'SET_NUM_IN';
const SET_ALIPAYNUM_IN = PREFIX + 'SET_ALIPAYNUM_IN';

const FETCH_RANKING_DATA = PREFIX + 'FETCH_RANKING_DATA';

const SET_MIYA_VIP = PREFIX + 'SET_MIYA_VIP';

const SET_ACTIVE_NAME = PREFIX + 'SET_ACTIVE_NAME';

const SET_TREND_KEY = PREFIX + 'SET_TREND_KEY';

export function fetchAlipayActivityListSuccess(alipayActivityList) {
    return {type: FETCH_ALIPAYACTIVITY_LIST_SUCCESS, alipayActivityList};
}

export function setTrendKay(trendKey) {
    return {type: SET_TREND_KEY, trendKey};
}

export function setAlipayActiveId(alipayActiveid) {
    return {type: SET_ALIPAYACTIVITY_ID, alipayActiveid};
}

export function setAlipayStartTime(alipayStarttime) {
    return {type: SET_ALIPAYSTART_TIME, alipayStarttime};
}

export function setAlipayEndTime(alipayEndtime) {
    return {type: SET_ALIPAYEND_TIME, alipayEndtime};
}

export function setMiyaVip(isMiyaVip) {
    return {type: SET_MIYA_VIP, isMiyaVip};
}

export function setActiveName(activename) {
    return {type: SET_ACTIVE_NAME, activename};
}

export function setLoading(isloading) {
    return {type: SET_LOADING, isloading};
}

export function setNumIn(numIn) {
    return {type: SET_NUM_IN, numIn};
}
export function setAlipayNumIn(alipayNumIn) {
    return {type: SET_ALIPAYNUM_IN, alipayNumIn};
}

function fetchMarketTag(getTag) {
    return {type: FETCH_TAG_DATA, getTag};
}

function fetchMarket(getMarket) {
    return {type: FETCH_MARKET_DATA, getMarket};
}

function fetchTotalData(totalData) {
    return {type: FETCH_TOTAL_DATA, totalData};
}

function fetchTrendData(trendData) {
    return {type: FETCH_TREND_DATA, trendData};
}

function fetchFunnelData(dataFunnel) {
    return {type: FETCH_FUNNEL_DATA, dataFunnel};
}

function fetchViewData(viewTopData) {
    return {type: FETCH_VIEW_DATA, viewTopData};
}

function fetchRakingData(rankData) {
    return {type: FETCH_RANKING_DATA, rankData};
}

function fetchCateGet(getCate) {
    return {type: FETCH_GET_CATE, getCate};
}

function fetchCateUse(useCate) {
    return {type: FETCH_USE_CATE, useCate};
}

function fetchCateTop(topData) {
    return {type: FETCH_TOP_CATE, topData};
}

function fetchChannelGet(channelGet) {
    return {type: FETCH_GET_CHANNEL, channelGet};
}

function fetchChannelUse(channelUse) {
    return {type: FETCH_USE_CHANNEL, channelUse};
}

function fetchSum(sumData) {
    return {type: FETCH_SUM_DATA, sumData};
}

function fetchSumGet(sumDataGet) {
    return {type: FETCH_SUM_GET_DATA, sumDataGet};
}

function fetchSumUse(sumDataUse) {
    return {type: FETCH_SUM_USE_DATA, sumDataUse};
}

function fetchUse(useData) {
    return {type: FETCH_USE_DATA, useData};
}

function fetchGet(getData) {
    return {type: FETCH_GET_DATA, getData};
}

function fetchActivityListSuccess(activityList) {
    return {type: FETCH_ACTIVITY_LIST_SUCCESS, activityList};
}

function fetchCouponListSuccess(couponList) {
    return {type: FETCH_COUPON_LIST_SUCCESS, couponList};
}

export function setActivityId(activeid) {
    return {type: SET_ACTIVITY_ID, activeid}
}

export function setCouponId(couponId) {
    return {type: SET_COUPON_ID, couponId}
}

export function setStartTime(starttime) {
    return {type: SET_START_TIME, starttime}
}

export function setEndTime(endtime) {
    return {type: SET_END_TIME, endtime}
}

export function setQueryType(queryType) {
    return {type: SET_QUERT_TYPE, queryType}
}

function fetchAlipayData(alipayData) {
    return {type: FETCH_ALIPAY_DATA, alipayData};
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

export function handleFetchAlipayActivityList() {
    return (dispatch, getState) => {
        return realDataApi.fetchAlipayActivityList().then(data => {
            dispatch(fetchAlipayActivityListSuccess(data));
            dispatch(setAlipayActiveId(data[0].activeid));
            dispatch(setAlipayStartTime(data[0].starttime.split(' ')[0]));
            dispatch(setAlipayEndTime(data[0].endtime.split(' ')[0]));
            realDataApi.fetchAlipayCouponList(data[0].activeid).then(list => {
                dispatch(fetchCouponListSuccess(list));
                dispatch(setCouponId(list[0].pubid));
            })
            return data;
        });
    };
}

export function handleFetchCouponList(id) {
    return (dispatch, getState) => {
        realDataApi.fetchAlipayCouponList(id).then(list => {
            dispatch(fetchCouponListSuccess(list));
            dispatch(setCouponId(list[0].pubid));
        })
    };
}

export function handleTotalData(queryData, otherQuery) {
    return (dispatch, getState) => {
        dispatch(setLoading(true));
        realDataApi.dataOverview(queryData).then(dataSource => {
            if (dataSource.pv == '')
                dataSource.pv = '--';
            if (dataSource.uv == '')
                dataSource.uv = '--';
            dispatch(fetchTotalData(dataSource));
            dispatch(setLoading(false));
        })
        if (otherQuery.type == 'coupon') {
            realDataApi.dataCurve(queryData, otherQuery).then(data => {
                dispatch(fetchTrendData(data.couponData));
            })
        } else {
            realDataApi.dataCurve(queryData, otherQuery).then(data => {
                dispatch(fetchTrendData(data.userData));
            })
        }

        realDataApi.dataFunnel(queryData).then(dataFunnel => {
            dispatch(fetchFunnelData(dataFunnel));
        })
        const {activename, starttime, endtime} = queryData;
        realDataApi.overViewTop(activename, starttime, endtime).then(data => {
            dispatch(fetchViewData(data));
        })
    };
}

export function handleAllUserData(queryData, type) {
    return (dispatch, getState) => {
        dispatch(setLoading(true));
        realDataApi.queryReportTopData(queryData).then(data => {
            dispatch(setLoading(false));
            dispatch(fetchSum(data.dataSource));
        });
        realDataApi.userDataAnalysis(queryData, type).then(data => {
            if (type == 'USE') {
                dispatch(fetchSumUse(data.dataSum));
                dispatch(fetchUse(data.dataCharts));
            } else {
                dispatch(fetchSumGet(data.dataSum));
                dispatch(fetchGet(data.dataCharts));
            }
        });
    };
}

export function handleAllChannel(queryData, type) {
    return (dispatch, getState) => {
        dispatch(setLoading(true));
        return realDataApi.userChannelAnalysis(queryData, type).then(data => {
            if (type == 'USE') {
                dispatch(setLoading(false));
                dispatch(fetchChannelUse(data.dataCharts));
            } else {
                dispatch(setLoading(false));
                dispatch(fetchChannelGet(data.dataCharts));
            }
        });
    };
}

export function handleAllCate(queryData, type) {
    return (dispatch, getState) => {
        dispatch(setLoading(true));

        realDataApi.queryReportTopData(queryData).then(data => {
            dispatch(setLoading(false));
            dispatch(fetchCateTop(data.dataSource));
        });
        realDataApi.goodsDataAnalysis(queryData, type).then(data => {
            if (type == 'USE') {
                dispatch(fetchCateUse(data.dataCharts));
            } else {
                dispatch(fetchCateGet(data.dataCharts));
            }
        });
    };
}

export function handleAllTradesData(queryData, type) {
    return (dispatch, getState) => {
        dispatch(setLoading(true));

        realDataApi.queryReportTopData(queryData).then(data => {
            dispatch(setLoading(false));
            dispatch(fetchCateTop(data.dataSource));
        });

        realDataApi.marketTagDataAnalysis(queryData).then(data => {
            dispatch(fetchMarket(data.dataCharts));
        });

        realDataApi.marketDataAnalysisByTag(queryData, type).then(data => {
            dispatch(fetchMarketTag(data.dataCharts));
        });

    };
}

export function handleAllAlipayData(key) {
    return (dispatch, getState) => {
        dispatch(setLoading(true));

        realDataApi.queryIsSubscribe().then(({code, msg, data}) => {
            if (parseInt(code) === 200) {
                if (parseInt(data.isSubscribe) === 1) {
                    dispatch(setMiyaVip(data.partner_id));
                    alipayDataFetchIn(data.partner_id, key, dispatch);
                } else {
                    dispatch(setMiyaVip('1010'));
                }
            } else {
                dispatch(setMiyaVip('1010'));
            }
        });
    }
}

function alipayDataFetchIn(id, key, dispatch) {
    Promise.all([
        realDataApi.fetchAlipaycouponData(id, key),
        realDataApi.fetchAlipayShopData(id, key),
        realDataApi.fetchAlipayTodayData(id, key)
    ]).then(data => {
        console.log(data);
        const $data = {
            topToday: data[2],
            topToatl: data[1]
        };
        dispatch(fetchAlipayData(data[0]));
        dispatch(fetchRakingData($data));
        dispatch(setLoading(false));
    }).catch(error => {
        dispatch(setLoading(false));
        message.error('请求超时,请检查您的网络');
    });
}

const initialState = {
    activityList: [],
    alipayActivityList: [],
    couponList: [],
    activeid: '',
    alipayActiveid: '',
    activename: '',
    couponId: '',
    starttime: '',
    alipayStarttime: '',
    endtime: '',
    alipayEndtime: '',
    queryType: '',
    channelUse: [],
    channelGet: [],
    sumData: [],
    sumDataGet: [],
    sumDataUse: [],
    totalData: [],
    trendData: {},
    dataFunnel: {},
    viewTopData: {},
    useData: [],
    getData: [],
    getCate: [],
    useCate: [],
    topData: [],
    getMarket: [],
    getTag: [],
    isloading: false,
    numIn: false,
    alipayNumIn: false,
    alipayData: {},
    rankData: {},
    isMiyaVip: '',
    trendKey: 'coupon'
};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ACTIVITY_LIST_SUCCESS:
            return {
                ...state,
                activityList: action.activityList
            };
        case FETCH_COUPON_LIST_SUCCESS:
            return {
                ...state,
                couponList: action.couponList
            };
        case SET_COUPON_ID:
            return {
                ...state,
                couponId: action.couponId
            };
        case SET_ACTIVITY_ID:
            return {
                ...state,
                activeid: action.activeid
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
        case SET_QUERT_TYPE:
            return {
                ...state,
                queryType: action.queryType
            };

        case FETCH_SUM_DATA:
            return {
                ...state,
                sumData: action.sumData
            };
        case FETCH_SUM_GET_DATA:
            return {
                ...state,
                sumDataGet: action.sumDataGet
            };
        case FETCH_SUM_USE_DATA:
            return {
                ...state,
                sumDataUse: action.sumDataUse
            };
        case FETCH_TOTAL_DATA:
            return {
                ...state,
                totalData: action.totalData
            };
        case FETCH_VIEW_DATA:
            return {
                ...state,
                viewTopData: action.viewTopData
            };
        case FETCH_FUNNEL_DATA:
            return {
                ...state,
                dataFunnel: action.dataFunnel
            };
        case FETCH_TREND_DATA:
            return {
                ...state,
                trendData: action.trendData
            };
        case FETCH_USE_DATA:
            return {
                ...state,
                useData: action.useData
            };
        case FETCH_GET_DATA:
            return {
                ...state,
                getData: action.getData
            };
        case FETCH_GET_CHANNEL:
            return {
                ...state,
                channelGet: action.channelGet
            };
        case FETCH_USE_CHANNEL:
            return {
                ...state,
                channelUse: action.channelUse
            };
        case SET_LOADING:
            return {
                ...state,
                isloading: action.isloading
            };
        case SET_NUM_IN:
            return {
                ...state,
                numIn: action.numIn
            };
        case SET_ALIPAYNUM_IN:
            return {
                ...state,
                alipayNumIn: action.alipayNumIn
            };
        case FETCH_TOP_CATE:
            return {
                ...state,
                topData: action.topData
            };
        case FETCH_GET_CATE:
            return {
                ...state,
                getCate: action.getCate
            };
        case FETCH_USE_CATE:
            return {
                ...state,
                useCate: action.useCate
            };
        case FETCH_TAG_DATA:
            return {
                ...state,
                getTag: action.getTag
            };
        case FETCH_MARKET_DATA:
            return {
                ...state,
                getMarket: action.getMarket
            };
        case FETCH_ALIPAY_DATA:
            return {
                ...state,
                alipayData: action.alipayData
            };
        case FETCH_RANKING_DATA:
            return {
                ...state,
                rankData: action.rankData
            };
        case SET_MIYA_VIP:
            return {
                ...state,
                isMiyaVip: action.isMiyaVip
            };
        case SET_ACTIVE_NAME:
            return {
                ...state,
                activename: action.activename
            };
        case FETCH_ALIPAYACTIVITY_LIST_SUCCESS:
            return {
                ...state,
                alipayActivityList: action.alipayActivityList
            };
        case SET_ALIPAYACTIVITY_ID:
            return {
                ...state,
                alipayActiveid: action.alipayActiveid
            };
        case SET_ALIPAYSTART_TIME:
            return {
                ...state,
                alipayStarttime: action.alipayStarttime
            };
        case SET_ALIPAYEND_TIME:
            return {
                ...state,
                alipayEndtime: action.alipayEndtime
            };
        case SET_TREND_KEY:
            return {
                ...state,
                trendKey: action.trendKey
            };

        default:
            return state;
    }
}
