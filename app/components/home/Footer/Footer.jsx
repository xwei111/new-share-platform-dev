import React, { Component } from 'react';
import classnames from 'classnames';
import * as styles from './styles.css';

export default function Footer(props) {
  return (
    <div className={classnames(props.className, styles.container)}>
      <p>浙ICP备 15014474 号　｜　浙公安网备 33010802006011 号　|　Copyright © 2015  MiYa Technology  All rights Reserved</p>
    </div>
  );
}
