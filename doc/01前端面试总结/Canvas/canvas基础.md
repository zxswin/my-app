# canvas 基础

- 绘制一个三角型

```js
/**
 * 绘制直线,需要注意几个方法
 * moveTo(x1, y1) 将画笔移动到 x1,y1 处
 * lineTo(x2, y2) 画笔从x1 y1 为起点，绘制终点 x2 y2 的直线
 * 当上边确定了直线起点终点后，开始调用stroke()进行绘制
 */
function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  //开始代码
  ctx.moveTo(50, 100);
  ctx.lineTo(150, 50);
  // 第二次绘制，会以上一个终点为起点
  ctx.lineTo(200, 150);
  ctx.lineTo(50, 100);
  ctx.stroke();
}
draw();
```

- 矩形的绘制

```js
/**
 * 绘制矩形
 * 注意以下几个绘制矩形的属性和方法
 * 1. strokeStyle 可以设置 颜色 渐变 图案
 * 2. strokeRect(x, y, width, height) 确定矩形坐标
 * x,y 确定左上角坐标 width height 确定宽高
 *
 * 需要注意的是，strokeStyle必须在strokeRect方法之前定义
 *
 * 使用以下方法来绘制填充矩形
 * 3. fillStyle = 属性值
 * 4. fillRect(x, y, width, height)
 *
 * 我们还可以使用 rect(x, y, width, height) 来绘制矩形
 * 该方法只有在被调用后，再调用 stroke() 或者 fill() 后才会被绘制
 *
 * 最后，我们可以用clearRect(x, y, width, height) 来清空矩形区域
 * 如果清空整个画布，可以用以下技巧
 * ctx.clearRect(0, 0, ctx.width, ctx.height)
 */
function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  // 绘制普通矩形
  ctx.strokeStyle = 'red';
  ctx.strokeRect(50, 50, 80, 80);

  // 绘制填充矩形
  ctx.fillStyle = 'HotPink';
  ctx.fillRect(200, 200, 80, 80);

  // 使用 rect绘制矩形
  ctx.strokeStyle = 'red';
  ctx.fillStyle = '#FFE8E8';
  ctx.rect(250, 250, 50, 50);
  ctx.stroke();
  ctx.fill();

  // 清空矩形区域
  // ctx.clearRect(260, 260, 20, 20);
}
draw();
```

- 绘制正多边形

```js
/**
 * 接下来，我们讲个案例 —— 绘制正多边形
 * 根据三角函数的原理，我们可以知道， 坐标 (x,y) = (cos(degree), sin(degree))
 * 而一个正多边形，可以完美的嵌入到一个圆中，那么圆心就是这个正多边形的中心坐标
 * 多表型的中心到各个顶点的角度（degree）我们很容易算出来：
 * i * ((2 * Math.PI) / n) 其中n为正多边形的边数
 * 那么，每一个顶点的坐标我们都可以这么计算
 * (x,y) = (cos(i * ((2 * Math.PI) / n)), sin(i * ((2 * Math.PI) / n)))
 */
function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  // 绘制正多边形 n:n边形 dx dy 多边形中心坐标 size 多边形大小
  function drawPolygon(ctx, n, dx, dy, size) {
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const degree = i * ((2 * Math.PI) / n);
      const x = Math.cos(degree);
      const y = Math.sin(degree);
      ctx.lineTo(x * size + dx, y * size + dy);
    }
    ctx.closePath();
  }

  // 先绘制出路径再填充路径
  drawPolygon(ctx, 5, 100, 70, 50);
  // ctx.fillStyle = 'blue';
  ctx.stroke();
}
draw();
```

- 绘制方格调色板

```js
// 用两层循环绘制方格列阵
// 获取canvas对象
function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      // 绘制每一个方格  42.5 计算方式为 255 / 6
      ctx.fillStyle = `rgb(${Math.floor(255 - 42.5 * i)},${Math.floor(
        255 - 42.5 * j
      )}, 0)`;
      ctx.fillRect(j * 25, i * 25, 25, 25);
    }
  }
}
draw();
```

- 绘制渐变色调色板

```js
function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  let r = 255;
  let g = 0;
  let b = 0;
  for (i = 0; i < 150; i++) {
    if (i < 25) {
      g += 10;
    } else if (i > 25 && i < 50) {
      r -= 10;
    } else if (i > 50 && i < 75) {
      g -= 10;
      b += 10;
    } else if (i >= 75 && i < 100) {
      r += 10;
    } else {
      b -= 10;
    }
    ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
    ctx.fillRect(3 * i, 0, 3, canvas.height);
  }
}
draw();
```

## Canvas 曲线图形（圆和弧线）

```js
/**
 * 关于Canvas曲线图的学习过程，我将分为以下四个方面进行讲解：
 * 1. 圆形
 * 2. 弧线
 * 3. 二次贝塞尔曲线
 * 4. 三次贝塞尔曲线
 *
 * 本节课会拆分成两个小结来描述：圆形、弧线 和 贝塞尔曲线
 */
```

