import { Modal, message,Form } from 'antd';
import React, { PropTypes } from 'react';
import { MarketTagTable } from 'components/admin/TagManagement';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as marketTagActionCreators from 'redux/modules/marketTag';

@connect(
  ({ marketTag }) => ({
    dataSource: marketTag.dataSource,
    loading:marketTag.loading,
    showDetail:marketTag.showDetail,
    GoodsDetailsAll:marketTag.GoodsDetailsAll,

  }),
  dispatch => bindActionCreators(marketTagActionCreators, dispatch)
)


@Form.create()
export default class MarketTagTableContainer extends React.Component {
  static propTypes = {

    loading: PropTypes.bool.isRequired,
    handleGetData: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.handleGetData();
    this.props.HandleShowDetail('none');
  }
  state = {
    keyKey:'',
  }

  handleCloseTab(){
    this.props.HandleShowDetail('none');
    const {form} = this.props;
    form.resetFields();
  }
  handleLookDetail(key) {
    const { dataSource } =this.props;

    this.props.HandleShowDetail('block');
    this.props.ShowTab('block','none','#F89985','');
    this.props.GetGoodsDetails(dataSource[key-1]);
    this.setState({
      keyKey:key,
    })
  }




  handleConfirmCancel(){
    const {form} = this.props;
    form.resetFields();
    this.props.HandleShowDetail('none');
  }


  handleConfirmFinish(e) {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { dataSource } = this.props;
        const { keyKey } = this.state;
        const reg =/(^0\d{2,3}\-\d{7,8}$)|(^1[3|4|5|6|7|8][0-9]{9}$)/;
        if (dataSource[keyKey-1].marketType==values.marketType&&dataSource[keyKey-1].promoters==values.promoters&&dataSource[keyKey-1].promoters_phone==values.promoters_phone&& dataSource[keyKey-1].status==values.status){
          message.error('未修改');
        }else{
          if (values.promoters_phone) {
            if ( !reg.test(values.promoters_phone)) {
              message.error('联系方式填写不正确！');
              return;
            }
          }

          dataSource[keyKey-1].marketType=values.marketType;
          dataSource[keyKey-1].promoters=values.promoters;
          dataSource[keyKey-1].promoters_phone=values.promoters_phone;
          dataSource[keyKey-1].status=values.status;
          this.props.handleUpdateMarketInfo(dataSource[keyKey-1].id,values.storeName,values.marketType,values.promoters,values.promoters_phone,values.status);
          const _this=this;
          Modal.success({
            content: '恭喜你，修改门店成功！',
            onOk() {
              _this.props.HandleShowDetail('none');
              _this.props.form.resetFields();
            }
          });
        }

      }
    });
  }

  handlecancleFinish(e) {
    const {form} = this.props;
    form.resetFields();

  }

  render () {
    const { dataSource, loading,form,showDetail,GoodsDetailsAll } = this.props;
    const { keyKey } = this.state;

    return (
      <MarketTagTable
        loading={loading}
        dataSource={dataSource}
        form={form}
        CloseTab={::this.handleCloseTab}
        showDetail={showDetail}
        onLookDetail={::this.handleLookDetail}
        confirmFinish={::this.handleConfirmFinish}
        cancelFinish={::this.handlecancleFinish}
        confirmCancel={::this.handleConfirmCancel}
        keyKey={keyKey}
        />
    );
  }
}
