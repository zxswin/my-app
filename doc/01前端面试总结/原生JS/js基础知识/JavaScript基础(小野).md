## JavaScript 基础

- js 引擎的单线程

```js
// 1.js引擎是单线程的但是它可以模拟多线程
// 通过轮转时间片：
// 短时间内轮流执行多个任务片段
// 1.任务1 任务2
// 2.切分任务1和任务2
// 3.随机排列这些任务片段,组成队列
// 4.按照这个队列顺序将任务片段送进JS进程
// 5.JS线程执行一个又一个的任务片段
```

- 运算相关

```ts
// NaN 数字类型
console.log(0 / 0); // NaN
// Infinity 数字类型
console.log(1 / 0); // Infinity
// -Infinity 数字类型
console.log(-1 / 0); // -Infinity

// a b 值的交互
let a = 1;
let b = 2;

a = a + b;
b = a - b;
a = a - b;

// ++ 和 --的问题
let a = 1;
console.log(a++); // 1
let a = 1;
console.log(++a); // 2

let a = 5,
  b;
b = --a + a++;
console.log(b, a); // 8 5

// 字符串相对应的ASCII码(字符相对应的十进制码)多个字符的,从左到右依次对比,直到比较出ASCII码的大小为止；
console.log('4.5' > '11'); // true 先比较4和1

// 逻辑运算

let a = 1 && 2; // 2
// 遇到真就往后走, 遇到假或走到最后就返回当前的值
let b = 0 || 1; // 1
// 遇到假就往后走,遇到真或者走到最后就返回当前的值
```

- 类型相关

```ts
// 可以检查到的类型  number string boolean object undefined
// Object = 引用类型 object/array
typeof null; // "object"
```

- 确定黄金分割数列第 n 位的值

```ts
// 1 1 2 3 5 8
const n = 5;
let n1 = 1;
let n2 = 1;
let n3;

for (let i = 2; i < n; i++) {
  n3 = n1 + n2;
  n1 = n2;
  n2 = n3;
}
console.log(n3); // 5

// 使用递归
function fb(n) {
  if (n <= 2) {
    return 1;
  }
  return fb(n - 1) + fb(n - 2);
}

fb(6); // 8
```

- 函数表达式

```ts
const test = function test1() {
  test1(); // 函数名在内部可见 可递归
};

test(); // 在外部只能识别test 而不能识别test1
```

- 实参是可以在函数内部被修改的

```ts
function test(a, b) {
  a = 3; // 会把实参修改为3 这里定义的a并不是全局变量
  console.log(arguments[0]);
}

test(1, 2); // 3
```

- 关于函数默认参数的问题

```ts
function test(a = 1, b) {
  // a 和 argument[0]是映射关系 谁不是undefined就会取谁
  console.log(a); // 1
}

test(undefined, 2); // a参数使用默认值
```

- 阶乘的实现函数

```ts
function fact(n) {
  if (n === 1) {
    return 1;
  }

  return n * fact(n - 1);
}

fact(5); // 120
```

## 函数及作用域

- 预编译

```ts
// 预编译
// 1.检查通篇的语法错误
// 1.5.预编译的过程
// 2.解释一行,执行一行

// 函数声明整体提升,变量只有声明提升,赋值是不提升的

function test() {
  var a = (b = 1); // 先把1赋值给b 再把b的值赋值给a b是全局变量可以再外部被访问到
}

test();
console.log(b); // 1
```

- 活跃对象 函数上下文

```ts
// AO activation object
// 活跃对象函数上下文
// 1.寻找形参和变量声明
// 2.实参赋值给形参
// 3.找函数声明赋值
// 4.确定this指向
// 5.执行

function test(a) {
  console.log(a); // function a(){}
  var a = 1;
  console.log(a); // 1
  function a() {}
  console.log(a); // 1
  var b = function () {};
  console.log(b); // function () {};
  function d() {}
}

test(2);

// AO = {
//   a:undefined -> 2 -> function a(){} -> 1;
//   b:undefined -> function(){};
//   d:function d(){}
// }
```

- 全局上下文

```ts
// GO global object 全局上下文
// 1.找变量
// 2.找函数声明
// 4.确定this指向
// 3.执行
var a =1;
function a(){
  console.log(2);
}
console.log(a); // 1
GO = {
  a: undefined -> function a(){} -> 1;
}


// 案例

a = 1;
function test(){
    console.log(a);  // undefined -> 自身里面有a则找自身的a 不去找父级的

    if(a){
      var b = 1; // 预编译的时候不会去看条件预计,只要是变量就会被提升到AO中
    }
    a = 2;
    console.log(a); // 2
    var a = 3;
    console.log(a); // 3
}

test();
var a;
```

- 括号的优先级比逻辑运算符要高

```ts
window.a || (window.a = '1'); // 先执行括号里的再执行或运算符
console.log(window.a);
```

## 作用域链及闭包

- 作用域链

```ts
/**
 * 当a函数被定义的时候,系统生成[[scope]]属性,[[scope]]保存该函数的作用域链
 * 该作用域链的第0位储存当前环境下的全局执行期上下文GO
 * GO里存储全局上下文的所有对象,其中包含函数a和全局变量c
 */
function a() {}
var c = 3;

/**
 * 当a函数被执行时(前一刻)，作用域链的顶端(第0为)存储a函数生成的函数执行上下文AO
 * 同时第1位存储GO 查找变量是到a函数存储的作用域链中从顶端开始依次向下查找
 */

function a() {}
var c = 3;
a();

/**
 * 当b函数被执行时(前一刻) 生成函数b的[[scope]] 存储函数b的作用域链,
 * 顶端第0位存储函数的AO,a函数的AO和全局的GO依次向下排列
 */
function a() {
  function b() {}
  b();
}
var c = 3;
a();

/**
 * 当a函数被执行结束时,a函数的AO被销毁的同时,b函数的[[scope]]也将不存在
 * a函数回归到被定义时的状态
 */
```

- 闭包

```ts
/**
 * 当test1函数被定义时,系统生成[[scope]]属性,[[scope]]保存该函数的作用域链,该作用域链的第0位存储当前环境下的全局执行期上下文GO,
 * GO里存储全局下的所有对象,其中包含函数test1和全局变量c
 */
function test1() {}
var c = 3;
var test3 = test1();

/**
 * 当test1函数被执行时(前一刻),函数test2被定义(此时作用链和test1一样)
 *
 * 当test1函数被执行结束时,因为test2被返回到外部,且被全局变量test3接收。
 * 这个test1的AO并没有被销毁，只是把线剪断了,test2的作用域链还连着的
 */
function test1() {
  function test2() {}
  var a = 1;
  return test2;
}
var c = 3;
var test3 = test1();
test3();

/**
 * test3执行,test2的作用域链增加自己的AO,当打印a的时候，在自己的AO上没有查找到,则向test1的AO查找,再次执行test3时,实际操作的仍然是原来test1的AO
 */

/**
 * 当test3执行结束后,test2的AO被销毁,但原来的test1的AO仍然存在且被test2连着(已经保存再全局执行上下文GO中了,此时test2处于被定义的状态它的AO就是test的AO)
 */

/**
 * 总结:
 * 当内部函数被返回到外部并保存时,一定会产生闭包,闭包会产生原来的作用域链不释放，过度的闭包可能会导致内存泄漏,或加载过慢
 */
```

