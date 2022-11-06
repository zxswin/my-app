## SVG 入门

```xml
<!--
  SVG 意为可缩放矢量图形（Scalable Vector Graphics）。
  SVG 使用 XML 格式定义图像。
-->
```

- 一个简单的入门案例

```xml
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webGL</title>
  </head>
  <body>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
      <circle
        cx="100"
        cy="50"
        r="40"
        stroke="black"
        stroke-width="2"
        fill="red"
      />
    </svg>

    <script></script>
  </body>
</html>

```

## 什么是 SVG

```js
// SVG 指可伸缩矢量图形 (Scalable Vector Graphics)
// SVG 用来定义用于网络的基于矢量的图形
// SVG 使用 XML 格式定义图形
// SVG 图像在放大或改变尺寸的情况下其图形质量不会有所损失
// SVG 是万维网联盟的标准
// SVG 与诸如 DOM 和 XSL 之类的 W3C 标准是一个整体

// 与其他图像格式相比，使用 SVG 的优势在于：
// SVG 可被非常多的工具读取和修改（比如记事本）
// SVG 与 JPEG 和 GIF 图像比起来，尺寸更小，且可压缩性更强。
// SVG 是可伸缩的
// SVG 图像可在任何的分辨率下被高质量地打印
// SVG 可在图像质量不下降的情况下被放大
// SVG 图像中的文本是可选的，同时也是可搜索的（很适合制作地图）
// SVG 可以与 JavaScript 技术一起运行
// SVG 是开放的标准
// SVG 文件是纯粹的 XML
// SVG 的主要竞争者是 Flash。

// 与 Flash 相比，SVG 最大的优势是与其他标准（比如 XSL 和 DOM）相兼容。而 Flash 则是未开源的私有技术。
```

## SVG 实例

- 简单的 SVG 实例

```js
// SVG 文件推荐使用 .svg（全部小写）作为此类文件的扩展名。
```

```xml
<!--
  SVG 代码解析：
  SVG 代码以 <svg> 元素开始，包括开启标签 <svg> 和关闭标签 </svg> 。这是根元素。width 和 height 属性可设置此 SVG 文档的宽度和高度。version 属性可定义所使用的 SVG 版本，xmlns 属性可定义 SVG 命名空间。
  SVG 的 <rect> 用来创建一个矩形，通过 fill 把背景颜色设为黄色。
  SVG 的 <circle> 用来创建一个圆。cx 和 cy 属性定义圆中心的 x 和 y 坐标。如果忽略这两个属性，那么圆点会被设置为 (0, 0)，r 属性定义圆的半径。 一个半径 80px 的绿色圆圈 <circle> 绘制在红色矩形的正中央 （向右偏移 150px，向下偏移115px）。
  stroke 和 stroke-width 属性控制如何显示形状的轮廓。我们把圆的轮廓设置为 4px 宽，红色边框。
  fill 属性设置形状内的颜色。我们把填充颜色设置为红色。
  关闭标签 </svg> 的作用是关闭 SVG 元素和文档本身。
  注释：所有的开启标签必须有关闭标签！
 -->
<svg version="1.1"
  baseProfile="full"
  width="300" height="200"
  xmlns="http://www.w3.org/2000/svg">

  <rect width="100%" height="100%" stroke="red" stroke-width="4" fill="yellow" />

  <circle cx="150" cy="100" r="80" fill="green" />

  <text x="150" y="115" font-size="16" text-anchor="middle" fill="white">RUNOOB SVG TEST</text>

</svg>
```

## SVG 在 HTML 页面

```js
// SVG 文件可通过以下标签嵌入 HTML 文档：<embed>、<object> 或者 <iframe>。
// SVG的代码可以直接嵌入到HTML页面中，或您可以直接链接到SVG文件。
```

- 使用 <embed> 标签

