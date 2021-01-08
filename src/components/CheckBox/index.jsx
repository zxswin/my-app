import { useCallback } from 'react';
import classnames from 'classnames';
import './style.scss';

const CheckBox = props => {
  const { onChange = () => {}, disabled = false, className = '', id = 'checkbox', checked = false, value = '' } = props;

  // 复选框checked状态发生了改变
  const onCheckdeChange = useCallback(
    e => {
      const checked = e.currentTarget.checked;
      onChange && onChange(checked, e);
    },
    [onChange]
  );
  return (
    <div className={classnames(`UI-Checkbox ${className}`, { 'UI-Checkbox--disabled': disabled })}>
      <input onChange={onCheckdeChange} checked={checked} value={value} type="checkbox" id={id} className="switch" disabled={disabled} />
      <label htmlFor={id}></label>
    </div>
  );
};

export default CheckBox;
