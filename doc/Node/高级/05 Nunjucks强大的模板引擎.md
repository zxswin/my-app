## 05 Nunjucks 强大的模板引擎

- 快速上手

```ts
/**
 * 1.安装
 * npm install nunjucks -S
 */
```

- Nunjucks 的使用 比较复杂 不推荐 但是官方是推荐的

```ts
const Koa = require('koa');
const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');
let Router = require('koa-router');
const koaBody = require('koa-body');
const app = new Koa();
const router = new Router();

const nunjucks = require('nunjucks'); // 引入nunjucks

function createEnv(path, opts) {
  // 封装用于根据模板生成静态页面的方法
  var autoescape = opts.autoescape === undefined ? true : opts.autoescape,
    noCache = opts.noCache || false,
    watch = opts.watch || false,
    throwOnUndefined = opts.throwOnUndefined || false,
    env = new nunjucks.Environment(
      new nunjucks.FileSystemLoader('views', {
        noCache: noCache,
        watch: watch,
      }),
      {
        autoescape: autoescape,
        throwOnUndefined: throwOnUndefined,
      }
    );
  if (opts.filters) {
    for (var f in opts.filters) {
      env.addFilter(f, opts.filters[f]);
    }
  }
  return env;
}

var env = createEnv('views', {
  // 引用views文件夹下面的模板去生成静态页面
  watch: true,
  filters: {
    hex: function (n) {
      return '0x' + n.toString(16);
    },
  },
});

console.log(
  env.render('e1.html', {
    header: '此页面为通过服务器端渲染生成8888',
    body: '此页面为通过服务器端渲染生成bla bla bla...',
  })
);

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// get请求
router.get('/', async (ctx, next) => {
  // 渲染出静态页面字符串
  let html = env.render('e1.html', {
    header: '此页面为通过服务器端渲染生成',
    body: '此页面为通过服务器端渲染生成bla bla bla...',
  });
  console.log('Content-type', mime.getType('.html'));
  ctx.response.type = mime.getType('.html'); // 指定响应文件类型
  ctx.response.body = html; // 响应输出html结构
});

// 添加路由中间件
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
console.log('app started at port 3000...');
```

- Nunjucks 的使用 简单用法 推荐

```ts
const Koa = require('koa');
const path = require('path');
const mime = require('mime');
const fs = require('mz/fs');
let Router = require('koa-router');
const koaBody = require('koa-body');
const app = new Koa();
const router = new Router();

const nunjucks = require('nunjucks'); // 引入nunjucks

app.use(async (ctx, next) => {
  console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
  await next();
});

// get请求
router.get('/', async (ctx, next) => {
  // 渲染出静态页面字符串
  nunjucks.configure('views', { autoescape: true }); // 配置nunjucks选项
  let html = nunjucks.render('e1.html', {
    header: '此页面为通过服务器端渲染生成88888',
    body: '此页面为通过服务器端渲染生成bla bla bla...',
  });
  console.log('Content-type', mime.getType('.html'));
  ctx.response.type = mime.getType('.html'); // 指定响应文件类型
  ctx.response.body = html; // 响应输出html结构
});

// 添加路由中间件
app.use(router.routes()).use(router.allowedMethods());
app.listen(3000);
console.log('app started at port 3000...');
```

## views 文件夹下面的模板文件

- base.html 基本 html 文件结构 可以用于其他模板继承的基本模板

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>页面生成模板</title>
  </head>
  <body>
    {% block header %}
    <h3>Unnamed</h3>
    {% endblock %} {% block body %}
    <div>No body</div>
    {% endblock %} {% block footer %}
    <div>copyright</div>
    {% endblock %}
  </body>
</html>
```

- extends.html 继承了基本模板 base.html 的模板文件

```ts
{% extends 'b1.html' %}
{% block header %}<h1>{{ header }}</h1>{% endblock %}
{% block body %}<p>{{ body }}</p>{% endblock %}
```

## nunjucks 文档之快速起步

- 最简单的使用案例

```ts
nunjucks.configure({ autoescape: true });
let renderStr = nunjucks.renderString('Hello {{ username }}', {
  username: 'James',
});
console.log('renderStr', renderStr); // Hello James
```

- 使用 render 来直接渲染文件

```ts
// views 为相对于当前工作目录下的路径 用于存放模板文件的位置
nunjucks.configure('views', { autoescape: true });
let renderStr = nunjucks.render('demo.html', { foo: 'bar' });
console.log('renderStr', renderStr); // <h1>bar</h1>
```

- 模板功能

```bash
# 1.Nunjucks模版或文件推荐使用.njk为后缀名
# 2.变量的使用
#  值为 undefined 或 null 将不显示
# {{ username }}
# {{ foo.bar }}
# {{ foo["bar"] }}

