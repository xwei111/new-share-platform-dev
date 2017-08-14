import React, {Component, PropTypes} from 'react';
import { Modal } from 'antd';
import styles from './styles.css';

import {ShopperContainer, ActivityShopperContainer} from 'containers/admin/DataReports';
import { AddressSelection } from 'components/admin/DataReports'
import { CityHistogramChart } from 'components/admin/DataReports/Charts'

export default class MapOfMarkets extends Component {
    render() {
        const {visible, cityname, cityArr, marketArr, selectName, onHandleClose, handleFetchCityArr, handleFetchMarketArr, setSelectName, setCityName, activeid} = this.props;
        
        return (
            <Modal
                visible={visible}
                title="城市门店核销明细图"
                onCancel={onHandleClose}
                footer={null}
                width='870px'
            >
                <div style={{overflow: 'hidden',width: '100%'}}>
                    <AddressSelection cityname={cityname} cityArr={cityArr} handleFetchCityArr={handleFetchCityArr} handleFetchMarketArr={handleFetchMarketArr} activeid={activeid} setSelectName={setSelectName}/>
                    <CityHistogramChart marketArr={marketArr} selectName={selectName} setCityName={setCityName}/>
                </div>
            </Modal>
        )
    }
}
