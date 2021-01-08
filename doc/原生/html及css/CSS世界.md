# css 世界

## 选择器

```txt
1.类选择器 .node
2.id选择器 #node
3.属性选择器
[title]
[title="css-world"]
[title~="css-world"]
[title^="css-world"
[title$="css-world"]
4.伪类元素选择器
:first-child
:last-child
5.伪元素选择器
::first-line
::first-letter
::before
::after
6.后代选择器 .node div
7.相邻后代选择器(子选择器所有符合规则的子选择器均会被选中) 仅仅子元素忽略孙子元素 .node>div
8.兄弟选择器(选中所有符合规则的兄弟元素) .node~div
9.相邻兄弟选择器(仅仅选择相邻的那个符合规则的元素) .node+div
```

## 块级元素

```txt
1.水平方向单独只能显示一个元素 多个元素则需要换行处理
2.利用块级元素来清除浮动
.clear::after{
  content: "";
  display: table;
  clear: both;
}
3.block元素的盒子实际上是由外部的块级盒子和内部的块级内容盒子组成的
4.inline-block的元素则由外在的内联盒子和内部的块级内容盒子组成的
5.width/height作用在内在盒子上面
```

## width

```txt
1.width的默认值是auto
2.外部尺寸的块级元素一旦设置的宽度流动性就丢失了
3.格式化宽度：在绝对定位模型中position=absolute 或 fixed 表现为包裹性 宽度由内部尺寸决定
4.对于非替换元素 当left/right top/bottom对立方属性值同时存在的时候 宽度大小相对于最近具有定位特征的祖先元素
5.内部尺寸：元素没有内容宽度是0
6.按钮是inline-block元素具备包裹性
7.首选最小宽度
中文的最小宽度是每个汉字的宽度
英文的最小宽度是连续的英文字符单元
如果想让中文和英文一样每个字符都用最小宽度单元 word-break:break-all
凹凸效果的实现
.oa {
  display: inline-block;
  width: 0;
}
.oa::before {
  content: 'love 你 love';
  outline: 2px solid #000;
  color: #000;
}
8.最大宽度实际上是最大连续连续内联盒子的宽度
9.内在盒子的结构
content-box
border-box
padding-box
margin-box
width属性是作用在content-box上面的
```

## box-sizing

```txt
1.box-sizing 顾名思义就是盒尺寸 可以改变width的作用细节
2.可以让width属性作用在其他盒子上
.box{box-sizing:border-box;}
3.在css重置的使用
input,textarea,img,video,object,div{
  box-sizing:border-box;
}
```

## height

```txt
1.height:100%
百分比高度值要想起作用，其父级必须要有一个有效的高度值
如果包含块的高度没有显式指定并且该元素不是绝对定位,则计算值为auto,auto和百分比计算肯定算不了
绝对定位元素的高度的百分比是相对于padding-box的,非绝对定位元素是相对于content-box计算的
```

## min-width / max-width

```txt
1.min-width / min-height 的初始值是auto
2.max-width / max-height 的初始值是none
3.权重超越important,max-width会覆盖掉width,使用js和style设置width值会被覆盖
4.当min-width和max-width同时存在的时候,值大的那个会被保留

```

## 内联元素

```txt
1.内联盒子:文字或内联标签组成
2.行框盒子:每一行就是一个行框盒子 由一个个的内联盒子组成
3.包含盒子:由一行行的行框盒子组成
4.幽灵空白节点:文档声明必须是html5声明,每个行框盒子前面都有一个空白节点,透明不占据任何宽度，且js无法获取
存在于每个行框盒子前面 同时具有该元素的字体和行高属性的0宽度的内联盒
5.内联元素的尺寸规则 宽高无效
```

## 替换元素

