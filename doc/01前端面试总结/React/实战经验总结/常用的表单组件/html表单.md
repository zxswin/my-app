## HTML 表单

- 表单及表单元素的获取

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <style></style>
  <body>
    <form name="form1">
      <label>姓名:<input name="name1" type="text" value="小明" /></label>
      <button type="submit">表单提交按钮</button>
      <button type="reset">表单重置按钮</button>
      <button class="btn-submit" type="button">直接调用form.submit()提交表单</button>
      <button class="btn-reset" type="button">直接调用form.reset()重置表单</button>
    </form>
    <script>
      // 获取表单也可以通过普通的获取元素的方式获取
      const form1 = document.forms.form1;
      // 可以通过表单控件的name获取某个表单元素
      console.log('获取表单中的某个表单元素', form1.elements.name1);
      // 给表单添加submit事件
      form1.addEventListener('submit', event => {
        console.log('表单提交事件submit被触发了');
        // 阻止submit的默认提交事件
        event.preventDefault();
      });
      // 给表单添加reset事件
      form1.addEventListener('reset', event => {
        console.log('表单重置事件reset被触发了');
        // 阻止submit的默认重置事件
        event.preventDefault();
      });

      const btnSubmit = document.querySelector('.btn-submit');
      const btnReset = document.querySelector('.btn-reset');

      btnSubmit.addEventListener('click', event => {
        // 通过submit()提交表单则submit事件不会被触发
        form1.submit();
      });

      btnReset.addEventListener('click', event => {
        // 通过reset()方法重置表单reset事件会被触发
        form1.reset();
      });
    </script>
  </body>
</html>
```

- 表单的公用属性及其常用事件

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <style></style>
  <body>
    <form name="form1">
      <label>姓名: <input name="name1" type="text" value="小明" tabindex="3" /></label>
      <label>年龄:<input class="age" name="age" type="number" value="10" tabindex="2" autofocus /></label>
      <label
        >性别: <input name="sex" type="radio" value="man" checked disabled />男
        <input name="sex" type="radio" value="wom" disabled />女</label
      >
      <label>地址:<input name="address" type="text" value="中国" autofocus tabindex="1" /></label>
      <button class="btn" type="button">设置焦点</button>
    </form>
    <script>
      const form1 = document.forms.form1;
      const inputName = form1.elements.name1;
      const inputAge = document.querySelector('.age');
      const btn = document.querySelector('.btn');
      console.log('获取字段所属表单', inputName.form === form1); // true
      // 给设置字段获取焦点
      btn.addEventListener('click', event => {
        inputName.focus();
        // 设置控件为禁用状态
        inputAge.disabled = true;
      });
      // 监听获取焦点事件
      inputName.addEventListener('focus', event => {
        console.log('名称控件获取焦点了');
      });
      // 监听失去焦点事件
      inputAge.addEventListener('blur', event => {
        console.log('年龄控件失去焦点了');
      });
      // 监听value改变事件
      inputName.addEventListener('change', event => {
        // 只有当失去焦点并且值发生改变的时候才会触发
        console.log('名称控件输入值发生改变', event.currentTarget.value);
      });
    </script>
  </body>
</html>
```

