import {
    NAV
} from 'config/constants';

const PREFIX = '@@MENU/';
const SET_BRANDLER_NAV = PREFIX + 'SET_BRANDLER_NAV';
const SET_RETAILER_NAV = PREFIX + 'SET_RETAILER_NAV';
const SET_MIYA_NAV = PREFIX + 'SET_MIYA_NAV';
const SET_TIPS_PAGE = PREFIX + 'SET_TIPS_PAGE';

export function setTipsPage(tipsPage) {
    return {
        type: SET_TIPS_PAGE,
        tipsPage
    };
}


export function setBrandlerNav() {
  return {
    type: SET_BRANDLER_NAV
  };
}

export function setRetailerNav() {
  return {
    type: SET_RETAILER_NAV,
  };
}

export function setMiyaNav() {
  return {
    type: SET_MIYA_NAV,
  };
}
const initailState = {
    nav: NAV,
    tipsPage: false
};

export default function reducer(state = initailState, action) {
    switch (action.type) {
        case SET_BRANDLER_NAV:
            return {...state, nav: brandlerNav(NAV)};
        case SET_RETAILER_NAV:
            return {...state, nav: retailerNav(NAV)};
        case SET_TIPS_PAGE:
            return { ...state,
                tipsPage: action.tipsPage
            };
        default:
            return state;
    }
}

function brandlerNav(nav) {
    let {
        main,
        home,
        activity,
        monitor,
        analysis,
        management,
        fans
    } = nav;
    // coupon = coupon.filter(item => item.name !== '会抢券');
    // manage = manage.filter(item => !['门店管理', '生鲜券管理', '券业务配置'].includes(item.name));
    // analysis = analysis.filter(item => ['看板', '券况分析', '粉丝分析', '单品分析'].includes(item.name) );
    return {
        main,
        home,
        activity,
        monitor,
        analysis,
        management,
        fans
    };
}

function retailerNav(nav) {
    // const { MANAGE,ANALYSIS } = nav;
    let {
        main,
        home,
        activity,
        monitor,
        analysis,
        management,
        fans
    } = nav;
    // manage = manage.filter(item => item.name !== '券业务配置');
    // analysis = analysis.filter(item => ['单品核销量查询', '单品销售量查询', '门店核销量查询', '门店单品核销量查询', '门店单品销售量查询','领取核销渠道查询'].includes(item.name));
    return {
        main,
        home,
        activity,
        monitor,
        analysis,
        management,
        fans
    };
}
