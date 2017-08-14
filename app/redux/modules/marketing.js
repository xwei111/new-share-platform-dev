import {marketingApi} from 'api';
import {message} from 'antd';
const PREFIX = '@@MARKETING/';
const SET_MOUDLE_NAME = PREFIX + 'SET_MOUDLE_NAME';
const SET_COUPON_VISIBLE = PREFIX + 'SET_COUPON_VISIBLE';
const SET_TAG_VISIBLE = PREFIX + 'SET_TAG_VISIBLE';
const SET_ACTIVE_VISIBLE = PREFIX + 'SET_ACTIVE_VISIBLE';
const SET_ACTIVE_TIME = PREFIX + 'SET_ACTIVE_TIME';
const SET_TEMP_STR = PREFIX + 'SET_TEMP_STR';
const FETCH_TAG_DATA = PREFIX + 'FETCH_TAG_DATA';
const SET_SELECT_DATA = PREFIX + 'SET_SELECT_DATA';
const SET_SELECT_KEY = PREFIX + 'SET_SELECT_KEY';
const SET_TARGET_KEY = PREFIX + 'SET_TARGET_KEY';
const FETCH_ACTIVITY_ID = PREFIX + 'FETCH_ACTIVITY_ID';
const SET_COUPON_DATA = PREFIX + 'SET_COUPON_DATA';
const SET_INFO_VISIBLE = PREFIX + 'SET_INFO_VISIBLE';
const FETCH_COUPON_INFO = PREFIX + 'FETCH_COUPON_INFO';
const SET_PUBID = PREFIX + 'SET_PUBID';
const SET_ACT_NAME = PREFIX + 'SET_ACT_NAME';
const SET_FETCH_LOADING = PREFIX + 'SET_FETCH_LOADING';
const SET_TAG_DONE = PREFIX + 'SET_TAG_DONE';
const SET_YUCE_DATA = PREFIX + 'SET_YUCE_DATA';
const SET_PROPS = PREFIX + 'SET_PROPS';

export function setYuceData(yuceData) {
    return {type: SET_YUCE_DATA, yuceData};
}

export function setNextProps(props_next) {
    return {type: SET_PROPS, props_next};
}

export function setTagDone(tagDone) {
    return {type: SET_TAG_DONE, tagDone};
}

export function setFetchLoading(fetchLoading) {
    return {type: SET_FETCH_LOADING, fetchLoading};
}

export function setMoudleName(moudleName) {
    return {type: SET_MOUDLE_NAME, moudleName};
}

export function setActName(actName) {
    return {type: SET_ACT_NAME, actName};
}

export function setPubid(pubid) {
    return {type: SET_PUBID, pubid};
}

export function setCouponInfoVisible(infoVisible) {
    return {type: SET_INFO_VISIBLE, infoVisible};
}

export function setActiveVisible(actVisible) {
    return {type: SET_ACTIVE_VISIBLE, actVisible};
}

export function fetchCouponInfo(couponInfo) {
    return {type: FETCH_COUPON_INFO, couponInfo};
}

export function setcouponVisible(couponVisible) {
    return {type: SET_COUPON_VISIBLE, couponVisible};
}

export function setTagVisible(tagVisible) {
    return {type: SET_TAG_VISIBLE, tagVisible};
}

export function setActiveTime(startTime, endTime) {
    return {type: SET_ACTIVE_TIME, startTime, endTime};
}

export function setTempActid(tempActid) {
    return {type: SET_TEMP_STR, tempActid};
}

function fetchTagData(tagData) {
    return {type: FETCH_TAG_DATA, tagData};
}

export function openMoudleBox() {
    return (dispatch, getState) => {
        dispatch(setTagVisible(true));
        if (!getState().marketing.tagData.length) {
            marketingApi.fetchTagData().then(data => dispatch(fetchTagData(data)))
        }
    };
}

export function closeMoudleBox() {
    return (dispatch, getState) => {
        if (!getState().marketing.targetKeys.length) {
            message.error('请选择人群标签');
            return;
        }
        dispatch(setTagVisible(false));
    };
}

