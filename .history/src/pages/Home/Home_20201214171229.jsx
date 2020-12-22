import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../../store/action';

class HomeUi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: { sort: null, info: null },
    };
  }
  componentDidMount() {
    console.log('homeui组件从新挂载了');
  }
  addItemAction = addItem({ sort: null, info: null });
  render() {
    const { list, showOpInfo, addItemHandle } = this.props;
    return (
      <div className="Home">
        <p>当前操作的列表信息:{showOpInfo}</p>
        <label>
          序号：
          <input
            value={this.state.sort}
            onChange={(e) => {
              this.setState({
                input: { sort: e.currentTarget.value, info: this.state.info },
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
                input: {
                  sort: this.state.sort,
                  info: this.state.info,
                },
              });
            }}
          />
        </label>
        <button onClick={addItemHandle}>点击添加</button>
        <ul>
          {list.map((item) => (
            <li key={`${item.sort}${item.info}`}>{item.info}</li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  console.log('合成容器组件后外部传递给自己的属性', ownProps);
  return {
    list: state.list,
    showOpInfo: state.showOpInfo,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  console.log('合成容器组件后外部传递给自己的属性', ownProps);
  return {
    addItemHandle: () => dispatch(this.addItemAction),
  };
}

const Home = connect(mapStateToProps, mapDispatchToProps)(HomeUi);

export default Home;
