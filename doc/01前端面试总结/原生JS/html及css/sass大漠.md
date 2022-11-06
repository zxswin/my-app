## Sass 和 SCSS 有什么区别

```js
// Sass 和 SCSS 其实是同一种东西，我们平时都称之为 Sass，两者之间不同之处有以下两点：

// 文件扩展名不同，Sass 是以“.sass”后缀为扩展名，而 SCSS 是以“.scss”后缀为扩展名
// 语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 SCSS 的语法书写和我们的 CSS 语法书写方式非常类似。
```

```scss
// SCSS 语法

$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}

// 编译出来的 CSS
body {
  font: 100% Helvetica, sans-serif;
  color: #333;
}
```

## 局部变量和全局变量

```scss
//SCSS
$color: orange !default; //定义全局变量(在选择器、函数、混合宏...的外面定义的变量为全局变量)
.block {
  color: $color; //调用全局变量
}
em {
  $color: red; //定义局部变量
  a {
    color: $color; //调用局部变量
  }
}
span {
  color: $color; //调用全局变量
}
```

## 嵌套-选择器嵌套

```scss
nav {
  a {
    color: red;

    header & {
      color: green;
    }
  }
}
```

## 嵌套-属性嵌套

```js
.box {
  border: {
   top: 1px solid red;
   bottom: 1px solid green;
  }
}
```

## 嵌套-伪类嵌套

```scss
.clearfix {
  &:before,
  &:after {
    content: '';
    display: table;
  }
  &:after {
    clear: both;
    overflow: hidden;
  }
}
```

```css
/* 编译出来的 CSS： */

clearfix:before,
.clearfix:after {
  content: '';
  display: table;
}
.clearfix:after {
  clear: both;
  overflow: hidden;
}
```

## 混合宏-声明混合宏

- 不带参数混合宏：

```scss
/* 在 Sass 中，使用“@mixin”来声明一个混合宏。如： */
@mixin border-radius {
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
```

- 带参数混合宏：

```scss
@mixin border-radius($radius: 5px) {
  -webkit-border-radius: $radius;
  border-radius: $radius;
}
```

- 复杂的混合宏：

```scss
@mixin box-shadow($shadow...) {
  @if length($shadow) >= 1 {
    @include prefixer(box-shadow, $shadow);
  } @else {
    $shadow: 0 0 4px rgba(0, 0, 0, 0.3);
    @include prefixer(box-shadow, $shadow);
  }
}
```

## 混合宏-调用混合宏

```scss
// 定义混合宏
@mixin border-radius {
  -webkit-border-radius: 3px;
  border-radius: 3px;
}

// 关键词“@include”来调用声明好的混合宏
// 使用混合宏
button {
  @include border-radius;
}
```

## 混合宏的参数--传一个不带值的参数

```scss
// 在混合宏中，可以传一个不带任何值的参数，比如：

@mixin border-radius($radius) {
  -webkit-border-radius: $radius;
  border-radius: $radius;
}

// 在调用的时候可以给这个混合宏传一个参数值：

.box {
  @include border-radius(3px);
}
```

## 混合宏的参数--传一个带值的参数

```scss
// 在 Sass 的混合宏中，还可以给混合宏的参数传一个默认值，例如：

@mixin border-radius($radius: 3px) {
  -webkit-border-radius: $radius;
  border-radius: $radius;
}

// 调用混合宏
.btn {
  @include border-radius;
}

// 调用混合宏带参数
.box {
  @include border-radius(50%);
}
```

## 混合宏的参数--传多个参数

```scss
@mixin center($width, $height) {
  width: $width;
  height: $height;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -($height) / 2;
  margin-left: -($width) / 2;
}

// 调用混合宏
.box-center {
  @include center(500px, 300px);
}
```

```scss
// 有一个特别的参数“…”。当混合宏传的参数过多之时，可以使用参数来替代，如：

@mixin box-shadow($shadows...) {
  @if length($shadows) >= 1 {
    -webkit-box-shadow: $shadows;
    box-shadow: $shadows;
  } @else {
    $shadows: 0 0 2px rgba(#000, 0.25);
    -webkit-box-shadow: $shadow;
    box-shadow: $shadow;
  }
}

// 实际调用
.box {
  @include box-shadow(0 0 1px rgba(#000, 0.5), 0 0 2px rgba(#000, 0.2));
}
```

## 混合宏的参数--混合宏的不足

```scss
// 最大的不足之处是会生成冗余的代码块。比如在不同的地方调用一个相同的混合宏时。
// 并不能智能的将相同的样式代码块合并在一起。这也是 Sass 的混合宏最不足之处。
@mixin border-radius {
  -webkit-border-radius: 3px;
  border-radius: 3px;
}

.box {
  @include border-radius;
  margin-bottom: 5px;
}

.btn {
  @include border-radius;
}
```

```css
/* 编译后 */
.box {
  -webkit-border-radius: 3px;
  border-radius: 3px;
  margin-bottom: 5px;
}

.btn {
  -webkit-border-radius: 3px;
  border-radius: 3px;
}
```

## 扩展/继承

```scss
// 通过关键词 “@extend”来继承已存在的类样式块，从而实现代码的继承

.btn {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
  @extend .btn;
}

.btn-second {
  background-color: orange;
  color: #fff;
  @extend .btn;
}
```

```css
/* 编译之后 */
.btn,
.btn-primary,
.btn-second {
  border: 1px solid #ccc;
  padding: 6px 10px;
  font-size: 14px;
}

.btn-primary {
  background-color: #f36;
  color: #fff;
}

.btn-second {
  background-clor: orange;
  color: #fff;
}
```

## 占位符 %placeholder

```scss
//  %placeholder 声明的代码，如果不被 @extend 调用的话，不会产生任何代码。
%mt5 {
  margin-top: 5px;
}
%pt5 {
  padding-top: 5px;
}

.btn {
  @extend %mt5;
  @extend %pt5;
}

.block {
  @extend %mt5;

  span {
    @extend %pt5;
  }
}
```

```css
/* 编译后 */
.btn,
.block {
  margin-top: 5px;
}

.btn,
.block span {
  padding-top: 5px;
}
```

## 混合宏 VS 继承 VS 占位符

```scss
// 如果你的代码块中涉及到变量，建议使用混合宏来创建相同的代码块。
// 如果你的代码块不需要专任何变量参数，而且有一个基类已在文件中存在，那么建议使用 Sass 的继承。
```

## 插值#{}

```scss
$properties: (margin, padding);
@mixin set-value($side, $value) {
  @each $prop in $properties {
    #{$prop}-#{$side}: $value;
  }
}
.login-box {
  @include set-value(top, 14px);
}
```

```css
/* 编译后  */
.login-box {
  margin-top: 14px;
  padding-top: 14px;
}
```

```scss
@mixin generate-sizes($class, $small, $medium, $big) {
  .#{$class}-small {
    font-size: $small;
  }
  .#{$class}-medium {
    font-size: $medium;
  }
  .#{$class}-big {
    font-size: $big;
  }
}
@include generate-sizes('header-text', 12px, 20px, 40px);
```

```css
/* 编译后 */
.header-text-small {
  font-size: 12px;
}
.header-text-medium {
  font-size: 20px;
}
.header-text-big {
  font-size: 40px;
}
```

- 可以使用 @extend 中使用插值

```scss
// 不能在 mixin 中调用
%updated-status {
  margin-top: 20px;
  background: #f00;
}
.selected-status {
  font-weight: bold;
}
$flag: 'status';
.navigation {
  @extend %updated-#{$flag};
  @extend .selected-#{$flag};
}
```

```css
/* 编译后 */
.navigation {
  margin-top: 20px;
  background: #f00;
}
.selected-status,
.navigation {
  font-weight: bold;
}
```

## 数据类型

