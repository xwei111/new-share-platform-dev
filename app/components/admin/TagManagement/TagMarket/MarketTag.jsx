import React, {PropTypes,Component} from 'react';
import { Input,Icon } from 'antd';
const Search = Input.Search;
import * as styles from './styles.css';
import { MarketTagTableContainer,MarketTagFormContainer } from 'containers/admin/TagManagement';

export default function MarketTag({searchShow,setShow,setStyle,ResetPull,SearchPull,searchValue}) {
    return (
        <div style={{padding:'20px'}}>
          <div>
            <div style={{width: '200px',display: 'inline-block'}}>
              <Search
                placeholder="请输入门店名称"
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


            <div className={styles.Z_SearchPull} style={{display:setShow}}>
              <MarketTagFormContainer/>
            </div>

          </div>
          <div style={{marginTop:'20px'}}>
            <MarketTagTableContainer/>
          </div>
        </div>
    )
}
