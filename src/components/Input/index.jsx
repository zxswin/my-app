import { useCallback } from 'react';

import './style.scss';

const Input = props => {
  const { onChange = () => {}, className = '', disabled = false, placeholder = '请输入', value = '' } = props;

  // 输入控件值发生改变
  const inputValueChange = useCallback(
    e => {
      const value = e.currentTarget.value;
      onChange && onChange(value);
    },
    [onChange]
  );

  return (
    <input
      value={value}
      className={`UI-Input ${className}`}
      placeholder={placeholder}
      disabled={disabled}
      type="text"
      onChange={inputValueChange}
    />
  );
};

export default Input;