```txt
1.替换元素:顾名思义 内容可以被替换
<img src="1.jpg"/> video iframe textarea input
2.替换元素的特性
内容的外观不受页面上的css的影响
有自己的默认尺寸
所有的替换元素都是内联尺寸的元素
3.input按钮和button按钮的区别
input的white-space值是pre
button的white-space的值是normal
当文字足够多的时候input不会换行 button则会
4.替换元素的尺寸计算规则
如果没有css尺寸和html尺寸则固定尺寸作为最终的宽高
如果没有css尺寸则html尺寸作为最终宽高
如果有css尺寸则最终尺寸由css属性决定
5.图片资源的固有尺寸是无法改变的
div::before{
  content:url(1.jpg);
  diplay:block;
  width:200px; height:200px; // 此处宽高设置是无效的
}
6.object-fit属性
图片默认为object-fit:fill
如果图片设置为object-fit:none 则其尺寸完全不受控制
设置为object-fit:contain 不会超出html 尺寸 并保持等比例显示
7.如果把图片的src属性去掉那么img就是一个普通的内联元素
src属性存在的时候::before /::after失效
8.替换元素和非替换元素之间只隔着一个css content属性
在谷歌浏览器下所有元素都支持content属性，其他浏览器仅在::before/::after伪元素中才支持
img { content:url(1.jpg)}
img:hover {
  content:url(langh-tear.png);
}
9.使用案例展示logo兼顾SEO
<h1>我是标题</h1>
h1 { content:url(logo.svg); }
使用content生成的图片无法设置图片的尺寸，建议使用svg矢量图片
10.把content属性生成的对象称为匿名替换对象
content生成的内容无法被搜素引擎抓取
11.empty伪类:当元素里无内容的时候进行匹配
div:empty { border-style:dashed;}
```

## content 内容生成技术

```txt
1.清除浮动
.clear {
  content:'';
  display:block;
  clear:both;
}

2.content中插入Unicode字符
::after{
  content:'\A';
  white-space:pre;
}
'\A' 是换行符中的LF字符(换行) 将光标垂直移动到下一行 不区分大小写
‘\D’ 是换行符中的CR字符(回车) 将光标移动到当前行的开头 不区分大小写

3.正在加载中实现效果例子
<div class="dot">...</div>
.dot {
  display: inline-block;
  height: 1em;
  line-height: 1;
  text-align: left;
  vertical-align: -0.25;
  overflow: hidden;
}
.dot::before {
  display: block;
  content: '...\A..\A';
  white-space: pre-wrap;
  animation: dot 3s infinite step-start both;
}
@keyframes dot {
  33% {
    transform: translateY(-2em);
  }
  66% {
    transform: translateY(-1em);
  }
}
4.content图片生成
url中的图片地址可以是png,jpg,base64URL,svg,ico
div::before{
  content: url(1.jpg);
}
设置宽高无法改变图片的固有尺寸,伪元素中更多的是使用background-image来模拟,类似这样
div:before{
  content:'';
  background:url(1.jpg);
}
5.content attr属性值内容生成
img::after{
  content:attr(alt);
}
6.深入理解content计算器
属性counter-reset 给计数器取名 并设置起始计数数值 默认为0；
.counter{counter-reset:wangxiaoer 2;}
可以同时命名多个计数器
.counter{counter-reset:wangxiaoer 2 wangxiaosan 3;}

属性counter-increment 计数器递增 后面可以跟数字表示每次计数的变化值(可以是负数)
普照规则
普照源(counter-reset)唯一,每普照(counter-increment)一次,普照源增加一次计数值。

* 基本例子
<div class="counter"></div>
.counter {
  counter-reset: wangxiaoer 2;
  counter-increment: wangxiaoer;
}
.counter::before {
  content: counter(wangxiaoer);
}

* 自动递增列表序号
.reset {
  counter-reset: wangxiaoer;
}
.reset .counter::before {
  content: counters(wangxiaoer, '-');
  counter-increment: wangxiaoer;
}
<div class="reset">
  <div class="counter">我是王小二</div>
  <div class="counter">我是王小三</div>
  <div class="counter">我是王小四</div>
  <div class="counter">我是王小五</div>
</div>

也可以普照自身 也就是counter-increment直接设置在伪元素上
.counter {
  counter-reset: wangxiaoer 2;
}
.counter::before {
  content: counter(wangxiaoer);
  counter-increment: wangxiaoer;
}

如果父子元素都被普照了 普照一次增加1 最后结果是4
.counter {
  counter-reset: wangxiaoer 2;
  counter-increment: wangxiaoer;
}
.counter::before {
  content: counter(wangxiaoer);
  counter-increment: wangxiaoer;
}

一次命名和使用多个计数器的写法
.counter {
  counter-reset: wangxiaoer 2 wangxiaosan 3;
  counter-increment: wangxiaoer wangxiaosan;
}
.counter::before {
  content: counter(wangxiaoer);
}
.counter::after {
  content: counter(wangxiaosan);
}

方法counter()
语法counter(name,style);
我们递增或递减的可以是数字,字母,罗马文
.counter {
  counter-reset: wangxiaoer 2;
  counter-increment: wangxiaoer;
}
.counter::before {
  content: counter(wangxiaoer, lower-roman);
  counter-increment: wangxiaoer 2;
}

方法counter支持级联
.counter {
  counter-reset: wangxiaoer 2 wangxiaosan 3;
  counter-increment: wangxiaoer wangxiaosan;
}
.counter::before {
  content: counter(wangxiaoer) '\A'counter(wangxiaosan);
  white-space: pre-wrap;
}

方法counters() 实现嵌套计数
主要用于处理1.1,1.2,1.3等情况
基本用法
counters(name,string) 1.1的string就是'.'

* 递增目录实现用例
.reset {
  line-height: 1.6;
  padding-left: 20px;
  counter-reset: itemcounter;
  color: #666;
}
.item:before {
  content: counters(itemcounter, '-') '、';
  counter-increment: itemcounter;
}

<div class="reset">
  <div class="item">
    一级标题1
    <div class="reset">
      <div class="item">二级标题1</div>
      <div class="item">
        二级标题2
        <div class="reset">
          <div class="item">三级标题1</div>
          <div class="item">三级标题2</div>
          <div class="item">三级标题3</div>
        </div>
      </div>
      <div class="item">二级标题3</div>
    </div>
  </div>
</div>

* content内容生成的混合特性
q::before {
  content: open-quote url(1.jpg);
}
```

