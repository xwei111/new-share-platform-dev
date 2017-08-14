import React, { PropTypes, Component } from 'react';
import { Table, Button, Form, Input, Spin, Select, Pagination,Upload,message,Popconfirm } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import { extractStatus } from 'helpers/util';
import * as styles from '../styles.css';
import { StatusIcon } from 'components/admin';
import { PRODUCT_STATUS, IMAGE_TYPE } from 'config/constants';
const productStatusMap = extractStatus(PRODUCT_STATUS);
import { CardUploadPro } from 'components';


function columns(onLookDetail) {
  return [{
    title: '序号',
    dataIndex: 'key',
    key: 'key',
},{
    dataIndex: 'pic',
    key: 'pic',
    render: (pic) => <img className={styles.brandImage} src={pic == '' ? require('images/not_found.png') : pic}/>
  }, {
    title: '商品名称',
    dataIndex: 'goods_name',
    key: 'goods_name',
    render: (_, {goods_name}) => <div className={styles.ellipsis}>{goods_name}</div>
  }, {
    title: '商品条码',
    dataIndex: 'goods_id',
    key: 'goods_id',
    render: (_, {goods_id}) => <div className={styles.ellipsis}>{goods_id}</div>
  }, {
    title: '所属品类',
    dataIndex: 'catname',
    key: 'catname',
    render: (catname) =><div className={styles.ellipsis}><span>{catname=='undefined' ?' ':catname}</span></div>
  }, {
    title: '标准售价',
    dataIndex: 'price',
    key: 'price',
    render: (price) =><div className={styles.ellipsis}><span>{price=='undefined' ?' ':price}</span></div>
  },{
    title: '商品更新时间',
    dataIndex: 'updatetime',
    key: 'updatetime',
    render: (_, {updatetime}) => <div>{updatetime}</div>
  }, {
    title: '状态',
    dataIndex: 'avalibale',
    key: 'avalibale',
    render: (avalibale, record) => <span><StatusIcon color={avalibale == '0' ? 'red' : 'green'}/>{productStatusMap(avalibale)}</span>
  }, {
    title: '操作',
    key: 'operation',
    render: (_, {key,id}) => {
      return (
        <span>
          <a onClick={() => onLookDetail(key,id)} style={{color:'#FFB19C'}}>编辑</a>
        </span>
      )
    },
  }];
}
export default class CommodityTagTable extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    page: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onLookDetail: PropTypes.func.isRequired,
  }
  onChangeFriend(e) {
      const {form} = this.props;
      this.props.form.setFieldsValue({now_status: e});
  }
  handleCloseTab(){
    this.props.HandleShowDetail('none');
    const {form} = this.props;
    this._upload.clear();
    form.resetFields();
  }
  render() {
    const { style_Tab1,style_Tab2,CloseTab,showDetail,dataSource, page, total, loading, onPageChange,onLookDetail,onGoOver,form, valuePic} = this.props;
    const { confirmFinish,cancelFinish,confirmCancel,cancelCancel,keyKey,OneGoodsDetails, setImgKeyIn } = this.props;

    const text = <span>综合评分的规则</span>;
    const content = (
      <div>
        <p>门店周边的消费次数较多，消费总额较高，门店周边的消费次数较消费总额较高，</p>
        <p>收入较高人群。门店周边的消费次数较多，消费总较高，收入较高人群。</p>
        <p>收入较高人群。门店周边的消费次数较多，消费总额较高,</p>
        <p>收入较高人群。门店周边的消费次数较多，消费总额较高，收入较高人群。</p>
      </div>
    );
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <div style={{position:'relative',minHeight:'500px'}}>
        <Spin spinning={loading}>
          <Table
            size="small"
            style={{background:'white',lineHeight:'39px'}}
            dataSource={dataSource}
            columns={columns(onLookDetail)}
            pagination={false}/>
        </Spin>
          <div style={{display:showDetail}} className={styles.animated+' '+styles.fadeInDown}>
            <div className={styles.Z_bg}>
              <p className={styles.title_p}>编辑商品</p>

              <div className={styles.tab}>
                <span className={styles.close_tab} onClick={::this.handleCloseTab}>X</span>
                <div>
                  <Form>
                    <FormItem label="单品图片" {...formItemLayout}>
                      {getFieldDecorator('pic', {rules: [{required:false, message: '请选择文件'}]})(
                        <CardUploadPro
                          type={IMAGE_TYPE.PRODUCT.value}
                          ref={upload => this._upload = upload}
                          disabled={status==200? true:false}
                          form={form}
                          valuePic={valuePic}
                          setImgKeyIn={setImgKeyIn}
                          />
                      )}
                    </FormItem>

                    <FormItem
                      {...formItemLayout}
                      label="商品名称："
                    >
                      {getFieldDecorator('goods_name',{initialValue:OneGoodsDetails[0]?OneGoodsDetails[0].goods_name:null},{
                        rules: [{ required: false, message: '请输入你的商品名称!', whitespace: true }],
                      })(
                        <Input disabled={status==200? true:false}/>
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="商品69码："
                    >
                      {getFieldDecorator('goods_id',{initialValue:OneGoodsDetails[0]?OneGoodsDetails[0].goods_id:null},  {
                        rules: [{ required: false, message: '请输入你的商品69码!', whitespace: true }],
                      })(
                        <Input disabled/>
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="标准售价："
                    >
                      {getFieldDecorator('price',{initialValue:OneGoodsDetails[0]?OneGoodsDetails[0].price:null}, {
                        rules: [{ required: false, message: '请输入所属品牌!', whitespace: true }],
                      })(
                        <Input disabled={status==200? true:false}/>
                      )}
                    </FormItem>
                    <FormItem
                      {...formItemLayout}
                      label="所属品类："
                    >
                      {getFieldDecorator('catname',{initialValue:OneGoodsDetails[0]?OneGoodsDetails[0].catname:null}, {
                        rules: [{ required: false, message: '请输入所属品类!', whitespace: true }],
                      })(
                        <Input  disabled={status==200? true:false}/>
                      )}
                    </FormItem>
                    <FormItem
                     {...formItemLayout}
                     label="当前状态"
                   >
                     {getFieldDecorator('avalibale',{initialValue:OneGoodsDetails[0]?OneGoodsDetails[0].avalibale:null}, {
                       rules: [{ required: false}],
                     })(
                       <Select onChange={:: this.onChangeFriend} disabled={status==200? true:false}>
                         <Option value="1">启用</Option>
                         <Option value="0">停用</Option>
                       </Select>
                     )}

                   </FormItem>
                   <FormItem style={{textAlign:'center'}}>
                   <Button type="danger" htmlType="submit" size="large" style={{marginRight:'10px'}}>
                      <Popconfirm title="是否确认取消?" onConfirm={confirmCancel} onCancel={cancelCancel} okText="Yes" cancelText="No">
                        取消
                      </Popconfirm>
                    </Button>
                    <Button type="primary" htmlType="submit" size="large">
                      <Popconfirm title="是否确认修改商品的基本信息?" onConfirm={confirmFinish} onCancel={cancelFinish} okText="Yes" cancelText="No">
                        完成
                      </Popconfirm>
                    </Button>
                   </FormItem>
                  </Form>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.Pagination}>
            <p onClick={onGoOver}>跳转</p>
            <Pagination current={page} total={total} onChange={onPageChange} showSizeChanger style={{float:'right'}}/>
          </div>
      </div>
    );
  }
}
