import React, {PropTypes, Component} from 'react';
import {Form, Modal, Transfer, Button} from 'antd';
import globalStyles from 'sharedStyles/global.css';
import * as styles from './styles.css';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 14 }
};

export default class AddTag extends React.Component {

    render() {
        const {tagData, selectData, selectedKeys, targetKeys, tagDone, onTagVisible, tagVisible, onOpenMoudle, onCloseMoulde, onTreeChange, onTreeSelect} = this.props;
        return (
            <div>
                <FormItem className={styles.size} label="参与人群：" {...formItemLayout} required>
                    已选择<span>{tagDone.length}</span>个人群标签
                    <div>
                        {
                          tagDone.map((item, idx) => (
                              <span key={idx} className={styles.blue + ' ' + styles.redall}>{item}</span>
                          ))
                        }
                        <span className={styles.blue} onClick={onOpenMoudle}>设置人群标签</span>
                    </div>
                </FormItem>
                <Modal title="添加人群" visible={tagVisible} footer={null} onCancel={visible => onTagVisible(false)} footer={[
                    <Button key="back" size="large" onClick={visible => onTagVisible(false)}>取消</Button>,
                    <Button key="submit" type="primary" size="large" onClick={onCloseMoulde}>确认</Button>
                ]}>
                    <Transfer dataSource={tagData.dataSource} titles={['可选标签', '已选标签']} targetKeys={targetKeys} selectedKeys={selectedKeys} onChange={onTreeChange} onSelectChange={onTreeSelect} render={item => item.label_name}/>
                </Modal>
            </div>
        );
    }
}
