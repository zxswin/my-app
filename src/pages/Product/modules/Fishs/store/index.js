import { observable } from 'mobx';
import _ from 'lodash';
import { runInAction } from 'mobx';
import { getProduct } from '../../../../Api';

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

    const tableDataRes = await getProduct(queryParams);
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
}

export default FishsData;
