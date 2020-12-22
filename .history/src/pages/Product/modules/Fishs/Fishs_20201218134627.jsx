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
    const { radioValue } = this.state;
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <p>性别</p>
          <label>
            男
            <input
              name="gender"
              type="radio"
              value="male"
              checked={'male' === radioValue}
              onChange={this.radioChange}
            />
          </label>
          <label>
            女
            <input
              name="gender"
              type="radio"
              value="female"
              checked={'female' === radioValue}
              onChange={this.radioChange}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Fishs;
