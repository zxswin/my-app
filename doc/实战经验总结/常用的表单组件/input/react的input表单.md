## react 的 input 表单

- 文本框

```tsx
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

  // 单行文本改变触发事件
  inputChange = (event) => {
    const value = event.currentTarget.value;
    this.setState({
      inputValue: value,
    });
  };

  // 多行文本改变触发事件
  textareaChange = (event) => {
    const value = event.currentTarget.value;
    this.setState({
      textareaValue: value,
    });
  };

  render() {
    const { inputValue, textareaValue } = this.state;
    return (
      <div className="Fishs">
        <div>鱼类中心</div>
        <div className="fishs_content-input">
          <label>
            单行文本框：
            <input type="text" value={inputValue} onChange={this.inputChange} />
          </label>
          <label>
            多行文本框：
            <textarea value={textareaValue} onChange={this.textareaChange} />
          </label>
        </div>
      </div>
    );
  }
}

export default Fishs;
```
