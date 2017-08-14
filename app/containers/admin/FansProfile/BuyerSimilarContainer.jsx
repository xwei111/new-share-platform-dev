import React, {PropTypes,Component} from 'react';
import { BuyerSimilar } from 'components/admin/FansProfile';
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
export default class BuyerSimilarContainer extends React.Component {

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
    fansChange : [
        {
            "name": "潜在粉丝",
            "value": 1525,
            "explain": "潜在粉丝：0积分（1元=1积分）"
        },
        {
            "name": "初级粉丝",
            "value": 918,
            "explain": "初级粉丝：0~99积分（1元=1积分）"
        },
        {
            "name": "中级粉丝",
            "value": 209,
            "explain": "中级粉丝：100~499积分（1元=1积分）"
        },
        {
            "name": "铁杆粉丝",
            "value":  45,
            "explain": "铁杆粉丝：500~2999积分（1元=1积分）"
        }
    ],
    transformation : {
      a: 843,
      b: 841,
      c: 128,
      d: 0,
    },

    change: {
      a: 29,
      b: 12,
      c: 2,
    },

    show: 0,
    show1: 0,
    chan: '伊利粉丝第二档计划'
  }

  componentDidMount() {
    
  }

  onSearch() {
    this.setState({
      show1: 1
    })
  }

  onReset() {
    this.setState({
      show1: 0
    })
  }


  onHover(a) {
    
    if (a === 0) {
      this.setState({
        change: {
          a: 29,
          b: 12,
          c: 2,
        }
      })
    } else if (a === 1) {
      this.setState({
        change: {
          a: '',
          b: 6,
          c: 4,
        }
      })
    } else if (a === 2) {
      this.setState({
        change: {
          a: '',
          b: '',
          c: 8,
        }
      })
    }

    if (a !== 3) {
      this.setState({
        show: 1
      })
    }
  }

  onOut(a) {
    this.setState({
      show: 0
    })
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

      const { form } = this.props;
      return (
          <div >
            <BuyerSimilar {...this.state}  form={form} onTabChange={:: this.onTabChange} onSearch={:: this.onSearch} onReset={:: this.onReset} onHover={:: this.onHover} onOut={:: this.onOut} handleJump={:: this.handleJump}/>
          </div>
      );
  }
}
