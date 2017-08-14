import React, { PropTypes, Component } from 'react';
import { Icon } from 'antd';
import * as styles from './styles.css';

export default class DataExpression extends Component {

  isEmptyObject(obj) { //判断是否为一个空对象
      for (var key in obj) {
          return false
      };
      return true
  };

  render() {

    const { actInfo } = this.props;

    return (
      <div className={styles.container}>
          <div className={styles.commonTit}><p><span></span>活动主要信息</p></div>

          {actInfo === null || this.isEmptyObject(actInfo)? 
            <p style={{
                width: '100%',
                height: '350px',
                lineHeight: '350px',
                textAlign: 'center'
            }}><Icon type="frown-o"/>暂无数据</p>

            : 
            <div>
              <div className={styles.mainNews}>
                <p>活动时间：<span>{actInfo.active_start.split(' ')[0] || '无'} ~ {actInfo.active_end.split(' ')[0] || '无'}</span></p>
                <p>活动区域：<span>{actInfo.region || '无'}</span></p>
                <p>活动产品：<span>{actInfo.active_goods || '无'}</span></p>
                <p>活动形式：<span>{actInfo.active_type || '无'}</span></p>
                <p>推广渠道：<span>{actInfo.channel || '无'}</span></p>
              </div>


              <div className={styles.commonTit}><p><span></span>活动主要数据指标</p></div>
              
              <div className={styles.dataIndex}>
                <div className={styles.dataIndex_four}>
                  <p><img src={require("images/icon_quan.png")}/>领券数量</p>
                  <p>{actInfo.copons_num || 0}</p>
                </div>
                <div className={styles.dataIndex_four}>
                  <p><img src={require("images/icon_qa.png")}/>领券用户数</p>
                  <p>{actInfo.copons_users || 0}</p>
                </div>
                <div className={styles.dataIndex_four}>
                  <p><img src={require("images/icon_hx.png")}/>核券数量</p>
                  <p>{actInfo.offs_num || 0}</p>
                </div>
                <div className={styles.dataIndex_four}>
                  <p><img src={require("images/icon_hexiao.png")}/>核销用户数</p>
                  <p>{actInfo.offs_users || 0}</p>
                </div>
              </div>

              <div className={styles.dataIndex}>
                <div className={styles.dataIndex_pic}>
                  <p className={styles.dataIndex_pic_title}>核销率：{actInfo.offs_rate * 100 || 0}%</p>
                  <div className={styles.dataIndex_pic_2}>
                    <div className={styles.dataIndex_pic_div}>
                      <p>领券数量</p>
                      <p className={styles.dataIndex_pic_P}>{actInfo.copons_num || 0}</p>
                    </div>
                  </div>
                  <div className={styles.dataIndex_pic_1}>
                    <div className={styles.dataIndex_pic_div}>
                      <p>核劵数量</p>
                      <p className={styles.dataIndex_pic_P}>{actInfo.offs_num || 0}</p>
                    </div>
                  </div>
                  <div className={styles.dataIndex_IconL}>
                    <p><span></span>领劵数量：{actInfo.copons_num || 0}</p>
                    <p><span></span>核劵数量：{actInfo.offs_num || 0}</p>
                  </div>
                </div>
                <div className={styles.dataIndex_pic}>
                  <p className={styles.dataIndex_pic_title}>转换率：{parseFloat(actInfo.offs_users / actInfo.copons_users).toFixed(2) * 100 || 0}%</p>
                  <div className={styles.dataIndex_pic_3}>
                    <div className={styles.dataIndex_pic_div}>
                      <p>领券人数</p>
                      <p className={styles.dataIndex_pic_P}>{actInfo.copons_users || 0}</p>
                    </div>
                  </div>
                  <div className={styles.dataIndex_pic_4}>
                    <div className={styles.dataIndex_pic_div}>
                      <p>核劵人数</p>
                      <p className={styles.dataIndex_pic_P}>{actInfo.offs_users || 0}</p>
                    </div>
                  </div>
                  <div className={styles.dataIndex_IconR}>
                    <p><span></span>领劵人数：{actInfo.copons_users || 0}</p>
                    <p><span></span>核劵人数：{actInfo.offs_users || 0}</p>
                  </div>
                </div>
              </div>
            </div>

          }





          

      </div>
    );
  }
}
