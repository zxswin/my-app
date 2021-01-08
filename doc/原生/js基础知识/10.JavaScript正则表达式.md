# JavaScript 正则表达式

- 正则表达式修饰符

```bash
i	执行对大小写不敏感的匹配。
g	执行全局匹配（查找所有匹配而非在找到第一个匹配后停止）。
m	执行多行匹配。
```

- 正则表达式模式

```bash
## 方括号 方括号中的字符没有什么特殊含义转不转义都一样
[abc]	查找方括号之间的任何字符。
[^abc]	查找任何不在方括号之间的字符。
[0-9]	查找任何从 0 至 9 的数字。
[a-z]	查找任何从小写 a 到小写 z 的字符。
[A-Z]	查找任何从大写 A 到大写 Z 的字符。
[A-z]	查找任何从大写 A 到小写 z 的字符。
[adgk]	查找给定集合内的任何字符。
[^adgk]	查找给定集合外的任何字符。
(red|blue|green)	查找任何指定的选项。

## 元字符
.	查找单个字符，除了换行和行结束符。
\w	查找单词字符。
\W	查找非单词字符。
\d	查找数字。
\D	查找非数字字符。
\s	查找空白字符。
\S	查找非空白字符。
\b	匹配单词边界。
\B	匹配非单词边界。
\0	查找 NULL 字符。
\n	查找换行符。
\f	查找换页符。
\r	查找回车符。
\t	查找制表符。
\v	查找垂直制表符。
\xxx	查找以八进制数 xxx 规定的字符。
\xdd	查找以十六进制数 dd 规定的字符。
\uxxxx	查找以十六进制数 xxxx 规定的 Unicode 字符。


## 量词

n+	匹配任何包含至少一个 n 的字符串。
n*	匹配任何包含零个或多个 n 的字符串。
n?	匹配任何包含零个或一个 n 的字符串。
n{X}	匹配包含 X 个 n 的序列的字符串。
n{X,}	X 是一个正整数。前面的模式 n 连续出现至少 X 次时匹配。
n{X,Y}	X 和 Y 为正整数。前面的模式 n 连续出现至少 X 次，至多 Y 次时匹配。
n$	匹配任何结尾为 n 的字符串。
^n	匹配任何开头为 n 的字符串。
?=n	匹配任何其后紧接指定字符串 n 的字符串。
?!n	匹配任何其后没有紧接指定字符串 n 的字符串。

```

- RegExp 对象方法

```ts
// exec	检索字符串中指定的值。返回找到的值，并确定其位置。
// exec() 方法用于检索字符串中的正则表达式的匹配。
// 如果字符串中有匹配的值返回该匹配值，否则返回 null。
var str = "Hello world!";
//查找"Hello"
var patt = /Hello/g;
var result = patt.exec(str);
document.write(result); // Hello

const str = `aaabbbccc`;
const patten = /\w/g;
const matchArr = patten.exec(str);
console.log(matchArr);
console.log(patten.lastIndex); // 下一次匹配的搜索位置

// test	检索字符串中指定的值。返回 true 或 false。
// test() 方法用于检测一个字符串是否匹配某个模式.
// 如果字符串中有匹配的值返回 true ，否则返回 false。
var str = "Hello world!";
//查找"Hello"
var patt = /Hello/g;
var result = patt.test(str);
document.write(result); // true

// toString	返回正则表达式的字符串。
var patt = new RegExp("RUNOOB", "g");
var res = patt.toString(); // /RUNOOB/g
```

- 支持正则表达式的 String 对象的方法

```ts
// search	检索与正则表达式相匹配的值。
// search() 方法用于检索字符串中指定的子字符串，或检索与正则表达式相匹配的子字符串。
// 如果没有找到任何匹配的子串，则返回 -1。
var str = "Visit Runoob!";
var n = str.search("Runoob"); // 6

// match	找到一个或多个正则表达式的匹配。
// match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配。
// 如果没有找到任何匹配的文本， match() 将返回 null。否则，它将返回一个数组，其中存放了与它找到的匹配文本有关的信息
var str = "The rain in SPAIN stays mainly in the plain";
var n = str.match(/ain/g); // 全局匹配 (3) ["ain", "ain", "ain"]

var n = str.match(/ain/); // 非全局匹配 ["ain", index: 5, input: "The rain in SPAIN stays mainly in the plain", groups: undefined]

// replace	替换与正则表达式匹配的子串。
// replace() 方法用于在字符串中用一些字符替换另一些字符，或替换一个与正则表达式匹配的子串。
// 该方法不会改变原始字符串。
var str = "Mr Blue has a blue house and a blue car";
var n = str.replace(/blue/g, "red");

// $1、$2、...、$99	与 regexp 中的第 1 到第 99 个子表达式相匹配的文本。
// $&	与 regexp 相匹配的子串。
// $`	位于匹配子串左侧的文本。
// $'	位于匹配子串右侧的文本。
// $$	直接量符号。

