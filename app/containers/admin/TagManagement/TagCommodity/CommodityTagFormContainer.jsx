import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commodityTagActionCreators from 'redux/modules/commodityTag';
import { CommodityTagForm } from 'components/admin/TagManagement';
import { Form  } from 'antd';


@connect(
  ({commodityTag}) => ({
    setShow:commodityTag.setShow,
    setStyle:commodityTag.setStyle,
    custom:commodityTag.custom,
    setState:commodityTag.setState,
    page:commodityTag.page,
    GoodsName:commodityTag.GoodsName,
    GoodsId:commodityTag.GoodsId,
    CatName:commodityTag.CatName,
    price:commodityTag.price,
  }),
  dispatch => bindActionCreators(commodityTagActionCreators,dispatch),
)

@Form.create()
export default class CommodityTagFormContainer extends Component {
    state = {
      color:'#F89985'
    }

    componentDidMount() {
      this.props.handlerSetShow('none','0');
      const { page } = this.props;
      this.props.handleGetData(page,'','','','','');
    }
    handleSearchShow(){
      const { setShow,setStyle } = this.props;
      this.props.handlerSetShow('block','1px solid #ccc');
    }


    handleCheckState(e){
      const { setState } = this.props;
      switch (e) {
        case '':
        this.setState({
          color:'#F89985'
        });
        this.props.handleCheckState('');
        break;
        case '1':
        this.props.handleCheckState('1');
        this.setState({
          color:'#F89985'
        });
          break;
        case '0':
        this.props.handleCheckState('0');
        this.setState({
          color:'#F89985'
        });
          break;
        default:
      }
    }

    handeSearchPull(){
      const { GoodsName,GoodsId,CatName,price,setState } = this.props;
      this.props.handleGetData('',GoodsName,GoodsId,CatName,price,setState);
      localStorage.removeItem('pic');
    }
    handeResetPull(){
      const { page,form } = this.props;
      this.props.handleGetData(page,'','','','','');
      form.resetFields();
      this.props.handleCheckState('');
      localStorage.removeItem('pic');
    }
    handeGoodsName(value){
      const { GoodsId,CatName,price } = this.props;
      this.props.HandleGoodsName(value,GoodsId,CatName,price);
    }
    handeGoodsId(value){
      const { GoodsName,CatName,price } = this.props;
      this.props.HandleGoodsName(GoodsName,value,CatName,price);
    }
    handeCatName(value){
      const { GoodsName,GoodsId,price } = this.props;
      this.props.HandleGoodsName(GoodsName,GoodsId,value,price);
    }

  render() {
    const { setShow,setStyle,custom,setState,ResetPull,SearchPull,form  } = this.props;
    const { color } = this.state;
    return (
      <CommodityTagForm
        custom={custom}
        setState={setState}
        CheckState={:: this.handleCheckState}
        color={color}
        SearchPull={:: this.handeSearchPull}
        ResetPull={:: this.handeResetPull}
        GetGoodsName={:: this.handeGoodsName}
        GetGoodsId={:: this.handeGoodsId}
        GetCatName={:: this.handeCatName}
        form={form}
       />
    );
  }
}
