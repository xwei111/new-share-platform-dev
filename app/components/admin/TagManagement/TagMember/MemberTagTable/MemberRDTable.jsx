import React, { PropTypes, Component } from 'react';
import { Table } from 'antd';

function columns() {
  return [{
    title: '活动时间',
    dataIndex: 'number',
    key: 'number',
},{
    title: '活动名称',
    dataIndex: 'label_cnt',
    key: 'label_cnt',
  }, {
    title: '核券数量（核销率）',
    dataIndex: 'tagstyle',
    key: 'tagstyle',
  }];
}

export default class MemberRDTable extends Component {
  static propTypes = {
    // dataSource: PropTypes.array.isRequired,
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
