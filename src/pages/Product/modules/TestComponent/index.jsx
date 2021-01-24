import React, { Component } from 'react';
import { observer } from 'mobx-react';

import ReactEcharts from 'echarts-for-react';

@observer
class TestComponent extends Component {
  // option中每个属性就表示一类组件
  // 属性值可以是一个数组表示多种类型的组件 回渲染多个组件实例
  option = {
    backgroundColor: '#2c343c',
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1],
      },
    },
    series: [
      {
        name: '访问来源',
        type: 'pie',
        radius: '55%',
        data: [
          { value: 235, name: '视频广告' },
          { value: 274, name: '联盟广告' },
          { value: 310, name: '邮件营销' },
          { value: 335, name: '直接访问' },
          { value: 400, name: '搜索引擎' },
        ],
        roseType: 'angle',
        label: {
          normal: {
            textStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
        },
        labelLine: {
          normal: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)',
            },
          },
        },
        itemStyle: {
          normal: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };

  // 图表的ref对象
  echarts_react = null;

  componentDidMount() {
    const echarts_instance = this.echarts_react.getEchartsInstance();

    const base64 = echarts_instance.getDataURL();

    console.log('base64', base64);
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
          style={{ height: '300px', width: '100%' }}
          onEvents={this.onEvents}
          theme="infographic"
          className="echart-classname"
          notMerge={true}
          lazyUpdate={true}
          option={this.option}
          opts={{ renderer: 'svg' }}
          ref={e => {
            this.echarts_react = e;
          }}
          onChartReady={this.onChartReady}
          loadingOption={this.loadingOption}
          showLoading={false} // 是否展示加载遮罩
        />
      </div>
    );
  }
}

export default TestComponent;
