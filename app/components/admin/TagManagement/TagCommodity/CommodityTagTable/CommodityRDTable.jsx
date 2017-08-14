import React, { PropTypes, Component } from 'react';
import { Table } from 'antd';

function columns() {
  return [{
    title: '活动时间',
    dataIndex: 'number',
    key: 'number',
},{
    title: '活动名称',
    dataIndex: 'tagname',
    key: 'tagname',
  }, {
    title: '核券数量（核销率）',
    dataIndex: 'tagstyle',
    key: 'tagstyle',
  }];
}

export default class CommodityRDTable extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div>
          <Table
            size="small"
            style={{background:'white',marginTop:'10px'}}
            columns={columns()}
            pagination={false}/>
      </div>
    );
  }
}
