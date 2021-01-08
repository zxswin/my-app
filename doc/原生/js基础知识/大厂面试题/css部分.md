## 浏览器盒模型

```ts
/**
 * 就是用来装页面上的元素的矩形区域。CSS中的盒子模型包括IE盒子模型和标准的W3C盒子模型
 * 包含里content padding border margin
 *
 * W3C盒子模型在标准的盒子模型中，width指content部分的宽度，
 * 在IE盒子模型中，width表示content+padding+border这三个部分的宽度
 *
 * 在CSS3中引入了box-sizing属性，
 * box-sizing：border-box,padding-box,content-box.
 * box-sizing:content-box;表示标准的盒子模型，
 * box-sizing:border-box表示的是IE盒子模型
 */
```

## link 标签和 import 标签的区别

```ts
/**
 *
 * link属于html标签，而@import是css提供的
 * 页面被加载时，link会同时被加载，而@import引用的css会等到页面加载结束后加载。
 * link是html标签，因此没有兼容性，而@import只有IE5以上才能识别。
 * link方式样式的权重高于@import的。
 */
```

## 介绍下 BFC 及其应用

- BFC 原理介绍

```less
/**
  * BFC 定义
  * 1.BFC(Block formatting context)直译为”块级格式化上下文”
  * 2.它是一个独立的渲染区域,并且与这个区域外部毫不相干


  * BFC布局规则
  * 1.内部的Box会在垂直方向，一个接一个地放置
  * 2.Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠
  * 3.每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。
  * 4.BFC的区域不会与float box重叠。
  * 5.BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此
  * 6.计算BFC的高度时，浮动元素也参与计算

  * 哪些元素会生成BFC
  * 根元素
  * float属性不为none
  * position为absolute或fixed
  * display为inline-block, table-cell, table-caption, flex, inline-flex 或网格布局(grid)
  * overflow不为visible
  */
```

- BFC 案例分析(自适应两栏布局)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      body {
        width: 300px;
        position: relative;
        border: 2px solid #00f;
      }

      .aside {
        width: 100px;
        height: 150px;
        float: left;
        background: #f00;
      }

      .main {
        height: 200px;
        background: #000;
        /* 每个元素的margin box的左边， 与包含块border box的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此 */
        /* 虽然存在浮动的元素aslide，但main的左边依然会与包含块的左边相接触 */
        /* BFC的区域不会与float box重叠 */
        /* 可以通过通过触发main生成BFC， 来实现自适应两栏布局 */
        overflow: hidden;
      }
    </style>
  </head>
  <body>
    <div class="aside"></div>
    <div class="main"></div>
  </body>
</html>
```

- BFC 案例分析(清除内部浮动)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .par {
        border: 5px solid #fcc;
        width: 300px;
        /* 计算BFC的高度时，浮动元素也参与计算 */
        /* 为达到清除内部浮动，我们可以触发par生成BFC，那么par在计算高度时，par内部的浮动元素child也会参与计算 */
        overflow: hidden;
      }

      .child {
        border: 5px solid #f66;
        width: 100px;
        height: 100px;
        float: left;
      }
    </style>
  </head>
  <body>
    <div class="par">
      <div class="child"></div>
      <div class="child"></div>
    </div>
  </body>
</html>
```

- BFC 案例分析(防止垂直 margin 重叠)

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .wrap {
        overflow: hidden;
      }
      p {
        color: #f55;
        background: #fcc;
        width: 200px;
        line-height: 100px;
        text-align: center;
        /* 两个p之间的距离为100px，发送了margin重叠。 */
        /* Box垂直方向的距离由margin决定。属于同一个BFC的两个相邻Box的margin会发生重叠 */
        /* 我们可以在p外面包裹一层容器，并触发该容器生成一个BFC。那么两个P便不属于同一个BFC，就不会发生margin重叠了。  */
        margin: 100px;
      }
    </style>
  </head>
  <body>
    <p>Haha</p>
    <div class="wrap">
      <p>Hehe</p>
    </div>
  </body>
</html>
```

- 总结

```less
/**
 * BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。反之也如此。
 * 因为BFC内部的元素和外部的元素绝对不会互相影响，
 * 当BFC外部存在浮动时，它不应该影响BFC内部Box的布局，BFC会通过变窄，而不与浮动有重叠。
 * 同样的，当BFC内部有浮动时，为了不影响外部元素的布局，BFC计算高度时会包括浮动的高度。避免margin重叠也是这样的一个道理。
  */
```

## div 水平垂直居中的六种方法

- 方法 1

```less
/**
  * 当前div的父级添加相对定位（position: relative;）
  */
