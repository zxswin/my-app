## JavaScript 基础知识提升后盾人

- 变量的声明

```ts
consle.log(a); // 不报错 a是undefined
var a = "1";
// let 必须在声明前使用
consle.log(a); // 报错 使用let则必须在声明后使用
let a = "1";

// var没有快作用域
var i = 99;

for (var i = 0; i < 5; i++) {
  console.log(i);
}

conole.log(i); // 5 会影响到全局定义的i变量

// 如果使用let就会有自己的作用域
var i = 99;

for (let i = 0; i < 5; i++) {
  console.log(i);
}

conole.log(i); // 99 使用let不会影响到全局的i

/* let可以在块作用域中使用类似于下面 */
{
  let a = 1;
}

console.log(a); // 此时会报错 在外部是访问不到这个a的

/* 无法修改到name 因为name是window下的一个属性 */
let name = "a";

console.log(window.name); // 还是window下一开始定义的值

console.log(name); // a 使用let不会影响到window下的同名变量
/* const 也和let类型有自己的作用域 */
/* const 和 let 不可以重复声明同一个变量 */
/* 冻结const 声明的引用类型常量 */
"use strict";

const HOST = {
  url: "https://www.abc.com",
  port: 443,
};

Object.freeze(HOST); // 冻结对象使对象不可以被修改

HOST.port = 80; // 在严格模式下会有报错提示

console.log(HOST);

/* 传值于传址 */
// 传值
let a = 1;
let b = a; // 会复制1 然后传给b
// 传址
let e = {};
let f = e; // e和f会指向同一个引用对象

/* null 和 undefined  */
let config = null; // 初始值 null 对应引用类型
let web = undefined; // 初始值 undefined 对应基本类型
```

- 运算符与流程控制

```ts
/* switch也用来判断条件 */
let age = 60;
let msg = '';

switch(true){
  case age > 60:
    msg = '老年'；
    break;
  case age > 40:
    msg = '中年';
    break;
  default:
    msg = '壮年'；
    break;
}

return msg;

/* 通过打标签的方式来控制循环体  */
tab1: for(let i = 1;i<=10; i++){
  tab2:for(let n=1;n<=10;n++){
    if(n%2 === 0){
      console.log(i,n);
    }

    if(n+i>10){
      break tab1; // 中断外部的循环体
    }
  }
}


```

- 值类型的使用