```html
<!-- 
  优势：所有主要浏览器都支持，并允许使用脚本
  缺点：不推荐在HTML4和XHTML中使用（但在HTML5允许）
 -->

<embed src="circle1.svg" type="image/svg+xml" />
```

- 使用 <object> 标签

```html
<!-- 
  优势：所有主要浏览器都支持，并支持HTML4，XHTML和HTML5标准
  缺点：不允许使用脚本。
-->
<object data="circle1.svg" type="image/svg+xml"></object>
```

- 使用 <iframe> 标签

```html
<!-- 
  优势：所有主要浏览器都支持，并允许使用脚本
  缺点：不推荐在HTML4和XHTML中使用（但在HTML5允许）
 -->
<iframe src="circle1.svg"></iframe>
```

- 直接在 HTML 嵌入 SVG 代码

```xml
<!--
  在Firefox、Internet Explorer9、谷歌Chrome和Safari中，你可以直接在HTML嵌入SVG代码。
 -->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
   <circle cx="100" cy="50" r="40" stroke="black" stroke-width="2" fill="red" />
</svg>
```

- 链接到 SVG 文件

```html
<!-- 
  您还可以用 <a> 标签链接到一个 SVG 文件：链接到 SVG 文件
  您还可以用 <a> 标签链接到一个 SVG 文件：
 -->

<a href="circle1.svg">查看 SVG 文件</a>
```

## SVG 矩形 <rect>

```xml
<!--
  SVG有一些预定义的形状元素，可被开发者使用和操作：
  矩形 <rect>
  圆形 <circle>
  椭圆 <ellipse>
  线 <line>
  折线 <polyline>
  多边形 <polygon>
  路径 <path>
 -->
```

- 矩形 1

```xml
<!--
  <rect> 标签可用来创建矩形，以及矩形的变种：
  代码解析:
  rect 元素的 width 和 height 属性可定义矩形的高度和宽度
  style 属性用来定义 CSS 属性
  CSS 的 fill 属性定义矩形的填充颜色（rgb 值、颜色名或者十六进制值）
  CSS 的 stroke-width 属性定义矩形边框的宽度
  CSS 的 stroke 属性定义矩形边框的颜色
 -->

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect width="300" height="100"
  style="fill:rgb(0,0,255);stroke-width:1;stroke:rgb(0,0,0)"/>
</svg>
```

- 矩形 2

```xml
<!--
  代码解析：
  x 属性定义矩形的左侧位置（例如，x="0" 定义矩形到浏览器窗口左侧的距离是 0px）
  y 属性定义矩形的顶端位置（例如，y="0" 定义矩形到浏览器窗口顶端的距离是 0px）
  CSS 的 fill-opacity 属性定义填充颜色透明度（合法的范围是：0 - 1）
  CSS 的 stroke-opacity 属性定义轮廓颜色的透明度（合法的范围是：0 - 1）
-->

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect x="50" y="20" width="150" height="150"
  style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;
  stroke-opacity:0.9"/>
</svg>
```

- 矩形 3

```xml
<!--
  定义整个元素的不透明度：
  CSS opacity 属性用于定义了元素的透明值 (范围: 0 到 1)。
 -->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect x="50" y="20" width="150" height="150"
  style="fill:blue;stroke:pink;stroke-width:5;opacity:0.5"/>
</svg>
```

- 矩形 4

```xml
<!--
  创建一个圆角矩形：
  rx 和 ry 属性可使矩形产生圆角。
 -->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect x="50" y="20" rx="20" ry="20" width="150" height="150"
  style="fill:red;stroke:black;stroke-width:5;opacity:0.5"/>
</svg>
```

## SVG 圆形 - <circle>

```xml
<!--
  <circle> 标签可用来创建一个圆：
  cx和cy属性定义圆点的x和y坐标。如果省略cx和cy，圆的中心会被设置为(0, 0)
  r属性定义圆的半径
 -->

 <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <circle cx="100" cy="50" r="40" stroke="black"
  stroke-width="2" fill="red"/>
</svg>
```

