import React, { PropTypes, Component } from 'react';
import { USER_TYPE } from 'config/constants';
import { MemberTagForm } from 'components/admin/TagManagement';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as memberTagActionCreators from 'redux/modules/memberTag';
import { Form } from 'antd';


@connect(
  ({memberTag}) => ({
    setShow:memberTag.setShow,
    setStyle:memberTag.setStyle,
    custom:memberTag.custom,
    labelname:memberTag.labelname,
    status:memberTag.status,
    type_tag:memberTag.type_tag,
    fromNum:memberTag.fromNum,
    toNum:memberTag.toNum,
  }),
  dispatch => bindActionCreators(memberTagActionCreators,dispatch),
)

@Form.create()
export default class MemberTagFormContainer extends Component {
    state = {
      color:'#F89985'
    }
    componentDidMount() {
      this.props.showCustom('none');
    }


    handleCheckCustom(e){
      const { labelname,fromNum,toNum,type_tag,status,custom  } = this.props;
      switch (e) {
        case 'null':
        this.setState({
          color:'#F89985'
        });
        this.props.getSearchContent(labelname,fromNum,toNum,'null',status);
        this.props.showCustom('none');
        break;
        case '系统标签':

        this.props.getSearchContent(labelname,fromNum,toNum,'系统标签',status);
        this.props.showCustom('none');
        this.setState({
          color:'#F89985'
        });
        break;
        case '自定义标签':
        this.props.showCustom('inline-block');
        this.setState({
          color:'#F89985'
        });
        if(custom=='inline-block'){
          this.props.showCustom('none');
        }
        this.props.getSearchContent(labelname,fromNum,toNum,'自定义标签',status);
        break;
        default:
      }
    }

    handleCheckState(e){
      const { labelname,fromNum,toNum,type_tag,status } = this.props;
      switch (e) {
        case 'null':
        this.setState({
          color:'#F89985'
        });
          this.props.getSearchContent(labelname,fromNum,toNum,type_tag,'null');
        break;
        case '1':
          this.props.getSearchContent(labelname,fromNum,toNum,type_tag,'1');
        this.setState({
          color:'#F89985'
        });
          break;
        case '0':
        this.props.getSearchContent(labelname,fromNum,toNum,type_tag,'0');
        this.setState({
          color:'#F89985'
        });
          break;
        default:
      }
    }
    handleHightValue(value){
      const { fromNum,toNum,type_tag,status } = this.props;
      if (value=='') {
        value='null'
      }
      this.props.getSearchContent(value,fromNum,toNum,type_tag,status);
    }
    handleHightType(value){
      const { labelname,fromNum,toNum,type_tag,status } = this.props;
      this.props.getSearchContent(labelname,fromNum,toNum,value,status);

    }
    handeSearchPull(){
      const {  labelname,fromNum,toNum,type_tag,status } = this.props;
      this.props.handleSearchList(labelname,fromNum,toNum,type_tag,status);
    }
    handeResetPull(){
      const { form,fromNum,toNum } = this.props;
      this.props.handleGetData();
      this.props.getSearchContent('null',fromNum,toNum,'null','null');
      this.props.showCustom('none');
      form.resetFields();
    }
    handleChangeNumber_first(value){
      const { labelname,fromNum,toNum,type_tag,status } = this.props;
      this.props.getSearchContent(labelname,value,toNum,type_tag,status);
    }
    handleChangeNumber_last(value){
      const { labelname,fromNum,toNum,type_tag,status  } = this.props;
      this.props.getSearchContent(labelname,fromNum,value,type_tag,status);
    }
  render() {
    const { setShow,setStyle,custom,type_tag,status,ResetPull,SearchPull,form,fromNum,toNum,labelname  } = this.props;
    const { color } = this.state;
    return (
      <MemberTagForm
        custom={custom}
        type_tag={type_tag}
        status={status}
        CheckCustom={:: this.handleCheckCustom}
        CheckState={:: this.handleCheckState}
        color={color}
        SearchPull={:: this.handeSearchPull}
        ResetPull={:: this.handeResetPull}
        GetHightValue={:: this.handleHightValue}
        GetHightType={:: this.handleHightType}
        onChange_first={:: this.handleChangeNumber_first}
        onChange_last={:: this.handleChangeNumber_last}
        form={form}
        fromNum={fromNum}
        toNum={toNum}
        labelname={labelname}
       />
    );
  }
}