```js
/**
 * 一、圆形
 * 在Canvas中，我们可以使用arc()方法来绘制一个圆
 * arc(x, y, 半径, 开始角度, 结束角度, 是否逆时针)
 * 需要注意的是，绘制圆前，我们必须用beginPath()来声明“开始新路径”,然后才可以开始绘制
 * 绘制完成后，使用closePath() "关闭路径"，一般来说，这两个方法是成对出现的
 *
 * 注意：
 * 1. 圆形默认是逆时针绘制的
 * 2. 定义开始结束角度，我推荐一种写法可以方便快速看出度数：120 * Math.PI/180 // 120°
 * 3. 绘制完成后（closePath()）必须描边(stroke())才可以出现效果
 * 4. 使用fill()可以进行填充圆
 */

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // 半圆
  ctx.beginPath();
  ctx.arc(80, 80, 50, 0, (180 * Math.PI) / 180, true);
  ctx.closePath();
  ctx.strokeStyle = 'red';
  ctx.stroke();

  // 整圆
  ctx.beginPath();
  ctx.arc(120, 80, 50, 0, (360 * Math.PI) / 180, true);
  ctx.closePath();
  ctx.strokeStyle = 'red';
  ctx.fillStyle = 'rgba(255, 10, 15, .6)';
  ctx.stroke();
  ctx.fill();
}
draw();
```

- 弧线

```js
/**
 * 二、弧线
 * Canvas中，arc还可以用于绘制弧线
 * 大家一定要记住，虽然绘制弧线和圆形都用arc，但是有一点必须牢记：
 * 弧线不是一个闭合图形，所以，无需调用closePath()
 */

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // 弧线
  ctx.beginPath();
  ctx.arc(200, 200, 50, 0, (180 * Math.PI) / 180, true);
  ctx.strokeStyle = 'blue';
  ctx.stroke();
}
draw();
```

```js
/**
 * 我们还可以使用 arcTo(cx, cy, x2, y2, radius)来绘制弧线
 * cx cy 表示控制点坐标
 * x2 y2 表示结束点坐标
 * radius 表示圆弧的半径
 *
 * 用arcTo 绘制弧线，我们需要提供3个点：开始点、控制点、结束点。
 * 一般来说，开始点由 moveTo() 或者lineTo() 提供，arcTo()提供控制点和结束点
 *
 * arcTo绘制的弧线，是一个半径为radius的圆，与控制点到开始点和控制点到结束点形成的夹角相切那一部分的圆的弧线。
 * 所以，弧线的起点是切线的起点，弧线的终点是切线的终点
 */
function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // 弧线
  ctx.moveTo(20, 20);
  ctx.lineTo(70, 20);
  ctx.arcTo(120, 20, 120, 70, 50);
  ctx.lineTo(120, 120);
  ctx.stroke();
}
draw();
```

## Canvas 曲线图形（贝塞尔曲线）

- 二次贝塞尔曲线

```js
/**
 * 二次贝塞尔曲线
 * 在Canvas中，我们可以运用quadraticCurveTo()方法来绘制二次贝塞尔曲线。
 * 完整语法如下：
 * ctx.quadraticCurveTo(cx, cy, x2, y2)
 * cx, cy 为控制点坐标 ，x2, y2 为结束点坐标
 * 绘制贝塞尔曲线与绘制弧线类似，也需要3个点的坐标，开始点，控制点，结束点。
 * 开始点一般由moveTo()或者lineTo()提供，控制点和结束点由quadraticCurveTo()提供。
 */

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  ctx.moveTo(300, 120);
  ctx.quadraticCurveTo(300, 20, 360, 120);
  ctx.stroke();

  // 案例：使用二次贝塞尔曲线实现气泡
  ctx.moveTo(75, 25);
  ctx.quadraticCurveTo(25, 25, 25, 62);
  ctx.quadraticCurveTo(25, 100, 50, 100);
  ctx.quadraticCurveTo(50, 120, 65, 100);
  ctx.quadraticCurveTo(125, 100, 125, 62);
  ctx.quadraticCurveTo(125, 25, 75, 25);
  ctx.stroke();
}
draw();
```

- 三次贝塞尔曲线

```js
/**
 * 在Canvas中，我们使用 bezierCurveTo()来绘制三次贝塞尔曲线。
 * 语法：
 * ctx.bezierCurveTo(cx1, cy1, cx2, cy2, x, y)
 * cx1, cy1 表示控制点1的坐标，cx2, cy2 表示控制点2的坐标，x, y 表示结束点坐标
 * 绘制三次贝塞尔曲线需要4个点的坐标，开始点，控制点1， 控制点2，结束点。
 * 开始点一般由moveTo()或者lineTo()提供，控制点和结束点由bezierCurveTo()提供。
 * 与二次贝塞尔相比，三次增加了一个控制点。
 */

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');
  ctx.moveTo(20, 60);
  const cx1 = 20;
  const cy1 = 20;
  const cx2 = 120;
  const cy2 = 120;
  const endX = 120;
  const endY = 60;
  ctx.bezierCurveTo(cx1, cy1, cx2, cy2, endX, endY);
  ctx.stroke();
}
draw();
```

