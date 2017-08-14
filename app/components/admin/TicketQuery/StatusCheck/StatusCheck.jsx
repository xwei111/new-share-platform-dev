import React, { PropTypes } from 'react';
import { Popover, Button } from 'antd';
import { StatusIcon } from 'components/admin';
import { ticketStatusColor, extractStatus } from 'helpers/util';
import { COUPON_STATUS, USER_TYPE } from 'config/constants';

const { VERIFING } = COUPON_STATUS;
const { RETAILER } = USER_TYPE;

StatusCheck.propTypes = {
  status: PropTypes.any.isRequired,
  userType: PropTypes.number.isRequired,
  onPass: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired
}

export default function StatusCheck({status, userType, conpType, coupStatus, onPass, onReject}) {

  const statusContent = <span><StatusIcon color={ticketStatusColor(status)}/>{extractStatus(COUPON_STATUS)(status)}</span>;
  const content = (
    <div>
      <Button size="small" type="primary" onClick={onPass}>审核通过</Button>
      <Button size="small" style={{marginLeft: '8px'}} onClick={onReject}>审核不通过</Button>
    </div>
  );
  const contentWx = (
    <div>
      <p>{coupStatus}</p>
    </div>
  );


  if (parseInt(status) === VERIFING.value && userType === RETAILER.value) {
    return (
      <Popover title={parseInt(conpType) !== 3 ? '券审核' : '微信审核情况'} content={parseInt(conpType) !== 3 ? content : contentWx}>
        {statusContent}
      </Popover>
    );
  }
  return statusContent;
}
