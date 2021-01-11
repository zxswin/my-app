import _ from 'lodash';
import $ from 'jquery';
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import classnames from 'classnames';
import CheckBox from '../CheckBox';
import './style.scss';

const tableData1 = [
  { name: '小明1', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明2', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明3', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明4', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明5', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明6', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明7', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明8', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明9', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明10', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明11', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明12', age: 10, class: '一班', sore: '99分', operation: '1' },
];

const modifyClick = (row, index, value) => {
  console.log('点击了修改按钮', row, index, value);
};

const deleteClick = (row, index, value) => {
  console.log('点击了删除按钮', row, index, value);
};

/* 表格组件 */
const Table = props => {
  const defaultConfig = {
    // 获取表格数据的url
    url: '',
    cache: false, // 设置为 false 禁用 AJAX 数据缓存， 默认为true
    striped: true, //表格显示条纹，默认为false
    pagination: true, // 在表格底部显示分页组件，默认false
    pageList: [10, 20], // 设置页面可以显示的数据条数
    pageSize: 10, // 页面数据条数
    pageNumber: 1, // 首页页码
    sidePagination: 'server', // 设置为服务器端分页
    queryParams: function (params) {
      // 请求服务器数据时发送的参数，可以在这里添加额外的查询参数，返回false则终止请求
      return {
        pageSize: params.limit, // 每页要显示的数据条数
        offset: params.offset, // 每页显示数据的开始行号
        sort: params.sort, // 要排序的字段
        sortOrder: params.order, // 排序规则
        dataId: 0, // 额外添加的参数
      };
    },
    sortName: 'id', // 要排序的字段
    sortOrder: 'desc', // 排序规则
    // 加载成功的时候执行
    onLoadSuccess: () => {},
    // 加载失败的时候执行
    onLoadError: () => {},
    // 固定表格头部
    fixedHeader: {
      height: '400px',
    },
    // 固定表格的右侧
    fixedRight: {
      fixedLen: 2,
      style: {
        width: '500px',
      },
    },
    // 表头配置项
    columns: [
      {
        checkbox: true, // 显示一个勾选框
        align: 'center', // 居中显示
        field: 'name1', // 返回json数据中的name
        title: '1', // 表格表头显示文字
      },
      // {
      //   radio: true, // 显示一个单选按钮
      //   align: 'center', // 居中显示
      // },
      {
        field: 'name', // 返回json数据中的name
        title: '姓名', // 表格表头显示文字
        align: 'center', // 左右居中
        valign: 'middle', // 上下居中
        sort: true, // 是否支持排序
      },
      {
        field: 'age', // 返回json数据中的name
        title: '年龄', // 表格表头显示文字
        sort: true, // 是否支持排序
        width: '200px',
      },
      {
        field: 'class', // 返回json数据中的name
        title: '班级', // 表格表头显示文字
        sort: true, // 是否支持排序
      },
      {
        field: 'sore', // 返回json数据中的name
        title: '分数', // 表格表头显示文字
      },
      {
        field: 'operation', // 返回json数据中的name
        title: '操作', // 表格表头显示文字
        formatter: (value, row, index) => {
          return (
            <div>
              <div onClick={() => modifyClick(row, index, value)}>修改</div>
              <div onClick={() => deleteClick(row, index, value)}>删除</div>
            </div>
          );
        },
      },
    ],
    // 表格数据
    data: tableData1,
  };

  const { config = defaultConfig, className = '' } = props;
  const { columns, data } = config;

  console.log('表格组件函数重新渲染');

  // 对表格渲染数据进行处理
  // 生成表格渲染数据
  const createTableData = data => {
    console.log('触发生成表格数据');
    const tableData = _.cloneDeep(data);
    tableData.forEach((row, index) => {
      row.index = index; // row的索引
      row.checked = false; // 添加数据是否选中状态
    });
    return tableData;
  };

  const copyData = useMemo(() => createTableData(data), [data]);
  const [tableData, setTableData] = useState(copyData);

  // =========== 数据选中状态逻辑 ===========
  // 全选按钮状态
  const [checkedAll, setCheckedAll] = useState(false);
  // 全选按钮状态改变事件
  const checkedAllChangeHandle = checked => {
    setCheckedAll(checked);
    const copyData = [...tableData];
    copyData.forEach(row => {
      row.checked = checked;
    });
    setTableData(copyData);

    // 设置已经选中的数据
    if (checked) {
      config.getAllSelections = copyData;
      config.isAllCheck = true;
    } else {
      config.getAllSelections = [];
      config.isAllCheck = false;
    }
  };

  // 某行数据的checkbox触发改变事件
  const checkedChangeHandle = (checked, row) => {
    const copyData = [...tableData];
    const checkedIndex = copyData.findIndex(item => item.index === row.index);
    copyData[checkedIndex].checked = checked;
    setTableData(copyData);

    // 更新选中的数据
    const allSelections = config.getAllSelections;
    if (checked) {
      allSelections.push(row);
    } else {
      const index = allSelections.findIndex(item => item.index === row.index);
      allSelections.splice(index, 1);
    }

    // 设置全选按钮的状态
    if (allSelections.length === copyData.length) {
      setCheckedAll(true);
    } else {
      setCheckedAll(false);
    }
  };

  // 给columns配置中添加记录排序状态的字段
  const columnsConfigs = columns.map(item => {
    item.sortStatus = null;
    return item;
  });

  // =========== 排序部分逻辑 ===========
  /**
   * 还原来数据状态
   * @param {array} target 需要设置状态的表格目标数据
   * @param {array} origin 包含当前数据状态表格数据
   */
  const setStatusToTableData = (target, origin) => {
    origin.forEach(row => {
      const index = target.findIndex(item => item.index === row.index);
      target[index] = row;
    });
  };

  // 记录每个字段的排序状态
  const [columnsData, setColumnsData] = useState(columnsConfigs);
  // 点击切换字段排序状态
  const changeFieldSore = useCallback(
    column => {
      if (column.checkbox) return; // 如果是checkbox则直接return

      // 切换表头排序状态
      const columnsDataCopy = _.cloneDeep(columnsData);
      const currentIndex = columnsDataCopy.findIndex(item => item.field === column.field);
      switch (column.sortStatus) {
        case 'up':
          columnsDataCopy[currentIndex].sortStatus = 'down';
          break;
        case 'down':
          columnsDataCopy[currentIndex].sortStatus = null;
          break;
        default:
          columnsDataCopy[currentIndex].sortStatus = 'up';
          break;
      }
      setColumnsData(columnsDataCopy);

      // 对表格数据进行排序
      const sortStatus = columnsDataCopy[currentIndex].sortStatus;
      let orderType = sortStatus === 'up' ? 'asc' : 'desc';
      let sortData = [...tableData];
      if (sortStatus) {
        sortData = _.orderBy(sortData, [column.field], [orderType]);
      } else {
        sortData = _.cloneDeep(copyData);
        setStatusToTableData(sortData, tableData);
      }
      setTableData(sortData);
    },
    [columnsData, tableData, copyData]
  );

  // =========== 固定表格头部,相关固定列逻辑 ===========
  const fixConfigHeaderStyle = config.fixedHeader ? config.fixedHeader : {}; // 固定头部样式配置
  const fixConfigRightStyle = config.fixedRight ? config.fixedRight.style : {}; // 固定右侧样式配置
  const fixConfigLeftStyle = config.fixedLeft ? config.fixedLeft.style : {}; // 固定左侧样式配置
  const [showMainTable, setShowMainTable] = useState(false); // 控制表格是否显示
  const [showFixHeader, setShowFixHeader] = useState(false); // 控制表格是否显示
  const [showFixRight, setShowFixRight] = useState(false); // 控制表格是否显示
  const [showFixLeft, setShowFixLeft] = useState(false); // 控制表格是否显示
  const containRef = useRef(null); // 表格容器
  const mainTableRef = useRef(null); // 主要展示表格容器
  const fixedTopTableRef = useRef(null); // 固定头部表格容器
  const fixedRightTableRef = useRef(null); // 固定右侧表格容器
  const fixedLeftTableRef = useRef(null); // 固定左侧表格容器
  const scrollSize = 7;

  // 生命周期函数
  useEffect(() => {
    // 初始化config数据
    console.log('config数据初始化');
    config.getAllSelections = []; // 获取全选的数据
    config.isAllCheck = false; // 是否处于全选状态

    // 固定表格头部和列的相关逻辑
    // 设置表格宽度
    const tableContain = window.getComputedStyle(containRef.current);
    const tableContainWidth = tableContain.width;

    const mainTable = mainTableRef.current;
    const mainTableHeight = window.getComputedStyle(mainTable).height;
    const mainTableWrap = mainTable.querySelector('.UI-Table__wrap');
    const mainTableWrapHeight = window.getComputedStyle(mainTableWrap).height;

    const tableWrapCollect = containRef.current.querySelectorAll('.UI-Table__wrap');

    // 如果存在固定表头 固定右侧 固定左侧 的配置项目 则需要重新计算并设置相关高度及宽度
    if (config.fixedHeader || config.fixedRight || config.fixedLeft) {
      for (const tableWrap of tableWrapCollect) {
        let width = tableContainWidth;

        // 如果配置了固定左侧参数则tableWrap容器宽度为设置的宽度
        if (fixConfigLeftStyle.width) {
          width = fixConfigLeftStyle.width;
        }

        // 如果配置了固定右侧参数则tableWrap容器宽度为设置的宽度
        if (fixConfigRightStyle.width) {
          width = fixConfigRightStyle.width;
        }

        // 如果是固定顶部需重新计算容器宽度受滚动条的影响
        if (config.fixedHeader) {
          // 如果内容高度小于容器高度则从新设置容器高度
          if (mainTableHeight > mainTableWrapHeight) {
            width = parseInt(width) - 2 + 'px';
            mainTable.style.height = parseInt(mainTableWrapHeight) + 2 + 'px';
          } else {
            width = parseInt(width) - 2 - scrollSize + 'px';
          }
        }

        tableWrap.style.width = width;
      }
    }

    setShowMainTable(true);

    // 配置表格宽度信息
    // 如果是设置了固定表头
    if (config.fixedHeader || config.fixedRight || config.fixedLeft) {
      const mainTable = mainTableRef.current;
      const fixedTopTable = fixedTopTableRef.current;

      // 展示固定头部表格
      if (config.fixedHeader) {
        // 设置固定表格的高度
        const thEl = mainTable.querySelector('.UI-Table__table th');
        const height = window.getComputedStyle(thEl).height;
        fixedTopTable.style.height = parseInt(height) + 2 + 'px';

        setShowFixHeader(true);
      }

      // 展示固定左侧表格
      if (config.fixedLeft) {
        // 设置固定表格的宽度 及 高度
        setFixedTableSize('left', fixedLeftTableRef, config.fixedLeft);
      }

      // 展示固定右侧表格
      if (config.fixedRight) {
        // 设置固定表格的宽度 及 高度
        setFixedTableSize('right', fixedRightTableRef, config.fixedRight);
      }
    }
  }, [config, fixConfigRightStyle.width, fixConfigLeftStyle.width]);

  useEffect(() => {
    console.log('更新都会执行');
  });

  /**
   * 设置左侧或右侧固定表格的相关初始化尺寸
   * @param type 固定表格的类型 left | right
   * @param tableRef 表格容器的ref
   * @param config 固定表格的配置
   */
  function setFixedTableSize(type, tableRef, config) {
    const mainTable = mainTableRef.current;
    const thElCollect = mainTable.querySelectorAll('.UI-Table__table th');
    const thLen = thElCollect.length;
    const fixedTable = tableRef.current;
    const fixedLen = config.fixedLen;
    const fixedTbWrap = fixedTable.querySelector('.UI-Table__wrap');
    const fixeTable = fixedTbWrap.querySelector('.UI-Table__table');
    const fixeTableHeight = window.getComputedStyle(fixeTable).height;
    let fixedWidth = 0;

    if (type === 'left') {
      for (let i = 0; i < fixedLen; i++) {
        fixedWidth += parseInt(window.getComputedStyle(thElCollect[i]).width);
      }
    } else if (type === 'right') {
      for (let i = 1; i <= fixedLen; i++) {
        fixedWidth += parseInt(window.getComputedStyle(thElCollect[thLen - i]).width);
      }
    }

    fixedTable.style.width = fixedWidth + 2 + 'px';

    fixedTable.style.height = parseInt(window.getComputedStyle(mainTable).height) - 1 - scrollSize + 'px';

    fixedTbWrap.style.height = fixeTableHeight;

    if (type === 'left') {
      setShowFixLeft(true);
    } else if (type === 'right') {
      setShowFixRight(true);
    }
  }

  // 渲染表头单元格
  const ColumnEl = props => {
    const { column } = props;
    const widthStyle = column.width ? { width: column.width } : {};
    return (
      <th onClick={() => changeFieldSore(column)} style={widthStyle}>
        {column.checkbox ? (
          <CheckBox id="tb-checkbox-all" checked={checkedAll} onChange={checkedAllChangeHandle} />
        ) : (
          <div>
            <span>{column.title}</span>
            {/* 排序ui部分 */}
            {column.sort && (
              <span className="UI-Table__contain--sort">
                <i className={classnames('UI-Table__contain--sort--up', { 'sort-active': column.sortStatus === 'up' })}></i>
                <i className={classnames('UI-Table__contain--sort--down', { 'sort-active': column.sortStatus === 'down' })}></i>
              </span>
            )}
          </div>
        )}
      </th>
    );
  };

  // 渲染普通表格单元格
  const CellEl = props => {
    const { row, column, index } = props;
    return (
      <td>
        {column.checkbox ? (
          <CheckBox id={`${row.index}`} checked={row.checked} onChange={checked => checkedChangeHandle(checked, row)} />
        ) : (
          <div>{column.formatter ? column.formatter(row, index, row[column.field]) : <span>{row[column.field]}</span>}</div>
        )}
      </td>
    );
  };

  const TableEl = React.forwardRef((props, ref) => {
    const { type } = props;
    let style = {};

    if (type === 'fixedRight') {
      // 固定右侧表格的表格样式
      style = {
        right: 0,
        top: 0,
        position: 'absolute',
      };
    } else if (type === 'fixedLeft') {
      // 固定右侧表格的表格样式
      style = {
        left: 0,
        top: 0,
        position: 'absolute',
      };
    }
    return (
      <table className="UI-Table__table" style={style}>
        {/* 表头 */}
        <thead>
          <tr>
            {columnsData.map(column => (
              <ColumnEl key={`${column.field}${column.title}`} column={column} />
            ))}
          </tr>
        </thead>
        {/* 表主体 */}
        <tbody>
          {tableData.map((row, index) => (
            <tr key={`${index}`}>
              {columns.map(column => (
                <CellEl key={`${column.field}${column.title}`} column={column} row={row} index={index} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  });

  // 固定表头样式
  const fixedHeaderstyle = {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    overflow: 'hidden',
  };

  // 固定左侧样式
  const fixedLeftStyle = {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    overflow: 'hidden',
  };

  // 固定右侧样式
  const fixedRightstyle = {
    position: 'absolute',
    zIndex: 10,
    top: 0,
    right: 0,
    overflow: 'hidden',
  };

  // 固定表头表格样式
  const fixedTbStyle = Object.assign({}, fixedHeaderstyle, fixConfigHeaderStyle);

  // 固定左侧表格样式
  const leftTbStyle = Object.assign({}, fixedLeftStyle);

  // 固定右侧表格样式
  const rightTbStyle = Object.assign({}, fixedRightstyle);

  // 表格主体样式
  const mainTbStyle = Object.assign({}, fixConfigHeaderStyle, { overflow: 'auto' });

  return (
    <div ref={containRef} className={classnames('UI-Table', className)}>
      {/* 表格主体内容 */}
      <div
        className={classnames('UI-Table__contain', {
          'contain-hide': !showMainTable,
          'contain-show': showMainTable,
        })}
        style={mainTbStyle}
        ref={mainTableRef}
      >
        <div className="UI-Table__wrap">
          <TableEl type="main" />
        </div>
      </div>

      {/* 固定左侧的表格 */}
      {config.fixedLeft && (
        <div
          className={classnames('UI-Table__contain', {
            'contain-hide': !showFixLeft,
            'contain-show': showFixLeft,
          })}
          ref={fixedLeftTableRef}
          style={leftTbStyle}
        >
          <div className="UI-Table__wrap" style={leftTbStyle}>
            <TableEl type="fixedLeft" />
          </div>
        </div>
      )}

      {/* 固定右侧的表格 */}
      {config.fixedRight && (
        <div
          className={classnames('UI-Table__contain', {
            'contain-hide': !showFixRight,
            'contain-show': showFixRight,
          })}
          ref={fixedRightTableRef}
          style={rightTbStyle}
        >
          <div className="UI-Table__wrap" style={rightTbStyle}>
            <TableEl type="fixedRight" />
          </div>
        </div>
      )}

      {/* 固定头部的表格 */}
      {config.fixedHeader && (
        <div
          className={classnames('UI-Table__contain', {
            'contain-hide': !showFixHeader,
            'contain-show': showFixHeader,
          })}
          style={fixedTbStyle}
          ref={fixedTopTableRef}
        >
          <div className="UI-Table__wrap">
            <TableEl type="fixedTop" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
