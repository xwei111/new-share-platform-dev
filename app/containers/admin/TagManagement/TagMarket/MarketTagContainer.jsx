import React, { PropTypes, Component } from 'react';
import { MarketTag } from 'components/admin/TagManagement';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as marketTagActionCreators from 'redux/modules/marketTag';

@connect(
  ({ marketTag }) => ({
    setShow:marketTag.setShow,
    setStyle:marketTag.setStyle,
  }),
  dispatch => bindActionCreators(marketTagActionCreators, dispatch),
)

export default class MarketTagContainer extends Component {
  componentDidMount() {

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
    this.props.handleSearchMarketList(value,'','');

  }


  render() {
    const { setShow,setStyle } = this.props;
    return (
      <MarketTag
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
