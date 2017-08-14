import React, { PropTypes } from 'react';
import { Select, TreeSelect, Transfer, Icon } from 'antd';
import { generateOptions } from 'helpers/util';

RetailerMarket.propTypes = {
  selectedRegion: PropTypes.array.isRequired,
  allRegion: PropTypes.array.isRequired,
  dataSource: PropTypes.array.isRequired,
  targetKeys: PropTypes.array.isRequired,
  onRegionChange: PropTypes.func.isRequired,
  onMarketChange: PropTypes.func.isRequired,
};

export function RetailerMarket(props) {
  const { allRegion, selectedRegion, onRegionChange, dataSource, targetKeys,
    onMarketChange, isSelectMode, isMyVip } = props;

  return (
    <div>
      <TreeSelect
        value={selectedRegion}
        style={{width: 300, marginBottom: '8px', marginTop: '8px'}}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        multiple
        treeCheckable
        allowClear
        placeholder={'请选择区域，手动输入无效'}
        treeData={allRegion}
        onChange={onRegionChange}/>
      <div style={ !selectedRegion.length ? {display: 'none'} : {display: 'block'}}>
        <Transfer
          titles={['可选门店', '已选门店']}
          dataSource={dataSource}
          targetKeys={targetKeys}
          render={item => item.title}
          onChange={onMarketChange}/>
      </div>
      
    </div>
  );
}
