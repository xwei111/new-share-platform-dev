import React, { PropTypes, Component } from 'react';
import { USER_TYPE } from 'config/constants';
import { MarketTagForm } from 'components/admin/TagManagement';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as marketTagActionCreators from 'redux/modules/marketTag';
import { Form  } from 'antd';

@connect(
  ({marketTag}) => ({
    setState:marketTag.setState,
    _setState:marketTag._setState,
    storename:marketTag.storename,


  }),
  dispatch => bindActionCreators(marketTagActionCreators,dispatch),
)
@Form.create()
export default class MarketTagFormContainer extends Component {
    state = {
      color:'#F89985',
    }

    componentDidMount() {
      this.props.handlerSetShow('none','0');
    }



    handleCheckState(e){
      const { setState } = this.props;
      switch (e) {
        case '':
        this.setState({
          color:'#F89985'
        });
        this.props.CheckState('');
        break;
        case '1':
        this.props.CheckState('1');
        this.setState({
          color:'#F89985'
        });
          break;
        case '0':
        this.props.CheckState('0');
        this.setState({
          color:'#F89985'
        });
          break;
        default:
      }
    }

    _handleCheckState(e){
      const { _setState } = this.props;
      switch (e) {
        case '':
        this.setState({
          color:'#F89985'
        });
        this.props._CheckState('');
        break;
        case '商圈':
        this.props._CheckState('商圈');
        this.setState({
          color:'#F89985'
        });
          break;
        case '社区':
        this.props._CheckState('社区');
        this.setState({
          color:'#F89985'
        });
          break;
        case '学校':
        this.props._CheckState('学校');
        this.setState({
          color:'#F89985'
        });
          break;
        default:
      }
    }

    handeSearchPull(){
      const { storename,_setState,setState } = this.props;
      this.props.handleSearchMarketList(storename,_setState,setState);

    }
    handeResetPull(){
      const { form } = this.props;
      this.props.handleGetData();
      form.resetFields();
      this.props.CheckState('');
      this.props._CheckState('');

    }
    handeGoodsName(value){
      this.props.HandleHighSearch(value);
    }


  render() {
    const { setState,_setState,ResetPull,SearchPull,form  } = this.props;
    const { color } = this.state;
    return (
      <MarketTagForm
        setState={setState}
        _setState={_setState}
        CheckState={:: this.handleCheckState}
        _CheckState={:: this._handleCheckState}
        color={color}
        SearchPull={:: this.handeSearchPull}
        ResetPull={:: this.handeResetPull}
        GetGoodsName={:: this.handeGoodsName}
        form={form}
       />
    );
  }
}
