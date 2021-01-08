import classnames from 'classnames';
import { CSSTransition } from 'react-transition-group';
import { useState, useCallback, useEffect } from 'react';
import './style.scss';

/**
 * 获取多选值 多个值用逗号隔开
 * @param {array} selectList 多选选中列表
 */

const getSelectListLabel = selectList => {
  const labelList = [];
  selectList.forEach(option => {
    labelList.push(option.label);
  });

  return labelList.join(',');
};

const MultipleSelect = props => {
  const { value: selectList = [], className = '', options = [], placeholder = '请选择', onChange = () => {}, disabled = false } = props;

  // 多选选中项展示值
  const defaultValue = getSelectListLabel(selectList);
  const [value, setValue] = useState(defaultValue);

  // 是否展示多选下拉列表
  const [showOptions, setShowOptions] = useState(false);

  // 下拉列表展示与隐藏
  const onClickToggleOptions = useCallback(() => {
    if (disabled) return;
    setShowOptions(!showOptions);
  }, [showOptions, disabled]);

  /**
   * 点击多选选项
   * @param option 选中项
   */
  const onClickOptionHandle = useCallback(
    option => {
      let selectOptions = [...selectList];

      if (selectList.find(item => item.label === option.label && item.value === option.value)) {
        // 取消选中
        selectOptions = selectList.filter(item => item.label !== option.label && item.value !== option.value);
      } else {
        // 选中
        selectOptions.push(option);
      }

      onChange && onChange(selectOptions);
    },
    [selectList, onChange]
  );

  // 点击选项前面的复选框
  const onClickOptionCheck = useCallback(
    (e, option) => {
      // 阻止事件冒泡
      e.stopPropagation();
      const checkde = e.currentTarget.checked;
      let selectOptions = [...selectList];

      if (checkde) {
        // 选中了
        selectOptions.push(option);
      } else {
        // 取消选中
        selectOptions = selectOptions.filter(item => item.label !== option.label && item.value !== option.value);
      }

      const value = getSelectListLabel(selectOptions);
      setValue(value);

      onChange && onChange(selectOptions);
    },
    [selectList, onChange]
  );

  // 当多选控件失去焦点的时候
  const multipleSelectOnBlurHandle = useCallback(() => {
    setShowOptions(false);
  }, []);

  // 生命周期
  useEffect(() => {
    const value = getSelectListLabel(selectList);
    setValue(value);
  }, [selectList]);

  return (
    <div
      className={classnames(`UI-MultipleSelect ${className}`, { 'UI-MultipleSelect--disabled': disabled })}
      tabIndex="0"
      onBlur={multipleSelectOnBlurHandle}
    >
      <div className="UI-MultipleSelect__input--contain" onClick={onClickToggleOptions}>
        <input
          placeholder={placeholder}
          value={value}
          onChange={() => {}}
          disabled
          className="UI-MultipleSelect__input--contain--text"
          type="text"
        />
        <span className="UI-MultipleSelect__input--contain--arrow"></span>
      </div>
      <CSSTransition in={showOptions} timeout={200} classNames="options-contain" unmountOnExit>
        <div className="UI-MultipleSelect__options--contain">
          {/* 空白数据 */}
          {!options.length && (
            <div className="UI-MultipleSelect__options--contain--empty">
              <span></span>
            </div>
          )}

          {/* 展示数据 */}
          {!!options.length && (
            <ul>
              {options.map(option => (
                <li key={`${option.lable}${option.value}`}>
                  <div className="UI-MultipleSelect__options--contain--check">
                    <input
                      onChange={e => onClickOptionCheck(e, option)}
                      checked={value.includes(option.label)}
                      value={option.value}
                      type="checkbox"
                      id={option.value}
                      className="switch"
                    />
                    <label htmlFor={option.value}></label>
                  </div>
                  <span
                    onClick={() => onClickOptionHandle(option)}
                    className={classnames('UI-MultipleSelect__options--contain--lable', { active: value.includes(option.label) })}
                  >
                    {option.label}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default MultipleSelect;
