import React, { PropTypes } from 'react';
import { Modal, message, Form } from 'antd';
import { AddNewName } from 'components/admin/TagManagement';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as marketManageActionCreators from 'redux/modules/marketManage';
import * as commonActionCreators from 'redux/modules/common';
import * as memberTagActionCreators from 'redux/modules/memberTag';


@connect(
  ({ memberTag }) => ({
    newAdd: memberTag.newAdd,
    newAddQuery: memberTag.newAddQuery,
    newAddRate: memberTag.newAddRate,
  }),
  dispatch => bindActionCreators(memberTagActionCreators, dispatch)
)

@Form.create()
export default class AddNewNameContainer extends React.Component {

  // async componentDidMount() {
  //   const addNewList = await this.props.handleFetchAddNewData();
  // }

  handleSetNewAddQuery(newAddQuery) {
      this.props.setAddNewQuery(newAddQuery);
  }

  render () {
    return (
      <AddNewName {...this.props} handleSetNewAddQuery={:: this.handleSetNewAddQuery}/>
    );
  }
}
