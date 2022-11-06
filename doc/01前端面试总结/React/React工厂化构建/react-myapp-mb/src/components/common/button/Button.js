import React from 'react';
import classnames from 'classnames';
import styles from './style.scss';

const Button = props => {
  const { text, type = 'primary', size = 'defaultSize', theme = {}, className = '' } = props;

  const onClickHandle = () => {
    const { onClick } = props;

    onClick && onClick();
  };

  return (
    <button className={classnames(styles.Button, styles[type], styles[size], theme.Button, className)} onClick={onClickHandle}>
      {text}
    </button>
  );
};
export default Button;
