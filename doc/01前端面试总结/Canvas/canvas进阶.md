## 事件操作

```js
/**
 * 在Canvas开发中，常见的事件有三种：鼠标事件、键盘事件、循环事件
 *
 * 鼠标事件分为3种：
 * 鼠标按下 mousedown
 * 鼠标松开 mouseup
 * 鼠标移动 mousemove
 *
 * 获取鼠标指针位置
 * 我们可以通过 pageX与pageY这两个属性来确定鼠标指针当前位置，然后再结合画布相对于文档的偏移距离，我们就可以确定鼠标在画布中的相对坐标。
 *
 * 键盘事件
 * 在Canvas开发中，常用的键盘事件有两个：
 * 键盘按下 keydown
 * 键盘松开 keyup
 * 因为Canvas本身无法绑定键盘事件，所以实际开发中我们是监听window键盘事件来实现的。
 * window.addEventListener(type, fn, false)
 * type为字符串类型，指的是事件类型。
 * 在javaScript中，我们使用keyCode来判断用户按下了哪个键，在这里我们只列出Canvas开发中常用的几个keyCode。
 *
 * W	87
 * S	83
 * A	65
 * D	68
 * ↑	38
 * ↓	40
 * ←	37
 * →	39
 *
 * 循环事件
 * 我们平时实现一个动画效果，第一个想到的就是 setInterval()来定时绘制。
 * 其实，这种方式无法准确的绘制帧率，在Canvas种，我们使用 requestAnimationFrame()来实现循环。
 * 这个单词有点长，不过不要害怕，很好记忆的。
 * request 请求
 * animation 动画
 * frame 帧
 * 合起来 —— 请求动画帧
 *
 */
```

- 获取鼠标指针位置

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <style>
    #tutorial {
      border: 1px solid #000;
    }
  </style>
  <body>
    <div id="text"></div>
    <canvas id="tutorial" width="1000" height="1000"></canvas>

    <script type="text/javascript">
      // 定义鼠标位置计算函数，我们一般命名到一个js模块中导入使用
      /**
       * @element 传入canvas对象
       */
      const getMouse = (element) => {
        let mouse = { x: 0, y: 0 }; // 存储鼠标位置信息
        element.addEventListener('mousemove', (e) => {
          let x = e.pageX;
          let y = e.pageY;
          // 计算鼠标在canvas画布中的相对位置
          mouse.x = x - element.offsetLeft;
          mouse.y = y - element.offsetTop;
        });
        return mouse;
      };

      function draw() {
        var canvas = document.getElementById('tutorial');
        if (!canvas.getContext) return;
        var ctx = canvas.getContext('2d');

        const mouse = getMouse(canvas);

        canvas.addEventListener('mousemove', () => {
          document.getElementById(
            'text'
          ).innerHTML = `鼠标坐标为:${mouse.x}, ${mouse.y}`;
        });
      }
      draw();
    </script>
  </body>
</html>
```

- 封装获取键盘事件

```js
// 定义键盘事件
const getKey = () => {
  let key = {};
  window.addEventListener(
    'keydown',
    (e) => {
      if (e.keyCode === 38 || e.keyCode === 87) {
        key['direction'] = 'up';
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        key['direction'] = 'right';
      } else if (e.keyCode === 40 || e.keyCode === 83) {
        key['direction'] = 'down';
      } else if (e.keyCode === 37 || e.keyCode === 65) {
        key['direction'] = 'left';
      } else {
        key['direction'] = null;
      }
    },
    false
  );
  return key;
};
```

- 键盘控制小球移动

```js
// 定义键盘事件
const getKey = () => {
  let key = {};
  window.addEventListener(
    'keydown',
    (e) => {
      if (e.keyCode === 38 || e.keyCode === 87) {
        key['direction'] = 'up';
      } else if (e.keyCode === 39 || e.keyCode === 68) {
        key['direction'] = 'right';
      } else if (e.keyCode === 40 || e.keyCode === 83) {
        key['direction'] = 'down';
      } else if (e.keyCode === 37 || e.keyCode === 65) {
        key['direction'] = 'left';
      } else {
        key['direction'] = null;
      }
    },
    false
  );
  return key;
};
// 绘制小球
const drawBall = (x, y, ctx) => {
  ctx.beginPath();
  ctx.arc(x, y, 20, 0, (360 * Math.PI) / 180, true);
  ctx.closePath();
  ctx.fillStyle = 'blue';
  ctx.fill();
};

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  var ctx = canvas.getContext('2d');

  // 初始化小球
  let x = 100;
  let y = 0;
  drawBall(x, y, ctx);
  // 获取按键方向
  const key = getKey();
  window.addEventListener(
    'keydown',
    (e) => {
      e.preventDefault();
      // 每次绘制前清空画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // 根据事件重绘小球
      switch (key['direction']) {
        case 'up':
          y -= 2;
          break;
        case 'down':
          y += 2;

          break;
        case 'left':
          x -= 2;
          break;
        case 'right':
          x += 2;
          break;
        default:
          break;
      }
      drawBall(x, y, ctx);
    },
    false
  );
}
draw();
```

## 三角函数

```js
/**
 * 因为，在很多动画和绘图中，三角函数都有着举足轻重的作用。例如，仪表盘、正多边形、波浪线...等等都用到了三角函数。
 *
 * 什么是三角函数
 * 三角函数一般用于计算“未知长度的边”和 “未知度数的角”，常见的三角函数有三种：
 * 正弦函数 sin(θ)
 * 余弦函数 cos(θ)
 * 正切函数 tan(θ)
 *
 * sin(θ) = X / R
 * cos(θ) = Y / R
 * tan(θ) = X / Y
 * θ = arcsin(X/R)
 * θ = arccos(Y/R)
 * θ = arctan(X/Y)
 * 
 * 我们可以用js来描述：
 * 在Canvas中，我们采用弧度制， 180°我们要写成 Math.PI，我们一般采用 “度数 * Math.PI / 180”来直观的表示度数。

 * Math.sin(θ * Math.PI / 180) // sin(θ)
 * Math.cos(θ * Math.PI / 180) // cos(θ)
 * Math.tan(θ * Math.PI / 180) // tan(θ)

 * Math.asin(X/R) * 180 / Math.PI // arcsin(X/R)
 * Math.acos(Y/R) * 180 / Math.PI // arccos(Y/R)
 * Math.atan(X/Y) * 180 / Math.PI // arctan(X/Y)
 */
