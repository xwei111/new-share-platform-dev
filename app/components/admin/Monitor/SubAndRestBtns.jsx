import React, { PropTypes } from 'react';
import { Form, Button, Col, Icon } from 'antd';
import * as styles from './style.css';
const FormItem = Form.Item;

SubAndRestBtns.propTypes = {
  onSubBtnClick: PropTypes.func,
  onRestBtnClick: PropTypes.func
};

export default function SubAndRestBtns({onSubBtnClick, onRestBtnClick}) {
  return (
    <Col span={5}>
        <FormItem>
        <div className={styles.subContiner} onClick={onSubBtnClick}><img style={{marginTop: '7px'}} src={require('images/icon_serch.png')}/></div>
        </FormItem>
    </Col>
  );
}
