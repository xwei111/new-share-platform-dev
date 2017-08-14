import React, { PropTypes } from 'react';
import { Form, Button, Col } from 'antd';
import * as styles from './styles.css';
const FormItem = Form.Item;

SubAndRestBtns.propTypes = {
  onSubBtnClick: PropTypes.func,
  onRestBtnClick: PropTypes.func
};

export default function SubAndRestBtns({onSubBtnClick, onRestBtnClick}) {
  return (
    <Col span={2} style={{ marginTop: '-5px' }}>
        <FormItem>
            <Button type="primary" size="small" onClick={onSubBtnClick}>搜索</Button>
            &nbsp;&nbsp;&nbsp;
            <Button style={{ display: 'none' }} size="small" onClick={onRestBtnClick}>重置</Button>
            <span style={{ display: 'none' }} className={styles.downLoadBtn}>下载报表</span>
        </FormItem>
    </Col>
  );
}
