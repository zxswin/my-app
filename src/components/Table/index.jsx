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

  // =========== 固定表格头部和相关固定列逻辑 ===========
  const initFixHeaderStyle = config.fixedHeader ? config.fixedHeader : {};
  const [fixHeaderStyle] = useState(initFixHeaderStyle);
  const [showFixHeader, setShowFixHeader] = useState(false);
  const mainTableRef = useRef(null);
  const fixedTableRef = useRef(null);

  // 生命周期函数
  useEffect(() => {
    // 初始化config数据
    console.log('config数据初始化');
    config.getAllSelections = []; // 获取全选的数据
    config.isAllCheck = false; // 是否处于全选状态

    // 配置表格宽度信息
    // 如果是设置了固定表头
    if (config.fixedHeader) {
      const mainTableThCollect = mainTableRef.current.querySelectorAll('th');
      const fixedTableThCollect = fixedTableRef.current.querySelectorAll('th');

      mainTableThCollect.forEach((el, index) => {
        const computeStyle = window.getComputedStyle(el);
        fixedTableRef.current.style.height = computeStyle.height;
        config.columns[index].width = computeStyle.width;
        config.columns[index].height = computeStyle.height;
        fixedTableThCollect[index].style.width = computeStyle.width;
        fixedTableThCollect[index].style.height = computeStyle.height;
      });
      setShowFixHeader(true);
    }
  }, [config]);

  useEffect(() => {
    console.log('更新都会执行');
  });

  // 渲染表头单元格
  const ColumnEl = props => {
    const { column } = props;
    const widthStyle = column.width ? { width: column.width, height: column.height } : {};
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
    const { style = {}, type } = props;
    const containStyle = Object.assign({}, fixHeaderStyle, style);

    let className = classnames('UI-Table__contain');

    if (type === 'fixed') {
      className = classnames('UI-Table__contain', {
        'contain-hide': !showFixHeader,
        'contain-show': showFixHeader,
      });
      containStyle.height = columnsData[0].height;
    }

    return (
      <div className={className} ref={ref} style={containStyle}>
        <table className="UI-Table__table">
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
      </div>
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

  return (
    <div className={classnames('UI-Table', className)}>
      {/* 固定头部的表格 */}
      {config.fixedHeader && <TableEl ref={fixedTableRef} type="fixed" style={fixedHeaderstyle} />}
      {/* 表格主体内容 */}
      <TableEl ref={mainTableRef} />
    </div>
  );
};

export default Table;
