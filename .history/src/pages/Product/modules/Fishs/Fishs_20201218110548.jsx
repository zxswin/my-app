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
    const { inputValue, textareaValue } = this.state;
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <label>
            单行文本框：
            <input type="text" value={inputValue} />
          </label>
          <label>
            多行文本框：
            <input type="text" value={textareaValue} />
          </label>
        </div>
      </div>
    );
  }
}

export default Fishs;