```ts
/* 使用模版变量的小技巧  */
const lessons = [{ title: 1 }, { title: 1 }, { title: 1 }];
function template() {
  return `
  <ul>${lessons
    .map(
      (item) => `<li>
  ${item.title}
  </li>`
    )
    .join("")}</ul>
  `;
}

document.body.innerHTML = template();

/* 模版标签的使用 */
let name = "a1";
let web = "a2";

console.log(tag`名称${name},网址是${web}。`);

function tag(strings, ...vars) {
  console.log(vars);

  console.log(strings);
}

// (2) ["a1", "a2"]
// (3) ["名称", ",网址是", "。", raw: Array(3)]

/* 字符串的常用方法 */
let name = "abcde";
console.log(name.length); // 获取字符串的长度
console.log(name.toUpperCase()); // 字符串转大写
console.log(name.toLowerCase()); // 字符串转小写

let site = "  abcd   ";

console.log(site.trim().length); // 去除空格并获取长度

let hd = "abce";
console.log(hd.charAt(0)); // 取字符串的第0个字符

// 字符串的截取操作
let hd = "houdunren.com";
console.log(hd.slice(1)); // 从下标为1的截取到最后
console.log(hd.substing(1)); // 从下标为1的截取到最后
console.log(hd.substr(1)); // 从下标为1的截取到最后

console.log(hd.slice(1, 3)); // ou 从下标为1的开始截取 不包括下标为3的
console.log(hd.substing(1, 3)); // ou 从下标为1的开始截取 不包括下标为3的
console.log(hd.substr(1, 3)); // oud 从下标为1的开始截取3个

console.log(hd.slice(-3)); // com 从后面第几位开始截取
console.log(hd.substing(-3)); // houdunren.com 填负数没有意义还是从0开始
console.log(hd.substr(-3)); // com 后面第几位开始截取

console.log(hd.slice(-3, -1)); // co 从后面第3位截取到后面第一位
console.log(hd.substing(-3, -1)); // 相当于0,0 填负数没有意义 它会被转换为0
console.log(hd.substr(-3, 2)); // co 后面第3位开始截取2位

// 字符串的检索操作
const hd = "abcdef";

console.log(hd.includes("b")); // true 如果包含则返回true 如果不包含则返回false
console.log(hd.includes("b", 2)); // false 从下标索引为2的开始查找

console.log(hd.indexOf("b")); // 1  返回b所在的下标 找不到则返回-1
console.log(hd.indexOf("b", 2)); // -1 从下标索引为2的开始查找

console.log(hd.lastIndexOf("b", 3)); //  从后面第几个开始查找

console.log(hd.startsWith("a")); // true 判断是否以某个字符开始 区分大小写
console.log(hd.endsWith("f")); // true 判断是否以某个字符结束 区分大小写

console.log(hd.replace("a", "g")); // 字符串替换

console.log("*".repeat(3)); // ***  重复输出3次 字符串重复

const number = 66;
const str = number + ""; // 数字转换为字符串
const str1 = String(number); // 数字转换为字符串

const cms = "hdcms";
console.log(cms.split("")); // 把字符串转换为数组

/* 布尔类型的操作 */

// 使用对象的方式
const boolean = new Boolean(false);
console.log(typeof boolean); // object
console.log(boolean.valueOf()); // false 通过valueOf来获取布尔对象的值;

// 使用字面量的方式
let hd = false;
console.log(typeof hd); // boolean

let number = 0;
console.log(Boolean(number)); // false 通过Boolean进行对象的转换
console.log(!!number); // false

/* 数值类型的操作 */
let number = new Number(99);
console.log(number.valueOf() + 1); // 100

let number = 99; // 字面量的声明方式
number.toString(); // 转换为字符串类型
number.valueOf(); // 99

let number = 99.556;
Number.isInteger(number); // 判断是否为一个整数
console.log(number.toFixed(2)); // 四舍五入 保留两位小数

// NaN类型的判断
console.log(Number("houdunren"));
console.log(2 / "houdunren");

console.log(NaN === NaN); // false

console.log(Number.isNaN(2 / "houdunren")); // 判断是不是NaN类型
console.log(Object.is(2 / "houdunren", NaN)); // 判断是不是NaN类型

let hd = "cms89.78houdunren";
console.log(parseInt(hd)); // NaN
console.log(parseFloat(hd)); // NaN

let array = [1, 2, 3];

console.log(Number(array)); // 如果是空数组则为0 如果数组中只有一个元素例如[1] 则返回1；如果有多个元素则返回NaN

// 对象的转换
console.log(Number({})); // NaN

console.log(
  Number({
    valueOf: function () {
      return 99;
    },
  })
); // 打印出99

/* 数学计算 */
Math.min(1, 2, 3, 4, 5); // 获取最小值
Math.max(1, 2, 3, 4, 5); // 获取最大值

let grade = [1, 2, 3, 4, 5];
Math.max.apply(null, grade); // 使用this替换就可以传入数组

Math.ceil(5.01); // 6 向上取整
Math.floor(5.99); // 5 向下取整
(5.566).toFixed(2); // 5.57 四舍五入保留两位小数
Math.round(5.56); // 6 四舍五入

// 随机数
Math.random(); // 获取随机数 0 - 1；
// 获取0 - 5 之间的随机数(包含5)
Math.floor(Math.random() * (5 + 1));
// 获取2-5 之间的随机数(包含5)

2 + Math.floor(Math.random() * (5 - 2 + 1));

// 一个随机数点名的demo
const students = [1, 2, 3, 4, 5];

function arrayRandomValue(array, start = 1, end) {
  end = end ? end : array.length;
  start--;
  const index = start + Math.floor(Math.random() * (end - start));
  return array[index];
}

console.log(arrayRandomValue(students));

/* 日期与时间的操作 */
const date = new Date();
console.log(date); // Sun Aug 30 2020 15:05:03 GMT+0800 (中国标准时间)
console.log(typeof data); // object
console.log(date * 1); // 时间戳

const hd = Date();
console.log(hd); // Sun Aug 30 2020 15:05:03 GMT+0800 (中国标准时间)

console.log(typeof hd); // string
console.log(hd * 1); // NaN

// 直接获取时间戳的方法
const date = Date.now(); // 1598771247394  毫秒数

// 计算程序运行的时间demo
// for: 117.032958984375ms
console.time("for");
for (let i = 0; i < 200000000; i++) {}
console.timeEnd("for");

// 定义一个时间
const date = new Date("1990-9-22 3:22:18");
console.log(date);
console.log(date.getMonth()); // 8 获取月份 从0 开始

// 第二种日期的定义方法
const date = new Date(1990, 2, 22, 13, 22, 19);

// 获取时间戳的几种方式
const date = new Date("1996-7-12 08:22:12");
console.log(date * 1);
console.log(Number(date));

console.log(date.valueOf());
console.log(date.getTime());

// 把时间戳转换为时间对象
const timestamp = date.valueOf();
console.log(new Date(timestamp));

// 获取日期对象的年月日时分秒
const date = new Date("1992-2-12 10:22:18");

console.log(date);
console.log(date.getFullYear()); // 年
console.log(date.getMonth() + 1); // 月
console.log(date.getDate()); // 日
console.log(date.getHours()); // 时
console.log(date.getMinutes()); // 分
console.log(date.getSeconds()); // 秒

// 封装一个日期格式化的函数
const date = new Date("1992-2-12 10:22:18");
function dateFormat(date, format = "YYYY-MM-DD HH:mm:ss") {
  const config = {
    YYYY: date.getFullYear(),
    MM: date.getMonth(),
    DD: date.getDate(),
    HH: date.getHours(),
    mm: date.getMinutes(),
    ss: date.getSeconds(),
  };

  for (const key in config) {
    format = format.replace(key, config[key]);
  }

  return format;
}

console.log(dateFormat(date));

// moment 时间函数库的使用
const date = moment("1992-02-22 10:12:22"); // 如果不传参数的化则是当前日期
console.log(date.format("YYYY-MM-DD HH:mm:ss")); // 1992-02-22 10:12:22
console.log(date.add(10, "days").format("YYYY-MM-DD HH:mm:ss")); // 获取10天后的日期
```