- 立即执行函数,闭包深入,逗号运算符

```ts
/**
 * 立即执行函数执行后就会被销毁 不会造成内存泄漏
  */

/**
 * 一定要是表达式才能被立即执行函数执行
  */
 (function test1(){
   console.log(1);
 }); // 被括号包裹变成表达式 同时函数名也被忽略了
 var test2 = function(){
   console.log(1);
 }(); // 可以被执行

 function test3(){
   console.log(1);
 }() // 不可以被执行报语法错误

 /**
  * 括号中的逗号运算符 返回最后一个
  */
  var num = (2 -1, 6 + 5, 24 + 1);
  console.log(num); // 25


/**
 * 经典笔试题
 */

function test(){
  var arr = [];
  var i = 0;
  for(;i< 10 ; ){
    arr[i] = function(){
      documnent.write(i + ' ');
    } // 这里的函数不会立即执行
    i++;
  }
  return arr;
}

var myArr = test();

for(var j = 0;j<10;j++){
  myarr[j](); // 每次都打印 10 此时执行i = 10
}

// for循环中的i
for(var i = 0; i<10; i++){

}

console.log(i) // 10

/** 使用立即执行函数实现从0打印到9  */
function test(){
  var arr = [];

  for(var i = 0; i<10; i++){
    (function(j){
      arr[j] = function(){
        document.write(j + ' ');
      }
    })(i)
  }

  return arr;
}

var myArr = test();

for(var j = 0;j<10;j++){
  myArr[j]();
}

/** 一道笔试题  */
var fn = (
  function test1(){
    return 1;
  },
  function test2(){
    return '2';
  }
)()

console.log(typeof(fn)); // string

/** 一道笔试题  */
var a = 10;
if(function b(){}){  // 括号中变成表达式 函数名被忽略了
  a += typeof(b);
}

console.log(a);  // 10undefined
```

- 闭包高级,对象，构造函数，实例化

```ts
/**
 * 创建对象的方式
 */

// 1.对象字面量 | 对象直接量
var obj = {
  name: '张三',
  sex: 'male',
};

// 2.系统自带的构造函数
var obj = new Object(); // 和对象字面量是一样的
obj.name = '张三';
obj.sex = '男士';

// 3.自定义构造函数
function Teacher() {
  this.name = '张三';
  this.sex = '男士';
  this.smoke = function () {
    console.log('I am smoking');
  };
}

var teacher = new Teacher();
```

- 构造函数及实例化原理和包装类

```ts
/**
 * 构造函数没有被实例化之前this指向的是window
 * 实例化之后this才指向实例化对应的对象
 */
function Car(color, brand) {
  this.color = color;
  this.brand = brand;

  var car1 = new Car('red', 'Benz');
  var car2 = new Car('black', 'Mazda');

  console.log(car1.color);
  console.log(car2.color);
}

/**
 * 实例化过程剖析
 */

function Car(color, brand) {
  // new 之后会创建this
  // this = {
  //   color:color,
  //   brand:brand;
  // }
  this.color = color;
  this.brand = brand;

  return {}; // 此时如果return出来的是引用对象 则实例化后会返回这个引用对象,如果是初始值还是会返回this

  // return this; new之后会隐式地返回this
}

var car1 = new Car('red', 'Benz');
```

- 包装类

```ts
/**
 * new Number
 * new String
 * new Boolean
 */

// 没有地方保存属性所有打印出undefined
var a = 123;
a.len = 3; // 原始值是不可以有属性的转换为包装对象 new Number(123).len = 3; 包装对象 没地方保存len属性所以删除掉len属性 delete
console.log(a.len); // undefined

// 有地方保存属性可以被打印出来了

var a = new Number(123);
a.len = 3;
console.log(a.len); // 3

// 字符串有length属性 是因为它中间经过了一层包装类
var str = 'abc';
var len = str.length;
console.log(len); // 3

// 实际上是装换成了 new String(str).length

var str = 'abc';
str.length = 1; // new String(str).length = 1;
// 没地方保存所有被delete 上面的赋值是无效的
console.log(str.length); // 3
// new String(str1).length;

/** 一道面试题  */
var name = 'languiji';
name += 10; // 'languiji10'
var type = typeof name; // 'string'

// var type = new String(typeof(name)); // 找个地方保存这样最终打印出来的就是string了

if (type.length === 6) {
  // true

  type.text = 'string'; // new String(type).text = 'string';  没地方保存所有被delete掉了
}

console.log(type.text); // undefined

/**
 * ASCII码
 * 表1 0 - 127
 * 表2 128 - 255
 * 均为1个字节 byte
 *
 * UNICODE码 涵盖ASCII码
 * 256位后占2个字节
 */

var str = 'a';

// charCodeAt() 方法可返回指定位置的字符的 Unicode 编码。
// 字符串中第一个字符的位置为 0， 第二个字符位置为 1，以此类推。
var pos = str.charCodeAt(0);
console.log(pos); // 97
```

- 原型,原型链,闭包和立即执行函数,插件开发初识

```ts
/** 提高for循环性能的方法  */
for (var i = 0; i < args.length; i++) {
  var item = args[i];
  res += item;
}

/** 原型链的一种推荐学法 */
function Handphone(color, brand) {
  this.color = color;
  this.brand = brand;
}

// 原型的属性和方法写在一个对象里
Handphone.prototype = {
  rom: '64G',
  call: function () {
    console.log('I am calling somebody');
  },
};

// Handphone.prototype里面有个constructor的属性
// constructor -> 构造函数本身
// constructor的指向是可以被更改的
console.log(Handphone.prototype);

/** 内置属性__proto__ */

function Car() {
  // 当被实例化的时候会隐式地创建下面的this并返回this
  // var this = {
  //   __proto__:Car.prototype
  // }
}

Car.prototype.name = 'Benz';

var car = new Car();
console.log(car.name);

/** __proto__属性是可以被更改的  */
function Person() {}
Person.prototype.name = '张三';

var p1 = {
  name: '李四',
};

var person = new Person();
console.log(person.name); // '张三'

person.__proto__ = p1;

console.log(person.name); // ‘李四’

/** constructor 构造器  */
Car.prototype.name = 'Benz';
function Car() {}

var car = new Car();

// 重写了prototype
Car.prototype = {
  name: 'Mazda',
};

// 如果是更改原来的prototype则最后打印的是"Mazda",
// Car.prototype.name = "Mazda";

console.log(car, car.name); // 'Benz'
// car 里面的constructor已经是name: "Mazda",
// 但是实例化car的时候隐式生成了this = { __proto__:{name:"Benz"}}及指向了Car.prototype,当访问car.name的时候,拿到的就是"Benz"

/** 插件的简单写法  */
// 使用到了立即执行函数
// 习惯上在立即执行函数前面加上;号,这样压缩的时候就不容易报错
(function () {
  function Test() {}

  window.Test = Test;
})();

var test = new Test();
```

