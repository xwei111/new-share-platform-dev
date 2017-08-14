import axios from 'axios';
import {host,hosts} from 'config/constants';

export function chartsproduct(active_id){
	return axios.get(hosts+'/gxpt/activeCouponMarket?active_id='+active_id)
		.then(data=>JSON.parse(data.data.data))
}

export function chartsactivity(active_id,orderColumnName){
	return axios.get(hosts+'/gxpt/couponActiveEff?active_id='+active_id+'&orderColumnName='+orderColumnName)
		.then(data=>data.data.data.reverse())
}
