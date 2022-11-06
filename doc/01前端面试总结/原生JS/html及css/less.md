# less 的使用总结

## 变量

- 简单使用

```less
@color: #999;
@bgColor: skyblue; //不要添加引号
@width: 50%;
#wrap {
  color: @color;
  width: @width;
}

/* 生成后的 CSS */
#wrap {
  color: #999;
  width: 50%;
}
```

- 选择器变量

```less
/* Less */
@mySelector: #wrap;
@Wrap: wrap;
@{mySelector}{ //变量名 必须使用大括号包裹
  color: #999;
  width: 50%;
}
.@{Wrap}{
  color:#ccc;
}
#@{Wrap}{
  color:#666;
}

/* 生成的 CSS */
#wrap{
  color: #999;
  width: 50%;
}
.wrap{
  color:#ccc;
}
#wrap{
  color:#666;
}

```

- 属性变量

```less
/* Less */
@borderStyle: border-style;
@Soild: solid;
#wrap {
  @{borderStyle}: @Soild; //变量名 必须使用大括号包裹
}

/* 生成的 CSS */
#wrap {
  border-style: solid;
}
```

- url 变量

```less
/* Less */
@images: '../img'; //需要加引号
body {
  background: url('@{images}/dog.png'); //变量名 必须使用大括号包裹
}

/* 生成的 CSS */
body {
  background: url('../img/dog.png');
}
```

- 声明变量

```less
/* Less */
@background: {
  background: red;
};
#main {
  @background();
}
@Rules: {
  width: 200px;
  height: 200px;
  border: solid 1px red;
};
#con {
  @Rules();
}

/* 生成的 CSS */
#main {
  background: red;
}
#con {
  width: 200px;
  height: 200px;
  border: solid 1px red;
}
```

- 变量运算

```less
/* Less */
@width: 300px;
@color: #222;
#wrap {
  width: @width-20;
  height: @width-20*5;
  margin: (@width-20) * 5;
  color: @color*2;
  background-color: @color + #111;
}

/* 生成的 CSS */
#wrap {
  width: 280px;
  height: 200px;
  margin: 1400px;
  color: #444;
  background-color: #333;
}
```

- 用变量去定义变量

```less
/* Less */
@fnord: 'I am fnord.';
@var: 'fnord';
#wrap::after {
  content: @@var; //将@var替换为其值 content:@fnord;
}
/* 生成的 CSS */
#wrap::after {
  content: 'I am fnord.';
}
```

## 嵌套

- 简单使用

```less
/* Less */
#header {
  &:after {
    content: 'Less is more!';
  }
  .title {
    font-weight: bold;
  }
  &_content {
    //理解方式：直接把 & 替换成 #header
    margin: 20px;
  }
}
/* 生成的 CSS */
#header::after {
  content: 'Less is more!';
}
#header .title {
  //嵌套了
  font-weight: bold;
}
#header_content {
  //没有嵌套！
  margin: 20px;
}
```

## 混合方法

- 简单使用

```less
/* Less */
.card {
  // 等价于 .card()
  background: #f6f6f6;
  -webkit-box-shadow: 0 1px 2px rgba(151, 151, 151, 0.58);
  box-shadow: 0 1px 2px rgba(151, 151, 151, 0.58);
}
#wrap {
  .card; //等价于.card();
}
/* 生成的 CSS */
#wrap {
  background: #f6f6f6;
  -webkit-box-shadow: 0 1px 2px rgba(151, 151, 151, 0.58);
  box-shadow: 0 1px 2px rgba(151, 151, 151, 0.58);
}

// 建议，为了避免 代码混淆，应写成 :
// .card(){
//   //something...
// }
// #wrap{
//   .card();
// }
```

- 默认参数方法

```less
/* Less */
.border(@a:10px,@b:50px,@c:30px,@color:#000) {
  border: solid 1px @color;
  box-shadow: @arguments; //指代的是 全部参数
}
#main {
  .border(0px,5px,30px,red); //必须带着单位
}
#wrap {
  .border(0px);
}
#content {
  .border; //等价于 .border()
}

/* 生成的 CSS */
#main {
  border: solid 1px red;
  box-shadow: 0px, 5px, 30px, red;
}
#wrap {
  border: solid 1px #000;
  box-shadow: 0px 50px 30px #000;
}
#content {
  border: solid 1px #000;
  box-shadow: 10px 50px 30px #000;
}
```

- 方法的匹配模式

