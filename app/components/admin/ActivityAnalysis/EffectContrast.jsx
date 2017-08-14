import React, { PropTypes, Component } from 'react';
import createG2 from 'g2-react';
import { Radio,Select } from 'antd';
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

import * as styles from './styles.css';
import { MoreYChart,EffectMap,DifferentDisStore,DifferentDisUser,DifferentDisRate } from './charts/';

export default class EffectContrast extends Component {


  render() {
    const { effOverview,effPossMap,goodsList,discountList,goodsShow,discountShow,ChangeRadio,ChangeSelect,goodsDiscount,discountStr,selectName } = this.props;
    if (goodsList[0]) {
      var goodsListOption = goodsList.map(item => <Option key={item.goods_id}>{item.goodsName}</Option>);
      var goodsListOne = goodsList[0].goodsName;
    }
    if (discountList[0]) {
      var discountListOption = discountList.map(item => <Option key={item.discount}>{item.discount}</Option>)
      var discountListOne = discountList[0].discount;
    }




    return (
      <div className={styles.container}>
          <div className={styles.commonTit}><p><span></span>活动效果总览</p></div>
          <div className={styles.MoreYChart}><MoreYChart effOverview={effOverview}/></div>
          <div className={styles.commonTit}><p><span></span>活动效果机会地图</p></div>
          <div className={styles.MoreYChart}>
            <EffectMap
            width={800}
            height={500}
            data={effPossMap}
            />
          </div>
          <div className={styles.commonTit}><p><span></span>活动效果不同优惠力度表现</p></div>
          <div className={styles.differentDiscount}>
            <RadioGroup defaultValue="a" size="large" onChange={ChangeRadio}>
              <RadioButton value="a">同商品对比</RadioButton>
              <RadioButton value="b">同优惠力度对比</RadioButton>
            </RadioGroup>
            <div className={styles.goodsChoose} style={{display:goodsShow}}>
              <span>商品选择：</span>
              <Select placeholder={goodsListOne} style={{ width: 200 }} onChange={ChangeSelect}>
                {goodsListOption}
              </Select>
            </div>
            <div className={styles.goodsChoose} style={{display:discountShow}}>
              <span>优惠力度选择：</span>
              <Select placeholder={discountListOne} style={{ width: 200 }} onChange={ChangeSelect}>
                {discountListOption}
              </Select>
            </div>
            <div className={styles.DifferentDisCharts}>

              <div className={styles.DifferentDisChart}>
                <p>单门店核销量</p>
                <DifferentDisStore dataSourse={ goodsDiscount ? goodsDiscount : discountStr }/>
              </div>
              <div className={styles.DifferentDisChart}>
                <p>单用户核销量</p>
                <DifferentDisUser dataSourse={ goodsDiscount ? goodsDiscount : discountStr }/>
              </div>
              <div className={styles.DifferentDisChart}>
                <p>核销率</p>
                <DifferentDisRate dataSourse={ goodsDiscount ? goodsDiscount : discountStr }/>
              </div>
            </div>
          </div>
    </div>
    );
  }
}
