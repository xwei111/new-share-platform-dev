import React, {
    PropTypes,
    Component
} from 'react';
import {
    Form,
    Cascader,
    Input,
    message,
    Modal,
    Row,
    Col
} from 'antd';
import EventEmitter, {
    MARKET_MODAL_CLOSE,
    GEO,
    GEO_SUCCESS,
    GEO_MAP
} from 'helpers/event';

let _num = 0;
export default class AddressSelection extends Component {


    componentDidMount() {
        const {
            handleFetchCityArr
        } = this.props;
        handleFetchCityArr(0);
    }

    componentWillReceiveProps(nextProps) {
        const {
            cityname,
            cityArr
        } = nextProps;
        
        const { handleFetchMarketArr, setSelectName } = this.props;
        
        if (cityArr != this.props.cityArr) {
            
            // add new -------------

                let map = new AMap.Map('location-map', {
                    resizeEnable: true,
                    zoom: 17
                });
                map.setCity(cityname);
                
                map.clearMap();  // 清除地图覆盖物

                // 添加一些分布不均的点到地图上,地图上添加三个点标记，作为参照
                cityArr.forEach(function(marker) {
                    new AMap.Marker({
                        map: map,
                        icon: marker.icon,
                        position: [marker.longitude, marker.latitude],
                    }).on('click',function(){
                        handleFetchMarketArr(marker.cityName);
                        setSelectName(marker.cityName);
                    });
                });
                
            // new end --------------

        }
    }

    render() {
        
        return ( <
            div style = {
                {
                    float: 'left',
                    width: '500px'
                }
            } >
            <
            div id = "location-map"
            style = {
                {
                    width: '100%',
                    height: '300px',
                    marginTop: '16px'
                }
            } >
            <
            /div> < /
            div >
        );
    }
}
