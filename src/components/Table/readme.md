## 表格组件的使用

- 数据及配置

```ts
const data = [
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
      width: '1800px',
    },
  },

  // 是否进行本地分页 默认为false 进行服务器端分页
  localPaging: true,
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
};
```

## 使用案例

- 配置及数据

```ts
const data = [
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

const tableConfig = {
  // 固定表格头部
  // fixedHeader: {
  //   height: '400px',
  // },
  // 固定表格的右侧
  fixedRight: {
    fixedLen: 1,
    style: {
      width: '1800px',
    },
  },

  // 固定表格的左侧
  fixedLeft: {
    fixedLen: 1,
    style: {
      width: '1800px',
    },
  },

  // 是否展示分页器 是否展示分页器默认为true
  showPagination: true,

  // 是否进行本地分页 默认为false 进行服务端分页
  // localPaging: true,

  // 是否取消td和th的边框
  noTdborder:true;

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
};
```

- 引入 table 组件

```tsx
// 表格组件参数说明
const tableConfig = {
  data = [], // 表格数据
  config = {}, // 表格配置项
  pageSizeOptions = [10, 30, 50, 100], // 表格自定义pageSize列表
  className = '', // 自定义类名
  pageSizeChange = () => {}, // 改变pageSize触发的事件
  currentPageChange = () => {}, // 改变当前激活的页面
  dataTotal, // 数据总条目 如果是服务器端分页则需要传入
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

<Table
  data={tableData}
  dataTotal={100} // 服务器端分页的时候需要传入
  config={tableConfig}
  pageSizeOptions={[10, 20, 30, 50]}
  currentPageChange={this.currentPageChange} // 本地分页的时候可以不用传
  pageSizeChange={this.pageSizeChange} // 本地分页的时候可以不用传
/>;
```
