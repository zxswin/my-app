import { observable } from 'mobx';
import _ from 'lodash';

// 默认数据
export const defaultPanelData = {
  /** 产品id  */
  id: null,
  /** 产品名称  */
  name: null,
  /** 产品排列顺序  */
  order: null,
  /** 产品价格  */
  price: null,
  /** 产品库存  */
  stock: null,
  /** 产品销量  */
  sales_volume: null,
  /** 产品图标  */
  icon_url: null,
  /** 产品类型  */
  type: null,
  /** 产品状态  */
  status: null,
  /** 产品描述  */
  describe: null,
  /** 产品标准规格  */
  standard: null,
  /** 幻灯片图片集  */
  slide_imgs: null,
  /** 产品内容  */
  content: null,
  /** 产品视频  */
  video_url: null,
};

class FishsData {
  static instance;
  static getInstance = () => {
    if (!FishsData.instance) {
      FishsData.instance = new FishsData();
    }

    return FishsData.instance;
  };

  // 当前操作的数据
  @observable currentData = _.cloneDeep(defaultPanelData);
}

export default FishsData;
