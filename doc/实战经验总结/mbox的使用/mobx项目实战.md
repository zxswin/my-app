## mobx 的安装

```ts
// 必须使用以下版本,使用高版本使用方法和属性装饰器的时候会有问题(不生效)
// yarn add mobx@5.15.7
// yarn add mobx-react@6.3.1
```

## 简单使用案例

- store.js

```js
import { observable, action } from 'mobx';

class FishsData {
  // 使用单例模式创建store
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
  @action setFishDate = (fishData) => {
    Object.assign(this.fishData, fishData);
  };
}

export default FishsData;
```

- index.jsx

```tsx
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Store from './store/fishs';

// 使用observer单mobx数据发生变更的时候会触发组件重新渲染
@observer
class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.store = Store.getInstance();
    this.fishData = this.store.fishData;
  }

  componentDidMount() {}

  // 改变mobx数据
  changeFishData = () => {
    this.store.setFishDate({ id: 1100011119999 });
  };

  render() {
    const fishData = this.fishData;
    return (
      <div className="Fishs">
        <p>{fishData.id}</p>
        <button type="button" onClick={this.changeFishData}>
          改变fishid
        </button>
      </div>
    );
  }
}

export default Fishs;
```
