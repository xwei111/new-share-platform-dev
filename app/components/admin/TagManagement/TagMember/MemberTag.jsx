import React, {PropTypes,Component} from 'react';
import { Input,Icon } from 'antd';
import { Link } from 'react-router';
const Search = Input.Search;
import * as styles from './styles.css';
import { MemberTagTableContainer,MemberTagFormContainer } from 'containers/admin/TagManagement';


export default function MemberTag({searchShow,setShow,setStyle,searchValue}) {
    return (
        <div style={{padding:'20px'}}>
          <div className={styles.Z_Title}>
            <div style={{width: '200px',display: 'inline-block'}}>
              <Search
                placeholder="请输入粉丝标签名称"
                style={{ width: 200 }}
                onSearch={searchValue}
              />
            </div>

            <div className={styles.Z_Search}>
              <p onClick={searchShow} style={{borderTop:setStyle,borderRight:setStyle,borderLeft:setStyle}}>
                高级搜索
                <Icon className={setShow=='none'?'':styles.hide+' '+styles.showStyle} type="down" />
                <Icon className={setShow=='none'?styles.hide:' '+' '+styles.showStyle} type="up" />
              </p>
            </div>

            <Link className={styles.Z_AddNew} to="/admin/fans/tagmanage">新增自定义标签</Link>


            <div className={styles.Z_SearchPull} style={{display:setShow}}>
              <MemberTagFormContainer/>
            </div>

          </div>

          <div style={{marginTop:'20px'}}>
            <MemberTagTableContainer/>
          </div>
        </div>
    )
}
