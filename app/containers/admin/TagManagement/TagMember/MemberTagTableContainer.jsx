import { Modal, message } from 'antd';
import React, { PropTypes } from 'react';
import { MemberTagTable } from 'components/admin/TagManagement';

const confirm = Modal.confirm;
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as memberTagActionCreators from 'redux/modules/memberTag';


@connect(
  ({ memberTag }) => ({
    loading: memberTag.loading,
    dataSource: memberTag.dataSource,
    showDetail:memberTag.showDetail,
    showTab1:memberTag.showTab1,
    showTab2:memberTag.showTab2,
    dataLabel:memberTag.dataLabel,
    labelname:memberTag.labelname,
    status:memberTag.status,
    to:memberTag.to,
    numFrom:memberTag.numFrom,
    type_tag:memberTag.type_tag,
  }),
  dispatch => bindActionCreators(memberTagActionCreators, dispatch)
)

export default class MemberTagTableContainer extends React.Component {
  static propTypes = {
    dataSource: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
    handleGetData: PropTypes.func.isRequired,
  }
  state = {
    trueState:true,
    visible:false,
  }
  componentDidMount() {
    this.props.HandleShowDetail('none');
  }



  handleCloseTab(){
    this.props.HandleShowDetail('none');
  }
  handleLookDetail(key,label_name) {
    const { dataLabel } = this.props;
    this.props.HandleShowDetail('block');
    this.props.ShowTab('block','none');
    this.props.handleLabelDetail(label_name);
    this.setState({
      trueState:true,
    })
  }

  handleLookEffect(key) {
    this.props.HandleShowDetail('block');
    this.props.ShowTab('none','block');
    this.setState({
      trueState:false,
    })
  }

  handleTabChange(e) {
    const Val = e.target.value;
    const { showTab1,showTab2 } = this.props;

    if (Val === 0) {
      this.props.ShowTab('block','none');
      this.setState({
        trueState:true,
      })
    } else{
        this.props.ShowTab('none','block');
        this.setState({
          trueState:false,
        })
    }
  }
  handleEditMember(){
    // this.setState({
    //   visible:true,
    // })
  }
  handleCancel(){
    this.setState({
      visible:false,
    })
  }
  render () {
    const { showTab1,showTab2,dataSource, loading,showDetail,CloseTab,dataLabel } = this.props;
    const { trueState,visible } = this.state;
    return (
      <MemberTagTable
        loading={loading}
        onTabChange={::this.handleTabChange}
        CloseTab={::this.handleCloseTab}
        showTab1={showTab1}
        showTab2={showTab2}
        showDetail={showDetail}
        dataSource={dataSource}
        dataLabel={dataLabel}
        onLookEffect={::this.handleLookEffect}
        onLookDetail={::this.handleLookDetail}
        trueState={trueState}
        EditMember={::this.handleEditMember}
        visible={visible}
        handleCancel={::this.handleCancel}
        />
    );
  }
}
