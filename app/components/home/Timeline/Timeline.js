import React from 'react';
import classnames from 'classnames';
import * as styles from './styles.css';

const data = [
  {date: '2017-06-11 ~ 2017-06-25', title: '永辉舒化奶活动'},
  {date: '2017-04-19 ~ 2017-05-02', title: '伊利粉丝计划活动第二档'},
  {date: '2017-04-05 ~ 2017-04-17', title: '支付宝味可滋活动'}
];

function TimelineItem({date, title, desc, index}) {
  const cls = index % 2 === 0 ? styles.right : styles.left;
  return (
    <div className={classnames(cls, styles.itemContainer)}>
      <p className={styles.date}>{date}</p>
      <p className={styles.content}>
        <span className={styles.title}>{title}</span>
      </p>
    </div>
  );
}

function Dot({index}) {
  const imgUrl = index % 2 === 0 ? require('images/dot_blue.png') : require('images/dot_red.png');
  return (
    <div className={styles.dot} style={{top: 50 * index + 'px'}}>
      <img src={imgUrl}/>
    </div>
  );
}

function DotLine({length}) {
  const dotChildren = [];
  for (let index = 0; index<length; index++) {
    dotChildren.push(React.createElement(Dot, {index, key: index}));
  }
  return (
    <div className={styles.dotline}>
      <div className={styles.greyLine} style={{height: 50 * (length - 1) + 'px'}}></div>
      <div>
        {dotChildren}
      </div>
    </div>
  );
}

export default function Timeline() {
  return (
    <div className={styles.container}>
      {data.map((item, index) => {
        return <TimelineItem key={index} {...item} index={index}/>;
      })}
      <DotLine length={data.length}/>
    </div>
  );
}