- 用三次贝塞尔曲线画 “♥”

```js
function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  ctx.moveTo(75, 40);
  ctx.bezierCurveTo(75, 37, 70, 25, 50, 25);
  ctx.bezierCurveTo(20, 25, 20, 62.5, 20, 62.5);
  ctx.bezierCurveTo(20, 80, 40, 102, 75, 120);
  ctx.bezierCurveTo(110, 102, 130, 25, 100, 25);
  ctx.bezierCurveTo(85, 25, 75, 37, 75, 40);
  ctx.fillStyle = 'red';
  ctx.stroke();
  ctx.fill();
}
draw();
```

## 绘制扇形图

```html
<html>
  <body>
    <canvas
      id="myCanvas"
      width="200"
      height="150"
      style="border: 1px dashed gray"
    ></canvas>
  </body>
</html>
<script>
  /*
    案例：绘制扇形图
  */

  // 获取canvas对象
  const cnv = document.getElementById('myCanvas');
  // 获取上下文对象context
  const ctx = cnv.getContext('2d');

  ctx.beginPath();
  ctx.moveTo(100, 75);
  ctx.arc(
    cnv.width / 2,
    cnv.height / 2,
    50,
    (0 * Math.PI) / 180,
    (120 * Math.PI) / 180,
    false
  );
  ctx.closePath();
  ctx.fillStyle = 'HotPink';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(100, 75);
  ctx.arc(
    cnv.width / 2,
    cnv.height / 2,
    50,
    (120 * Math.PI) / 180,
    (250 * Math.PI) / 180,
    false
  );
  ctx.closePath();
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.beginPath();
  ctx.moveTo(100, 75);
  ctx.arc(
    cnv.width / 2,
    cnv.height / 2,
    50,
    (250 * Math.PI) / 180,
    (360 * Math.PI) / 180,
    false
  );
  ctx.closePath();
  ctx.fillStyle = 'green';
  ctx.fill();
</script>
```

## 设置线条样式

```js
/**
 * 常见的绘制线条样式的属性和方法有如下几种：
 * lineWidth 定义线条宽度
 * lineCap 定义线帽样式 —— buff 默认
 * round 圆形线帽
 * square 方形线帽
 *
 * 请注意观察案例，线帽会使线长略微增加，圆形线帽，直径为线宽。方形线帽，长度为线宽的一半。
 * lineJoin 定义两个线交接处样式 miter 尖叫 round 圆角 bevel 斜角。
 * setLineDash() 定义线条的虚线样式 参数为数组 需要注意的是IE不支持该参数
 */

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // 定义线宽为 5
  ctx.beginPath();
  // 设置虚线
  // ctx.setLineDash([10]) //[实线长度, 间隙长度]
  ctx.lineWidth = 5;
  ctx.moveTo(20, 20);
  ctx.lineTo(180, 20);
  ctx.stroke();

  // 定义线宽为 10
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.lineCap = 'round'; // 定义线帽样式
  ctx.moveTo(20, 70);
  ctx.lineTo(180, 70);
  ctx.stroke();

  // 定义线宽为 20 的弧线
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.lineCap = 'square'; // 定义线帽样式
  ctx.arc(70, 170, 50, 0, (-90 * Math.PI) / 180, false);
  ctx.stroke();

  // 做一个圆角Z
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.lineJoin = 'round';
  ctx.moveTo(300, 50);
  ctx.lineTo(350, 50);
  ctx.lineTo(300, 100);
  ctx.lineTo(350, 100);
  ctx.stroke();
}
draw();
```

## 文本操作

