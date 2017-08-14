import md5 from "md5";
import axios from 'axios'
import { hosts } from 'config/constants';
import store from 'config/store.js';


//监视指标
export function monitor(active_id){
    return axios.get(hosts+'/monitor/findActiveMonitorByActiveId?active_id='+active_id)
        .then(data=>data.data.data)
}

// 监视数据走势
export function monitorData(active_id){
    return axios.get(hosts+'/monitorByDay/findAllByActiveId?active_id='+active_id)
        .then(data=>data.data.data)
}

// 门店面板
export function monitorDoor(active_id){
    return axios.get(hosts+'/activeByStore/getActiveByStoreByIdAndSort?active_id='+active_id)
        .then(data=>data.data.data)
}