## padding 属性

```txt
* 增加a标签的点击区域而不会对布局产生影响
a {
  padding:.25em 0;
}

* 锚点定位 定位元素距离顶部有一段距离而不影响页面布局
<h3><span id="hash">标题</span></h3>
h3 > span {
  padding-top:58px;
}

* 对于非替换元素的内联元素
padding不会加入行盒高度的计算
margin 和 border 也是如此
不计算高度 但实际上内联盒周围发送了渲染

* padding 属性值不支持负值
padding 支持百分比 无论垂直还是水平均相对于宽度计算
* 头图轮播的自适应例子
.box {
  padding:10% 50%;
  position:relative;
}
.box > img {
  position:absolute;
  width:100%;
  height:100%;
  letf:0;
  top:0;
}

* 内联元素的padding会断行
<span>内联元素的padding会断行</span>
* 内联元素实现正方形需要把"空白幽灵节点"高度变为0；
<span></span>
.box {
  width: 200px;
}
span {
  padding: 50%;
  background-color: gray;
  font-size: 0;
}

* padding与图形绘制
三道杠的绘制
<span class="icon-menu"></span>
.icon-menu {
  display: inline-block;
  width: 140px;
  height: 10px;
  padding: 35px 0;
  border-top: 10px solid;
  border-bottom: 10px solid;
  background-color: currentColor; /* 父元素的color值 */
  background-clip: content-box; /* background-clip属性指定背景绘制区域 */
}
双层圆心效果的实现
<span class="icon-dot"></span>
.icon-dot {
  display: inline-block;
  width: 100px;
  height: 100px;
  padding: 10px;
  border: 10px solid;
  border-radius: 50%;
  background-color: currentColor;
  background-clip: content-box;
}
```

