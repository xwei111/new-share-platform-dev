import {fromJS, Map, List} from 'immutable';
import {COUPON_TYPE} from 'config/constants';
import {couponPublishApi} from 'api';

const {SINGLE, VOUCHER} = COUPON_TYPE;

const PREFIX = '@@PUBLISH_FORM/';
const SET_COUPON_TYPE = PREFIX + 'SET_COUPON_TYPE';
const SUBMIT_SUCCESS = PREFIX + 'SUBMIT_SUCCESS';
const SUBMIT_FAIL = PREFIX + 'SUBMIT_FAIL';
const OPEN_CONFIRM_MODAL = PREFIX + 'OPEN_CONFIRM_MODAL';
const CLOSE_CONFIRM_MODAL = PREFIX + 'CLOSE_CONFIRM_MODAL';
const SET_SUBMIT_DATA = PREFIX + 'SET_SUBMIT_DATA';
const RESET_FORM = PREFIX + 'RESET_FORM';
const SWITCH_TY_MODE = PREFIX + 'SWITCH_TY_MODE';
const SWITCH_HQ_MODE = PREFIX + 'SWITCH_HQ_MODE';
const SWITCH_KB_MODE = PREFIX + 'SWITCH_KB_MODE';
const SWITCH_WX_MODE = PREFIX + 'SWITCH_WX_MODE';
const SWITCH_HHDX_MODE = PREFIX + 'SWITCH_HHDX_MODE';
const SWITCH_WX_CUSTOM_MODE = PREFIX + 'SWITCH_WX_CUSTOM_MODE';
const SWITCH_WX_FRIEND_MODE = PREFIX + 'SWITCH_WX_FRIEND_MODE';
const SWITCH_DX_MODE = PREFIX + 'SWITCH_DX_MODE';
const IS_MY_VIP = PREFIX + 'IS_MY_VIP';
const FETCH_WX_BALANCE = PREFIX + 'FETCH_WX_BALANCE';
const SET_COUPON_DATA = PREFIX + 'SET_COUPON_DATA';
const SET_COUPON_NEXT = PREFIX + 'SET_COUPON_NEXT';
const SET_COUPON_CLEAR = PREFIX + 'SET_COUPON_CLEAR';

const CHOOSE_COUPON_TYPE = PREFIX + 'CHOOSE_COUPON_TYPE';
const SWITCH_BEFORE_MODE = PREFIX + 'SWITCH_BEFORE_MODE';
const SWITCH_WXBEFORE_MODE = PREFIX + 'SWITCH_WXBEFORE_MODE';

export function chooseCouponType(chooseType) {
    return {type: CHOOSE_COUPON_TYPE, chooseType};
}

export function chooseBeforeMode(isSelectMode) {
    return {type: SWITCH_BEFORE_MODE, isSelectMode};
}

export function chooseWxBeforeMode(isWxMode) {
    return {type: SWITCH_WXBEFORE_MODE, isWxMode};
}

export function setCouponType(couponType) {
    return {type: SET_COUPON_TYPE, couponType};
}

export function setCouponData(couponData) {
    return {type: SET_COUPON_DATA, couponData};
}

export function setCouponNext(couponData) {
    return {type: SET_COUPON_NEXT, couponData};
}

export function setCouponClear() {
    return {type: SET_COUPON_CLEAR};
}

function submitSuccess({url, qrcode}) {
    return {type: SUBMIT_SUCCESS, url, qrcode};
}

function submitFail(error) {
    return {type: SUBMIT_FAIL, error};
}

function openConfirmModal() {
    return {type: OPEN_CONFIRM_MODAL};
}

export function closeConfirmModal() {
    return {type: CLOSE_CONFIRM_MODAL};
}

function setSubmitData(submitData) {
    return {type: SET_SUBMIT_DATA, submitData};
}

export function switchMode1() {
    return {type: SWITCH_TY_MODE};
}

export function switchMode2() {
    return {type: SWITCH_HQ_MODE};
}

export function switchMode3() {
    return {type: SWITCH_KB_MODE};
}

export function switchMode4() {
    return {type: SWITCH_WX_MODE};
}

export function switchMode5() {
    return {type: SWITCH_HHDX_MODE};
}

export function switchModeWx1() {
    return {type: SWITCH_WX_CUSTOM_MODE};
}

export function switchModeWx2() {
    return {type: SWITCH_WX_FRIEND_MODE};
}

export function switchDxMode(dxMode) {
    return {type: SWITCH_DX_MODE, dxMode};
}

function isMyVipSwitch(partnerid) {
    return {type: IS_MY_VIP, partnerid};
}

function fetchWxBalance(balance) {
    return {type: FETCH_WX_BALANCE, balance};
}

export function handlefetchWxBalance() {
    return (dispatch, getState) => {
        return couponPublishApi.queryWxBalance().then(({code, msg, data}) => {
            if (parseInt(code) === 200) {
                let coin = data.total_coin;
                dispatch(fetchWxBalance(coin));
            } else {
                throw new Error(msg);
            }
        });
    };
}

