- vscode 开发插件的安装

```bash
Easy LESS 插件可以自动把你编写的less文件转换为css文件
Live Server 插件可以在代码改变的时候自动刷新浏览器

```

## html 部分

- 标签

```html
<pre>这是一个原样输出标签，空格和换行都会原样输出</pre>
<small>用于副标题描述等字体会比常规字体要小</small>
<time>用于描述时间</time>
<sub>下标</sub>
<sup>上标</sup>
<del>原价</del>
<ins>现价</ins>
<s>不确定的</s>
<code>代码高亮</code>
<!-- 进度条 -->
<progress value="60" max="100"></progress>
<strong>强调标签</strong>
<em>突出文本</em>
<mark>高亮突出文本</mark>
<cite>来源于那里</cite>
<blockquote>引用内容块</blockquote>
<address>地址标签</address>
```

- 链接

```html
<p>图片的使用：小图使用png 大图使用jpg 动图使用gif</p>
```

- 表单

```html
<!-- 搜索栏与列表展示 -->
<input type="search" name="name" list="list" />
<datalist id="list">
  <option value="MYSQL">数据库管理</option>
  <option value="PHP">高效的后台语言</option>
</datalist>

<!-- 历史输入数据的保存 -->
<input type="text" name="name" autocomplete="on" />
```

- 多媒体

```html
<!-- 静音与自动播放及控制条 -->
<!-- poster='houdunren.jpg' 视频封面-->
<!-- preload='auto' 视频的加载方式 -->
<!-- loop 设置视频循环播放模式  -->
<video
  src="houdunren.mp4"
  controls
  muted
  autoplay
  width="600"
  height="300"
></video>

<!-- 如果有多个视频源可以使用source标签包裹  -->
<video controls muted autoplay width="600" height="300">
  <source src="houdunren.webm" type="video/webm" />
  <source src="houdunren.mp4" type="video/mp4" />
</video>

<!-- 音频标签的使用 -->
<audio controls muted preload="auto">
  <source src="houdunren.ogg" type="audio/ogg" />
  <source src="houdunren.ogg" type="audio/mp3" />
</audio>
```

## css 部分

- 选择器

```css
/** 子选择器 只选择子元素 忽略孙子元素  */
article > h2 {
}
/** 兄弟选择器 只选择h1后面的同级的h2元素  */
article h1 ~ h2 {
}
/** 相邻选择器 只选择h1后面紧挨着的和h2元素  */
article h1 + h2 {
}

/** 属性选择器 下面表示选中同时具备title属性和id属性的h1标签  */
h1[title][id] {
}
/** 属性必须为某个值  */
h1[title='title1'] {
}
/** 属性值是以某个字符串开头的  */
h1[title^='title'] {
}
/** 属性值是以某个字符结尾的  */
h1[title$='com'] {
}
/** 匹配属性值的任意位置出现指定的字符  */
h1[title*='com'] {
}
/** 匹配属性值中出现某个独立的单词  */
h1[title~='title'] {
}
/** 属性值以某个单词开始 匹配hdr  hdr-com 但不匹配hdr.com */
h1[title|='hdr'] {
}

/** 伪类选择器  默认状态下*/
a:link {
}
/** 伪类选择器  被访问的状态下*/
a:visited {
}
/** 伪类选择器  鼠标移动上去的状态下*/
a:hover {
}
/** 伪类选择器  被激活的状态下*/
a:active {
}
/** 伪类选择器  获取焦点的状态下 */
a:focus {
}
/** 控制锚点目标的样式  */
div:target {
}
/** 根部伪类选择器  */
:root {
}
/** 匹配里面没有内容的空元素  */
li:empty {
}

/** 选中第一个article元素  */
article:first-child {
}
/** article下面的第一个子元素  */
article > :first-child {
}

/** article下面的第一个h1 元素  */
article h1:first-of-type {
}

/** last-child last-of-type 使用同上  */

/** 选择只有唯一的子元素的元素  */
article:only-child {
}
/** 选择父元素下面唯一一个h1子元素  */
article > h1:only-of-type {
}

/** 选中第n个article元素  */
article:nth-child(1) {
}
/** article下面的第一个子元素  */
article > :nth-child(1) {
}
/** article下面第奇数个子元素  */
article > :nth-child(odd) {
}
article > :nth-child(2n-1) {
}
/** article下面第偶数个子元素  */
article > :nth-child(even) {
}
article > :nth-child(2n) {
}
/** article下面前2个子元素  */
article > :nth-child(-n + 2) {
}
/** article下面从第2个子元素开始的子元素  */
article > :nth-child(n + 2) {
}

/** 只选中同一标签元素类型的第几个元素  */
article h1:nth-of-type(2) {
}

/** 从后面开始取选中的元素 奇偶数选中同nth-child */
main > ul li:nth-last-child(1) {
}
/** 选中最后一个指定类型的元素  */
article > h1:nth-last-of-type(1) {
}

/** 排除选择器 选中前面3个li元素 并排除掉第二个li元素 可以连着写 例如再排除掉第一个 */
main > ul li:nth-child(-n + 3):not(:nth-child(2)):not(:first-child) {
}

/** 对禁用表单样式的控制  */
input:disabled {
}
/** 设置可用状态下的表单样式  */
input:enabled {
}
/** 选中状态下的表单控件样式  */
input:checked + label {
}

/** 控制必填与非必填的表单样式  */
input:optional {
}

input:required {
}

/** 表单控件的值有效状态下的样式于无效状态下的样式  */
input:valid {
}
input:invalid {
}

/** 控制每个段落中的第一个文字的样式  */
p::first-letter {
}
/** 控制段落第一行的样式  */
p::first-line {
}
/** 在标签的后面添加内容  */
span::after {
  content: 'com';
}
/** 在标签的前面添加内容  */
span::before {
  content: 'com';
}
```

