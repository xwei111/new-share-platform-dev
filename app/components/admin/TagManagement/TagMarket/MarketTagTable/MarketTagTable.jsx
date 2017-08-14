import React, { PropTypes, Component } from 'react';
import { Table, Icon, Button, Form, Input, Spin, Row, Col, Select, Pagination,message,Popconfirm } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import { extractStatus } from 'helpers/util';
import * as styles from '../styles.css';
import { StatusIcon } from 'components/admin';
import { PRODUCT_STATUS } from 'config/constants';
const productStatusMap = extractStatus(PRODUCT_STATUS);


function columns(onLookDetail) {
  return [{
    title: '序号',
    dataIndex: 'key',
    key: 'key',
},{
    title: '门店名称',
    dataIndex: 'storeName',
    key: 'storeName',
    render: (_, {storeName}) => <div className={styles.ellipsis}>{storeName}</div>
  }, {
    title: '门店地址',
    dataIndex: 'address',
    key: 'address',
  }, {
    title: '门店类型',
    dataIndex: 'marketType',
    key: 'marketType'
  }, {
    title: '促销员',
    dataIndex: 'promoters',
    key: 'promoters'
  },{
    title: '联系方式',
    dataIndex: 'promoters_phone',
    key: 'promoters_phone'
},{
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status, record) => <span><StatusIcon color={status == '0' ? 'red' : 'green'}/>{productStatusMap(status)}</span>
  }, {
    title: '操作',
    key: 'operation',
    render: (_, {key}) => {
      return (
        <span>
          <a onClick={() => onLookDetail(key)} style={{color:'#FFB19C'}}>编辑</a>
        </span>
      )
    },
  }];
}

function trim(str){ //删除左右两端的空格
  return str.replace(/(^\s*)|(\s*$)/g, "");
}

export default class MarketTagTable extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  }

  render() {
    const { CloseTab,showDetail,dataSource, loading,onLookDetail,form,confirmFinish,cancelFinish,confirmCancel,cancelCancel,keyKey,searchMarketList } = this.props;
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
            dataSource={ dataSource }
            columns={columns(onLookDetail)}
            pagination={{ pageSize: 10 }}
          />
        </Spin>

          <div style={{display:showDetail}} className={styles.animated+' '+styles.fadeInDown}>
              <div className={styles.Z_bg}>
                <p className={styles.title_p}>编辑门店</p>

                <div className={styles.tab}>
                  <span className={styles.close_tab} onClick={CloseTab}>X</span>
                  <div>
                    <Form form={form}>
                      <FormItem
                        {...formItemLayout}
                        label="门店名称："
                      >
                        {getFieldDecorator('storeName',{initialValue: dataSource[keyKey-1] ? dataSource[keyKey-1].storeName : ''}, {
                          rules: [{ required: false, message: '请输入你的门店名称!', whitespace: true }],
                        })(
                          <Input disabled/>
                        )}
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="促销员"
                      >
                        {getFieldDecorator('promoters',{initialValue: dataSource[keyKey-1] ? dataSource[keyKey-1].promoters : null}, {
                          rules: [{ required: false, message: '请输入促销员姓名!', whitespace: true }],
                        })(
                          <Input/>
                        )}
                      </FormItem>
                      <FormItem
                        {...formItemLayout}
                        label="联系方式"
                      >
                        {getFieldDecorator('promoters_phone',{initialValue: dataSource[keyKey-1] ? dataSource[keyKey-1].promoters_phone : ''}, {
                          rules: [{ required: false, message: '请输入促销员联系方式!', whitespace: true }],
                        })(
                          <Input/>
                        )}
                      </FormItem>

                    <FormItem
                     {...formItemLayout}
                     label="门店类型"
                   >
                     {getFieldDecorator('marketType',{initialValue: dataSource[keyKey-1] ? dataSource[keyKey-1].marketType : ''}, {
                       rules: [{ required: false}],
                     })(
                       <Select>
                         <Option value="商圈">商圈</Option>
                         <Option value="社区">社区</Option>
                         <Option value="学校">学校</Option>
                       </Select>
                     )}
                   </FormItem>
                    <FormItem
                       {...formItemLayout}
                       label="状态"
                     >
                       {getFieldDecorator('status',{initialValue: dataSource[keyKey-1] ? dataSource[keyKey-1].status : ''}, {
                         rules: [{ required: false}],
                       })(
                         <Select>
                           <Option value="1">启用</Option>
                           <Option value="0">未启用</Option>
                         </Select>
                       )}

                     </FormItem>
                     <Row>
                       <Col offset={7} span={4}>
                         <Button type="danger" htmlType="submit" size="large">
                            <Popconfirm title="是否确认取消?" onConfirm={confirmCancel} onCancel={cancelCancel} okText="Yes" cancelText="No">
                              取消
                            </Popconfirm>
                          </Button>
                       </Col>
                       <Col offset={2} span={4}>
                         <Button type="primary" htmlType="submit" size="large">
                           <Popconfirm title="是否确认编辑门店?" onConfirm={confirmFinish} onCancel={cancelFinish} okText="Yes" cancelText="No">
                             完成
                           </Popconfirm>
                         </Button>
                       </Col>
                     </Row>
                    </Form>
                  </div>
                </div>
              </div>
            </div>




      </div>
    );
  }
}
