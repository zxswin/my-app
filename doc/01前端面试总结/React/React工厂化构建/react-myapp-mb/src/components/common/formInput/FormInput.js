import React from 'react';
import classnames from 'classnames';
import Input from '../input';
import styles from './style.scss';

const FormInput = props => {
  const { label = '', value = '', theme = {}, className = '', disabled = false, type = 'text', percent, placeholder = '' } = props;

  const onChange = value => {
    const { onChange } = props;
    onChange && onChange(value);
  };

  return (
    <div className={classnames(styles.FormInput)}>
      <div className={styles.label}>{label}</div>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        theme={theme}
        disabled={disabled}
        className={className}
        onChange={onChange}
      />
      {percent && <span className={styles.percent}>%</span>}
    </div>
  );
};
export default FormInput;