export function handleIsMyVip() {
    return (dispatch, getState) => {
        return couponPublishApi.queryIsSubscribe().then(({code, msg, data}) => {
            if (parseInt(code) === 200) {
                if (parseInt(data.isSubscribe) === 0) {
                    // dispatch(isMyVipSwitch("2088421470247531"));
                    let isMyVip = getState().publishForm.get('isMyVip');
                } else if (parseInt(data.isSubscribe) === 1) {
                    dispatch(isMyVipSwitch(data.partner_id));
                }
            } else {
                throw new Error(msg);
            }
        });
    };
}

export function handlePreSubmit(data) {
    return (dispatch, getState) => {
        const {selectMarket, publishForm, marketing} = getState();

        const chooseType = publishForm.get('chooseType');

        if (chooseType === 0) {
            const currentMarkets = selectMarket.get('currentMarkets').toJS();
            const market = currentMarkets.reduce((result, item) => [
                ...result,
                ...item.targetKeys
            ], []).map(item => item.split(':')[1]).join(',');
            const saas = currentMarkets.reduce((result, item) => [
                ...result,
                item.saasId
            ], []).join(',');

            const type = publishForm.get('couponType');
            const submitData = {
                ...data,
                market,
                saas,
                type
            };
            dispatch(setSubmitData(submitData));
            dispatch(openConfirmModal());
        } else {
            // TODO: need to refactor
            const currentMarkets = selectMarket.get('currentMarkets').toJS();
            const starttime = marketing.startTime;
            const endtime = marketing.endTime;
            const tempActid = marketing.tempActid;
            const type = publishForm.get('couponType');
            const submitData = {
                ...data,
                starttime,
                endtime,
                tempActid,
                type
            };
            dispatch(setSubmitData(submitData));
            dispatch(openConfirmModal());
        }
    };
}

export function handleSubmit() {
    return (dispatch, getState) => {
        let submitData = getState().publishForm.get('submitData');
        let chooseType = getState().publishForm.get('chooseType');
        if (submitData.get('goodid')) {
            submitData = submitData.update('goodid', obj => obj.value);
        }
        submitData = submitData.toJS();
        dispatch(closeConfirmModal());
        return couponPublishApi.createCoupon(submitData).then(({code, msg, data}) => {
            if (parseInt(code) === 200) {
                dispatch(submitSuccess(data));
                if (chooseType === 1) {
                    dispatch(setCouponData(data));
                }
                return msg;
            } else {
                submitFail(msg);
                throw new Error(msg);
            }
        });
    };
}

const initialState = fromJS({
    couponType: -1,
    url: '',
    qrCode: null,
    confirmModalVisible: false,
    submitData: {},
    isSelectMode: 4,
    isWxMode: 0,
    dxMode: 0,
    isMyVip: false,
    partnerId: '',
    balance: '--',
    couponData: [],
    chooseType: ''
});

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_COUPON_TYPE:
            return state.set('couponType', action.couponType);
        case SUBMIT_SUCCESS:
            return state.set('url', action.url).set('qrcode', action.qrcode);
        case SUBMIT_FAIL:
            return state.set('error', action.error);
        case OPEN_CONFIRM_MODAL:
            return state.set('confirmModalVisible', true);
        case CLOSE_CONFIRM_MODAL:
            return state.set('confirmModalVisible', false);
        case SET_SUBMIT_DATA:
            return state.set('submitData', Map(action.submitData));
        case SWITCH_TY_MODE:
            return state.set('isSelectMode', 0);
        case SWITCH_HQ_MODE:
            return state.set('isSelectMode', 1);
        case SWITCH_KB_MODE:
            return state.set('isSelectMode', 2);
        case SWITCH_WX_MODE:
            return state.set('isSelectMode', 3);
        case SWITCH_HHDX_MODE:
            return state.set('isSelectMode', 4);
        case SWITCH_BEFORE_MODE:
            return state.set('isSelectMode', action.isSelectMode);
        case SWITCH_WXBEFORE_MODE:
            return state.set('isWxMode', action.isWxMode);
        case SWITCH_DX_MODE:
            return state.set('dxMode', action.dxMode);
        case SWITCH_WX_CUSTOM_MODE:
            return state.set('isWxMode', 0);
        case SWITCH_WX_FRIEND_MODE:
            return state.set('isWxMode', 1);
        case IS_MY_VIP:
            return state.set('isMyVip', true).set('partnerId', action.partnerid);
        case FETCH_WX_BALANCE:
            return state.set('balance', action.balance);
        case SET_COUPON_DATA:
            return state.set('couponData', state.get('couponData').push(action.couponData));
        case SET_COUPON_NEXT:
            return state.set('couponData', List(action.couponData));
        case SET_COUPON_CLEAR:
            return state.set('couponData', initialState.get('couponData'));
        case CHOOSE_COUPON_TYPE:
            return state.set('chooseType', action.chooseType);
        default:
            return state;
    }
}