## margins 属性

```txt
* 元素尺寸的相关概念
1.元素尺寸对于元素的border box尺寸包含padding和border jquery中的outerWidth和outerHeight
对于原生中的offseWidth和offsetHeight
2.元素内部尺寸 包含padding但不包含border 也就是元素的padding box尺寸
对应jquery中的innerWidth和innerHeight
对应原生中的clientWidth 和 clientHeight
3.元素外部尺寸 还包含了margin
对应jquery中的outerWidth(true)和outerHeight(true)

* 滚动元素底部留白建议使用margin
* 使用table-cell实现等高布局
* 对于内联元素垂直方向的margin是没有任何影响的
* margin的百分比值无论水平方向还是垂直方向都是相对于宽度计算的

* 关于margin合并
1.块级元素 不包括浮动和绝对定位(浮动或绝对定位可以让元素块状化)
2.只发生在垂直方向

* margin合并的场景
* 相邻兄弟元素的margin合并
.box {
  width: 300px;
  margin: 0 auto;
  border: 1px solid #f00;
}

.box > p {
  width: 200px;
  height: 50px;
  border: 1px solid #f00;
  margin: 10px 0;
}
<div class="box">
  <p>1</p>
  <p>2</p>
</div>

* 父元素和第一个/最后一个子元素合并
虽然在子元素上设置了margin-top 实际上等同于在父元素上设置了margin-top
.box div {
  width: 200px;
  height: 50px;
  margin: 10px 0;
}

.box p {
  margin-top: 200px;
}
<div class="box">
<div>1</div>
<div>
  <p>2222</p>
</div>
</div>
1.阻止margin-top合并
父元素设置为块状格式化上下文(设置overflow:hidden属性)
父元素设置border-top属性
父元素设置了padding-top属性
父元素和子元素之间添加内联元素进行分隔
2.阻止margin-bottom合并
父元素设置为块状格式化上下文(设置overflow:hidden属性)
父元素设置border-bottom属性
父元素设置了padding-bottom属性
父元素和子元素之间添加内联元素进行分隔
父元素设置height min-height max-height
* 空块级元素的margin合并
空块级元素的margin-top和margin-bottom合并在一起
1.阻止空块级元素的合并
设置垂直方向的border
设置垂直方向的padding
里面添加内联元素
设置height 或者 min-heights

* margin合并计算规则
正正取大值
正负值相加
负负最负值
```

- 深入理解 margin:auto;

```txt
* margin:auto填充规则
如果一侧定值 一侧auto 则auto为剩余空间大小
如果两侧均是auto 则平分剩余空间

* 让块级元素右对齐
.son{
  width:200px;
  margin-left:auto;
}

* 让元素垂直居中的方法
1.使用writing-mode改变文档流的方向
.father{
  height:200px;
  writing-mode:vertical-lr;
}
.son{
  height:100px;
  margin:auto;
}

绝对定位元素的margin:auto居中
.father{
  width:300px;
  height:150px;
  position:relative;
}
.son{
  position:absolute;
  top:0;
  right:0;
  bottom:0;
  left:0;
  width:200px;
  height:100px;
  margin:auto;
}

```

- margin 无效情形解析

```txt
1.display计算值inline的非替换元素的垂直margin是无效的
2.对于内联替换元素垂直margin是有效的 并且没有margin合并的问题
3.表格的<tr> 或 <td> 的margin是无效的
4.定位元素的非定位方向的margin 值是无效的
5.定高元素的子元素的margin-bottom或定宽元素的子元素margin-right无效(不会影响父元素外部的元素)
```

## border 属性