- 原型与原型链深入,对象继承

```ts
/**
 * 原型链代码例子
 */

Professor.prototype.tSkill = 'JAVA';
function Professor() {}
var professor = new Professor();

Teacher.prototype = professor;
function Teacher() {
  this.mStill = 'JS/JQ';
  this.success = {
    alibaba: '28',
    tencent: '30',
  };
}
var teacher = new Teacher();

Student.prototype = teacher;
function Student() {
  this.pStill = 'HTML/CSS';
}
var student = new Student();

console.log(student); // __proto__ 指向Professor.prototype

console.log(Professor.prototype); // __proto__ 指向Object

// 原型链的顶端指向 Object.prototype

student.success.baidu = '100'; // 如果是引用对象 则可以改到teacher原型链上的属性
student.success.alibaba = '29'; // 如果是引用对象 则可以改到teacher原型链上的属性

student.mStill = 'aaa'; // 如果是原始值，则会加在自己的原型链上

console.log(teacher, student);

/**
 * Object.create(对象,null) 创建对象
 */

function Obj() {}
Obj.prototype.num = 1;
var obj1 = Object.create(Obj.prototype); // 这里创建的对象和new创建出来的是一样的
var obj2 = new Obj();
// new Obj的过程
// 1.实例化obj2
// 2.调用构造函数obj的初始化属性和方法
// 3.指定实例对象的原型

console.log(obj1);
console.log(obj2);

/**
 * 不是所有的对象都继承于Object.prototype
 * __proto__属性必须是系统自带的,如果自己造出来是没有用的
 * undefined null 是不能够经过包装类装换为对象的
 */
var obj = Object.create(null); // 生成一个纯粹的空对象里面没有原型

/** 面试题  */
var num = 1;
var obj = {};
var obj2 = Object.create(null);
document.write(num);
docuemnt.write(obj); // [Object Object]
document.write(obj2); // 报错,没有原型找不到toString的方法把它转换为原始值

/** 关于toString  */

Object.prototype.toString.call(1); // [object Number];
Object.prototype.toString.call('a'); // [object String];
Object.prototype.toString.call(true); // [object Boolean];
Object.prototype.toString.call([1, 2, 3, 4]); // [object Array];
Object.prototype.toString.call({ name: 1 }); // [object Object];

Number.prototype.toString.call(1); // '1'
Object.prototype.toString.call(1); // [object Number];

/**
 * call / apply
 * 无法继承原型链上的方法和属性
 */

function test() {
  console.log('a');
}
test(); // 实际上是系统隐式执行了test.call();

// call / apply简单例子
function Car(brand, color) {
  this.brand = brand; // newCar.brand = 'Benz'
  this.color = color; // newCar.color = 'color'
}

var newCar = {};
// Car.call(newCar, "Benz", "red"); // 改变this指向
Car.apply(newCar, ['Benz', 'red']); // 改变this指向
console.log(newCar);

// call / apply编程实例
function Compute() {
  this.plus = function (a, b) {
    console.log(a + b);
  };

  this.minus = function (a, b) {
    console.log(a - b);
  };
}

function FullCompute() {
  Compute.apply(this);
  this.mul = function (a, b) {
    console.log(a * b);
  };
  this.div = function (a, b) {
    console.log(a / b);
  };
}

var compute = new FullCompute();
compute.plus(1, 2);
compute.minus(1, 2);
compute.mul(1, 2);
compute.div(1, 2);
```

- 对象继承深入, call.apply,圣杯模式,构造函数和闭包,企业模块化

```ts
/** 原型链上的属性和方法继承 - 圣杯模式 */
function Teacher() {
  this.name = 'Mr. Li';
  this.tSkill = 'JAVA';
}
Teacher.prototype = {
  pSkill: 'JS/JQ',
};
var t = new Teacher();

console.log(t);

function Student() {
  this.name = 'Mr. Wang';
}

function Buffer() {}
Buffer.prototype = Teacher.prototype;
var buffer = new Buffer();
Student.prototype = buffer;
Student.prototype.age = 18;

var s = new Student();
console.log(s);

/** 封装继承的通用模式  */
function Teacher() {}
function Student() {}

inherit(Student, Teacher);
var s = new Student();
var t = new Teacher();

console.log(s);
console.log(t);

function inherit(Target, Origin) {
  function Buffer() {}
  Buffer.prototype = Origin.prototype;
  Target.prototype = new Buffer();
  Target.prototype.constructor = Target;
  Target.prototype.super_class = Origin;
}

/** 企业级的封装模式  */

var inherit = (function () {
  var Buffer = function () {};
  return function (Target, Origin) {
    Buffer.prototype = Origin.prototype;
    Target.prototype = new Buffer();
    Target.prototype.constructor = Target;
    Target.prototype.super_class = Origin;
  };
})();

function Teacher() {}
function Student() {}

inherit(Student, Teacher);
var s = new Student();
var t = new Teacher();

console.log(s);
console.log(t);

/** 一种初始化函数的方法  */
var initCompute = (function () {
  var a = 1;
  var b = 2;

  function add() {
    console.log(a + b);
  }

  function minus() {
    console.log(a - b);
  }

  return function () {
    add();
    minus();
  };
})();

initCompute();
```

- 链式调用,对象属性与遍历,this 指向，caller/callee