```js
/**
 * 我们需要重点掌握以下几种方法和属性：
 * fillText(text, x, y, maxWidth) 绘制填充文本 ；
 * strokeText(text, x, y, maxWidth) 绘制描边文本 ， -text 字符串文本 -x 横坐标 -y 纵坐标 -maxWidth 可选参数 允许最大文本宽度，如果超出则文本会被压缩 ；
 * measureText(textStr) 获取文本的长度 一般我们这样获取文本长度，cxt.measureText(textStr).width
 * font 定义文本字体
 * textAlign 定义文本水平对齐方式，以指定坐标为基准的几种水平对齐方式 ，这个比较好理解，就不做过多的说明。 -start 文本在指定的横坐标开始 -end 文本在指定的横坐标结束 -left 文本左对齐 -right 文本右对齐 -center 文本的中心在指定的横坐标
 * textBaseline 定义文本垂直方向的对齐方式 请参考案例效果去理解，-alphabetic 文本基准线是普通英文字母的基准线 -top 文本基准线是em方框的顶端 -middle 文本基准线是em方框的中心 -bottom 文本基准线是em方框的底端 ；
 * fillStyle 文本填充路径颜色；
 * strokeStyle 文本描边路径颜色， 同前边所讲的绘制线段一样，文本的绘制也是先定义属性，在执行绘制方法，才会生效！
 */

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  const text = 'javaScript是世界上最灵活的语言！';
  ctx.font = 'bold 30px 微软雅黑';
  ctx.strokeStyle = 'purple';
  ctx.strokeText(text, 30, 60);

  const text2 = 'javaScript是世界上最灵活的语言！';
  ctx.strokeStyle = 'blue';
  ctx.strokeText(text, 30, 110, 300);

  const text3 = 'javaScript是世界上最灵活的语言！';
  ctx.font = 'bold 30px 微软雅黑';
  ctx.fillStyle = 'purple';
  ctx.fillText(text3, 30, 160);

  // 小技巧，文本居中
  const text4 = '点赞、收藏、喜欢，感谢大家';
  ctx.font = '20px bold';
  const textWidth = ctx.measureText(text4).width;
  const canvasWidth = canvas.width;
  const xPosition = (canvasWidth - textWidth) / 2;
  ctx.fillStyle = 'purple';
  ctx.fillText(text4, xPosition, 210);

  // textBaseline 属性理解
  // 做一条基准线
  ctx.strokeStyle = 'purple';
  ctx.moveTo(30, 360);
  ctx.lineTo(500, 360);
  ctx.stroke();
  // 绘制文字
  // alphabetic
  const text5 = 'alphabetic';
  ctx.textBaseline = 'alphabetic';
  ctx.fillText(text5, 10, 360);
  // top
  const text6 = 'top';
  ctx.textBaseline = 'top';
  ctx.fillText(text6, 110, 360);
  // middle
  const text7 = 'middle';
  ctx.textBaseline = 'middle';
  ctx.fillText(text7, 160, 360);
  // bottom
  const text8 = 'bottom';
  ctx.textBaseline = 'bottom';
  ctx.fillText(text8, 230, 360);
}
draw();
```

## 图片的加载与平铺

```js
/**
 * 我们可以将图片导入到Canvas中，对图片进行 平铺、切割、像素处理 等操作 。
 * Canvas用drawImage()来绘制图片的，drawImage()有三种调用方式，分别是：
 * drawImage(image, dx, dy)，dx 图片左上角的横坐标，dy 图片左上角的纵坐标 ；
 * drawImage(image, dx, dy, dw, dh)，dw 图片宽度，dh 图片高度；
 * drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh)，sx sy sw sh 表示图片被截取的范围；
 * 我们可以使用createPattern(image, type)方法来定义图片的平铺，type 有四个属性：
 * repeat 默认值，在水平和垂直方向同时平铺；
 * repeat-x 水平平铺；
 * repeat-y 垂直平铺；
 * no-repeat 不平铺，该方法需要和fillStyle结合使用才有效，例如：cxt.fillStyle = cxt.createPattern(image, type) cxt.fillRect()；
 * 但是！注意了，敲黑板！在createPattern中传image，不仅仅只可以传Image对象，也可以传一个Canvas对象！这样就能把绘制的Canvas图像当作平铺背景了！！！！
 */

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // 平铺有问题
  // const image3 = new Image();
  // image3.src = './sun.png';
  // image3.onload = () => {
  //   const reatePattern = ctx.createPattern(image3, 'repeat');
  //   ctx.fillStyle = reatePattern;
  //   ctx.fillRect(0, 0, 100, 100);
  // };

  const image = new Image();
  image.src = './sun.png';
  image.onload = () => {
    ctx.drawImage(image, 40, 20, 300, 200);
  };

  const image2 = new Image();
  image2.src = './moon.png';
  image2.onload = () => {
    ctx.drawImage(image2, 0, 0, 80, 80, 40, 250, 100, 100);
  };
}
draw();
```

## 图片的切割

```js
/*
  使用clip()方法去切割一张图片
    1. 绘制基本图形
    2. 使用clip()方法
    2. 绘制图片
*/

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // 1. 绘制基本图形用于切割图片
  ctx.beginPath();
  ctx.arc(150, 120, 50, 0, (360 * Math.PI) / 180);
  ctx.closePath();
  ctx.stroke();

  // 2. 使用clip方法，使得切割区域成为上边的图形
  ctx.clip();

  // 3. 绘制图片
  const image = new Image();
  image.src = 'sun.png';
  image.onload = () => {
    ctx.drawImage(image, 10, 20, 300, 200);
  };
}
draw();
```

## 图形的平移与旋转

