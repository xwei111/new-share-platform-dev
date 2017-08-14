import { YESTERDAY,SEVENDAY } from 'helpers/util';

const PREFIX = '@@COMMODITYTAG/';
const HANDLE_SETSHOW = PREFIX + 'HANDLE_SETSHOW';
const GET_DATA = PREFIX + 'GET_DATA';
const GET_DATA_FAIL = PREFIX + 'GET_DATA_FAIL';
const GET_DATA_SUCCESS = PREFIX + 'GET_DATA_SUCCESS';

const GET_TOTAL = PREFIX + 'GET_TOTAL';
const SHOW_DETAIL = PREFIX + 'SHOW_DETAIL';
const SHOW_CUSTOM = PREFIX + 'SHOW_CUSTOM';
const SET_PAGE = PREFIX + 'SET_PAGE';
const SET_QUERY_DATA = PREFIX + 'SET_QUERY_DATA';
const HIGNT_GOODS_SEARCH = PREFIX + 'HIGNT_GOODS_SEARCH';
const SET_CHECK_STATE = PREFIX + 'SET_CHECK_STATE';
const ADD_GOODS = PREFIX + 'ADD_GOODS';
const GET_ONE_GOODS_DETAIL = PREFIX + 'GET_ONE_GOODS_DETAIL';
const ID_ID = PREFIX + 'ID_ID';
const KRY_KEY = PREFIX + 'KRY_KEY';
const NEWDATA_SUCCESS=PREFIX+'NEWDATA_SUCCESS';
const NEWDATA_UPLOAD=PREFIX+'NEWDATA_UPLOAD';
const VISIBLE=PREFIX+'VISIBLE';
const CHECKGOODSID=PREFIX+'CHECKGOODSID';
const IMG_KEY_IN=PREFIX+'IMG_KEY_IN';



import { tagApi } from 'api';
export function handlerSetShow(setShow,setStyle) {
  return {
    type: HANDLE_SETSHOW,
    setShow,
    setStyle
  };
}
export function showCustom(custom) {
  return {
    type: SHOW_CUSTOM,
    custom
  };
}


