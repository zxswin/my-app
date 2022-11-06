## SCSS 的使用

- 变量

```scss
$blue: #1875e7;
　 div {
  color: $blue;
}

$side: left;
.rounded {
  border-#{$side}-radius: 5px;
}
```

- 计算功能

```scss
$var: 10;
.i-test {
  margin: (14px/2);
  top: 50px + 100px;
  right: $var * 10%;
}
```

- 选择器嵌套

```scss
div {
  h1` {
    color: red;
  }
}
```

- &引用父元素

```scss
a {
  &:hover {
    color: #ffb3ff;
  }
}
```

- 继承:使用@extend 命令

```scss
.class1 {
  border: 1px solid #ddd;
}
.class2 {
  @extend .class1;
  font-size: 120%;
}
```

- 继承:使用@mixin 命令

```scss
@mixin left {
  float: left;
  margin-left: 10px;
}
div {
  @include left;
}

/* 可以指定参数和缺省值 */
@mixin left($value: 10px) {
  float: left;
  margin-right: $value;
}

div {
  @include left(20px);
}
```

- 颜色函数

```scss
/* SASS提供了一些内置的颜色函数，以便生成系列颜色 */
lighten(#cc3, 10%) // #d6d65c
darken(#cc3, 10%) // #a3a329
grayscale(#cc3) // #808080
complement(#cc3) // #33c
```

- 引入外部文件

```scss
@import 'path/filename.scss';
```

- 条件语句

```scss
p {
  @if 1 + 1 == 2 {
    border: 1px solid;
  }
  @if 5 > 3 {
    border: 2px dotted;
  }
}

.rounded {
  @if lightness($color) > 30% {
    background-color: #000;
  } @else {
    background-color: #fff;
  }
}
```

- for 循环语句

```scss
@for $i from 1 to 10 {
  .border-#{$i} {
    border: #{$i}px solid blue;
  }
}
```

- while 循环

```scss
$i: 6;

@while $i > 0 {
  .item-#{$i} {
    width: 2em * $i;
  }
  $i: $i - 2;
}
```

- each 命令，作用与 for 类似

```scss
@each $member in a, b, c, d {
  .#{$member} {
    background-image: url('/image/#{$member}.jpg');
  }
}
```

- 自定义函数

```scss
@function double($n) {
  @return $n * 2;
}

#sidebar {
  width: double(5px);
}
```
