# WebGL 入门

## WebGL 介绍

```js
// WebGL 是一种 3D 绘图标准，这种绘图技术标准允许把 JavaScript 和 OpenGL ES 2.0 结合在一起，通过增加 OpenGL ES 2.0 的一个 JavaScript 绑定，WebGL 可以为 HTML5 Canvas 提供硬件 3D 加速渲染，这样 Web 开发人员就可以借助系统显卡来在浏览器里更流畅地展示3D场景和模型了，还能创建复杂的导航和数据视觉化。
```

## Web Hello World

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>webGL</title>
  </head>
  <body>
    <canvas id="canvas" width="300px" height="300px"></canvas>
    <script>
      // 1.创建 webgl 绘图上下文
      let canvas = document.getElementById('canvas');
      let gl = canvas.getContext('webgl');

      let vshaderStr =
        'void main(){\n' +
        'gl_Position = vec4(0.0,0.0,0.0,1.0);\n' +
        'gl_PointSize = 10.0;\n' +
        '}\n';
      let fshaderStr =
        'void main(){\n' + 'gl_FragColor = vec4(0.0,1.0,0.0,1.0);\n' + '}\n';

      // 创建着色器编程，关联到 gl 上下文中
      // 着色器是一段给 gpu 运行的程序，我们用 glCreateProgram 创建一个空的程序对象，然后使用 glAttachShader 给这个程序对象填充编译后的着色器代码。这里可以把他当成某一个函数编译后的代码。把几个这种编译后的函数放入程序对象后， gpu 执行这个程序对象，就会把像素信息当做入参，依次执行程序对象中的函数。
      let program = createProgram(gl, vshaderStr, fshaderStr);

      // 填充完着色器代码后，调用 gl.LinkProgram 把程序关联到 gl 上下文中，并用 gl.UseProgram 来启用这个程序。
      gl.useProgram(program);
      gl.clearColor(0.0, 0.0, 0.0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, 1);

      //创建shader着色器 包括创建shader对象  指定shader代码 编译shader
      function createShader(gl, type, source) {
        //创建shader对象 顶点着色器 gl.VERTEX_SHADER  片元着色器 gl.FRAGMENT_SHADER
        let shader = gl.createShader(type);
        //检查是否创建成功
        if (shader == null) {
          throw new Error('创建shader 失败' + type);
          return null;
        }
        //加载shader代码
        gl.shaderSource(shader, source);
        //编译shader
        gl.compileShader(shader);
        //检查编译是否成功
        let successed = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (!successed) {
          throw new Error(gl.getShaderInfoLog(shader));
          //删除创建的shader
          gl.deleteShader(shader);
          return null;
        }
        return shader;
      }
      function createProgram(gl, vsource, fsource) {
        //创建webgl program对象
        let program = gl.createProgram();
        if (program == null) {
          throw new Error('创建program失败');
          return null;
        }
        //创建顶点着色器
        let vshader = createShader(gl, gl.VERTEX_SHADER, vsource);
        //创建片元着色器
        let fshader = createShader(gl, gl.FRAGMENT_SHADER, fsource);
        //将shader关联到program上
        gl.attachShader(program, vshader);
        gl.attachShader(program, fshader);
        //链接对象

        gl.linkProgram(program);
        // 检查是否链接成功
        let linked = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (!linked) {
          gl.deleteProgram(program);
          gl.deleteShader(vshader);
          gl.deleteShader(fshader);
          throw new Error(gl.getProgramInfoLog(program));
          return null;
        }
        return program;
      }
    </script>
  </body>
</html>
```

## WebGL 基本原理

```js
// WebGL 的出现使得在浏览器上面实现显示 3D 图像成为可能，WebGL 本质上是基于光栅化的 API ,而不是基于 3D 的 API。
// WebGL 只关注两个方面，即投影矩阵的坐标和投影矩阵的颜色。使用 WebGL 程序的任务就是实现具有投影矩阵坐标和颜色的 WebGL 对象即可。可以使用“着色器”来完成上述任务。顶点着色器可以提供投影矩阵的坐标，片段着色器可以提供投影矩阵的颜色。
// 比如两点画一个直线，两点是顶点着色器确定的，直线是片元着色器在确定了两个点的位置之后画的。

// 无论要实现的图形尺寸有多大，其投影矩阵的坐标的范围始终是从 -1 到 1 。
```

## 参考资源

```js
// https://www.w3cschool.cn/webgl/
```

## 教程

```js
// 2022年WebGL入门教程（完结）
// https://www.bilibili.com/video/BV1Kb4y1x72q/?spm_id_from=333.337.search-card.all.click&vd_source=846d05580a9f77aa4f6281c2edda479a
// 资料地址：https://gitee.com/jsonco/webgl-techer

// 2022年WebGL中级教程（完结）
// https://www.bilibili.com/video/BV1nL411A7SM/?spm_id_from=333.999.0.0&vd_source=846d05580a9f77aa4f6281c2edda479a
// 资料地址：https://gitee.com/jsonco/webgl-techer-intermediate

// 截止2022年全网最新的WebGL高级课程
// https://www.bilibili.com/video/BV1HU4y1e7JS/?vd_source=01ae3fc576acbf5bd3e59f3307bb594f
```
