import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import {WxTicketModal} from 'components/admin/Modal';
import {handleOpenWxModalAndFetchData, closeTicketWxModal, handleNeedPay, fetchTicketNeedSuccess, fetchNumberSuccess} from 'redux/modules/modal';

@connect(({auth, modal}) => ({
    userType: auth.userType,
    visible: modal.WxticketModalVisible,
    ticketWx: modal.ticketWx,
    totalpay: modal.totalpay,
    wxkey: modal.wxkey,
    needpay: modal.needpay,
    number: modal.number,
}), {handleOpenWxModalAndFetchData, handleNeedPay, closeTicketWxModal, fetchTicketNeedSuccess, fetchNumberSuccess})
class WxTicketModalContainer extends React.Component {
    render() {
        const {
            userType,
            visible,
            closeTicketWxModal,
            ticketWx,
            totalpay,
            handleNeedPay,
            fetchNumberSuccess,
            wxkey,
            needpay,
            fetchTicketNeedSuccess,
            number
        } = this.props;
        return (<WxTicketModal userType={userType} visible={visible} ticketWx={ticketWx} totalpay={totalpay} onCancel={closeTicketWxModal} handleNeedPayClick={handleNeedPay} wxkey={wxkey} needpay={needpay} number={number} setNeedPay={fetchTicketNeedSuccess} fetchNumber={fetchNumberSuccess}/>);
    }
}

export default WxTicketModalContainer;