```ts
/** apply的使用例子  */
function Car(brand, color, displacement) {
  this.brand = brand;
  this.color = color;
  this.displacement = displacement;

  this.info = function () {
    return "排量为" + this.displacement + "的" + this.color + this.brand;
  };
}

function Person(opt) {
  Car.apply(this, [opt.brand, opt.color, opt.displacement]);
  this.name = opt.name;
  this.age = opt.age;

  this.say = function () {
    console.log(
      "年龄" + this.age + "岁姓名为" + this.name + "买了一辆" + this.info()
    );
  };
}

var p = new Person({
  brand: "奔驰",
  color: "红色",
  displacement: "3.0",
  name: "张三",
  age: "25",
});

p.say();

/** 链式调用例子  */
var sched = {
  wakeup: function () {
    console.log("runing");
    return this;
  },
  moring: function () {
    console.log("Going shopping");
    return this;
  },
  night: function () {
    console.log("sleeping");
    return this;
  },
};

sched.wakeup().moring().night();

/**
 * 对象属性的遍历
 * for in 既可以遍历对象也可以遍历数组
 * for in 会遍历出原型链上的属性
 */
var car = {
  brand: "benz",
  color: "red",
  displacement: "3.0",
};

for (var key in car) {
  console.log(car[key]);

  // 访问对象的属性在javascript 引擎中的处理流程
  // car.key -> car['key']  -> undefined
}

/**
 * hasOwnProperty() 判断一个属性是否为对象的自身属性
 */

function Car() {
  this.brand = "Benz";
  this.color = "red";
  this.displacement = "3.0";
}

Car.prototype = {
  lang: 5,
  width: 2.5,
};

Object.prototype.name = "Object";

var car = new Car();

for (var key in car) {
  if (car.hasOwnProperty(key)) {
    console.log(car[key]);
  }
}

/**
 * in 操作符
 * 判断一个属性存不存在一个对象上 返回true or false
 */

var car = {
  brand: "Benz",
  color: "red",
};

// car['displacement']
console.log("displacement" in car); // false

/** 如果要判断的属性在原型链上也是可以的  */
function Car() {
  this.brand = "Benz";
  this.color = "red";
}

Car.prototype = {
  displacement: "3.0",
};

var car = new Car();

console.log("displacement" in car); // true

/**
 * instanceof
 * A对象的原型链到底有没有B的原型
 * 对象是否有某个构造函数构造出来的
 */

function Car() {}
var car = new Car();

function Person() {}
var p = new Person();

console.log(car instanceof Car); // true
console.log(car instanceof Person); // false
console.log(car instanceof Object); // true
console.log([] instanceof Array); // true
console.log([] instanceof Object); // true
console.log({} instanceof Object); // true

/**
 * 使用toString方法来判断一个变量的数据类型
 */

var a = { a: 1 };

console.log(a.toString()); // [object Object]

var b = [1, 2, 3];

console.log(b.toString()); // 打印出字符串1,2,3

// 变量类型判断的核心代码
var str = Object.prototype.toString.call(b); // [object Array]

// 原理
Object.prototype = {
  toString: function () {
    this.toString(); // 使用call进行对象替换的时候 this被替换为b
  },
};

/**
 * 1.函数内部的this指向的问题
 */

function test(b) {
  this.d = 3; // window.d = 3 此时this是指向window的
  var a = 1;
  function c() {}
}

test(123);

console.log(this.d); // 这里的this也是指向window的

// test的AO
// AO = {
//   arguments:[123]
//   this: window
//   b:123,
//   a:undefined
//   c:function c(){}
// }

/**
 * 构造函数的this指向问题
 */

function Test() {
  // var this = {
  //   __proto__:Test.prototype
  // }
  this.name = "123";
}

var test = new Test();

// AO = {
//   this: {
//     name: "123",
//     __proto__: Test.prototype,
//   },
// };

// GO = {
//   Test: function test() {},
//   test: {
//     name: "123",
//     __proto__: Test.prototype,
//   },
// };

/**
 * 全局this -> window
 * 预编译函数this -> window
 * apply/call 改变this指向
 * 构造函数的this指向实例化对象
 */

/**
 * callee/caller
 */

function test(a, b, c) {
  console.log(arguments.callee.length); // 3 arguments.callee指向来test函数本身
  console.log(test.length); // 3 形参的个数

  console.log(arguments.length); // 2 实参的个数
}

test(1, 2);

// callee的使用案例 在自执行函数中使用 匿名函数

var sum = (function (n) {
  if (n <= 1) {
    return 1;
  }

  return n + arguments.callee(n - 1);
})(10);

console.log(sum); // 55

/** 返回被当前函数调用的函数引用  */
test1();

function test1() {
  test2();
}

function test2() {
  console.log(test2.caller); // 这里返回来test1
}

/** 面试题目1  */
function foo() {
  // 如果把null或者undefined作为this的绑定对象传入到call、apply或者bind，这些值在调用时会被忽略，实际应用的是默认绑定规则
  // null 作为一个占位符号
  bar.apply(null, arguments);

  // 执行流程
  // bar() -> bar.call(arguments) -> bar(arguments);
}

function bar() {
  console.log(arguments);
}

foo(1, 2, 3, 4, 5); // [1,2,3,4,5]

/** js的typeof可以返回的值有哪些  */
object(null)/boolean/number/string/undefined/function

/**
 * 面试题2
 * 实参和形参是一一对应的映射关系
 * 实参改变来形参也会跟着改,反过来也是这样
  */
function b(x,y,a){
  // arguments[2] = 10;
  // console.log(a); // 10

  a = 10;
  console.log(arguments[2]); // 10
}

/**
 * 面试题2
  */

console.log(undefined == null); // true
console.log(undefined == 0); // false
console.log(undefined == false); // false


console.log(null == 0); // false
console.log(null == false); // false

console.log(0 == false); // true

console.log(NaN == NaN) // false

console.log(isNaN('100')); // false 会先进行隐身式类型转换


/**
 * 面试题3
  */

 function test(){
  a = 0;

  var a;  // 变量声明会先被提升

  console.log(a); // 0
}

test();

```

- 三目运算符,对象克隆,浅拷贝,深拷贝

```ts
// 三目运算符
var a = 5;
str = a > 0 ? (a > 3 ? '大于3' : '小于等于3') : '小于等于0';
console.log(str);

// 浅拷贝

var a = {
  a: 1,
  b: 2,
  c: function () {},
};

var c = clone(a);

console.log(c);

function clone(origin, target) {
  var tar = target || {};
  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      tar[key] = origin[key];
    }
  }
  return tar;
}

// 深拷贝
var a = {
  a: 1,
  b: [1, 2, 3],
  c: {
    a: 1,
    b: 1,
    c: 1,
  },
};

var b = deepClone(a);

b.c.d = 2;

console.log(a, b);

function deepClone(origin, target) {
  var target = target || {};
  var toStr = Object.prototype.toString;
  var arrType = '[object Array]';

  for (var key in origin) {
    if (origin.hasOwnProperty(key)) {
      if (typeof origin[key] === 'object' && origin[key] !== null) {
        if (toStr.call(origin[key]) === arrType) {
          target[key] = [];
        } else {
          target[key] = {};
        }

        deepClone(origin[key], target[key]);
      } else {
        target[key] = origin[key];
      }
    }
  }

  return target;
}

// 另外一种深拷贝的方式(不能拷贝方法)
var a = {
  a: 1,
  b: [1, 2, 3],
  c: {
    a: 1,
    b: 1,
    c: 1,
  },
  d: function () {
    console.log('1');
  },
};
var str = JSON.stringify(a);
var b = JSON.parse(str);

console.log(b);
b.d(); // 报错因为拷贝不了方法

/** 面试题1  */
var c = '1';
var a = {
  a: 1,
  b: function () {
    +(function () {
      console.log(c); // 这里面的this指向的是window
    })();
  },
  c: 2,
};

a.b(); // 1
```