```

- 两边之间的夹角

```js
/**
 * 通过Math.atan()（反正切函数）我们很容易计算出两边之间的夹角，但是呢，反正切函数有个缺点，就是一个度数可能对应两个夹角的问题。
 * 我们可以看出来，对角的两个三角形 tan 值都是相等的！并且对角的两个三角形角度数都是相等的！
 * 因此，当我们知道一个度数后，我们根本没法去确定，这个角是属于哪两个边的夹角。
 *
 *
 * 对此问题，javaScript给出了我们解决方案，可以准确的求出两边之间的夹角度数：
 * Math.atan2(y, x)
 *
 * Math.atan2(y, x) y表示对边的长，x表示临边的长。
 * 对于Math.atan 来说，对角的两个三角形，他们的结果都是一样的，
 * 例如：Math.atan(1/2) 等于 Math.atan((-1)/(-2))，但是，对于Math.atan2来说，它们是有区别的！
 *
 * 一定要记牢！Math.atan2((-1)/(-2)) 计算得出的角度是 Math.atan2(1/2) 的补角！
 */

// 构造函数，定义绘制箭头类
function Arrow(x, y, color, angle) {
  // 箭头中心的横坐标，默认为0
  this.x = x || 0;
  // 箭头中心纵坐标，默认为0
  this.y = y || 0;
  // 箭头颜色
  this.color = color || 'red';
  // 旋转角度
  this.angle = angle || 0;
}

// 绘制箭头方法
Arrow.prototype.stroke = function (cxt) {
  cxt.save();
  cxt.translate(this.x, this.y);
  cxt.rotate(this.angle);
  cxt.strokeStyle = this.color;
  cxt.beginPath();
  cxt.moveTo(-20, -10);
  cxt.lineTo(0, -10);
  cxt.lineTo(0, -20);
  cxt.lineTo(20, 0);
  cxt.lineTo(0, 20);
  cxt.lineTo(0, 10);
  cxt.lineTo(-20, 10);
  cxt.closePath();
  cxt.stroke();
  cxt.restore();
};

Arrow.prototype.fill = function (cxt) {
  cxt.save();
  cxt.translate(this.x, this.y);
  cxt.rotate(this.angle);
  cxt.fillStyle = this.color;
  cxt.beginPath();
  cxt.moveTo(-20, -10);
  cxt.lineTo(0, -10);
  cxt.lineTo(0, -20);
  cxt.lineTo(20, 0);
  cxt.lineTo(0, 20);
  cxt.lineTo(0, 10);
  cxt.lineTo(-20, 10);
  cxt.closePath();
  cxt.fill();
  cxt.restore();
};

const getMouse = (element) => {
  let mouse = { x: 0, y: 0 }; // 存储鼠标位置信息
  element.addEventListener('mousemove', (e) => {
    let x = e.pageX;
    let y = e.pageY;
    // 计算鼠标在canvas画布中的相对位置
    mouse.x = x - element.offsetLeft;
    mouse.y = y - element.offsetTop;
  });
  return mouse;
};

// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');

// 实例化一个箭头
let arrow = new Arrow(cnv.width / 2, cnv.height / 2);
// 获取鼠标指针
const mouse = getMouse(cnv);
(function drawFrame() {
  window.requestAnimationFrame(drawFrame, cnv);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  const dx = mouse.x - cnv.width / 2;
  const dy = mouse.y - cnv.height / 2;

  // 计算鼠标指针与箭头中心的夹角
  arrow.angle = Math.atan2(dy, dx);

  arrow.fill(cxt);
})();
```

## 物理动画

```js
/**
 *  两点间的距离
 * 在坐标系中，有两点 (x1, y1) 和 (x2, y2)，请大家想办法计算出这两点间的距离
 * 文字描述为： 距离的平方 = DX的平方 + DX的平方
 *
 * 用代码表示如下：
 * const dx = x2 - x1
 * const dy = y2 - y1
 * const distance = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2))
 * Math.sqrt 方法用于求一个属的平方根，Math.pow 方法用于求 x 的 y 次方。
 */
```

- 获取鼠标指针到画布中心点的距离。

```js
const getMouse = (element) => {
  let mouse = { x: 0, y: 0 }; // 存储鼠标位置信息
  element.addEventListener('mousemove', (e) => {
    let x = e.pageX;
    let y = e.pageY;
    // 计算鼠标在canvas画布中的相对位置
    mouse.x = x - element.offsetLeft;
    mouse.y = y - element.offsetTop;
  });
  return mouse;
};

// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');

const x = cnv.width / 2;
const y = cnv.height / 2;
// 获取鼠标指针
const mouse = getMouse(cnv);
function drawFrame() {
  window.requestAnimationFrame(drawFrame, cnv);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  cxt.save();
  cxt.beginPath();
  cxt.moveTo(x, y);
  cxt.lineTo(mouse.x, mouse.y);
  cxt.closePath();
  cxt.strokeStyle = 'red';
  cxt.stroke();
  cxt.restore();

  const dx = mouse.x - x;
  const dy = mouse.y - y;
  const distance = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
  document.querySelector('#text').innerHTML =
    '鼠标指针与中心点的距离为：' + distance;
}
drawFrame();
```

- 圆周运动

```js
/**
 * 在Canvas开发中，圆周运动是我们常用的动画，圆周运动又分为 “正圆运动”和 “椭圆运动”，下面我们逐个进行讲解。
 * 正圆运动
 *
 * 根据我们上一节的内容，我们可知：
 * y / r = sin(θ) => y = r * sin(θ)
 * x / r = cos(θ) => x = r * cos(θ)
 *
 * 因此，我们可以推导出以下语法：
 * const x = centerX + Math.cos(angle) * raduis
 * const y = centerY + Math.sin(angle) * radius
 * centerX , centerY 为圆心坐标，angle为弧度角，radius为半径。
 */

// 构造函数，定义绘制小球类
function Ball(x, y, color, radius) {
  //小球中心的x坐标，默认值为0
  this.x = x || 0;
  //小球中心的y坐标，默认值为0
  this.y = y || 0;
  //小球半径，默认值为12
  this.radius = radius || 12;
  //小球颜色，默认值为“#6699FF”
  this.color = color || '#6699FF';
  //缩放倍数
  this.scaleX = 1;
  this.scaleY = 1;
  //x和y速度
  this.vx = 0;
  this.vy = 0;
}

// 绘制小球方法
Ball.prototype.stroke = function (cxt) {
  cxt.save();
  cxt.scale(this.scaleX, this.scaleY);
  cxt.strokeStyle = this.color;
  cxt.beginPath();
  cxt.arc(this.x, this.y, this.radius, 0, (360 * Math.PI) / 180, false);
  cxt.closePath();
  cxt.stroke();
  cxt.restore();
};