# 3.过滤器的使用
# 可以使用内置的过滤器 或 自定义过滤器
# {{ foo | title }}
# {{ foo | join(",") }}
# {{ foo | replace("foo", "bar") | capitalize }} // 链式过滤器 Bar

# 4.模板继承
# {% extends parentTemplate %} // 模板继承是可以指定变量的
```

- parent.html

```html
{% block header %} This is the default content {% endblock %}

<section class="left">{% block left %}{% endblock %}</section>

<section class="right">
  {% block right %} This is more content {% endblock %}
</section>
```

- 模板继承 parent.html

```html
{% extends "parent.html" %} {% block left %} This is the left side! {%
endblock%} {% block right %} This is the right side! {% endblock %}
```

- 渲染结果如下

```html
This is the default content

<section class="left">This is the left side!</section>

<section class="right">This is the right side!</section>
```

- 可以通过调用 super 从而将父级区块中的内容渲染到子区块中

```html
{% block right %} {{ super() }} Right side! {% endblock %}
```

- 渲染结果为

```html
This is more content Right side!
```

## 标签 可以使用内置的标签，你也可以自定义

- if 为分支语句，与 javascript 中的 if 类似。

```html
{% if variable %} It is true {% endif %}
```

- if else

```html
{% if hungry %} I am hungry {% elif tired %} I am tired {% else %} I am good! {%
endif %}
```

- for 可以遍历数组 (arrays) 和对象 (dictionaries)。

```html
<!-- 遍历普通数组 -->
var items = [{ title: "foo", id: 1 }, { title: "bar", id: 2}];

<h1>Posts</h1>
<ul>
  {% for item in items %}
  <li>{{ item.title }}</li>
  {% else %}
  <li>如果items数组是空数组的话则会渲染else语句中的内容。</li>
  {% endfor %}
</ul>

<!-- 遍历对象 -->
var food = { 'ketchup': '5 tbsp', 'mustard': '1 tbsp', 'pickle': '0 tbsp' }; {%
for ingredient, amount in food %} Use {{ amount }} of {{ ingredient }} {% endfor
%}

<!-- 特殊数组处理 解开数组 -->
var points = [[0, 1, 2], [5, 6, 7], [12, 13, 14]]; {% for x, y, z in points %}
Point: {{ x }}, {{ y }}, {{ z }} {% endfor %}

<!-- 在循环中可获取一些特殊的变量 -->
loop.index: 当前循环数 (1 indexed) loop.index0: 当前循环数 (0 indexed)
loop.revindex: 当前循环数，从后往前 (1 indexed) loop.revindex0:
当前循环数，从后往前 (0 based) loop.first: 是否第一个 loop.last: 是否最后一个
loop.length: 总数
```

- asyncEach(不推荐使用)

```html
<!-- 这个是适用于异步模板 只有当使用自定义异步模板加载器的时候才使用 -->
var env = new nunjucks.Environment(AsyncLoaderFromDatabase, opts);

<h1>Posts</h1>
<ul>
  {% asyncEach item in items %} {% include "item-template.html" %} {% endeach %}
</ul>
```

- asyncAll 这个是适用于异步模板(不推荐使用)

```html
<!-- asyncAll 和 asyncEach 类似，但 asyncAll 会并行的执行，并且每项的顺序仍然会保留。 -->
<h1>Posts</h1>
<ul>
  {% asyncAll item in items %}
  <li>{{ item.id | lookup }}</li>
  {% endall %}
</ul>
```

- 宏 (macro) 可以定义可复用的内容，类似与编程语言中的函数

```html
<!-- 不能 在宏中做任何异步的操作
还可以从其他模板 import 宏，可以使宏在整个项目中复用。 -->

<!-- 定义宏 -->
{% macro field(name, value='', type='text') %}

<div class="field">
  <input type="{{ type }}" name="{{ name }}" value="{{ value | escape }}" />
