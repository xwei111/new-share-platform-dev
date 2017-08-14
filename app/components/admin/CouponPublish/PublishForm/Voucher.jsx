import React, {PropTypes, Component} from 'react';
import {Form, Input, message} from 'antd';
import styles from './styles.css';
import {COUPON_TYPE} from 'config/constants';
import {formItemLayout} from '../constants.js';
import {minfeeFieldDecorator} from '../PublishForm/validator.js';
import {validateFields,getStrLeng} from 'helpers/util';

import {
    UserIdentity,
    CouponType,
    SearchableInput,
    Budget,
    Pic,
    CouponLimitation,
    ValidateDate,
    MinFee,
    CouponName,
    CouponRule,
    SubmitAndReset,
    SaveEditAndBack,
    CouponWechatType
} from 'components/admin/CouponPublish';

import {UserIdentityContainer, CouponTypeContainer} from "containers/admin/CouponPublish" //引入券类型筛选组件

const {VOUCHER} = COUPON_TYPE;

export default class Voucher extends Component {
    static propTypes = {
        isEdit: PropTypes.bool.isRequired,
        form: PropTypes.object.isRequired,
        userType: PropTypes.number.isRequired,
        onCouponTypeChange: PropTypes.func.isRequired,
        saveEdit: PropTypes.func.isRequired,
        back: PropTypes.func.isRequired
    }
    formatFormData(formData) {

        const {isSelectMode, format, isWxMode} = this.props;
        const result = format(formData);

        // 全场券字段
        result['budget'] = formData.budget * 100;
        result['expect'] = formData.rate;
        if (formData.minfee) {
            result['minfee'] = formData.minfee * 100;
        }

        if (isSelectMode === 2) {
            result['channel'] = 'ALIPAY';
            const couponRule = [];
            couponRule.push(formData['couponrule0']);
            formData.couponrule.map(i => couponRule.push(formData['couponrule' + i]));
            const subRule = couponRule.join('|');
            result['userule'] = subRule;
        }

        if (isSelectMode === 3) {
            if (isWxMode === 0) {
                result['wechat_coupon_type'] = 'COMMON';
                result['wechat_can_share'] = formData.wechat_can_share;
                result['wechat_can_give_friend'] = formData.wechat_can_give_friend;
            } else {
                result['wechat_coupon_type'] = 'FRIEND';
                result['wechat_abs_text'] = formData.couponnWechatDes;
                result['wechat_img_text'] = formData.couponnWechatText;
                result['wechat_abs_url'] = formData.couponWechatpic;
                result['wechat_img_image'] = formData.couponWechatimg;
            }
            result['couponpic'] = formData.couponpic;
            result['wechat_color'] = formData.wechat_color;
            result['wechat_code_type'] = formData.wechat_code_type;
            result['channel'] = 'WECHAT';
            const couponRule = [];
            couponRule.push(formData['couponrule0']);
            formData.couponrule.map(i => couponRule.push(formData['couponrule' + i]));
            const subRule = couponRule.join('|');
            result['userule'] = subRule;
        }

        const NAME = getStrLeng(formData.couponname);

        if (isSelectMode === 3 && NAME > 27) {
            message.error('优惠券名称过长');
            validateFields(form).catch(console.log);
            return;
        }

        if (isSelectMode === 3 && formData.couponpic == '') {
            message.error('请选择上传图片');
            validateFields(form).catch(console.log);
            return;
        }

        return result;
    }
    handleSubmit() {
        const { form, submit} = this.props;

        validateFields(form).then(:: this.formatFormData).then(submit).catch(console.log)
    }
    render() {
        const {
            form,
            userType,
            onCouponTypeChange,
            reset,
            isEdit,
            saveEdit,
            back,
            isSelectMode,
            isMyVip,
            isWxMode
        } = this.props;
        return (
            <Form>
                <UserIdentityContainer isEdit={isEdit}/>
                <CouponTypeContainer isEdit={isEdit}/>
                <Budget isEdit={isEdit} couponType={VOUCHER.value} form={form}/>
                <Pic form={form}/>
                <CouponLimitation isEdit={isEdit} form={form}/>
                <ValidateDate form={form}/>

                <MinFee isEdit={isEdit} form={form}/> {isSelectMode === 2 || isSelectMode === 3
                    ? <CouponRule form={form} isMyVip={isMyVip} isSelectMode={isSelectMode}/>
                    : null}

                {isSelectMode === 3
                    ? <CouponWechatType form={form} isWxMode={isWxMode}/>
                    : null}

                <CouponName form={form}/> {isEdit
                    ? <SaveEditAndBack onSaveEdit={saveEdit} onBack={back}/>
                    : <SubmitAndReset onSubmit={:: this.handleSubmit} onReset={reset}/>}
            </Form>
        );
    }
}
