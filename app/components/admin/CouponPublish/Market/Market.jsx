import React, {PropTypes} from 'react';
import {Form} from 'antd';
import {MarketSelectionContainer} from 'containers/admin/CouponPublish';
const FormItem = Form.Item;



Market.propTypes = {
    onMarketClick: PropTypes.func.isRequired,
    selectedMarketList: PropTypes.object.isRequired
};

export default function Market({onMarketClick, selectedMarketList, isSelectMode, isMyVip, chooseType}) {
    const formItemLayout = {
        labelCol: {
            span: chooseType === 1 ? 3 : 5
        },
        wrapperCol: {
            span: 14
        }
    };

    return (
        <FormItem label="参与门店" {...formItemLayout} style={{
            fontSize: '12px'
        }} required>
            <a style={{
                color: '#419BF9'
            }} onClick={onMarketClick}>选择门店</a>
            <span style={{
                margin: '0 5px 0 10px',
                color: '#999'
            }}>已选门店数</span>
            <span style={{
                color: '#419BF9'
            }}>{chooseType === 0 ? selectedMarketList.length: selectedMarketList[0].targetKeys.length}</span>
            <MarketSelectionContainer isSelectMode={isSelectMode} isMyVip={isMyVip}/>
        </FormItem>
    );
}
