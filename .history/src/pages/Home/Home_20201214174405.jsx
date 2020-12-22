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
        <button onClick={addItemHandle}>点击添加</button>
        <ul>
          {list.map((item) => (
            <li key={`${item.sort}${item.info}`} onClick={listClickHandle}>
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

function mapDispatchToProps(dispatch, ownProps) {
  console.log('mapDispatchToProps合成容器组件后外部传递给自己的属性', ownProps);
  const addItemAction = addItem({
    sort: '1',
    info: '信息1',
  });
  const showOpInfo = showInfo({ sort: '1', info: '信息1' });
  return {
    addItemHandle: () => dispatch(addItemAction),
    listClickHandle: () => dispatch(showOpInfo),
  };
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeUi);

export default Home;
