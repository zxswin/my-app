## jquery 常用 api

## 选择器

- 基础选择器

```js
// ID选择器	$("#id")	获取指定ID的元素
// 全选选择器	$('*')	匹配所有元素
// 类选择器	$(".class")	获取同一类class的元素
// 标签选择器	$(".div")	获取同一类标签的所有元素
// 并集选择器	$("div,p,li")	选取多个元素
// 交集选择器	$("li.current")	交集元素
```

- 层级选择器

```js
// 子代选择器	$("ul>li")	使用>号，获取亲儿子层级的选择器；注意，并不会获取孙子层级的元素
// 后代选择器	$("ul li")	使用空格，代表后代选择器，获取 ul 下的所有 li 元素，包括孙子等
```

- 筛选选择器

```js
// :first	$("li:first")	获取第一个li元素
// :last	$("li:last")	获取最后一个li元素
// :eq(index)	$("li:eq(2)")	获取到的li元素中，选择索引号为2的元素，索引号index从0开始
// :odd	$("li:odd")	获取到的li元素中，选择索引号为奇数的元素
// :even	$("li:even")	获取到的li元素中，选择索引号为偶数的元素
// :checked	$(".checkall:checked")	获取被选中的表单元素的个数
```

- 筛选方法

```js
// parent()	$(“li”).parent()	查找父级，最近一级的父元素
// children(selector)	$(“ul”).children(“li”)	相当于$(“ul>li”),最近一级(亲儿子)
// find(selector)	$(“ul”).find(“li”)	相当于$(“ul li”) 后代选择器
// siblings(selector)	$(“.first”).siblings(“li”)	查找兄弟节点，不包括自己本身
// nextAll([expr])	$(“.first”).nextAll()	查找当前元素之后所有的同辈元素
// prevtAll([expr])	$(“.last”).prevAll()	查找当前元素之前所有的同辈元素
// hasClass(class)	$(‘div’).hasClass(“protected”)	检查当前的元素是否含有某个特定的类，如果有，则返回true
// eq(index)	$(“li”).eq(2)	相当于$(“li:eq(2),index”)index从0开始
```

## 操作样式

- CSS 方法修改样式

```js
$('div').css({
  color: 'red',
  width: 400,
  height: 400,
  backgroundColor: 'red',
});
```

- 操作类样式

```js
// 添加类 addClass()
// 删除类 removeClass()
// 切换类 toggleClass()

$(function () {
  // 1. 添加类 addClass()
  $('div').click(function () {
    $(this).addClass('current');
  });
  // 2. 删除类 removeClass()
  $('div').click(function () {
    $(this).removeClass('current');
  });
  // 3. 切换类 toggleClass()
  $('div').click(function () {
    $(this).toggleClass('current');
  });
});
```

- jQuery 类操作和 className 区别

```js
//jQuery添加类
$('.one').addClass('two'); //这个addClass相当于追加类名 不影响以前的类名
//<div class="one"></div>  ---> <div class="one two"></div>

// jQuery删除类
$('.one').removeClass('two');
//<div class="one two"></div>  ---> <div class="one"></div>
```

## 效果

- 显示隐藏

```js
// speed：三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
// easing：(Optional) 用来指定切换效果，默认是“swing”，可用参数“linear”。
// fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。

// 显示
show([speed, [easing], [fn]]); //中括号表示参数都可以省略
$('div').show();
// 隐藏
hide([speed, [easing], [fn]]);
$('div').hide();
// 切换
toggle([speed, [easing], [fn]]);
$('div').toggle();
```

- 滑动

```js
//中括号表示参数都可以省略
// 向下滑动
slideDown([speed, [easing], [fn]]);
$('div').slideDown();
// 向上滑动
slideUp([speed, [easing], [fn]]);
$('div').slideUp();
// 滑动切换
slideToggle([speed, [easing], [fn]]);
$('div').slideToggle();
```

- 淡入淡出

```js
// speed：三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。
// easing：(Optional) 用来指定切换效果，默认是“swing”，可用参数“linear”。
// fn: 回调函数，在动画完成时执行的函数，每个元素执行一次。

// 淡入
fadeIn([speed, [easing], [fn]]);
$('div').fadeIn();

// 淡出
fadeOut([speed, [easing], [fn]]);
$('div').fadeOut();

// 淡入淡出切换
fadeToggle([speed, [easing], [fn]]);
$('div').fadeToggle();

// 渐进方式调整到指定的不透明度

// opacity ：透明度必须写，取值 0~1 之间
// speed：三种预定速度之一的字符串(“slow”,“normal”, or “fast”)或表示动画时长的毫秒数值(如：1000)。必须写
// 其他两个同上，可以省略

fadeTo(speed, opacity, [easing], [fn]);
$('div').fadeTo(1000, 0.5);
```