## SVG 椭圆 - <ellipse>

- 椭圆 1

```xml
<!--
  <ellipse> 元素是用来创建一个椭圆：
  椭圆与圆很相似。不同之处在于椭圆有不同的x和y半径，而圆的x和y半径是相同的：
  代码解析：
  CX属性定义的椭圆中心的x坐标
  CY属性定义的椭圆中心的y坐标
  RX属性定义的水平半径
  RY属性定义的垂直半径
-->

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <ellipse cx="300" cy="80" rx="100" ry="50"
  style="fill:yellow;stroke:purple;stroke-width:2"/>
</svg>
```

- 椭圆 2

```xml
<!--
  下面的例子创建了三个累叠而上的椭圆：
-->

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <ellipse cx="240" cy="100" rx="220" ry="30" style="fill:purple"/>
  <ellipse cx="220" cy="70" rx="190" ry="20" style="fill:lime"/>
  <ellipse cx="210" cy="45" rx="170" ry="15" style="fill:yellow"/>
</svg>

```

- 椭圆 3

```xml
<!--
  下面的例子组合了两个椭圆（一个黄的和一个白的）：
-->

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <ellipse cx="240" cy="50" rx="220" ry="30" style="fill:yellow"/>
  <ellipse cx="220" cy="50" rx="190" ry="20" style="fill:white"/>
</svg>

```

## SVG 直线 - <line>

```xml
<!--
  <line> 元素是用来创建一个直线：
  x1 属性在 x 轴定义线条的开始
  y1 属性在 y 轴定义线条的开始
  x2 属性在 x 轴定义线条的结束
  y2 属性在 y 轴定义线条的结束
-->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <line x1="0" y1="0" x2="200" y2="200"
  style="stroke:rgb(255,0,0);stroke-width:2"/>
</svg>
```

## SVG 多边形 - <polygon>

```xml
<!--
  polygon> 标签用来创建含有不少于三个边的图形。
  多边形是由直线组成，其形状是"封闭"的（所有的线条 连接起来）。
  polygon来自希腊。 "Poly" 意味 "many" ， "gon" 意味 "angle".

  points 属性定义多边形每个角的 x 和 y 坐标
 -->

 <svg  height="210" width="500">
  <polygon points="200,10 250,190 160,210"
  style="fill:lime;stroke:purple;stroke-width:1"/>
</svg>
```

- 创建一个四边的多边形

```xml
<svg height="250" width="500">
  <polygon points="220,10 300,210 170,250 123,234" style="fill:lime;stroke:purple;stroke-width:1" />
</svg>
```

- 使用 <polygon> 元素创建一个星型

```xml
<svg height="210" width="500">
  <polygon points="100,10 40,198 190,78 10,78 160,198"
  style="fill:lime;stroke:purple;stroke-width:5;fill-rule:nonzero;" />
</svg>
```

- 改变 fill-rule 属性为 "evenodd":

```xml
<!--
  SVG的图形填充规则通过fill-rule属性来指定。
  有效值:  	nonzero | evenodd | inherit
  fill-rule 属性用于指定使用哪一种算法去判断画布上的某区域是否属于该图形“内部” （内部区域将被填充）。对一个简单的无交叉的路径，哪块区域是“内部” 是很直观清除的。但是，对一个复杂的路径，比如自相交或者一个子路径包围另一个子路径，“内部”的理解就不那么明确了。

  fill-rule 属性提供两种选项用于指定如何判断图形的“内部”:

  nonzero
  字面意思是“非零”。按该规则，要判断一个点是否在图形内，从该点作任意方向的一条射线，然后检测射线与图形路径的交点情况。从0开始计数，路径从左向右穿过射线则计数加1，从右向左穿过射线则计数减1。得出计数结果后，如果结果是0，则认为点在图形外部，否则认为在内部。下图演示了nonzero规则:

  evenodd
  字面意思是“奇偶”。按该规则，要判断一个点是否在图形内，从该点作任意方向的一条射线，然后检测射线与图形路径的交点的数量。如果结果是奇数则认为点在内部，是偶数则认为点在外部。下图演示了evenodd 规则:

  述解释未指出当路径片段与射线重合或者相切的时候怎么办，因为任意方向的射线都可以，那么只需要简单的选择另一条没有这种特殊情况的射线即可。
 -->
<svg height="210" width="500">
  <polygon points="100,10 40,198 190,78 10,78 160,198"
  style="fill:lime;stroke:purple;stroke-width:5;fill-rule:evenodd;" />
</svg>
```