- 权重问题

```css
/**
  * id的权重位是100
  * class 类属性值的权重位是10
  * 标签 伪元素的权重位是1
  * 行内样式的权重位是1000

  * 继承是没有权重的 NULL
  * border属性是不会被继承下去的(有写css属性是不会被继承下去的)
  * 权重0 继承NULL 0>NULL的
  */

/** 通过使用!important强制提升优先级  */
h1[class] {
  color: red !important;
}
```

- 文本

```css
/**
  * 自定义字体的使用
  */
@font-face {
  font-family: 'abc';
  /** 常用格式 otf woff ttf  */
  src: url('abc-Light.otf') format('opentype'), url('abc-Heavy.otf') format('opentype');
}

h2 {
  font-family: abc;
}

/** 定义字体的便捷写法  */
article p {
  font: bold italic 15px/3.5rem 'Courier New', Courier, monospace;
}

/** 转换字体的大小写  */
h2 {
  font-variant: small-caps;
  text-transform: capitalize;
}

/** 给文字添加阴影 颜色 左右偏移 上下偏移 模糊像素 */
h1 {
  text-shadow: rgba(150, 9, 238, 0.2) 3px 2px 3px;
}

/** 空白处理  */
h2 {
  white-space: pre; // 保留空白
}

/** 处理文本溢出  */

p {
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/** 处理文本缩进的技巧  */
div {
  font-size: 24px;
  text-indent: 2em; // 可以跟随上面的字体大小缩进2个字符
}

/** 设置文字间距 与 文字空格大小  */
h2 {
  letter-spacing: 20px; // 文字间的间距
  word-spacing: 30px; // 文字间的空格大小
}

/** 排版方式  */
div {
  writing-mode: vertical-rl; // 诗词的排版方式(从右到左垂直排列)
}
```

- 盒子模型

```css
/** 圆角的设置  */
article {
  width: 300px;
  height: 300px;
  border: 1px solid red;
  border-radius: 10px 40px 80px 100px;
  border-top-left-radius: 30px;
  border-top-right-radius: 50px;
  border-bottom-left-radius: 100px;
  border-radius: 50%;
}

/** 自动撑满高度或宽带  */
span {
  background: #f1c40f;
  display: inline-block;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
}

/** 宽度根据内容撑开  */
div {
  background: #f1c40f;
  margin: auto;
  width: fit-content;
  padding: 10px;
}

/** 根据最大或最小内容宽度进行自适应  */
main {
  width: max-content;
  background: #9b59b6;
  margin: auto;
  margin-top: 30px;
}

div {
  background: #f1c40f;
  padding: 10px;
  margin-bottom: 20px;
}
```

- 背景颜色与渐变

```scss
/** 背景裁剪  */
article {
  border: dashed 10px black;
  padding: 30px;
  background-color: red;
  height: 500px;
  background-clip: border-box; // 设置背景图片的裁剪区域
  background-repeat: no-repeat; // 图片是否平铺
  background-attachment: fixed; // 设置背景图片固定不滚动
  background-position: -80px 50px; // 设置背景图片的位置
  background-size: contain; // 设置背景图片的尺寸 可以是80% auto
}

/** 多图片背景的定义  */
article {
  height: 500px;
  border: dashed 10px black;
  background-image: url(1jpg), url(2jpg);
  background-position: top left, center;
  background-repeat: no-repeat, repeat;

  background: red url(2jpg) no-repeat center; // 使用一条语句定义
}

/** 盒子阴影  */
div {
  width: 300px;
  height: 300px;
  border: solid 2px #ddd;
  box-shadow: 0 0 5px rgba(100, 100, 100, 0.2); // 左右偏移像素 上下的偏移像素 模糊像素 颜色值
}

/** 线性渐变的使用  */
nav {
  height: 30px;
  background: linear-gradient(
    90deg,
    red,
    blue,
    yellow
  ); // 设置90度渐变 也可以设置to right 等方向值
}

/** 径向渐变的使用  */
article {
  width: 500px;
  height: 500px;
  background: radial-gradient(
    at 0% 50%,
    red,
    green,
    blue
  ); // 通过at 0% 50%设置渐变的开始位置 也可以是方向值;
}

/** 通过标志位来控制渐变的位置范围  */
article {
  width: 150px;
  height: 150px;
  background: linear-gradient(45deg, red 50%, green 50%);
  background: radial-gradient(red, yellow 30%, black 70%, black 100%);
}

/** 通过中间点来控制渐变  */
article {
  background: linear-gradient(90deg, red, 30%, green);
}

/** 重复渐变的使用  */
article {
  height: 150px;
  background: repeating-linear-gradient(
    45deg,
    blue,
    25,
    yellow 25,
    25px,
    red 5px
  ); // 通过设置25的中间点产生来纯色的过度效果
  background: repeating-radial-gradient(
    100px 100px,
    red,
    yellow 25px,
    red 60px
  );
}
```

- 数据的追加

```css
/** :hover伪类后面可以使用before或after等伪类选择器  */
h2:hover::before {
}
```

- 推荐的布局 html 结构

```html
<header>
  <nav></nav>
</header>
<main>
  <article>
    <section></section>
    <section></section>
  </article>
  <aside></aside>
</main>
<footer></footer>
```

- 浮动元素控制与文字内容的排版