```scss
// 数字: 如，1、 2、 13、 10px；
// 字符串：有引号字符串或无引号字符串，如，"foo"、 'bar'、 baz；
// 颜色：如，blue、 #04a3f9、 rgba(255,0,0,0.5)；
// 布尔型：如，true、 false；
// 空值：如，null；
// 值列表：用空格或者逗号分开，如，1.5em 1em 0 2em 、 Helvetica, Arial, sans-serif。
```

## 字符串

```scss
@mixin firefox-message($selector) {
  body.firefox #{$selector}:before {
    content: 'Hi, Firefox users!';
  }
}
@include firefox-message('.header');
```

```css
/* 编译为： */
body.firefox .header:before {
  content: 'Hi, Firefox users!';
}
```

## 值列表

```scss
// 所谓值列表 (lists) 是指 Sass 如何处理 CSS 中：
// margin: 10px 15px 0 0

// 或者：
// font-face: Helvetica, Arial, sans-serif
```

```scss
// nth函数（nth function） 可以直接访问值列表中的某一项；
// join函数（join function） 可以将多个值列表连结在一起；
// append函数（append function） 可以在值列表中添加值；
// @each规则（@each rule） 则能够给值列表中的每个项目添加样式。
```

## 加法

```scss
// 加法运算是 Sass 中运算中的一种，在变量或属性中都可以做加法运算。如：
.box {
  width: 20px + 8in;
}
```

```css
/* 编译出来的 CSS: */

.box {
  width: 788px;
}
```

```scss
// 但对于携带不同类型的单位时，在 Sass 中计算会报错，如下例所示：

.box {
  width: 20px + 1em;
}
```

## 减法

```scss
$full-width: 960px;
$sidebar-width: 200px;

.content {
  width: $full-width - $sidebar-width;
}
```

```css
/* 编译后 */
.content {
  width: 760px;
}
```

```scss
// 同样的，运算时碰到不同类型的单位时，编译也会报错
$full-width: 960px;

.content {
  width: $full-width - 1em;
}
```

## 乘法

```scss
// 两个值单位相同时，只需要为一个数值提供单位即可。
.box {
  width: 10px * 2;
}
```

```scss
// 编译出来的 CSS:
.box {
  width: 20px;
}
```

```css
/* Sass 的乘法运算和加法、减法运算一样，在运算中有不同类型的单位时，也将会报错。 */
.box {
  width: 20px * 2em;
}
```

## 除法

```scss
//SCSS
p {
  font: 10px/8px; // 纯 CSS，不是除法运算
  $width: 1000px;
  width: $width/2; // 使用了变量，是除法运算
  width: round(1.5) / 2; // 使用了函数，是除法运算
  height: (500px/2); // 使用了圆括号，是除法运算
  margin-left: 5px + 8px/2px; // 使用了加（+）号，是除法运算
}
```

```scss
.box {
  width: (100px / 2);
}

// 编译出来的 CSS 如下：

.box {
  width: 50px;
}
```

```scss
// 如果两个值带有相同的单位值时，除法运算之后会得到一个不带单位的数值。
.box {
  width: (1000px / 100px);
}

// 编译出来的CSS如下：
.box {
  width: 10;
}
```

## 变量计算

```scss
$content-width: 720px;
$sidebar-width: 220px;
$gutter: 20px;

.container {
  width: $content-width + $sidebar-width + $gutter;
  margin: 0 auto;
}

// 编译出来的CSS
.container {
  width: 960px;
  margin: 0 auto;
}
```

## 数字运算

```scss
.box {
  width: ((220px + 720px) - 11 * 20) / 12;
}

// 编译出来的 CSS:
.box {
  width: 60px;
}
```

## 颜色运算

```scss
p {
  color: #010203 + #040506;
}
// 计算公式为 01 + 04 = 05、02 + 05 = 07 和 03 + 06 = 09， 并且被合成为：
// 如此编译出来的 CSS 为：
p {
  color: #050709;
}
// 算数运算也能将数字和颜色值 一起运算，同样也是分段运算的。如：
p {
  color: #010203 * 2;
}
// 计算公式为 01 * 2 = 02、02 * 2 = 04 和 03 * 2 = 06， 并且被合成为：
p {
  color: #020406;
}
```

## 字符运算

```scss
// 在 Sass 中可以通过加法符号“+”来对字符串进行连接。例如：
$content: 'Hello' + '' + 'Sass!';
.box:before {
  content: ' #{$content} ';
}

// 编译出来的CSS：
.box:before {
  content: ' Hello Sass! ';
}

// 除了在变量中做字符连接运算之外，还可以直接通过 +，把字符连接在一起：
div {
  cursor: e + -resize;
}

// 编译出来的CSS:
div {
  cursor: e-resize;
}

p:before {
  content: 'Foo ' + Bar;
  font-family: sans- + 'serif';
}

// 编译出来的 CSS：
p:before {
  content: 'Foo Bar';
  font-family: sans-serif;
}
```

## @if

```scss
// @if 指令是一个 SassScript，它可以根据条件来处理样式块，如果条件为 true 返回一个样式块，反之 false 返回另一个样式块。在 Sass 中除了 @if 之，还可以配合 @else if 和 @else 一起使用。

@mixin blockOrHidden($boolean: true) {
  @if $boolean {
    @debug '$boolean is #{$boolean}';
    display: block;
  } @else {
    @debug '$boolean is #{$boolean}';
    display: none;
  }
}

.block {
  @include blockOrHidden;
}

.hidden {
  @include blockOrHidden(false);
}

// 编译出来的CSS:
.block {
  display: block;
}

.hidden {
  display: none;
}
```

## @for 循环（上）

```scss
// 在 Sass 的 @for 循环中有两种方式：
// @for $i from <start> through <end>
// @for $i from <start> to <end>
// $i 表示变量
// start 表示起始值
// end 表示结束值
// 这两个的区别是关键字 through 表示包括 end 这个数，而 to 则不包括 end 这个数。
```

```scss
// 先来个使用 through 关键字的例子：

@for $i from 1 through 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}

// 编译出来的 CSS:
.item-1 {
  width: 2em;
}

.item-2 {
  width: 4em;
}

.item-3 {
  width: 6em;
}
```

```scss
// 再来个 to 关键字的例子：
@for $i from 1 to 3 {
  .item-#{$i} {
    width: 2em * $i;
  }
}

// 编译出来的 CSS:
.item-1 {
  width: 2em;
}

.item-2 {
  width: 4em;
}
```

## @for 循环 （下）

```scss
// @for应用在网格系统生成各个格子 class 的代码：
//SCSS
$grid-prefix: span !default;
$grid-width: 60px !default;
$grid-gutter: 20px !default;

%grid {
  float: left;
  margin-left: $grid-gutter / 2;
  margin-right: $grid-gutter / 2;
}
@for $i from 1 through 12 {
  .#{$grid-prefix}#{$i} {
    width: $grid-width * $i + $grid-gutter * ($i - 1);
    @extend %grid;
  }
}

// 编译出来的 CSS:
.span1,
.span2,
.span3,
.span4,
.span5,
.span6,
.span7,
.span8,
.span9,
.span10,
.span11,
.span12 {
  float: left;
  margin-left: 10px;
  margin-right: 10px;
}

.span1 {
  width: 60px;
}

.span2 {
  width: 140px;
}

.span3 {
  width: 220px;
}

.span4 {
  width: 300px;
}

.span5 {
  width: 380px;
}

.span6 {
  width: 460px;
}

.span7 {
  width: 540px;
}

.span8 {
  width: 620px;
}

.span9 {
  width: 700px;
}

.span10 {
  width: 780px;
}

.span11 {
  width: 860px;
}

.span12 {
  width: 940px;
}
```

## @while 循环