- 数组的挖掘

```ts
// 把数组以表格的形式打印出来
console.table([1, 2, 3, 4, 111]);

// 数组的创建
let arr = new Array(6); // 当只有有个参数的时候会创建一个有6个空元素的数组

let arr2 = Array.of(6); // 创建一个包含元素6的数组
console.table(arr);

// 检验是不是一个数组
Array.isArray([]); // true
// 把数组转换为字符串
let hd = [1, 3, 4].toString(); // 1,3,4
let hd = String([1, 3, 4]);
let hd = [1, 3, 4].join("|"); // 转换为字符串用|号链接

// 把字符串转换为数组
let str = "hdcms,cmd,hd";
console.log(str.split(","));

// 使用from 有length属性就可以生成一个数组
let str2 = "abc";
console.log(Array.from(str2)); // [a,b,c]

// 有length属性就可以转为数组 如果没有会转为一个空数组
let obj = {
  0: "hdcms",
  1: "houdunren",
  length: 2,
};

console.log(Array.from(obj));

// Array.from的第二个参数接收一个回调函数可以对数组中的每一项进行操作
let divs = document.querySelectorAll("div");

Array.from(divs, function (item) {
  item.style.backgroundColor = red;
  return item;
});

/* 数组展开语法的使用 */
let arr1 = ["a", "b", "c"];
let arr2 = [1, 2];

const arr3 = [...arr1, ...arr2];

// 一个求和函数的实现
function sum(...args) {
  return args.reduce((s, v) => {
    return s + v;
  }, 0);
}

console.log(sum(1, 2, 3));

/* 把dom节点转换为数组 */
const div = document.querySelectorAll("div");

// 使用Array.from
Array.from(div).map(function (item) {
  console.log(item);
  return item;
});

// 使用call
Array.prototype.map.call(div, function (item) {
  console.log(item);
});

// 通过使用扩展运算符
[...div].map(function (item) {
  console.log(item);
});

/** 数组的结构语法  */
let arr = ["a", 10];
let [name, year] = arr;
console.log(name, year);

const [...arr] = "abcd";
console.log(arr); // ['a','b','c','d']

let [name, ...args] = ["后盾人", "hdr.com", 2010];

// 数组的结构赋值也是可以先给一个默认值
let [name, year = 2010] = ["后盾人"];
console.log(year); // 2010

// 在函数参数中的解构赋值
function show([name, year]) {
  console.log(name, year);
}

show(["后盾人", 2010]);

/* 往数组里面追加元素 */
let array = ["a", "b"];
let hd = [1, 2];

array.push("c", "d"); // 往数组里追加元素 返回数组的长度 会直接改变原数组

/* 把数组的值从后面弹出 */
let array = ["hdcms", "houdunren"];
let vars = array.pop();

console.log(vars); // 被弹出的值
console.log(array); // 会改变原数组

/* 把数组的值从前面压入 */

let array = ["hdcms", "houdunren"];
let length = array.unshift("a"); // 返回数组的长度
console.log(array); // 会改变原数组

/* 把数组的值从前面移除 */

let array = ["hdcms", "houdunren"];
let vars = array.shift(); // 返回移除的值
console.log(array); // 会改变原数组

/* 数组的填充 */
console.log(Array(5).fill("后盾人"));

console.log([1, 2, 3, 4].fill("后盾人", 1, 3)); // [1, "后盾人", "后盾人", 4]

/* 数组的截取 */
let arr = [1, 2, 3, 4, 5];

let hd1 = arr.slice(); // 截取整个数组
let hd2 = arr.slice(1); // 会返回一个新数组 重新下标为1的元素截取到最后
let hd1 = arr.splice(1, 2); // 会返回一个新数组 重新下标为1的元素截取到下标为2的元素(不包括下标为2的元素)

/* 数组的替换操作 */
// splice 的返回值是 包含被删除项目的新数组
let arr = [1, 2, 3, 4, 5];
arr.splice(1, 1, "后盾人"); // 从下标为1元素开始 删除1个元素 然后追加一个元素(会改变原数组)

// 移动数组元素的位置
function move(array, from, to) {
  if (from < 0 || to >= array.length) {
    console.error("参数错误");
    return;
  }
  const newArray = [...array];

  let item = newArray.splice(from, 1); // 返回包含被删除项目的新数组

  newArray.splice(to, 0, ...item);

  return newArray;
}
let array = [1, 2, 3, 4];
console.table(move(array, 1, 3));

/* 清空数组的多种处理方式 */
let hd = [1, 2, 3, 4, 5];
hd.length = 0; // 推荐
hd = []; // 这样也可以起到清空数组的效果

/* 数组转为字符串 */
let arr = ["hdcms", "houdunren"];
console.log(hd.join("-"));

/* 数组的合并 */
let arr = ["hdcms", "houdunren"];
let hd = [1, 2, 3, 4, 5];
let cms = ["shop", "cms"];

arr = arr.concat(hd, cms);
console.log(arr);

/* copyWithin() 方法用于从数组的指定位置拷贝元素到数组的另一个指定位置中。 */
// array.copyWithin(target, start, end) // 不包含结束位置的元素
let hd = [1, 2, 3, 4, 5, 6];
console.log(hd.copyWithin(3, 1, 3)); // [1, 2, 3, 2, 3, 6]

/* 查找数组中的元素 */
let arr = [1, 2, 3, 4, 5];

console.log(arr.includes(2)); // true;

// 使用find方法查找元素
let res = arr.find(function (item) {
  return item === 2;
});

console.log(res); // 2

// findIndex 返回元素的索引位置
let res = arr.findIndex(function (item) {
  return item === 2;
});

console.log(res); // 1

/* 使用原生代码实现find方法 */
function find(array, callback) {
  for (const value of array) {
    if (callback(value)) return value;
  }

  return undefined;
}

let arr = [1,2,3,4,5,6];
console.log(find(arr,function(item=> item === 2)))

/* 在原型链上定义findValue方法 */

Array.prototype.findValue = function(callback){
for (const value of this) {
    if (callback(value)) return value;
  }

  return undefined;
}

let arr = [1,2,3,4,5,6];
const res = arr.findValue(function(item){
  return item ===2;
})
console.log(res)

```