- 深拷贝实例,数组基础,数组方法,数组排序

```ts

/**
 * 数组
 * 修改原数组的方法 push/unshift/pop/shift/splice/reverse/sort
  */
// 数组后面打了逗号其实和没打一样
var arr = [1, 3, 5, 7];
var arr1 = new Array(1, 2, 3,,, 4, 5); // 会报错 数组元素不能为空 不能使用稀松数组的形式

var arr2 = new Array(5); // 设置长度为5的数组
console.log(arr.length); // 4


// push unshift
// 返回值是执行了方法后的数组长度

/** 自定义push方法  */
var arr = [1,2,3];
Array.prototype.myPush = function(){
  for(var i = 0; i< arguments.length;i++){
    this[this.length] = arguments[i];
  }
  return this.length;
}

var len = arr.myPush(1,2,3);
console.log(arr,len);

// pop 删除数组的最后一个元素 并返回删除的元素 会改变原数组
// shift 删除数组的第一个元素 并返回删除的元素 会改变原数组

// reverse 数组倒叙 会改变原数组

// splice 会改变原数组
// arr.splice(开始的下标,剪切的长度,添加的项)
var arr = ['a','b','c','e'];
arr.splice(-1,0,'d'); // 如果是负数则是从后面开始数 即在e的前面添加
console.log(arr);


/**
 * 数组排序sort()
 * 会改变原来的数组并返回排序以后的结果
  */
var arr = [1,2,3,6,5];
var b = arr.sort();
console.log(b,arr);

// sort -> 按照ascii码来排列的
// 1.参数a,b
// 2.返回值: 1.负值 a就排在前面
//          2.正值 b就排在墙面
//          3.0 保持不动

var arr = [27,49,5,7];
arr.sort(function(a,b){
  return a-b; // 升序
  return b-a; // 降序
});

console.log(arr);

/**
 * 数组的随机排序
 * Math.random() -> 0 - 1; 开区间
  */
arr.sort(function(a,b){
  var rand = Math.random();
  if(rand - 0.5 > 0){
    return 1
  }else {
    return -1;
  }
  // return Math.random() - 0.5;
})

console.log(arr);

/**
 * 数组中对象根据某个字段进行排序
  */
var arr = [
  {
    a:1
  },
  {
    a:5
  },
  {
    a:3
  }
];

arr.sort(function(a,b){
  return a.a - b.a;
});

console.log(arr);
```

- 数组方法和类数组

```ts
/*
 * 面试题1
 * 点的优先级要高于new
 * new new Foo().getName();  第一个new是没有作用的
 */

/**
 * concat 数组拼接
 * 会产生一个新的数组
 */

var arr1 = [1, 2, 3];
var arr2 = [4, 5, 6];
var arr3 = arr1.concat(arr2);
console.log(arr3);

/**
 * toString()
 * 数组转字符串
 */

var arr = [1, 2, 3];
console.log(arr.toString());

/**
 * slice 数组截取
 * 返回一个截取后的新数组
 * 负数则是从后面开始算
 */
var arr1 = [1, 2, 3];
var arr2 = arr1.slice(1, 2);
console.log(arr2); // [2]

/**
 * join
 * 把数组转换为字符串并用指定的字符串分隔开
 */
var arr1 = [1, 2, 3];
var str = arr1.join('-');
console.log(str); // 1-2-3

/**
 * split
 * 把字符串按照指定的分隔符转换为数组
 * 可以接受第二个参数,表示转换后数组的长度
 */

var str = '1-2-3';
var arr = str.split('-', 2);
console.log(arr); // ["1", "2"]

/**
 * 类数组
 */

function test() {
  console.log(arguments); // arguments就是一个类数组
}
test(1, 2, 3, 4, 5, 6);

// 自己新建一个类数组对象
var obj = {
  '0': 0,
  '1': 1,
  '2': 2,
  '3': 3,
  length: 4,
  push: Array.prototype.push,
  splice: Array.prototype.splice,
};
obj.push(4);
console.log(obj);
// {
//   0: 0
//   1: 1
//   2: 2
//   3: 3
//   4: 4
//   length: 5
//   push: ƒ push()
//   splice: ƒ splice()
//   __proto__: Object
// }

/**
 * 一道面试题
 */

var obj = {
  '2': 3,
  '3': 4,
  length: 2,
  splice: Array.prototype.splice,
  push: Aarray.prototype.push,
};

obj.push(1);
obj.push(2);
console.log(obj);

// obj.1 // 数字的话会报错 但是变量会自动转为字符串

// 2: 1
// 3: 2
// length: 4
// push: ƒ push()
// splice: ƒ splice()
// __proto__: Object

// Array.prototype.push 的原理
Array.prototype.push = function (elem) {
  this[this.length] = elem;
  this.length++;
};

/** 一个类数组的实例  */
var person = {
  '0': 'xiao1',
  '1': 'xiao2',
  '2': 'xiao3',
  name: '张三',
  age: 32,
  weight: 140,
  height: 180,
  length: 3, // 这里的length要为3
};

Object.prototype.push = Array.prototype.push;
Object.prototype.splice = Array.prototype.splice;
```

- 自定义原型方法,数组字符串去重复,封装 typeof 方法