```scss
// 只要 @while 后面的条件为 true 就会执行。
//SCSS
$types: 4;
$type-width: 20px;

@while $types > 0 {
  .while-#{$types} {
    width: $type-width + $types;
  }
  $types: $types - 1;
}

// 编译出来的 CSS
.while-4 {
  width: 24px;
}

.while-3 {
  width: 23px;
}

.while-2 {
  width: 22px;
}

.while-1 {
  width: 21px;
}
```

## @each 循环

```scss
// @each 循环就是去遍历一个列表，然后从列表中取出对应的值。
// @each 循环指令的形式：
// @each $var in <list>

$list: adam john wynn mason kuroir; //$list 就是一个列表

@mixin author-images {
  @each $author in $list {
    .photo-#{$author} {
      background: url('/images/avatars/#{$author}.png') no-repeat;
    }
  }
}

.author-bio {
  @include author-images;
}

// 编译出 CSS:

.author-bio .photo-adam {
  background: url('/images/avatars/adam.png') no-repeat;
}
.author-bio .photo-john {
  background: url('/images/avatars/john.png') no-repeat;
}
.author-bio .photo-wynn {
  background: url('/images/avatars/wynn.png') no-repeat;
}
.author-bio .photo-mason {
  background: url('/images/avatars/mason.png') no-repeat;
}
.author-bio .photo-kuroir {
  background: url('/images/avatars/kuroir.png') no-repeat;
}
```

## 字符串函数-unquote()函数

```scss
// unquote($string)：删除字符串中的引号；
// quote($string)：给字符串添加引号。
// unquote( ) 函数只能删除字符串最前和最后的引号（双引号或单引号），而无法删除字符串中间的引号。

.test1 {
  content: unquote('Hello Sass!');
}
.test2 {
  content: unquote("'Hello Sass!");
}
.test3 {
  content: unquote("I'm Web Designer");
}
.test4 {
  content: unquote("'Hello Sass!'");
}
.test5 {
  content: unquote('"Hello Sass!"');
}
.test6 {
  content: unquote(Hello Sass);
}

// 编译后的 css 代码：
//CSS
.test1 {
  content: Hello Sass!;
}

.test2 {
  content: 'Hello Sass!; }

.test3 {
  content: I' m Web Designer;
}

.test4 {
  content: 'Hello Sass!';
}

.test5 {
  content: 'Hello Sass!';
}

.test6 {
  content: Hello Sass;
}
```

## 字符串函数-quote()函数

```scss
// quote() 函数刚好与 unquote() 函数功能相反，主要用来给字符串添加引号。如果字符串，自身带有引号会统一换成双引号 ""。

//SCSS
.test1 {
  content: quote('Hello Sass!');
}
.test2 {
  content: quote('Hello Sass!');
}
.test3 {
  content: quote(ImWebDesigner);
}
.test4 {
  content: quote(' ');
}

// 编译出来的 css 代码：
//CSS
.test1 {
  content: 'Hello Sass!';
}
.test2 {
  content: 'Hello Sass!';
}
.test3 {
  content: 'ImWebDesigner';
}
.test4 {
  content: '';
}
```

## 字符串函数-To-upper-case()、To-lower-case()

```scss
// 1、To-upper-case()
// To-upper-case() 函数将字符串小写字母转换成大写字母。
//SCSS
.test {
  text: to-upper-case(aaaaa);
  text: to-upper-case(aA-aAAA-aaa);
}
// 编译出来的 css 代码：
//CSS
.test {
  text: AAAAA;
  text: AA-AAAA-AAA;
}
```

```scss
// 2、To-lower-case()
// To-lower-case() 函数 与 To-upper-case() 刚好相反，将字符串转换成小写字母：

//SCSS
.test {
  text: to-lower-case(AAAAA);
  text: to-lower-case(aA-aAAA-aaa);
}

// 编译出来的 css 代码：
//CSS
.test {
  text: aaaaa;
  text: aa-aaaa-aaa;
}
```

## Sass 中的数字函数

```scss
// Sass 中的数字函数提要针对数字方面提供一系列的函数功能：
// percentage($value)：将一个不带单位的数转换成百分比值；
// round($value)：将数值四舍五入，转换成一个最接近的整数；
// ceil($value)：将大于自己的小数转换成下一位整数；
// floor($value)：将一个数去除他的小数部分；
// abs($value)：返回一个数的绝对值；
// min($numbers…)：找出几个数值之间的最小值；
// max($numbers…)：找出几个数值之间的最大值；
// random(): 获取随机数
```

## 数字函数-percentage()

```scss
// 1、percentage()
// percentage()函数主要是将一个不带单位的数字转换成百分比形式：

// percentage(.2)  20%
// percentage(2px / 10px) 20%
// percentage(2em / 10em) 20%

.footer {
  width: percentage(0.2);
}

// 编译后的 css 代码：
.footer {
  width: 20%;
}
```

## 数字函数-round()函数

```scss
// round() 函数可以将一个数四舍五入为一个最接近的整数：

// >> round(12.3)
// 12
// >> round(12.5)
// 13
// >> round(1.49999)
// 1
// >> round(2.0)
// 2
// >> round(20%)
// 20%
// >> round(2.2%)
// 2%
// >> round(3.9em)
// 4em
// >> round(2.3px)
// 2px
// >> round(2px / 3px)
// 1
// >> round(1px / 3px)
// 0
// >> round(3px / 2em)
// 2px/em

.footer {
  width: round(12.3px);
}
// 编译后的 css 代码：
.footer {
  width: 12px;
}
```

## 数字函数-ceil()函数

```scss
// ceil() 函数将一个数转换成最接近于自己的整数，会将一个大于自身的任何小数转换成大于本身 1 的整数。也就是只做入，不做舍的计算：

// >> ceil(2.0)
// 2
// >> ceil(2.1)
// 3
// >> ceil(2.6)
// 3
// >> ceil(2.3%)
// 3%
// >> ceil(2.3px)
// 3px
// >> ceil(2.5px)
// 3px
// >> ceil(2px / 3px)
// 1
// >> ceil(2% / 3px)
// 1%/px
// >> ceil(1em / 5px)
// 1em/px

.footer {
  width: ceil(12.3px);
}

// 编译后的 css 代码：
.footer {
  width: 13px;
}
```

## 数字函数-floor()函数

```scss
// floor() 函数刚好与 ceil() 函数功能相反，其主要将一个数去除其小数部分，并且不做任何的进位。也就是只做舍，不做入的计算：

// >> floor(2.1)
// 2
// >> floor(2.5)
// 2
// >> floor(3.5%)
// 3%
// >> floor(10.2px)
// 10px
// >> floor(10.8em)
// 10em
// >> floor(2px / 10px)
// 0
// >> floor(3px / 1em)
// 3px/em

.footer {
  width: floor(12.3px);
}

// 编译后的 css 代码：
.footer {
  width: 12px;
}
```

## 数字函数-abs()函数

```scss
// abs( ) 函数会返回一个数的绝对值。

// >> abs(10)
// 10
// >> abs(-10)
// 10
// >> abs(-10px)
// 10px
// >> abs(-2em)
// 2em
// >> abs(-.5%)
// 0.5%
// >> abs(-1px / 2px)
// 0.5

.footer {
  width: abs(-12.3px);
}

// 编译后的 css 代码：
.footer {
  width: 12.3px;
}
```

## 数字函数-min()函数、max()函数

```scss
// min()函数

// min() 函数功能主要是在多个数之中找到最小的一个，这个函数可以设置任意多个参数：

// >> min(1,2,1%,3,300%)
// 1%
// >> min(1px,2,3px)
// 1px
// >> min(1em,2em,6em)
// 1em
```

```scss
// max()函数

// max() 函数和 min() 函数一样，不同的是，max() 函数用来获取一系列数中的最大那个值：

// >> max(1,5)
// 5
// >> max(1px,5px)
// 5px
```

## 数字函数-random()函数

