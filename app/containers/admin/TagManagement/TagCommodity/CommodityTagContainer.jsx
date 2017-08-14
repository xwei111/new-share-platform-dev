import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commodityTagActionCreators from 'redux/modules/commodityTag';
import { CommodityTag } from 'components/admin/TagManagement';

@connect(
  ({ commodityTag }) => ({
    setShow:commodityTag.setShow,
    setStyle:commodityTag.setStyle,
    setState:commodityTag.setState,
    page:commodityTag.page,
    GoodsName:commodityTag.GoodsName,
    GoodsId:commodityTag.GoodsId,
    CatName:commodityTag.CatName,
    price:commodityTag.price,

  }),
  dispatch => bindActionCreators(commodityTagActionCreators, dispatch),
)

export default class CommodityTagContainer extends Component {
  componentDidMount() {
    this.props.showCustom('none');

  }

  handleSearchShow(){
    const { setShow,setStyle } = this.props;
    this.props.handlerSetShow('block','1px solid #ccc');
    if(setShow=='block'){
      this.props.handlerSetShow('none','0');
    }

  }
  handleResetPull(){
    const { setShow,setStyle } = this.props;
    this.props.handlerSetShow('none','0');
  }
  handleSearchPull(){
    const { setShow,setStyle } = this.props;
    this.props.handlerSetShow('none','0');
  }
  handleSearchValue(value){
    const { GoodsId,CatName,price,setState } = this.props;
    this.props.handleGetData('',value,GoodsId,CatName,price,setState);
    localStorage.removeItem('pic');
  }


  render() {
    const { setShow,setStyle } = this.props;
    return (
      <CommodityTag
       searchShow={:: this.handleSearchShow}
       ResetPull={:: this.handleResetPull}
       SearchPull={:: this.handleSearchPull}
       setShow={setShow}
       setStyle={setStyle}
       searchValue={:: this.handleSearchValue}
       />
    );
  }
}
