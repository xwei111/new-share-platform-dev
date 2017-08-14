import React, {Component, PropTypes} from 'react';
import { Row,Col,Icon,Tooltip,Form,Select,Radio,Button,Input } from 'antd';
import { Link } from 'react-router';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import styles from './styles.css';
import globalStyles from 'sharedStyles/global.css';

 export default class GoodsClassSimilar extends Component {
     render() {
       const { fansNumTotal,form, onSearch, onReset, onHover, onOut, handleJump, show, act, onChange, des, onTabChange, chan } = this.props;
       const formItemLayout = {
         labelCol: { span: 10 },
         wrapperCol: { span:14 },
       };
       const { getFieldDecorator } = this.props.form;
       return (
           <div className={globalStyles.container}>
             <Form className={styles.containerForm}>
               <Row>
               <Col span={6}>
                 <FormItem
                   {...formItemLayout}
                   label="区域："
                 >
                 {getFieldDecorator('region',{initialValue: "1"},{
                   rules: [{ required: true}],
                 })(
                   <Select>
                     <Option value="1">浙江</Option>
                     <Option value="0">北京</Option>
                   </Select>
                 )}
                 </FormItem>
               </Col>
               <Col span={6} offset={1}>
                 <FormItem
                   {...formItemLayout}
                   label="商户："
                 >
                 {getFieldDecorator('commercial',{initialValue: "1"},{
                   rules: [{ required: true}],
                 })(
                   <Select>
                     <Option value="1">华润万家</Option>
                     <Option value="0">可有可乐</Option>
                   </Select>
                 )}
                 </FormItem>
               </Col>
               <Col span={6} offset={1}>
                <FormItem
                  {...formItemLayout}
                  label="活动："
                >
                  {getFieldDecorator('activity',{initialValue:chan})(
                    <Select onChange={onTabChange}>
                      <Option value="伊利粉丝第二档计划">伊利粉丝第二档计划</Option>
                      <Option value="伊利粉丝第一档计划">伊利粉丝第一档计划</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12} offset={10}>
                <Button type="primary" onClick={onSearch}>搜索</Button><Button style={{marginLeft: '10px'}} onClick={onReset}>重置</Button>
              </Col>
            </Row>
        </Form>
         <div className={globalStyles.commonTit}><p><span></span>粉丝分级数据</p></div>
         <Row>
           <Col span={8}>
             <div className={styles.LeftPic}>
               <p>截至“{chan}“结束粉丝分级数据</p>
               {
                 fansNumTotal!='' ?
                 <div className={styles.fansNumberChart}>
                   {fansNumTotal.map((item, index) =>
                       <div key={index} className={styles.fansNumberChart_pic} onMouseOver={a => {onHover(index)}} onMouseOut={a => {onOut(index)}}>
                            <p className={styles.fansNumber}>
                              <Tooltip placement="top" title={item.explain}>
                                <span>{item.name}</span>
                              </Tooltip>
                              <span>{item.value}个</span>
                            </p>
                       </div>
                   )}
                   
                 </div>
                     :
                     <p style={{
                           width: '100%',
                           height: '350px',
                           lineHeight: '350px',
                           textAlign: 'center',
                       }}><Icon type="frown-o"/>暂无数据</p>
                }

                <div style={{position: 'absolute',width: '20%',height: '100%',top: '80px',right: '-20px'}}>
                  <img className={styles.c1} src={require('images/fans_arr.png')} style={show === 1 ? {display: 'block'} : {display: 'none'}} />
                  <img className={styles.c2} src={require('images/fans_arr.png')} style={show === 2 ? {display: 'block'} : {display: 'none'}} />
                  <img className={styles.c3} src={require('images/fans_arr2.png')} style={show === 3 ? {display: 'block'} : {display: 'none'}} />
                  <img className={styles.c4} src={require('images/fans_arr3.png')} style={show === 4 ? {display: 'block'} : {display: 'none'}} />
                </div>


             </div>
           </Col>
           <Col span={14} offset={1}>
             <div className={styles.RightPic}>
               <div className={globalStyles.commonTit}><p><span></span>意向粉丝包含以下人群标签</p></div>
                 <Row className={styles.RightBottom}>
                   <Col span={5}><span style={act === 1 ? {color:'#419BF9'} : {color: '#000'}} onClick={e => {onChange(1)}}>偏好甜味粉丝</span></Col>
                   <Col span={5} offset={1}><span style={act === 2 ? {color:'#419BF9'} : {color: '#000'}} onClick={e => {onChange(2)}}>偏好谷物粉丝</span></Col>
                   <Col span={5} offset={1}><span style={act === 3 ? {color:'#419BF9'} : {color: '#000'}} onClick={e => {onChange(3)}}>偏好牛奶粉丝</span></Col>
                   <Col span={5} offset={1}><span style={act === 4 ? {color:'#419BF9'} : {color: '#000'}} onClick={e => {onChange(4)}}>健康饮食型粉丝</span></Col>
                 </Row>
                 <div className={styles.RightTable_pic} style={{position: 'relative'}}>
                    <p style={{fontWeight: 'bolder',fontSize: '14px'}}>“{des}”以“安慕希”为对象的商品相似度</p>
                    <p style={{marginTop: '10px',marginLeft: '10px',width: '70%'}}>根据商品相似度表可以看出，畅轻与安慕希的相似度最高(为0.8979)，所以建议对此区域商户下偏好甜味粉丝进行畅轻为活动商品的营销活动</p>
                    <Button style={{position: 'absolute',right: '20px', top: '30px'}} type="primary"><Link to="/admin/activity/activity" onClick={handleJump}>发起活动</Link></Button>
                   <img src={require("images/table_pic.png")}/>
                 </div>
             </div>
            </Col>
          </Row>
         </div>
       )
   }
 }
