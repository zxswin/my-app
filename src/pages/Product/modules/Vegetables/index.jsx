import React, { Component } from 'react';
import _ from 'lodash';
import Select from '../../../../components/Select';
import MultipleSelect from '../../../../components/MultipleSelect';
import Input from '../../../../components/Input';
import CheckBox from '../../../../components/CheckBox';
import Switch from '../../../../components/Switch';
import Button from '../../../../components/Button';
import QueryPanel from '../../../../components/QueryPanel';
import Table from '../../../../components/Table';
import Modal from '../../../../components/Modal';
import DTPicker from '../../../../components/DTPicker';
import './style.scss';

import { Formik, Form, Field, ErrorMessage } from 'formik';

import Validator from 'validatorjs';

let validator = new Validator(
  {
    name: '小小',
    email: '123@123com',
  },
  {
    name: 'size:3',
    email: 'required|email',
  }
);

// 自定义属性名
validator.setAttributeNames({ name: '姓名', email: '邮箱' });

// 校验失败
validator.fails(() => {
  console.log('校验失败!', validator.errors.all());
});

// 校验成功
validator.passes(() => {
  console.log('校验成功!');
});

// 错误提示信息
const first = validator.errors.first(); // 获取第一条错误信息 如果没有信息则返回false
const get = validator.errors.get('email'); // 获取所有校验失败信息的数组

let inputProps = {
  placeholder: 'N/A',
  disabled: true,
  onMouseLeave: () => alert('You went to the input but it was disabled'),
};

var valid = function (current) {
  return current.day() !== 0 && current.day() !== 6;
};

const data = [
  { name: '小明1小明1小明1小明1小明1小明1小明1', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明2', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明3', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明4', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明5', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明6', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明7', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明8', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明9', age: 10, class: '一班', sore: '99分', operation: '1' },
  { name: '小明10', age: 10, class: '一班', sore: '99分', operation: '1' },
];

const modifyClick = (row, index, value) => {
  console.log('点击了修改按钮', row, index, value);
};

const deleteClick = (row, index, value) => {
  console.log('点击了删除按钮', row, index, value);
};

const tableConfig = {
  // 固定表格头部
  // fixedHeader: {
  //   height: '400px',
  // },
  // 固定表格的右侧
  // fixedRight: {
  //   fixedLen: 1,
  //   style: {
  //     width: '1800px',
  //   },
  // },

  // 固定表格的左侧
  // fixedLeft: {
  //   fixedLen: 1,
  //   style: {
  //     width: '1800px',
  //   },
  // },

  // 是否展示分页器 是否展示分页器默认为true
  showPagination: true,

  // 是否进行本地分页 默认为false 进行服务端分页
  // localPaging: true,

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
      width: '200px',
      // 自定义标题
      customTitle: column => {
        return (
          <div>
            <span>{column.title}188</span>
          </div>
        );
      },
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
      width: '200px',
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
      tableData: data,
      modalShow: false,
    };

    // console.log('校验失败!', validator.errors.all());
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

  // 表格组件
  // 改变pageSize触发的事件
  pageSizeChange = pageSize => {
    console.log('改变pageSize触发的事件', pageSize);
    const tableData = [];
    for (let i = 1; i <= pageSize; i++) {
      tableData.push({
        name: `小明${i}`,
        age: 10,
        class: '一班',
        sore: '99分',
        operation: '1',
      });
    }

    this.setState({
      tableData: tableData,
    });
  };

  // 改变当前激活的页面
  currentPageChange = num => {
    console.log('改变当前激活的页面', num);
    const tableData = [];
    for (let i = 1; i <= this.state.tableData.length; i++) {
      tableData.push({
        name: `小明${num}`,
        age: 10,
        class: '一班',
        sore: '99分',
        operation: '1',
      });
    }

    this.setState({
      tableData: tableData,
    });
  };

  // 点击展示弹出框1
  showModal = () => {
    const props = {
      type: 'success',

      onConfirm: flag => {
        console.log('点击了确认按钮1', flag);
        return true;
        // Modal.showModal({
        //   title: '标题66', // 标题
        //   children: <div className="vm-box">666</div>, // 弹框内容
        // });
      },
    };
    Modal.showModal(props);
  };
  showModal2 = () => {
    Modal.showModal();
  };

  render() {
    const { selectList, radioChecked, inputValue, tableData, modalShow } = this.state;
    return (
      <React.Fragment>
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
            <div className="btn-box">
              <Button
                text="选中数据"
                onClick={() => {
                  console.log('点击了选中数据', tableConfig.getAllSelections, tableConfig.isAllCheck);
                }}
              />
              <Button text="弹出框1" onClick={this.showModal} />
              <Button text="弹出框2" onClick={this.showModal2} />
            </div>
            <div className="time-box">
              <DTPicker />
            </div>
            {/* <Table
              data={tableData}
              dataTotal={100}
              config={tableConfig}
              pageSizeOptions={[10, 20, 30, 50]}
              currentPageChange={this.currentPageChange}
              pageSizeChange={this.pageSizeChange}
            /> */}
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

        <Formik
          // 这里定义了控件的初始值
          initialValues={{ email: '', password: '', age: 0 }}
          // 在这里做表单控件值的校验
          validate={values => {
            const errors = {};
            if (!values.email) errors.email = '邮箱必填';

            if (!values.password) errors.email = '密码必填';
            return errors;
          }}
          // 这里是表单提交后的逻辑
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              console.log('提交的values', values);
              // 设置是否处于提交中的状态
              setSubmitting(false);
            }, 2000);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Field type="number" name="age"></Field>
              <Field type="email" name="email"></Field>
              <ErrorMessage name="email" component="div" />
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" />
              <button style={{ background: 'red' }} type="submit" disabled={isSubmitting}>
                提交
              </button>
            </Form>
          )}
        </Formik>
      </React.Fragment>
    );
  }
}

export default Vegetables;