```scss
// random() 函数是用来获取一个随机数：

// >> random()
// 0.03886
// >> random()
// 0.66527
// >> random()
// 0.8125
// >> random()
// 0.26839
// >> random()
// 0.85063
```

## 列表函数简介

```scss
// 列表函数主要包括一些对列表参数的函数使用，主要包括以下几种：

// length($list)：返回一个列表的长度值；
// nth($list, $n)：返回一个列表中指定的某个标签值
// join($list1, $list2, [$separator])：将两个列给连接在一起，变成一个列表；
// append($list1, $val, [$separator])：将某个值放在列表的最后；
// zip($lists…)：将几个列表结合成一个多维的列表；
// index($list, $value)：返回一个值在列表中的位置值。
```

## length()函数

```scss
// length() 函数主要用来返回一个列表中有几个值，简单点说就是返回列表清单中有多少个值：
// length() 函数中的列表参数之间使用空格隔开，不能使用逗号，否则函数将会出错：
// >> length(10px)
// 1
// >> length(10px 20px (border 1px solid) 2em)
// 4
// >> length(border 1px solid)
// 3
```

## nth()函数

```scss
// 语法:

// nth($list,$n)
// nth() 函数用来指定列表中某个位置的值。不过在 Sass 中，nth() 函数和其他语言不同，1 是指列表中的第一个标签值，2 是指列给中的第二个标签值，依此类推。如：

// >> nth(10px 20px 30px,1)
// 10px
// >> nth((Helvetica,Arial,sans-serif),2)
// "Arial"
// >> nth((1px solid red) border-top green,1)
// (1px "solid" #ff0000)
```

## join()函数

```scss
// join() 函数是将两个列表连接合并成一个列表。

// >> join(10px 20px, 30px 40px)
// (10px 20px 30px 40px)
// >> join((blue,red),(#abc,#def))
// (#0000ff, #ff0000, #aabbcc, #ddeeff)
// >> join((blue,red),(#abc #def))
// (#0000ff, #ff0000, #aabbcc, #ddeeff)
```

```scss
// 不过 join() 只能将两个列表连接成一个列表，如果直接连接两个以上的列表将会报错：

// >> join((blue red),(#abc, #def),(#dee #eff))
// SyntaxError: $separator: (#ddeeee #eeffff) is not a string for `join'
// 但很多时候不只碰到两个列表连接成一个列表，这个时候就需要将多个 join() 函数合并在一起使用：

// >> join((blue red), join((#abc #def),(#dee #eff)))
// (#0000ff #ff0000 #aabbcc #ddeeff #ddeeee #eeffff)
// 在 join() 函数中还有一个很特别的参数 $separator，这个参数主要是用来给列表函数连接列表值是，使用的分隔符号，默认值为 auto。

// join() 函数中 $separator 除了默认值 auto 之外，还有 comma 和 space 两个值，其中 comma 值指定列表中的列表项值之间使用逗号（,）分隔，space 值指定列表中的列表项值之间使用空格（ ）分隔。

// 在 join() 函数中除非明确指定了 $separator值，否则将会有多种情形发生：

// 如果列表中的第一个列表中每个值之间使用的是逗号（,），那么 join() 函数合并的列表中每个列表项之间使用逗号,分隔：

// >> join((blue, red, #eff),(green orange))
// (#0000ff, #ff0000, #eeffff, #008000, #ffa500)
// 但当第一个列表中只有一个列表项，那么 join() 函数合并的列表项目中每个列表项目这间使用的分隔符号会根据第二个列表项中使用的，如果第二列表项中使用是,分隔，则使用逗号分隔；如果第二列项之间使用的空格符，则使用空格分隔：

// >> join(blue,(green, orange))
// (#0000ff, #008000, #ffa500)
// >> join(blue,(green orange))
// (#0000ff #008000 #ffa500)
// 如果列表中的第一个列表中每个值之间使用的是空格，那么 join() 函数合并的列表中每个列表项之间使用空格分隔：

// >> join((blue green),(red,orange))
// (#0000ff #008000 #ff0000 #ffa500)
// >> join((blue green),(red orange))
// (#0000ff #008000 #ff0000 #ffa500)
// 如果当两个列表中的列表项小于1时，将会以空格分隔：

// >> join(blue,red)
// (#0000ff #ff0000)
// 如此一来，会有多种情形发生，造成使用混乱的情形，如果你无法记得，什么时候会是用逗号分隔合并的列表项，什么时候是使用空格分隔合并 的列表项，在些建议大家使用 join() 函数合并列表项的时候就明确指定 $separator 参数，用来指定合并的列表中使用什么方式来分隔列表项：

// >> join(blue,red,comma)
// (#0000ff, #ff0000)
// >> join(blue,red,space)
// (#0000ff #ff0000)
// >> join((blue green),(red,orange),comma)
// (#0000ff, #008000, #ff0000, #ffa500)
// >> join((blue green),(red,orange),space)
// (#0000ff #008000 #ff0000 #ffa500)
// >> join((blue, green),(red,orange),comma)
// (#0000ff, #008000, #ff0000, #ffa500)
// >> join((blue, green),(red,orange),space)
// (#0000ff #008000 #ff0000 #ffa500)
// >> join(blue,(red,orange),comma)
// (#0000ff, #ff0000, #ffa500)
// >> join(blue,(red,orange),space)
// (#0000ff #ff0000 #ffa500)
// >> join(blue,(red orange),comma)
// (#0000ff, #ff0000, #ffa500)
// >> join(blue,(red orange),space)
// (#0000ff #ff0000 #ffa500)
```

## append()函数

```scss
// append() 函数是用来将某个值插入到列表中，并且处于最末位。

// >> append(10px 20px ,30px)
// (10px 20px 30px)
// >> append((10px,20px),30px)
// (10px, 20px, 30px)
// >> append(green,red)
// (#008000 #ff0000)
// >> append(red,(green,blue))
// (#ff0000 (#008000, #0000ff))
```

```scss
// 如果没有明确的指定 $separator 参数值，其默认值是 auto。

// 如果列表只有一个列表项时，那么插入进来的值将和原来的值会以空格的方式分隔。
// 如果列表中列表项是以空格分隔列表项，那么插入进来的列表项也将以空格分隔；
// 如果列表中列表项是以逗号分隔列表项，那么插入进来的列表项也将以逗号分隔。
// 当然，在 append() 函数中，可以显示的设置 $separator 参数，

// 如果取值为 comma 将会以逗号分隔列表项
// 如果取值为 space 将会以空格分隔列表项
// >> append((blue green),red,comma)
// (#0000ff, #008000, #ff0000)
// >> append((blue green),red,space)
// (#0000ff #008000 #ff0000)
// >> append((blue, green),red,comma)
// (#0000ff, #008000, #ff0000)
// >> append((blue, green),red,space)
// (#0000ff #008000 #ff0000)
// >> append(blue,red,comma)
// (#0000ff, #ff0000)
// >> append(blue,red,space)
// (#0000ff #ff0000)
```

## zip()函数

```scss
// zip()函数将多个列表值转成一个多维的列表：

// >> zip(1px 2px 3px,solid dashed dotted,green blue red)
// ((1px "solid" #008000), (2px "dashed" #0000ff), (3px "dotted" #ff0000))
```

## index()函数

```scss
// index() 函数类似于索引一样，主要让你找到某个值在列表中所处的位置。在 Sass 中，第一个值就是1，第二个值就是 2，依此类推：

// >> index(1px solid red, 1px)
// 1
// >> index(1px solid red, solid)
// 2
// >> index(1px solid red, red)
// 3
```

```scss
// 在 index() 函数中，如果指定的值不在列表中（没有找到相应的值），那么返回的值将是 false，相反就会返回对应的值在列表中所处的位置。