Ball.prototype.fill = function (cxt) {
  cxt.save();
  cxt.translate(this.x, this.y);
  cxt.scale(this.scaleX, this.scaleY);
  cxt.fillStyle = this.color;
  cxt.beginPath();
  cxt.arc(0, 0, this.radius, 0, (360 * Math.PI) / 180, false);
  cxt.closePath();
  cxt.fill();
  cxt.restore();
};

// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');

// 实例化一个小球
const ball = new Ball(100, 25);

const centerX = cnv.width / 2;
const centerY = cnv.height / 2;

let angle = 0;
const raduis = 50;

(function drawFrame() {
  window.requestAnimationFrame(drawFrame, cnv);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  // 绘制圆形轨道
  cxt.beginPath();
  cxt.arc(centerX, centerY, raduis, 0, (360 * Math.PI) / 180, false);
  cxt.closePath();
  cxt.stroke();

  // 计算小球中心点轨迹
  ball.x = centerX + Math.cos(angle) * raduis;
  ball.y = centerY + Math.sin(angle) * raduis;
  ball.fill(cxt);

  angle += 0.05;
})();
```

- 椭圆运动

```js
/**
 * 我们初中时，学过椭圆的标准方程，不知大家记得否（我也忘了=。=）
 * 经过我查询资料，得知，椭圆的标准方程如下：
 * (x / a)^2 + (y / b)^2 = 1
 * 咱们尝试推导一下：
 * 我们知道， cos(θ)^2 + sin(θ)^2 = 1
 * 所以
 * x / a = cos(θ)
 * y / b = sin(θ)
 * 最终我们得出结论：
 * x = a * cos(θ)
 * y = b * sin(θ)
 * 其中，a 和 b 分别是椭圆X轴和Y轴的半径。
 *
 *
 * 绘制椭圆
 * const x = centerX + Math.cos(angle) * radiusX
 * const y = centerY + Math.sin(angle) * radiusY
 * centerX , centerY 为圆心坐标，angle为弧度角，radiusX为X轴半径， radiusY为Y轴半径。
 */

// 构造函数，定义绘制小球类
function Ball(x, y, color, radius) {
  //小球中心的x坐标，默认值为0
  this.x = x || 0;
  //小球中心的y坐标，默认值为0
  this.y = y || 0;
  //小球半径，默认值为12
  this.radius = radius || 12;
  //小球颜色，默认值为“#6699FF”
  this.color = color || '#6699FF';
  //缩放倍数
  this.scaleX = 1;
  this.scaleY = 1;
  //x和y速度
  this.vx = 0;
  this.vy = 0;
}

// 绘制小球方法
Ball.prototype.stroke = function (cxt) {
  cxt.save();
  cxt.scale(this.scaleX, this.scaleY);
  cxt.strokeStyle = this.color;
  cxt.beginPath();
  cxt.arc(this.x, this.y, this.radius, 0, (360 * Math.PI) / 180, false);
  cxt.closePath();
  cxt.stroke();
  cxt.restore();
};

Ball.prototype.fill = function (cxt) {
  cxt.save();
  cxt.translate(this.x, this.y);
  cxt.scale(this.scaleX, this.scaleY);
  cxt.fillStyle = this.color;
  cxt.beginPath();
  cxt.arc(0, 0, this.radius, 0, (360 * Math.PI) / 180, false);
  cxt.closePath();
  cxt.fill();
  cxt.restore();
};

// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');

// 实例化一个小球
const ball = new Ball(100, 25);

const centerX = cnv.width / 2;
const centerY = cnv.height / 2;

let angle = 0;
const radiusX = 60;
const radiusY = 40;

(function drawFrame() {
  window.requestAnimationFrame(drawFrame, cnv);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  // 计算小球中心点轨迹
  ball.x = centerX + Math.cos(angle) * radiusX;
  ball.y = centerY + Math.sin(angle) * radiusY;
  ball.fill(cxt);

  angle += 0.05;
})();
```

## 波形运动

```js
/**
 * 学过高中数学的小伙伴们肯定有映像，正弦函数和余弦函数都有它的波形
 * 正弦函数作用于X轴坐标：
 * 弦函数的值范围永远都是[-1, 1]
 * 所以，我们可以利用这个特性，做一个左右来回移动的动画。
 * 我们可以为sinx乘以一个常量range，来扩大振幅的范围。
 * 来保证物体平移的范围永远处于 [-1 * range, 1 * range] 之间。
 *
 * centerX为图形在坐标系中 中心点的位置，angle为角度（弧度制），range为振幅。
 * const x = centerX + Math.sin(angle) * range
 */

// 构造函数，定义绘制小球类
function Ball(x, y, color, radius) {
  //小球中心的x坐标，默认值为0
  this.x = x || 0;
  //小球中心的y坐标，默认值为0
  this.y = y || 0;
  //小球半径，默认值为12
  this.radius = radius || 12;
  //小球颜色，默认值为“#6699FF”
  this.color = color || '#6699FF';
  //缩放倍数
  this.scaleX = 1;
  this.scaleY = 1;
  //x和y速度
  this.vx = 0;
  this.vy = 0;
}

// 绘制小球方法
Ball.prototype.stroke = function (cxt) {
  cxt.save();
  cxt.scale(this.scaleX, this.scaleY);
  cxt.strokeStyle = this.color;
  cxt.beginPath();
  cxt.arc(this.x, this.y, this.radius, 0, (360 * Math.PI) / 180, false);
  cxt.closePath();
  cxt.stroke();
  cxt.restore();
};

Ball.prototype.fill = function (cxt) {
  cxt.save();
  cxt.translate(this.x, this.y);
  cxt.scale(this.scaleX, this.scaleY);
  cxt.fillStyle = this.color;
  cxt.beginPath();
  cxt.arc(0, 0, this.radius, 0, (360 * Math.PI) / 180, false);
  cxt.closePath();
  cxt.fill();
  cxt.restore();
};

// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');

// 实例化一个小球
const ball = new Ball(cnv.width / 2, cnv.height / 2);

let angle = 0;
let range = 80;

(function drawFrame() {
  window.requestAnimationFrame(drawFrame, cnv);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  // 计算小球轨迹
  ball.x = cnv.width / 2 + Math.sin(angle) * range;
  ball.fill(cxt);

  angle += 0.05;
})();
```

- 正弦函数作用于 Y 轴坐标

```js
/**
 * 正弦函数的值范围永远都是[-1, 1]，同理，我们想象一下，如果把正弦值赋值给物体在坐标系的纵坐标(y)上呢？
 * 想到了吗？请闭上眼冥想：在画布上有一个小球，它x坐标在不断的增加，它的y坐标在[-1, 1]之间不断地变化。。。。。。。。。
 * 不知道大家能想象的到不，这正是一个波浪线，也恰好时正弦函数的波形！
 * 那么，我们就可以做一个波形轨迹运行的小球动画~
 *
 * const y = centerY + Math.sin(angle)* range
 */

