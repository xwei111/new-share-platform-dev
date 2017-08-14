import React, { Component, PropTypes } from 'react';
import * as styles from './styles.css';

export default class Carousel extends Component {
  render() {
    return (
      <div className={styles.container} ref="container">
        <div className={styles.wrapper}>
          <img src={require('images/banner1.jpg')} ref="imageWrapper" className={styles.image}/>
          <div className={styles.form}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
