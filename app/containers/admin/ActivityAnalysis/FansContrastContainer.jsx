import React, {PropTypes,Component} from 'react';
import { FansContrast } from 'components/admin/ActivityAnalysis';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as activityAnalysisActionCreators from 'redux/modules/activityAnalysis';
@connect(({activityAnalysis}) => ({
    fansChart: activityAnalysis.fansChart,
    fansNumTotal: activityAnalysis.fansNumTotal,
}),
 dispatch => bindActionCreators(activityAnalysisActionCreators, dispatch))


export default class FansContrastContainer extends React.Component {
  componentDidMount() {
      this.props.handleFansNumTotal();
      this.props.handleFansChart();
  }



    render() {

        const { fansNumTotal,fansChart } = this.props;
        return (
            <div >
              <FansContrast fansNumTotal={fansNumTotal} fansChart={fansChart}/>
            </div>
        );
    }
}