// 构造函数，定义绘制小球类
function Ball(x, y, color, radius) {
  //小球中心的x坐标，默认值为0
  this.x = x || 0;
  //小球中心的y坐标，默认值为0
  this.y = y || 0;
  //小球半径，默认值为12
  this.radius = radius || 12;
  //小球颜色，默认值为“#6699FF”
  this.color = color || '#6699FF';
  //缩放倍数
  this.scaleX = 1;
  this.scaleY = 1;
  //x和y速度
  this.vx = 0;
  this.vy = 0;
}

// 绘制小球方法
Ball.prototype.stroke = function (cxt) {
  cxt.save();
  cxt.scale(this.scaleX, this.scaleY);
  cxt.strokeStyle = this.color;
  cxt.beginPath();
  cxt.arc(this.x, this.y, this.radius, 0, (360 * Math.PI) / 180, false);
  cxt.closePath();
  cxt.stroke();
  cxt.restore();
};

Ball.prototype.fill = function (cxt) {
  cxt.save();
  cxt.translate(this.x, this.y);
  cxt.scale(this.scaleX, this.scaleY);
  cxt.fillStyle = this.color;
  cxt.beginPath();
  cxt.arc(0, 0, this.radius, 0, (360 * Math.PI) / 180, false);
  cxt.closePath();
  cxt.fill();
  cxt.restore();
};

// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');

// 实例化一个小球
const ball = new Ball(0, cnv.height / 2);

let angle = 0;
let range = 40;

(function drawFrame() {
  window.requestAnimationFrame(drawFrame, cnv);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  // 计算小球轨迹
  ball.x += 1;
  ball.y = cnv.height / 2 + Math.sin(angle) * range;
  ball.fill(cxt);

  angle += 0.05;
})();
```

- 正弦函数作用于缩放动画（脉冲动画）

```js
/**
 * 通过学习上边的两个知识，大家思考一下，如果把正弦函数作用于缩放属性会有什么效果呢？
 * 对啦，就是不断放大缩小的动画，我们术语称之为——脉冲动画
 */

// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');

// 实例化一个小球
const ball = new Ball(cnv.width / 2, cnv.height / 2, 'blue', 25);

let angle = 0;
let range = 0.5;

(function drawFrame() {
  window.requestAnimationFrame(drawFrame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  ball.scaleX = 1 + Math.sin(angle) * range;
  ball.scaleY = 1 + Math.sin(angle) * range;
  ball.fill(cxt);

  angle += 0.05;
})();
```

## 匀速运动

```js
/**
 * 匀速运动，说白了就是沿着某个方向匀速运动。
 * 下面一个简单的例子，来完成水平方向的匀速运动。
 */

// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');

// 实例化一个小球
const ball = new Ball(0, cnv.height / 2);
// 定义X轴的速度
const vx = 2;
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);
  ball.x += vx;
  ball.fill(cxt);
})();
```

- 任意方向的匀速运动

```js
/**
 * 任意方向的速度，我们需要用到速度的分解。
 * 我们使用三角函数来对速度进行分解即可：
 * const vx = speed * Math.cos(angle * Math.PI / 180)
 * const vy = speed * Math.sin(angle * Math.PI / 180)
 * vx表示 x轴方向的匀速度大小，vy表示y轴方向的匀速度大小。
 * speed表示任意方向的匀速度大小，angle表示该速度方向于轴的夹角。
 */

// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');

// 实例化一个小球
const ball = new Ball(0, cnv.height / 2);
const speed = 2;
const angle = 30;
const vx = speed * Math.cos((angle * Math.PI) / 180);
const vy = speed * Math.sin((angle * Math.PI) / 180);
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);
  ball.x += vx;
  ball.y += vy;
  ball.fill(cxt);
})();
```

- 拓展：

```js
/**
 * 向x轴或者y轴正方向加速度语法：
 * objcet.x += vx
 * object.y += vy
 * vx += ax
 * vy += ay
 */

// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');

// 实例化一个小球
const ball = new Ball(0, cnv.height / 2);
let vx = 0;
let ax = 0.2;
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);
  ball.x += vx;
  vx += ax;
  ball.fill(cxt);
})();
```

- 任意方向的加速度：

```js
/**
 * ax = a * Math.cos(angle * Math.PI / 180)
 * ay = a * Math.sin(angle * Math.PI / 180)
 * vx += ax
 * vy += ay
 * object.x += vx
 * object.y += vy
 */

// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');

// 实例化一个小球
const ball = new Ball(0, cnv.height / 2);
let a = 0.2;

let ax = a * Math.cos((30 * Math.PI) / 180);
let ay = a * Math.sin((30 * Math.PI) / 180);

let vx = 0;
let vy = 0;
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);
  ball.x += vx;
  ball.y += vy;
  ball.fill(cxt);

  vx += ax;
  vy += ay;
})();
```

## 重力

```js
/**
 * 在开始前，我们需要牢记一条Canvas动画开发规范：
 * 在动画之前定义变量
 * 在图形绘制之后进行变量的增减
 */
```

- 重力抛物线动画

```js
// 实例化一个小球
const ball = new Ball(0, cnv.height);
let vx = 4;
let vy = -5;
const gravity = 0.2;
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);
  ball.x += vx;
  ball.y += vy;
  ball.fill(cxt);

  vy += gravity;
})();
```

- 重力自由落体动画

```js
// 实例化一个小球
const ball = new Ball(cnv.width / 2, 0);
let vy = 0; // y轴初始速度为0
let gravity = 0.2; // 重力加速度为0.2
let bounce = -0.8; // 反弹系数 -0.8
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);
  ball.y += vy;
  // 边界检测
  if (ball.y > cnv.height - ball.radius) {
    ball.y = cnv.height - ball.radius;
    // 速度反向并减小
    vy = vy * bounce;
  }
  ball.fill(cxt);

  vy += gravity;
})();
```

- 滚动反弹减速停止

```js
// 实例化一个小球
const ball = new Ball(0, cnv.height);
let vx = 3;
let vy = -6;
let gravity = 0.2; // 重力加速度为0.2
let bounce = -0.75; // 反弹系数 -0.75
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);
  ball.x += vx;
  ball.y += vy;
  // 边界检测
  if (ball.y > cnv.height - ball.radius) {
    ball.y = cnv.height - ball.radius;
    // 速度反向并减小
    vy = vy * bounce;
  }
  ball.fill(cxt);

  vy += gravity;
})();
```

## 摩擦力

```js
/**
 * 摩擦力的定义：
 * 阻碍物体相对运动的力。
 * 摩擦力的的方向与物体相对运动力的方向相反，它只能改变物体速度的大小，而不会改变物体运动的方向。
 */