```scss
/* shape-outside 属性 */

div {
  width: 100px;
  height: 100px;
  float: left;
  padding: 30px;
  border: 1px solid #f00;
  margin: 0px;
  shape-outside: border-box; // 控制和文字的排版环绕样式
}
```

- 使用 div 可以绘制不同的形状

```scss
/** 通过使用clip-path属性来实现 */

div {
  width: 100px;
  height: 100px;
  float: left;
  padding: 30px;
  border: 1px solid #f00;
  margin: 0px;
  clip-path: circle(50% at 100% 100%); // at后面的参数是控制圆形的起始位置
  clip-path: ellipse(20% 30%); // 定义椭圆
  clip-path: polygon(0 0, 100% 100%, 0 100%); // 定义三角形
  shape-outside: polygon(
    0 0,
    100% 100%,
    0 100%
  ); // 这样定义文字会围绕这三角形环绕

  shape-outside: url(xj.png); // 使用有透明度的png图片来实现文本的环绕
}
```

- 定位布局相关

```css
/** 绝对定位在没有设置尺寸的情况下宽带和高度会受到 left top right bottom 属性的影响  */
div {
  background: red;
  position: absolute;
  left: 300px;
  top: 100px;
  right: -100px;
  bottom: 100px;
  border-radius: 50%;
}

/** 
  * 粘性定位 滚动条滚动标题会自定定位到其父级的顶部
  * h2 是在section下面的
  * 如果h2是在article下面的 这滚动的时候会有堆叠的效果
  */
article section h2 {
  background: red;
  color: white;
  position: sticky;
  top: 0;
}

/** 固定定位的使用场景 固定定位的定位点是参考页面的  */
```

- flex 弹性布局相关

```scss
/** 
  * 定位弹性盒子
  * 主轴 和 交叉轴
  */
div {
  display: flex; // 块弹性盒子
  display: inline-flex; // 行内弹性盒子
  flex-direction: column; // 定义子元素的排列方向
  flex-wrap: wrap; // 当子元素不能在一行排列的时候进行换行 如果不换行则默认情况下子元素会收缩
  flex-flow: column wrap; // 这是一个把flex-direction 和flex-wrap缩写在一起的属性
  justify-content: center; // 控制子元素的对齐方式
  align-items: center; // 设置交叉轴的对齐方式
  align-items: stretch; // 设置子元素进行拉伸 如果子元素设置了高度则该属性不会生效 因为它的优先级比较低
  align-content: space-around; // 设置换行后子元素在交叉轴线的对齐方式
}

/**
  * 对弹性盒子子元素的设置
  * 弹性盒子的子元素是仍然可以使用绝对定位和相对定位的
  */
div:first-child {
  align-self: flex-start; // 对子元素在交叉轴的对齐方式进行定义
  flex-grow: 1; // 把父元素的剩余空间进行平均分配 0 则不进行分配 数值越大则分配得越多
  flex-shrink: 1; // 当父元素的空间不够的时候子元素按比例进行收缩 数值越大收缩得越多 0则不进行收缩
  flex-basis: 100px; // 设置元素的基础尺寸 其优先级是高于width的 max-width min-width的优先级是最高的
  flex: 1 2 100px; // flex-grow flex-shrink flex-basis 三个属性的缩写
  order: 1; // 改变元素的排列顺序 数值越大则排得越后 可以是负数
  margin-right: auto; // 使用这个属性后会自动撑满整个空间
}
```

- GRID 栅格系统

