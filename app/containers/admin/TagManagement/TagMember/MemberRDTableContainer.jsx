import { Modal, message } from 'antd';
import React, { PropTypes } from 'react';
import { MemberRDTable } from 'components/admin/TagManagement';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as memberTagActionCreators from 'redux/modules/memberTag';


@connect(
  ({ memberTag }) => ({
    dataLabel: memberTag.dataLabel,
  }),
  dispatch => bindActionCreators(memberTagActionCreators, dispatch)
)

export default class MemberRDTableContainer extends React.Component {

  componentDidMount() {

  }

  render () {
    const { dataLabel } = this.props;
    return (
      <MemberRDTable
        dataLabel={dataLabel}
        />
    );
  }
}
