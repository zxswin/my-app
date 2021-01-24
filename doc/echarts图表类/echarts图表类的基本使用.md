## react 中使用 echarts 插件

- 安装

```bash
## 使用npm安装相关插件
npm install echarts --save
npm install --save echarts-for-react


## 使用yarn安装相关插件
yarn add echarts
yarn add echarts-for-react

## 有效版本
"echarts": "4.8.0",
"echarts-for-react": "^2.0.16",

```

- 简单案例演示

```ts
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ReactEcharts from 'echarts-for-react';

@observer
class TestComponent extends Component {
  option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      boundaryGap: [0, '30%'],
    },
    visualMap: {
      type: 'piecewise',
      show: false,
      dimension: 0,
      seriesIndex: 0,
      pieces: [
        {
          gt: 1,
          lt: 3,
          color: 'rgba(0, 180, 0, 0.5)',
        },
        {
          gt: 5,
          lt: 7,
          color: 'rgba(0, 180, 0, 0.5)',
        },
      ],
    },
    series: [
      {
        type: 'line',
        smooth: 0.6,
        symbol: 'none',
        lineStyle: {
          color: 'green',
          width: 5,
        },
        markLine: {
          symbol: ['none', 'none'],
          label: { show: false },
          data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }],
        },
        areaStyle: {},
        data: [
          ['2019-10-10', 200],
          ['2019-10-11', 400],
          ['2019-10-12', 650],
          ['2019-10-13', 500],
          ['2019-10-14', 250],
          ['2019-10-15', 300],
          ['2019-10-16', 450],
          ['2019-10-17', 300],
          ['2019-10-18', 100],
        ],
      },
    ],
  };

  componentDidMount() {}
  render() {
    return (
      <div>
        <ReactEcharts option={this.option} />
      </div>
    );
  }
}

export default TestComponent;
```

- 定制图表背景

```tsx
import echarts from 'echarts';
import ReactEcharts from 'echarts-for-react';

// 注册主题样式
echarts.registerTheme('my_theme', {
  backgroundColor: '#f4cccc',
});

// 提供的默认主题包括了
// vintage
// dark
// macarons
// infographic
// shine
// roma

// 作为属性传入
<ReactEcharts theme="my_theme" notMerge={true} lazyUpdate={true} option={this.option} />;
```

- echarts-for-react 的相关参数说明

```tsx
class ChartDeom extends Component {
  // 图表的ref对象
  echarts_react = null;

  componentDidMount() {
    // 获取图表的实例
    const echarts_instance = this.echarts_react.getEchartsInstance();
    const base64 = echarts_instance.getDataURL();
    console.log('base64', base64); // 打印出base64的图片连接
  }
  // 图表点击事件
  onChartClick = () => {
    console.log('echarts被点击了');
  };

  // 图表事件
  onEvents = {
    click: this.onChartClick,
  };

  // 图表已经加载完毕了
  onChartReady = optional => {
    console.log('图表已经加载');
    console.log('图表配置项', optional);
  };

  // 图片加载的配置数据
  loadingOption = {};

  render() {
    return (
      <div>
        <ReactEcharts
          style={{ height: '300px', width: '100%' }} // 外层容器自定义样式 默认值 {height: '300px'}
          onEvents={this.onEvents} // 添加相关事件
          theme="my_theme" // 图表主题
          className="echart-classname" // 外层容器的类名
          notMerge={true} // 是否合并数据 默认为false
          lazyUpdate={true} // 延迟更新数据 默认为false
          option={this.option} // 图表的渲染数据
          opts={{ renderer: 'svg' }} // 使用svg进行绘制 opts用于配置初始化前的配置项目
          // 获取图表的ref对象
          ref={e => {
            this.echarts_react = e;
          }}
          onChartReady={this.onChartReady} // 图表加载完毕触发事件
          loadingOption={this.loadingOption}
        />
      </div>
    );
  }
}
```

- options 配置项说明

```ts
// option中每个属性就表示一类组件
// 属性值可以是一个数组表示多种类型的组件 回渲染多个组件实例
option = {
  grid: {
    // bottom: 200,
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: [
    {
      // 图表的数据
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line', // 图表类型
    },
  ],
};
```

## 单词

```pug
manually  [ˈmænjuəli]  手动地
vintage  [ˈvɪntɪdʒ] 古老的 经典高档的
dark [dɑːk] 黑暗的，深色的
macarons 马卡龙
infographic 信息图
shine [ʃaɪn] 发出光
roma  ['rɔmə, 'rəu-]  罗马
```