- 数组的排序

```ts
/* 数组的排序 */
let arr = [1, 5, 7, 3, 4];

arr = arr.sort(function (a, b) {
  // -1 从小到大 1正数 从大到小

  return a - b; // 从小到大
  return b - a; // 从大到小
});

/*使用原生js来实现排序 */
function sort(array, callback) {
  for (const n in array) {
    for (const m in array) {
      if (callback(array[n], array[m]) < 0) {
        const temp = array[n];
        array[n] = array[m];
        array[m] = temp;
      }
    }
  }
  return array;
}

let arr = [1, 6, 5, 7, 8, 3, 19.1];

arr = sort(arr, function (a, b) {
  return b - a;
});

console.log(arr);

/* 数组的循环 */
let arr = [1, 2, 3];
for (let value of arr) {
  value += 10; // 如果数组中的值是基础类型 这样并不会影响到原来的数组
}

console.log(arr); // [1,2,3]

//数组可以使用for in 进行循环
for (const key in lessons) {
  lessons[key].title = `***`;
}

/* 使用forEach进行数组循环 */
// forEach可以直接操作dom元素
// 修改item会直接改变数组
let lis = document.querySelectorAll("ul li");
lis.forEach(function (item) {
  item.addEventListener("click", function () {
    this.classList.toggle("disable"); // 切换样式
  });
});

/* iterator 迭代器的方法玩转数组  */
let arr = ["a", "b"];
let keys = arr.keys(); // 生成一个包含key的可迭代对象
let values = arr.values(); // 生成一个包含value的可迭代对象
let entries = arr.entries(); // 生成一个可迭代对象 值是key和value组成的数组

let { value, done } = values.next();
console.log(value, done); // 打印出值和是否迭代结束
console.log(value, done); // 打印出值和是否迭代结束 如果后面还有值则done是false

// 遍历数组
while (({ value, done } = values.next()) && done === false) {
  console.log(value);
}

// 使用for of 来操作迭代器对象
for (const value of arr.values()) {
  console.log(value);
}

for (const [key, value] of arr.entries()) {
  console.log(value);
}

/* every 和 some的使用 */

// every 只要数组中有一个元素不满足条件就返回false
let arr = ["a", "b"];

let status = arr.every(function (value, index, arr) {
  console.log(value);
  return value === "a";
});

console.log(status); // 返回true或false

// some 只要数组中有一个元素满足条件就返回true
// 当有元素返回满足条件 则退出循环不会在比对后面的元素
let arr = ["a", "b"];

let status = arr.some(function (value, index, arr) {
  console.log(value);
  return value === "a";
});

console.log(status); // 返回true或false

/* filter 过滤数组方法的使用  */

let arr = ["a", "b"];

let newArr = arr.filter(function (value, index, arr) {
  console.log(value);
  return value === "a";
});

console.log(newArr); // 返回一个得到过滤结果的新数组 ['a']

// 自己写一个过滤器函数
let hd = [1, 2, 3, 4];
function filter(array, callback) {
  let newArray = [];
  for (const value of array) {
    if (callback(value) === true) {
      newArray.push(value);
    }
  }
  return newArray;
}

console.log(
  filter(hd, function (value) {
    return value > 2;
  })
);

/* map映射数组与引用类型处理技巧 */
// map里面最好不要修改value 取值就可以了

let arr = ["a", "b"];

let newArr = arr.map(function (value, index, arr) {
  value = `修改后-${value}`; // 如果value是引用类型的话则会改变原数组
  return value;
});

console.log(newArr); // 返回一个新数组

// 如果值是引用类型如下操作可以不改变原数组类型的值
let newArr = arr.map(function (value, index, arr) {
  return Object.assign({click,100},value);
});

console.log(newArr)

```