```css
/**
  * 把元素设置为栅格模型
  * 下面代码假定为一个九宫格的布局
  */
article {
  width: 300px;
  height: 300px;
  border: solid 5px red;
  display: grid; // 把元素设置为栅格模型
  grid-template-rows: repeat(3, 1fr); // 设置行 1fr 平均分配 每一个占1份
  grid-template-columns: repeat(3, 1fr); // 设置列 1fr 平均分配 每一个占1份

  grid-template-rows: repeat(2, 50%); // 快速绘制 2行每一行占50%
  grid-template-columns: repeat(5, 20%); // 快速绘制 5列 每一列占20%

  grid-template-rows: repeat(auto-fill, 100px); // 使用自动填充属性自动填充行
  grid-template-columns: repeat(auto-fill, 100px); //使用自动填充属性自动填充列

  grid-template-rows: 1fr 2fr 1fr; // 按不同的比例划分行
  grid-template-columns: 1fr 2fr 1fr; //  按不同的比例划分列

  grid-template-rows: repeat(2, minmax(50px, 100px)); // 设置行的范围
  grid-template-columns: repeat(5, 1fr); //  按比例划分列

  row-gap: 10px; // 行间距
  column-gap: 10px; // 列间距
  gap: 20px 10px; // 对行间距和列间距进行划分

  grid-auto-flow: column; // 设置子栅格的排列方式 默认是row
  grid-auto-flow: row dense; // 空间不足的话会自动填满

  justify-content: space-evenly; // 设置子元素水平方向的对齐方式
  align-content: center; // 设置子元素垂直方向的对齐方式
  place-content: center space-evenly; // 可以使用简写的方式 第一个参数是垂直方向的对齐方式 第二个参数是水平方向的对齐方式

  justify-items: end; // 控制子元素水平方向在栅格中的对齐方式
  align-items: start; // 控制子元素垂直方向在栅格中的对齐方式
  place-items: start end; // 可以使用简写的方式 第一个参数是垂直方向的对齐方式 第二个参数是水平方向的对齐方式
}

/** 
  * 设置子元素的放置位置
  */

// 使用编号
div:first-child {
  grid-row-start: 2; // 从那一行开始
  grid-column-start: 2; // 从那一列开始
  grid-row-end: 3; // 从那一行结束
  grid-column-end: 3; // 从那一列结束
}

// 使用别名

article {
  grid-template-rows: [r1-start] 100px [r1-end r2-start] [r2-end r3-start]100px[r3-end];
  grid-template-columns: [c1-start] 100px [c1-end c2-start] [c2-end c3-start]100px[c3-end];

  // 也可以使用平铺快速命名
  grid-template-rows: repeat(3, [r-start] 1fr [r-end]);
  grid-template-columns: repeat(3, [c-start] 1fr [c-end]);
}
div:first-child {
  grid-row-start: r2-start; // 从那一行开始
  grid-column-start: c2-start; // 从那一列开始
  grid-row-end: c3-start; // 从那一行结束
  grid-column-end: r3-start; // 从那一列结束

  // 也可以使用 快速命名
  grid-row-start: r-start 2;
  grid-column-start: c-start 1;
  grid-row-end: r-end 2;
  grid-column-end: c-end 3;

  // 也可以使用快速偏移定位
  grid-column-end: span 3; // 行偏移3个
  grid-row-end: span 3; // 列偏移3个

  // 让子元素居中
  grid-row-start: 2;
  grid-column-start: 2;
  grid-column-end: span 1;
  grid-row-end: span 1;

  // 使用简写方式进行布局
  grid-row: 3 / 4; // 从第三行开始 第四行结束
  grid-column: 3 /4; // 从第三列开始 第四列结束

  // 简写方式也可以使用偏移量
  grid-row: 1 / span 3; // 从第一行开始偏移3个
  grid-column: 1 / span 3; // 从第一列开始偏移3个

  // 区域定位的使用 例如定位到中间的位置
  grid-area: 2/2/3/3;
  grid-area: r 1 / c 1 / r 4 / c 4; // 也可以使用别名

  // 控制自身的对齐方式
  justify-self: center; // 控制子元素相对与栅格水平方向的对齐方式
  align-self: end; // 控制子元素相对与栅格垂直方向的对齐方式
  place-self: center end; // 可以使用简写的方式 第一个参数是垂直方向的对齐方式 第二个参数是水平方向的对齐方式
}

// 栅格布局的实现

.container {
  width: 1020px;
  margin: 0 auto;
}

.row {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
}

.col-1 {
  grid-column: span 1; // 使用简写方式

  grid-column-end: span 1; // 也可以使用这种方式 2选1
}

.col-2 {
  grid-column: span 2; // 使用简写方式

  grid-column-end: span 2; // 也可以使用这种方式 2选1
}

// 页面布局实践
article {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 60px; // 三行
  grid-template-columns: 60px 1fr; // 两列
  grid-template-areas: 'header header' // 起始和结束线会被自动命名为header-start header-start header-end header-end
    'nav main' // 也可以使用'..'的占位符
    'footer footer'; // 区域的命名
}

header,
nav,
main,
footer {
  padding: 10px;
}
header {
  /*  grid-area:header-start/header-start/main-end/main-end; // 也可以使用命名 */
  grid-area: header; // 会把区域命名header占满
}

nav {
  grid-area: nav; // 会把区域命名nav占满
}

main {
  grid-area: main; // 会把区域命名main占满
}
footer {
  grid-area: footer; // 会把区域命名footer占满
}
```

- CSS3 变形透视动画

```scss
/**
  * 坐标轴的概念：
  * X轴是水平轴
  * Y轴是垂直轴
  * Z轴是纵深轴
  */

main{
  transform-style:preserve-3d; // 让该元素具备有3d透视属性
  transform:perspective(900px) rotateY(45deg) scaleZ(3); // 设置自身的3D透视效果 旋转角度45度
}

div {
  // 移动
  transform: translateX(200px); // 向x轴偏移200像素
  transform: translateY(200px); // 向y轴偏移200像素
  transform: translateX(100%) translateY(100px); // 对水平方向的和垂直方向同时进行操作
  transform: translate(100%, 100px); // 对X轴和Y轴的简写方式
  transition: 1s; // 设置1s的动画过度效果

  // 透视效果的添加
  // 必须使用perspective设置景深 要不然无透视效果
  // translateZ(100px) 不可以用百分比的单位
  transform:perspective(900px) rotateY(45deg) translateZ(100px);

  // 缩放效果
  transform:scaleX(2); // x轴的缩放比例
  transform:scaleY(2); // y轴的缩放比例
  transform:scaleZ(3); // Z轴的缩放比例
  transform:scale(2,.5); // 第一个参数是x轴的缩放比例 第二个参数是y轴的缩放比例
  transform:scale3d(2,2,1); // 控制X轴 Y轴 Z轴的缩放比例
  transform-origin:left top;  // 设置缩放起始点

  // 旋转效果
  transform:perspective(900px) rotateX(-190deg); // 围绕这X轴旋转
  transform:perspective(900px) rotateY(-190deg); // 围绕这Y轴旋转
  transform:perspective(900px) rotateZ(-190deg); // 围绕这Z轴旋转
  transform:perspective(900px) rotate3d(1,0,1,-190deg); // 通过向量来控制3纬物体的旋转

  // 顺序不一样最终展示出来的效果也是不一样的
  transform:rotateY(45deg) rotateX(45deg);
  transform:rotateX(45deg) rotateY(45deg);

  // 倾斜效果
  transform:skewX(-45deg); // 绕这x轴倾斜
  transform:skewY(-45deg); // 绕着y轴倾斜
  transform:skew(-45deg,45deg) // 简写

  // 2d变形参考点的使用
  transform-origin:left center;

  // 3d变形参考点的使用
  transform-origin:left bottom 100px;

}

// 让元素居中的案例
main {
  position:absolute;
  left:50%;
  top:50%;
  transform:translate(-50%,-50%);
  width:300px;
  height:300px;
  border:solid 5px silver;
}

// 实现3D的透视效果
// translate3d的使用
div:nth-child(2){
  background:#e67e22;
  transform:perspective(900px) rotateY(45deg) translate3d(0%,0%,0px);
}

main:hover div:nth-child(2) {
    transform:perspective(900px) rotateY(45deg) translate3d(0%,0%,200px);

}

// 移动端页面切换效果
main>div{
  transform:translateY(-100%);
  transition:1s;
  z-index:1;
}
main>div:target{
  transform:translateY(0);
}
// 当main下面的第一个div通过下方导航的锚点点击变成当前对象的时候
main>div:nth-of-type(1):target{
  background:#27ae60;

}
<main>
  <div id="home"></div>
  <div id="video"></div>
  <div id="live"></div>
</main>
<nav>
   <a href='#home'>home</a>
   <a href='#video'>video</a>
   <a href='#live'>live</a>
</nav>

// 图片的模糊效果
div>img {
  filter:blur(10px);
}
```

