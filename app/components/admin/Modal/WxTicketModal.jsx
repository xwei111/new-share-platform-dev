import React, {PropTypes, Component} from 'react';
import {
    Modal,
    Radio,
    Row,
    Col,
    Form,
    Input,
    Button,
    message
} from 'antd';
import * as styles from './WxticketModal.css'
import {USER_TYPE, COUPON_TYPE} from 'config/constants';
import {WxCouponFieldDecorator} from 'components/admin/CouponPublish/PublishForm/validator.js';
import { ticketQueryApi } from 'api';
import { extractStatus } from 'helpers/util';

const FormItem = Form.Item;

@Form.create()
export default class WxTicketModel extends Component {
    static propTypes = {
        visible: PropTypes.bool.isRequired,
        onCancel: PropTypes.func.isRequired,
        ticketWx: PropTypes.object.isRequired
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                const {wxkey,form,setNeedPay,number,fetchNumber} = this.props;

                let num_parseInt;
                (number == 0) ? num_parseInt = 0 : num_parseInt = parseInt(number);
                ticketQueryApi
                  .exchangeWechatCoupon(wxkey,values.WXCOUPON)
                  .then(data => {
                    if (parseInt(data.code) === 200) {
                        message.success('兑换成功');
                        let new_num = parseInt(values.WXCOUPON) + num_parseInt;
                        fetchNumber(new_num);
                        form.resetFields();
                        setNeedPay(0);
                    } else {
                      message.error(data.msg);
                    }
                  });
            }
        });

    }

    render() {
        const {visible, onCancel, ticketWx, form, totalpay, handleNeedPayClick,wxkey, needpay, userType, number, fetchNumber} = this.props;

        const {couponname, couponcount} = ticketWx;

        return (
            <Modal title={'券库存分配: ' + couponname} visible={visible} footer={null} onCancel={onCancel}>
                <Form onSubmit={this.handleSubmit}>
                    <div className={styles.container}>
                        <Row>
                            <Col span={5} offset={1}>
                                当前身份:<span>{extractStatus(USER_TYPE)(userType)}</span>
                            </Col>
                            <Col span={4} offset={1}>
                                券库存:
                                <span style={{
                                    color: '#F00'
                                }}>{couponcount}张</span>
                            </Col>
                            <Col span={5} offset={1}>
                                已兑换券库存:
                                <span style={{
                                    color: '#F00'
                                }}>{number == '' ? 0 : number}张</span>
                            </Col>
                            <Col span={6} offset={1}>
                                账户券点:
                                <span style={{
                                    color: '#F00'
                                }}>{totalpay} 点</span>
                            </Col>
                        </Row>

                        <Row style={{
                            border: '1px dashed #CCC',
                            marginTop: '20px',
                            marginBottom: '20px',
                            borderRadius: '5px'
                        }}>
                            <Col span={20} offset={2} style={{
                                paddingTop: '20px'
                            }}>
                                <FormItem label="增加券库存" labelCol={{
                                    span: 5
                                }} wrapperCol={{
                                    span: 19
                                }} required>
                                    <Col span={10} offset={1}>
                                        <FormItem>
                                            {WxCouponFieldDecorator(form,couponcount,handleNeedPayClick,wxkey,number)(<Input type="number" style={{
                                                width: 64,
                                                marginRight: 10
                                            }}/>)}张
                                        </FormItem>
                                    </Col>
                                    <Col span={13}>
                                      需要点券：<span style={{color: "#f00"}}>{needpay}</span>
                                    </Col>

                                </FormItem>
                                <Row style={{marginTop: '-10px',marginBottom: '20px'}}>
                                    <Col span={14}>
                                        将券发配置至微信 "朋友的优惠券"
                                    </Col>
                                    <Col span={4}>
                                        <Button style={{display:'none'}} type="primary" size='small'>去充值</Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row>
                            <Col span={24}>
                                <Button style={{margin:'0 auto',display: 'block'}} type="primary" size='large' onClick={this.handleSubmit}>确认配发</Button>
                                <p style={{textAlign: 'center'}}>确认之后将会自动扣除您的券点</p>
                            </Col>
                        </Row>

                    </div>
                </Form>
            </Modal>
        );
    }
}
