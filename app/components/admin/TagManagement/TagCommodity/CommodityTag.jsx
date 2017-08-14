import React, {PropTypes,Component} from 'react';
import { Input,Icon } from 'antd';
const Search = Input.Search;
import * as styles from './styles.css';
import { CommodityTagTableContainer,CommodityTagFormContainer,CommodityNewCreateContainer } from 'containers/admin/TagManagement';

export default function CommodityTag({searchShow,setShow,setStyle,ResetPull,SearchPull,searchValue}) {
    return (
        <div style={{padding:'20px'}}>
          <div className={styles.Z_Title}>
            <div style={{width: '200px',display: 'inline-block'}}>
              <Search
                placeholder="请输入商品名称"
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
            <div>
              <CommodityNewCreateContainer/>
            </div>

            <div className={styles.Z_SearchPull} style={{display:setShow}}>
              <CommodityTagFormContainer/>
            </div>

          </div>
          <div style={{marginTop:'20px'}}>
            <CommodityTagTableContainer/>
          </div>
        </div>
    )
}