## SVG 多段线 - <polyline>

```xml
<!--
  <polyline> 元素是用于创建任何只有直线的形状：
 -->

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <polyline points="20,20 40,25 60,40 80,120 120,140 200,180"
  style="fill:none;stroke:black;stroke-width:3" />
</svg>
```

```xml
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <polyline points="0,40 40,40 40,80 80,80 80,120 120,120 120,160" style="fill:white;stroke:red;stroke-width:4" />
</svg>
```

## SVG 路径 - <path>

```xml
<!--
  <path> 元素用于定义一个路径。
 下面的命令可用于路径数据：
  M = moveto
  L = lineto
  H = horizontal lineto
  V = vertical lineto
  C = curveto
  S = smooth curveto
  Q = quadratic Bézier curve
  T = smooth quadratic Bézier curveto
  A = elliptical Arc
  Z = closepath
  注意：以上所有命令均允许小写字母。大写表示绝对定位，小写表示相对定位。
-->

```

```xml
<!--
  上面的例子定义了一条路径，它开始于位置150 0，到达位置75 200，然后从那里开始到225 200，最后在150 0关闭路径。
-->

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
    <path d="M150 0 L75 200 L225 200 Z" />
</svg>
```

```xml
<!--
  由于在绘制路径时的复杂性，强烈建议使用SVG编辑器来创建复杂的图形。
  创建了一个二次方贝塞尔曲线，A 和 C 分别是起点和终点，B 是控制点：
 -->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <path id="lineAB" d="M 100 350 l 150 -300" stroke="red"
  stroke-width="3" fill="none" />
  <path id="lineBC" d="M 250 50 l 150 300" stroke="red"
  stroke-width="3" fill="none" />
  <path d="M 175 200 l 150 0" stroke="green" stroke-width="3"
  fill="none" />
  <path d="M 100 350 q 150 -300 300 0" stroke="blue"
  stroke-width="5" fill="none" />
  <!-- Mark relevant points -->
  <g stroke="black" stroke-width="3" fill="black">
    <circle id="pointA" cx="100" cy="350" r="3" />
    <circle id="pointB" cx="250" cy="50" r="3" />
    <circle id="pointC" cx="400" cy="350" r="3" />
  </g>
  <!-- Label the points -->
  <g font-size="30" font="sans-serif" fill="black" stroke="none"
  text-anchor="middle">
    <text x="100" y="350" dx="-30">A</text>
    <text x="250" y="50" dy="-10">B</text>
    <text x="400" y="350" dx="30">C</text>
  </g>
</svg>
```

## SVG 文本 - <text>

```xml
<!--
  <text> 元素用于定义文本。
-->

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <text x="0" y="15" fill="red">I love SVG</text>
</svg>
```

- 旋转的文字

```xml
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <text x="0" y="15" fill="red" transform="rotate(30 20,40)">I love SVG</text>
</svg>
```

- 路径上的文字：

```xml
<svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  xmlns:xlink="http://www.w3.org/1999/xlink"
>
  <defs>
    <path id="path1" d="M75,20 a1,1 0 0,0 100,0" />
  </defs>
  <text x="10" y="100" style="fill:red;">
    <textPath xlink:href="#path1">I love SVG I love SVG</textPath>
  </text>
</svg>
```