```less
/* Less */
.triangle(top,@width:20px,@color:#000) {
  border-color: transparent transparent @color transparent;
}
.triangle(right,@width:20px,@color:#000) {
  border-color: transparent @color transparent transparent;
}

.triangle(bottom,@width:20px,@color:#000) {
  border-color: @color transparent transparent transparent;
}
.triangle(left,@width:20px,@color:#000) {
  border-color: transparent transparent transparent @color;
}
.triangle(@_,@width:20px,@color:#000) {
  border-style: solid;
  border-width: @width;
}
#main {
  .triangle(left, 50px, #999);
}
/* 生成的 CSS */
#main {
  border-color: transparent transparent transparent #999;
  border-style: solid;
  border-width: 50px;
}
```

- 方法的命名空间

```less
/* Less */
#card() {
  background: #723232;
  .d(@w:300px) {
    width: @w;

    #a(@h:300px) {
      height: @h; //可以使用上一层传进来的方法
      width: @w;
    }
  }
}
#wrap {
  #card > .d > #a(100px); // 父元素不能加 括号
}
#main {
  #card .d();
}
#con {
  //不得单独使用命名空间的方法
  //.d() 如果前面没有引入命名空间 #card ，将会报错

  #card; // 等价于 #card();
  .d(20px); //必须先引入 #card
}
/* 生成的 CSS */
#wrap {
  height: 100px;
  width: 300px;
}
#main {
  width: 300px;
}
#con {
  width: 20px;
}
```

- 方法的条件筛选

```less
/* Less */
#card {
  // and 运算符 ，相当于 与运算 &&，必须条件全部符合才会执行
  .border(@width,@color,@style) when (@width>100px) and(@color=#999) {
    border: @style @color @width;
  }

  // not 运算符，相当于 非运算 !，条件为 不符合才会执行
  .background(@color) when not (@color>=#222) {
    background: @color;
  }

  // , 逗号分隔符：相当于 或运算 ||，只要有一个符合条件就会执行
  .font(@size:20px) when (@size>50px) , (@size<100px) {
    font-size: @size;
  }
}
#main {
  #card > .border(200px,#999,solid);
  #card .background(#111);
  #card > .font(40px);
}
/* 生成后的 CSS */
#main {
  border: solid #999 200px;
  background: #111;
  font-size: 40px;
}
```

- 数量不定的参数

```less
/* Less */
.boxShadow(...) {
  box-shadow: @arguments;
}
.textShadow(@a,...) {
  text-shadow: @arguments;
}
#main {
  .boxShadow(1px,4px,30px,red);
  .textShadow(1px,4px,30px,red);
}

/* 生成后的 CSS */
#main {
  box-shadow: 1px 4px 30px red;
  text-shadow: 1px 4px 30px red;
}
```

- 方法使用 important！

```less
/* Less */
.border {
  border: solid 1px red;
  margin: 50px;
}
#main {
  .border() !important;
}
/* 生成后的 CSS */
#main {
  border: solid 1px red !important;
  margin: 50px !important;
}
```

- 循环方法

```less
/* Less */
.generate-columns(4);

.generate-columns(@n, @i: 1) when (@i =< @n) {
  .column-@{i} {
    width: (@i * 100% / @n);
  }
  .generate-columns(@n, (@i + 1));
}
/* 生成后的 CSS */
.column-1 {
  width: 25%;
}
.column-2 {
  width: 50%;
}
.column-3 {
  width: 75%;
}
.column-4 {
  width: 100%;
}
```

- 属性拼接方法

```less
/* Less */
.boxShadow() {
  box-shadow+: inset 0 0 10px #555;
}
.main {
  .boxShadow();
  box-shadow+: 0 0 20px black;
}
/* 生成后的 CSS */
.main {
  box-shadow: inset 0 0 10px #555, 0 0 20px black;
}
```

- 空格

```less
/* Less */
.Animation() {
  transform+_: scale(2);
}
.main {
  .Animation();
  transform+_: rotate(15deg);
}

/* 生成的 CSS */
.main {
  transform: scale(2) rotate(15deg);
}
```

## 实战技巧

- 官网例子

```less
/* Less */
.average(@x, @y) {
  @average: ((@x + @y) / 2);
}

div {
  .average(16px, 50px); // 调用 方法
  padding: @average; // 使用返回值
}

/* 生成的 CSS */
div {
  padding: 33px;
}
```

- 使用 js

```less
/* Less */
@content:` "aaa".toUpperCase()`;
#randomColor {
  @randomColor: ~'rgb(`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`,`Math.round(Math.random() * 256)`)';
}
#wrap {
  width: ~'`Math.round(Math.random() * 100)`px';
  &:after {
    content: @content;
  }
  height: ~'`window.innerHeight`px';
  alert: ~'`alert(1)`';
  #randomColor();
  background-color: @randomColor;
}
/* 生成后的 CSS */

// 弹出 1
#wrap {
  width: 随机值（0~100）px;
  height: 743px; //由电脑而异
  background: 随机颜色;
}
#wrap::after {
  content: 'AAA';
}
```