```

- 水平方向运动

```js
// 实例化一个小球
const ball = new Ball(0, cnv.height / 2);
// 初始化x轴方向的速度为8，摩擦力系数为0.95
let vx = 8;
let friction = 0.95;
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  ball.x += vx;
  ball.fill(cxt);

  vx *= friction;
})();
```

- 任意方向运动

```js
/**
 * 任意方向的运动需要注意的是，还是要对速度进行分解。
 */

// 实例化一个小球
const ball = new Ball(0, cnv.height / 2);
// 初始化 速度为8
let speed = 8;
// 分解速度
let vx = speed * Math.cos((30 * Math.PI) / 180);
let vy = speed * Math.sin((30 * Math.PI) / 180);
// 摩擦力系数为0.95
let friction = 0.95;
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  ball.x += vx;
  ball.y += vy;
  ball.fill(cxt);

  vx *= friction;
  vy *= friction;
})();
```

## 边界检测

```js
// 假设，我们有个小球，中心点为（x, y），那么它边界检测的代码为：
if (ball.x < ball.radius) {
  // 小球碰到了左边界
} else if (ball.x > cnv.width - ball.raduis) {
  // 小球碰到了右边界
}
if (ball.y < ball.radius) {
  // 小球碰到了上边界
} else if (ball.y > cnv.height - ball.raduis) {
  // 小球碰到了下边界
}
```

- 边界环绕

```js
/**
 * 边界环绕，指的是物体从一个边界完全消失，就会从另一个边界出现，是一种环绕效果。
 */

// 判定完全消失。
if (ball.x < -ball.radius) {
  // 完全超出左边界
} else if (ball.x > cnv.width + ball.radius) {
  // 完全超出右边界
}
if (ball.y < -ball.radius) {
  // 完全超出上边界
} else if (ball.y > cnv.height + ball.radius) {
  // 完全超出下边界
}
```

- 案例代码

```js
// 初始化一个小球
const ball = new Ball(0, cnv.height / 2);

const vx = 2;

(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);
  ball.x += vx;
  if (ball.x > cnv.width + ball.radius) {
    // 完全超出右边界
    ball.x = -ball.radius;
  }
  ball.fill(cxt);
})();
```

- 边界生成

```js
// 判断边界完全超出的方式
if (
  ball.x < -ball.radius ||
  ball.x > cnv.width + ball.radius ||
  ball.y < -ball.radius ||
  ball.y > cnv.height + ball.radius
) {
  // do something
}
```

```js
// 生成随机颜色
const getRandomColor = () => {
  return (
    '#' +
    (function (color) {
      return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) &&
        color.length == 6
        ? color
        : arguments.callee(color);
    })('')
  );
};

// 定义数组，用来缓存小球
let balls = [];
// 小球数量
const n = 50;

// 生成n个小球，小球颜色、vx、vy都是随机值
for (let i = 0; i < n; i++) {
  // 初始化小球
  const ball = new Ball(cnv.width / 2, cnv.height / 2, getRandomColor(), 5);
  ball.vx = Math.random() * 2 - 1; // 生成-1 - 1 的任意数，控制小球运动方向的随机性
  ball.vy = Math.random() * 2 - 1;
  balls.push(ball);
}

(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  balls.forEach((ball) => {
    // 边界检测
    if (
      ball.x < -ball.radius ||
      ball.x > cnv.width + ball.radius ||
      ball.y < -ball.radius ||
      ball.y > cnv.height + ball.radius
    ) {
      // 超出边界后重新生成
      ball.x = cnv.width / 2;
      ball.y = cnv.height / 2;
      ball.vx = Math.random() * 2 - 1;
      ball.vy = Math.random() * 2 - 1;
    }
    ball.fill(cxt);

    ball.x += ball.vx;
    ball.y += ball.vy;
  });
})();
```

- 加入重力影响后

```js
// 生成随机颜色
const getRandomColor = () => {
  return (
    '#' +
    (function (color) {
      return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) &&
        color.length == 6
        ? color
        : arguments.callee(color);
    })('')
  );
};

// 定义数组，用来缓存小球
let balls = [];
// 小球数量
const n = 50;
// 重力系数
const gravity = 0.15;
// 生成n个小球，小球颜色、vx、vy都是随机值
for (let i = 0; i < n; i++) {
  // 初始化小球
  const ball = new Ball(cnv.width / 2, cnv.height / 2, getRandomColor(), 5);
  ball.vx = Math.random() * 2 - 1; // 生成-1 - 1 的任意数，控制小球运动方向的随机性
  ball.vy = Math.random() * 2 - 1;
  balls.push(ball);
}

(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  balls.forEach((ball) => {
    // 边界检测
    if (
      ball.x < -ball.radius ||
      ball.x > cnv.width + ball.radius ||
      ball.y < -ball.radius ||
      ball.y > cnv.height + ball.radius
    ) {
      // 超出边界后重新生成
      ball.x = cnv.width / 2;
      ball.y = cnv.height / 2;
      ball.vx = Math.random() * 2 - 1;
      ball.vy = Math.random() * 2 - 1;
    }
    ball.fill(cxt);

    ball.x += ball.vx;
    ball.y += ball.vy;
    ball.vy += gravity;
  });
})();
```

- 边界反弹

```js
// 小球落下时进行边界检测，如果碰到边界，就会去改变vy(纵轴方向速度)取反。
// 边界反弹的原理亦是如此。

// 边界反弹语法如下：
if (ball.x < ball.radius) {
  // 小球碰到了左边界
  ball.x = ball.radius;
  vx = -vx;
} else if (ball.x > cnv.width - ball.radius) {
  // 小球碰到了右边界
  ball.x = cnv.width - ball.radius;
  vx = -vx;
}
if (ball.y < ball.radius) {
  // 小球碰到了上边界
  ball.y = ball.radius;
  vy = -vy;
} else if (ball.y > cnv.height - ball.radius) {
  // 小球碰到了下边界
  ball.y = cnv.height - ball.radius;
  vy = -vy;
}
```

```js
const ball = new Ball(cnv.width / 2, cnv.height / 2);