export function GetData() {
  return {
    type: GET_DATA,
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

function GetPage(page) {
  return {
    type: SET_PAGE,
    page
  };
}


export function GetTotal(total) {
  return {
    type: GET_TOTAL,
    total,
  };
}


export function HandleShowDetail(showDetail) {
  return {
    type: SHOW_DETAIL,
    showDetail,
  };
}



export function HandleGoodsName(GoodsName,GoodsId,CatName,price) {
  return {
    type: HIGNT_GOODS_SEARCH,
    GoodsName,
    GoodsId,
    CatName,
    price,
  };
}
export function CheckState(setState) {
  return {
    type: SET_CHECK_STATE,
    setState,
  };
}



export function GetOneGoodsDetails(OneGoodsDetails,status,_id) {
  return {
    type: GET_ONE_GOODS_DETAIL,
    OneGoodsDetails,
    status,
    _id
  };
}



export function GetId(idId) {
  return {
    type: ID_ID,
    idId,
  };
}

export function GetKey(keyKey) {
  return {
    type: KRY_KEY,
    keyKey,
  };
}

export function Getvisible(visible) {
  return {
    type: VISIBLE,
    visible,
  };
}

export function setImgKeyIn(imgKey) {
  return {
    type: IMG_KEY_IN,
    imgKey,
  };
}


export function handleOneGoodsDetails(_id) {
  return dispatch => {
    tagApi.getGoodsLabelDetail(_id)
      .then(({editdata,status}) =>{
        dispatch(GetOneGoodsDetails(editdata,status,_id))
      })
  };
}

export function handleUpdateGoodsLabel(_id,goods_name,goods_id,brandname,catname,avalibale,pic) {
  return dispatch => {
    tagApi.updateGoodsLabel(_id,goods_name,goods_id,brandname,catname,avalibale,pic)
    .then((dataId) =>{
      dispatch(GetId(dataId))
    })
  };
}

export function handleAddGoodsLabel(goods_name_add,goods_id_add,brandname_add,catname_add,avalibale_add,pic_add) {
  return dispatch => {
    tagApi.addGoodsLabel(goods_name_add,goods_id_add,brandname_add,catname_add,avalibale_add,pic_add)
      .then((dataId) =>{
        dispatch(AddGoodsLabel(dataId))
      })
  };
}


export function AddGoodsLabel(goods_add_id) {
  return {
    type: ADD_GOODS,
    goods_add_id,
  };
}




export function handleCheckState(setState) {
  return (dispatch, getState) => {
    dispatch(CheckState(setState));
  };
}

export function handleGetData(page,GoodsName,GoodsId,CatName,price,setState) {
  return dispatch => {
    dispatch(GetData())
    tagApi.getGoodsLabelList(page,GoodsName,GoodsId,CatName,price,setState)
      .then(({dataSource, total}) =>{
        dispatch(GetDataSuccess(dataSource))
        dispatch(GetTotal(total))
        dispatch(GetPage(page))
        dispatch(HandleGoodsName(GoodsName,GoodsId,CatName,price))
        dispatch(handleCheckState(setState))
      })
      .catch(error => dispatch(GetDataFail(error)));
  };
}

export function checkGoodsId(bool) {
  return {
    type: CHECKGOODSID,
    bool
  };
}
export function HandleCheckGoodsId(goods_id){
	return (dispatch)=>{
		return tagApi.checkGoodsId(goods_id)
		.then(data=> dispatch(checkGoodsId(data)) )
	}
}



export function handlePageChange(page) {
  return (dispatch, getState) => {
    dispatch(GetPage(page));
    dispatch(handleGetData(page));
  };
}


export function handleShowDetail(key) {
  return (dispatch, getState) => {
    dispatch(ShowDetail('block'));
  };
}

function newdatesuccess(newdate){
	return {
		type:NEWDATA_SUCCESS,
		newdate
	}
}

function newdateupload(newdateload){
	return {
		type:NEWDATA_UPLOAD,
		newdateload
	}
}

export function newdatelist(List){
	return (dispatch)=>{
		return dispatch(newdatesuccess(List))
	}
}

export function newdatelistload(goodsfile){
	return (dispatch)=>{
		return tagApi.newdata(goodsfile)
		.then(data=> dispatch(newdateupload(data)) )
	}
}


const initialState = {
  loading: false,
  error: '',
  setShow: 'none',
  setStyle:'0',
  dataSource:[],
  showDetail:'none',
  style_Tab1:'#F89985',
  style_Tab2:'',
  total:9,
  page: 1,
  custom:'none',
  GoodsName:'',
  GoodsId:'',
  CatName:'',
  price:'',
  setState:'',
  OneGoodsDetails:[],
  status:'',
  _id:'',
  goods_add_id:'',
  idId:'',
  keyKey:'',
  newdate: [],
	newdateload:[],
  visible:false,
  bool:true,
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
    case SET_PAGE:
      return {...state, page: action.page};
    case SHOW_DETAIL:
      return {...state, showDetail:action.showDetail};
    case GET_TOTAL:
      return {...state, total:action.total};
    case SHOW_CUSTOM:
      return {...state, custom:action.custom};
    case SET_CHECK_STATE:
      return {...state, setState:action.setState};
    case HIGNT_GOODS_SEARCH:
      return {...state, GoodsName:action.GoodsName,GoodsId:action.GoodsId,CatName:action.CatName,price:action.price};
    case GET_ONE_GOODS_DETAIL:
      return {...state, OneGoodsDetails:action.OneGoodsDetails,status:action.status,_id:action._id};
    case ADD_GOODS:
      return {...state, goods_add_id:action.goods_add_id};
    case ID_ID:
      return {...state, idId:action.idId};
    case KRY_KEY:
      return {...state, keyKey:action.keyKey};
    case NEWDATA_SUCCESS:
      return {...state, newdate: action.newdate};
    case NEWDATA_UPLOAD:
      return {...state, newdateload: action.newdateload};
    case VISIBLE:
      return {...state, visible: action.visible};
    case CHECKGOODSID:
      return {...state, bool: action.bool};
    case IMG_KEY_IN:
    return {...state, imgKey: action.imgKey};
    default:
      return state;
  }
}