## 自定义动画

```js
// 语法规范：
// animate(params,[speed],[easing],[fn])

// params: 想要更改的样式属性，以对象形式传递， 必须写。 属性名可以不用带引号， 如果是复合属性则需要采取驼峰命名法 borderLeft。 其余参数都可以省略

$(function () {
  $('button').click(function () {
    $('div').animate(
      {
        left: 500,
        top: 300,
        opacity: 0.4,
        width: 500,
      },
      500
    );
  });
});
```

## 事件切换

```js
hover([over,]out)
$("div").hover(function(){},function(){});
// 第一个function是鼠标经过的函数
// 第二个function是鼠标离开的函数
// 如果hover只写一个函数,那么鼠标经过和鼠标离开都会触发这个函数

//鼠标经过和鼠标离开触发滑动切换函数，代码量极少
$("div").hover(function(){
    $(this).slideToggle();
})
```

## 动画队列及其停止排队方法

```js
// 动画或效果队列
// 动画或者效果一旦触发就会执行，如果多次触发，就造成多个动画或者效果排队执行
```

- 停止排队

```js
// stop()方法用于停止动画或者效果
// 注意: stop() 写到动画或者效果的前面，相当于停止结束上一次的动画

$('.nav>li').hover(function () {
  // stop 方法必须写到动画的前面
  $(this).children('ul').stop().slideToggle();
});
```

## 属性操作

- 操作元素固有属性值 prop()

```js
// 获取
// prop('属性');
//<a href="http://www.itcast.cn" title="都挺好">都挺好</a>
$('a').prop('href');

// 设置
// prop("属性","属性值")
//<a href="http://www.itcast.cn" title="都挺好">都挺好</a>

$('a').prop('title', '我们都挺好~');
```

- 操作元素自定义属性值 attr()

```js
// 获取
// attr("属性")    //类似原生getAttribute()
//<div index="1">我是div</div>
$('div').attr('index');

// 设置
// attr("属性","属性值")  //类似原生setAttribute()
//<div index="1">我是div</div>
$('div').attr('index', 4);
```

- 数据缓存 data()

```js
// data() 方法可以在指定的元素上存取数据,并不会修改DOM元素结构，一旦页面刷新，之前存放的数据都将被移除。

// 附加数据
//数据缓存 data() 这个里面的数据是存放在元素的内存里面
$('span').data('uname', 'andy');

// 获取数据
$('span').data('uname');

// 同时，还可以读取H5自定义属性 data-index,得到的是数字型
<div index="1" data-index="2">
  我是div
</div>;
// 这个方法获取data-index h5自定义属性 第一个不用写 data- 而且返回的是数字型
console.log($('div').data('index')); // 2
```

## 内容文本值

- 元素内容 html()

```js
// 获取
<div>
  <span>我是内容</span>
</div>;

$('div').html(); // 结果：<span>我是内容</span>
```

- 设置

```js
<div>
  <span>我是内容</span>
</div>;

$('div').html('123'); // 结果：<div> 123 </div>
```

- 元素文本内容 text()

```js
// 获取
<div>
  <span>我是内容</span>
</div>;

$('div').text(); // 结果：我是内容

// 设置
<div>
  <span>我是内容</span>
</div>;

$('div').text('123'); // 结果：<div> 123 </div>
```

- 表单值 val()

```js
// 获取
<input type="text" value="请输入内容">
$("input").val()   // 结果：请输入内容

// 设置
<input type="text" value="请输入内容">
$("input").val("123")   // 结果：<input type="text" value="123">
```

## 元素操作

- 遍历元素