// 随机生成 -vx -vy -3 - 3
let vx = (Math.random() * 2 - 1) * 3;
let vy = (Math.random() * 2 - 1) * 3;
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  ball.x += vx;
  ball.y += vy;
  // 边界检测
  if (ball.x < ball.radius) {
    // 小球碰到了左边界
    ball.x = ball.radius;
    vx = -vx;
  } else if (ball.x > cnv.width - ball.radius) {
    // 小球碰到了右边界
    ball.x = cnv.width - ball.radius;
    vx = -vx;
  }
  if (ball.y < ball.radius) {
    // 小球碰到了上边界
    ball.y = ball.radius;
    vy = -vy;
  } else if (ball.y > cnv.height - ball.radius) {
    // 小球碰到了下边界
    ball.y = cnv.height - ball.radius;
    vy = -vy;
  }

  ball.fill(cxt);
})();
```

## 碰撞检测

```js
/**
 * “碰撞检测”，是物体与物体之间的关系。用来检测物体与物体之间是否发生了碰撞，例如：射击游戏，就是检测子弹与敌人的碰撞。
 */
```

- 外接矩形判定法

```js
/**
 * 当我们需要被检测的物体为矩形，或者形态接近于矩形，我们就可以把这个物体抽象为矩形，然后判断两个矩形是否发生了碰撞。
 * 实现该方法，我们需要做到两步：1. 找出物体的外接矩形 2. 对外接矩形进行碰撞检测。
 *
 * “外接矩形法”有个明显的缺点，就是误差较大。即使是这样，它简单的判定方式可以减少我们的开发难度，依然备受欢迎
 */
```

```js
// 判断两个矩形是否发生碰撞，我们只需要判断：两个矩形左上角顶点的坐标所处的范围。如果两个矩形左上角顶点坐标以下四个条件都不满足，则可以判定为发生了碰撞。

// 判断矩形是否发生了碰撞
const checkRect = (rectA, rectB) => {
  return !(
    rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y
  );
};
```

```js
// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');
// 判断是否发生了碰撞
const checkRect = (rectA, rectB) => {
  return !(
    rectA.x + rectA.width < rectB.x ||
    rectB.x + rectB.width < rectA.x ||
    rectA.y + rectA.height < rectB.y ||
    rectB.y + rectB.height < rectA.y
  );
};
// 获取小球的外接矩形
const getRect = (ball) => {
  return {
    x: ball.x - ball.radius,
    y: ball.y - ball.radius,
    width: ball.radius * 2,
    height: ball.radius * 2,
  };
};
// 定义鼠标事件
const mouseEvent = (element) => {
  let mouse = { x: 0, y: 0 }; // 存储鼠标位置信息
  element.addEventListener('mousemove', (e) => {
    let x = e.pageX;
    let y = e.pageY;
    // 计算鼠标在canvas画布中的相对位置
    mouse.x = x - element.offsetLeft;
    mouse.y = y - element.offsetTop;
  });
  return mouse;
};
// 定义小球A
const ballA = new Ball(cnv.width / 2, cnv.height / 2, 30);
// 获取小球A的外接矩形
const rectA = getRect(ballA);

const getMouse = mouseEvent(cnv);

(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  // 绘制小球A和它的外接矩形
  ballA.fill(cxt);
  cxt.strokeRect(rectA.x, rectA.y, rectA.width, rectA.height);

  // 定义一个追随鼠标位移的小球B
  const ballB = new Ball(getMouse.x, getMouse.y, 30, 'red');
  // 获取B的外接矩形
  const rectB = getRect(ballB);
  // 绘制B以及它的外接矩形
  ballB.fill(cxt);
  cxt.strokeRect(rectB.x, rectB.y, rectB.width, rectB.height);

  // 碰撞检测
  if (checkRect(rectA, rectB)) {
    document.querySelector('#msg').innerHTML = '撞上了！';
  } else {
    document.querySelector('#msg').innerHTML = '没撞上';
  }
})();
```

- 外接圆判定法

```js
/**
 * “外接圆判定法”指的是，当一个物体为圆，或者接近圆，我们可以把这个物体抽象成圆，然后判断这两个圆是否发生了碰撞。
 * 实现该方法，我们需要做到两步：1. 找出物体的外接圆 2. 对外接圆进行碰撞检测。
 *
 * 外接圆碰撞检测很简单：只需要判断两个圆圆心距离是否大于或等于两个圆的半径之和，是，则无碰撞。
 * 如果两个圆圆心距离小于两个圆的半径之和，则判定为发生了碰撞。
 */

// 判断圆是否发生了碰撞
const checkCircle = (circleA, circleB) => {
  const dx = circleB.x - circleA.x;
  const dy = circleB.y - circleA.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < circleA.radius + circleB.radius) {
    return true;
  }
  return false;
};
```

- 当多个小球两两碰撞反弹的效果

```js
// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');
// 判断圆是否发生了碰撞
const checkCircle = (circleA, circleB) => {
  const dx = circleB.x - circleA.x;
  const dy = circleB.y - circleA.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < circleA.radius + circleB.radius) {
    return true;
  }
  return false;
};
// 生成随机颜色
const getRandomColor = () => {
  return (
    '#' +
    (function (color) {
      return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) &&
        color.length == 6
        ? color
        : arguments.callee(color);
    })('')
  );
};
// 初始化十个小球
let ballList = [];
for (let i = 0; i < 10; i++) {
  let ball = new Ball(cnv.width / 2, cnv.height / 2, getRandomColor());
  ball.vx = (Math.random() * 2 - 1) * 3;
  ball.vy = (Math.random() * 2 - 1) * 3;
  ballList.push(ball);
}

(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);
  ballList.forEach((ball) => {
    ball.x += ball.vx;
    ball.y += ball.vy;
    // 边界检测
    if (ball.x < ball.radius) {
      // 小球碰到了左边界
      ball.x = ball.radius;
      ball.vx = -ball.vx;
    } else if (ball.x > cnv.width - ball.radius) {
      // 小球碰到了右边界
      ball.x = cnv.width - ball.radius;
      ball.vx = -ball.vx;
    }
    if (ball.y < ball.radius) {
      // 小球碰到了上边界
      ball.y = ball.radius;
      ball.vy = -ball.vy;
    } else if (ball.y > cnv.height - ball.radius) {
      // 小球碰到了下边界
      ball.y = cnv.height - ball.radius;
      ball.vy = -ball.vy;
    }
    // 小球之间的碰撞检测
    ballList.forEach((circle) => {
      if (circle !== ball && checkCircle(circle, ball)) {
        ball.vx = -ball.vx;
        circle.vx = -circle.vx;
        ball.vy = -ball.vy;
        circle.vy = -circle.vy;
        // 解决小球重叠的问题，加偏移量
        if (ball.vx > 0) {
          ball.x += 5;
        } else {
          ball.x -= 5;
        }
        if (ball.vy > 0) {
          ball.y += 5;
        } else {
          ball.y -= 5;
        }
        if (circle.vx > 0) {
          circle.x += 5;
        } else {
          circle.x -= 5;
        }
        if (circle.vy > 0) {
          circle.y += 5;
        } else {
          circle.y -= 5;
        }
      }
    });
    ball.fill(cxt);
  });
})();
```

## 用户交互

- 如何捕获物体

```js
/**
 * 我们使用document.getElementById来进行捕获div。同样，在Canvas中，也有一些办法可以去捕获物体，但是实现起来却没有这般简单。
 */