```js
/**
 * translate(x, y) 平移，再次注意一下，这里的平移xy是指的W3C坐标，而非数学坐标，可参考本教程的第一小节内容 。
 * scale(x, y) 缩放 x轴缩放的倍数 y轴缩放的倍数 (基于上次的大小进行缩放) 。
 * scale会影响哪些要素？需要我们谨记以下几点，防止以后写出BUG：
 * 1. 图形放大后，其左上角坐标值也会被放大，我们可以在使用scale后，再使用translate平移恢复 ；
 * 2. 图形宽度高度
 * 3. 线条的宽度
 * rotate(angle) 旋转 ：
 * 参数angle表示图形旋转角度，取值范围为 -Math.PI * 2 ~ Math.PI * 2 ，传值小于0时逆时针旋转，大于0时顺时针旋转。默认旋转中心是原点，若想指定某个坐标为旋转中心，我们可以先使用translate对旋转中心进行平移，再rotate旋转 。
 * transform()、setTransform() 变换矩阵。
 */

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  ctx.fillStyle = 'red';
  ctx.rotate((10 * Math.PI) / 180);
  ctx.fillRect(30, 30, 50, 50);
  ctx.translate(50, 50);
  ctx.fillRect(30, 30, 50, 50);
  ctx.scale(1.5, 1.5);
  ctx.translate(-10, -10);
  ctx.fillStyle = 'rgba(122, 158, 166, .5)';
  ctx.fillRect(30, 30, 50, 50);
  // 注意，Canvas平移会保留所有绘制的图形，所以以上写法会渲染原始图形和平移后的图形
  // 如果想编写一个动态平移的动画，那么每次绘制前都需要清空画布
  // 看过前边课程的人都应该记得，我们一般用clearRect(0, 0, cnv.width, cnv.height)来清空整个画布
  // 请牢记此方法，在动画开发中会经常用到
}
draw();
```

## 图片像素操作

```js
/**
 * 我们通过简单的算法，就可以对图片进行且不限于：像素反转、黑白效果、亮度、复古、马赛克等操作
 * Canvas为我们提供了如下方法：
 * cxt.getImageData(x, y, width, height)
 * 该方法的几个参数分别为：所选区域的横坐标、纵坐标、宽度、高度。
 *
 *
 * 该方法返回了一个 canvasPixelArray 对象，该对象中有个data属性，该属性保存了一张图片的像素数据数组。
 * const imgData = cxt.getImageData(x, y, width, height)
 * const data = imgData.data
 *
 * data属性中数据格式如下：
 * [r1, g1, b1, a1, r2, g2, b2, a2 ...]
 * 可见，该数组存的是rgba颜色，每四个元素一个rgba，cxt.getImageData(x, y, wudth, height).data.length就可以获取到一张图片的像素总数。
 *
 * Canvas还为我们提供了一个方法：
 * cxt.putImageData(image, x, y)
 * 该方法用于输出一张图片的像素，用来显示一张图片。
 *
 * 该方法的几个参数分别为：canvasPixelArray对象、重新绘制图片的横坐标、纵坐标。
 * 该方法通常与 getImageData() 配合使用。
 */
```

- 反转效果

```js
/**
 * 反转效果，指的是图片的颜色颠倒，实现的方法是将 RGB三个颜色的像素取各自的颠倒效果（255 - 原值）。
 * 此效果有待验证
 */
function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  const image = new Image();
  image.src = './earth.png';
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
    // 像素操作只有基于服务器才会生效
    // 获取像素数组
    // 597 × 517
    let imageData = ctx.getImageData(0, 0, 597, 517);
    let data = imageData.data;

    console.log('data====', data);
    // 遍历像素
    for (let i = 0; i < data.length; i += 4) {
      data[(i += 0)] = 255 - data[(i += 0)];
      data[(i += 1)] = 255 - data[(i += 1)];
      data[(i += 2)] = 255 - data[(i += 2)];
    }
    // 在指定位置输出图片
    ctx.putImageData(imageData, 600, 0);
  };
}
draw();
```

- 黑白效果

```js
// 黑白效果，也叫“灰度”，也就是将图片转换为黑白图片。算法为：
// 取 R G B 三个颜色的平均值，然后将这三个值全部保存为该平均值。
// 为了使黑白效果更好，我们可以给平均数加权来调试，使图片黑白效果达到最优。

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  const image = new Image();
  image.src = './earth.png';
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
    // 像素操作只有基于服务器才会生效
    // 获取像素数组
    // 597 × 517
    let imageData = ctx.getImageData(0, 0, 597, 517);
    let data = imageData.data;

    console.log('data====', data);
    // 遍历像素
    for (let i = 0; i < data.length; i += 4) {
      var grayscale = data[i] * 0.3 + data[i + 1] * 0.6 + data[i + 2] * 0.1;
      data[i + 0] = grayscale;
      data[i + 1] = grayscale;
      data[i + 2] = grayscale;
    }
    // 在指定位置输出图片
    ctx.putImageData(imageData, 517, 0);
  };
}
draw();
```

- 亮度效果

```js
// 让图片变的更明亮或者更暗。这个算法比较简单，将红绿蓝通道同时加上或减去一个值。

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  const image = new Image();
  image.src = './earth.png';
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
    // 像素操作只有基于服务器才会生效
    // 获取像素数组
    // 597 × 517
    let imageData = ctx.getImageData(0, 0, 597, 517);
    let data = imageData.data;

    console.log('data====', data);
    // 遍历像素
    for (let i = 0; i < data.length; i += 4) {
      const a = 100;
      data[i + 0] += a;
      data[i + 1] += a;
      data[i + 2] += a;
    }
    // 在指定位置输出图片
    ctx.putImageData(imageData, 517, 0);
  };
}
draw();
```

- 复古效果

