import { tagApi } from 'api';
import { YESTERDAY,SEVENDAY } from 'helpers/util';

const PREFIX = '@@MEMBERTAG/';
const HANDLE_SETSHOW = PREFIX + 'HANDLE_SETSHOW';
const GET_DATA = PREFIX + 'GET_DATA';
const GET_DATA_FAIL = PREFIX + 'GET_DATA_FAIL';
const GET_DATA_SUCCESS = PREFIX + 'GET_DATA_SUCCESS';
const SHOW_DETAIL = PREFIX + 'SHOW_DETAIL';
const SHOW_TAb = PREFIX + 'SHOW_TAb';
const SHOW_CUSTOM = PREFIX + 'SHOW_CUSTOM';
const GET_LABEL_NAME = PREFIX + 'GET_LABEL_NAME';
const SEARCH_NUM = PREFIX + 'SEARCH_NUM';
const ADD_NEW_TAG_DATA = PREFIX + 'ADD_NEW_TAG_DATA';
const ADD_NEW_TAG_RATE = PREFIX + 'ADD_NEW_TAG_RATE';
const ADD_NEW_TAG_QUERY = PREFIX + 'ADD_NEW_TAG_QUERY';

export function handlerSetShow(setShow,setStyle) {
  return {
    type: HANDLE_SETSHOW,
    setShow,
    setStyle
  };
}

export function GetData() {
  return {
    type: GET_DATA,
  };
}
export function showCustom(custom) {
  return {
    type: SHOW_CUSTOM,
    custom
  };
}

export function GetDataSuccess(dataSource) {
  return {
    type: GET_DATA_SUCCESS,
    dataSource,
  };
}
export function GetDataFail(error) {
  return {
    type: GET_DATA_FAIL,
    error,
  };
}



export function ShowTab(showTab1,showTab2) {
  return {
    type: SHOW_TAb,
    showTab1,
    showTab2,
  };
}



export function HandleShowDetail(showDetail) {
  return {
    type: SHOW_DETAIL,
    showDetail,
  };
}

export function getLabelName(dataLabel) {
  return {
    type:GET_LABEL_NAME,
    dataLabel,
  };
}


export function getSearchContent(labelname,fromNum,toNum,type_tag,status) {
  return {
    type:SEARCH_NUM,
    labelname,
    fromNum,
    toNum,
    type_tag,
    status,
  };
}

export function fetchAddNewData(newAdd) {
  return {
    type: ADD_NEW_TAG_DATA,
    newAdd
  }
}

export function fetchAddNewRate(newAddRate) {
  return {
    type: ADD_NEW_TAG_RATE,
    newAddRate
  }
}

export function setAddNewQuery(newAddQuery) {
  return {
    type: ADD_NEW_TAG_QUERY,
    newAddQuery
  }
}

export function handleSearchList(label_name,from,to,label_type,status) {
  return dispatch => {
    dispatch(GetData())
    tagApi.getUsersLabelListBySearch(label_name,from,to,label_type,status)
      .then(data => dispatch(GetDataSuccess(data)))
      .catch(error => dispatch(GetDataFail(error)));
  };
}


export function handleGetData() {
  return dispatch => {
    dispatch(GetData())
    tagApi.getUserLabelList()
      .then(({dataSource}) => {
        dispatch(GetDataSuccess(dataSource))
      })
      .catch(error => dispatch(GetDataFail(error)));
  };
}




export function handleLabelDetail(labelname) {
  return (dispatch, getState) => {
      return tagApi.getUserLabelDetail(labelname)
      .then(data => data.data.data)
      .then(dataLabel => dispatch(getLabelName(dataLabel)))
  };
}



export function handleShowDetail(key) {
  return (dispatch, getState) => {
    dispatch(ShowDetail('block'));
  };
}

export function handleFetchAddNewData() {
  return dispatch => {
    tagApi.getSPlatBaseLabelDao()
      .then(data => dispatch(fetchAddNewData(data)))
  };
}

export function handleFetchAddNewRate(querydata) {
  return dispatch => {
    tagApi.getLabelCountAndRate(querydata)
      .then(data => dispatch(fetchAddNewRate(data)))
  };
}


const initialState = {
  loading: false,
  error: '',
  setShow: 'none',
  setStyle:'0',
  dataSource:[],
  showDetail:'none',
  showTab1:'block',
  showTab2:'block',
  custom:'none',
  labelname:'null',
  dataLabel:[],
  type_tag:'null',
  status:'null',
  fromNum:'0',
  toNum:'0',
  newAdd: [],
  newAddQuery: {},
  newAddRate: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case HANDLE_SETSHOW:
      return {...state, setShow: action.setShow,setStyle:action.setStyle};
    case GET_DATA:
      return {...state, loading: true};
    case GET_DATA_SUCCESS:
      return {...state, loading: false, dataSource: action.dataSource};
    case GET_DATA_FAIL:
      return {...state, loading: false, error: action.error};
    case SHOW_DETAIL:
      return {...state, showDetail:action.showDetail};
    case SHOW_TAb:
      return {...state, showTab1:action.showTab1,showTab2:action.showTab2};
    case SHOW_CUSTOM:
      return {...state, custom:action.custom};
    case GET_LABEL_NAME:
      return {...state,dataLabel:action.dataLabel};
    case SEARCH_NUM:
      return {...state,labelname:action.labelname,fromNum:action.fromNum,toNum:action.toNum,type_tag:action.type_tag,status:action.status};
    case ADD_NEW_TAG_DATA:
      return {...state,newAdd:action.newAdd};
    case ADD_NEW_TAG_RATE:
      return {...state,newAddRate:action.newAddRate};
    case ADD_NEW_TAG_QUERY:
      return {...state,newAddQuery:action.newAddQuery};
    default:
      return state;
  }
}
