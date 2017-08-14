import React, { PropTypes } from 'react';

import { Modal, message } from 'antd';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as commodityTagActionCreators from 'redux/modules/commodityTag';
import { CommodityRDTable } from 'components/admin/TagManagement';



@connect(
  ({ commodityTag }) => ({
    dataSource: commodityTag.dataSource,
  }),
  dispatch => bindActionCreators(commodityTagActionCreators, dispatch)
)

export default class CommodityRDTableContainer extends React.Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
  }
  componentDidMount() {

  }

  render () {
    return (
      <CommodityRDTable
        />
    );
  }
}