</div>
{% endmacro %}

<!-- 使用 -->
{{ field('user') }} {{ field('pass', type='password') }}
```

- set 可以设置和修改变量。

```html
<!-- 如果 username 初始化的时候为 "james', 最终将显示 "james joe"。 -->
{{ username }} {% set username = "joe" %} {{ username }}

<!-- 可以设置新的变量，并一起赋值。 -->
{% set x, y, z = 5 %}
```

- extends 用来指定模板继承

```html
{% extends "base.html" %}

<!-- extends 也可以接受任意表达式，只要它最终返回一个字符串或是模板所编译成的对象： -->
{% extends name + ".html" %}`.
```

- block

```html
<!-- 区块(block) 定义了模板片段并标识一个名字，在模板继承中使用。 -->
{% block css %}
<link rel="stylesheet" href="app.css" />
{% endblock %}

<!-- 可以在循环中定义区块 -->
{% for item in items %} {% block item %}{{ item }}{% endblock %} {% endfor %}

<!-- 子模板可以覆盖 item 区块并改变里面的内容 -->
{% extends "item.html" %} {% block item %} The name of the item is: {{ item.name
}} {% endblock %}
```

- include

```html
<!-- include 可引入其他的模板，可以在多模板之间共享一些小模板 -->
{% include "item.html" %}

<!-- 可在循环中引入模板 -->
{% for item in items %} {% include "item.html" %} {% endfor %}

<!-- include 可以接受任意表达式，只要它最终返回一个字符串或是模板所编译成的对象: -->
{% include name + ".html" as obj %}.

<!-- 使用 ignore missing 来略过这些异常： -->
{% include "missing.html" ignore missing %}
```

- import

```html
<!-- 被 import 进来的模板没有当前模板的上下文，所以无法使用当前模板的变量， -->

<!-- forms.html 定义了两个宏 -->
{% macro field(name, value='', type='text') %}

<div class="field">
  <input type="{{ type }}" name="{{ name }}" value="{{ value | escape }}" />
</div>
{% endmacro %} {% macro label(text) %}

<div>
  <label>{{ text }}</label>
</div>
{% endmacro %}

<!-- 将模板的输出绑定到变量 forms 上，然后就可以使用这个变量 -->
{% import "forms.html" as forms %} {{ forms.label('Username') }} {{
forms.field('user') }} {{ forms.label('Password') }} {{ forms.field('pass',
type='password') }}

<!-- 使用 from import 从模板中 import 指定的值到当前的命名空间 -->
{% from "forms.html" import input, label as description %} {{
description('Username') }} {{ input('user') }} {{ description('Password') }} {{
input('pass', type='password') }}
```

- raw

```html
<!-- 如果你想输出一些 Nunjucks 特殊的标签 (如 {{)，可以使用 {{)，可以使用 {% raw %} 将所有的内容输出为纯文本。 -->
```

- filter

```html
<!-- filter 区块允许我们使用区块中的内容来调用过滤器 -->
{% filter title %} may the force be with you {% endfilter %}

<!-- 内容被替换为 You may the forth be with you -->
{% filter replace("force", "forth") %} may the force be with you {% endfilter %}
```

- call

```html
<!-- call 区块允许你使用标签之间的内容来调用一个宏。这在你需要给宏传入大量内容时是十分有用的。 -->

<!-- 下面的例子将会输出"The result is: 3" -->
{% macro add(x, y) %} {{ caller() }}: {{ x + y }} {% endmacro%} {% call add(1,
2) -%} The result is {%- endcall %}
```

- 关键字参数

```html
<!-- 关键字参数如下：
{{ foo(1, 2, bar=3, baz=4) }}
bar 和 baz 为关键字参数，Nunjucks 将他们转换成一个对象作为最后一个参数传入，等价于 javascript 的如下调用：
foo(1, 2, { bar: 3, baz: 4}) -->

<!-- 定义宏的时候也可以使用关键字参数
{% macro foo(x, y, z=5, w=6) %}
{{ x }}, {{ y }}, {{ z }}, {{ w}}
{% endmacro %}

{{ foo(1, 2) }} -> 1, 2, 5, 6
{{ foo(1, 2, w=10) }} -> 1, 2, 5, 10 -->
```

- 注释

