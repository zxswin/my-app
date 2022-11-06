import React from 'react';
import classnames from 'classnames';
import styles from './style.scss';

const Input = props => {
  const { value, disabled = false, theme = {}, className = '', type = 'text', placeholder = '' } = props;

  const onChange = e => {
    const value = e.target.value;
    const { onChange } = props;

    onChange && onChange(value.trim());
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      className={classnames(styles.Input, theme.Input, className)}
      value={value}
      disabled={disabled}
      onChange={onChange}
    />
  );
};
export default Input;