- reduce 方法详解

```ts
// 没有传递初始值则初始值取数组的第一个
let arr = [1, 2, 3, 4, 5];
arr.reduce(function (pre, value, index, array) {
  console.log(pre, value);
  return 99;
});
// 打印结果
// 1 2  // 第一次会打印出第一和第二个元素
// 99 3
// 99 4
// 99 5

arr.reduce(function (pre, value, index, array) {
  console.log(pre, value);
  return 99;
}, 0);

// 传递初始值为0
// 比没有传初始值多遍历来一次
// 0 1 // 第一次打印初始值和第一个元素
// 99 2
// 99 3
// 99 4
// 99 5

// 实例 计算数组中元素出现的次数
let arr = [1, 2, 3, 1, 1];

function arrayCount(array, item) {
  return array.reduce(function (total, cur) {
    total += item === cur ? 1 : 0;

    return total;
  }, 0);
}

console.log(arrayCount(arr, 1));

// 实例 获取数组中的最大值
let arr = [1, 2, 3, 4, 3, 4, 99, 88];
function arrayMax(array) {
  return array.reduce(function (pre, cur) {
    return pre > cur ? pre : cur;
  });
}

console.log(arrayMax(arr));

// 实例 数组求和
let arr = [1, 2, 3, 4, 3, 4, 99, 88];
function arraySum(array) {
  return array.reduce(function (total, cur) {
    return (total += cur);
  }, 0);
}

console.log(arraySum(arr));

// 实例 数组去重
let list = [1, 2, 3, 44, 5, 3, 3, 6, 6];
let newArr = list.reduce(function (arr, cur) {
  if (!arr.includes(cur)) {
    arr.push(cur);
  }
  return arr;
}, []);

console.table(newArr);

/* 一个酷炫的文字效果的实现 */
const div = document.querySelector("div");
[...div.textContent].reduce(function (pre, cur, index) {
  pre === index && (div.innerHTML = ""); // 开始的时候先清空元素中的内容
  // 添加span元素
  let span = document.createElement("span");
  span.innerHTML = cur;
  div.appendChild(span);
  span.addEventListent("mouseover", function () {
    this.classList.add("color"); // 给元素添加类
  });
  // 监听动画走完的时候去除样式
  sapn.addEventListent("animationend", function () {
    this.classList.remove("color");
  });
}, 0);
```

