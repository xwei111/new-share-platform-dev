import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as monitorActionCreators from 'redux/modules/monitor';
import {Monitor} from 'components/admin/Monitor';
import {ActivitySelectionContainer} from 'containers/admin/Monitor';
import * as styles from 'components/admin/Monitor/style.css';

@connect(
  ({monitor}) => ({
    activeid: monitor.activeid,
    getdata:monitor.getdata,
    getdataData:monitor.getdataData,
    getdataDoor:monitor.getdataDoor,
    numIn: monitor.numIn
  }),
  dispatch => bindActionCreators(monitorActionCreators, dispatch),
)

export default class MonitorContainer extends Component {

  componentDidMount(){
    const {activeid, numIn} = this.props;
    if (numIn) {
      this.props.datacodelist(activeid);
      this.props.datacodelistData(activeid);
      this.props.datacodelistDoor(activeid);
    }
  }

  componentWillReceiveProps(nextProps) {
    const {activeid, numIn, setNumIn} = nextProps;
    if (activeid != '' && !numIn) {
        setNumIn(true);
        this.props.datacodelist(activeid);
        this.props.datacodelistData(activeid);
        this.props.datacodelistDoor(activeid);
    }
  }

  render() {
    const {getdata, getdataData, getdataDoor} = this.props;
    return (
      <div className={styles.contentBox}>
        <ActivitySelectionContainer/>
        <Monitor getdata={getdata} getdataData={getdataData} getdataDoor={getdataDoor} />
      </div>
    );
  }
}
