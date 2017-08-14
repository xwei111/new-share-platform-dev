import React, {PropTypes,Component} from 'react';
import { GoodsClassSimilar } from 'components/admin/FansProfile';
import { Form } from 'antd';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {setTab, setMenu} from 'redux/modules/tab';
import * as menuActionCreators from 'redux/modules/menu';

import { SubResult } from 'components/admin/Marketing';


@connect(({menu}) => ({
    tipsPage: menu.tipsPage,
}), dispatch => bindActionCreators({...menuActionCreators, setTab, setMenu}, dispatch),)

@Form.create()
export default class GoodsClassSimilarContainer extends React.Component {

  state = {
    fansNumTotal : [
        {
            "name": "潜在粉丝",
            "value": 3215,
            "explain": "潜在粉丝：0积分（1元=1积分）"
        },
        {
            "name": "初级粉丝",
            "value": 1412,
            "explain": "初级粉丝：0~99积分（1元=1积分）"
        },
        {
            "name": "中级粉丝",
            "value": 272,
            "explain": "中级粉丝：100~499积分（1元=1积分）"
        },
        {
            "name": "铁杆粉丝",
            "value":  45,
            "explain": "铁杆粉丝：500~2999积分（1元=1积分）"
        }
    ],
    show: 1,
    act: 1,
    des: '偏好甜味粉丝',
    chan: '伊利粉丝第二档计划'

  }


  componentDidMount() {

  }

  onSearch() {
    this.setState({
      fansNumTotal : [
        {
            "name": "潜在粉丝",
            "value": 2812,
            "explain": "潜在粉丝：0积分（1元=1积分）"
        },
        {
            "name": "初级粉丝",
            "value": 589,
            "explain": "初级粉丝：0~99积分（1元=1积分）"
        },
        {
            "name": "中级粉丝",
            "value": 76,
            "explain": "中级粉丝：100~499积分（1元=1积分）"
        },
        {
            "name": "铁杆粉丝",
            "value":  0,
            "explain": "铁杆粉丝：500~2999积分（1元=1积分）"
        }
      ]
    })
  }

  onReset() {
    this.setState({
      fansNumTotal : [
          {
              "name": "潜在粉丝",
              "value": 3215,
              "explain": "潜在粉丝：0积分（1元=1积分）"
          },
          {
              "name": "初级粉丝",
              "value": 1412,
              "explain": "初级粉丝：0~99积分（1元=1积分）"
          },
          {
              "name": "中级粉丝",
              "value": 272,
              "explain": "中级粉丝：100~499积分（1元=1积分）"
          },
          {
              "name": "铁杆粉丝",
              "value":  45,
              "explain": "铁杆粉丝：500~2999积分（1元=1积分）"
          }
      ]
    })
  }

  onHover(a) {
    
    if (a === 0) {
      this.setState({
        show: 1
      })
    } else if (a === 1) {
      this.setState({
        show: 2
      })
    } else if (a === 2) {
      this.setState({
        show: 3
      })
    } else if (a === 3) {
      this.setState({
        show: 4
      })
    }
  }

  onOut(a) {
    this.setState({
      show: 0
    })
  }

  onChange(a) {
    if (a === 1) {
      this.setState({
        act: 1,
        des: '偏好甜味粉丝'
      })
    } else if (a === 2) {
      this.setState({
        act: 2,
        des: '偏好谷物粉丝'
      })
    } else if (a === 3) {
      this.setState({
        act: 3,
        des: '偏好牛奶粉丝'
      })
    } else if (a === 4) {
      this.setState({
        act: 4,
        des: '健康饮食型粉丝'
      })
    }
  }

  handleJump() {
      const { setTab, setTipsPage, setMenu } = this.props;
      setTab('activity');
      setMenu('activityData','activity');
      setTipsPage(false);
  }

  onTabChange(e) {
    this.setState({
      chan: e,
    })
  }

  render() {

      const { fansNumTotal,form } = this.props;
      return (
          <div>
            <GoodsClassSimilar {...this.state} form={form} onTabChange={:: this.onTabChange} onChange={:: this.onChange} onSearch={:: this.onSearch} onReset={:: this.onReset} onHover={:: this.onHover} onOut={:: this.onOut} handleJump={:: this.handleJump}/>
          </div>
      );
  }
}
