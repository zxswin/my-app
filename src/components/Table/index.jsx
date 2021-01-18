import _ from 'lodash';
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import classnames from 'classnames';
import CheckBox from '../CheckBox';
import Pagination from '../Pagination';
import './style.scss';

/**
 * 本地分页根据当前页码和每页需要展示条码返回指定的数据
 * @param {number} currentPage 当前页码
 * @param {number} currPageSize 当前每一页需要展示的数量
 * @param {array} data 表格数据
 * @returns {array} 返回的需要展示的表格数据
 */
const getTableShowData = (currentPage, currPageSize, data, localPaging) => {
  let currentTableData = _.cloneDeep(data);
  if (localPaging) {
    const start = (currentPage - 1) * currPageSize;
    const end = currentPage * currPageSize;
    currentTableData = currentTableData.slice(start, end);
  }

  return currentTableData;
};

/* 表格组件 */
const Table = props => {
  const {
    data = [], // 表格数据
    config = {}, // 表格配置项
    pageSizeOptions = [10, 30, 50, 100], // 表格自定义pageSize列表
    className = '', // 自定义类名
    pageSizeChange = () => {}, // 改变pageSize触发的事件
    currentPageChange = () => {}, // 改变当前激活的页面
    dataTotal, // 数据总条目 如果是服务器端分页则需要传入
    noTdborder = false, // 取消td和th的边框
  } = props;
  const { columns = [], localPaging = false, showPagination = true } = config;

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

  // =========== 页面切换相关逻辑 ===========
  // 当前激活的页码
  const [currentPage, setCurrentPage] = useState(1);
  const [currPageSize, setCurrPageSize] = useState(pageSizeOptions[0]);
  // 切换当前激活页码的事件
  const onChangeCurrentPage = num => {
    setCurrentPage(num);
    currentPageChange && currentPageChange(num);
  };

  // 切换当前每页展示多少条数据
  const onChangePageSize = pageSize => {
    setCurrPageSize(pageSize);
    setCurrentPage(1);
    pageSizeChange && pageSizeChange(pageSize);
  };

  // =========== 本地分页相关逻辑 ===========

  // 本地分页的pageSize列表
  const total = dataTotal ? dataTotal : copyData.length; // 当前的数据总数
  const currentTableData = useMemo(() => getTableShowData(currentPage, currPageSize, copyData, localPaging), [
    currentPage,
    currPageSize,
    copyData,
    localPaging,
  ]);

  // 设置表格数据相关
  const [tableData, setTableData] = useState(currentTableData);

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

  // 对columns配置中添加记录排序状态的字段进行初始化
  const columnsInitConfigs = useCallback(() => {
    const columnsCofigs = columns.map(item => {
      item.sortStatus = null;
      return item;
    });
    return columnsCofigs;
  }, [columns]);

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
  const [columnsData, setColumnsData] = useState(columnsInitConfigs());
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
        sortData = _.cloneDeep(currentTableData);
        setStatusToTableData(sortData, tableData);
      }
      setTableData(sortData);
    },
    [columnsData, tableData, currentTableData]
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

  /** 表格初始化及固定表格相关逻辑  */
  const tableDataInit = useCallback(() => {
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
            mainTable.style.height = fixConfigHeaderStyle.height;
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
  }, [config, fixConfigRightStyle.width, fixConfigLeftStyle.width, fixConfigHeaderStyle.height]);

  // 生命周期函数
  useEffect(() => {
    // 初始化config数据
    console.log('config数据初始化');
    config.getAllSelections = []; // 获取全选的数据
    config.isAllCheck = false; // 是否处于全选状态
    setTableData(currentTableData); // 表格展示数据初始化

    setCheckedAll(false); // 设置全选按钮状态
    setColumnsData(columnsInitConfigs());
    setTimeout(() => {
      tableDataInit(); // 表格相关尺寸初始化
    });
  }, [config, currentTableData, tableDataInit, columnsInitConfigs]);

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
            {/* 表头头部的th标题 */}
            <span>{column.customTitle ? column.customTitle(column) : column.title}</span>
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
    let style = column.width ? { width: column.width } : null;
    return (
      <td>
        {column.checkbox ? (
          <CheckBox id={`${row.index}`} checked={row.checked} onChange={checked => checkedChangeHandle(checked, row)} />
        ) : (
          <div style={style} className={`UI-Table__table--cell--txt`}>
            {column.formatter ? (
              column.formatter(row, index, row[column.field])
            ) : (
              <span title={row[column.field]}>{row[column.field]}</span>
            )}
          </div>
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
      <table className={classnames('UI-Table__table', { 'UI-Table__table--no-td-border': noTdborder })} style={style}>
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
    <React.Fragment>
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

        {/* 如果表格数据为空 */}
        {tableData.length === 0 && (
          <div className="UI-Table__empty">
            <div className="UI-Table__empty--icon"></div>
            <div className="UI-Table__empty--txt">暂无数据</div>
          </div>
        )}
      </div>
      {/* 展示分页器 */}
      {!!tableData.length && showPagination && (
        <div className="UI-Table__Pagination">
          <Pagination
            total={total}
            pageSizeOptions={pageSizeOptions}
            currentPage={currentPage}
            currPageSize={currPageSize}
            onChangeCurrentPage={onChangeCurrentPage}
            onChangePageSize={onChangePageSize}
          />
        </div>
      )}
    </React.Fragment>
  );
};

export default Table;