- 透视的添加

```scss
/**
 * 如果每一个物体都是是独立的,那么可以为每个物体添加透视
 * 如果该物体多个面构成来一个独立的物体，则需要把透视添加到父元素中,让物体的每一个面都有同一个透视角度
 */

// 给每个物体添加透视效果
div {
  width: 200px;
  height: 200px;
  background: #ff0;
  transform: perspective(500px) rotateY(45deg); // 在每个物体上添加透视效果 会观察物体独立的透视效果
}

// 在父级上添加透视效果
main {
  display: flex;
  perspective: 600px; // 在父级上添加透视效果,会观察里面的子元素
}
div {
  width: 200px;
  height: 200px;
  background: #ff0;
  transform: rotateY(45deg);
}
```

- 三维空间透视效果的添加

```scss
main {
  display: flex;
  border: 1px solid silver;
  width: 400px;
  height: 300px;
  transform-style: preserve-3d; // 让父元素具备3D透视效果
  transform: perspective(900px) rotateY(45deg);
}

div {
  position: absolute;
  width: 200px;
  height: 300px;
  background: #ff0;
}

div:nth-child(2) {
  transform: transitionZ(200px);
}
```

```html
<main>
  <div></div>
  <div></div>
</main>
```

- 三维旋转效果实例操作

```scss
/**
  * rotateX X轴旋转属性可以去掉 去掉则为正视平面旋转效果
  */
main {
  display: flex;
  border: 1px solid silver;
  width: 200px; // 宽度与子元素一样
  height: 200px; // 高度与子元素一样
  transform-origin: center center -200px; // 添加旋转点与子元素一至
  transform-style: preserve-3d; // 添加3纬观察视角
  transform: perspective(900px) rotateX(-45deg); // 自己整体3纬角度观察
  transition: 1s; // 鼠标移入1s的过度效果
}
article {
  width: 400px;
  height: 400px;
  border: 1px solid silver;
  display: flex;
  justify-content: center;
  align-items: center;
}
// 添加鼠标移入的旋转效果
article:hover main {
  transform: perspective(900px) rotateX(-45deg) rotateY(720deg);
}
div {
  position: absolute;
  width: 200px;
  height: 200px;
  overflow: hidden;
}
div > img {
  height: 100%;
}

div:nth-child(1) {
  transform-origin: center center -200px; // X轴 Y轴是在中心 Z轴是在-200px;
  transform: rotateY(90deg); // 按Y轴旋转90度
}
div:nth-child(2) {
  transform-origin: center center -200px; // X轴 Y轴是在中心 Z轴是在-200px;
  transform: rotateY(180deg); // 按Y轴旋转90度
}
div:nth-child(3) {
  transform-origin: center center -200px; // X轴 Y轴是在中心 Z轴是在-200px;
  transform: rotateY(270deg); // 按Y轴旋转90度
}
div:nth-child(4) {
  transform-origin: center center -200px; // X轴 Y轴是在中心 Z轴是在-200px;
  transform: rotateY(360deg); // 按Y轴旋转90度
}
```

```html
<article>
  <main>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </main>
</article>
```

- 调整观看角度的视角

```scss
main {
  width: 400px;
  height: 400px;
  border: 1px solid silver;
  perspective: 900px; // 观察每个子元素3维视角
  transform-style: preserve-3d;
  transition: 2s;
}
body:hover main {
  perspective-origin: left bottom; // 设置3维观察视角的基点 子元素会按照这个基点来旋转(人动车不动)
}

div {
  position: absolute;
  width: 200px;
  height: 200px;
  overflow: hidden;
}

div:nth-child(1) {
  background: #2ecc71;
  transform: rotateY(60deg);
}
div:nth-child(2) {
  background: #e74c3c;
  transform: rotateY(60deg) rotateZ(-300px);
}
```

```html
<main>
  <div></div>
  <div></div>
</main>
```

- 实现一个正方形的立方体

