import React, {PropTypes} from 'react';
import {Row, Col, Spin, Button} from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as visualdataActionCreators from 'redux/modules/visualdata';
import * as styles from 'components/admin/RealtimeData/VisualData/styles.css';
import {realDataApi} from 'api';
import {SummaryData, GetChart, TopMarketData} from 'components/admin/RealtimeData/VisualData/InsideCouponInfo';

const ButtonGroup = Button.Group;

@connect(({visualdata, publishForm}) => ({
    partnerId: publishForm.partnerId,
    couponId: visualdata.couponId,
    alipayData: visualdata.alipayData,
    rankData: visualdata.rankData,
    isloading: visualdata.isloading,
    alipayNumIn: visualdata.alipayNumIn,
    isMiyaVip: visualdata.isMiyaVip
}), dispatch => bindActionCreators(visualdataActionCreators, dispatch))

export default class InsideCouponContainer extends React.Component {
    static propTypes = {
        couponId: PropTypes.string.isRequired
    }

    state = {
        status: 0
    }

    componentDidMount() {
        const {isMiyaVip} = this.props;
        if (parseInt(isMiyaVip) !== 1010) {
            const {alipayNumIn, couponId} = this.props;
            if (alipayNumIn) {
                const {couponId} = this.props;
                this.props.handleAllAlipayData(couponId);
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        const {couponId, alipayNumIn, setAlipayNumIn} = nextProps;
        if (couponId != '' && !alipayNumIn) {
            setAlipayNumIn(true)
            this.props.handleAllAlipayData(couponId);
        }
    }
    handleCurveChange(e) {
        (e === 0)
            ? this.setState({status: 0})
            : this.setState({status: 1});
    }
    render() {

        const {isloading, alipayData, rankData, isMiyaVip} = this.props;

        const {status} = this.state;

        return (
            <div>
                {parseInt(isMiyaVip) === 1010
                    ? <p style={{
                            display: 'block',
                            textAlign: 'center',
                            margin: '40px auto'
                        }}>您好!您的帐号还未订购米雅会员营销，请<a href="https://auth.alipay.com/login/ant_sso_index.htm?goto=http%3A%2F%2Fapp.alipay.com%2Fcommodity%2FsearchCommodity.htm%3FsearchKey%3Dtitle%26searchVal%3D%2B%25C3%25D7%25D1%25C5%25BB%25E1%25D4%25B1%25D3%25AA%25CF%25FA" target="_blank">前去订购</a>
                        </p>
                    : <Spin spinning={isloading}>
                        <SummaryData dataSource={alipayData}/>
                        <p className={styles.modelTitle}>数据走势图</p>
                        <ButtonGroup style={{
                            display: 'block',
                            margin: '10px auto',
                            textAlign: 'center'
                        }}>
                            <Button type={status === 0
                                ? 'primary'
                                : 'default'} onClick={e => this.handleCurveChange(0)}>
                                领核券量
                            </Button>
                            <Button type={status === 1
                                ? 'primary'
                                : 'default'} onClick={e => this.handleCurveChange(1)}>
                                领核券人数
                            </Button>
                        </ButtonGroup>
                        <GetChart dataSource={alipayData} status={status}/>
                        <TopMarketData dataSource={rankData}/>
                    </Spin>
                  }
            </div>
        );
    }
}
