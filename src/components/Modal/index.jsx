import React, { useState, useCallback } from 'react';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import Button from '../Button';

import './style.scss';

const Modal = props => {
  const {
    title = '标题', // 标题
    children = null, // 弹框内容
    onClose, // 点击关闭按钮时候触发
    onCancel, // 点击取消按钮时候触发
    onConfirm, /// 点击确认按钮时候触发
    confirmText = '确认', // 确认按钮文案
    cancelText = '取消', // 取消按钮文案
    type = 'confirm', // modal弹出框类型 confirm info success warning error
    tipConfirmText = '知道了', // 确认框提示按钮文案
    modifyText = '修改',
    onModify, // 点击修改按钮的时候触发
    showModify = false, // 显示修改按钮
  } = props;

  // 内部控制弹出框是否展示
  const [toShow, setToShow] = useState(true);

  // 点击关闭按钮
  const clickCloseHandle = useCallback(() => {
    if (!onClose) {
      removeModal();
    } else {
      const flag = onClose();
      // 如果返回的是一个promise
      if (typeof flag === 'object') {
        flag.then(v => {
          if (v) removeModal();
        });
        return;
      }

      // 如果返回的是true 或 false
      if (flag) {
        removeModal();
      }
    }
  }, [onClose]);

  // 点击取消按钮
  const clickCancelHandle = useCallback(() => {
    if (!onCancel) {
      removeModal();
    } else {
      const flag = onCancel();
      // 如果返回的是一个promise
      if (typeof flag === 'object') {
        flag.then(v => {
          if (v) removeModal();
        });
        return;
      }

      // 如果返回的是true 或 false
      if (flag) {
        removeModal();
      }
    }
  }, [onCancel]);

  // 点击确认按钮
  const clickConfirmHandle = useCallback(() => {
    if (!onConfirm) {
      removeModal();
    } else {
      console.log('点击了确认按钮');
      const flag = onConfirm();

      // 如果返回的是一个promise
      if (typeof flag === 'object') {
        flag.then(v => {
          if (v) removeModal();
        });
        return;
      }

      // 如果返回的是true 或 false
      if (flag) {
        removeModal();
      }
    }
  }, [onConfirm]);

  // 点击修改按钮
  const clickModifyHandle = useCallback(() => {
    onModify && onModify();
  }, [onModify]);

  // 关闭弹出窗口
  function removeModal() {
    setToShow(false);
    Modal.removeModal();
  }

  return (
    <React.Fragment>
      {toShow && (
        <div className={classnames('UI-Modal', { 'UI-Modal__tip': type !== 'confirm' })}>
          <div className="UI-Modal__contain">
            {/* 确认框 */}
            {type === 'confirm' && (
              <React.Fragment>
                <div className="UI-Modal__contain--header">
                  <h3 className="UI-Modal__contain--header-title">{title}</h3>
                  <span onClick={clickCloseHandle} className="UI-Modal__contain--header-close"></span>
                </div>
                <div className="UI-Modal__contain--body">{children}</div>
                <div className="UI-Modal__contain--footer">
                  <Button onClick={clickCancelHandle} theme="white" text={cancelText} />
                  {!showModify && <Button onClick={clickConfirmHandle} text={confirmText} />}
                  {showModify && <Button onClick={clickModifyHandle} text={modifyText} />}
                </div>
              </React.Fragment>
            )}

            {/* 信息提示框 */}
            {type !== 'confirm' && (
              <React.Fragment>
                <div className="UI-Modal__contain--body UI-Modal__contain--body-tip">
                  <div
                    className={classnames('UI-Modal__contain--body--icon', {
                      info: type === 'info',
                      success: type === 'success',
                      warning: type === 'warning',
                      error: type === 'error',
                    })}
                  ></div>
                  <div className="UI-Modal__contain--body--info">{children}</div>
                </div>
                <div className="UI-Modal__contain--footer UI-Modal__contain--footer--info">
                  <Button onClick={clickConfirmHandle} text={tipConfirmText} />
                </div>
              </React.Fragment>
            )}
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

let index = 0;

/** 展示模态弹出框  */
Modal.showModal = props => {
  const div = document.createElement('div');
  div.id = `Modal-wrap-contain${index}`;
  document.body.appendChild(div);
  ReactDOM.render(React.createElement(Modal, props), div);
  index++;
};

/** 移除模态弹出框  */
Modal.removeModal = () => {
  const div = document.getElementById(`Modal-wrap-contain${index - 1}`);
  ReactDOM.unmountComponentAtNode(div);
  document.body.removeChild(div);
  index--;
};

export default Modal;