```txt
* border 属性不支持百分比
类似的属性还有outline box-shadow text-shadow
* border-width 支持若干关键字
1.thin 1px
2.medium 3px
3.thick 4px
* 实现一个渲染性能最高没有下边框的边框
div{
  border:1px solid;
  border-bottom:0 none;/* 两个写在一起渲染性能最高 */
}
* 当没有指定border-color颜色值的时候,会使用当前元素的color计算值作为边框色
.box {
  border: 10px solid;
  color:red;
}
* 默认background背景图片是相对于padding box 定位的
```

- border 与图形构建

```txt
* 正三角形等图形的绘制
div {
  width: 0;
  border: 10px solid;
  border-color: #f30 transparent transparent;
}
* 一个更加狭长的三角形的绘制
div {
  width: 0;
  border-width: 10px 20px;
  border-style: solid;
  border-color: #f30 transparent transparent;
}

* 一侧开口的三角形
div {
  width: 0;
  border: 10px solid;
  border-color: #f30 #f30 transparent transparent;
}

```

## 内联元素与流

- 字母 x 与 css 世界的基线

```txt
* 凡是涉及到垂直方向的排版或布局都离不开基线
* 字母x的下边缘就是我们的基线
* vertical-align:middle是指基线往上1/2x-height的高度 即小写字母x的交叉点
* ex 是指小写字母的高度 x-height
```

- 内联元素的高度之本 line-height

```txt
* 对于非替换元素的纯内联元素,其可视高度完全由line-height决定
* 替换元素和块级元素的高度不受line-height影响
* 多行文本或替换元素垂直居中
.box {
  width: 300px;
  margin: 0 auto;
  border: 1px solid #f00;
  line-height: 120px; /** 作用于.content中的 '幽灵空白节点' 产生一个高120px宽0的内联元素  */
}

.content {
  display: inline-block;
  line-height: 20px;
  margin: 0 20px;
  vertical-align: middle; /** 调整内联元素的垂直位置   */
}
<div class="box">
  <div class="content">基于行高实现的……</div>
</div>

* line-height的重置
一般可设置为1.6-1.8
body{
  line-height:1.5; /* 利用继承 */
}
input,button{
  line-height:inherit;
}

* 无论内联元素的line-height如何设置,最终父元素的高度都是由数值大的那个line-height决定的

```

## vertical-align

```txt

* 对数值的支持 负值往下偏移 正值往上偏移
vertical-align:baseline等同于vertical-align:0;
* 百分比值相对于line-height的计算值计算的

* vertical-align作用的前提
只能应用于内联元素以及display 值为table-cell的元素
即display计算值为inline,inline-block,inline-table,table-cell;

* 浮动和绝对定位会让元素块状化从而使vertical-align不起作用

* 干掉图片下方的间隙
为img前的'幽灵空白节点导致的'
<div class="box">
  <img src="1.jpg"/>
</div>
1.图片块状化
2.line-height:0;
3.图片设置其他的vertical-align值 top,middle

* margin-top失效
内联元素被'幽灵空白节点'的vertical-align:baseline给限制死了

第一个框没有内联元素 因此基线就是容器的margin下边缘
第二个框有内联元素 因此基线是字母x的下边缘
出现了左边框的下边缘和有边框的字符x底边对齐的现象
.box {
    width: 300px;
    margin: 0 auto;
    border: 1px solid #f00;
    height: 300px;
  }

  .box span {
    margin-top: -200px;
  }
<div class="box">
  <span>span</span>
</div>

* inline-block与baseline;

.dib-baseline{
  display:inline=block;
  width:150px;
  height:150px;
  border:1px solid #cad5eb;
  background-color:#f0f3f9;
}

<span class="dib-baseline"></span>
<span class="dib-baseline">x-baseline</span>

* vertical-align文本属性值

vertical-align: text-top; 盒子的顶部和父级内容区域的顶部对齐(文本)
vertical-align: text-bottom; 盒子的底部和父级内容区域的底部对齐(文本)

* vertical-align 上标下标类属性值
sub 下标
super 上标
<sup> 标签的默认属性值就是super
<super> 标签的默认属性值就是super

* veritcal-align总结
1.top/bottom对齐看行框盒子边缘
2.baseline/middle对齐看字符x

* 实现一个弹出窗的最佳实践
<div class="container">
  <div class="dialog"></div>
</div>

.container {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 5);
  text-align: center;
  font-size: 0;
  white-space: nowrap;
  overflow: auto;
}
.container::after {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
}
.dialog {
  display: inline-block;
  vertical-align: middle;
  text-align: left;
  font-size: 14px;
  white-space: normal;
  border: 1px solid #f00;
  width: 200px;
  height: 200px;
}

```

