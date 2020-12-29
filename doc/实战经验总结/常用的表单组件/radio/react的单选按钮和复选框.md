## react 的单选按钮和复选框

- 单选按钮

```tsx
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
```

- 复选框

```tsx
import React, { Component } from 'react';
import './fishs.scss';

class Fishs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkValues: [],
    };
  }

  // 复选框按钮选项发生改变的时候触发
  checkChange = (event) => {
    const { value, checked } = event.currentTarget;
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
              checked={checkValues.indexOf('apple') !== -1}
              onChange={this.checkChange}
            />
            苹果
          </label>
          <br />
          <label>
            <input
              name="fruit"
              type="checkbox"
              value="banana"
              checked={checkValues.indexOf('banana') !== -1}
              onChange={this.checkChange}
            />
            香蕉
          </label>
          <br />
          <label>
            <input
              name="fruit"
              type="checkbox"
              value="grape"
              checked={checkValues.indexOf('grape') !== -1}
              onChange={this.checkChange}
            />
            葡萄
          </label>
        </div>
      </div>
    );
  }
}

export default Fishs;
```
