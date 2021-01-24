import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { action, toJS, runInAction } from 'mobx';
import QueryPanel from '../../../../components/QueryPanel';
import Table from '../../../../components/Table';
import Button from '../../../../components/Button';
import { getProduct, modifyProduct, addProduct, deleteProduct } from '../../../Api';
import Modal from '../../../../components/Modal';
import OperationPanel from './components/OperationPanel';
import Store, { defaultPanelData } from './store';
import './style.scss';

// mobx缓存数据
const store = Store.getInstance();

// 点击了明细按钮
const detailClick = action((row, index, value) => {
  console.log('点击了明细按钮', row, index, value);
  store.currentData = row;
  Modal.showModal({
    title: '产品明细',
    children: <OperationPanel panelData={store.currentData} type="detail" />,
  });
});

// 点击了修改按钮
const modifyClick = action((row, index, value) => {
  console.log('点击了修改按钮', row, index, value);
  store.currentData = row;
  Modal.showModal({
    title: '产品修改',
    children: <OperationPanel panelData={store.currentData} type="modify" />,

    onConfirm: async () => {
      console.log('toJS-store.currentData', toJS(store.currentData));
      const modifyRes = await modifyProduct(store.currentData);

      const { errmsg } = modifyRes.data;

      console.log(modifyRes);

      // 修改成功
      if (!errmsg) {
        setTimeout(() => {
          Modal.showModal({
            type: 'success',
            children: <div>修改成功</div>,
          });
        }, 300);

        // 重新刷新列表

        store.onQueryClick(store.queryData);

        return true;
      }

      // 修改失败
      setTimeout(() => {
        Modal.showModal({
          type: 'error',
          children: <div>修改失败{errmsg}</div>,
        });
      }, 300);
      return false;
    },
  });
});

// 点击了删除按钮
const deleteClick = (row, index, value) => {
  console.log('点击了修改按钮', row, index, value);
  store.currentData = row;
  Modal.showModal({
    title: '删除产品',
    children: <div>你确定要删除{row.name}产品吗？</div>,

    onConfirm: async () => {
      const deleteRes = await deleteProduct(store.currentData);

      const { errmsg } = deleteRes.data;

      console.log(deleteRes);

      // 删除成功
      if (!errmsg) {
        setTimeout(() => {
          Modal.showModal({
            type: 'success',
            children: <div>删除成功</div>,
          });
        }, 300);

        // 重新刷新列表
        store.onQueryClick(store.queryData);

        return true;
      }

      // 删除失败
      setTimeout(() => {
        Modal.showModal({
          type: 'error',
          children: <div>删除失败{errmsg}</div>,
        });
      }, 300);
      return true;
    },
  });
};

