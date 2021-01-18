import { observable, action } from 'mobx';

class FishsData {
  static instance;
  static getInstance = () => {
    if (!FishsData.instance) {
      FishsData.instance = new FishsData();
    }

    return FishsData.instance;
  };

  // 创建可观察的对象
  @observable fishData = {
    id: 1,
    name: 'fish',
  };

  // 修改可观察对象
  @action setFishDate = fishData => {
    Object.assign(this.fishData, fishData);
  };
}

export default FishsData;
