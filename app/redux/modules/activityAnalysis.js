import {activityAnalysisApi} from 'api';
const PREFIX = '@@ACTIVITYANALYSIS/';

const FANSCHARTS = PREFIX + 'FANSCHARTS';
const EFFOVERVIEW = PREFIX + 'EFFOVERVIEW';
const EFFPOSSMAP = PREFIX + 'EFFPOSSMAP';
const GOODSDISCOUNT = PREFIX + 'GOODSDISCOUNT';
const GOODSDISCOUNTSTR = PREFIX + 'GOODSDISCOUNTSTR';
const DISCOUNTSTR = PREFIX + 'DISCOUNTSTR';
const GOODSLIST = PREFIX + 'GOODSLIST';
const DISCOUNTLIST = PREFIX + 'DISCOUNTLIST';
const SELECTNAME = PREFIX + 'SELECTNAME';
const SELECTNAMEDISCOUNT = PREFIX + 'SELECTNAMEDISCOUNT';
const SET_NUM_IN = PREFIX + 'SET_NUM_IN';
const FANSNUMTOTAL = PREFIX + 'FANSNUMTOTAL';



export function setNumIn(numIn) {
    return {type: SET_NUM_IN, numIn};
}

export function getFansChart(fansChart) {
    return {
      type: FANSCHARTS,
      fansChart
    };
}
export function getEffOverview(effOverview) {
    return {
      type: EFFOVERVIEW,
      effOverview
    };
}

export function getEffPossMap(effPossMap) {
    return {
      type: EFFPOSSMAP,
      effPossMap
    };
}

export function getGoodsDiscount(goodsDiscount) {
    return {
      type: GOODSDISCOUNT,
      goodsDiscount
    };
}
export function getDiscountStr(discountStr) {
    return {
      type: DISCOUNTSTR,
      discountStr
    };
}
export function getGoodsList(goodsList) {
    return {
      type: GOODSLIST,
      goodsList
    };
}
export function getDiscountList(discountList) {
    return {
      type: DISCOUNTLIST,
      discountList
    };
}

export function getSelectName(selectName) {
    return {
      type: SELECTNAME,
      selectName
    };
}

export function getSelectNameDiscount(selectNameDiscount) {
    return {
      type: SELECTNAMEDISCOUNT,
      selectNameDiscount
    };
}

export function getFansNumTotal(fansNumTotal) {
    return {
      type: FANSNUMTOTAL,
      fansNumTotal
    };
}





export function handleFansChart() {
    return (dispatch, getState) => {
        return activityAnalysisApi.ActiveFansGrandCondition()
        .then(data => {
            dispatch(getFansChart(data));
        })
    };
}
export function handleEffOverview() {
    return (dispatch, getState) => {
        return activityAnalysisApi.getActiveEffOverview()
        .then(effOverview => {
            dispatch(getEffOverview(effOverview));
        })
    };
}

export function handleEffPossMap() {
    return (dispatch, getState) => {
        return activityAnalysisApi.getActiveEffPossMap()
        .then(data => {
            dispatch(getEffPossMap(data));
        })
    };
}
export function handleGoodsDiscount(goodsid) {
    return (dispatch, getState) => {
        return activityAnalysisApi.getActiveEffGoodsDiscount(goodsid)
        .then(data => {
            dispatch(getGoodsDiscount(data))

        })
    };
}

export function handleDiscountStr(discountStr) {
    return (dispatch, getState) => {
        return activityAnalysisApi.getActiveEffDiscountStr(discountStr)
        .then(data => {
            dispatch(getDiscountStr(data));
        })
    };
}

export function handleGoodsList() {
    return (dispatch, getState) => {
        return activityAnalysisApi.getActiveEffGoodsList()
        .then(data => {
            dispatch(getGoodsList(data))
            dispatch(getSelectName(data[0].goods_id))
        })
    };
}
export function handleDiscountList() {
    return (dispatch, getState) => {
        return activityAnalysisApi.getActiveEffDiscountList()
        .then(data => {
            dispatch(getDiscountList(data))
            dispatch(getSelectNameDiscount(data[0].discount))
        })
    };
}

export function handleFansNumTotal() {
    return (dispatch, getState) => {
        return activityAnalysisApi.getAllActiveFansNumTotal()
        .then(data => {
            dispatch(getFansNumTotal(data))
        })
    };
}
const initailState = {
  fansChart:[],
  effOverview:[],
  effPossMap:[],
  goodsDiscount:[],
  discountStr:[],
  goodsList:[],
  discountList:[],
  selectName:'',
  selectNameDiscount:'',
  numIn: false,
  fansNumTotal:[],
};

export default function reducer(state = initailState, action) {
  switch (action.type) {
    case FANSCHARTS:
        return {...state,fansChart: action.fansChart};
    case EFFOVERVIEW:
        return {...state,effOverview: action.effOverview};
    case EFFPOSSMAP:
        return {...state,effPossMap: action.effPossMap};
    case GOODSDISCOUNT:
        return {...state,goodsDiscount: action.goodsDiscount};
    case DISCOUNTSTR:
        return {...state,discountStr: action.discountStr};
    case GOODSLIST:
        return {...state,goodsList: action.goodsList};
    case DISCOUNTLIST:
        return {...state,discountList: action.discountList};
    case SELECTNAME:
        return {...state,selectName: action.selectName};
    case SELECTNAMEDISCOUNT:
        return {...state,selectNameDiscount: action.selectNameDiscount};
    case SET_NUM_IN:
        return {...state,numIn: action.numIn};
    case FANSNUMTOTAL:
        return {...state,fansNumTotal: action.fansNumTotal};
    default:
      return state;
  }
}