- 酷炫文字动画效果的样式

```css
.color {
  animation-name: color;
  animation-duration: 1s;
  animation-iteration-count: 2;
  animation-timing-function: linear;
  animation-direction: alternate;
}
@keyframes color {
  50% {
    color: #f1c40f;
    transform: scale(2);
  }
  to {
    color: #e74c3c;
    transform: scale(0.5);
  }
}
```

## 好用的 JavaScript Symbol 类型

```ts
/**
 * Symbol 用于产生唯一的数据
 */
let hd = Symbol();
let edu = Symbol();

console.log(hd === edu); // false;  Symbol是唯一的 提供唯一的字符串

// 描述Symbol
let hd = Symbol("后盾人在线教程");
let edu = Symbol("网址是houdunren.com");

console.log(hd.description); // 后盾人在线教程 会把描述打印出来

// 第二种描述和定义symbol的方式
// 使用这种定义方式系统会记住这个描述symbol
// 取的时候系统会找这个symbol 并返回
let cms = Symbol.for("hdcms");
let edu = Symbol.for("hdcms");

console.log(cms); // Symbol(hdcms)

console.log(cms === edu); // true 使用for生成Symbol 描述一样被认为是同一个

console.log(Symbol.keyFor(cms)); // 获取for定义的Symbol的描述字符串 如果使用普通定义则读取不到
```

- symbol 的使用

```ts
let user1 = {
  name: "李四",
  key: Symbol(),
};
let user2 = {
  name: "李四",
  key: Symbol(),
};

let grade = {
  [user1.key]: { js: 100, css: 89 },
  [user2.key]: { js: 35, css: 55 },
};

console.log(grade[user2.key]); // 取出对应的值
```

- 扩展对象与对象属性保护

```ts
// symbol对象不能被迭代器获取到 被保护了
// 如果不想被外部迭代访问到的话可以使用symbol作为key
let symbol = Symbol("这是一个Symbol类型");
let hd = {
  name: "abc",
  [symbol]: "symbolname",
};

for (const key in hd) {
  console.log(key); // 值打印出了name 获取不到symbol
}

for (const key of Object.keys()) {
  console.log(key); // 值打印出了name 获取不到symbol
}

// 可以迭代获取到Symbol对象的方法
for (const key of Object.getOwnPropertySymbols(hd)) {
  console.log(key); // 可以获取到symbol对象 只打印出symbol对象
}

// 可以迭代获取symbol对象和普通key
for (const key of Reflect.ownKeys(hd)) {
  console.log(key); // 可以获取到symbol对象和普通的key
}
```

## Set 与 WeakSet 类型在 JavaScript 中的使用

```ts
/**
 * set 和数组类似 但是不能有重复的元素(数据类型必须相同)
 */

// 第一种声明set的方法
let set1 = new Set([1, 2, 3, 4, 5, 1, 2, 3, 4, 5]);
console.log(set1); // Set(5) {1, 2, 3, 4, 5}

// 第二种声明set的方法
let set2 = new Set();
set2.add(1);
set2.add("1");
console.log(set2); // Set(2) {1, "1"}

// set的常用操作

// 如果是字符串的话会被自动展开
let set3 = new Set("abcde");
console.log(set3); // Set(6) {"a", "b", "c", "d", "e"}

let set4 = new Set(["a", "b", "c"]);

console.log(set4.size); // 返回Set的长度

// 删除set中的元素
console.log(set4.delete("b")); // 如果删除成功则返回true
console.log(set4.size);

// 判断set中是否保护某个元素
console.log(set4.has("a")); // 如果保护则会返回true;

// 往set里面追加元素
set4.add("d");
console.log(set4); // Set(3) {"a", "c", "d"}

// 查看set里面的元素
console.log(set4.values()); // SetIterator {"a", "c", "d"}

// 清空set
console.log(set4.clear()); // 返回值是undefined
console.log(set.size); // 0
```

