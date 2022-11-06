## raect 全局弹出框组件

- React.createElement

```ts
/**
 * React.createElement()： 根据指定的第一个参数创建一个React元素
 * 方法接受三个参数，第一个参数是组件类型，第二个参数是要传递给组件的属性，第三个参数是children。
 * 方法最终会返回一个具有以下属性的对象
 * 最后我们看到React通过createElement方法将组件或者元素转成ReactElement，并最终通过一系列操作渲染到页面成为HTMLElement。
 */
```

- ReactDOM.render

```ts
/**
 * 在提供的 container 里渲染一个 React 元素，并返回对该组件的引用（或者针对无状态组件返回 null）。
 * ReactDOM.render() 不会修改容器节点（只会修改容器的子节点）。
 * 可以在不覆盖现有子节点的情况下，将组件插入已有的 DOM 节点中。
 */
```

- ReactDOM.createPortal(child, container)

```tsx
/**
 * ReactDOM.createPortal(child, container)
 * 将提供一种将子节点渲染到 DOM 节点中的方式，该节点存在于 DOM 组件的层次结构之外。
 * 使用Portal使组件的挂载脱离父组件。例如：对话框，tooltip
 * 组件的挂载点虽然可以脱离父组件，但组件的事件通过冒泡机制仍可以传给父组件
 * 只要挂载的DOM存在于父组件中就可以了
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class List extends Component<any> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        onClick={() => {
          console.log('list被点击了');
        }}
      >
        {ReactDOM.createPortal(
          <span
            onClick={() => {
              console.log('Portal被点击了');
            }}
          >
            11122
          </span>,
          document.querySelector('#app')
        )}
      </div>
    );
  }
}

export default List;
```

- unmountComponentAtNode()

```ts
/**
 * 从 DOM 中卸载组件，会将其事件处理器（event handlers）和 state 一并清除。
 * 如果指定容器上没有对应已挂载的组件，这个函数什么也不会做。如果组件被移除将会返回 true，如果没有组件可被移除将会返回 false。
 */

let div;
div = document.createElement('div');
document.body.appendChild(div);

// 挂载
let Box = ReactDOM.render(React.createElement(Alert, props), div);

// 卸载
ReactDOM.unmountComponentAtNode(div);
document.body.removeChild(div);
```

- 全局弹出层组件基本思路

```ts
import React from 'react';
import ReactDOM from 'react-dom';

class Alert extends React.Component {
  show = () => {
    console.log('点击弹出组件');
  };
  render() {
    return (
      <div className="alert-box">
        <p>alert 组件</p>
      </div>
    );
  }
}

let div = document.createElement('div');
let props = {};

document.body.appendChild(div);
// 如果这么写Box将会返回null
// let Box = ReactDOM.render(Alert, div);
// 这么写会返回Alert组件的实例
let Box = ReactDOM.render(React.createElement(Alert, props), div);
console.log('alert组件加载了……');
export default Box;
```

## 经典用例-模态弹出框

- 模态弹出框组件代码

```js
import React, { useState, useCallback } from 'react';
import classnames from 'classnames';
import ReactDOM from 'react-dom';
import Button from '../Button';

import './style.scss';

const Modal = (props) => {
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
        flag.then((v) => {
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
        flag.then((v) => {
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
        flag.then((v) => {
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
        <div
          className={classnames('UI-Modal', {
            'UI-Modal__tip': type !== 'confirm',
          })}
        >
          <div className="UI-Modal__contain">
            {/* 确认框 */}
            {type === 'confirm' && (
              <React.Fragment>
                <div className="UI-Modal__contain--header">
                  <h3 className="UI-Modal__contain--header-title">{title}</h3>
                  <span
                    onClick={clickCloseHandle}
                    className="UI-Modal__contain--header-close"
                  ></span>
                </div>
                <div className="UI-Modal__contain--body">{children}</div>
                <div className="UI-Modal__contain--footer">
                  <Button
                    onClick={clickCancelHandle}
                    theme="white"
                    text={cancelText}
                  />
                  {!showModify && (
                    <Button onClick={clickConfirmHandle} text={confirmText} />
                  )}
                  {showModify && (
                    <Button onClick={clickModifyHandle} text={modifyText} />
                  )}
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
                  <div className="UI-Modal__contain--body--info">
                    {children}
                  </div>
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
Modal.showModal = (props) => {
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
```