## 魔鬼属性 float

```txt
* 浮动的本质就是实现文字的环绕效果
* float的特性
1.包裹性
2.块状化并格式化上下文
3.破坏文档流
4.没有任何margin合并
5.可以使父元素高度塌陷

* clear属性
1.clear属性是让自身不能和前面的浮动元素想邻 对后面的浮动元素是不闻不问的
none:默认值 左右浮动来就来
left:左侧抗浮动
right:右侧抗浮动
both:两侧抗浮动

2.clear属性只有块级元素才有效
::after等伪元素默认都是内联水平
借助伪元素清除浮动需要设置display属性值
.clear::after{
  content:'';
  display:table;
  clear:both;
}


```

- css 世界的结界——BFC

```txt
* BFC块级格式化上下文
如果一个元素具备有BFC 不管内部的子元素再怎么翻江倒海都不会影响外部的元素
* 触发BFC的条件
<html>根元素
float值不为none
overflow 的值为auto , scroll 或 hidden
display的值为table-cell,table-caption 和 inline-block中的任何一个
position的值不为relative 和 static

* 侧底清除浮动一般使用overflow：hidden;
* overflow剪裁界线border box;
* <html>和<textarea>标签会默认产生滚动条
去除页面的默认滚动条(仅适用于PC)
html{
  overflow:hidden;
}

* -webkit- 前缀的浏览器自定义滚动条
整体部分 ::-webkit-scrollbar;
两断按钮 ::-webkit-scrollbar-button;
外层轨道 ::-webkit-scrollbar-track;
内层轨道 ::-webkit-scrollbar-track-piece;
滚动滑块 ::-webkit-scrollbar-thumb;
边角 ::-webkit-scrollbar-corner;

::-webkit-scrollbar {
  /* 血槽宽度 */
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-thumb {
  /* 拖动条  */
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 6px;
}
::-webkit-scrollbar-track {
  /* 背景槽 */
  background-color: #f00;
  border-radius: 6px;
}

* 单行文字溢出点点点
.ell {
  text-overflow:ellipsis;
  white-space:nowrap;
  overflow:hidden;
}

* 最多显示两行 再多就打点
.box {
  width: 50px;
  border: 1px solid #f00;
  height: 300px;
}
.ell-row-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
<p class="box ell-row-2">我我我我我我我我我我我我我我我我</p>

* 实现锚点跳转的两种方式
<a href="#1">发展历程</a>
<a name="1"></a>
<a id="1"></a>

* 如果锚链就是一个简单的# 则定位发生的时候 页面是定位到顶部的
<a href="#">返回顶部</a>

* 两种定位方式的区别
1.url地址锚链定位：让元素定位到浏览器窗口的上边缘
2.focus锚点定位 让元素在浏览器窗体范围内显示即可 不一定是在上边缘

* 锚点定位可以发生在普通的元素上
滚动是由内而外的即外部的窗体也有可能会受到影响

```

## float 的兄弟 position:absolute

