import React, { Component } from 'react';
import './fishs.scss';

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectValues: [],
    };
  }

  // select控件选项发生改变的时候触发
  selectChange = (event) => {
    const { options } = event.currentTarget;
    console.log('options', options);
    const selectValues = options
      .filter((item) => item.selected)
      .map((item) => item.value);
    this.setState({
      selectValues,
    });
    console.log('selectValues', selectValues);
  };

  render() {
    const { selectValues } = this.state;
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <label>
            喜欢的城市:
            <select
              multiple={true}
              value={selectValues}
              onChange={this.selectChange}
            >
              <option value="beijing">北京</option>
              <option value="shanghai">上海</option>
              <option value="shengzun">深圳</option>
              <option value="guanzhou">广州</option>
            </select>
          </label>
        </div>
      </div>
    );
  }
}

export default Fishs;