- 模态弹出框组件代码的使用

```js
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import { observable, action, runInAction } from 'mobx';
import Modal from 'components/Modal';
import OperationPanel from '../components/OperationPanel';
import Api from 'Api';
import { checkEmptyField } from 'Utils/validator';

// 默认数据
export const defaultPanelData = {
  /** 代理用户id  */
  id: 0,
  /** 代理用户状态  */
  status: 0,
  /** 代理用户类型  */
  type: 0,
  /** 代理用户名称  */
  username: '',
  /** 代理用户下单总金额  */
  total_balance: 0,
  /** 二维码url  */
  qr_code_url: '',
  /** 收货地址  */
  address: '',
  /** 手机号码  */
  phone_num: '',
  /** 代理商城的相关自定义配置  */
  agent_config: '',
  /** 自定义商城名称  */
  shop_name: '',
  /** 用户设置的价格比例  */
  add_price_ratio: 0,
  /** 用户唯一标识码  */
  unique_code: '',
};

class StoreData {
  static instance;
  static getInstance = () => {
    if (!StoreData.instance) {
      StoreData.instance = new StoreData();
    }

    return StoreData.instance;
  };

  // 当前查询到的表格数据
  @observable tableData = [];

  // 当前查询数据的总页数
  @observable total = 0;

  // 当前的查询数据
  @observable queryData = {};

  // 当前操作的数据
  @observable currentData = _.cloneDeep(defaultPanelData);

  // 操作前的原始数据
  @observable currentSourceData = null;

  /**
   * 点击查询按钮就行查询
   * @param {object} queryData 查询参数
   * @param {boolean} reStart 是否重新从第一页开始查询
   */
  onQueryClick = async (queryData, reStart) => {
    const queryParams = {
      pageStart: 1,
      pageSize: 10,
      agent_allow_flag: '',
    };

    Object.keys(queryData).forEach((key) => {
      if (queryData[key]) {
        if (typeof queryData[key] !== 'object') {
          queryParams[key] = queryData[key];
        } else {
          if (queryData[key].value !== '') {
            queryParams[key] = queryData[key].value;
          }
        }
      }
    });

    if (reStart) {
      queryData.pageStart = 1;
    }

    const tableDataRes = await Api.getAgent(queryParams);
    const data = tableDataRes.data.rows;
    const dataTotal = tableDataRes.data.count;
    console.log('查询结果', tableDataRes);

    if (Array.isArray(data)) {
      runInAction(() => {
        this.queryData = queryParams;
        this.tableData = data;
        this.total = dataTotal;
      });
    }
  };

  // 点击了修改按钮
  modifyClick = action((row, index, value) => {
    this.currentData = row;
    this.currentSourceData = _.cloneDeep(row);
    Modal.showModal({
      title: '代理用户修改',
      children: <OperationPanel panelData={this.currentData} type="modify" />,
      onConfirm: async () => {
        // 检测是否存在数据的修改
        const isModifyChecked =
          JSON.stringify(this.currentData) !==
          JSON.stringify(this.currentSourceData);

        if (!isModifyChecked) {
          Modal.showModal({
            type: 'info',
            children: <div>当前未修改任何内容</div>,
          });

          return;
        }

        // 非空字段校验
        const checkFieldInfo = { username: '代理用户名称' };
        const errMsg = checkEmptyField(this.currentData, checkFieldInfo);
        if (errMsg) {
          Modal.showModal({
            type: 'info',
            children: <div>{errMsg}</div>,
          });
          return;
        }

        const modifyRes = await Api.modifyAgent(this.currentData);
        const { errmsg, name } = modifyRes.data;
        console.log(modifyRes);
        // 修改成功
        if (!errmsg) {
          setTimeout(() => {
            Modal.showModal({
              type: 'success',
              children: (
                <div>
                  {' '}
                  {<span className="common-danger">{name}</span>} 修改成功
                </div>
              ),
            });
          }, 300);

          // 重新刷新列表
          this.onQueryClick(this.queryData);
          return true;
        }

        // 修改失败
        setTimeout(() => {
          Modal.showModal({
            type: 'error',
            children: (
              <div>
                {<span className="common-danger">{name}</span>} 修改失败{errmsg}
              </div>
            ),
          });
        }, 300);
        return false;
      },
    });
  });

  // 点击了明细按钮
  detailClick = action((row, index, value) => {
    this.currentData = row;
    this.currentSourceData = _.cloneDeep(row);
    Modal.showModal({
      title: '代理用户明细',
      children: <OperationPanel panelData={this.currentData} type="detail" />,
      showModify: true,
      onModify: () => {
        Modal.removeModal();
        this.modifyClick(row, index, value);
      },
    });
  });

  // 点击了删除按钮
  deleteClick = action((row, index, value) => {
    this.currentData = row;
    Modal.showModal({
      title: '删除代理用户',
      children: (
        <div className="common-confirm">
          <div className="common-icon info"></div>
          <div className="common-text">
            你确定要删除<span className="danger">{row.name}</span>代理用户吗？
          </div>
        </div>
      ),
      onConfirm: async () => {
        const deleteRes = await Api.deleteAgent(this.currentData);
        const { errmsg, name } = deleteRes.data;
        console.log(deleteRes);
        // 删除成功
        if (!errmsg) {
          setTimeout(() => {
            Modal.showModal({
              type: 'success',
              children: (
                <div>
                  {<span className="common-danger">{name}</span>} 删除成功
                </div>
              ),
            });
          }, 300);
          // 重新刷新列表
          this.onQueryClick(this.queryData);
          return true;
        }

        // 删除失败
        setTimeout(() => {
          Modal.showModal({
            type: 'error',
            children: (
              <div>
                {<span className="common-danger">{name}</span>} 删除失败{errmsg}
              </div>
            ),
          });
        }, 300);
        return true;
      },
    });
  });

  // 点击了新增按钮
  addClick = action(() => {
    this.currentData = _.cloneDeep(defaultPanelData);
    Modal.showModal({
      title: '代理用户新增',
      children: <OperationPanel panelData={this.currentData} type="add" />,
      onConfirm: async () => {
        this.currentData.unique_code = uuidv4().substring(0, 8);
        const addRes = await Api.addAgent(this.currentData);
        const { errmsg, name } = addRes.data;
        console.log(addRes);
        // 新增成功
        if (!errmsg) {
          setTimeout(() => {
            Modal.showModal({
              type: 'success',
              children: (
                <div>
                  {<span className="common-danger">{name}</span>} 新增成功
                </div>
              ),
            });
          }, 300);

          // 重新刷新列表
          this.onQueryClick(this.queryData);
          return true;
        }

        // 新增失败
        setTimeout(() => {
          Modal.showModal({
            type: 'error',
            children: (
              <div>
                {<span className="common-danger">{name}</span>} 新增失败{errmsg}
              </div>
            ),
          });
        }, 300);
        return false;
      },
    });
  });

  // 当前页码发生改变
  currentPageChange = action((currentPage) => {
    this.queryData.pageStart = currentPage;
    this.onQueryClick(this.queryData);
  });

  // 一次查询数量发生改变
  pageSizeChange = action((currPageSize) => {
    this.queryData.pageSize = currPageSize;
    this.queryData.pageStart = 1;
    this.onQueryClick(this.queryData);
  });
}

export default StoreData;
```
