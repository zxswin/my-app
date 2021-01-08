import { CSSTransition } from 'react-transition-group';
import { useState, useCallback, useEffect } from 'react';
import classnames from 'classnames';
import './style.scss';

const Select = props => {
  const { options = [], value: select = {}, onChange = () => {}, type, placeholder = '', className = '', disabled = false } = props;

  // 搜索框中的值
  const [value, setValue] = useState(select.label);
  // 是否展示下拉列表
  const [showList, setShowList] = useState(false);
  // 下拉展示列表
  const [list, setList] = useState(options);
  // 输入框placeholder展示文案
  const [placeholderText, setPlaceholderText] = useState(placeholder);

  /** 点击展示或隐藏下拉列表 */
  const onClickShowList = useCallback(
    e => {
      if (disabled || type === 'search') return;
      setShowList(!showList);
    },
    [showList, type, disabled]
  );

  /** 输入控件变更事件 */
  const inputChangeHandle = useCallback(
    e => {
      const inputValue = e.currentTarget.value;
      const filterList = options.filter(item => item.label.includes(inputValue));
      setValue(inputValue);
      setList(filterList);
      setShowList(true);
      // 如果搜索值为空则placeholder设置为前一个值的文案
      if (!inputValue) {
        setPlaceholderText(select.label);
      }
    },
    [options, select]
  );

  /* 触发失去焦点事件 */
  const onBlurHandle = useCallback(
    e => {
      if (type === 'search') return;
      setTimeout(() => {
        setShowList(false);
      }, 60);
    },
    [type]
  );

  /* 搜索框获取焦点的时候 */
  const inputOnFocusHandle = useCallback(() => {
    setShowList(true);
    const filterList = options.filter(item => item.label.includes(select.label));
    setList(filterList);
  }, [options, select]);

  /** 搜索框失去焦点事件  */
  const inputOnBlurHandle = useCallback(() => {
    setTimeout(() => {
      setShowList(false);
    }, 60);
  }, []);

  /* 点击选中项 */
  const onClickItem = useCallback(
    item => {
      setTimeout(() => {
        if (type !== 'search') setShowList(false);
        onChange(item);
      }, 60);
    },
    [onChange, type]
  );

  // 生命周期当外部属性改变select的时候会触发
  useEffect(() => {
    setValue(select.label);
  }, [select.label]);

  useEffect(() => {
    // bug 选中值会闪动
    if (!showList) setValue(select.label);
  }, [showList, select, options, value]);

  return (
    <div className={classnames(`UISelect ${className}`, { 'UISelect--disabled': disabled })} tabIndex="0" onBlur={onBlurHandle}>
      <div className="UISelect_input-contain" onClick={onClickShowList}>
        <input
          value={value}
          type="text"
          placeholder={placeholderText}
          onFocus={inputOnFocusHandle}
          onChange={inputChangeHandle}
          onBlur={inputOnBlurHandle}
          disabled={type !== 'search'}
        />
        {type !== 'search' && <span className="UISelect_input-contain--arrow"></span>}
      </div>

      <CSSTransition in={showList} timeout={200} classNames="options-contain" unmountOnExit>
        <div className="UISelect_options-contain">
          {/* 空白数据 */}
          {!list.length && (
            <div className="UISelect_options-contain--empty">
              <span></span>
            </div>
          )}

          {/* 展示数据列表 */}
          {!!list.length && (
            <ul>
              {list.map(item => (
                <li
                  key={`${item.value}${item.label}`}
                  onClick={() => onClickItem(item)}
                  className={classnames('UISelect_options-contain--li', { active: select.value === item.value })}
                >
                  <span className="UISelect_options-contain--text">{item.label}</span>
                  {select.value === item.value && <span className="UISelect_options-contain--check"></span>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default Select;