// >> index(1px solid red,dotted) //列表中没有找到 dotted
// false
// >> index(1px solid red,solid) //列表中找到 solid 值，并且返回他的位置值 2
// 2
```

## Introspection 函数

```scss
// Introspection 函数包括了几个判断型函数：

// type-of($value)：返回一个值的类型
// unit($number)：返回一个值的单位
// unitless($number)：判断一个值是否带有单位
// comparable($number-1, $number-2)：判断两个值是否可以做加、减和合并
```

## Introspection 函数 -type-of()

```scss
// type-of() 函数主要用来判断一个值是属于什么类型：

// 返回值：

// number 为数值型。
// string 为字符串型。
// bool 为布尔型。
// color 为颜色型。

// >> type-of(100)
// "number"
// >> type-of(100px)
// "number"
// >> type-of("asdf")
// "string"
// >> type-of(asdf)
// "string"
// >> type-of(true)
// "bool"
// >> type-of(false)
// "bool"
// >> type-of(#fff)
// "color"
// >> type-of(blue)
// "color"
// >> type-of(1 / 2 = 1)
// "string"
```

## unit()函数

```scss
// unit() 函数主要是用来获取一个值所使用的单位，碰到复杂的计算时，其能根据运算得到一个“多单位组合”的值，不过只充许乘、除运算：
// >> unit(100)
// ""
// >> unit(100px)
// "px"
// >> unit(20%)
// "%"
// >> unit(1em)
// "em"
// >> unit(10px * 3em)
// "em*px"
// >> unit(10px / 3em)
// "px/em"
// >> unit(10px * 2em / 3cm / 1rem)
// "em/rem"
```

```scss
// 但加、减碰到不同单位时，unit() 函数将会报错，除 px 与 cm、mm 运算之外：

// >> unit(1px + 1cm)
// "px"
// >> unit(1px - 1cm)
// "px"
// >> unit(1px + 1mm)
// "px"
// >> unit(10px * 2em - 3cm / 1rem)
// SyntaxError: Incompatible units: 'cm' and 'px*em'.
// >> unit(10px * 2em - 1px / 1rem)
// SyntaxError: Incompatible units: '' and 'em'.
// >> unit(1px - 1em)
// SyntaxError: Incompatible units: 'em' and 'px'.
// >> unit(1px - 1rem)
// SyntaxError: Incompatible units: 'rem' and 'px'.
// >> unit(1px - 1%)
// SyntaxError: Incompatible units: '%' and 'px'.
// >> unit(1cm + 1em)
// SyntaxError: Incompatible units: 'em' and 'cm'.
// unit() 函数对于单位运算相对来说也没有规律，而且有些单位也无法整合成一个单位，对于我们在 CSS 中运用中并不适合，比如：

// >> unit(10px * 3em)
// "em*px"
// >> unit(10px / 3em)
// "px/em"
// >> unit(10px * 2em / 3cm / 1rem)
// "em/rem"
// 换句话说，上面运算出来的单位，对于在 CSS 中使用将是没有任何意义的
```

## unitless()函数

```scss
// unitless() 函数相对来说简单明了些，只是用来判断一个值是否带有单位，如果不带单位返回的值为 true，带单位返回的值为 false：

// >> unitless(100)
// true
// >> unitless(100px)
// false
// >> unitless(100em)
// false
// >> unitless(100%)
// false
// >> unitless(1 /2 )
// true
// >> unitless(1 /2 + 2 )
// true
// >> unitless(1px /2 + 2 )
// false
```

## comparable()函数

```scss
// comparable() 函数主要是用来判断两个数是否可以进行“加，减”以及“合并”。如果可以返回的值为 true，如果不可以返回的值是 false：

// comparable(2px,1px)

// true
// >> comparable(2px,1%)
// false
// >> comparable(2px,1em)
// false
// >> comparable(2rem,1em)
// false
// >> comparable(2px,1cm)
// true
// >> comparable(2px,1mm)
// true
// >>
// comparable(2px,1rem)

// false
// >> comparable(2cm,1mm)
// true
```

## Miscellaneous 函数

```scss
// 在这里把 Miscellaneous 函数称为三元条件函数，主要因为他和 JavaScript 中的三元判断非常的相似。他有两个值，当条件成立返回一种值，当条件不成立时返回另一种值：

// if($condition,$if-true,$if-false)
// 上面表达式的意思是当 $condition 条件成立时，返回的值为 $if-true，否则返回的是 $if-false 值。

// >> if(true,1px,2px)
// 1px
// >> if(false,1px,2px)
// 2px
```

## Map

```scss
// Sass 的 map 长得与 JSON 极其相似：

$map: (
  $key1: value1,
  $key2: value2,
  $key3: value3,
);
```

```scss
$color: (
  default: #fff,
  primary: #22ae39,
  negative: #d9534f,
);
```

```scss
// 还可以让 map 嵌套 map。其实就是 map 的某一个 key 当成 map，
$map: (
  key1: value1,
  key2: (
    key-1: value-1,
    key-2: value-2,
  ),
  key3: value3,
);
```

```scss
// map 的嵌套实用性也非常的强，大家可能有碰到过换皮肤的项目，可能每一套皮肤对应的颜色蛮多的，那么使用此功能来管理颜色的变量就非常的有条理性，便于维护与管理。你可以这样使用：

$theme-color: (
  default: (
    bgcolor: #fff,
    text-color: #444,
    link-color: #39f,
  ),
  primary: (
    bgcolor: #000,
    text-color: #fff,
    link-color: #93f,
  ),
  negative: (
    bgcolor: #f36,
    text-color: #fefefe,
    link-color: #d4e,
  ),
);
```

## Maps 的函数

```scss
// 要在 Sass 中获取变量，或者对 map 做更多有意义的操作，我们必须借助于 map 的函数功能。在 Sass 中 map 自身带了七个函数：

// map-get($map,$key)：根据给定的 key 值，返回 map 中相关的值。
// map-merge($map1,$map2)：将两个 map 合并成一个新的 map。
// map-remove($map,$key)：从 map 中删除一个 key，返回一个新 map。
// map-keys($map)：返回 map 中所有的 key。
// map-values($map)：返回 map 中所有的 value。
// map-has-key($map,$key)：根据给定的 key 值判断 map 是否有对应的 value 值，如果有返回 true，否则返回 false。
// keywords($args)：返回一个函数的参数，这个参数可以动态的设置 key 和 value。
```

## Sass Maps 的函数-map-get($map,$key)

```scss
// map-get($map,$key) 函数的作用是根据 $key 参数，返回 $key 在 $map 中对应的 value 值。如果 $key 不存在 $map中，将返回 null 值。此函数包括两个参数：

// $map：定义好的 map。
// $key：需要遍历的 key。
```

```scss
// 来看一个简单的示例，假设定义了一个 $social-colors 的 map:

$social-colors: (
  dribble: #ea4c89,
  facebook: #3b5998,
  github: #171515,
  google: #db4437,
  twitter: #55acee,
);

// 假设要获取 facebook 键值对应的值 #3b5998，我们就可以使用 map-get() 函数来实现：
.btn-dribble {
  color: map-get($social-colors, facebook);
}

// 编译出来的CSS：
.btn-dribble {
  color: #3b5998;
}
```

```scss
// 我们来看另一种情况，假设 $social-colors 这个 map 没有 $weibo 这个 key:
// 如果 $key 不在 $map 中，不会编译出 CSS
.btn-weibo {
  font-size: 12px;
  color: map-get($social-colors, weibo);
}
// 此时编译出来的是CSS：
.btn-weibo {
  font-size: 12px;
}
```

## Sass Maps 的函数-map-has-key($map,$key)

```scss
// map-has-key($map,$key) 函数将返回一个布尔值。当 $map 中有这个 $key，则函数返回 true，否则返回 false。

