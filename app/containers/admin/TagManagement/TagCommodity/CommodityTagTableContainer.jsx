import React, { PropTypes } from 'react';
import { Modal, message,Form } from 'antd';
const confirm = Modal.confirm;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commodityTagActionCreators from 'redux/modules/commodityTag';
import { CommodityTagTable } from 'components/admin/TagManagement';

@connect(
  ({ commodityTag }) => ({
    dataSource: commodityTag.dataSource,
    showDetail:commodityTag.showDetail,
    style_Tab2:commodityTag.style_Tab2,
    style_Tab1:commodityTag.style_Tab1,
    loading:commodityTag.loading,
    page:commodityTag.page,
    total:commodityTag.total,
    GoodsName:commodityTag.GoodsName,
    GoodsId:commodityTag.GoodsId,
    CatName:commodityTag.CatName,
    price:commodityTag.price,
    setState:commodityTag.setState,
    OneGoodsDetails:commodityTag.OneGoodsDetails,
    status:commodityTag.status,
    _id:commodityTag._id,
    idId:commodityTag.idId,
    keyKey:commodityTag.keyKey,
    imgKey: commodityTag.imgKey,

  }),
  dispatch => bindActionCreators(commodityTagActionCreators, dispatch)
)


@Form.create()
export default class CommodityTagTableContainer extends React.Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    handleGetData: PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.props.HandleShowDetail('none');
    this.props.form.validateFields();
  }

  handlePagechange(page) {
    // this.props.handlePageChange(page);
    const { GoodsName,GoodsId,CatName,price,setState } = this.props;
    this.props.handleGetData(page,GoodsName,GoodsId,CatName,price,setState);
  }
  handleGoOver(){
    const { page,GoodsName,GoodsId,CatName,price,setState } = this.props;
    this.props.handleGetData(page,GoodsName,GoodsId,CatName,price,setState);
  }

  handleLookDetail(key,id) {
    const { dataSource,OneGoodsDetails,_id,keyKey, setImgKeyIn } =this.props;
    this.props.HandleShowDetail('block');
    this.props.handleOneGoodsDetails(id);
    setImgKeyIn(dataSource[key-1].pic)
    this.props.GetKey(key);
  }



  handleConfirmCancel(){
    const {form} = this.props;

    form.resetFields();
    this.props.HandleShowDetail('none');
    this.props.setImgKeyIn('')
  }


  handleConfirmFinish(e) {
    const { OneGoodsDetails,_id,page,GoodsName,GoodsId,CatName,price,setState,idId,dataSource,keyKey,form,imgKey } = this.props;
    this.props.form.validateFields((err, values) => {

      if (!err) {
          var re=/[`~!@#\$%\^\&\(\)_\+<>\?！￥……^{}【】|——=+‘；：”“’。，、？:"\-\{\},\.\\\;'\[\]]/im;
          var isNum=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;
          if (!values.goods_name||re.test(values.goods_name)) {
            message.error('商品名称不能为空，且商品名称不能包含特殊字符');
            return;
          }else {
            dataSource[keyKey-1].goods_name=values.goods_name;
          }
          if (!values.avalibale) {
            message.error('当前状态不能为空');
            return;
          }else {
            dataSource[keyKey-1].avalibale=values.avalibale;
          }
          if (!values.price||!isNum.test(values.price)) {
            message.error('标准售价不能为空，且标准售价小数位不能超过两位');
            return;
          }else {
            dataSource[keyKey-1].price=values.price;
          }
          if(values.catname){
            dataSource[keyKey-1].catname=values.catname;
          }
          if (imgKey !== '' ) {
            dataSource[keyKey-1].pic=imgKey;
          } else {
            dataSource[keyKey-1].pic=require('images/not_found.png');
          }

          if (imgKey == OneGoodsDetails[0].pic && values.goods_name==OneGoodsDetails[0].goods_name&&values.avalibale==OneGoodsDetails[0].avalibale&&values.catname==OneGoodsDetails[0].catname&&values.price==OneGoodsDetails[0].price){
            message.error('未修改！');
            return;
          }else {
            if (imgKey||values.pic&&values.goods_name&&!re.test(values.goods_name)&&values.avalibale&&values.price&&isNum.test(values.price)) {
              if (values.pic) {
                this.props.handleUpdateGoodsLabel(_id,values.goods_name,values.goods_id,values.price,values.catname,values.avalibale,values.pic);
              }else {
                this.props.handleUpdateGoodsLabel(_id,values.goods_name,values.goods_id,values.price,values.catname,values.avalibale,imgKey);
              }
            }
          }

          if(idId!=''){
            this.props.handleOneGoodsDetails(idId);
          }else{
            this.props.handleOneGoodsDetails(_id);
          }
      }
      const _this=this;
      if (values.goods_name!=OneGoodsDetails[0].goods_name||values.goods_id!=OneGoodsDetails[0].goods_id||values.price!=OneGoodsDetails[0].price||values.catname!=OneGoodsDetails[0].catname||values.avalibale!=OneGoodsDetails[0].avalibale||values.pic!=OneGoodsDetails[0].pic) {
        Modal.success({
          content: '恭喜你，修改商品成功！',
          onOk() {
            const { dataSource } = _this.props;
            _this.props.HandleShowDetail('none');
            _this.props.setImgKeyIn('')
            _this.props.GetDataSuccess(dataSource);
            form.resetFields();
          }
        });
      }
    });

  }

  handlecancleFinish() {
    const {form} = this.props;
    form.resetFields();
    this.props.setImgKeyIn('')
  }

  render () {
    const { HandleShowDetail,style_Tab1,style_Tab2,dataSource, loading,page, total,showDetail,CloseTab,form,OneGoodsDetails,status,keyKey, imgKey } = this.props;
    return (
      <CommodityTagTable
        page={page}
        total={total}
        loading={loading}
        style_Tab1={style_Tab1}
        style_Tab2={style_Tab2}
        showDetail={showDetail}
        dataSource={dataSource}
        onPageChange={::this.handlePagechange}
        onGoOver={::this.handleGoOver}
        onLookDetail={::this.handleLookDetail}
        form={form}
        confirmFinish={::this.handleConfirmFinish}
        cancelFinish={::this.handlecancleFinish}
        confirmCancel={::this.handleConfirmCancel}
        OneGoodsDetails={OneGoodsDetails}
        keyKey={keyKey}
        HandleShowDetail={HandleShowDetail}
        valuePic={imgKey}
        setImgKeyIn={:: this.props.setImgKeyIn}
        />
    );
  }
}