```ts
/**
 * 自定义一个myUnshift的方法
 */

var arr = ['d', 'e', 'f'];

Array.prototype.myUnshift = function () {
  var pos = 0;
  for (var i = 0; i < arguments.length; i++) {
    this.splice(pos, 0, arguments[i]);
    pos++;
  }
  return this.lenght;
};

arr.myUnshift('1', '2', '3');

console.log(arr);

/**
 * 通过把类数组转换为数组的方法来实现自定义Unshift方法
 */

var arr = ['d', 'e', 'f'];

Array.prototype.myUnshift = function () {
  // 把类数组转换为数组的关键代码
  var argArr = Array.prototype.slice.call(arguments);
  var newArr = argArr.concat(this);
  return newArr;
};

var newArr = arr.myUnshift('a', 'b', 'c');
console.log(newArr);

/**
 * 获取字符串元素字节数的方法
 * // unicode 0-255 是1个字节
 * // 256以上 是2个字节
 */

function getBytes(str) {
  var bytes = str.length;

  for (var i = 0; i < str.length; i++) {
    if (str.charCodeAt(i) > 255) {
      bytes++;
    }
  }

  return bytes;
}

console.log(getBytes('i爱你')); // 5

/**
 * 封装一个判断数据类型的方法
 */

function myTypeof(val) {
  var type = typeof val;
  var toStr = Object.prototype.toString;
  var res = {
    '[object Array]': 'array',
    '[object Object]': 'object',
    '[object Number]': 'object number',
    '[object String]': 'object string',
    '[object Boolean]': 'object boolean',
  };

  if (val === null) {
    return 'null';
  } else if (type === 'object') {
    var ret = toStr.call(val);
    return res[ret];
  } else {
    return type;
  }
}

console.log(myTypeof([])); // array

/**
 * 数组去重
 */

var arr = [0, 0, 0, 1, 0, 2, 3, 4, 5, 6, 6, 6, 7, 1, 2];

Array.prototype.unique = function () {
  var temp = {};
  var newArr = [];

  for (var i = 0; i < this.lenght; i++) {
    if (!temp.hasOwnProperty(this[i])) {
      temp[this[i]] = this[i];
      newArr.push(this[i]);
    }
  }
  return newArr;
};

console.log(arr.unique());

/**
 * 日期判断的简化程序
 */

function getDay(day) {
  var weekday = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

  weekday[day - 1] !== undefined
    ? console.log(weekday[day - 1])
    : console.log('不知道');
}

getDay(3);
getDay(10);

/**
 * 关于稀松数组
 */
var arr = [, 1, 2, , , 3, 4]; // 稀松数组
console.log(arr[0]); //  undefined
console.log(arr); //
// 1: 1
// 2: 2
// 5: 3
// 6: 4
```

- 错误信息,try/catch,严格模式 strict

```ts
/**
 * JS错误信息类型
 * 1.SyntaxError 语法错误
 *   变量名不规范
 *   关键字赋值
 *   基本语法错误
 * 2.ReferenceError 引用错误
 *   变量或者函数未被声明
 *   给无法赋值的对象赋值
 * 3.RangeError 范围错误
 *   数组长度赋值为负数
 *   对象方法参数超出类可行范围
 * 4.TypeError类型错误
 *   调用不存在的方法
 *   123()
 *   var obj = {}
 *   obj.say(); // 属性不可以当做方法来执行所有会报错
 *   实例化原始值
 *   var a = new 'string';
 *   var a = new 123;
 * 5.URIError URI错误
 *
 * URI: UNIFORM RESOURCE IDENTIFIER
 *      统一资源标识符
 * URL: UNIFORM RESOURCE LOCATOR
 *      统一资源定位符
 * URN: UNIFORM RESOURCE NAME
 *      统一资源名称
 *
 * URL 和 URN 是 URI的子集
 *
 * URL: http://www.baidu.com/news#tody
 *      ftp://www.baidu.com/ftp#developer
 * URN: www.baidu.com/ftp#developer -> 相当于一个资源访问的ID
 *      href="tel:13900000000"
 *      href="mailto:5555555@qq.com"
 *
 * encodeURI(url) // 中文编码转换
 * decodeURI(url) // 转换为中文编码
 *
 * var str = decodeURI('%FDSDF%'); // 这样程序就会报错URL畸形
 *
 * 6.EvalError  eval函数执行错误,因为规范问题,性能问题,难以调试问题,现在基本不推荐使用了,这类报错也比较少见到了
 * eval('var a = 1; console.log(a)'); // 可以执行里面的代码
 * var str = eval('1');
 * console.log(str); // 打印出了1
 *
 * var obj = {a:1,b:2};
 * console.log(eval('obj')); // 打印出了对象
 * console.log(eval(obj)); // 也打印出了对象
 *
 * json 对象与普通对象的区别
 *
 * var obj = {"a":1, "b":2}; Json对象的属性需要使用双引号扩起来,同时里面不能包含有方法
 *
 * json数据也可以是一个数组里面包含json对象
 * var jsonData = [{"a":1, "b":2}]
 *
 * json字符串
 * var jsonData = `[{"a":1, "b":2}]`;
 *
 * var data = eval('('+ jsonData + ')');
 *
 * console.log(data);  // eval可以把json字符串转换为json对象
 *
 *
 * 7.new Error 预料之内的认为抛出来的错误
 * var error = new Error('代码错误了');
 * var error = new TypeError('代码错误了');
 * console.log(error);
 *
 */

/**
 * try catch finally throw
 * 手动抛出错误信息
 */

try {
  console.log('正常执行1');
  console.log(a);
  console.log('正常执行2');
} catch (e) {
  console.log(e.name + ':' + e.message);
} finally {
  console.log('正常执行3'); // 不管有没有报错都会执行到这里
}

console.log('正常执行4'); // 如果try里面的代码出错了,这里的代码会被正常执行到

/**
 * 手动抛出异常场景代码1
 */

var jsonStr = '';

try {
  // 可以通过throw 来抛出自定义错误信息
  if (jsonStr === '') {
    throw 'JSON字符串为空';
  }

  console.log('我要执行啦！！！！');
  var json = JSON.parse(jsonStr); // 如果传入的是空字符串则会报错
  console.log(json);
} catch (e) {
  console.log(e); // 如果报错则会打印出'JSON字符串为空'
  var errorTip = {
    name: '数据传输失败',
    errorCode: '10010',
  };

  console.log(errorTip);
}

/**
 * ES5严格模式
 */

('use strict'); // 可以写在外部

// with() 改变作用是不能用的
// callee / caller 不能用
// 全局下必须要用var声明变量
// 函数的参数不允许重复
// 对象不允许使用重复的属性 不会报错会正常打印
// 严格模式下eval的作用域不再是全局的

function test() {
  'use strict'; // 也可以写在函数里面 大公司都不允许写在外部

  console.log(this); // 严格模式下这里的this是undefined 非严格模式指向window
}

test.call(1); // 1 会转换为对应的包装对象赋值给this
```

- 垃圾回收,变量声明周期,标记清除,引用计数

```ts
/**
 * 1.垃圾回收的过程
 * 找出不再使用的变量
 * 释放其占用的内存
 * 固定的时间间隔运行
 */

function test() {
  var a = 1;

  return function () {
    a++;
    console.log(a);
  };
}

var test2 = test1();
test2();
test2();

test = null; // 释放闭包占用的内存 解除引用

/**
 * 清除标记的原理
 * 1.方法中变量被声明会被打上进入环境的标记
 * 2.方法执行完后会被打上离开环境的标记
 *
 * 3.排除掉全局变量和闭包的作用域链,把所有有离开标记的变量内存释放出来
 */

/**
 * 引用计数
 * 对象被引用1次，它的被引用的次数就会+1
 * ie6下可能会造成内存泄漏.例如对象的循环引用
 */

function test() {
  var a = {};
  var b = {};

  // 这里的循环引用会造成内存泄露
  a.prop = b;
  b.prop = a;

  // 需要清除引用去释放内存
  a = null;
  b = null;
}
```