```html
<!-- 你可以使用 {# and #} 来写注释，渲染时将会去除所有的注释。
{# Loop through all the users #}
{% for user in users %}...{% endfor %} -->
```

- 空白字符控制

```html
<!-- 你可以在开始和结束区块 (start or end block tag) 添加 (-) 来去除前面和后面的空白字符。
{% for i in [1,2,3,4,5] -%}
{{ i }}
{%- endfor %} -->

<!-- -%} 会去除标签右侧的空白字符，{%- 会去除标签之前的空白字符。 -->
```

- 表达式

```html
<!-- 你可以使用和 javascript 一样的字面量。
Strings: "How are you?", 'How are you?'
Numbers: 40, 30.123
Arrays: [1, 2, "array"]
Dicts: { one: 1, two: 2 }
Boolean: true, false -->
```

- 运算 (Math)

```html
<!-- Nunjucks 支持运算 (但尽量少用，把逻辑放在代码中)，可使用以下操作符：

Addition: +
Subtraction: -
Division: /
Division and integer truncation: //
Division remainder: %
Multiplication: \*
Power: \*\*
可以如下使用：

{{ 2 + 3 }} (outputs 5)
{{ 10/5 }} (outputs 2)
{{ numItems*2 }} -->
```

- 比较 (Comparisons)

```html
<!-- !=
!==

> =
> <
> <=
> Examples:

{% if numUsers < 5 %}...{% endif %}
{% if i == 0 %}...{% endif %} -->
```

- Logic

```html
<!-- and
or
not
可使用大括号来分组
Examples:

{% if users and showUsers %}...{% endif %}
{% if i == 0 and not hideFirst %}...{% endif %}
{% if (x < 5 or y < 5) and foo %}...{% endif %} -->
```

- If 表达式

```html
<!-- 和 javascript 的三元运算符 (ternary operator) 一样，可使用 if 的内联表达式：

{{ "true" if foo else "false" }}
当 foo 为 true 的时候最终输出 "true" 否则为 "false"，对于获取默认值的时候非常有用：

{{ baz(foo if foo else "default") }} -->
```

- 函数调用 (Function Calls)

```html
<!-- 如果你传入一个函数，则可以直接调用

{{ foo(1, 2, 3) }} -->
```

- 正则表达式

```html
<!-- 你可以像在 JavaScript 中一样创建一个正则表达式:

{{ /^foo.*/ }}
{{ /bar$/g }}
正则表达式所支持的标志如下。查阅 Regex on MDN 以获取更多信息。

g: 应用到全局
i: 不区分大小写
m: 多行模式
y: 粘性支持（sticky） -->
```

- 自动转义 (Autoescaping)

```html
<!-- 如果在环境变量中设置了 autoescaping，所有的输出都会自动转义，但可以使用 safe 过滤器，Nunjucks 就不会转义了。

{{ foo }} // &lt;span%gt;
{{ foo | safe }} // <span>
如果未开启 autoescaping，所有的输出都会如实输出，但可以使用 escape 过滤器来转义。

{{ foo }} // <span>
{{ foo | escape }} // &lt;span&gt; -->
```

## 全局函数 (Global Functions)

- range([start], stop, [step])

```html
<!-- 如果你需要遍历固定范围的数字可以使用 range，start (默认为 0) 为起始数字，stop 为结束数字，step 为间隔 (默认为 1)。

{% for i in range(0, 5) -%}
{{ i }},
{%- endfor %}
上面输出 0,1,2,3,4. -->
```

- cycler(item1, item2, ...itemN)

```html
<!-- cycler 可以循环调用你指定的一系列的值。

{% set cls = cycler("odd", "even") %}
{% for row in rows %}

  <div class="{{ cls.next() }}">{{ row.name }}</div>
{% endfor %}
上面的例子中奇数行的 class 为 "odd"，偶数行的 class 为 "even"。你可以使用current属性来获取当前项（在上面的例子中对应cls.current）。 -->
```

- joiner([separator])

```html
<!-- 当合并多项的时候，希望在他们之间又分隔符 (像逗号)，但又不希望第一项也输出。joiner 将输出分割符 (默认为 ",") 除了第一次调用。

{% set comma = joiner() %}
{% for tag in tags -%}
{{ comma() }} {{ tag }}
{%- endfor %}
如果 tags 为 ["food", "beer", "dessert"], 上面将输出 food, beer, dessert。 -->
```

