import React, {PropTypes} from 'react';
import {Row, Col, Spin, Icon, Button} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as dataReportsActionCreators from 'redux/modules/dataReports';
import {setTab, setMenu} from 'redux/modules/tab';
import * as styles from 'components/admin/ActivitySelect/styles.css';
import {ActivityGoodsBox} from 'components/admin/ActivitySelect';

const ButtonGroup = Button.Group;

@connect(({dataReports}) => ({
    activeSelect: dataReports.activeSelect,
    activeid: dataReports.activeid,
    numIn: dataReports.numIn
}), dispatch => bindActionCreators({...dataReportsActionCreators, setTab, setMenu}, dispatch))

export default class ActivityInfoContainer extends React.Component {
    static propTypes = {

    }
    

    isEmptyObject(obj) { //判断是否为一个空对象

        for (var key in obj) {
            return false
        };
        return true
    };


    componentDidMount() {
        const { numIn } = this.props;
        if (numIn) {
            this.props.handleFetchHistorySix();
        }
    }
        


    componentWillReceiveProps(nextProps) {
        const {activeid,numIn, setNumIn} = nextProps;

        if (activeid != '' && !numIn) {
            setNumIn(true);
            this.props.handleFetchHistorySix();
        }
    }

    onJumpPath(a,b,c,d) {
        const { setTab, setMenu, setActivityId } = this.props;
        setTab(a);
        setMenu(b,c);
        setActivityId(d);
    }
        
    render() {

        const { activeid, activeSelect } = this.props;

        return (
            <div className={styles.mainContainer}>
            
                <div className={styles.commonTit}><p><span></span>最新活动报告</p></div>

                <ActivityGoodsBox onJumpPath={:: this.onJumpPath} activeSelect={activeSelect}/>
            </div>
        );
    }
}
