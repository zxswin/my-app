import { CSSTransition } from 'react-transition-group';
import { useState, useCallback } from 'react';
import classnames from 'classnames';
import './style.scss';

const Select = props => {
  const { options, select, onChange } = props;

  // 是否展示下拉列表
  const [showList, setShowList] = useState(false);

  /** 点击展示或隐藏下拉列表 */
  const onClickShowList = useCallback(
    e => {
      setShowList(!showList);
    },
    [showList]
  );

  /** 输入控件变更事件 */
  const inputChangeHandle = useCallback(e => {
    const value = e.currentTarget.value;
    console.log('value', value);
  }, []);

  /* 触发失去焦点事件 */
  const onBlurHandle = useCallback(e => {
    setShowList(false);
  }, []);

  return (
    <div className="UISelect" tabIndex="0" onBlur={onBlurHandle}>
      <div className="UISelect_input-contain" onClick={onClickShowList}>
        <input value={select.label} type="text" onChange={inputChangeHandle} disabled />
        <span className="UISelect_input-contain--arrow"></span>
      </div>

      <CSSTransition in={showList} timeout={200} classNames="boss-text" unmountOnExit>
        <div className="UISelect_options-contain">
          {/* 空白数据 */}
          {!options.length && (
            <div className="UISelect_options-contain--empty">
              <span></span>
            </div>
          )}

          {/* 展示数据列表 */}
          {!!options.length && (
            <ul>
              {options.map(item => (
                <li
                  key={`${item.value}${item.label}`}
                  onClick={() => {
                    setShowList(false);
                    onChange(item);
                  }}
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