```js
// 使照片产生古旧的效果。算法为：分别取 红、绿、蓝 这3个通道值的某种加权平均值。

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  const image = new Image();
  image.src = './earth.png';
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
    // 像素操作只有基于服务器才会生效
    // 获取像素数组
    // 597 × 517
    let imageData = ctx.getImageData(0, 0, 597, 517);
    let data = imageData.data;

    // 遍历像素
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i + 0];
      let g = data[i + 1];
      let b = data[i + 2];
      data[i + 0] = r * 0.39 + g * 0.76 + b * 0.18;
      data[i + 1] = r * 0.35 + g * 0.68 + b * 0.16;
      data[i + 2] = r * 0.27 + g * 0.53 + b * 0.13;
    }
    // 在指定位置输出图片
    ctx.putImageData(imageData, 517, 0);
  };
}
draw();
```

- 红色蒙版

```js
// 让图片呈现偏红的效果，算法为： 将红色通道赋值给红绿蓝三色通道值的平均值，并且给绿、蓝通道赋值为0。
function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  const image = new Image();
  image.src = './earth.png';
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
    // 像素操作只有基于服务器才会生效
    // 获取像素数组
    // 597 × 517
    let imageData = ctx.getImageData(0, 0, 597, 517);
    let data = imageData.data;

    // 遍历像素
    for (let i = 0; i < data.length; i += 4) {
      let r = data[i + 0];
      let g = data[i + 1];
      let b = data[i + 2];
      const average = (r + g + b) / 3;
      data[i + 0] = average;
      data[i + 1] = 0;
      data[i + 2] = 0;
    }
    // 在指定位置输出图片
    ctx.putImageData(imageData, 517, 0);
  };
}
draw();
```

- 透明处理

```js
// 改变图片的透明度，算法：RGBA通道中，A（透明度）乘以n（0~1），然后重新保存像素数组，输出为新图片。

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  const image = new Image();
  image.src = './earth.png';
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
    // 像素操作只有基于服务器才会生效
    // 获取像素数组
    // 597 × 517
    let imageData = ctx.getImageData(0, 0, 597, 517);
    let data = imageData.data;

    // 遍历像素
    for (let i = 0; i < data.length; i += 4) {
      data[i + 3] *= 0.3;
    }
    // 在指定位置输出图片
    ctx.putImageData(imageData, 517, 0);
  };
}
draw();
```

## 区域像素的处理

```js
// Canvas为我们提供了区域像素操作的相关方法：
// cxt.createImageData(sw, sh)
// cxt.createImageData(imageData)
// 该方法通常配合 createImageData() 和 putImageData() 对一个区域进行像素操作。

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  let imageData = ctx.createImageData(100, 100);
  let data = imageData.data;
  for (let i = 0; i < 100 * 100 * 4; i += 4) {
    data[i + 0] = 0;
    data[i + 1] = 0;
    data[i + 2] = 255;
    data[i + 3] = 255;
  }
  ctx.putImageData(imageData, 600, 0);
}
draw();
```

## 渐变

```js
/**
 * 1. 线性渐变
 * 线性渐变，指的是沿着一条直线进行渐变。我们平时在页面开发中，大多数情况都是线性渐变。
 * 在Canvas开发中，我们可以配合使用 createLinearGradient() 和 addColorStop()这两个方法来实现线性渐变。
 *
 * addColorStop()方法可以调用n次，第一次表示渐变开始的颜色，第二次表示渐变结束的颜色，第三次会以第二次为开始颜色渐变，以此类推。
 * 最后将gnt赋值给fillStyle，并调用fill()开始绘制线性渐变。
 *
 * cxt.createLinearGradient(x1, y1, x2, y2)
 * x1 y1 表示渐变开始的横纵坐标
 * x2 y2表示渐变结束的横纵坐标
 * createLinearGradient用来定义 从x1 y1到x2 y2的线性渐变，因为，我们可以利用这两个坐标来绘制不同方向的线性渐变效果。
 *
 * gnt.addColorStop(value1, color1)
 * gnt.addColorStop(value2, color2)
 *
 * value表示渐变的偏移量，取值范围为0-1。value1表示渐变开始的位置，value2表示渐变结束的位置。
 * color表示渐变颜色，颜色可以使用rgb、十六进制颜色，color1表示渐变开始颜色，color2表示渐变结束颜色。
 * 绘制渐变中，除了可以fill()，我们还可以使用fillRec()和fillText()，用来绘制图形渐变和文字渐变。
 */

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  const gnt = ctx.createLinearGradient(0, 150, 200, 150);
  gnt.addColorStop(0, 'HotPink');
  gnt.addColorStop(1, 'white');
  ctx.fillStyle = gnt;
  ctx.fillRect(0, 0, 200, 500);
}
draw();
```

- 文字渐变

```js
function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  const text = 'JavaScript 是世界上最灵活的语言';
  ctx.font = 'bold 50px 微软雅黑';

  const gnt = ctx.createLinearGradient(0, 75, 800, 75);
  gnt.addColorStop(0, 'HotPink');
  gnt.addColorStop(1, 'LightSkyBlue');

  ctx.fillStyle = gnt;
  ctx.fillText(text, 10, 90);
}
draw();
```

