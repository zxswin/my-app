import { useCallback } from 'react';
import './style.scss';

const Switch = props => {
  const { onChange, disabled = false, className = '', id = 'switch', checked = true, value = '' } = props;

  // 开关组件发生了切换
  const onCheckdeChange = useCallback(
    e => {
      const checked = e.currentTarget.checked;
      onChange && onChange(checked);
    },
    [onChange]
  );

  return (
    <div className={`UI-Switch ${className}`}>
      <input onChange={onCheckdeChange} checked={checked} value={value} type="checkbox" id={id} className="switch" disabled={disabled} />
      <label htmlFor={id}></label>
    </div>
  );
};

export default Switch;
