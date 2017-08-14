import React, { Component, PropTypes } from 'react';
import { Modal, TreeSelect, Select, Transfer, Button } from 'antd';
import { USER_TYPE } from 'config/constants';
import { transformProviceAndCity } from 'helpers/util';

import { RetailerMarket } from './MarketItem';

export default class MarketSelection extends Component {
  static propTypes = {
    provinceAndCity: PropTypes.array.isRequired,
    saasList: PropTypes.array.isRequired,
    nextMarkets: PropTypes.array.isRequired,
    visible: PropTypes.bool.isRequired,
    userType: PropTypes.number.isRequired,
    onRegionChange: PropTypes.func.isRequired,
    onSaasIdChange: PropTypes.func.isRequired,
    onMarketChange: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func.isRequired,
    onAddSaasBtnClick: PropTypes.func.isRequired,
    onRemoveSaasBtnClick: PropTypes.func.isRequired,
  }
  render() {
    const { visible, saasList, provinceAndCity, nextMarkets, userType, onRegionChange, onSaasIdChange,
      onAddSaasBtnClick, onCancel, onMarketChange, onOk, onRemoveSaasBtnClick,isSelectMode, isMyVip } = this.props;
    return (
      <Modal title="门店选择" visible={visible} onCancel={onCancel} onOk={onOk}>
        <RetailerMarket
            selectedRegion={nextMarkets[0].selectedRegion}
            allRegion={nextMarkets[0].allRegion}
            dataSource={nextMarkets[0].dataSource}
            targetKeys={nextMarkets[0].targetKeys}
            isSelectMode={isSelectMode}
            isMyVip={isMyVip}
            onRegionChange={region => onRegionChange(region, 0)}
            onMarketChange={targetKeys => onMarketChange(targetKeys, 0)}/>
      </Modal>
    );
  }
}

// 过滤其他项中已选过的saasId
function filterSaasList(nextMarkets, index, saasList) {
  const saasIds = nextMarkets.map(market => market.saasId);
  const willFilteredSaasIds = [...saasIds.slice(0, index), ...saasIds.slice(index + 1)].filter(saasId => !!saasId);
  return saasList.filter(
    saas => willFilteredSaasIds.findIndex(willFilteredSaasId => willFilteredSaasId === saas.SAAS) === -1
  );
}
