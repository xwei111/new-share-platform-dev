import React, { PropTypes, Component } from 'react';
import { USER_TYPE } from 'config/constants';
import { MemberTag } from 'components/admin/TagManagement';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as memberTagActionCreators from 'redux/modules/memberTag';

@connect(
  ({memberTag}) => ({
    setShow:memberTag.setShow,
    setStyle:memberTag.setStyle,
    custom:memberTag.custom,
    status:memberTag.status,
    fromNum:memberTag.fromNum,
    toNum:memberTag.toNum,
    type_tag:memberTag.type_tag,
    dataSource:memberTag.dataSource,

  }),
  dispatch => bindActionCreators(memberTagActionCreators,dispatch),
)

export default class MemberTagContainer extends Component {
  componentDidMount() {
    this.props.handlerSetShow('none','0');
    this.props.handleGetData();
  }
  handleSearchShow(){
    const { setShow,setStyle } = this.props;
    this.props.handlerSetShow('block','1px solid #ccc');
    if(setShow=='block'){
      this.props.handlerSetShow('none','0');
    }

  }
  handleSearchValue(value){
    const { fromNum,toNum } = this.props;
    if (value=='') {
      value='null'
    }
    this.props.handleSearchList(value,fromNum,toNum,'null','null');

  }
  render() {
    const { setShow,setStyle,custom,dataSource  } = this.props;
    return (
      <MemberTag
       searchShow={:: this.handleSearchShow}
       setShow={setShow}
       setStyle={setStyle}
       searchValue={::this.handleSearchValue}
       />
    );
  }
}