// 在W3C坐标系中存在一个矩形，左上角坐标为 (x, y),宽 width, 高 height, 我们可以通过鼠标点击画布时的坐标是否落在矩形上，来判断是否捕获到了矩形。
if (
  mouse.x > rect.x &&
  mouse.x < rect.x + rect.width &&
  mouse.y > rect.y &&
  mouse.y < rect.y + rect.height
) {
  // doSomething
}

// 画布上的圆
// 只要判定鼠标坐标到圆心的距离小于圆的半径，我们就可以认定鼠标落在了小圆上。

const dx = mouse.x - ball.x;
const dy = mouse.y - ball.y;
const distance = Math.sqrt(dx * dx + dy * dy);
if (distance < ball.radius) {
  // todoSomething
}
```

- 如何拖拽物体

```js
/**
 * 实现拖拽物体，也不是很难，只需三步：
 * 捕获物体：鼠标移动到物体范围内
 * 移动物体：让物体随着鼠标移动
 * 松开物体：移除 mouseup、mousemove 事件
 */
```

- 拖拽小球的功能

```js
// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');
// 定义鼠标事件
const getMouse = (element) => {
  let mouse = { x: 0, y: 0 }; // 存储鼠标位置信息
  element.addEventListener('mousemove', (e) => {
    let x = e.pageX;
    let y = e.pageY;
    // 计算鼠标在canvas画布中的相对位置
    mouse.x = x - element.offsetLeft;
    mouse.y = y - element.offsetTop;
  });
  return mouse;
};
// 是否捕获小球
const checkMouse = (mouse, ball) => {
  const dx = mouse.x - ball.x;
  const dy = mouse.y - ball.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < ball.radius) {
    return true;
  }
  return false;
};

// 初始化小球 ==========>小球Ball类请从第二章第三节获取!!!!!
const ball = new Ball(cnv.width / 2, cnv.height / 2);
ball.fill(cxt);
// 定义鼠标事件
const mouse = getMouse(cnv);

let dx = 0; // 鼠标指针与球心水平偏移量
let dy = 0; // 鼠标指针与球心垂直偏移量

const onMouseMove = () => {
  // 更新小球坐标
  ball.x = mouse.x - dx;
  ball.y = mouse.y - dy;
};

const onMouseUp = () => {
  cnv.removeEventListener('mouseup', onMouseUp, false);
  cnv.removeEventListener('mousemove', onMouseMove, false);
};

// 鼠标按下时，判断有无选中小球，选中时，执行 mousemoe 和 mouseup
cnv.addEventListener(
  'mousedown',
  () => {
    if (checkMouse(mouse, ball)) {
      dx = mouse.x - ball.x;
      dy = mouse.y - ball.y;
      cnv.addEventListener('mousemove', onMouseMove, false);
      cnv.addEventListener('mouseup', onMouseUp, false);
    }
  },
  false
);

// 更新小球
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);
  ball.fill(cxt);
})();
```

## 如何投掷物体

```js
/**
 * 在canvas开发中，如果你以每秒10px的速度向左拖拽小球时，释放小球时，小球便会以速度向量 vx = -10 进行运动，这便是“投掷”。
 * 在我们拖拽物体时，物体每一秒都会有个新的位置，我们用新的位置减去旧的位置，就可以得到物体的移动速度。
 */
const vx = ball.x - oldBall.x;
const vy = ball.y - oldBall.y;
```

```js
// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');
// 定义鼠标事件
const getMouse = (element) => {
  let mouse = { x: 0, y: 0 }; // 存储鼠标位置信息
  element.addEventListener('mousemove', (e) => {
    let x = e.pageX;
    let y = e.pageY;
    // 计算鼠标在canvas画布中的相对位置
    mouse.x = x - element.offsetLeft;
    mouse.y = y - element.offsetTop;
  });
  return mouse;
};
// 是否捕获小球
const checkMouse = (mouse, ball) => {
  const dx = mouse.x - ball.x;
  const dy = mouse.y - ball.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  if (distance < ball.radius) {
    return true;
  }
  return false;
};

// 初始化小球 ==========>小球Ball类请从第二章第三节获取!!!!!
const ball = new Ball(cnv.width / 2, cnv.height / 2);
ball.fill(cxt);
// 定义鼠标事件
const mouse = getMouse(cnv);

let isMouseDown = false; // 用来记录小球是否处于拖拽过程中
let dx = 0; // 鼠标指针与球心水平偏移量
let dy = 0; // 鼠标指针与球心垂直偏移量

// 小球旧坐标
let oldX = 0;
let oldY = 0;

// 初始化速度
let vx = 0;
let vy = 0;

const onMouseMove = () => {
  // 更新小球坐标
  ball.x = mouse.x - dx;
  ball.y = mouse.y - dy;
};

const onMouseUp = () => {
  isMouseDown = false;
  cnv.removeEventListener('mouseup', onMouseUp, false);
  cnv.removeEventListener('mousemove', onMouseMove, false);
};

// 鼠标按下时，判断有无选中小球，选中时，执行 mousemoe 和 mouseup
cnv.addEventListener(
  'mousedown',
  () => {
    if (checkMouse(mouse, ball)) {
      isMouseDown = true;
      // 赋值旧坐标
      oldX = ball.x;
      oldY = ball.y;
      dx = mouse.x - ball.x;
      dy = mouse.y - ball.y;
      cnv.addEventListener('mousemove', onMouseMove, false);
      cnv.addEventListener('mouseup', onMouseUp, false);
    }
  },
  false
);