let name = "Doe, John";
let str = name.replace(/(\w+)\s*, \s*(\w+)/, "$2 $1");

console.log(str);

// replace第二个参数可以是一个函数
// 函数的第一个参数是匹配模式的字符串。
// 接下来的参数是与模式中的子表达式匹配的字符串，可以有 0 个或多个这样的参数。
// 接下来的参数是一个整数，声明了匹配在 stringObject 中出现的位置。
// 最后一个参数是 stringObject 本身。
let name = "aaa bbb ccc";
let uw = name.replace(/\b\w+\b/g, function (word) {
  return word.substring(0, 1).toUpperCase() + word.substring(1);
});

// split	把字符串分割为字符串数组。
```

- new RegExp 使正则表达式支持变量

```ts
const str = "a";
const targetStr = "abc";
const reg = new RegExp(`${str}`, "g");
const resultStr = targetStr.replace(reg, (search) => {
  return "A";
});
console.log(resultStr);
```

- 匹配电话号码

```ts
const tel = "020-9999999";
console.log(/^(010|020)\-\d{7,8}$/.test(tel));
```

- 多行匹配

```js
const str = `
    #1 js,200元 #
    #2 css,200元 #
    #3 html,200元 #
    `;

const patten = /^\s+#\d+\s+.+\s+#$/gm;
const matchArr = str.match(patten);