```scss
main {
  display: flex;
  border: solid 5px silver;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  transform: perspective(900px) rotateX(-45deg);
  transform-origin: center center 100px;
  transition: 2s;
}
body:hover main {
  transform: perspective(900px) rotateX(180deg);
}
div {
  width: 200px;
  height: 200px;
  position: absolute;
  background: #27ae60;
  font-size: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-origin: center center 100px; // 改变旋转参考点 z轴100px 这样旋转参考点就在正中心了
  opacity: 0.8;
}

div:nth-child(1) {
  background: #e67e22;
  transform: rotateY(90deg);
}
div:nth-child(2) {
  background: #e77e22;
  transform: rotateY(180deg);
}
div:nth-child(3) {
  background: #e87e22;
  transform: rotateY(270deg);
}
div:nth-child(4) {
  background: #e97e22;
  transform: rotateY(360deg);
}
div:nth-child(5) {
  background: #e68e22;
  transform-origin: top; // 改变旋转参考点
  transform: rotateY(90deg);
}
div:nth-child(6) {
  background: #e67922;
  transform-origin: bottom;
  transform: rotateY(90deg);
}
```

```html
<main>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</main>
```

- 实现一个长方形的立方体

```scss
main {
  display: flex;
  border: solid 5px silver;
  width: 200px;
  height: 200px;
  transform-style: preserve-3d;
  transform: perspective(900px) rotateX(-45deg);
  transform-origin: 200px center -100px;
  transition: 2s;
}
body:hover main {
  transform: perspective(900px) rotateY(360deg);
}
div {
  width: 200px;
  height: 200px;
  position: absolute;
  background: #27ae60;
  font-size: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.8;
}

div:nth-child(1) {
  width: 400px;
  height: 200px;
  background: #e67e22; // 第一个面 正面
}
div:nth-child(2) {
  background: #e77e22;
  width: 400px;
  height: 200px;
  transform: translateZ(-200px); // 第二个面 后面
}
div:nth-child(3) {
  width: 200px;
  height: 200px;
  background: #e87e22;
  transform-origin: left; // 设置旋转参考点
  transform: rotateY(90deg); // 第三个面 左侧面
}
div:nth-child(4) {
  width: 200px;
  height: 200px;
  background: #e87e22;
  transform-origin: right; // 设置旋转参考点
  transform: translateX(200px) rotateY(-90deg); // 第四个面 右侧面
}
div:nth-child(5) {
  width: 400px;
  height: 200px;
  background: #e68e22;
  transform-origin: top; // 改变旋转参考点
  transform: rotateY(-90deg); // 第5个面 上面
}
div:nth-child(6) {
  width: 400px;
  height: 200px;
  background: #e68e22;
  transform-origin: bottom; // 改变旋转参考点
  transform: rotateY(-90deg); // 第6个面 下面
}
```

```html
<main>
  <div>1</div>
  <div>2</div>
  <div>3</div>
  <div>4</div>
  <div>5</div>
  <div>6</div>
</main>
```

- backface-visibility 背面不可见属性

```scss
/** 
  * 可以设置在父元素上,也可以设置在子元素上
  * 如果设置在父元素上,需要添加transform-style:preserve-3d属性
  */

main {
  display: flex;
  border: solid 5px silver;
  width: 200px;
  height: 200px;
  perspective: 900px; // 观察每一个子元素
  transform-style: preserve-3d;
  transition: 2s;
}
// 可以是通过父级元素旋转
// 如果通过父元素旋转 则父元素需要添加 transform-style: preserve-3d属性
body:hover main {
  transform: rotateY(-180deg);
}

// 也可以通过子元素来旋转
body:hover main div:nth-child(1) {
  transform: rotateY(-180deg);
}

body:hover main div:nth-child(2) {
  transform: rotateY(0deg);
}

div {
  width: 200px;
  height: 200px;
  position: absolute;
  background: #27ae60;
  font-size: 4em;
  display: flex;
  justify-content: center;
  align-items: center;
  backface-visibility: hidden;
}

div:nth-child(1) {
  background: #3498db;
}

div:nth-child(2) {
  background: #e74c3c;
  transform: rotateY(180deg);
}
```

```html
<main>
  <div></div>
  <div></div>
</main>
```

- 高效编辑器插件的使用

```bash
## emmet 插件 可以快速编写代码 按tab键后生成
div.idiv>ul>li*5{按tab键后自动生产html结构代码}
## 扩展左侧面板文件管理功能
## Workspace Sidebar

## 快速创建文件插件
## advanced-new-file
按 command + alt + n 会出现提示框，您可以在其中输入文件的路径。如果该文件已经存在，则将打开该文件，否则将创建一个新文件及其所有父目录。

## 添加注释插件
## docblock

## 本地代码历史记录插件
Local History

## 代码片段生产插件

## 代码格式化插件

## 编辑器中快捷键的使用

```

## transition 过渡效果

