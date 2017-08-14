import React, { PropTypes, Component } from 'react';
import * as styles from './styles.css';
import { Icon,Tooltip } from 'antd';
import { ConsumingChart } from './charts';



export default class FansContrast extends Component {
  static propTypes = {

  }

  render() {
    const { fansNumTotal,fansChart } = this.props;
    return (
      <div className={styles.container}>
          <div className={styles.commonTit}><p><span></span>粉丝累计总览（包含所有活动）</p></div>

            {
                fansNumTotal!='' ?
                <div>
                  <div className={styles.fansTitle}>
                    <img src={require("images/pic_3.png")}/>
                    <div>
                      <p>粉丝总数（人）</p>
                      <p>{fansNumTotal.totalFans}</p>
                    </div>
                  </div>
                  <div className={styles.fansNumberChart} style={{position: 'relative'}}>
                      <div className={styles.visualMapWrap}>
                          <p>用户价值忠诚度</p>
                          <span></span>
                      </div>

                      <div className={styles.pyramidChart}>
                          {fansNumTotal.actives.map((item, index) =>
                              <div key={index}>
                                  <Tooltip placement="top" title={item.explain}>
                                    <div className={styles.bak}>{item.name}</div>
                                  </Tooltip>
                                  <div className={styles.fansNumber}>{item.value}个</div>
                              </div>
                          )}
                      </div>
                  </div>
                </div>
                    :
                    <p style={{
                          width: '100%',
                          height: '350px',
                          lineHeight: '350px',
                          textAlign: 'center',
                      }}><Icon type="frown-o"/>暂无数据</p>
            }

          <div className={styles.commonTit}><p><span></span>各级别粉丝消费能力</p></div>
          <div className={styles.MoreYChart+' '+styles.fansConsum}><ConsumingChart fansChart={fansChart}/></div>

    </div>
    );
  }
}