```txt
* 当absolute和float同时存在的时候 float属性是无效的
* 元素一旦属性值为absolute或fixed 其display计算值就是block 或 table
* absolute具有包裹性
* 元素position:absolute 的包含块是除始包含块html 百分比宽度要根据它来计算的
* 一个绝对定位元素如果没有任何left/top/right/bottom属性设置 祖先都是非定位元素 那么其位置还是在当前位置
* 仅通过position:absolute和margin偏移实现图标定位
无依赖定位是指不惜要设置left/right/top/bottom
.icon-x{
  position:absolute;
  margin-left:-20px;
  width:20px;
  height:20px;
  background:url(warn.png) no-repeat center;
}

* 如果overflow不是定位元素，同时绝对定位元素和overflow容器之间也没有定位元素,则overflow无法对absolute元素进行剪裁

* absolute与clip
clip:rect(top right bottom left); 不支持百分比

* clip可以对fixed固定定位进行剪裁
普通元素是无法对fiexd固定定位进行剪裁的
如果使用clip属性则可以
.fixed-clip{
  clip: rect(30px 300px 200px 20px);
}

* 隐藏logo的语意化文字
.clip {
  position;absolute;
  clip:rect(0 0 0 0 );
}

* 使用clip进行剪裁的元素其clientWidth 和 clientHeight 包括样式计算的宽高还是原来的大小
非可见部分无法响应点击事件

* absolute 的流体特性
对立方向同时发生定位的时候 宽度自适应于包含块的padding-box
.box{
  position;absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
}
* 当绝对定位元素处于流体特性 使用margin:auto可以使其居中
.element{
  width:300px;
  height:300px;
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
}

* relative最小化影响原则
尽量不使用relative
如果使用务必最小化
<div>
  <div style="position:relative">
    <img src="icon.png"/>
  </div>
  <p></p>
</div>

* postion:fixed;固定定位的包含块是根元素
遵循无依赖固定定位模式,可以将目标元素定位到我们想定位的地方
.son{
  display:inline;
  width:40px;
  height:40px;
  position:fixed;
  margin-left:-40px;
}
```

## 层叠规则

```txt
* z-index并非只对定位元素有效 flex盒子的子元素也可以设置z-index属性
* 内联元素的层叠顺序要比浮动元素和块状元素高
* 层叠黄金准则
1.谁大谁上
2.后来居上
* z-index:auto 里面的元素不受父级影响,直接套用层叠黄金准则
```

## 文本处理

```txt
* font-size与ex,em,rem的关系
1.ex是字符x的高度
2.1em等同于当前元素所在的font-size计算值
3.rem即root em 就是根元素em大小 em相对与当前元素
4.font-size 为0 的字号表现为0;
5.如果字体名包含空格 需要使用引号包起来
font-family: 'Microsoft Yahei' , 'PingFang SC'
6.设置为无衬线字体
body{
  font-family:'Microsoft Yahei' , sans-serif;
}
7.1ch表示一个0字符的宽度
* font-weight
/* 相对于父级元素 */
font-weight：lighter;
font-weight:bolder;

1.font-weight:400 对于normal
2.font-weight:700 对应bold

* font-style
italic 是使用当前字体的倾斜字体
oblique 只是单纯地让文字倾斜

* 实现小型大写字母
font-variant：small-caps;

* 缩写的font属性
font-size 和font-family属性必须同时存在才有效
.font {font:14px 'Microsoft Yahei'}

* 让各个系统使用最佳的字体展示 让网页的字体跟着系统走
html {font:menu;}
body {font-size:16px;}

* @font-face自定义网页字体

* woff2是web开发第一首选的字体
* 自定义字体的写法
@font-face{
  font-family:ICON;
  src:url('icon.eot');
  src:local('@'),
      url('icon.woff2') format("woff2"),
      url('icon.woff') format("woff"),
      url('icon.ttf')
}

* @font-face中的font-style可以控制正常情况下和斜体情况下展示不同的字体

@font-face {
  font-family:'I';
  font-style:normal;
  src:local('FZYaoti');
}

@font-face {
  font-family:'I';
  font-style:italic;
  src:local('FZYaoti');
}

i{
  font-family:I;
}

* 指定引号使用其他的字体 unicode-range
@font-face{
  font-family:quote;
  src:local('SimSun');
  unicode-range: U+201c,U+201d;
}

.font{
  font-family:quote,'Microsoft Yahei';
}

* letter-spacing作用于所有字符 word-spacing仅作用于空格字符

* word-break:break-all的作用是所有的都换行
* word-wrap:break-word如果一行文字有可换行的点这这些点换行不会打断连续的英文单词，会有不对齐的情况

* white-space 换行和空格的控制
环绕：一行文字超过容器宽度的时候，会自动从下一行开始显示
white-space:normal 合并空白字符和换行符
white-space:pre-wrap 空白字符不合并 但只有在换行符的地方换行 允许文本环绕

* 实现全浏览器兼容的两端对齐
.justify {
  text-align:justify;
  text-justify:inter-ideograph;
}

* 对于纯内联元素 垂直方向的padding属性和border属性对原来的布局定位没有任何影响。
* 让上下划线同时出现
a{
  text-decoration: underline overline;
}
* 让输入的字母显示为大写模式
input{
  text-transform: uppercase;
}

* ::first-letter实现首字符变大
.price::first-letter {
  margin-right:5px;
  font-size:xx-large;
  vertical-align: -2px;
}
1.::first-letter生效果的前提
dipaly的值不能是inline table flex
对？号等特殊符号不生效 对空格生效
对::before伪元素生效
并不是对所有属性都生效
属于子元素所有color等属性权重会多一层

* 使用::first-line设置按钮颜色
.btn-normal{
  background-color:currentColor;
}

.btn-normal::first-line{
  color:#fff;
}

* border text-shadow box-shadow等如果不设置颜色 其颜色渲染和color属性一致

```

