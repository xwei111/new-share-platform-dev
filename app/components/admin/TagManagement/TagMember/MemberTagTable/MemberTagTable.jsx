import React, { PropTypes, Component } from 'react';
import { Table, Icon, Button, Radio, Form, Input, Spin, Pagination,Popover,Modal } from 'antd';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
import { MemberRDTableContainer } from 'containers/admin/TagManagement';
import { StatusIcon } from 'components/admin';
import { extractStatus } from 'helpers/util';
import { PRODUCT_STATUS } from 'config/constants';
const productStatusMap = extractStatus(PRODUCT_STATUS);
import * as styles from '../styles.css';

function columns(onLookEffect,onLookDetail) {
  return [{
    title: '序号',
    dataIndex: 'key',
    key: 'key',
    render: (_, {key}) => <span>{key}</span>
},{
    title: '标签名称',
    dataIndex: 'label_name',
    key: 'label_name',
    render: (_, {label_name}) => <div className={styles.ellipsis}>{label_name}</div>
  }, {
    title: '标签类型',
    dataIndex: 'label_type',
    key: 'label_type',
  }, {
    title: '人数（覆盖比例）',
    dataIndex: 'per',
    key: 'per',
    render: (_, {per,label_cnt}) => <div>{parseInt(label_cnt)}({parseFloat(per).toFixed(2)}%)</div>
  }, {
    title: '标签更新时间',
    dataIndex: 'maxtime',
    key: 'maxtime'
  }, {
    title: '使用次数',
    dataIndex: 'use_count',
    key: 'use_count',
  },{
    render: (_, {key}) => {
      return (
        <span>
          <a onClick={() => onLookEffect(key)} style={{color:'#FFB19C'}}>查看效果</a>
        </span>
      )
    },
  }, {
    title: '综合评分',
    dataIndex: 'comprehensive_score',
    key: 'comprehensive_score',
    render: (_, {comprehensive_score}) => <div>0</div>
  }, {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: (status, record) => <span><StatusIcon color={status == '0' ?  'red' : 'green'}/>{productStatusMap(status)}</span>
  }, {
    title: '操作',
    key: 'operation',
    render: (_, {key,label_name}) => {
      return (
        <span>
          <a onClick={() => onLookDetail(key,label_name)} style={{color:'#FFB19C'}}>查看详情</a>
        </span>
      )
    },
  }];
}

