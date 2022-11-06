import React from 'react';
import classnames from 'classnames';
import IconSvg from '../iconSvg';
import styles from './style.scss';

const CountAmout = props => {
  const { amout } = props;
  // 点击加号
  const addClickHandle = () => {
    const { addClick } = props;
    addClick && addClick();
  };

  // 点击减号
  const minusClickHandle = () => {
    const { minusClick } = props;
    minusClick && minusClick();
  };

  return (
    <div className={classnames(styles.CountAmout)}>
      <IconSvg type="add" theme={styles} onClick={addClickHandle} />
      <span>{amout}</span>
      <IconSvg type="minus" theme={styles} onClick={minusClickHandle} />
    </div>
  );
};
export default CountAmout;