```scss
/**
  * 有些属性是没有过度效果的例如border属性
  */

// 可以设置不同的状态下的过度时间
div {
  width: 200px;
  height: 200px;
  background: #9b59b6;
  transition: 2s;
  border: solid 20px white;
}

div:hover {
  transition: 200ms; // 可以设置不同的过度时间 不设置则会继承
  background: #e74c3c;
  border-radius: 50%;
  width: 400px;
  height: 400px;
}

// 设置只有某些属性具备过度效果
div {
  width: 200px;
  height: 200px;
  background: #9b59b6;
  border: solid 20px white;
  transition-property: width, height; // all则表示全部 none则表示所有属性都没有过度效果
  transition-duration: 2s;
}

div:hover {
  background: #e74c3c;
  border-radius: 50%;
  width: 400px;
  height: 400px;
}

// 过渡时间的设置
div {
  transition-property: background, width, height, border-radius;
  transition-duration: 200ms, 3s, 1s; // 会从第一个属性开始匹配 然后再依次从头开始 例如border-radius是200ms
}

// 设置过渡动画曲线
// ease linear ease-in ease-out ease-in-out
div {
  transition-timing-function: linear;
  transition-duration: 3s;
}

// 设置过渡动画的步进效果
div {
  transition-timing-function: steps(3, start); // 从第一步开始动一共动3步
  transition-timing-function: step-start; // 开始的时候动
  transition-timing-function: step-end; // 结束的时候动
  transition-duration: 3s;
}

// 步进过渡制作时钟效果
main::after {
  transform: translateX(-50%);
  transform-origin: bottom;
  transition-timing-function: steps(60, start); // 从第一步开始动一共动60步
  transition-duration: 60s;
}

main:hover::after {
  transform: translateX(-50%) rotate(360deg);
}

// step-end 和 step-start的使用

// 延时过渡效果
div {
  transition-delay: 1s; // 等待1s后在产生过渡效果
  transition-duration: 3s;
}

// 组合简写方式
div {
  transition: all linear 2s 1s; // 所有属性 线性运动 持续2s 延迟1s执行

  /* 多属性的简写方式 */
  transition: border-radius linear 2s 0s, background 2s 2s, width linear 2s 4s, height
      linear 2s 4s;
}
```

## css3 animation 动画

- 简单的动画

```scss
/** 把动画作用在div上  */
div {
  width: 100px;
  height: 100px;
  background: white;
  animation-name: hd; // 定义动画名称
  animation-duration: 2s; // 定义动画持续的时间
}

/** 使用to和form定义动画帧  */
@keyframes hd {
  form {
    background: White;
  }
  to {
    background: red;
  }
}
/** 
 * 使用百分比定义动画帧 
 * 百分比的顺序是可以颠倒的
 * 如果没有设置起点则默认使用原来的动画属性
 * 如果没有设置终点则默认使用原来的动画属性
 */
@keyframes hd {
  0% {
    background: White;
  }
  100% {
    background: red;
  }
}

// 物体围绕正方形边框移动的动画
// 起点和终点默认为物体的初始状态
@keyframes hd {
  25% {
    transform: translateX(300px); // 从起点向右边移动300px;
  }
  50% {
    transform: translate(300px, 300px); // 向下再移动300px;
  }
  75% {
    transform: translateY(300px); // 向左移动300px;
  }
  // 默认100% 会回到起点
}

// 组合的写法
@keyframes hd {
  25% {
    transform: translateX(300px); // 从起点向右边移动300px;
  }
  50% {
    transform: translate(300px, 300px); // 向下再移动300px;
  }
  75% {
    transform: translateY(300px); // 向左移动300px;
  }
  // 默认100% 会回到起点

  // 如果有共同的样式可以使用组合的写法
  25%，75% {
    background: #red;
    border-radius: 50%;
  }
}
```

- 多个动画帧作用与一个物体身上

```scss
div {
  width: 100px;
  height: 100px;
  background: white;
  animation-name: translate, background; // 执行多个动画
  animation-duration: 4s, 2s; // 第一个动画持续时间4s 第二个动画持续时间为2s
}

@keyframes translate {
  25% {
    transform: translateX(300px);
  }
  50% {
    transform: translate(300px, 300px);
  }
  75% {
    transform: translateY(300px);
  }
}

@keyframes background {
  25% {
    background: red;
  }
  50% {
    background: black;
  }
  75% {
    background: yellow;
  }
}
```

- 属性重叠对动画的影响

```scss
/**
  * 谁出现在后面谁的优先级就越高 
  */
div {
  width: 100px;
  height: 100px;
  background: white;
  animation-name: translate, background; // 执行多个动画
  animation-duration: 4s, 2s; // 第一个动画持续时间4s 第二个动画持续时间为2s
}
```

- 设置动画停在最后一帧

```scss
main {
  width: 100vw;
  height: 100vh;
  background: red;
  transform: scale(0);
  animation-name: scale;
  animation-delay: 2s; // 动画延迟时间
  animation-duration: 2s;
  animation-fill-mode: forwards; // 动画结束后会停留在最后一帧 而不是回到初始状态(单动画没动的时候使用的是结束帧)
}
```

- 设置动画回到起始位置

```scss
main {
  width: 100vw;
  height: 100vh;
  background: red;
  transform: scale(0);
  animation-name: scale;
  animation-delay: 2s; // 动画延迟时间
  animation-duration: 2s;
  animation-fill-mode: backwards; // 当动画没动的时候使用的是起始帧
}
```

- 动画的中间值

```scss
/** 
  * 有中间值的属性才会产生动画
  * width:auto; -> width:100px;  不会产生动画因为没有中间值
  * border:solid 2px wihit; -> border:dotted 30px #fff; solid->dotted没有动画  2px -> 30px则有动画
  */
```

- 控制动画循环的次数

```scss
div {
  width: 100vw;
  height: 100vh;
  background: red;
  transform: scale(0);
  animation-name: scale, translate;
  animation-delay: 2s;
  animation-duration: 2s;
  animation-fill-mode: forwards;
  animation-iteration-count: 2; // 控制动画循环2次
  animation-iteration-count: 1 2; // 第一个动画循环1次 第二个动画循环2次
  animation-iteration-count: infinite; // 控制动画无限循环
}
```

- css 绘制一个心形

```scss
.heart {
  width: 200px;
  height: 200px;
  background: red;
  transform: rotate(45deg);
}
.heart::before {
  content: '';
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  background: red;
  transform: translateX(-100px);
}

.heart::after {
  content: '';
  width: 200px;
  height: 200px;
  border-radius: 50%;
  position: absolute;
  background: red;
  transform: translateY(-100px);
}
```