- 径向渐变

```js
/**
 * 径向渐变，是一种颜色从内到外的渐变，是从一个起点向所有方向进行渐变。
 * 使用方式类似于线性渐变，这里不做过多赘述。这里对createRadialGradient()参数做一下说明：
 * x1 y1 表示渐变开始的圆心坐标，r1 表示渐变开始时圆的半径。
 * x2 y2表示渐变结束的圆心坐标，r2表示渐变结束时圆的半径。
 */

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // 画圆
  ctx.beginPath();
  ctx.arc(80, 80, 50, 0, Math.PI * 2, true);
  ctx.closePath();

  // 渐变
  const gnt = ctx.createRadialGradient(100, 60, 10, 80, 80, 50);
  gnt.addColorStop(0, 'white');
  gnt.addColorStop(0.9, 'orange');
  gnt.addColorStop(1, 'rgba(0, 0, 0, 0)');

  // 填充
  ctx.fillStyle = gnt;
  ctx.fill();
}
draw();
```

## 阴影

```js
/**
 * 阴影，是一种常见的页面效果，和css3一样，在Canvas中，也可以为图形、文字等添加阴影效果。
 * 在Canvas中，常见的阴影属性如下：
 * shadowOffsetX	阴影与图形的水平距离，默认0。>0向右偏移，反之向左偏移。
 * shadowOffsetY	阴影与图形的垂直距离，默认0。>0向下偏移，反之向上偏移。
 * shadowColor	阴影颜色，默认 黑色
 * shadowBlur	阴影模糊值，默认为0。该值越大，模糊度越强。
 *
 */
```

- 图形阴影：

```js
function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // 设置左上方的阴影
  ctx.shadowOffsetX = -5;
  ctx.shadowOffsetY = -5;
  ctx.shadowColor = 'LightSkyBlue';
  ctx.shadowBlur = 1;
  ctx.fillStyle = 'HotPink';
  ctx.fillRect(30, 30, 50, 50);
}
draw();
```

- 文字阴影：

```js
function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // 设置阴影
  ctx.shadowOffsetX = 5;
  ctx.shadowOffsetY = 5;
  ctx.shadowColor = 'LightSkyBlue';
  ctx.shadowBlur = 10;
  const text = 'JavaScript 是世界上最灵活的语言！';
  ctx.font = 'bold 60px 微软雅黑';
  ctx.fillStyle = 'HotPink';
  ctx.fillText(text, 10, 90);
}
draw();
```

- 图片阴影：

```js
// 如何实现四个方向的阴影呢？
// 只需要我们为 shadowOffsetX和shadowOffsetY都设置为0，即可实现四个方向的阴影。

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  const image = new Image();
  image.src = './sun.png';
  image.onload = () => {
    ctx.shadowOffsetX = 5;
    ctx.shadowOffsetY = 5;
    ctx.shadowColor = 'LightSkyBlue';
    ctx.shadowBlur = 10;
    ctx.drawImage(image, 10, 10);
  };
}
draw();
```

## Canvas 路径

```js
/**
 * Canvas路径概念，非常重要。除了矩形，其它基本图形：直线、多边形、圆形，弧线，贝塞尔曲线，都是以路径为基础的。
 *
 * beginPath()	开始一条新的路径
 * closePath()	关闭当前路径
 * isPointInPath()	判断某一个点是否存在于当前路径
 * beginPath、 closePath 只应用于Canvas基本图形哦。
 *
 * 1.beginPath()
 * beginPath() 方法用于开始一个新路径。
 * Canvas是基于状态来绘制图形的，每一次绘制(stroke()、fill())，都会去检测整个程序定义的所有状态，这些被检测的状态包括：fillStyle、 strokeStyle、 lineWidth等。
 * 当一个状态没有被改变时，Canvas就会使用最初的值。而当一个状态被改变时：
 * 如果使用beginPath()开始一个新路径，则不同路径使用不同的值。
 * 如果没有使用beginPath()，前边的属性值会被后边的覆盖掉。
 * 记住，判断是否处于同一个路径，只能去看是否使用了beginPath()。
 *
 * closePath()
 * closePath()方法用于关闭当前路径。
 * 请大家注意，Canvas中的“关闭路径”，指的是将同一个路径中的起点与终点连接起来，使其成为一个封闭的图形，不等于“结束路径”。canvas中没有结束路径，只有beginPath()开始新路径。
 */
```

- 使用路径

```js
function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // 第一条直线
  ctx.beginPath(); // 使用了beginPath 才会是红色
  ctx.moveTo(50, 40);
  ctx.lineTo(150, 40);
  ctx.strokeStyle = 'red';
  ctx.stroke();

  // 第二条直线
  ctx.beginPath(); // 使用了beginPath 才会是绿色
  ctx.moveTo(50, 80);
  ctx.lineTo(150, 80);
  ctx.strokeStyle = 'green';
  ctx.stroke();

  // 第三条直线
  ctx.beginPath(); // 使用了beginPath 才会是蓝色
  ctx.moveTo(50, 120);
  ctx.lineTo(150, 120);
  ctx.strokeStyle = 'blue';
  ctx.stroke();
}
draw();
```

