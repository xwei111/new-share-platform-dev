import axios from 'axios';
import {host,hosts} from 'config/constants';
// 各级别粉丝消费能力
export function getTagConsump(active_id){
    return axios.get(hosts+'/gxpt/getActivePersonalPayTagConsump?active_id='+active_id)
        .then(data=>JSON.parse(data.data.data))
}

// 粉丝积累数量概览
export function getFansNumber(active_id){
    return axios.get(hosts+'/gxpt/getActivePersonalPayTagNum?active_id='+active_id)
        .then(data=>JSON.parse(data.data.data).reverse())
}