matchArr.forEach((str, i) => {
  str = str.replace(/\s+#\d+\s+/g, "");
  str = str.replace(/\s+#/g, "");

  matchArr[i] = str;

  console.log("str", str.split(","));
});

console.log(matchArr);
```

- u 修饰符的使用

```ts
// 修饰符标识能够正确处理大于\uFFFF的Unicode字符,能够识别较多的字符
```

- 正则表达式\p 语法元素

```ts
// \p{L}	所有字母
// \p{N}	所有数字，类似于 \d
// [\p{N}\p{L}]	所有数字和所有字母，类似于 \w
// \P{L}	不是字母，等价于 [^\p{L}]
// \P{N}	不是数字，等价于 [^\p{N}]

// 匹配中文
const str = `aaa111中文| 中文 | 英文`;
const patten = /\p{sc=Han}/gu;
const matchArr = str.match(patten);
console.log(matchArr);
```

- y 模式

```ts
// 只有连续匹配到才会往下去匹配
```

- 原子表的基本使用

```ts
const str = `2020-06-22`;
const patten = /\d{4}([-\/])\d{2}\1\d{2}/g; // \1 表示使用前面分组的匹配结果
const matchArr = str.match(patten);
console.log(matchArr);
```

- 匹配所有内容

```ts
str.match(/[\s\S]+/);
```

- 邮箱的匹配

```ts
const reg = /^[\w-]+@([\w-]+\.)+(com|org|cc|cn|net)$/i;
```

- 正则表达式之替换

```ts
const str = `<div>aaabbbb</div>`;
const patten = /<(div)>([\s\S]+)<(\/\1)>/i;
// const resultStr = str.replace(patten, `<span>$2</span>`);
const resultStr = str.replace(patten, (p, p0, p1) => {
  return `<span>${p1}</span>`;
});

console.log(resultStr);
```

- 嵌套分组与不记录组

```ts
const str = `https://www.houdunren.com`;
const patten = /https:\/\/(\w+\.\w+\.(?:com|org|cn))/i; // 分组立的?:为不记录分组的意思
const resultStr = str.match(patten);
console.dir(resultStr);
```

- exec 的使用

```ts
const str = `
    https://www.houdunren.com
    http://houdunren.com
    http://houdun.com
    `;
const patten = /https?:\/\/((?:\w+\.)?\w+\.(?:com|org|cn))/gi;

const ursls = [];
const go = () => {
  return patten.exec(str);
};

const getreg = () => {
  const res = go();
  if (res) {
    ursls.push(res[1]);
    getreg();
  }
};

getreg();

console.log("ursls888", ursls);
```

- 密码校验必须要包含字母 数字 大写字母

```ts
const str = `12315aAAa`;
const patten1 = /^[a-z0-9]{5,10}$/i;
const patter2 = /[A-Z]/;
const patter3 = /[0-9]/;

const regs = [patten1, patter2, patter3];
const state = regs.every((e) => e.test(str));
console.log("state", state);
```

- 禁止贪婪

```ts
const patten = /hd+?/; // 后面加个问好它就会往少的去匹配了

// 实战案例
const str = `<span>123456</span><span>22222</span><span>33333</span>`;
const patten1 = /<span>([\s\S]+?)<\/span>/gi;

const result = str.match(patten1);

console.log("result", result); //  ["<span>123456</span>", "<span>22222</span>", "<span>33333</span>"]

// 禁止贪婪匹配案例二
const str = `<a id='a' href="http://www.abc.com">aaa</a><a id='b' href="http://bbb.com">bbb</a><a id='b' href="http://www.ccc.com">ccc</a>`;
const reg = /<a.*?>[\s\S]+?<\/a>/gi;

const resultstr = str.match(reg);

console.log(resultstr);

// repeat() 方法字符串复制指定次数。
```

- split 字符串的拆分

```ts
const str = `2020/09/12`;
console.log(str.split(/[-\/]/));
```

- $` $' \$&

```ts
// $& 匹配到的内容
// $` 匹配到的内容前面的内容
// $' 匹配到的内容后面的内容

const str = `=123456%`;
console.log(str.replace(/[\d]+/, "$`$`$&$`$`")); // ===123456==%
```

- 匹配 a 链接中的网址

```ts
const str = `<a id='a' href="http://www.abc.com">aaa</a><a id='b' href="http://bbb.com">bbb</a><a id='b' href="http://www.ccc.com">ccc</a>`;
const reg = /(<a.*href=['"])(http)(:\/\/)(www\.)?(abc|bbb)/gi;

const resultstr = str.replace(reg, (v, ...args) => {
  console.log("args", args);
  args[1] += "s";
  args[3] = args[3] || "www.";
  return args.splice(0, 5).join("");
});

console.log(resultstr);
```

- 给原子组取别名

```ts
const str = `<a>aaa</a><a>bbb</a><a>ccc</a>`;
const reg = /<(a)>(?<con>.*?)(<\/\1>)/gi;

const resultstr = str.replace(reg, "<h1>$<con><h1>");

console.log(resultstr);
```

- ?=断言匹配(后面是什么)

```ts
const str = `aaabbbaaa断言`;
const reg = /aaa(?=断言)/gi;

const resultstr = str.replace(reg, "<h1>$&<h1>");
console.log(resultstr); // aaabbb<h1>aaa<h1>断言
```

- ?<= 断言匹配 前面是什么

```ts
const str = `<a href="www.aaa.com">aaa</a><a href="www.bbb.com">bbb</a>`;
const reg = /(?<=href=(["'])).+?(?=\1)/gi;

console.log(str.match(reg));
const resultstr = str.replace(reg, "https://www.abc.com");
console.log(resultstr);
```

- ?!断言 后面不是什么

```ts
const str = `abcd123abc`;
const reg = /[a-z]+(?!\d+)$/i;

console.log(str.match(reg));

const resultstr = str.replace(reg, "fff"); // abcd123fff

console.log(resultstr);
```

- ?<! 断言匹配 前面不是什么

```ts
const str = `abcd123abc`;
const reg = /(?<!\d+)[a-z]+/i;

console.log(str.match(reg));

const resultstr = str.replace(reg, "fff"); // fff123abc

console.log(resultstr);
```

- 注意

```ts
// 当使用构造函数创造正则对象时，需要常规的字符转义规则（在前面加反斜杠 \）。比如，以下是等价的
var re = new RegExp("\\w+");
var re = /\w+/;
```
