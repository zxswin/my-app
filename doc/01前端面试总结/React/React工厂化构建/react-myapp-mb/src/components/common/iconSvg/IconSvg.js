import React from 'react';
import classnames from 'classnames';
import styles from './style.scss';

const IconSvg = props => {
  const { type, theme = {} } = props;
  const onClickHandle = () => {
    const { onClick } = props;
    onClick && onClick();
  };
  return (
    <div className={classnames(styles.IconSvg, styles[type], theme[type], theme.IconSvg)} onClick={onClickHandle}>
      <span className={classnames(styles.closeIcon, theme.closeIcon, styles[`icon-${type}`], theme[`icon-${type}`])}></span>
    </div>
  );
};
export default IconSvg;