- 路径的关闭

```js
// 一个没有关闭路径的弧线：
ctx.beginPath();
ctx.arc(70, 70, 50, 0, (-90 * Math.PI) / 180, true);
ctx.stroke();

// 下边是一个关闭路径的弧线：
// 请注意，一定要在stroke()、fill() 绘制方法之前关闭路径。
ctx.beginPath();
ctx.arc(70, 70, 50, 0, (-90 * Math.PI) / 180, true);
ctx.closePath();
ctx.stroke();
```

- isPointInPath

```js
// isPointInPath()
// 判断一个点是否存在于当前路径中。
// 利用该方法，我们就可以非常方便的判断某个点是否处于图形中（如：矩形、圆形 等）。

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  ctx.strokeStyle = 'blue';
  ctx.rect(50, 50, 80, 80);
  ctx.stroke();
  const timer = setTimeout(() => {
    if (ctx.isPointInPath(100, 50)) {
      console.log('100, 50 处于当前路径中');
    }
  }, 1500);
}
draw();
```

## Canvas 状态

```js
/**
 * Canvas为我们提供了两个操作状态的方法：
 * save()	保存当前状态
 * restore()	恢复之前保存的状态
 *
 * 注意：如果绘制矩形剪切区，则只能使用rect()，绝不允许使用strokeRect()或者fillRect()，因为clip()不支持他们。
 *
 * Canvas状态的保存和恢复我们一般用在以下三种场景：
 * 图形或图片的剪切
 * 图形或图片的变形
 * 改变图形的属性（描边、填充、字体、阴影等）
 * 使用流程是，绘制前一个场景时，我们调用save()保存，绘制下一个场景时我们restore()恢复即可。
 */

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // 绘制描边圆
  ctx.save();
  ctx.beginPath();
  ctx.arc(50, 50, 40, 0, (360 * Math.PI) / 180, true);
  ctx.closePath();
  ctx.strokeStyle = 'red';
  ctx.stroke();
  // 使描边圆成为剪切区域
  ctx.clip();

  // 绘制填充矩形
  ctx.beginPath();
  ctx.fillStyle = 'blue';
  ctx.fillRect(50, 50, 100, 80);

  // 绘制第二个图形
  ctx.restore();
  ctx.beginPath();
  ctx.fillStyle = 'pink';
  ctx.fillRect(100, 50, 100, 80);
}
draw();
```

## 基础知识拓展

```js
/**
 * 1.清空画布
 * Canvas对象有两个属性：
 * width	Canvas对象的宽度
 * height	Canvas对象的高度
 *
 * 利用该属性，我们可以方便的实现画布清空操作。
 * 绘制帧动画时，每次重绘前清空画布，即使用该方法实现。
 * cxt.clearRect(0, 0, cnv.width, cnv.height)
 *
 * 2.导出图片
 * getContext('2d')	获取 Canvas 2D 上下文环境对象
 * toDataUrl(type)	获取 Canvas 对象产生的位图字符串对象
 * toDataUrl(type)方法种，type为可选参数，默认值为 'image/png',用来指定浏览器打开文件的扩展类型。
 * 该方法返回一个base64字符串，即为一张图片。
 *
 * 3. globalAlpha 属性
 * 在Canvas中，我们可以使用 globalAlpha属性来定义Canvas环境的透明度。
 * 默认值为 1，取值范围为 0-1，该属性必须在图形绘制之前定义。
 * 该属性对整个画布都起作用，使用前一定要谨慎。
 *
 * 4. globalCompositeOperation 属性
 * 在一般开发中，我们经常会遇到不同的图形交叉在一起，正常情况下，图形的顺序是按照我们的绘制顺序来渲染的，即后渲染的会堆叠在最顶部。
 * 所以，如果想要改变交叉图形的显示方式，我们可以使用 globalCompositeOperation 属性来实现。
 * cxt.globalCompositeOperation = "属性值"
 *
 * source-over	默认值，新图形覆盖旧图形
 * copy	只显示新图形，旧图形做透明处理
 * darker	两图形都显示，重叠部分的颜色会被显示为两图形颜色相减后的样子
 * destination-atop	只显示新旧图形的重叠部分和新图形的其余部分
 * destination-in	只显示新旧图形的重叠部分
 * destination-out	只显示新旧图形的不重叠部分
 * destination-over	与默认值相反，旧图形覆盖新图形
 * lighter	两种图形都显示，重叠部分的颜色会被显示为两图形颜色相加后的样子
 * source-atop	只显示新旧图形的重叠部分和旧图形的其余部分
 * source-in	只显示新图中与旧图形的重叠部分
 * source-out	只显示新图中与旧图形的不重叠部分
 * xor	两图都绘制，重叠部分透明处理
 *
 */
```
