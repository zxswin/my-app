import React, { Component } from 'react';
import './fishs.scss';

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: '',
      textareaValue: '',
    };
  }

  render() {
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <label>
            单行文本框：
            <input type="text" value="" />
          </label>
        </div>
      </div>
    );
  }
}

export default Fishs;
