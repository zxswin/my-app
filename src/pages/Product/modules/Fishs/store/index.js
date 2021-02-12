import { observable } from 'mobx';
import _ from 'lodash';
import { action, runInAction } from 'mobx';
import Modal from 'components/Modal';
import OperationPanel from '../components/OperationPanel';
import Api from 'Api';

// 默认数据
export const defaultPanelData = {
  /** 产品名称  */
  name: '',
  /** 产品排列顺序  */
  order: 0,
  /** 产品价格  */
  price: 0,
  /** 产品库存  */
  stock: 0,
  /** 产品销量  */
  sales_volume: 0,
  /** 产品图标  */
  icon_url: '',
  /** 产品类型  */
  type: 'fish',
  /** 产品状态  */
  status: 0,
  /** 产品描述  */
  describe: '',
  /** 产品标准规格  */
  standard: '',
  /** 幻灯片图片集  */
  slide_imgs: '[]',
  /** 产品内容  */
  content: '[]',
  /** 产品视频  */
  video_url: '',
};

class FishsData {
  static instance;
  static getInstance = () => {
    if (!FishsData.instance) {
      FishsData.instance = new FishsData();
    }

    return FishsData.instance;
  };

  // 当前查询到的表格数据
  @observable tableData = [];

  // 当前查询数据的总页数
  @observable total = 0;

  // 当前的查询数据
  @observable queryData = {};

  // 当前操作的数据
  @observable currentData = _.cloneDeep(defaultPanelData);

  /**
   * 点击查询按钮就行查询
   * @param {object} queryData 查询参数
   */
  onQueryClick = async queryData => {
    const queryParams = {
      // type: 'fish',
      pageStart: 1,
      pageSize: 10,
    };

    Object.keys(queryData).forEach(key => {
      if (queryData[key]) {
        queryParams[key] = queryData[key];
      }
    });

    console.log('获取到的查询参数1', queryData, queryParams);

    const tableDataRes = await Api.getProduct(queryParams);
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
    Modal.showModal({
      title: '产品修改',
      children: <OperationPanel panelData={this.currentData} type="modify" />,
      onConfirm: async () => {
        const modifyRes = await Api.modifyProduct(this.currentData);
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
          this.onQueryClick(this.queryData);
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

  // 点击了明细按钮
  detailClick = action((row, index, value) => {
    this.currentData = row;
    Modal.showModal({
      title: '产品明细',
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
      title: '删除产品',
      children: <div>你确定要删除{row.name}产品吗？</div>,
      onConfirm: async () => {
        const deleteRes = await Api.deleteProduct(this.currentData);
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
          this.onQueryClick(this.queryData);
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
  });

  // 点击了新增按钮
  addClick = action(() => {
    this.currentData = _.cloneDeep(defaultPanelData);
    Modal.showModal({
      title: '产品新增',
      children: <OperationPanel panelData={this.currentData} type="add" />,
      onConfirm: async () => {
        const addRes = await Api.addProduct(this.currentData);
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
          this.onQueryClick(this.queryData);
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
  });
}

export default FishsData;
