import { YESTERDAY,SEVENDAY } from 'helpers/util';

const PREFIX = '@@MARKETTAG/';
const HANDLE_SETSHOW = PREFIX + 'HANDLE_SETSHOW';
const GET_DATA_SUCCESS = PREFIX + 'GET_DATA_SUCCESS';

const SHOW_TAb = PREFIX + 'SHOW_TAb';
const GET_HIGH_SEARCH = PREFIX + 'GET_HIGH_SEARCH';
const SET_CHECK_STATE = PREFIX + 'SET_CHECK_STATE';
const SET_CHECK_STATE_TWO = PREFIX + 'SET_CHECK_STATE_TWO';
const LOADING = PREFIX + 'LOADING';
const SHOW_DETAIL = PREFIX + 'SHOW_DETAIL';
const GET_GOODS_DETAILS = PREFIX + 'GET_GOODS_DETAILS';
const UPDTA_MARKET_INFO = PREFIX + 'UPDTA_MARKET_INFO';



import { tagApi } from 'api';
export function handlerSetShow(setShow,setStyle) {
  return {
    type: HANDLE_SETSHOW,
    setShow,
    setStyle
  };
}

export function handlerLoading(loading) {
  return {
    type: LOADING,
    loading
  };
}




export function GetDataSuccess(dataSource) {
  return {
    type: GET_DATA_SUCCESS,
    dataSource,
  };
}



export function ShowTab(showTab1,showTab2,style_Tab1,style_Tab2) {
  return {
    type: SHOW_TAb,
    showTab1,
    showTab2,
    style_Tab1,
    style_Tab2,
  };
}




export function HandleHighSearch(storename) {
  return {
    type: GET_HIGH_SEARCH,
    storename,
  };
}
export function CheckState(setState) {
  return {
    type: SET_CHECK_STATE,
    setState,
  };
}





export function _CheckState(_setState) {
  return {
    type: SET_CHECK_STATE_TWO,
    _setState,
  };
}

export function SetUpdateMarketInfo(updateMarketInfo) {
  return {
    type: UPDTA_MARKET_INFO,
    updateMarketInfo,
  };
}

export function handleUpdateMarketInfo(id,storename,markettype,promoters,promoters_phone,status) {
  return dispatch => {
    tagApi.updateMarketInfo(id,storename,markettype,promoters,promoters_phone,status)
      .then((data) => {
        dispatch(SetUpdateMarketInfo(data))

      })
  };
}





export function handleGetData() {
  return dispatch => {
    dispatch(handlerLoading(true))
    tagApi.getMarketLabelList()
      .then((data) => {
        dispatch(GetDataSuccess(data))
        dispatch(handlerLoading(false))

      })
  };
}


export function handleSearchMarketList(storename,markettype,status) {
  return dispatch => {
    dispatch(handlerLoading(true))
    tagApi.searchMarketList(storename,markettype,status)
      .then((data) => {
        dispatch(GetDataSuccess(data))
        dispatch(handlerLoading(false))

      })
  };
}


export function handleShowDetail(key) {
  return (dispatch, getState) => {
    dispatch(ShowDetail('block'));
  };
}

export function HandleShowDetail(showDetail) {
  return {
    type: SHOW_DETAIL,
    showDetail,
  };
}

export function GetGoodsDetails(GoodsDetailsAll) {
  return {
    type: GET_GOODS_DETAILS,
    GoodsDetailsAll,
  };
}



const initialState = {
  loading: false,
  setShow: 'none',
  setStyle:'0',
  dataSource:[],
  showTab1:'block',
  showTab2:'none',
  style_Tab1:'#F89985',
  style_Tab2:'',
  _setState:'',
  setState:'',
  storename:'',
  showDetail:'none',
  GoodsDetailsAll:[],
  updateMarketInfo:[],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_SETSHOW:
      return {...state, setShow: action.setShow,setStyle:action.setStyle};
    case GET_DATA_SUCCESS:
      return {...state, dataSource: action.dataSource};
    case SHOW_TAb:
      return {...state, showTab1:action.showTab1,showTab2:action.showTab2,style_Tab1:action.style_Tab1,style_Tab2:action.style_Tab2};
    case SET_CHECK_STATE:
      return {...state, setState:action.setState};
    case SET_CHECK_STATE_TWO:
      return {...state,_setState:action._setState};
    case GET_HIGH_SEARCH:
      return {...state, storename:action.storename};
    case LOADING:
      return {...state, loading:action.loading};
    case SHOW_DETAIL:
      return {...state, showDetail:action.showDetail};
    case GET_GOODS_DETAILS:
      return {...state, GoodsDetailsAll:action.GoodsDetailsAll};
    case UPDTA_MARKET_INFO:
      return {...state, updateMarketInfo:action.updateMarketInfo};

    default:
      return state;
  }
}