div {
  background: red;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
```

- 方法二

```less
div {
  width: 600px;
  height: 600px;
  background: red;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -300px;
  margin-top: -300px;
}
```

- 方法三

```less
/**
  * 绝对定位方法：绝对定位下top left right bottom 都设置0 margin: auto;
  */
div.child {
  width: 600px;
  height: 600px;
  background: red;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
}
```

- 方法四

```less
/**
  * flex布局方法：当前div的父级添加flex css样式
  */
.box {
  height: 800px;
  -webkit-display: flex;
  display: flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content: center;
  justify-content: center;
  border: 1px solid #ccc;
}
div.child {
  width: 600px;
  height: 600px;
  background-color: red;
}
```

- 方法五

```less
/**
* table-cell实现水平垂直居中: table-cell middle center组合使用
  */
.table-cell {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  width: 240px;
  height: 180px;
  border: 1px solid #666;
}
```

- 方法六

```html
<div class="calc">
  <div class="child">calc</div>
</div>
```

```less
/**
  * 绝对定位：calc() 函数动态计算实现水平垂直居中
  */
.calc{
  position: relative;
  border: 1px solid #ccc;
  width: 400px;
  height: 160px;
}
.calc .child{
  position: absolute;
  width: 200px;
  height: 50px;
  left:-webkit-calc((400px - 200px)/2);
  top:-webkit-calc((160px - 50px)/2);
  left:-moz-calc((400px - 200px)/2);
  top:-moz-calc((160px - 50px)/2);
  left:calc((400px - 200px)/2);
  top:calc((160px - 50px)/2);
}　
```

## 分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景

```less
/**
  * display: none;
  * DOM 结构：浏览器不会渲染 display 属性为 none 的元素，不占据空间；
  * 事件监听：无法进行 DOM 事件监听；
  * 性能：动态改变此属性时会引起重排，性能较差；
  * 继承：不会被子元素继承，毕竟子类也不会被渲染；
  * transition：transition 不支持 display。

  * visibility: hidden;
  * DOM 结构：元素被隐藏，但是会被渲染不会消失，占据空间；
  * 事件监听：无法进行 DOM 事件监听；
  * 性 能：动态改变此属性时会引起重绘，性能较高；
  * 继 承：会被子元素继承，子元素可以通过设置 visibility: visible; 来取消隐藏；

  * opacity: 0;
  * DOM 结构：透明度为 100%，元素隐藏，占据空间；
  * 事件监听：可以进行 DOM 事件监听；
  * 性 能：提升为合成层，不会触发重绘，性能较高；
  * 继 承：会被子元素继承,且，子元素并不能通过 opacity: 1 来取消隐藏；
  * 案例自定义上传文件按钮
  */
```

## 已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改。

```less
/**
  * 总结一下吧：
  1.css方法 max-width:300px;覆盖其样式； transform: scale(0.625)；按比例缩放图片；
  2.js方法 document.getElementsByTagName("img")[0].setAttribute("style","width:300px!important;")
  */
<img src="1.jpg" style="width:480px!important;”>
```

## 如何解决移动端 Retina 屏 1px 像素问题

```less
/**
  * 可以用1px尺寸的带背景色元素然后scaleX(0.5)或scaleY(0.5)实现0.5px效果。
  */
.item {
  position: relative;
}
.item:after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  left: 0;
  bottom: 0;
  height: 1px;
  background-color: #c8c7cc;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
}
```

## 介绍下 BFC、IFC、GFC 和 FFC

```less
/**
  * 什么是FC(Formatting Contexts)
  * 它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

  * BFC
  * BFC(Block Formatting Contexts)直译为"块级格式化上下文"
  * 是页面上的一个隔离的渲染区域，容器里面的子元素不会在布局上影响到外面的元素，反之也是如此
  * 产生条件
  * 1.float的值不为none。
  * 2.overflow的值不为visible。
  * 3.position的值不为relative和static。
  * 4.display的值为table-cell, table-caption, inline-block中的任何一个。

  * IFC(Inline Formatting Contexts)直译为"内联格式化上下文"
  * IFC的line box（线框）高度由其包含行内元素中最高的实际高度计算而来（不受到竖直方向的padding/margin影响)
  * IFC的一般用法
  * 1.水平居中：当一个块要在环境中水平居中时，设置其为inline-block则会在外层产生IFC，通过text-align则可以使其水平居中。
  * 2.垂直居中：创建一个IFC，用其中一个元素撑开父元素的高度，然后设置其vertical-align:middle，其他行内元素则可以在此父元素下垂直居中。

  * GFC
  * GFC(GridLayout Formatting Contexts)直译为"网格布局格式化上下文"
  * 当为一个元素设置display值为grid的时候，此元素将会获得一个独立的渲染区域，
  * 我们可以通过在网格容器（grid container）上定义网格定义行（grid definition rows）和网格定义列

  * FFC
  * FFC(Flex Formatting Contexts)直译为"自适应格式化上下文"
  * display值为flex或者inline-flex的元素将会生成自适应容器（flex container）
  * 伸缩容器外和伸缩项目内的一切元素都不受影响。简单地说，Flexbox 定义了伸缩容器内伸缩项目该如何布局

  */
```

## 如何用 css 或 js 实现多行文本溢出省略效果，考虑兼容性

```less
/* 单行文本溢出 */
.text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
/* 
* 多行文本溢出  
* -webkit-line-clamp用来限制在一个块元素显示的文本的行数。 为了实现该效果，它需要组合其他的WebKit属性。常见结合属性：
* display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示 。
* -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式 。
*/
.mul-text {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; //行数 overflow: hidden;
}

/* 考虑兼容  */
.jtext {
  p {
    position: relative;
    line-height: 20px;
    max-height: 40px;
    overflow: hidden;
  }
  p::after {
    content: '...';
    position: absolute;
    bottom: 0;
    right: 0;
    padding-left: 40px;
    background: -webkit-linear-gradient(left, transparent, #fff 55%);
    background: -o-linear-gradient(right, transparent, #fff 55%);
    background: -moz-linear-gradient(right, transparent, #fff 55%);
    background: linear-gradient(to right, transparent, #fff 55%);
  }
}
```