- 重新探究 this 指向的问题

```ts
/**
 * 没有实例化之前的this指向构造函数本身
 */

function test(a) {
  this.a = a;
}

test.say = function () {
  console.log('这是tset的静态方法');
};

test.prototype.say = function () {
  console.log(this);
  console.log(this.a);
};

// 没有实例化之前的this指向构造函数本身
// 此时它下面没有a 打印出来为undefined
test.prototype.say(123);

// 实例化之后this指向了t
var t = new test(33333);
t.say();

/**
 * 事件绑定的this指向问题
 * bind可以实现this绑定
 *
 * bind 和 call/apply的区别
 * call/apply 改变this指向 并且立即执行
 *   call(context,原函数的参数门依次排列)
 *   apply(context,原函数的参数集合 用数组装载)
 *
 * bind 改变this指向 并返回一个新函数
 * 写法通call
 */

var oBtn = document.getElementById('btn');

oBtn.onclick = function () {
  console.log(this); // 谁被绑定事件处理函数 函数内部的this就指向谁
  this.innerHtml = '加载中...';
  this.disabled = true;
};

setTimeout(
  function () {
    // 定时器里的this默认指向window
    this.innerHtml = '点击';
    this.disabled = false;
  }.bind(this), // 通过bind绑定来改变this指向
  2000
);

/**
 * 一个事件绑定的例子
 */

function Test() {
  this.oBtn = document.getElementById('btn');
  this.a = 0;

  this.init();
}

Test.prototype.init = function () {
  this.bindEvent();
};

Test.prototye.bindEvent = function () {
  this.oBtn.addEventListener('click', this.binClick.bind(this), false);
};

Test.prototye.bthClick = function () {
  this.a++;
  console.log(this.a);
};

new Test();
```

- Object defineProperty

```ts
/**
 * conf -> 文件夹
 * config -> 文件
 */

/**
 * defineProperties的简单案例
 */

function defineProperty() {
  var _obj = {};

  // 定义一个属性的时候
  // Obect.defineProperty(_obj, 'a' , {
  //   value: 1
  // });

  // 可以一次定义多个属性
  Object.defineProperties(_obj, {
    a: {
      value: 1,
      writable: true, // 默认为false,不可修改
      enumerable: true, // 默认为fasle,不可枚举
      configurable: true, // 默认为false 不可删除
    },
    b: {
      value: 2,
    },
  });

  return _obj;
}

var obj = defineProperty();
obj.a = 5;
obj.b = 6;

console.log(obj);

/**
 * 每一个属性定义的时候的 getter settter 机制
 * 通过使用get , set进行数据劫持
 */

function defineProperty() {
  var _obj = {};

  Object.defineProperties(_obj, {
    a: {
      // 如果有get或set 这里就不能在设置value writable等属性了 否则会报错 互斥
      get() {
        console.log('获取a');
        return a;
      },
      set(newVal) {
        console.log('设置a');
        a = newVal;
      },
    },
    b: {},
  });

  return _obj;
}

var obj = defineProperty();
obj.a = 1;
console.log(a);

/**
 * 通过defineProperty实现数组的操作
 */

function DataArr() {
  var _val = null;
  var _arr = [];

  Object.defineProperty(this, 'val', {
    get: function () {
      return _val;
    },
    set: function (newVal) {
      _val = newVal;
      _arr.push({ val: _val });
    },
  });

  this.getArr = function () {
    return _arr;
  };
}

var dataArr = new DataArr();

dataArr.val = 123;

dataArr.val = 234;

console.log(dataArr.getArr());

/**
 * 通过 defindProperty来实现数据的双向绑定
 */

class Compute {
  plus(a, b) {
    return a + b;
  }
  minus(a, b) {
    return a - b;
  }
  mul(a, b) {
    return a * b;
  }
  div(a, b) {
    return a / b;
  }
}

class Calculator extends Compute {
  constructor(doc) {
    super();
    const oCal = doc.getElementByClassName()[0];

    this.fInput = oCal.getElementByTagName('input')[0];
    this.sInput = oCal.getElementByTagName('input')[1];

    this.oBtnGroup = oCal.getElementsByClassName('btn-group');

    this.oBtnItems = this.oBtnGroup.getElementByTagName('button');

    this.oResult = oGal.getElementsByClassName('result')[0];

    this.data = this.defineData();

    this.btnIdx = 0;
  }

  init() {
    this.bindEvent();
  }

  bindEvent() {
    this.oBtnGroup.addEventListener(
      'click',
      this.onFieldBtnClick.bind(this),
      false
    );
    this.fInput.addEventListener('input', this.onNumberInput.bind(this), false);
    this.sInput.addEventListener('input', this.onNumberInput.bind(this), false);
  }

  defineData() {
    let _obj = {};
    fNumber = 0;
    sNumber = 0;
    field = 'plus';

    let _self = this;

    Object.defindProperties(_obj, {
      fNumber: {
        get() {
          return fNumber;
        },
        set(newVal) {
          fNumber = newVal;
          _self.computeResult(fNumber, sNumber, field);
        },
      },
      sNumber: {
        get() {
          return sNumber;
        },
        set(newVal) {
          sNumber = newVal;
          _self.computeResult(fNumber, sNumber, field);
        },
      },
      field: {
        get() {
          return field;
        },
        set(newVal) {
          field = newVal;
          _self.computeResult(fNumber, sNumber, field);
        },
      },
    });

    return _obj;
  }

  onFieldBtnClick(ev) {
    const e = ev || window.event,
      tar = e.tarege || e.srcElement,
      tagName = tagName.toLowerCase();
    tagName === 'button' && this.fieldUpdate(tag);
  }

  fieldUpdate(target) {
    this.oBtnItems[this.btnIdx].className = '';
    this.btnIdx = [].indexOf.call(this.oBtnItems, target);
    target.className += ' current';
    this.data.field = target.getAttribute('data-field');
  }

  onNumberInput(ev) {
    const e = ev || window.event,
      tar = e.target || e.srcElement,
      className = tar.className,
      val = Number(tar.value.replace(/\s+/g, '')) || 0;

    switch (className) {
      case 'f-input':
        this.data.fNumber = val;
        break;
      case 's-input':
        this.data.sNumber = val;
        break;
      default:
        break;
    }
  }

  computeResult(fNumber, sNumber, field) {
    this.oResult.innerText = this[field](fNumber, sNumber);
  }
}

new Calculator(document).init();
```

- proxy 与 ES 的 14 中操作对象的方法

