import React, {Component, PropTypes} from 'react';
import { Row,Col,Icon,Tooltip,Form,Select,Radio,Button,Input } from 'antd';
import { Link } from 'react-router';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
import styles from './styles.css';
import globalStyles from 'sharedStyles/global.css';

 export default class BuyerSimilar extends Component {
     render() {
       const { fansNumTotal, fansChange, transformation, show, show1, form, onSearch, onReset, onHover, onOut, change, handleJump, chan, onTabChange } = this.props;
       const formItemLayout = {
         labelCol: { span: 10 },
         wrapperCol: { span:14 },
       };
       const { getFieldDecorator } = form;
       return (
           <div className={globalStyles.container}>
            <div className={globalStyles.commonTit}><p><span></span>购物者相似度</p></div>
             <Form className={styles.containerForm}>
               <Row>
               <Col span={6}>
                 <FormItem
                   {...formItemLayout}
                   label="商户："
                 >
                 {getFieldDecorator('commercial',{initialValue: "1"},{
                   rules: [{ required: true}],
                 })(
                   <Select size="small">
                     <Option value="1">华润万家</Option>
                     <Option value="0">伊利</Option>
                   </Select>
                 )}
                 </FormItem>
               </Col>
               <Col span={6}>
                 <FormItem
                   {...formItemLayout}
                   label="品类："
                 >
                 {getFieldDecorator('class',{initialValue: "1"},{
                   rules: [{ required: true}],
                 })(
                   <Select size="small">
                     <Option value="1">液态奶</Option>
                     <Option value="0">伊利奶</Option>
                   </Select>
                 )}
                 </FormItem>
               </Col>
               <Col span={6}>
                 <FormItem
                   {...formItemLayout}
                   label="商品："
                 >
                 {getFieldDecorator('goods',{initialValue: "1"},{
                   rules: [{ required: true}],
                 })(
                   <Select size="small">
                     <Option value="1">安慕希</Option>
                     <Option value="0">停用</Option>
                   </Select>
                 )}
                 </FormItem>
                </Col>
              </Row>
              <Row>
                <Col span={16}>
                  <FormItem
                    {...formItemLayout}
                    label="查看方式："
                    style={{marginLeft: '-226px'}}
                  >
                    {getFieldDecorator('look_style',{initialValue:"1"})(
                      <RadioGroup>
                        <Radio value="1">按活动档期查看</Radio>
                        <Radio value="2">按时间周期查看</Radio>
                      </RadioGroup>
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

              
                
              <Row>
                 <Col span={5}>
                   <div className={styles.containerLeft}>
                     <p>全量粉丝分级数据</p>
                   {
                       fansNumTotal!='' ?
                       <div className={styles.fansNumberChart}>
                         {fansNumTotal.map((item, index) =>
                             <div key={index} className={styles.fansNumberChart_pic}>
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
                   </div>
                 </Col>


                 <Col span={15} offset={1} style={show1 === 0 ? {display: 'block'} : {display: 'none'}}>
                   <p style={{
                       width: '100%',
                       height: '350px',
                       lineHeight: '350px',
                       textAlign: 'center',
                   }}><Icon type="frown-o"/>请选择上述条件后开始购物者生命周期分析</p>
                 </Col>

                  <Col span={15} offset={1} style={show1 === 1 ? {display: 'block'} : {display: 'none'}}>
                  <div className={styles.containerRightChoose}>
                    选择活动：
                    <Select defaultValue="伊利粉丝第二档计划" onChange={onTabChange} style={{ width:300 }}>
                      <Option value="伊利粉丝第二档计划">伊利粉丝第二档计划</Option>
                      <Option value="伊利粉丝第一档计划">伊利粉丝第一档计划</Option>
                    </Select>
                  </div>

                  <div className={styles.containerRight}>

                    <div className={styles.containerRightChoose}>

                    <p className={styles.containerRightChoose_title}>截至“{chan}“结束粉丝分级数据</p>
                    <Row>
                      <Col span={4}>
                        <div className={styles.containerRightChoose_left}>
                          <p>非粉丝</p>
                          <p>（未参加/未购买伊利商品过的购买者）</p>
                        </div>
                      </Col>
                      <Col span={4}>
                       <div className={styles.containerRightChoose_leftLine}>

                         <p>{transformation.a}
                          <img style={{display:'block',marginTop: '-30px',marginLeft: '20px'}} src={require('images/fans_arr.png')} />
                          </p>

                         <p style={{marginTop: '20px'}}>{transformation.b}
                          <img style={{display:'block',marginTop: '-30px',marginLeft: '20px'}} src={require('images/fans_arr.png')} />
                         </p>

                         <p style={{marginTop: '20px'}}>{transformation.c}
                          <img style={{display:'block',marginTop: '-30px',marginLeft: '20px'}} src={require('images/fans_arr.png')} />
                         </p>

                         <p style={{marginTop: '10px'}}>{transformation.d}
                          <img style={{display:'block',marginTop: '-30px',marginLeft: '20px'}} src={require('images/fans_arr.png')} />
                         </p>

                       </div>
                     </Col>
                     <Col span={8}>
                       {
                           fansChange!='' ?
                           <div className={styles.fansNumberChart}>
                             {fansChange.map((item, index) =>
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
                     </Col>
                     <Col span={4}>
                       <div className={styles.containerRightLine} style={show === 0 ? {display: 'none'} : {display: 'block'}}>
                         <p>{change.a}</p>
                         <p>{change.b}</p>
                         <p>{change.c}</p>
                       </div>
                     </Col>
                   </Row>
                   <Row style={{position: 'relative',overflow: 'hidden'}}>
                      <img style={{position: 'absolute', top: '-50px',left: '20px'}} src={require('images/d_line.png')} />
                     <Col span={8} offset={4}>
                       <div className={styles.containerBottom}>
                         <p>
                           <span>偏好品类：</span>
                           <Select style={{width:'120px'}} defaultValue="液态奶">
                             <Option value="液态奶">液态奶</Option>
                             <Option value="0">停用</Option>
                           </Select>
                        </p>
                         <p><span>购物频次：</span><Input style={{width:'100px'}} placeholder="0-5"/><span style={{marginLeft:'5px'}}>次</span></p>
                         <p><span>客单价：</span><Input style={{width:'100px'}} placeholder="50-100"/><span style={{marginLeft:'5px'}}>元</span></p>
                       </div>
                     </Col>
                     <Col span={3}>
                       <p style={{width: '100%', height: '1px', border: '1px dashed #CCC',color: '#FFF', marginTop: '80px'}}>我是一条分割线</p>
                     </Col>
                     <Col span={8}>
                       <div className={styles.containerBottom+' '+styles.containerBottomRight}>
                         <p>符合条件的“潜在粉丝”为<span>7839</span>人</p>
                         <div className={styles.containerBottomRight_Bottom}>
                           <span>生成标签</span>
                           <span><Link style={{color: '#419BF9'}} to="/admin/activity/activity" onClick={handleJump}>发起活动</Link></span>
                         </div>
                       </div>
                     </Col>
                   </Row>
                 </div>
               </div>
             </Col>
           </Row>
         </div>
       )
   }
 }
