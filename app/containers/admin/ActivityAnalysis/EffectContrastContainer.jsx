import React, {PropTypes,Component} from 'react';
import { EffectContrast } from 'components/admin/ActivityAnalysis';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as activityAnalysisActionCreators from 'redux/modules/activityAnalysis';

@connect(({activityAnalysis}) => ({
    effOverview:activityAnalysis.effOverview,
    effPossMap:activityAnalysis.effPossMap,
    goodsList:activityAnalysis.goodsList,
    discountList:activityAnalysis.discountList,
    goodsDiscount:activityAnalysis.goodsDiscount,
    discountStr:activityAnalysis.discountStr,
    selectName:activityAnalysis.selectName,
    selectNameDiscount:activityAnalysis.selectNameDiscount,
    numIn:activityAnalysis.numIn,

}),
 dispatch => bindActionCreators(activityAnalysisActionCreators, dispatch))


export default class EffectContrastContainer extends React.Component {
  state = {
    goodsShow:'block',
    discountShow:'none',
    radio_name:'a',
  }
  componentDidMount() {
      const { goodsList,discountList,selectName,numIn,selectNameDiscount } = this.props;
      this.props.handleEffOverview();
      this.props.handleEffPossMap();
      this.props.handleGoodsList();
      this.props.handleDiscountList();
      if (numIn) {
        this.props.handleGoodsDiscount(selectName);
      }
  }

  componentWillReceiveProps(nextProps) {
      const { numIn, selectName,selectNameDiscount } = nextProps;

      if (selectName != '' && !numIn) {
          this.props.setNumIn(true);
          this.props.handleGoodsDiscount(selectName);
      }
  }


  ChangeRadio(e){
    const { selectName,selectNameDiscount } = this.props;
    if (e.target.value=='a') {
      this.setState({
        goodsShow:'block',
        discountShow:'none',
        radio_name:'a',
      })
      this.props.handleGoodsDiscount(selectName);
    }else{
      this.setState({
        goodsShow:'none',
        discountShow:'block',
        radio_name:'b',
      })
      this.props.handleDiscountStr(selectNameDiscount);
      this.props.getGoodsDiscount('');
    }
  }

  ChangeSelect(e){
    const { radio_name } = this.state;
    const { goodsList } = this.props;
    if (radio_name=='a') {
      this.props.handleGoodsDiscount(e);
      this.props.getSelectName(e);
    }else {
      this.props.handleDiscountStr(e);
      this.props.getSelectNameDiscount(e);
    }


  }
    render() {
      const { effOverview,effPossMap,goodsList,discountList,goodsDiscount,discountStr,selectName,selectNameDiscount } = this.props;
      const { goodsShow,discountShow } = this.state;
        return (
            <div >
              <EffectContrast
                effOverview={effOverview}
                effPossMap={effPossMap}
                goodsList={goodsList}
                discountList={discountList}
                goodsShow={goodsShow}
                discountShow={discountShow}
                ChangeRadio={::this.ChangeRadio}
                ChangeSelect={::this.ChangeSelect}
                goodsDiscount={goodsDiscount}
                discountStr={discountStr}
                selectName={selectName}
                selectNameDiscount={selectNameDiscount}
                />
            </div>
        );
    }
}