// 更新小球
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);
  if (isMouseDown) {
    // 计算拖拽过程中小球的速度
    vx = ball.x - oldX;
    vy = ball.y - oldY;
    // 将oldX oldY 进行更新为小球的中心坐标
    oldX = ball.x;
    oldY = ball.y;
  } else {
    // 松开拖拽后，执行抛掷效果 —— 小球沿着抛掷方向运动
    ball.x += vx;
    ball.y += vy;
    // 为了让效果逼真，我们加入边界反弹
    if (ball.x < ball.radius) {
      // 小球碰到了左边界
      ball.x = ball.radius;
      vx = -vx;
    } else if (ball.x > cnv.width - ball.radius) {
      // 小球碰到了右边界
      ball.x = cnv.width - ball.radius;
      vx = -vx;
    }
    if (ball.y < ball.radius) {
      // 小球碰到了上边界
      ball.y = ball.radius;
      vy = -vy;
    } else if (ball.y > cnv.height - ball.radius) {
      // 小球碰到了下边界
      ball.y = cnv.height - ball.radius;
      vy = -vy;
    }
  }
  ball.fill(cxt);
})();
```

## 高级动画(缓动动画)

```js
/**
 * 缓动动画
 * 缓动动画，指带有一定缓冲的动画，物体在一定时间内渐进加速或者减速，从而使动画更加的真实和自然。
 * 缓动动画分为两种，缓入和缓出。例如：汽车起步逐渐加速 —— 缓入动画；汽车停车时逐渐减速 —— 缓出动画；
 *
 * 制作缓动动画共五步：
 * 定义 0-1 的缓动系数 easing
 * 计算物体距离终点的距离
 * 计算当前的速度：距离 X 缓动系数
 * 计算新的位置：当前位置 + 当前速度
 * 重复执行 2 - 4 步，直到达到目标
 */

const targerX = 任意位置;
const targetY = 任意位置;
// 动画循环
const vx = (targetX - object.x) * easing;
const vy = (targetY - object.y) * easing;
```

```js
/**
 * 小球的速度是一个由快到慢的过程，原理很简单，距离越短，距离与方向的乘积越小，那么方向速度就越来越小。
 * 缓动系数使 0-1的数，越接近1，小球移动速度越快。
 * 因为缓动动画的每一帧的速度都不同，所以它更加的自然，所以更受到开发者的青睐。
 */

// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');
// 小球Ball类请从第二章第三节获取
const ball = new Ball(0, cnv.height / 2);
// 定义终点坐标
const targetX = cnv.width * (3 / 4);
// 定义缓动系数
const easing = 0.05;
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  const vx = (targetX - ball.x) * easing;
  ball.x += vx;

  ball.fill(cxt);
})();
```

- 任意方向的缓动动画

```js
/**
 * 任意方向的缓动动画：
 * 就是为 x y 都加上方向速度
 */

// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');
const ball = new Ball(0, 0);
// 定义终点坐标
const targetX = cnv.width * (3 / 4);
const targetY = cnv.height * (1 / 2);
// 定义缓动系数
const easing = 0.05;
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  const vx = (targetX - ball.x) * easing;
  const vy = (targetY - ball.y) * easing;

  ball.x += vx;
  ball.y += vy;

  ball.fill(cxt);
})();
```

- 小球追随鼠标指针缓动特效：

```js
// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');
// 定义鼠标事件
const getMouse = (element) => {
  let mouse = { x: 0, y: 0 }; // 存储鼠标位置信息
  element.addEventListener('mousemove', (e) => {
    let x = e.pageX;
    let y = e.pageY;
    // 计算鼠标在canvas画布中的相对位置
    mouse.x = x - element.offsetLeft;
    mouse.y = y - element.offsetTop;
  });
  return mouse;
};
const ball = new Ball(cnv.width / 2, cnv.height / 2);
const smallBall = new Ball(cnv.width / 2, cnv.height / 2, 10, 'red');
const mouse = getMouse(cnv);
// 定义缓动系数
const easing = 0.05;
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  const vx = (mouse.x - ball.x) * easing;
  const vy = (mouse.y - ball.y) * easing;

  const vx2 = (ball.x - smallBall.x) * easing;
  const vy2 = (ball.y - smallBall.y) * easing;

  ball.x += vx;
  ball.y += vy;

  smallBall.x += vx2;
  smallBall.y += vy2;

  ball.fill(cxt);
  smallBall.fill(cxt);
})();
```

## 高级动画(弹性动画)

```js
/**
 * 弹性动画不同之处在于，物体运动到某个地方要再弹一会儿，类似于 弹簧。
 * 弹性动画中，距离和加速度成正比，物体距离终点越远，加速度越大，物体接近终点后，加速度会很小，但是它依然在加速，然后物体会越过终点，反向加速度随之变大，会把物体拉回来，会使物体在终点处反弹一段时间，最终在摩擦力作用下停止运动。
 */

// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');
// 初始化小球
const ball = new Ball(0, cnv.height / 2);
// 定义终点位置
const targetX = cnv.width / 2;
// 定义弹性系数 值越大弹得越快
const spring = 0.02;
// 速度
let vx = 0;
// 定义摩擦力
const friction = 0.95;
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);

  const ax = (targetX - ball.x) * spring; // 计算加速度
  vx += ax; // 加速度赋值给速度
  vx *= friction;
  ball.x += vx;

  ball.fill(cxt);
})();
```

- 悠悠球效果

```js
// 获取canvas对象
const cnv = document.getElementById('myCanvas');
// 获取上下文对象context
const cxt = cnv.getContext('2d');
// 定义鼠标事件
const getMouse = (element) => {
  let mouse = { x: 0, y: 0 }; // 存储鼠标位置信息
  element.addEventListener('mousemove', (e) => {
    let x = e.pageX;
    let y = e.pageY;
    // 计算鼠标在canvas画布中的相对位置
    mouse.x = x - element.offsetLeft;
    mouse.y = y - element.offsetTop;
  });
  return mouse;
};
// 初始化小球
const ball = new Ball(cnv.width / 2, cnv.height / 2);
const mouse = getMouse(cnv);
// 定义弹性系数 值越大弹得越快
const spring = 0.02;
// 定义速度
let vx = 0;
let vy = 0;
// 定义摩擦力
const friction = 0.95;
// 定义重力
const gravity = 1;
(frame = () => {
  window.requestAnimationFrame(frame);
  cxt.clearRect(0, 0, cnv.width, cnv.height);
  const ax = (mouse.x - ball.x) * spring; // 计算加速度
  const ay = (mouse.y - ball.y) * spring;

  vx += ax;
  vy += ay;

  vy += gravity;

  vx *= friction;
  vy *= friction;

  ball.x += vx;
  ball.y += vy;

  ball.fill(cxt);

  // 将指针与小球连线
  cxt.beginPath();
  cxt.moveTo(ball.x, ball.y);
  cxt.lineTo(mouse.x, mouse.y);
  cxt.stroke();
  cxt.closePath();
})();
```