export default class MemberTagTable extends Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    onLookEffect: PropTypes.func.isRequired,
    onLookDetail: PropTypes.func.isRequired,
  }

  render() {
    const { dataLabel,onTabChange,CloseTab,showDetail,showTab1,showTab2,dataSource, loading, onLookEffect,onLookDetail,trueState,handleCancel,EditMember,visible } = this.props;
    const text = <span>综合评分的规则</span>;
    const content = (
      <div>
        <p>综合评分=使用次数/平均使用次数*权重+核销率/平均核销率*权重+用户数/总用户数*权重</p>
      </div>
    );
    return (
      <div style={{position:'relative',minHeight:'500px'}}>
        <Spin spinning={loading}>
          <Table
            size="small"
            style={{background:'white',lineHeight:'39px'}}
            dataSource={dataSource}
            columns={columns(onLookEffect,onLookDetail)}
          />
        </Spin>
          <div className={styles.rule}>
            <Popover placement="leftTop" title={text} content={content} trigger="click">
              <Icon type="question-circle-o" />
            </Popover>
          </div>
          <div style={{display:showDetail}} className={styles.animated+' '+styles.fadeInDown}>
            <div className={styles.Z_bg}>
              <p className={styles.title_p}>标签详情</p>
              <div className={styles.center}>
                <div className={styles.center_c}>
                  <p className={styles.title_p2}>{dataLabel ? dataLabel.label_type : null }</p>
                  <span className={styles.num}>{dataLabel ? dataLabel.label_cnt : null }({!dataLabel ? null : parseFloat(dataLabel.per).toFixed(2) }%)</span>
                </div>
              </div>
              <div className={styles.tab}>
                <span className={styles.close_tab} onClick={CloseTab}>X</span>
                <RadioGroup onChange={onTabChange} value={ trueState ? 0 : 1 } style={{textAlign:'center',width:'100%'}}>
                    <RadioButton value={0} style={{width:'180px',textAlign:'center'}}>基本信息</RadioButton>
                    <RadioButton value={1} style={{width:'180px',textAlign:'center'}}>历史活动记录（0次）</RadioButton>
                </RadioGroup>
                  <div style={{display:showTab1}}>
                    <div className={styles.p}>

                      {
                        dataLabel.use_count
                        ?<p>使用次数：<span>{dataLabel.use_count}</span></p>
                        :''
                      }
                      {
                        dataLabel.maxtime
                        ?<p>更新时间：<span>{dataLabel.maxtime}</span></p>
                        :''
                      }
                      { dataLabel.name
                        ?<p>姓名：<span>{ dataLabel.name }</span></p>
                        :''
                      }
                      { dataLabel.sex
                        ?<p>性别：<span>{ dataLabel.sex }</span></p>
                        :''
                      }
                      { dataLabel.phone
                        ?<p>手机号：<span>{ dataLabel.phone }</span></p>
                        :''
                      }
                      {
                        dataLabel.level
                        ?<p>粉丝等级：<span>{dataLabel.level}</span></p>
                        :''
                      }
                      {
                        dataLabel.taste
                        ?<p>饮食偏好：<span>{dataLabel.taste}</span></p>
                        :''
                      }
                      {
                        dataLabel.location
                        ?<p>地址（地市）：<span>{dataLabel.location}</span></p>
                        :''
                      }
                      {
                        dataLabel.location_preference
                        ?<p>消费地理位置偏好：<span>{dataLabel.location_preference}</span></p>
                        :''
                      }
                      {
                        dataLabel.week_preference
                        ?<p>消费星期偏好：<span>{dataLabel.week_preference}</span></p>
                        :''
                      }
                      {
                        dataLabel.time_preference
                        ?<p>消费时间偏好：<span>{dataLabel.time_preference}</span></p>
                        :''
                      }
                      {
                        dataLabel.yt_preference
                        ?<p>消费业态偏好：<span>{dataLabel.yt_preference}</span></p>
                        :''
                      }
                      {
                        dataLabel.channel_preference
                        ?<p>活动渠道偏好：<span>{dataLabel.channel_preference}</span></p>
                        :''
                      }
                      {
                        dataLabel.payment_preference
                        ?<p>支付方式偏好：<span>{dataLabel.payment_preference}</span></p>
                        :''
                      }
                      {
                        dataLabel.sensitive_material
                        ?<p>敏感物料：<span>{dataLabel.sensitive_material}</span></p>
                        :''
                      }
                      {
                        dataLabel.unit_price_grade
                        ?<p>客单价等级：<span>{dataLabel.unit_price_grade}</span></p>
                        :''
                      }
                      {
                        dataLabel.consume_frequency_grade
                        ?<p>消费频次等级：<span>{dataLabel.consume_frequency_grade}</span></p>
                        :''
                      }
                      {
                        dataLabel.activity_participation
                        ?<p>活动参与度：<span>{dataLabel.activity_participation}</span></p>
                        :''
                      }
                      {
                        dataLabel.stockpile_grade
                        ?<p>囤货等级：<span>{dataLabel.stockpile_grade}</span></p>
                        :''
                      }
                      {
                        dataLabel.personal_purchases
                        ?<p>个人购买商品：<span>{dataLabel.personal_purchases}</span></p>
                        :''
                      }
                      {
                        dataLabel.buy_category
                        ?<p>购买品类：<span>{dataLabel.buy_category}</span></p>
                        :''
                      }
                      {
                        dataLabel.purchase_specifications
                        ?<p>购买规格：<span>{dataLabel.purchase_specifications}</span></p>
                        :''
                      }
                      {
                        dataLabel.purchase_price
                        ?<p>购买价格：<span>{dataLabel.purchase_price}</span></p>
                        :''
                      }
                      {
                        dataLabel.comprehensive_score
                        ?<p>总和评分：<span>{dataLabel.comprehensive_score}</span></p>
                        :''
                      }

                    </div>

                  </div>
                  <Modal visible={visible}
                    onCancel={handleCancel}
                  >
                  </Modal>

                  <div style={{display:showTab2,padding:'0 15px'}}>
                    <MemberRDTableContainer/>
                  </div>
              </div>
            </div>
          </div>
      </div>
    );
  }
}
// <div className={styles.button}>
//   <Button type="danger" style={{marginRight:'10px'}} onClick={EditMember}>编辑</Button>
//   <Button type="primary">删除</Button>
// </div>