// 点击了新增按钮
const addClick = () => {
  console.log('点击了新增按钮');
  store.currentData = _.cloneDeep(defaultPanelData);
  Modal.showModal({
    title: '产品新增',
    children: <OperationPanel panelData={store.currentData} type="add" />,

    onConfirm: async () => {
      const addRes = await addProduct(store.currentData);

      const { errmsg } = addRes.data;

      console.log(addRes);

      // 新增成功
      if (!errmsg) {
        setTimeout(() => {
          Modal.showModal({
            type: 'success',
            children: <div>新增成功</div>,
          });
        }, 300);

        // 重新刷新列表

        store.onQueryClick(store.queryData);

        return true;
      }

      // 新增失败
      setTimeout(() => {
        Modal.showModal({
          type: 'error',
          children: <div>修改失败{errmsg}</div>,
        });
      }, 300);
      return false;
    },
  });
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
      width: '2800px',
    },
  },

  // 固定表格的左侧
  fixedLeft: {
    fixedLen: 2,
    style: {
      width: '2800px',
    },
  },

  // 是否展示分页器 是否展示分页器默认为true
  showPagination: true,

  // 是否进行本地分页 默认为false 进行服务端分页
  // localPaging: true,

  // 表头配置项
  columns: [
    {
      checkbox: true,
      align: 'center',
    },
    {
      field: 'id',
      title: '产品id',
      sort: true,
    },
    {
      field: 'name',
      title: '产品名称',
    },
    {
      field: 'order',
      title: '产品排列顺序',
    },
    {
      field: 'price',
      title: '产品价格',
    },
    {
      field: 'stock',
      title: '产品库存',
    },
    {
      field: 'sales_volume',
      title: '产品销量',
    },
    {
      field: 'icon_url',
      title: '产品图标',
      width: '200px',
    },
    {
      field: 'type',
      title: '产品类型',
    },
    {
      field: 'status',
      title: '产品状态',
    },
    {
      field: 'describe',
      title: '产品描述',
      width: '200px',
    },
    {
      field: 'standard',
      title: '产品标准规格',
      width: '200px',
    },
    {
      field: 'slide_imgs',
      title: '幻灯片图片集',
      width: '200px',
    },
    {
      field: 'content',
      title: '产品内容',
      width: '200px',
    },
    {
      field: 'video_url',
      title: '产品视频',
      width: '200px',
    },
    {
      field: 'created_at',
      title: '创建日期',
      width: '200px',
    },
    {
      field: 'updated_at',
      title: '更新日期',
      width: '200px',
    },
    {
      field: 'operation',
      title: '操作',
      width: '200px',
      formatter: (row, index, value) => {
        return (
          <div className="UI-Table__operation">
            <span className="icon detail" onClick={() => detailClick(row, index, value)}></span>
            <span className="icon modify" onClick={() => modifyClick(row, index, value)}></span>
            <span className="icon delete" onClick={() => deleteClick(row, index, value)}></span>
          </div>
        );
      },
    },
  ],
};

// 查询面板参数配置
const queryPanelConfig = [
  {
    type: 'input',
    label: '产品名称',
    field: 'name',
    props: {
      value: '',
      placeholder: '请输入产品名称',
      disabled: false,
    },
  },
  {
    type: 'input',
    label: '起步价格',
    field: 'startPrice',
    props: {
      value: '',
      placeholder: '请输入价格',
      disabled: false,
    },
  },
  {
    type: 'input',
    label: '最高价格',
    field: 'endPrice',
    props: {
      value: '',
      placeholder: '请输入价格',
      disabled: false,
    },
  },
  {
    type: 'input',
    label: '产品库存',
    field: 'stock',
    props: {
      value: '',
      placeholder: '请输入库存',
      disabled: false,
    },
  },
  {
    type: 'select',
    label: '产品状态',
    field: 'status',
    props: {
      placeholder: '请选择产品状态',
      type: '',
      value: { label: '', value: '' },
      options: [
        { label: '选项1', value: '01' },
        { label: '选项2', value: '02' },
        { label: '选项3', value: '03' },
      ],
    },
  },
  {
    type: 'input',
    label: '产品销量',
    field: 'sales_volume',
    props: {
      value: '',
      placeholder: '请输入库存',
      disabled: false,
    },
  },
];

const Fishs = () => {
  const currentPageChange = () => {};
  const pageSizeChange = () => {};

  useEffect(() => {
    // 组件挂载的时候回去查询数据
    store.onQueryClick(store.queryData);
  }, []);

  return (
    <div className="Product-Fishs">
      <div className="Product-Fishs__query-panel">
        <QueryPanel configList={queryPanelConfig} onQueryClick={store.onQueryClick} />
      </div>
      <div className="Product-Fishs__operation">
        <Button onClick={addClick} text="新增" />
      </div>
      <div className="Product-Fishs__query-table">
        <Table
          data={store.tableData}
          dataTotal={store.total}
          config={tableConfig}
          pageSizeOptions={[10, 20, 30, 50]}
          currentPageChange={currentPageChange}
          pageSizeChange={pageSizeChange}
        />
      </div>
    </div>
  );
};

export default observer(Fishs);