## 颜色及图片

```txt
* background
1.background 支持多背景
2.background-size(背景尺寸)
3.background-origin 背景出始定位盒子
4.background-clip 背景剪切盒子
background-image:none;
background-position 0% 0%;
background-repeat:repeat;
background-attachment:scroll;
background-color:transparent;
background-size:auto auto;
background-origin:padding-box;
background-clip:border-box;

5.base64图片的渲染性能并不高 只适合尺寸较小的图片

6.高版本的浏览器background-position支持4个值
background-position:right 40px bottom 20px;
距离右边缘40像素 距离底边缘20像素

7.position值百分比的计算公式
positionX = (容器的宽度-图片的宽度)*percentX;
positionY = (容器的宽度-图片的宽度)*percentY;

8.background-repeat与渲染性能
建议把平铺图片设置为100px * 100px;
```

## 用户界面样式

```txt
* outline是不占据任何空间的属性
* 自动填满屏幕剩余空间的运用技巧
.footer{
  height:50px;
}
.footer > p {
  position:absolute;
  left:0;
  right:0;
  text-align:center;
  padding:15px 0;
  background-color:#a0b3d6;
  outline:9999px solid #a0b3d6;
  clip:rect(0 9999px 9999px 0);
}

* 自定义光标
.cur-none{
  cursor:url(transparent.cur);
}

```

## 流向的改变

- direction 属性

```txt
* direction属性
1.direction:ltr; // 默认值 left-to-right;
2.direction:rtl; right-to-left;
3.可以改变替换元素或者inline-block / inline-table元素的水平呈现顺序

* 让单行溢出的文字前面的文字省略
.ell {
  width:240px;
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
  direction:rtl;
}

* unicode-bidi: bidi-override; 改变文字排列的顺序
.rtl {
  direction:rtl;
  unicode-bidi:bidi-override;
}

```

- 改变纵横规则的 writing-mode

```txt
* writing-mode可以用来实现文字竖向呈现 如果中国的古诗文
* css3中对应的语法
1.writing-mode: horizontal-tb; // 元素从上往下堆叠
2.writing-mode: vertical-rl; // 垂直方向 从右往左
3.writing-mode: vertical-lr; // 垂直方向 从左往右

* writing-mode 把水平流改为垂直流 原本适用于水平流的规则在垂直流适用
* 普通元素可以使用margin:auto 实现垂直居中
* 可以使用text-align:center实现图片垂直居中

```