- 文本框编辑

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <style></style>
  <body>
    <form name="form">
      <!-- 创建一个单行文本框size指定文本框的宽度是50个字符 maxlength最多显示6个字符 -->
      <input name="text" type="text" size="50" maxlength="6" value="单行文本框" />
      <!-- 创建一个多行文本框 rows指定高度 cols指定宽度 -->
      <textarea name="mltitext" rows="10" cols="20">多行文本框</textarea>
    </form>
    <script>
      const form = document.forms.form;
      const inputText = form.elements.text;
      const inputTextArea = form.elements.mltitext;
      inputText.addEventListener('change', event => {
        console.log('单行文本框输入的值', event.currentTarget.value);
      });
      inputTextArea.addEventListener('change', event => {
        console.log('多行行文本框输入的值', event.currentTarget.value);
      });
      inputTextArea.addEventListener('focus', event => {
        // 选中文本框中的文本 会选中全部文本
        // event.currentTarget.select();
        // 设置选中部分文本
        event.currentTarget.setSelectionRange(0, 4);
      });
      // 文本框中文本的选中事件
      inputTextArea.addEventListener('select', event => {
        console.log('文本框中文本的选中事件');
        const value = event.currentTarget.value;
        const startIndex = event.currentTarget.selectionStart;
        const endIndex = event.currentTarget.selectionEnd;
        console.log('选中的文本', value.substring(startIndex, endIndex));
      });
      // 输入过滤
      inputTextArea.addEventListener('keypress', event => {
        // 不能为数字
        // 不能用Crtl键
        if (/\d/.test(String.fromCharCode(event.charCode)) && event.charCode > 9 && !event.ctrlKey) {
          event.preventDefault();
        }
      });
      // 处理剪贴板事件
      inputTextArea.addEventListener('paste', event => {
        // beforecopy 复制操作发生前触发
        // copy 复制操作发生时触发
        // beforecut 剪切操作发生前触发
        // beforepaste 粘贴操作发生前触发
        // paste 粘贴操作发生时候触发
        // 获取剪贴板中的内容

        // 好像修改不了,待定
        event.clipboardData.setData('text/plain', '修改剪贴板中的内容');
        const text = event.clipboardData.getData('text');
        console.log('获取剪贴板中的内容', text);
      });
    </script>
  </body>
</html>
```

- 一个自动切换的案例

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <style></style>
  <body>
    <form name="form">
      <input type="text" name="tel1" id="texttel1" maxlength="3" />
      <input type="text" name="tel2" id="texttel2" maxlength="3" />
      <input type="text" name="tel3" id="texttel3" maxlength="4" />
    </form>
    <script>
      function tabForward(event) {
        const target = event.target;
        const form = document.forms.form;
        const val = target.value;

        if (val.length === target.maxLength) {
          for (let i = 0, len = form.elements.length; i < len; i++) {
            if (form.elements[i] === target) {
              if (form.elements[i + 1]) {
                form.elements[i + 1].focus();
              }
              return;
            }
          }
        }
      }

      for (const inputItem of form.elements) {
        inputItem.addEventListener('keyup', tabForward);
      }
    </script>
  </body>
</html>
```

- HTML5 的约束验证

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <style></style>
  <body>
    <!-- novalidate禁止对表单进行任何验证 -->
    <form name="form">
      <!-- 必填字段 required -->
      <input type="text" name="username" value="name" required />
      <!-- 更多的输入类型 email url -->
      <input type="email" name="email" value="123@163" required />
      <input type="url" name="url" />
      <!-- 数值范围 -->
      <input type="number" min="0" max="100" step="5" name="count" />
      <button class="op-count-btn" type="button">数值的递增递减</button>
      <!-- 输入模式 限制只能在文本字段中输入数值 内容必须从头到尾严格和模式匹配 -->
      <input type="text" pattern="\d+" name="age" />
      <!-- 检测有效性 使用checkValidity() 字段有效则会返回true 否则返回false -->
      <button type="submit">提交按钮</button>
      <!-- formnovalidate 通过该按钮提交则无需验证 -->
      <button type="submit" formnovalidate>无需验证</button>
    </form>
    <script>
      const form = document.forms.form;
      // 检查浏览器中是否支持required属性
      const usernameInput = form.elements.username;
      console.log(usernameInput.required); // true;
      console.log('required' in usernameInput); // true;

      // 数值类型控件的递增递减
      const countInput = form.elements.count;
      const opCountBtn = document.querySelector('.op-count-btn');
      opCountBtn.addEventListener('click', event => {
        countInput.stepUp();
        countInput.stepDown();
        // 验证某个字段控件的有效性
        const nameCheck = usernameInput.checkValidity();
        console.log(
          '验证某个字段控件的有效性',
          nameCheck,
          usernameInput.validity // 返回具体的字段校验信息
        );
      });

      // 验证表单中字段的有效性
      form.addEventListener('submit', event => {
        const checkValidity = form.checkValidity();
        console.log('验证表单中字段的有效性', checkValidity);
      });
    </script>
  </body>
