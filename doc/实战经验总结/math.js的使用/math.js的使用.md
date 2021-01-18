## math.js 的使用

- math.js 的安装

```ts
// 安装
// yarn add mathjs
```

- 简单的使用案例

```ts
import { atan2, chain, derivative, e, evaluate, log, pi, pow, round, sqrt } from 'mathjs';

console.log(round(1.2366, 3)); // 1.237

console.log(sqrt(4).toString()); // 2

console.log(evaluate('12 / (2.3 + 0.7)')); // 4

console.log(evaluate('0.2 * 0.1')); // 0.020000000000000004

// 确保运算精度
console.log(format(evaluate('0.2 * 0.1'), { precision: 14 })); // '0.2'

// 链式用法
chain(3).add(4).multiply(2).done(); // 14

// 链式中加减乘除的使用
math.chain(3).add(4).multiply(2).subtract(4).divide(2).done();
```

- 可以在实例化前进行配置

```ts
import { create, all } from 'mathjs';

const config = {
  epsilon: 1e-12,
  matrix: 'Matrix',
  number: 'number',
  precision: 64,
  predictable: false,
  randomSeed: null,
};
const math = create(all, config);

export default math;
```

- 通过 math.import(/_ ... _/)扩展功能

```ts
math.import({
  myvalue: 42,
  hello: function (name) {
    return 'hello, ' + name + '!';
  },
});

math.myvalue * 2; // 84
math.hello('user'); // 'hello, user!'

const parser = math.parser();
parser.evaluate('myvalue + 10'); // 52
parser.evaluate('hello("user")'); // 'hello, user!'
```

## 参考文档连接

```ts
// https://www.ffeeii.com/1992.html
```

## 单词

```pug
arithmetic  [əˈrɪθmətɪk]算术，算法
decimal  [ˈdesɪml] 小数的；十进位的
digit  [ˈdɪdʒɪt] 数字；手指或足趾；一指宽
trunc 将数字截尾取整
mathematics  [ˌmæθəˈmætɪks] 数学；数学运算
numeric  [njuː'merɪk] 数值的
extensive  [ɪkˈstensɪv] 广泛的；大量的；广阔的
feature  [ˈfiːtʃə(r)] 特色，特征
flexible [ˈfleksəbl] 灵活的；柔韧的；易弯曲的
support  [səˈpɔːt] 支持
symbolic   [sɪmˈbɒlɪk] 象征的；符号的
computation   [ˌkɒmpjuˈteɪʃn] 估计，计算
built-in 内置
constant  [ˈkɒnstənt] 常数；恒量
offer 提供 录取通知书
integrate 一体化；集成体
solution  [səˈluːʃn] 解决方案；
complex [ˈkɒmpleks] 复杂的；合成的
fraction  [ˈfrækʃn]  分数
units [ˈjuːnɪts] 单位
matrix [ˈmeɪtrɪks]  矩阵
compatible  [kəmˈpætəbl] 兼容的；能共处的；可并立的
application [ˌæplɪˈkeɪʃn] 应用
demonstrate  [ˈdemənstreɪt] 证明
fiddle [ˈfɪdl] 瞎搞；拉小提琴
fiddle around 玩弄
notepad  [ˈnəʊtpæd] 笔记本（计算机）
evaluate    [ɪˈvæljueɪt] 评价；估价
chain 链
multiply  [ˈmʌltɪplaɪ] 乘
precision   [prɪˈsɪʒn] 精度 精密的
various [ˈveəriəs] 各种各样的
instantiate   [ɪn'stænʃɪeɪt] 例示
optimize   [ˈɒptɪmaɪz] 优化
regular  [ˈreɡjələ(r)] 常规的
similar  [ˈsɪmələ(r)] 相似的
instruction [ɪnˈstrʌkʃn] 指令，命令；指示；教导；用法说明
available [əˈveɪləbl] 可获得的
predictable 可预言的
subset   [ˈsʌbset] 子集
serialization   [ˌsɪəriəlaɪˈzeɪʃn] 序列化
```