```js
// ①语法一 （遍历DOM对象）

// 语法一
$('div').each(function (index, domEle) {
  // xxx;
});

// each()方法遍历匹配的每一个元素。主要用DOM处理。each每一个
// 里面的回调函数有2个参数: index是每个元素的索引号,demEle是每个DOM元素，不是jQuery对象
// 所以想要使用jQuery方法，需要给这个dom元素转换为jquery对象 $(domEle)

$(function () {
  //将3个div分别改为红、绿、蓝三种颜色
  // 1. each() 方法遍历元素
  var arr = ['red', 'green', 'blue'];
  $('div').each(function (i, domEle) {
    // 回调函数第一个参数一定是索引号  可以自己指定索引号号名称
    console.log(i);
    // 回调函数第二个参数一定是 dom元素对象 也是自己命名
    $(domEle).css('color', arr[i]);
  });
});

// ②语法二 （遍历数组、对象）
// 语法二
$.each(Object, function (index, element) {
  // xxx;
});

// $.each() 方法可用于遍历任何对象，主要用于数据处理,比如数组,对象
// 里面的函数有2个参数: index 是每个元素的索引号,element遍历内容

$(function () {
  var arr = ['red', 'green', 'blue'];
  // 2. $.each() 方法遍历元素 主要用于遍历数据，处理数据
  $.each($('div'), function (i, ele) {
    console.log(i);
    console.log(ele);
  });

  $.each(arr, function (i, ele) {
    console.log(i);
    console.log(ele);
  });

  $.each(
    {
      name: 'andy',
      age: 18,
    },
    function (i, ele) {
      console.log(i); // 输出的是 name age 属性名
      console.log(ele); // 输出的是 andy  18 属性值
    }
  );
});
```

## 创建元素

```js
// 动态创建一个li标签
// $('<li></li>');
var li = $('<li>我是后来创建的li</li>');
var div = $('<div>我是后来的div</div>');
```

## 添加元素

```js
// 把内容放入匹配元素内部最后面：element.append("内容")
// 把内容放入匹配元素内部最前面：element.prepend("内容")

$('ul').append(li);
// 把内容放入匹配元素内部最后面，类似原生appendChild

$('ul').prepend(li);
// 把内容放入匹配元素内部最前面

// 外部添加把内容放到目标元素后面：element.after("内容")
// 外部添加把内容放到目标元素前面：element.before("内容")

var div = $('<div>我是后妈生的</div>');
$('.test').after(div);
// 把内容放入目标元素后面

$('.test').before(div);
// 把内容放入目标元素前面
```

## 删除元素

```js
// 删除匹配的元素(本身)：element.remove()
// 删除匹配的元素集合中所有的子节点：element.empty()
// 清空匹配的元素内容：element.html("")

$('ul').remove(); // 删除匹配的元素(本身)
$('ul').empty(); // 删除匹配元素里面的子结点(孩子)
$('ul').html(''); // 删除匹配元素里面的子结点(孩子)

// remove 删除元素本身
// empt() 和 html(“”) 作用等价，都可以删除元素内部的内容，只不过 html 还可以设置内容。
```

## 尺寸操作

```js
// width() / height()	取得匹配元素宽度和高度值，只算 width / height
// innerWidth() / innerHeight()	取得匹配元素宽度和高度值，包含padding
// outerWidth() / outerHeight()	取得匹配元素宽度和高度值，包含padding、border
// outerWidth(true) / outerHeight(true)	取得匹配元素宽度和高度值，包含padding、border、margin

// 以上参数为空，则是获取相应值，返回的是数字型
// 如果参数为数字，则是修改相应值
// 参数可以不必写单位
```

## 位置操作

```js
// 位置主要有三个： offset()、position()、scrollTop()/scrollLeft()
```

- 设置或获取元素偏移 offset()

```js
// offset() 方法设置或返回被选元素相对于文档的偏移坐标，跟父级没有关系
//1. 获取偏移
console.log($('.son').offset());
console.log($('.son').offset().top);

//2. 设置偏移
$('.son').offset({
  top: 200,
  left: 200,
});

// 该方法有两个属性 left、top.
//    · offset().top用于获取距离文档顶部的距离，
//    · offset().left 用于获取距离文档左侧的距离

// 可以设置元素的偏移：offset({ top: 10, left: 30 });
```

- 获取元素偏移 position()

```js
// position() 方法用于返回被选元素相对于带有定位的父级偏移坐标，如果父级都没有定位，则以文档为准
$('.son').position();

// 这个方法只能获取偏移，不能设置偏移
// 该方法有2个属性 left、top。
// 	position().top 用于获取距离定位父级顶部的距离，
// 	position().left 用于获取距离定位父级左侧的距离。
```

- 8.3 设置或获取元素被卷去的头部和左侧 scrollTop()/scrollLeft()

```js
// 可用于在制作“返回顶部”的按钮时，计算何时出现按钮
// scrollTop()方法设置或返回被选元素被卷去的头部。
// 不跟参数是获取，参数为不带单位的数字则是设置被卷去的头部

// 页面滚动事件 获取被卷去的头部
$(window).scroll(function () {
  console.log($(document).scrollTop());
});

//设置页面初始被卷去的头部
$(document).scrollTop(100);
```