@if map-has-key($social-colors, facebook) {
  .btn-facebook {
    color: map-get($social-colors, facebook);
  }
} @else {
  @warn "No color found for faceboo in $social-colors map. Property ommitted.";
}

// 编译出来：

.btn-fackbook {
  color: #3b5998;
}
```

```scss
// 我们可以自定义一个函数，比如colors():
@function colors($color) {
  @if not map-has-key($social-colors, $color) {
    @warn "No color found for `#{$color}` in $social-colors map. Property omitted.";
  }
  @return map-get($social-colors, $color);
}
// 有了这个函数之后，我们就可以这样使用
.btn-dribble {
  color: colors(dribble);
}
.btn-facebook {
  color: colors(facebook);
}
.btn-github {
  color: colors(github);
}
.btn-google {
  color: colors(google);
}
.btn-twitter {
  color: colors(twitter);
}
.btn-weibo {
  color: colors(weibo);
}
// 编译出来的 CSS:

.btn-dribble {
  color: #ea4c89;
}

.btn-facebook {
  color: #3b5998;
}

.btn-github {
  color: #171515;
}

.btn-google {
  color: #db4437;
}

.btn-twitter {
  color: #55acee;
}
```

```scss
// 当然，如果你对 Sass 的指令熟悉的话，上面编译出来的 CSS 可以使用 @each：

@each $social-network, $social-color in $social-colors {
  .btn-#{$social-network} {
    color: colors($social-network);
  }
}
```

## Sass Maps 的函数-map-keys($map)

```scss
// map-keys($map) 函数将会返回 $map 中的所有 key。这些值赋予给一个变量，那他就是一个列表。如：
// map-keys($social-colors);
// 其返回的值为：
// "dribble","facebook","github","google","twitter"

// 换句话说：
// $list: map-keys($social-colors);

// 相当于：
// $list:"dribble","facebook","github","google","twitter";
```

```scss
// 可以做通过 map-keys($map) 来做一个修改：

@function colors($color) {
  $names: map-keys($social-colors);
  @if not index($names, $color) {
    @warn "Waring: `#{$color} is not a valid color name.`";
  }
  @return map-get($social-colors, $color);
}
```

## Sass Maps 的函数-map-values($map)、map-merge($map1,$map2)

```scss
// map-values($map) 函数类似于 map-keys($map) 功能，不同的是 map-values($map )获取的是 $map 的所有 value 值，可以说也将是一个列表。而且，map-values($map) 中如果有相同的 value 也将会全部获取出来。

// 如前面的示例，使用：

// map-values($social-colors)
// 将会返回：

// #ea4c89,#3b5998,#171515,#db4437,#55acee
// 值与值之前同样用逗号分隔。
```

```scss
// map-merge($map1,$map2) 函数是将 $map1 和 $map2 合并，然后得到一个新的 $map。如果你要快速将新的值插入到 $map 中的话，这种方法是最佳方法。假设我们有两个 $map:

$color: (
  text: #f36,
  link: #f63,
  border: #ddd,
  backround: #fff,
);
$typo: (
  font-size: 12px,
  line-height: 1.6,
);

// 如果希望将这两个 $map 合并成一个 map，我们只要这样做：

$newmap: map-merge($color, $typo);
// 将会生成一个新的 map:

$newmap: (
  text: #f36,
  link: #f63,
  border: #ddd,
  background: #fff,
  font-size: 12px,
  line-height: 1.6,
);
```

```scss
// 不过有一点需要注意，如果 $map1 和 $map2 中有相同的 $key 名，那么将 $map2 中的 $key 会取代 $map1 中的：

$color: (
  text: #f36,
  link: #f63,
  border: #ddd,
  backround: #fff,
);
$typo: (
  font-size: 12px,
  line-height: 1.6,
  border: #ccc,
  background: #000,
);
// 执行：

$newmap: map-merge($color, $typo);
// 得到的新 map:

$newmap: (
  text: #f36,
  link: #f63,
  font-size: 12px,
  line-height: 1.6,
  border: #ccc,
  background: #000,
);
```

## Sass Maps 的函数-map-remove($map,$key)、keywords($args)

```scss
// map-remove($map,$key) 函数是用来删除当前 $map 中的某一个 $key，从而得到一个新的 map。其返回的值还是一个 map。他并不能直接从一个 map 中删除另一个 map，仅能通过删除 map 中的某个 key 得到新 map。如：

$map: map-remove($social-colors, dribble);
// 返回的是一个新 map:

$map: (
  facebook: #3b5998,
  github: #171515,
  google: #db4437,
  twitter: #55acee,
);
```

```scss
// 如果删除的 key 并不存在于 $map 中，那么 map-remove() 函数返回的新 map 和以前的 map 一样。

$map: map-remove($social-colors, weibo);
// 返回的值：

$map: (
  dribble: #ea4c89,
  facebook: #3b5998,
  github: #171515,
  google: #db4437,
  twitter: #55acee,
);
```

```scss
// keywords($args) 函数可以说是一个动态创建 map 的函数。可以通过混合宏或函数的参数变创建 map。参数也是成对出现，其中 $args 变成 key(会自动去掉$符号)，而 $args 对应的值就是value。

@mixin map($args...) {
  @debug keywords($args);
}

@include map(
  $dribble: #ea4c89,
  $facebook: #3b5998,
  $github: #171515,
  $google: #db4437,
  $twitter: #55acee
);
// 在命令终端可以看到一个输入的 @debug 信息：
//  DEBUG: (dribble: #ea4c89, facebook: #3b5998, github: #171515, google: #db4437, twitter: #55acee)
```

## RGB 颜色函数-RGB()颜色函数

```scss
// >> rgb(200,40,88) //根据r:200,g:40,b:88计算出一个十六进制颜色值
// #c82858
// >> rgba(#c82858,.65) //根据#c82858的65%透明度计算出一个rgba颜色值
// rgba(200, 40, 88, 0.65)
// >> red(#c82858) //从#c82858颜色值中得到红色值 200
// 200
// >> green(#c82858) //从#c82858颜色值中得到绿色值 40
// 40
// >> blue(#c82858) //从#c82858颜色值中得到蓝色值 88
// 88
// >> mix(#c82858,rgba(200,40,80,.65),.3) //把#c82858和rgba(200,40,88,.65) 两颜色按比例混合得到一个新颜色
// rgba(200, 40, 80, 0.65105)
```

## RGB 颜色函数-RGBA()函数

```scss
//rgba() 函数主要用来将一个颜色根据透明度转换成 rgba 颜色。

// rgba($red,$green,$blue,$alpha)  //将一个rgba颜色转译出来，和未转译的值一样
// rgba($color,$alpha)  //将一个Hex颜色转换成rgba颜色

.rgba {
  color: rgba(255, 51, 102, 0.5);
  background: rgba(255, 165, 0, 0.5);
  border-color: rgba(0, 128, 0, 0.5);
}

.rgba {
  color: rgba($color, 0.5);
  background: rgba($bgColor, 0.5);
  border-color: rgba($borderColor, 0.5);
}
```

## RGB 颜色函数-Red()、Green()、Blue()函数

```scss
// red() 函数非常简单，其主要用来获取一个颜色当中的红色值
// >> red(#f36)
// 255

// green() 函数和 red() 函数一样，用来获取某一个颜色值中 green 的值。
// >> green(#f36)
// 51

// blue() 函数是用来获取某一个颜色值中 blue 的值
// >> blue(#f36)
// 102
```

## RGB 颜色函数-Mix()函数

```scss
// Mix 函数是将两种颜色根据一定的比例混合在一起，生成另一种颜色。
// mix($color-1,$color-2,$weight);

$color1: #a63;
$color2: #fff;
$bgColor1: #f36;
$bgColor2: #e36;
$borderColor1: #c36;
$borderColor2: #b36;

