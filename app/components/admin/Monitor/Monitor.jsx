import React, { PropTypes } from 'react';
import {Icon,Table} from 'antd';
import * as styles from './style.css';
import Charts from './Charts.jsx';

const { Column, ColumnGroup } = Table;

export default function Monitor({getdata,getdataData,getdataDoor}) {
    var show=false;
    if(getdata!=undefined&&getdata.length>0){
        
        var getdataParse=JSON.parse(getdata)
        if(getdataParse!=null){
            show=true;
            var foreNum=getdataParse.fore_offs_num;
            var ofNum=getdataParse.offs_num;
            var correctNum=getdataParse.correct_offs_num;
            var forsRate=getdataParse.fore_offs_rate;
            var ofRate=getdataParse.offs_rate;
            var correctRate=getdataParse.correct_fore_offs_rate;
        }
        
    }

    const columns = [{
      title: '门店名称',
      dataIndex: 'storeName',
      key: 'storeName',
    }, {
      title: '核销数量',
      dataIndex: 'offsNum',
      key: 'offsNum',
      sorter: (a, b) => a.offsNum - b.offsNum,
    }, {
      title: '会赚激励金额',
      dataIndex: 'hzTranAmount',
      key: 'hzTranAmount',
      sorter: (a, b) => a.hzTranAmount - b.hzTranAmount,
    }];

    const data = getdataDoor;
    
  return (
    <div className={styles.centerContent}>
        <div className={styles.centerLeft}>
            <div className={styles.centerleftTop}>
                <img className={styles.eye} src={require("images/eye.png")}/>
                监控指标表现
            </div>
            {
                show?
                    <ul className={styles.ulone}>
                        <li>
                            <img src={require("images/one.png")}/>
                            预测核销量
                            <p className={styles.p1}>{foreNum || '-'}</p>
                        </li>
                        <li>
                            <img src={require("images/two.png")}/>
                            实际核销量
                            <p className={styles.p2}>{ofNum || '-'}</p>
                        </li>
                        <li>
                            <img src={require("images/three.png")}/>
                            修正预测核销量
                            <p className={styles.p3}>{correctNum || '-'}</p>
                        </li>
                        <li>
                            <img src={require("images/one.png")}/>
                            预测核销率
                            <p className={styles.p1}>{forsRate ? forsRate + '%' : '-'}</p>
                        </li>
                        <li>
                            <img src={require("images/two.png")}/>
                            实际核销率
                            <p className={styles.p2}>{ofRate ? ofRate + '%' : '-'}</p>
                        </li>
                        <li>
                            <img src={require("images/three.png")}/>
                            修正预测核销率
                            <p className={styles.p3}>{correctRate ? correctRate + '%' : '-'}</p>
                        </li>
                    </ul>
                :
                    <div className={styles.nothing}><Icon type="frown-o" />暂无数据</div>
            }
            
            <div className={styles.centerleftBottom}>
                <img className={styles.eye} src={require("images/go.png")}/>
                监控数据走势
            </div>
            <Charts getdataData={getdataData}/>
        </div>
        <div className={styles.centerRight}>
            <div className={styles.centerleftTop}>
                <img className={styles.eye} src={require("images/eye.png")}/>
                门店数据表现
            </div>
            <Table className={styles.monTable} columns={columns} dataSource={data} />
        </div>

    </div>
  );
}
