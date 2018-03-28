import React from 'react';
import styles from './Item.module.css';

export default ({ title, description }) => {
  return (
    <div className={styles.item}>
      <h5>{title}</h5>
      <div>{description}</div>
    </div>
  );
};