.mix {
  background: mix($bgColor1, $bgColor2, 0.75);
  color: mix($color1, $color2, 0.25);
  border-color: mix($borderColor1, $bgColor2, 0.05);
}
```

## HSL 函数简介

```scss
// hsl($hue,$saturation,$lightness)：通过色相（hue）、饱和度(saturation)和亮度（lightness）的值创建一个颜色；
// hsla($hue,$saturation,$lightness,$alpha)：通过色相（hue）、饱和度(saturation)、亮度（lightness）和透明（alpha）的值创建一个颜色；
// hue($color)：从一个颜色中获取色相（hue）值；
// saturation($color)：从一个颜色中获取饱和度（saturation）值；
// lightness($color)：从一个颜色中获取亮度（lightness）值；
// adjust-hue($color,$degrees)：通过改变一个颜色的色相值，创建一个新的颜色；
// lighten($color,$amount)：通过改变颜色的亮度值，让颜色变亮，创建一个新的颜色；
// darken($color,$amount)：通过改变颜色的亮度值，让颜色变暗，创建一个新的颜色；
// saturate($color,$amount)：通过改变颜色的饱和度值，让颜色更饱和，从而创建一个新的颜色
// desaturate($color,$amount)：通过改变颜色的饱和度值，让颜色更少的饱和，从而创建出一个新的颜色；
// grayscale($color)：将一个颜色变成灰色，相当于desaturate($color,100%);
// complement($color)：返回一个补充色，相当于adjust-hue($color,180deg);
// invert($color)：反回一个反相色，红、绿、蓝色值倒过来，而透明度不变。
```

## HSL 函数-lighten()

```scss
// lighten() 函数会让颜色变得更亮
// darken() 函数会让颜色变得更暗。

.lighten {
  background: lighten($baseColor, 10%);
}
.darken {
  background: darken($baseColor, 10%);
}
```

## HSL 函数-saturate()

```scss
// saturate()、desaturate()这两个函数是通过改变颜色的饱和度来得到一个新的颜色

$baseColor: #ad141e;
.saturate {
  background: saturate($baseColor, 30%); //在原色饱和度基础上增加饱和度
}
.desaturate {
  background: desaturate($baseColor, 30%); //在原色饱和度基础上减少饱和度
}
```

## HSL 函数-adjust-hue()函数

```scss
// 通过调整颜色的色相换算一个新颜色。他需要一个颜色和色相度数值。
// 度数值是在 -360deg 至 360deg 之间，当然了可以是百分数：
$baseColor: #ad141e;
.adjust-hue-deg {
  background: adjust-hue($baseColor, 30deg);
}
.adjust-hue-per {
  background: adjust-hue($baseColor, 30%);
}
```

## HSL 函数-grayscale()函数

```scss
// 这个函数会颜色的饱和度值直接调至 0%，所以此函数与 desaturate($color,100%) 所起的功能是一样的。一般这个函数能将彩色颜色转换成不同程度的灰色。例如：

$baseColor: #ad141e;
.grayscale {
  background: grayscale($baseColor);
}
.desaturate {
  background: desaturate($baseColor, 100%);
}
```

## Opacity 函数简介

```scss
// 系列的透明函数主要用来处理颜色透明度：

// alpha($color) /opacity($color)：获取颜色透明度值；
// rgba($color, $alpha)：改变颜色的透明度值；
// opacify($color, $amount) / fade-in($color, $amount)：使颜色更不透明；
// transparentize($color, $amount) / fade-out($color, $amount)：使颜色更加透明。
```

## Opacity 函数-alpha()、opacity()函数

```scss
// 主要功能是用来获取一个颜色的透明度值。如果颜色没有特别指定透明度，那么这两个函数得到的值都会是 1：

// >> alpha(red)
// 1
// >> alpha(rgba(red,.8))
// 0.8
// >> opacity(red)
// 1
// >> opacity(rgba(red,.8))
// 0.8
```

## Opacity 函数-rgba()函数

```scss
// >> rgba(red,.5)
// rgba(255, 0, 0, 0.5)
// >> rgba(#dedede,.5)
// rgba(222, 222, 222, 0.5)
// >> rgba(rgb(34,45,44),.5)
// rgba(34, 45, 44, 0.5)
// >> rgba(rgba(33,45,123,.2),.5)
// rgba(33, 45, 123, 0.5)
// >> rgba(hsl(33,7%,21%),.5)
// rgba(57, 54, 50, 0.5)
// >> rgba(hsla(33,7%,21%,.9),.5)
// rgba(57, 54, 50, 0.5)
```

## Opacity 函数-opacify()、fade-in()函数

```scss
// 这两个函数是用来对已有颜色的透明度做一个加法运算，会让颜色更加不透明。

// >> opacify(rgba(22,34,235,.6),.2)
// rgba(22, 34, 235, 0.8)
// >> opacify(rgba(22,34,235,.6),.5)
// #1622eb
// >> opacify(hsla(22,34%,23%,.6),.15)
// rgba(79, 53, 39, 0.75)
// >> opacify(hsla(22,34%,23%,.6),.415)
// #4f3527
// >> opacify(red,.15)
// #ff0000
// >> opacify(#89adde,.15)
// #89adde
// >> fade-in(rgba(23,34,34,.5),.15)
// rgba(23, 34, 34, 0.65)
// >> fade-in(rgba(23,34,34,.5),.615)
// #172222
```

## Opacity 函数-transparentize()、 fade-out()函数

```scss
// transparentize() 和 fade-out() 函数所起作用刚好与 opacify() 和 fade-in() 函数相反，让颜色更加的透明。

// >> transparentize(red,.5)
// rgba(255, 0, 0, 0.5)
// >> transparentize(#fde,.9)
// rgba(255, 221, 238, 0.1)
// >> transparentize(rgba(98,233,124,.3),.11)
// rgba(98, 233, 124, 0.19)
// >> transparentize(rgba(98,233,124,.3),.51)
// rgba(98, 233, 124, 0)
// >> fade-out(red,.9)
// rgba(255, 0, 0, 0.1)
// >> fade-out(hsla(98,6%,23%,.5),.1)
// rgba(58, 62, 55, 0.4)
// >> fade-out(hsla(98,6%,23%,.5),.6)
// rgba(58, 62, 55, 0)
```

## 颜色函数实战——七色卡

- html

```html
<ul class="swatches red">
  <li></li>
  ...
  <li></li>
</ul>
<ul class="swatches orange">
  <li></li>
  …
  <li></li>
</ul>
<ul class="swatches yellow">
  <li></li>
  …
  <li></li>
</ul>
<ul class="swatches green">
  <li></li>
  …
  <li></li>
</ul>
<ul class="swatches blue">
  <li></li>
  …
  <li></li>
</ul>
<ul class="swatches purple">
  <li></li>
  …
  <li></li>
</ul>
```

- 定义七色变量

```scss
//定义变量
$redBase: #dc143c;
$orangeBase: saturate(lighten(adjust_hue($redBase, 39), 5), 7); //#f37a16
$yellowBase: saturate(lighten(adjust_hue($redBase, 64), 6), 13); //#fbdc14
$greenBase: desaturate(darken(adjust_hue($redBase, 102), 2), 11); //#73c620
$blueBase: saturate(darken(adjust_hue($redBase, 201), 2), 1); //#12b7d4
$purpleBase: saturate(darken(adjust_hue($redBase, 296), 2), 1); //#a012d4
$blackBase: #777;
$bgc: #fff;
```

- 定义 mixin

```scss
//定义颜色变暗的 mixin
@mixin swatchesDarken($color) {
  @for $i from 1 through 10 {
    $x: $i + 11;
    li:nth-child(#{$x}) {
      $n: $i * 5;
      $bgc: darken($color, $n); //颜色变暗
      background-color: $bgc;
      &:hover:before {
        //hover状态显示颜色编号
        content: '#{$bgc}';
        color: lighten($bgc, 40);
        font-family: verdana;
        font-size: 8px;
        padding: 2px;
      }
    }
  }
}
//定义颜色变亮的 mixin
@mixin swatchesLighten($color) {
  @for $i from 1 through 10 {
    $x: 11-$i;
    li:nth-child(#{$x}) {
      $n: $i * 5;
      $bgc: lighten($color, $n);
      background-color: $bgc;
      &:hover:before {
        content: '#{$bgc}';
        color: darken($bgc, 40);
        font-family: verdana;
        font-size: 8px;
        padding: 2px;
      }
    }
  }
}
```

- 第三步、调用 mixin

```scss
.swatches li {
  width: 4.7619047619%;
  float: left;
  height: 60px;
  list-style: none outside none;
}

