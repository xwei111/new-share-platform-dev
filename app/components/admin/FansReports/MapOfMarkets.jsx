import React, {Component, PropTypes} from 'react';
import { Modal } from 'antd';
import styles from './styles.css';

import {ShopperContainer, ActivityShopperContainer} from 'containers/admin/DataReports';
import { AddressSelection } from 'components/admin/FansReports'
import { CityHistogramChart } from 'components/admin/FansReports/Charts'

export default class MapOfMarkets extends Component {
    render() {
        const {visible, cityname, cityArr, marketArr, selectName, onHandleClose, handleFetchCityArr, handleFetchMarketArr, setSelectName, setCityName} = this.props;
        
        return (
            <Modal
                visible={visible}
                title="城市门店核销明细图"
                onCancel={onHandleClose}
                footer={null}
                width='870'
            >
                <div style={{overflow: 'hidden',width: '100%'}}>
                    <AddressSelection cityname={cityname} cityArr={cityArr} handleFetchCityArr={handleFetchCityArr} handleFetchMarketArr={handleFetchMarketArr}  setSelectName={setSelectName}/>
                    <CityHistogramChart marketArr={marketArr} selectName={selectName} setCityName={setCityName}/>
                </div>
            </Modal>
        )
    }
}