- 改变动画的方向

```scss
li:nth-child(1) > i {
  animation-iteration-count: infinite; // 设置动画循环次数
  animation-direction: normal; // 默认方向 动画没有平滑的过渡效果 当存在多次循环动画的时候使用
}
li:nth-child(2) > i {
  animation-iteration-count: infinite; // 设置动画循环次数
  animation-direction: reverse; // 从结束到开始方向 动画没有平滑的过渡效果 当存在多次循环动画的时候使用
}
li:nth-child(3) > i {
  animation-iteration-count: infinite; // 设置动画循环次数
  animation-direction: alternate; // 动画有平滑的过渡效果 当存在多次循环动画的时候使用
}
li:nth-child(4) > i {
  animation-iteration-count: infinite; // 设置动画循环次数
  animation-direction: alternate-reverse; // 从结束到开始方向 动画有平滑的过渡效果 当存在多次循环动画的时候使用
}
```

- 定义动画的运动曲线

```scss
li {
  animation-timing-function: ease-in; // 定义动画的运动轨迹
  animation-timing-function: cubic-bezier(
    0.17,
    0.67,
    0.83,
    0.67
  ); // 自定义动画的运动轨迹
}
```

- 阴影效果当前颜色的使用

```scss
div {
  width: 50px;
  height: 50px;
  background: red;
  align-self: center;
  justify-self: start;
  color: red;
  box-shadow: 55px 55px 0 currentColor; // currentColor让阴影的颜色使用当前的颜色

  // 产生3个阴影的效果
  box-shadow: 3px 0 0 currentColor, 9px 0 0 currentColor, 15px 0 0 currentColor;
```

- 动画的步进效果

```scss
div {
  animation-timing-function: steps(4, start); // 从第二格开始走
  animation-timing-function: steps(4, end); // 从起始位置开始走

  animation-timing-function: step-start; // 相当于steps(1, start)
  animation-timing-function: step-end; // 相当于steps(1, end)
}
```

- 控制动画的暂停与播放

```scss
div:hover::before {
  animation-play-state: paused; // 控制动画的暂停
  animation-play-state: running; // 控制动画的播放
}
```

- 动画的填充模式

```scss
div {
  animation-fill-mode: backwards; // 动画在起始帧开始
  animation-fill-mode: forwards; // 动画在结束帧结束last-of-type
  animation-fill-mode: both; // 动画在起始帧开始 动画在结束帧结束
}
```

- animation 的组合定义语法

```scss
li {
  animation: hd forwards 2s 2s; // 第一个时间是持续时间 第二个时间是延迟时间
}
```

- 一些动画库

```bash
## swiper
## animate.css
```

## CSS 3 媒体查询响应式布局

- 设置不同显示设备的样式

```html
<style media="all"></style>
<style media="screen"></style>
<style media="print"></style>
<style media="screen,print"></style>
```

- 使用 link 标签设置媒体类型

```html
<link rel="stylesheet" href="css/css.css" media="all" />
<link rel="stylesheet" href="css/css.css" media="screen" />
<link rel="stylesheet" href="css/css.css" media="print" />
```

- 使用@import 简化多文件的引入

```scss
@import url(common.css) all;
@import url(screens.css) screen;
@import url(print.css) print;
```

- 使用@media 定义响应式规则

```scss
@media screen and (max-width: 600px) {
  // 当屏幕尺寸小于600px的时候 下面的样式会起作用
  .navbar {
    ul {
      display: none;
    }
  }
}

// AND条件判断的使用
@media screen and (min-width: 768px) and (max-width: 1000px) {
  // 当屏幕尺寸在768px 到 1000px的时候 下面的样式会起作用
}

// 逻辑或的使用
@media screen and (orientation: landscape), screen and (min-width: 768px) {
  // 屏幕在横屏下 或 屏幕尺寸大于768px的使用 下面样式会起作用
}

// NOT关键字的使用及注意要点
@media not screen and (min-width: 500px) and (max-width: 768px) {
  h1 {
    color: red;
  }
}

// only 如果浏览器支持媒体查询则里面的样式会生效
// 用于排除低端的浏览器
@media only screen and (max-width: 768px) {
  h1 {
    color: red;
  }
}

// 只有浏览器支持媒体查询才会引入对于的样式文件
// 注意顺序问题
// 超小尺寸即最大768px
@import url(small-x.css) only screen and (max-width: 768px);
// 小尺寸
// 当超过768px的时候使用这个样式
@import url(small.css) only screen and (min-width: 768px);
// 超过960px的时候使用这个样式
@import url(mediums.css) only screen and (min-width: 960px);
// 超过1200px的时候使用这个样式
@import url(big.css) only screen and (min-width: 1200px);

// rem单位的使用
// :root相当于html
:root {
  font-size: 13px;
}
div {
  font-size: 1rem; //相当于13px;
}
```

## 单词

```pug
cite 引用
quote 引用 标价
poster 海报
sheet 床单 一张(通常指标准尺寸的纸);
optional 可选择的
letter 字母
variant 变体
capitalize 把…首字母大写
ellipsis 省略
available 可获得的
fit 适合
ellipse 椭圆
sticky 粘性的
flex 屈伸
stretch 拉伸
grid 网格
gap 间距
silver 银
perspective 角度 观点
rotate 旋转
skew 歪斜
preserve 保护;维护;保留;
iteration 迭代
alternate 交流 交替
```
