import React, {PropTypes} from 'react';
import {Form, Row} from 'antd';
import * as styles from 'components/admin/RealtimeData/TotalData/styles.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as visualdataActionCreators from 'redux/modules/visualdata';
import {realDataApi} from 'api';

import {AlipayActivitySelection, SubAndRestBtns} from 'components/admin/RealtimeData/VisualData';

@connect(({visualdata}) => ({
    alipayActiveid: visualdata.alipayActiveid,
    alipayActivityList: visualdata.alipayActivityList,
    couponId: visualdata.couponId,
    couponList: visualdata.couponList,
    isMiyaVip: visualdata.isMiyaVip}), dispatch => bindActionCreators(visualdataActionCreators, dispatch))

@Form.create()

export default class ActivitySelectionContainer extends React.Component {
    static propTypes = {
        form: PropTypes.object.isRequired,
        alipayActivityList: PropTypes.array.isRequired
    }

    async componentDidMount() {
        const {isMiyaVip} = this.props;
        console.info(isMiyaVip)
        if (parseInt(isMiyaVip) !== 1010) {
            const alipayActivityList = await this.props.handleFetchAlipayActivityList();
        }

    }

    handleSelectChange(v) {
        const {form, setAlipayActiveId} = this.props;
        let activeid = v.split('_')[0];
        setAlipayActiveId(activeid);
        form.resetFields();
        this.props.handleFetchCouponList(activeid);
    }

    handleCouponChange(v) {
        const {setCouponId} = this.props;
        setCouponId(v);
    }

    restFormClick() {
        const {form} = this.props;
        form.resetFields();
    }

    handleSubmit() {
        const {couponId,form} = this.props;
        form.validateFields((err, fieldsValue) => {
            if (err) {
                return;
            }
            this.props.handleAllAlipayData(couponId);
        })
    }

    render() {
        const {
            form,
            alipayActivityList,
            couponList,
            activityFieldName,
            couponFieldName,
            isMiyaVip
        } = this.props;
        return (
            <div style={parseInt(isMiyaVip) === 1010
                ? {
                    display: 'none'
                }
                : {
                    display: 'block'
                }}>
                <div className={styles.dateSelecter}>
                    <Form>
                        <Row>
                            <AlipayActivitySelection form={form} activityList={alipayActivityList} couponList={couponList} activityFieldName={activityFieldName} couponFieldName={couponFieldName} onListChange={:: this.handleSelectChange} onCouponChange={:: this.handleCouponChange}/>
                            <SubAndRestBtns onSubBtnClick={:: this.handleSubmit} onRestBtnClick={:: this.restFormClick}/>
                        </Row>
                    </Form>
                </div>
            </div>
        );
    }
}
