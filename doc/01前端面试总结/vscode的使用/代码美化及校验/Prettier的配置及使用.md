## 安装 Prettier -code formate

- 作用

```bash
只关注格式化，并不具有eslint检查语法等能力，只关心格式化文件(最大长度、混合标签和空格、引用样式等)，
包括JavaScript · Flow · TypeScript · CSS · SCSS · Less · JSX · Vue · GraphQL · JSON · Markdown

```

- 常用配置项说明

```bash
## 当箭头函数仅有一个参数时加上括号
"prettier.arrowParens":"always",
## 控制对象字面量的空格输出
"prettier.bracketSpacing":true,
## 指定 prettier 的换行符
"prettier.endOfLine":"auto",
## 指定HTML文件的全局空白区域敏感度。 有效选项： 'css' - 尊重CSS显示属性的默认值。 'strict' - 空格被认为是敏感的。 'ignore' - 空格被认为是不敏感的。
"prettier.htmlWhitespaceSensitivity":"css",
## Prettier可以在文件顶部插入一个特殊的@format标记，指定该文件已用Prettier格式化。当与--require pragma选项一起使用时，这很好。如果文件顶部已经有一个docblock，则此选项将使用@format标记向其添加新行。
"prettier.insertPragma":true,
## 如果为 true，则将多行jsx元素的 > 放在最后一行的末尾，而不是单独放在下一行
"prettier.jsxBracketSameLine":false,
## 在JSX中使用单引号而不是双引号
"prettier.jsxSingleQuote":false,
## 指定每行代码的最佳长度， 如果超出长度则换行。
"prettier.printWidth":80,
## （Markdown）将散文包含在多行中
"prettier.proseWrap":"always",
## 引用对象中的属性时更改
"prettier.quoteProps":"as-needed",
## Prettier可以将自身限制为仅格式化文件，这些文件在文件顶部包含一个称为pragma的特殊注释。当逐渐将大型的、未格式化的代码基转换为更漂亮的代码基时，这非常有用
"prettier.requirePragma":false,
## 是否在每行末尾添加分号
"prettier.semi":true,
## 如果为 true，将使用单引号而不是双引号
"prettier.singleQuote":true,
## 每个制表符占用的空格数
"prettier.tabWidth":2,
## 尽可能控制尾随逗号的输出。 有效选项： '无' - 无尾随逗号 ' es5' - 在ES5中有效的尾随逗号（对象，数组等） 'all' - 尾随逗号 尽可能（函数参数）
"prettier.trailingComma":"all",
## 使用制表符（tab）缩进
"prettier.useTabs":true,
## 是否缩进Vue文件中<script>和<style>标记中的代码。有些人（比如Vue的创建者）不缩进来保存缩进级别，但这可能会破坏编辑器中的代码折叠。
"prettier.vueIndentScriptAndStyle":true
```

- 推荐配置

```bash
# 在根目录下新建.prettierrc文件
{
  "arrowParens": "avoid",
  "printWidth": 140,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5"
}
```

- 在根目录下新建.prettierignore 文件忽略部分文件目录

```bash
/dist/**
/node_modules/**
```