```ts
/**
 * 1.defineProperty
 * 劫持数据 -> 给对象进行扩展 -> 对属性进行设置
 */

/**
 * proxy的简单使用
 *
 * let obj = new Proxy(target, handler);
 * target 目标对象 你要进行处理的对象
 * handle 容器 无数可以处理对象属性的方法
 * 例如 自定义对象属性的获取,赋值,枚举,函数调用等功能
 */

var target = {
  a: 1,
  b: 2,
};

let proxy = new Proxy(target, {
  get(target, prop) {
    return '这个属性的值是' + target[prop];
  },
  set(target, prop, value) {
    target[prop] = value;
    console.log(target[prop]);
  },
});

console.log(proxy.a);
proxy.b = 3;

// target 中的属性也会随着代理对象中的属性的改变而改变
console.log('target', target);

/**
 * 可以通过Proxy来处理数组
 */

let arr = [
  { name: '小明', age: 18 },
  { name: '小红', age: 19 },
  { name: '小青', age: 30 },
];

let persons = new Proxy(arr, {
  get(arr, prop) {
    return arr[prop];
  },

  set(arr, prop, value) {
    arr[prop] = value;
  },
});

console.log(persons[0]);
persons[1] = { name: '小张', age: 33 };
console.log(persons, arr);

/**
 * 通过Proxy来处理函数
 */

let fn = function () {
  console.log('这是一个函数');
};

fn.a = 123;

let newFn = new Proxy(fn, {
  get(fn, prop) {
    return fn[prop] + '这是Proxy返回的';
  },
});

console.log(newFn.a);

/**
 * 操作对象的十四种方法
 */

var obj = { a: 1, b: 2 };

// 1.获取原型 [[GetPrototypeOf]]
var proto = Object.getPrototypeOf(obj);
console.log('proto', proto);
console.log(obj.__proto__);
console.log(obj.prototype);

// 2.设置原型 [[SetPrototypeOf]]
Object.setPrototypeOf(obj, { c: 3, d: 4 });
console.log(obj);

// 3.获取对象的可扩展性 [[IsExtensible]]
var extensible = Object.isExtensible(obj);
console.log(extensible); // true;

Object.freeze(obj); // 冻结属性
var extensible2 = Object.isExtensible(obj);
console.log(extensible2); // false

// 封闭对象
Object.seal(obj); // 封闭对象
obj.c = 3; // 不可修改 添加新属性
console.log(obj);

delete obj.a; // 不可删除
console.log(obj);

obj.b = 3; // 可写

for (var key in obj) {
  console.log(obj[key]); // 可读
}

// 冻结对象
Object.freeze(obj); // 冻结对象
obj.c = 3; // 不可修改 添加新属性
console.log(obj);

delete obj.a; // 不可删除
console.log(obj);

obj.b = 3; // 不可写

for (var key in obj) {
  console.log(obj[key]); // 可读
}

// 4.获取自由属性 [[GetOwnProperty]]
Object.setPrototypeOf(obj, { c: 3, d: 4 });
console.log(Object.getOwnPropertyNames(obj));

// 5.禁止扩展对象 [[PreventExtensions]]
Object.preventExtensions(obj);
obj.c = 3; // 禁止增加属性
console.log(obj);

delete obj.a; // 可删除属性
console.log(obj);

// 6.拦截对象操作 [[DefineOwnProperty]]
Object.defineProperty();

// 7.判断是否是自身属性 [[HasProperty]]
console.log(obj.hasOwnProperty('a'));

// 8.[[GET]]
console.log('a' in obj);
console.log(obj.a);

// 9.[[SET]]
obj.a = 3;
obj['b'] = 4;
console.log(obj);

// 10.[[Delete]]
delete obj.a;
console.log(obj);

// 11.[[Enumerate]]
for (var k in obj) {
  console.log(obj[k]);
}

// 12. 获取键集合 [[OwnPropertyKeys]]
console.log(Object.keys(obj));

// 13.对方法的调用
obj.test = function () {};
obj.test();

// 14.实例化一个构造函数
function Test() {}
var a = new Test();

/**
 * 手动实现一个Proxy
 */

function MyProxy(target, handler) {
  let _target = deepClone(target);

  Object.keys(_target).forEach((key) => {
    Object.defineProperty(_target, key, {
      get() {
        return handler.get && handler.get(target, key);
      },
      set(newVal) {
        handler.set && handler.set(target, key, newVal);
      },
    });
  });

  return _target;

  function deepClone(org, tar) {
    var tar = tar || {};
    var toStr = Object.prototype.toString;
    arrType = '[object Array]';

    for (var key in org) {
      if (org.hasOwnProperty(key)) {
        if (typeof org[key] === 'object' && org[key] !== null) {
          tar[key] = toStr.call(org[key]) === arrType ? [] : {};

          deepClone(org[key], tar[key]);
        } else {
          tar[key] = org[key];
        }
      }
    }
    return tar;
  }
}

var target = {
  a: 1,
  b: 2,
};

var proxy = new MyProxy(target, {
  get(target, prop) {
    return 'Get:' + prop + ' = ' + target[prop];
  },
  set(target, prop, newVal) {
    target[prop] = newVal;
    console.log('Set:' + prop + ' = ' + target[prop]);
  },
});

console.log(proxy.a);
proxy.b = 3;

/**
 * Proxy的其他属性方法
 */

const target = {
  a: 1,
  b: 2,
};

let proxy = new Proxy(target, {
  get(target, prop) {
    return 'GET:' + prop + ' = ' + target[prop];
  },
  set(target, prop, value) {
    target[prop] = value;
    console.log('SET:' + prop + ' = ' + value);
  },
  has(target, prop) {
    console.log('HAS:' + target[prop]);
  },
  deleteProperty(target, prop) {
    delete target[prop];
    console.log(1);
  },
});

console.log('a' in proxy); // false 会执行到has里面
console.log(proxy); // proxy这个代理对象里面没有a的属性

delete proxy.b;
console.log(proxy); // b属性被删除了

/**
 * 关于Reflect
 * 反射弧 是一个内置对象 方法集合的容器
 * 操作对象的方法都可以在Reflect上找到
 *
 * 例如Reflect.has(obj,'a') 可以用来代替 in 操作符
 */

let target = {
  a: 1,
  b: 2,
};

let proxy = new Proxy(target, {
  get(target, prop) {
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    Reflect.set(target, prop, value);
  },
});

console.log(proxy.a);
proxy.b = 4;
console.log(proxy.b);
```

- 单词

```pug

token 标记
unexpected 想不到的
syntax 语法
invalid 无效
anonymous 匿名
digits 数字
malformed 畸形的
statement 说法 表达
bind 绑定
seal 密封
reflect 反射
```
