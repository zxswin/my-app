import React, { Component } from 'react';
import './fishs.scss';

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioValue: '',
    };
  }

  // 单选按钮选项发生改变的时候触发
  radioChange = (event) => {
    const value = event.currentTarget.value;
    this.setState({
      radioValue: value,
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
            <input
              type="radio"
              value="male"
              checked={'male' === radioValue}
              onChange={}
            />
          </label>
        </div>
      </div>
    );
  }
}

export default Fishs;
