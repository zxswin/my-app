import React, { Component } from 'react';
import './fishs.scss';

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkValues: [],
    };
  }

  // 单选按钮选项发生改变的时候触发
  checkChange = (event) => {
    const { value, checked } = event.currentTarget.value;
    let checkValues = this.state.checkValues;

    if (checked && checkValues.indexOf(value) === -1) {
      checkValues.push(value);
    } else {
      checkValues = checkValues.filter((item) => item !== value);
    }

    this.setState({
      checkValues,
    });
  };

  render() {
    const { checkValues } = this.state;
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <p>喜欢的水果</p>
          <label>
            <input
              name="fruit"
              type="checkbox"
              value="apple"
              checked={}
              onChange={this.checkChange}
            />
            苹果
          </label>
          <br />
          <label>
            女
            <input
              name="gender"
              type="radio"
              value="female"
              checked={'female' === radioValue}
              onChange={this.checkChange}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Fishs;
