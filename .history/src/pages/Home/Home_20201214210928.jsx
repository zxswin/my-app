import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem, showOpInfo as showInfo } from '../../store/action';

class HomeUi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sort: '',
      info: '',
      currItem: {
        sort: '',
        info: '',
      },
    };
  }
  componentDidMount() {
    console.log('homeui组件从新挂载了');
  }
  render() {
    const { list, showOpInfo, addItemHandle, listClickHandle } = this.props;
    return (
      <div className="Home">
        <p>当前操作的列表信息:{showOpInfo}</p>
        <label>
          序号：
          <input
            value={this.state.sort}
            onChange={(e) => {
              this.setState({
                sort: e.currentTarget.value,
              });
            }}
          />
        </label>
        <label>
          信息：
          <input
            value={this.state.info}
            onChange={(e) => {
              this.setState({
                info: e.currentTarget.value,
              });
            }}
          />
        </label>
        <button
          onClick={() => {
            const item = {
              sort: this.state.sort,
              info: this.state.info,
            };
            addItemHandle(item);
          }}
        >
          点击添加8
        </button>
        <ul>
          {list.map((item) => (
            <li
              key={`${item.sort}${item.info}`}
              onClick={() => {
                listClickHandle(item);
              }}
            >
              {item.info}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log('mapStateToProps合成容器组件后外部传递给自己的属性', ownProps);
  return {
    list: state.list,
    showOpInfo: state.showOpInfo,
  };
}

// 定义一个异步的Action函数
const asyncAddItemFn = (item) => {
  // 返回的函数可以接受dispatch和getState函数
  return async (dispatch, getState) => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
    });
    const addItemAction = addItem(item);
    dispatch(addItemAction);
  };
};

const asyncShowOpinfo = (item) => {
  return (dispatch, getState) => {
    const showOpInfo = showInfo({ sort: item.sort, info: item.info });
    dispatch(showOpInfo);
  };
};

function mapDispatchToProps(dispatch, ownProps) {
  console.log('mapDispatchToProps合成容器组件后外部传递给自己的属性', ownProps);

  return {
    addItemHandle: (item) => dispatch(asyncAddItemFn(item)),
    listClickHandle: (item) => dispatch(asyncShowOpinfo(item)),
  };
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeUi);

export default Home;