- Set 数据的转换

```ts
// set数据转换为数组
let set = new Set([1, 2, 3, 4, 5, 5]);

// 1.使用 Array.from
console.log(Array.from(set)); //  [1, 2, 3, 4, 5]

// 2.使用数组的扩展语法
console.log([...set]);
```

- 遍历 set 类型的方式

```ts
let set = new Set(["a", "b"]);

console.log(set.values()); // SetIterator {"a", "b"}
console.log(set.keys()); // SetIterator {"a", "b"}
console.log(set.entries()); // SetIterator {"a" => "a", "b" => "b"}

// 可以使用forEach进行set元素的迭代操作
set.forEach((value, key, set) => {
  console.log(value, key); // a a key和value是一样的
});

// 可以使用for of进行遍历操作
for (const value of set) {
  console.log(value);
}
```

- set 并集 差集 交集算法实现

```ts
let a = new Set([1, 2, 3, 4, 5]);
let b = new Set([4, 5, 2, 9]);

// 并集
console.log(new Set([...a, ...b]));

// 差集
console.log(
  new Set(
    [...a].filter(function (item) {
      return !b.has(item);
    })
  )
);

// 交集
console.log(
  new Set(
    [...a].filter(function (item) {
      return b.has(item);
    })
  )
);
```

- weakSet 类型

```ts
/**
 * 和Set类似的
 * 不同之处在于元素必须是引用类型
 * 如果加入的元素不是引用类型则会报错
 *
 * 无法使用values keys entries size等方法
 * 无法使用for of forEach等方法
 *
 * 使用场景
 * 引用类型的引用次数被清空 则 weakSet中的弱引用也会被清空
 * 这样就不用再对weakSet中的元素进行删除操作了
 */

// weakSet的弱引用特性
let hd = { name: "a" }; // 内存中的{name:'a'} 被引用1次

let edu = hd; // 内存中的{name:'a'} 被引用了2次

let set = new WeakSet(); // 创建一个weakSet对象
set.add(hd); // 往weakSet对象里面添加值 此时为弱引用 即内存中的{name:'a'} 还是只被引用了2次 引用次数没有增加

// 删除所有对内存中的{name:'a'}的引用
hd = null;
edu = null;

console.log(set); // weakSet 里面的{name:'a'}弱引用也会消失
```

- weakSet 的使用实例

```ts
class TodoList {
  constructor() {
    this.items = document.querySelectorAll("ul>li");
    this.lists = new WeakSet();
    this.items.forEach((item) => this.lists.add(item));

    console.log(this.lists);
  }

  run() {
    this.addEvent();
  }

  addEvent() {
    this.items.forEach((item) => {
      let a = item.querySelector("a");
      console.log(a);
      a.addEventListener("click", (event) => {
        const parentElement = event.target.parentElement;
        if (this.lists.has(parentElement)) {
          // 判断列表中是否存在这个li 有的话就删除
          parentElement.classList.add("remove");
          this.lists.delete(parentElement);
        } else {
          parentElement.classList.remove("remove");
          this.lists.add(parentElement);
        }
      });
    });
  }
}

new TodoList().run();
```

## Map 与 WeakMap 类型在 JavaScript 中的使用

```ts
/**
 * 对象 数值 字符串 都可以作为Map对象的key
 */

let map = new Map(); // 创建一个Map对象
map.set("name", "a"); // 给map对象设置一个值 字符串作为key
map.set(function () {}, "hdcms"); // function作为key
map.set({}, "baidu.com"); // 把一个对象作为key
map.set(1, "sina.com.cn"); // 把数值作为key

// 使用链式语法往Map里面追加数据
map.set("a", 1).set("b", 2).set("c", 3);

console.log(map);

// Map对象可以在创建的时候就给它赋值
let map = new Map([
  ["a", "123"], // 数组的第一个元素是键,第二个元素是值
  [{}, "456"],
]);

console.log(map);
```

