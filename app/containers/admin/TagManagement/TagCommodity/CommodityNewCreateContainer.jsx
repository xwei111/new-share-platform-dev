import React, { PropTypes } from 'react';

import { Modal, message,Form } from 'antd';
const confirm = Modal.confirm;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commodityTagActionCreators from 'redux/modules/commodityTag';
import { CommodityNewCreate } from 'components/admin/TagManagement';
import { tagApi } from 'api';


@connect(
  ({ commodityTag }) => ({
    dataSource:commodityTag.dataSource,
    visible:commodityTag.visible,
    goods_add_id:commodityTag.goods_add_id,
    OneGoodsDetails:commodityTag.OneGoodsDetails,
    bool:commodityTag.bool,
  }),
  dispatch => bindActionCreators(commodityTagActionCreators, dispatch)
)


@Form.create()
export default class CommodityNewCreateContainer extends React.Component {
  static propTypes = {

  }
  componentDidMount() {
  }
  state = {
    showNew:'none',
  }
  handleShowNewCreate(){
    this.setState({
      showNew:'block',
    })
  }
  handlerCloseTab(){
    this.setState({
      showNew:'none',
    })
    const {form} = this.props;
    form.resetFields();
  }
  handleBatchCreate(){
    // this.props.newdatelist();
    this.props.Getvisible(true);
  }
  handlerconfirmCancel(){
    const {form} = this.props;
    form.resetFields();
    this.setState({
      showNew:'none',
    })
  }
  handleCancel(){
    this.props.Getvisible(false);
  }

  handlerconfirmFinish(){
    const { dataSource,form,bool } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(values.catname=='undefined'){
          values.catname='';
        }
      }
      var reg=/^\d+$/;
      var re=/[`~!@#\$%\^\&\*\(\)_\+<>\?！￥……^{}【】|——=+‘；：”“’。，、？:"\-\{\},\.\\\/;'\[\]]/im;
      var isNum=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
      if (!reg.test(values.goods_id)) {
        message.error('商品条码只能是数字');
        return;
      }

      if (re.test(values.goods_name)) {
        message.error('商品名称不能包含特殊字符');
        return;
      }
      if (!isNum.test(values.price)) {
        message.error('标准售价只能是数字，且小数位不能超过两位');
        return;
      }

      if(!reg.test(values.goods_id)||!isNum.test(values.price)||re.test(values.goods_name)||values.goods_name==undefined||values.goods_id==undefined||values.avalibale==undefined||values.pic==undefined){
        return;
      }else{
        const { goods_add_id,OneGoodsDetails,dataSource } = this.props;
        this.props.handleAddGoodsLabel(values.goods_name,values.goods_id,values.price,values.catname,values.avalibale,values.pic);
        this.props.handleOneGoodsDetails(goods_add_id.dataId);
        const _this=this;
        var obj = {key:0};
        for(var r in values){
        eval("obj."+r+"=values."+r);
        }
        if (bool.data==false) {
          message.error('该商品69码已存在')
          return;
        }else{
          Modal.success({
            content: '恭喜你，新增商品成功！',
            onOk() {
              const {form,goods_add_id,OneGoodsDetails,dataSource} = _this.props;
              _this.setState({
                showNew:'none',
              })
              dataSource.unshift(obj);
              _this.props.GetDataSuccess(dataSource);
              _this.props.handleGetData(1,'','','','','');
              form.resetFields();
            }
          });
        }

      }
    });
  }

  handleSixNine(e){
    const { bool } = this.props;
    this.props.HandleCheckGoodsId(e.target.value);
  }
  handlercancelFinish(){
    const {form} = this.props;
    form.resetFields();


  }
  render () {
    const { form,dataSource,visible,OneGoodsDetails } = this.props;
    const { showNew  } = this.state;
    return (
      <CommodityNewCreate
        showNew={showNew}
        visible={visible}
        showNewCreate={:: this.handleShowNewCreate}
        showBatchCreate={:: this.handleBatchCreate}
        CloseTab={::this.handlerCloseTab}
        confirmCancel={::this.handlerconfirmCancel}
        confirmFinish={::this.handlerconfirmFinish}
        cancelFinish={::this.handlercancelFinish}
        form={form}
        handleCancel={::this.handleCancel}
        SixNine={::this.handleSixNine}
        />
    );
  }
}