## 内置的过滤器

```html
<!-- Nunjucks 已经实现了 jinja 中的大部分过滤器，同时也新增了一些属于自己的过滤器。 我们需要为这些过滤器编写文档。下面是一部分过滤器的文档，其他的你可以点击链接查看 jinja 上的文档。 -->
```

- default(value, default, [boolean])

```html
<!-- (简写为 d)

如果 value 全等于 undefined 则返回 default，否则返回 value。 如果 boolean 为 true，则会在 value 为 JavaScript 中的假值时（比如：false, ""等）返回 default。

在 2.0 版本中，这个过滤器的默认表现与以前有所不同。在之前的版本中，它会把 boolean 的默认值 设置为 true，所以传入任何假值都会返回 default。在 2.0 中，默认只有值为 undefined 时会 返回 default。如果你仍旧希望保持原来版本的表现的话，你可以给 boolean 传入 true，或是 直接使用 value or default。 -->
```

- sort(arr, reverse, caseSens, attr)

```html
<!-- 用 JavaScript 中的 arr.sort 函数排序 arr。如果 reverse 为 true，则会返回相反的 排序结果。默认状态下排序不会区分大小写，但你可以将 caseSens 设置为 true 来让排序 区分大小写。我们可以用 attr 来指定要比较的属性。 -->
```

- striptags (value, [preserve_linebreaks])

```html
<!-- 类似于 jinja 中的 striptags. 如果 preserve_linebreaks 为 false（同时也是默认值），则会移去 SGML/XML 标签并用一个空格符 替换临近的、连续的空白符号。如果 preserve_linebreaks 为 true，则会尝试保留临近的空白符号。 如果你希望使用管道操作符进行类似于{{ text | striptags | nl2br }}这样的操作时，你就会 需要用到后一种。否则你还是应该使用默认的用法。 -->
```

- dump (object)

```html
<!-- 在一个对象上调用 JSON.stringify，并将结果输出到模板上。这在调试时很有用：{{ foo | dump }}。 -->
```

## API

1.render

```ts
// 语法：nunjucks.render(name, [context], [callback])
var res = nunjucks.render('foo.html');
var res = nunjucks.render('foo.html', { username: 'James' });
nunjucks.render('async.html', function (err, res) {});
```

- renderString

```ts
// 与 render 类似，只是渲染一个字符串而不是渲染加载的模板。
var res = nunjucks.renderString('Hello {{ username }}', { username: 'James' });
```

- compile

```ts
// nunjucks.compile(str, [env], [path]);
// 将给定的字符串编译成可重复使用的 nunjucks 模板对象。
var template = nunjucks.compile('Hello {{ username }}');
template.render({ username: 'James' });
```

- configure

```ts
// nunjucks.configure([path], [opts]);
// 传入 path 指定存放模板的目录，opts 可让某些功能开启或关闭，这两个变量都是可选的。path 的默认值为当前的工作目录，opts 提供以下功能：

// autoescape (默认值: true) 控制输出是否被转义，查看 Autoescaping
// throwOnUndefined (default: false) 当输出为 null 或 undefined 会抛出异常
// trimBlocks (default: false) 自动去除 block/tag 后面的换行符
// lstripBlocks (default: false) 自动去除 block/tag 签名的空格
// watch (默认值: false) 当模板变化时重新加载。使用前请确保已安装可选依赖 chokidar。
// noCache (default: false) 不使用缓存，每次都重新编译
// web 浏览器模块的配置项
// useCache (default: false) 是否使用缓存，否则会重新请求下载模板
// async (default: false) 是否使用 ajax 异步下载模板
// express 传入 express 实例初始化模板设置
// tags: (默认值: see nunjucks syntax) 定义模板语法，查看 Customizing Syntax

// 我们推荐使用 var env = nunjucks.configure(...)创建一个独立的环境，并调用 env.render(...)进行渲染。
nunjucks.configure('views');

// 在浏览器端最好使用绝对地址
nunjucks.configure('/views');

nunjucks.configure({ autoescape: true });

nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
});

var env = nunjucks.configure('views');
// do stuff with env
```

## 单词

```pug
render 给予 表达
collection 收集
dictsort 字典分类
macro 宏 巨大的
convention 惯例
separator 分离器

```
