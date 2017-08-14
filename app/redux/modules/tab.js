import {fromJS} from 'immutable';

const PREFIX = '@@TAB/';
const SET_TAB = PREFIX + 'SET_TAB';
const SET_MENU = PREFIX + 'SET_MENU';
const SET_HASH = PREFIX + 'SET_HASH';
const DISABLED_SELECT_MACKET = PREFIX + 'DISABLED_SELECT_MACKET';

export function setTab(tabKey) {
    return {type: SET_TAB, tabKey};
}

export function setMenu(hashKey, childKey) {
    return {type: SET_MENU, hashKey, childKey};
}

export function setHash(hashKey) {
    return {type: SET_HASH, hashKey};
}

export function disabledSelectMarket(disabledSelectMarket) {
    return {type: DISABLED_SELECT_MACKET, disabledSelectMarket}
}

const initialState = fromJS({tabKey: 'home', hashKey: 'homeData', childKey: 'home', disabledSelectMarket: false});

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case SET_TAB:
            return state.set('tabKey', action.tabKey);
        case SET_HASH:
            return state.set('hashKey', action.hashKey);
        case SET_MENU:
            return state.set('hashKey', action.hashKey).set('childKey', action.childKey);
        case DISABLED_SELECT_MACKET:
            return state.set('disabledSelectMarket', action.disabledSelectMarket);
        default:
            return state;
    }
}