</html>
```

- 选择框校验

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Title</title>
  </head>
  <style></style>
  <body>
    <form name="form">
      <select name="location">
        <option value="sh">上海</option>
        <option value="bj">北京</option>
        <option value="gz">广州</option>
        <option value="sz">深圳</option>
      </select>
      <button class="get-val-btn" type="button">获取选项</button>
      <button class="add-item-end" type="button">在末尾动态添加选项</button>
      <button class="add-item-insert" type="button">在中间动态添加选项</button>
      <button class="remove-item" type="button">动态移除选项</button>
      <button class="move-item" type="button">移动和重排选项</button>
    </form>
    <script>
      const form = document.forms.form;
      const select = document.form.location;
      const getValBtn = document.querySelector('.get-val-btn');
      const addItemEndBtn = document.querySelector('.add-item-end');
      const addItemInsertBtn = document.querySelector('.add-item-insert');
      const removeItemBtn = document.querySelector('.remove-item');
      const moveItemBtn = document.querySelector('.move-item');
      select.addEventListener('change', event => {
        // 选择框选项发生改变
        console.log('选择框选项发生改变');
      });
      select.addEventListener('blur', event => {
        // 选择框失去焦点的时候触发
        console.log('选择框失去焦点');
      });

      // 获取某个选项的文本或值
      getValBtn.addEventListener('click', event => {
        // 获取第一项的文本和值
        const text = select.options[0].text;
        const val = select.options[0].value;
        console.dir(select);
        console.log('获取某个选项的值', text, val);
        // 获取选中项的文本和值
        const selectedIndex = select.selectedIndex;
        const selectOption = select.options[selectedIndex];
        const isSelected = selectOption.selected; // 是否被选中了
        console.log('获取当前选中项', selectOption, isSelected);
      });

      // 在末尾动态添加选项
      addItemEndBtn.addEventListener('click', event => {
        const newOption = new Option('杭州', 'hz');
        select.add(newOption, undefined);
      });

      // 在中间动态添加选项
      addItemInsertBtn.addEventListener('click', event => {
        const newOption = new Option('天津', 'tj');
        const insetOption = select.options[1];
        select.add(newOption, insetOption);
      });

      // 移除选项
      removeItemBtn.addEventListener('click', event => {
        select.remove(1);
        // select.options[1] = null;
      });

      // 移动和重排选项
      moveItemBtn.addEventListener('click', event => {
        const optionRemove = select.options[2];
        console.log('要移动的选项索引', optionRemove.index);
        select.insertBefore(optionRemove, select.options[1]);
      });
    </script>
  </body>
</html>
```

## html 表单的样式美化

- checkbox 的样式美化

```html
<div className="checked_box">
  <input id="checked1" type="checkbox" className="switch" />
  <label htmlFor="checked1"></label>
</div>
```

```scss
.checked_box {
  label {
    position: relative;
    display: block;
    width: 100px;
    padding: 5px;
    background-color: #eee;
    cursor: pointer;

    &::before {
      content: '';
      display: block;
      border-radius: 24px;
      height: 22px;
      background-color: white;
      transition: all 0.3s ease;
    }
    &::after {
      content: '';
      position: absolute;

      transform: translate(5px, -100%);
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background-color: white;
      transition: all 0.3s ease;
      border: 1px solid #333;
    }
  }

  .switch {
    display: none;
    &:checked + label::after {
      transform: translate(75px, -100%);
    }
    &:checked + label::before {
      background-color: green;
    }
  }
}
```

```scss
/** 自定义复选框样式  */
@mixin custom_checkbox {
  outline: 1px solid $bdgrey;
  border-radius: 3px;
  padding: 1px;
  label {
    display: block;
    cursor: pointer;
    width: 16px;
    height: 16px;
  }

  .switch {
    display: none;
    &:checked + label {
      background: $primary;
      mask-image: url(../icon/ui/icon-check.svg);
      mask-position: center;
      mask-size: contain;
      mask-repeat: no-repeat;
    }
  }
}
```