export function setSelectData(selectData) {
    return {type: SET_SELECT_DATA, selectData};
}

export function setSelectKey(selectedKeys) {
    return {type: SET_SELECT_KEY, selectedKeys};
}

export function setTargetKey(targetKeys) {
    return {type: SET_TARGET_KEY, targetKeys};
}

function fetchActivityId(activityId) {
    return {type: FETCH_ACTIVITY_ID, activityId};
}

export function handleFetchActivityId(queryData) {
    return (dispatch, getState) => {
        return marketingApi.createActivity(queryData).then(data => {
            if (data.code == '200') {
                message.success('请求成功');
                dispatch(fetchActivityId(data.data.activeid))
            } else {
                message.error(data.msg);
                throw new Error(data.msg);
            }
        })
    };
}

export function handleFetchCouponInfo(id) {
    return (dispatch, getState) => {
        return marketingApi.fetchTicketDetail(id).then(data => {
            dispatch(fetchCouponInfo(data));
            dispatch(setSelectData(id));
        })
    };
}

function setCouponData(couponData) {
    return {type: SET_COUPON_DATA, couponData};
}

const initailState = {
    moudleName: '',
    actName: '',
    couponVisible: false,
    tagVisible: false,
    infoVisible: false,
    startTime: '',
    endTime: '',
    tempActid: '',
    tagData: [],
    selectData: [],
    selectedKeys: [],
    targetKeys: [],
    activityId: '',
    couponData: [],
    couponInfo: {},
    pubid: '',
    actVisible: false,
    fetchLoading: false,
    tagDone: [],
    yuceData: {efforts: '' ,other: 0, huizhuan: 1, actiontype: '', coupon: '', off: '', max_coupon: '', max_off: '', wuliao: []},
    props_next: 0
};

export default function reducer(state = initailState, action) {
    switch (action.type) {
        case SET_MOUDLE_NAME:
            return {
                ...state,
                moudleName: action.moudleName
            };
        case SET_ACT_NAME:
            return {
                ...state,
                actName: action.actName
            };
        case SET_COUPON_VISIBLE:
            return {
                ...state,
                couponVisible: action.couponVisible
            };
        case SET_ACTIVE_TIME:
            return {
                ...state,
                startTime: action.startTime,
                endTime: action.endTime
            };
        case SET_TEMP_STR:
            return {
                ...state,
                tempActid: action.tempActid
            };
        case SET_TAG_VISIBLE:
            return {
                ...state,
                tagVisible: action.tagVisible
            };
        case SET_ACTIVE_VISIBLE:
            return {
                ...state,
                actVisible: action.actVisible
            };
        case FETCH_TAG_DATA:
            return {
                ...state,
                tagData: action.tagData
            };
        case SET_SELECT_DATA:
            return {
                ...state,
                selectData: action.selectData
            };
        case SET_SELECT_KEY:
            return {
                ...state,
                selectedKeys: action.selectedKeys
            };
        case SET_TARGET_KEY:
            return {
                ...state,
                targetKeys: action.targetKeys
            };
        case FETCH_ACTIVITY_ID:
            return {
                ...state,
                activityId: action.activityId
            };
        case SET_COUPON_DATA:
            return {
                ...state,
                couponData: action.couponData
            };
        case SET_INFO_VISIBLE:
            return {
                ...state,
                infoVisible: action.infoVisible
            };
        case FETCH_COUPON_INFO:
            return {
                ...state,
                couponInfo: action.couponInfo
            };
        case SET_PUBID:
            return {
                ...state,
                pubid: action.pubid
            };
        case SET_FETCH_LOADING:
            return {
                ...state,
                fetchLoading: action.fetchLoading
            };
        case SET_TAG_DONE:
            return {
                ...state,
                tagDone: action.tagDone
            };
        case SET_YUCE_DATA:
            return {
                ...state,
                yuceData: action.yuceData
            };
        case SET_PROPS:
            return {
                ...state,
                props_next: action.props_next
            };
        default:
            return state;
    }
}