- tspan 元素的使用

```xml
<!--
  元素可以安排任何分小组与<tspan> 元素的数量。每个<tspan> 元素可以包含不同的格式和位置。几行文本(与 <tspan> 元素):
-->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <text x="10" y="20" style="fill:red;">Several lines:
    <tspan x="10" y="45">First line</tspan>
    <tspan x="10" y="70">Second line</tspan>
  </text>
</svg>
```

- 作为链接文本（ <a> 元素）：

```xml
<svg xmlns="http://www.w3.org/2000/svg" version="1.1"
xmlns:xlink="http://www.w3.org/1999/xlink">
  <a xlink:href="http://www.w3schools.com/svg/" target="_blank">
    <text x="0" y="15" fill="red">I love SVG</text>
  </a>
</svg>
```

## SVG Stroke 属性

```xml
<!--
  SVG Stroke 属性
  SVG提供了一个范围广泛stroke 属性。在本章中，我们将看看下面：
  stroke
  stroke-width
  stroke-linecap
  stroke-dasharray
  所有stroke属性，可应用于任何种类的线条，文字和元素就像一个圆的轮廓。
 -->
```

- SVG stroke 属性

```xml
<!--
  Stroke属性定义一条线，文本或元素轮廓颜色：
-->

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none">
    <path stroke="red" d="M5 20 l215 0" />
    <path stroke="blue" d="M5 40 l215 0" />
    <path stroke="black" d="M5 60 l215 0" />
  </g>
</svg>
```

- SVG stroke-width 属性

```xml
<!--
  stroke-width 属性定义了一条线，文本或元素轮廓厚度：
-->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" stroke="black">
    <path stroke-width="2" d="M5 20 l215 0" />
    <path stroke-width="4" d="M5 40 l215 0" />
    <path stroke-width="6" d="M5 60 l215 0" />
  </g>
</svg>
```

- SVG stroke-linecap 属性

```xml
<!--
  strokelinecap 属性定义不同类型的开放路径的终结：
-->

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" stroke="black" stroke-width="6">
    <path stroke-linecap="butt" d="M5 20 l215 0" />
    <path stroke-linecap="round" d="M5 40 l215 0" />
    <path stroke-linecap="square" d="M5 60 l215 0" />
  </g>
</svg>
```

- SVG stroke-dasharray 属性

```xml
<!--
  strokedasharray属性用于创建虚线：
-->

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g fill="none" stroke="black" stroke-width="4">
    <path stroke-dasharray="5,5" d="M5 20 l215 0" />
    <path stroke-dasharray="10,10" d="M5 40 l215 0" />
    <path stroke-dasharray="20,10,5,5,5,10" d="M5 60 l215 0" />
  </g>
</svg>
```

## SVG 滤镜

```xml
<!--
  SVG滤镜用来增加对SVG图形的特殊效果。

  SVG可用的滤镜是：

  feBlend - 与图像相结合的滤镜
  feColorMatrix - 用于彩色滤光片转换
  feComponentTransfer
  feComposite
  feConvolveMatrix
  feDiffuseLighting
  feDisplacementMap
  feFlood
  feGaussianBlur
  feImage
  feMerge
  feMorphology
  feOffset - 过滤阴影
  feSpecularLighting
  feTile
  feTurbulence
  feDistantLight - 用于照明过滤
  fePointLight - 用于照明过滤
  feSpotLight - 用于照明过滤
  除此之外，您可以在每个 SVG 元素上使用多个滤镜！
-->
```

## SVG 模糊效果

```xml
<!--
  <defs> 和 <filter>
  所有互联网的SVG滤镜定义在<defs>元素中。<defs>元素定义短并含有特殊元素（如滤镜）定义。
  <filter>标签用来定义SVG滤镜。<filter>标签使用必需的id属性来定义向图形应用哪个滤镜
-->
```

