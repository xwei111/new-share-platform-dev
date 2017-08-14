import React, {PropTypes, Component, DOM} from 'react';
import ReactDOM from 'react-dom';
import {
    Row,
    Col,
    Form,
    DatePicker,
    Select,
    Input,
    Button,
    Modal,
    message,
    Popconfirm
} from 'antd';
import {Market} from 'components/admin/CouponPublish';
import {CouponInfoContainer, ActiveMoudleContainer} from 'containers/admin/Marketing';
const Option = Select.Option;
const {RangePicker} = DatePicker;
import globalStyles from 'sharedStyles/global.css';
import * as styles from './styles.css';
import {DATE_INTERVAL} from 'config/constants';
import {validateFields, disabledDate, generateUUID, getStrLeng} from 'helpers/util';
import {marketingApi} from 'api';
import store from 'config/store.js';
import moment from 'moment';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        span: 3
    },
    wrapperCol: {
        span: 14
    }
};

let _limit = false;

const dateFormat = 'YYYY/MM/DD';

@Form.create()
export default class Launch extends React.Component {

    handleSubmit = (e) => {
        e.preventDefault();

        const {
            form,
            onFormSub,
            selectedMarketList,
            moudleName,
            loginname,
            tagDone,
            startTime,
            endTime,
            tempActid,
            couponData
        } = this.props;

        if (!selectedMarketList[0].targetKeys.length) {
            message.error('请选择参与活动门店');
            return;
        }

        // if (!targetKeys.length) {
        //     message.error('请选择参与活动人群');
        //     return;
        // }

        if (couponData.length === 0 || couponData.size === 0) {
            message.error('请先发放优惠券');
            return;
        }

        validateFields(form).then(data => {
            this.props.setActiveVisible(true);
        }).catch(console.log)

    }

    handleReset() {
        const {resetFields} = this.props.form;
        resetFields();
        this.props.setCouponClear();
        this.props.handleClearMarket();
        this.props.setTargetKey([]);
        this.props.setTagDone([]);
    }

    handleReturn(path) {
        const {returnConfig} = this.props;
        returnConfig(path)
    }

    handleCouponVisible() {
        const {onCouponVisible} = this.props;
        onCouponVisible();
    }

    handleSub() {

        const {
            form,
            onFormSub,
            selectedMarketList,
            moudleName,
            loginname,
            tagDone,
            startTime,
            endTime,
            tempActid,
            couponData
        } = this.props;

        this.props.setFetchLoading(true);

        if (!_limit) {
            _limit = true;
            validateFields(form).then(data => {

                const marketList = selectedMarketList.reduce((result, item) => [
                    ...result,
                    ...item.targetKeys
                ], []).map(item => item.split(':')[1]).join(',');

                const params = {
                    account_id: loginname,
                    activename: data.activeName,
                    starttime: startTime,
                    endtime: endTime,
                    tempActid: tempActid,
                    market: marketList,
                    tags: tagDone.join(','),
                    type: moudleName
                }

                onFormSub(params).then(data => {
                    const {resetFields} = this.props.form;

                    const mlength = selectedMarketList[0].targetKeys.length;
                    const goodsArr = couponData.reduce((result, item) => [
                        ...result,
                        item.goodsname
                    ], []).join(',');
                    resetFields();
                    marketingApi.getSPlatCoefficientDaoByActiveid(mlength,goodsArr).then(data => console.log(data));

                    this.props.setFetchLoading(false);
                    this.props.setCouponClear();
                    this.props.handleClearMarket();
                    this.props.setTargetKey([]);
                    this.props.setTagDone([]);
                    const _uid = generateUUID();
                    this.props.setTempActid(_uid);
                    this.props.setActiveVisible(false);
                    this.props.returnConfig('/admin/activity/success');
                    _limit = false;
                }).catch(error => {
                    console.log(error);
                    _limit = false;
                    this.props.setFetchLoading(false);
                });

            }).catch(error => {
                console.log();
                _limit = false;
                this.props.setFetchLoading(false);
            })
        }

    }