ul.red {
  @include swatchesLighten($redBase);
  @include swatchesDarken($redBase);
  li:nth-child(11) {
    background-color: $redBase;
  }
}

ul.orange {
  @include swatchesLighten($orangeBase);
  @include swatchesDarken($orangeBase);
  li:nth-child(11) {
    background-color: $orangeBase;
  }
}

ul.yellow {
  @include swatchesLighten($yellowBase);
  @include swatchesDarken($yellowBase);
  li:nth-child(11) {
    background-color: $yellowBase;
  }
}

ul.green {
  @include swatchesLighten($greenBase);
  @include swatchesDarken($greenBase);
  li:nth-child(11) {
    background-color: $greenBase;
  }
}

ul.blue {
  @include swatchesLighten($blueBase);
  @include swatchesDarken($blueBase);
  li:nth-child(11) {
    background-color: $blueBase;
  }
}

ul.purple {
  @include swatchesLighten($purpleBase);
  @include swatchesDarken($purpleBase);
  li:nth-child(11) {
    background-color: $purpleBase;
  }
}

ul.black {
  @include swatchesLighten($blackBase);
  @include swatchesDarken($blackBase);
  li:nth-child(11) {
    background-color: $blackBase;
  }
}
```

## @import

```scss
// 默认情况下，它会寻找 Sass 文件并直接引入， 但是，在少数几种情况下，它会被编译成 CSS 的 @import 规则：

// 如果文件的扩展名是 .css。
// 如果文件名以 http:// 开头。
// 如果文件名是 url()。
// 如果 @import 包含了任何媒体查询（media queries）。

@import 'foo.scss';
```

- 嵌套 @import

```scss
// 假设要引入的样式文件`example.scss`文件中包含这样的代码：

.example {
  color: red;
}

// 然后这样引用：

#main {
  @import 'example';
}

// 编译出来的 CSS：

#main .example {
  color: red;
}
```

## @media

```scss
// Sass 中的 @media 指令和 CSS 的使用规则一样的简单，但它有另外一个功能，可以嵌套在 CSS 规则中。有点类似 JS 的冒泡功能一样，如果在样式中使用 @media 指令，它将冒泡到外面。

.sidebar {
  width: 300px;
  @media screen and (orientation: landscape) {
    width: 500px;
  }
}

// 编译出来：
.sidebar {
  width: 300px;
}
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}
```

- @media 也可以嵌套 @media：

```scss
@media screen {
  .sidebar {
    @media (orientation: landscape) {
      width: 500px;
    }
  }
}

// 此时编译出来：
@media screen and (orientation: landscape) {
  .sidebar {
    width: 500px;
  }
}
```

- 在使用 @media 时，还可以使用插件#{}:

```scss
$media: screen;
$feature: -webkit-min-device-pixel-ratio;
$value: 1.5;

@media #{$media} and ($feature: $value) {
  .sidebar {
    width: 500px;
  }
}

// 编译出来的 CSS：
@media screen and (-webkit-min-device-pixel-ratio: 1.5) {
  .sidebar {
    width: 500px;
  }
}
```

## @extend

```scss
// Sass 中的 @extend 是用来扩展选择器或占位符。比如：

.error {
  border: 1px #f00;
  background-color: #fdd;
}
.error.intrusion {
  background-image: url('/image/hacked.png');
}
.seriousError {
  @extend .error;
  border-width: 3px;
}

// 被编译为：
.error,
.seriousError {
  border: 1px #f00;
  background-color: #fdd;
}

.error.intrusion,
.seriousError.intrusion {
  background-image: url('/image/hacked.png');
}

.seriousError {
  border-width: 3px;
}
```

```scss
// @extend 不止扩展类选择器，还可以扩展任何选择器，比如 .special.cool, a:hover, 或 a.user[href^=“http://“]，例如：

.hoverlink {
  @extend a:hover;
}
a:hover {
  text-decoration: underline;
}

// 编译出来：
a:hover,
.hoverlink {
  text-decoration: underline;
}
```

```scss
// 再来看一个复杂点的：
.hoverlink {
  @extend a:hover;
}
.comment a.user:hover {
  font-weight: bold;
}

// 编译出来的CSS
.comment a.user:hover,
.comment .user.hoverlink {
  font-weight: bold;
}
```

- 多个扩展

```scss
// 所设某个样式要继承多个地方的样式，那么可以使用 @extend 来继承多个选择器或占位符的样式，如：

.error {
  border: 1px #f00;
  background-color: #fdd;
}
.attention {
  font-size: 3em;
  background-color: #ff0;
}
.seriousError {
  @extend .error;
  @extend .attention;
  border-width: 3px;
}
// 编译出来的CSS

.error,
.seriousError {
  border: 1px #f00;
  background-color: #fdd;
}

.attention,
.seriousError {
  font-size: 3em;
  background-color: #ff0;
}

.seriousError {
  border-width: 3px;
}
```

```scss
// 扩展单一选择器
// 前面我们知道 %placeholder 不使用@extend显示调用是不会生成任何样式代码。那么在选择器中使用占位符一样。比如下面的代码：

#context a%extreme {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}

// 这段代码在不调用之前不产生任何代码，只有能过@extend调用之后才生成代码：
.notice {
  @extend %extreme;
}

// 编译出来的CSS
#context a.notice {
  color: blue;
  font-weight: bold;
  font-size: 2em;
}
```

## @at-root

```scss
// @at-root 从字面上解释就是跳出根元素。当你选择器嵌套多层之后，想让某个选择器跳出，此时就可以使用 @at-root。来看一个简单的示例：

.a {
  color: red;

  .b {
    color: orange;

    .c {
      color: yellow;

      @at-root .d {
        color: green;
      }
    }
  }
}

// 编译出来的CSS
.a {
  color: red;
}

.a .b {
  color: orange;
}

.a .b .c {
  color: yellow;
}

.d {
  color: green;
}
```

## @debug

```scss
// @debug 在 Sass 中是用来调试的，当你的在 Sass 的源码中使用了 @debug 指令之后，Sass 代码在编译出错时，在命令终端会输出你设置的提示 Bug:
@debug 10em + 12em;
// 会输出：
// Line 1 DEBUG: 22em
```

## @warn

```scss
// @warn 和 @debug 功能类似，用来帮助我们更好的调试 Sass。如：

@mixin adjust-location($x, $y) {
  @if unitless($x) {
    @warn "Assuming #{$x} to be in pixels";
    $x: 1px * $x;
  }
  @if unitless($y) {
    @warn "Assuming #{$y} to be in pixels";
    $y: 1px * $y;
  }
  position: relative;
  left: $x;
  top: $y;
}
```

## @error

```scss
// @error 和 @warn、@debug 功能是如出一辙。

@mixin error($x) {
  @if $x < 10 {
    width: $x * 10px;
  } @else if $x == 10 {
    width: $x;
  } @else {
    @error "你需要将#{$x}值设置在10以内的数";
  }
}

.test {
  @include error(15);
}

// 编译的时候：
// 你需要将15值设置在10以内的数 on line 7 at column 5
```