- Map 对象的操作

```ts
let obj = {
  name: "明",
};

let map = new Map();
map.set(obj, "houdunren");
console.log(map.get(obj)); // 通过map的get方法获取到map中的值

console.log(map.delete(obj)); // 删除成功返回true 删除失败返回false

console.log(map.clear()); // 清除map对象 返回undefined

console.log(map.has(obj)); // 判断元素是否存在 存在返回true 不存在则返回false
```

- 遍历 Map 类型数据

```ts
let hd = new Map([
  ["a", 1],
  [{ a: 1 }, 2],
]);

console.log(hd.keys()); // 获取键
console.log(hd.values()); // 获取值
console.log(hd.entries()); // 获取键和获取值

// 使用for of进行遍历
for (const [key, value] of hd.entries()) {
  console.log(key, value);
}

// 使用forEach进行循环
hd.forEach((value, key) => {
  console.log(value, key);
});
```

- Map 的类型转换操作

```ts
let hd = new Map([
  ["a", 10],
  [{ a: 1 }, 20],
]);

console.log([...hd]); // 转换为数组
// 转换结果如下
// [
//   ["a",1: 10],
//   [{a:1},1: 20]
// ]

// 使用for of进行遍历
for (const [key, value] of hd.entries()) {
  console.log(key, value);
}

//　数组转换为Map对象
let newArr = [...hd].filter((item) => {
  return item[1] === 10;
});

let edu = new Map(newArr);
console.log(...edu.values());
```

- 通过 Map 类型来管理 DOM 节点

```ts
let map = new Map();

document.querySelectorAll('div').forEach(item=>{
  // 用key来保存dom对象,用value来保存数据
  map.set(item,{
    content:item.getAttribute('name');
  })
})

map.forEach((config,elem)=>{
  elem.addEventListener('click',()=>{
    console.log(config.content);
  })
})
```

- weakMap 语法的使用

```ts
/**
 * 弱引用类型
 * 不能使用keys values entries 等方法
 * 不可以使用size属性
 * 不可以使用for of 等迭代功能
 */

let arr = [];
let map = new WeakMap();
map.set(arr, "hdcms.com");

map.delete(arr); // 可以删除元素
console.log(map.keys()); // 不可以使用size方法
console.log(map.size); // 不可以使用size属性
```

-weakMap 的弱引用类型

```ts
let hd = { name: "后盾人" };
cms = hd;
let map = new WeakMap();
map.set(hd, "1"); // 设置后因为是弱引用所以{ name: "后盾人" }的引用并没有增加1

hd = null;
cms = null;

// 当 { name: "后盾人" } 的引用为0 的时候它会被清空,此时map中的弱类型引用也会被清空
// 为了不暴露里面的值所有keys等方法被屏蔽掉了
console.log(map);
console.log(map.has(hd)); // false
```

- 使用 weakMap 来实现课程选择功能

```ts
class Lesson {
  constructor() {
    this.lis = document.querySelectorAll("ul>li");
    this.countElem = document.getELementById("count");
    this.listElem = document.getELementById("lists");

    this.map = new WeakMap();
  }

  run() {
    this.lis.forEach((li) => {
      const a = event.target;
      const state = li.getAttribute("select");

      if (state) {
        li.removeAttribute("select");
        this.map.delete(li);
        a.innerHTML = "+";
        a.style.backgrouondColor = "green";
      } else {
        this.map.set(li);
        li.setAttribute("select", true);
        a.innerHTML = "-";
        a.style.backgroundDColor = "red";
      }

      console.log(this.map);
      this.render();
    });
  }

  count() {
    return [...this.lis].reduce((count, li) => {
      return (count += this.map.has(li) ? 1 : 0);
    }, 0);
  }

  lists() {
    return [...this.lis]
      .filter((li) => {
        return this.map.has(li);
      })
      .map((li) => {
        return `<span>${li.innerHTML}</span>`;
      })
      .join("");
  }

  render() {
    this.countElem.innerHTML = `共选了${this.count()}门课`;
    this.listElem.innerHTML = this.lists();
  }
}

new Lesson().run();
```

- 单词

```pug
entries 条目
expect 期待
symbol 符号 象征
reflect 反映 表达
weak 易受影响的
```