- SVG <feGaussianBlur>

```xml
<!--
  <feGaussianBlur> 元素是用于创建模糊效果：

  代码解析：
  <filter>元素id属性定义一个滤镜的唯一名称
  <feGaussianBlur>元素定义模糊效果
  in="SourceGraphic"这个部分定义了由整个图像创建效果
  stdDeviation属性定义模糊量
  <rect>元素的滤镜属性用来把元素链接到"f1"滤镜
 -->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="f1" x="0" y="0">
      <feGaussianBlur in="SourceGraphic" stdDeviation="15" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f1)" />
</svg>
```

## SVG 阴影

```xml
<!--
  注意： Internet Explorer和Safari不支持SVG滤镜！
  SVG <feOffset>
  <feOffset>元素是用于创建阴影效果。我们的想法是采取一个SVG图形（图像或元素）并移动它在xy平面上一点儿。
  第一个例子偏移一个矩形（带<feOffset>），然后混合偏移图像顶部（含<feBlend>）：

  代码解析：
  <filter>元素id属性定义一个滤镜的唯一名称
  <rect>元素的滤镜属性用来把元素链接到"f1"滤镜
-->

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="f1" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
      <feBlend in="SourceGraphic" in2="offOut" mode="normal" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f1)" />
</svg>
```

```xml
<!--
  现在，偏移图像可以变的模糊（含 <feGaussianBlur>）:
  <feGaussianBlur>元素的stdDeviation属性定义了模糊量
 -->

<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="f1" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f1)" />
</svg>
```

- 制作一个黑色的阴影

```xml
<!--
  <feOffset>元素的属性改为"SourceAlpha"在Alpha通道使用残影，而不是整个RGBA像素。
-->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="f1" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceAlpha" dx="20" dy="20" />
      <feGaussianBlur result="blurOut" in="offOut" stdDeviation="10" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f1)" />
</svg>
```

- 为阴影涂上一层颜色

```xml
<!--
  <feColorMatrix>过滤器是用来转换偏移的图像使之更接近黑色的颜色。
  '0.2'矩阵的三个值都获取乘以红色，绿色和蓝色通道。降低其值带来的颜色至黑色（黑色为0）
 -->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <filter id="f1" x="0" y="0" width="200%" height="200%">
      <feOffset result="offOut" in="SourceGraphic" dx="20" dy="20" />
      <feColorMatrix result="matrixOut" in="offOut" type="matrix"
      values="0.2 0 0 0 0 0 0.2 0 0 0 0 0 0.2 0 0 0 0 0 1 0" />
      <feGaussianBlur result="blurOut" in="matrixOut" stdDeviation="10" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>
  <rect width="90" height="90" stroke="green" stroke-width="3"
  fill="yellow" filter="url(#f1)" />
</svg>
```

## SVG 渐变 - 线性

```xml
<!--
  渐变是一种从一种颜色到另一种颜色的平滑过渡。另外，可以把多个颜色的过渡应用到同一个元素上。
  SVG渐变主要有两种类型：
  Linear
  Radial
 -->
```

- SVG 线性渐变 - <linearGradient>

```xml
<!--
  <linearGradient>元素用于定义线性渐变。
  <linearGradient>标签必须嵌套在<defs>的内部。<defs>标签是definitions的缩写，它可对诸如渐变之类的特殊元素进行定义。
  线性渐变可以定义为水平，垂直或角渐变：

  当y1和y2相等，而x1和x2不同时，可创建水平渐变
  当x1和x2相等，而y1和y2不同时，可创建垂直渐变
  当x1和x2不同，且y1和y2不同时，可创建角形渐变
 -->
```

- 定义水平线性渐变从黄色到红色的椭圆形：

