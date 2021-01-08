import React, { Component } from 'react';
import Select from '../../../../components/Select';
import MultipleSelect from '../../../../components/MultipleSelect';
import Input from '../../../../components/Input';
import CheckBox from '../../../../components/CheckBox';
import Switch from '../../../../components/Switch';
import Button from '../../../../components/Button';
import QueryPanel from '../../../../components/QueryPanel';
import Table from '../../../../components/Table';
import './style.scss';

const tableData1 = [
  { name: '小明100', age: 10, class: '一班', sore: '99分', operation: '1' },
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

const tableConfig = {
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
    overflowY: 'auto',
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

class Vegetables extends Component {
  options = [
    { label: '选项1', value: '01' },
    { label: '选项2', value: '02' },
    { label: '选项3', value: '03' },
    { label: '选项4', value: '04' },
    { label: '选项5', value: '05' },
  ];
  constructor(props) {
    super(props);
    this.state = {
      select: { label: '', value: '' },
      selectList: [
        { label: '选项1', value: '01' },
        { label: '选项2', value: '02' },
      ],
      radioChecked: false,
      inputValue: '',
    };
  }

  // 改变选项事件
  onSelectChange = item => {
    console.log('单选选项发生了点击', item);
    this.setState({
      select: item,
    });
  };

  // 改变多选选项
  onMultipleSelectChange = options => {
    this.setState({
      selectList: options,
    });
  };

  radioChange = value => {
    console.log('点击事件', value);
    this.setState({
      radioChecked: value,
    });
  };

  onQueryClick = queryData => {
    console.log('查询到的数据', queryData);
  };

  onInputChange = value => {
    this.setState({
      inputValue: value,
    });
  };

  render() {
    const { selectList, radioChecked, inputValue } = this.state;
    return (
      <div className="Vegetables">
        <div>蔬菜类中心</div>
        {/* <Input defaultValue={inputValue} onChange={this.onInputChange} />
        <Select disabled={false} placeholder="请选择" value={this.state.select} options={this.options} onChange={this.onSelectChange} />
        <MultipleSelect disabled={false} value={selectList} options={this.options} onChange={this.onMultipleSelectChange} />
        <CheckBox checked={radioChecked} onChange={this.radioChange} />
        <Switch onChange={this.radioChange} id="radio0011" value="01" checked={radioChecked} />
        <Button text="查询" />
        <div className="Vegetables__animation">
          <QueryPanel onQueryClick={this.onQueryClick} />
        </div> */}
        <div className="Vegetables__animation">
          <div>
            <Button
              text="选中数据"
              onClick={() => {
                console.log('点击了选中数据', tableConfig.getAllSelections, tableConfig.isAllCheck);
              }}
            />
          </div>
          <Table config={tableConfig} />
        </div>
        {/* <div className="Vegetables__search-box">
          <Select disabled={true} placeholder="请选择" select={this.state.select} options={this.options} onChange={this.onSelectChange} />
          <MultipleSelect disabled={true} selectList={selectList} options={this.options} onChange={this.onMultipleSelectChange} />
          <Input value="默认文字" disabled={true} />
          <CheckBox />
          <Switch onChange={this.radioChange} id="radio001" value="01" checked={radioChecked} />
        </div>
        <Button text="查询"></Button> */}
      </div>
    );
  }
}

export default Vegetables;