    render() {
        const {
            form,
            moudleName,
            actName,
            startTime,
            endTime,
            couponVisible,
            onCouponVisible,
            onMarketClick,
            selectedMarketList,
            onDateChange,
            onFormSub,
            couponData,
            openInfo,
            onBlurName,
            chooseType
        } = this.props;

        const {getFieldDecorator} = form;

        const rangeConfig = {
            initialValue: startTime !== '' ? [moment(startTime, dateFormat), moment(endTime, dateFormat)] : undefined,
            rules: [
                {
                    type: 'array',
                    required: true,
                    message: '请选择活动时间!'
                }
            ]
        };

        return (
            <div className={globalStyles.mainContainer}>
                <Row style={{
                    marginTop: '20px',
                    borderBottom: ' 1px solid #DCE1E5',
                    paddingBottom: '20px'
                }}>
                    <Col span={20}>
                        <p className={globalStyles.homeTitle}>
                            <span></span>
                            {moudleName}
                        </p>
                    </Col>
                </Row>

                <Form onSubmit={this.handleSubmit}>
                    <div className={styles.title}>
                        <p className={styles.title_p}>
                            <span style={{
                                color: '#F89985',
                                marginRight: '5px'
                            }}>●</span>设置活动</p>

                        <FormItem className={styles.size} label="活动主题：" {...formItemLayout}>
                            {getFieldDecorator('activeName', {
                                initialValue: actName != '' ? actName : undefined,
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入活动主题!'
                                    }
                                ],
                                onChange: e=> {
                                    if (getStrLeng(e.target.value) > 60) {
                                        message.error('活动主题不能超过20个汉字');
                                        e.target.value = e.target.value.substr(0, 20);
                                    }
                                }
                            })(<Input placeholder="请输入活动主题" style={{
                                width: '200px'
                            }} onBlur={e => onBlurName(e)}/>)}
                        </FormItem>

                        <FormItem className={styles.size} label="活动时间：" {...formItemLayout}>
                            {getFieldDecorator('range-picker', rangeConfig)(<RangePicker style={{
                                width: '200px'
                            }} onChange={onDateChange} disabledDate={disabledDate(DATE_INTERVAL.BEFORE, 1)}/>)}
                        </FormItem>

                        <Market onMarketClick={onMarketClick} selectedMarketList={selectedMarketList} chooseType={chooseType}/>

                    </div>

                    <div className={styles.title}>

                        <p className={styles.title_p}>
                            <span style={{
                                color: '#F89985',
                                marginRight: '5px'
                            }}>●</span>设置券
                        </p>

                        <Row className={styles.couponBox}>

                            {couponData.map(item => (
                                <Col span={8} className={styles.couponInfo} onClick={id => openInfo(item.pubid)}>
                                    <p className={styles.couponPic} style={item.pic1_path
                                        ? {
                                            background: '#FFF url(' + item.pic1_path + ') no-repeat center',
                                            backgroundSize: '100% auto'
                                        }
                                        : null}></p>
                                    <p className={styles.couponTit}>{item.couponname}</p>
                                    <p className={styles.couponFee}>
                                        <span>{parseInt(item.amount) / 100}元</span>代金券</p>
                                    <p className={styles.watchInside}>查看详情</p>
                                </Col>
                            ))}

                            <Col span={8}>
                                <img src={require('images/activeQ.png')} onClick={visible => this.handleCouponVisible()}/>
                            </Col>

                        </Row>
                    </div>

                    <FormItem className={styles.button}>
                        <Button type="primary" style={{
                            marginRight: '20px',
                            background: '#fff',
                            color: '#5A5A5A',
                            border: '1px solid #CCC',
                            borderRadius: '15px'
                        }}>
                            <Popconfirm title="确认返回吗？" onConfirm={path => {
                                this.handleReturn('/admin/activity/activity')
                            }} okText="确认" cancelText="取消">
                                返回
                            </Popconfirm>
                        </Button>

                        <Button type="primary" style={{
                            marginRight: '20px',
                            background: '#fff',
                            color: '#5A5A5A',
                            border: '1px solid #CCC',
                            borderRadius: '15px'
                        }}>
                            <Popconfirm title="确认重置吗？" onConfirm={:: this.handleReset} okText="确认" cancelText="取消">
                                重置
                            </Popconfirm>
                        </Button>

                        <Button type="danger" htmlType="submit" style={{
                            background: '#419BF9',
                            borderRadius: '15px',
                            color: '#FFF'
                        }}>创建</Button>

                    </FormItem>
                </Form>

                <CouponInfoContainer/>
                <ActiveMoudleContainer onSubmit={:: this.handleSub}/>

            </div>
        );
    }
}