```xml
<!--
  代码解析：
  <linearGradient>标签的id属性可为渐变定义一个唯一的名称
  <linearGradient>标签的X1，X2，Y1，Y2属性定义渐变开始和结束位置
  渐变的颜色范围可由两种或多种颜色组成。每种颜色通过一个<stop>标签来规定。offset属性用来定义渐变的开始和结束位置。
  填充属性把 ellipse 元素链接到此渐变
-->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
  <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
</svg>
```

- 定义一个垂直线性渐变从黄色到红色的椭圆形：

```xml
<!--
  定义一个垂直线性渐变从黄色到红色的椭圆形：
-->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
  <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
</svg>
```

- 定义一个椭圆形，水平线性渐变从黄色到红色并添加一个椭圆内文本：

```xml
<!--
  <text> 元素是用来添加一个文本
-->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:rgb(255,255,0);stop-opacity:1" />
      <stop offset="100%" style="stop-color:rgb(255,0,0);stop-opacity:1" />
    </linearGradient>
  </defs>
  <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
  <text fill="#ffffff" font-size="45" font-family="Verdana" x="150" y="86">
  SVG</text>
</svg>

```

## SVG 渐变- 放射性

```xml
<!--
  SVG 放射性渐变 - <radialGradient>
  <radialGradient>元素用于定义放射性渐变。
  <radialGradient>标签必须嵌套在<defs>的内部。<defs>标签是definitions的缩写，它可对诸如渐变之类的特殊元素进行定义。
-->
```

- 定义一个放射性渐变从白色到蓝色椭圆：

```xml
<!--
  代码解析：
  <radialGradient>标签的 id 属性可为渐变定义一个唯一的名称
  CX，CY和r属性定义的最外层圆和Fx和Fy定义的最内层圆
  渐变颜色范围可以由两个或两个以上的颜色组成。每种颜色用一个<stop>标签指定。offset属性用来定义渐变色开始和结束
  填充属性把ellipse元素链接到此渐变
 -->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);
      stop-opacity:0" />
      <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
    </radialGradient>
  </defs>
  <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
</svg>
```

- 定义放射性渐变从白色到蓝色的另一个椭圆：

```xml
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <defs>
    <radialGradient id="grad1" cx="20%" cy="30%" r="30%" fx="50%" fy="50%">
      <stop offset="0%" style="stop-color:rgb(255,255,255);
      stop-opacity:0" />
      <stop offset="100%" style="stop-color:rgb(0,0,255);stop-opacity:1" />
    </radialGradient>
  </defs>
  <ellipse cx="200" cy="70" rx="85" ry="55" fill="url(#grad1)" />
</svg>
```

## 动画效果

- 重复用 5 秒时间淡出的矩形

```xml
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <rect x="20" y="20" width="250" height="250" style="fill:blue">
    <animate attributeType="CSS" attributeName="opacity" from="1" to="0" dur="5s" repeatCount="indefinite" />
  </rect>
</svg>
```

- 沿一个运动路径移动的文本

```xml
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g transform="translate(100,100)">
    <text id="TextElement" x="0" y="0" style="font-family:Verdana;font-size:24"> It's SVG!
      <animateMotion path="M 0 0 L 100 100" dur="5s" fill="freeze" />
    </text>
  </g>
</svg>
```

- 沿一个运动路径移动、旋转并缩放的文本

```xml
<svg xmlns="http://www.w3.org/2000/svg" version="1.1">
  <g transform="translate(100,100)">
    <text id="TextElement" x="0" y="0" style="font-family:Verdana;font-size:24; visibility:hidden"> It's SVG!
      <set attributeName="visibility" attributeType="CSS" to="visible" begin="1s" dur="5s" fill="freeze" />
      <animateMotion path="M 0 0 L 100 100" begin="1s" dur="5s" fill="freeze" />
      <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="-30" to="0" begin="1s" dur="5s" fill="freeze" />
      <animateTransform attributeName="transform" attributeType="XML" type="scale" from="1" to="3" additive="sum" begin="1s" dur="5s" fill="freeze" />
    </text>
  </g>
</svg>
```
