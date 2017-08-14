import React, { PropTypes } from 'react';
import {Table,Pagination,Icon,Button,Popconfirm} from 'antd';
import * as styles from './styles.css';

export default function Newdata({handleCancel,filename,handledown,hanldecloserepeat,showrepeat,importf,columns,newdate,handlenewdate,showtitle,hanldeclose,titlecontent,repeatcontent}){
  const obje={defaultPageSize:5,size:'large'}
  const list=[];
  const len=repeatcontent.length;
  for(var i=0;i<len;i++){
      list.push(
        <li>{repeatcontent[i]}</li>
      )
  }
  
  var newdatelist=newdate;
  
  
  return(
  <div className={styles.newBox}>
       <div className={styles.newheader}>
           <p>批量新增</p>
       </div>
       <div className={styles.newfile}>
           <div className={styles.newfiletop}>
                 <img src={require('images/file.png')}/>
                 <p>上传文件</p>
                 <div>
                      <input type="file" onChange={importf}/>
                 </div>
           </div>
           <div className={styles.newfilecenter}>
                 <div>请上传excel文件，每行4列，4列依次为：商品名称-</div>
                 <div>商品条码-所属品牌-所属品类</div>
           </div>
           <div className={styles.newfilebottom}>
                 <span onClick={handledown}>下载样本Excel</span>
                 <a href="" download="样本.xlsx" id="hf"></a>
           </div>
       </div>
       <div className={styles.newdata} style={{width:'598px'}}>
            <Table className={styles.newtable} style={{width:'598px'}} size='small' columns={columns} dataSource={newdatelist} pagination={obje} />
       </div>
       <div className={styles.newbtn}>
           <Button type="danger" htmlType="submit" size="large" style={{marginRight:'10px'}}>
              <Popconfirm title="是否确认取消?" onConfirm={handleCancel} okText="Yes" cancelText="No">
                取消
              </Popconfirm>
            </Button>
            <Button type="primary" htmlType="submit" size="large">
              <Popconfirm title="是否确认批量新增商品?" onConfirm={handlenewdate} okText="Yes" cancelText="No">
                新增
              </Popconfirm>
            </Button>
       </div>
       { showtitle?
           <div className={styles.allContent}>
                {titlecontent}
                <Icon onClick={hanldeclose} className={styles.titleXXX} type="close"/>
           </div>
       :null}

       { showrepeat?
           <div className={styles.allContents}>
              <p>新增成功</p>
              <div>上传文件中69码有重复或是已经存在，请检查后重新上传</div>
              <ul>{list}</ul>
              <Icon onClick={hanldecloserepeat} className={styles.titleXXX} type="close"/>
           </div>
       :null}
  </div>
  )
}
