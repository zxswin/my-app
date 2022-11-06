## nodejs 处理 mysql 数据库

- .mysql 模块简单用法

```ts
// 1.用法示例(链接并查询数据库)
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'mydb',
});

connection.connect();

connection.query('SELECT * FROM myguests', function (error, results, fields) {
  if (error) throw error;
  console.log('results[0]', results[0].id);
});

connection.end();

// connection();可以添加回调函数
connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  console.log('connected as id ' + connection.threadId);
});
```

## 数据库操作( CURD ) 增删改查

- 1.查询数据库

```ts
// 1.查询数据库
let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'mydb',
});

connection.connect();

let sql = 'SELECT * FROM myguests WHERE id=?';
let sqlParam = [24];
//查
connection.query(sql, sqlParam, (err, result) => {
  if (err) {
    console.log('[SELECT ERROR] - ', err.message);
    return;
  }

  console.log('--------------------------SELECT----------------------------');
  result.forEach((row) => {
    console.log('row:', row.id);
  });
  console.log(
    '------------------------------------------------------------\n\n'
  );
});

connection.end();
```

- 2.插入数据

```ts
// 2.插入数据
let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'mydb',
});

connection.connect();

// 插入所有字段
let addSql =
  'INSERT INTO myguests(id,firstname,lastname,email,reg_date) VALUES(0,?,?,?,?)';
let addSqlParams = [null, 'lee', 'ning', '123@qq.com', new Date()];

// 插入所有字段
let addSql = 'INSERT INTO myguests SET ?';
let addSqlParams = {
  id: null,
  firstname: 'lee4',
  lastname: 'ling',
  email: '123@qq.com',
  reg_date: new Date(),
};

// 插入部分字段 1
let addSql = 'INSERT INTO myguests SET ?';
let addSqlParams = { firstname: 'lee6' };

// 插入部分字段 2
let addSql = 'INSERT INTO myguests SET firstname=?';
let addSqlParams = 'lee7';

let addSql = 'INSERT INTO myguests SET ?';
let addSqlParams = {
  id: null,
  firstname: 'lee8',
  lastname: 'ling',
  email: '123@qq.com',
  reg_date: new Date(),
};

//增
let query = connection.query(addSql, addSqlParams, function (err, result) {
  if (err) {
    console.log('[INSERT ERROR] - ', err.message);
    return;
  }

  console.log('--------------------------INSERT----------------------------');
  console.log('INSERT ID:', result); // result 是插入数据的结果集
  console.log(
    '-----------------------------------------------------------------\n\n'
  );
});

console.log('query.sql', query.sql); // 打印出 sql 语句
// INSERT INTO myguests SET `id` = NULL, `firstname` = 'lee5', `lastname` = 'ling', `email` = '123@qq.com', `reg_date` = '2018-11-30 10:36:56.084'
connection.end();
```

```ts
// 更新数据(修改数据)
let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'mydb',
});

connection.connect();

let modSql = 'UPDATE myguests SET firstname = ?,lastname = ? WHERE id = ?';
let modSqlParams = ['zhuo1', 'win', 25];

//改
connection.query(modSql, modSqlParams, function (err, result) {
  if (err) {
    console.log('[UPDATE ERROR] - ', err.message);
    return;
  }
  console.log('--------------------------UPDATE----------------------------');
  console.log('result', result);
  console.log('UPDATE affectedRows', result.affectedRows);
  console.log(
    '-----------------------------------------------------------------\n\n'
  );
});

connection.end();
```

- 删除数据

```ts
// 4.删除数据
let mysql = require('mysql');

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  port: '3306',
  database: 'mydb',
});

connection.connect();

let delSql = 'DELETE FROM myguests WHERE id=25';
//删
connection.query(delSql, function (err, result) {
  if (err) {
    console.log('[DELETE ERROR] - ', err.message);
    return;
  }

  console.log('--------------------------DELETE----------------------------');
  console.log('DELETE affectedRows', result.affectedRows);
  console.log(
    '-----------------------------------------------------------------\n\n'
  );
});

connection.end();
```

## Sequelize

```ts
/**
 * Sequelize 是一个基于 promise 的 Node.js ORM
 * 目前支持 Postgres, MySQL, SQLite 和 Microsoft SQL Server
 * 它具有强大的事务支持, 关联关系, 读取和复制等功能
 * 我们选择 Node 的 ORM 框架 Sequelize 来操作数据库。
 * ORM(对象关系映射)
 * 这样，我们读写的都是 JavaScript 对象
 * Sequelize 帮我们把对象变成数据库中的行
 * Sequelize 返回的对象是 Promise，所以我们可以用 then()和 catch()分别异步响应成功和失败
 */
```

## Getting started - 入门

- 使用示例(基本使用)

```ts
/**
 * 先安装相关依赖
 * npm install --save mysql2
 * npm install --save sequelize
 */
const Sequelize = require('sequelize');
const sequelize = new Sequelize('mydb', 'root', '123456', {
  host: 'localhost',
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // 仅限 SQLite
  storage: 'path/to/database.sqlite',

  // 请参考 Querying - 查询 操作符 章节
  operatorsAliases: false,
});

const User = sequelize.define(
  'user',
  {
    username: Sequelize.STRING,
    birthday: Sequelize.DATE,
  },
  {
    freezeTableName: true, // 禁止修改表名 默认会加上 s 把表名变为复数
    timestamps: false, // 禁止自动添加时间戳 createAt，updateAt
  }
);

sequelize
  .sync()
  .then(() =>
    User.create({
      username: 'janedoe',
      birthday: new Date(1980, 6, 20),
    })
  )
  .then((jane) => {
    console.log(
      '================================================================================'
    );
    console.log(jane.toJSON());
  });

// 2.authenticate 测试连接
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

// 3.定义模型(创建表)
// 语法: sequelize.define('name', {attributes}, {options})
const User = sequelize.define('user', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
});

// force: true 如果表已经存在，将会丢弃表 即把之前的表删除掉重新新建一表
User.sync({ force: true }).then(() => {
  // 表已创建
  return User.create({
    firstName: 'John',
    lastName: 'Hancock',
  });
});

// 4.简单查询功能
User.findAll().then((users) => {
  users.forEach((v) => {
    console.log('===============================================');
    console.log(v.dataValues.username);
  });
});

// 5.应用全局的模型参数
const sequelize = new Sequelize('connectionUri', {
  define: {
    timestamps: false, // 默认为 true 全局定义会运用到所有实例上面
  },
});

const User = sequelize.define('user', {}); // 时间戳默认为 false
const Post = sequelize.define(
  'post',
  {},
  {
    timestamps: true, // 时间戳此时为 true
  }
);
```

## Model definition - 模型定义

- 1.基本模型定义

```ts
// 1.基本模型定义
const Project = sequelize.define('project', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
});

const Task = sequelize.define('task', {
  title: Sequelize.STRING,
  description: Sequelize.TEXT,
  deadline: Sequelize.DATE,
});
```

- 2.配置型模型定义

```ts
const Foo = sequelize.define('foo', {
// 如果未赋值,则自动设置值为 TRUE
flag: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true},

// 设置默认时间为当前时间
myDate: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },

// 将 allowNull 设置为 false 会将 NOT NULL 添加到列中，
// 这意味着当列为空时执行查询时将从 DB 抛出错误。
// 如果要在查询 DB 之前检查值不为空，请查看下面的验证部分。
title: { type: Sequelize.STRING, allowNull: false},

// 创建具有相同值的两个对象将抛出一个错误。 唯一属性可以是布尔值或字符串。
// 如果为多个列提供相同的字符串，则它们将形成复合唯一键。
uniqueOne: { type: Sequelize.STRING, unique: 'compositeIndex'},
uniqueTwo: { type: Sequelize.INTEGER, unique: 'compositeIndex'},

// unique 属性用来创建一个唯一约束。
someUnique: {type: Sequelize.STRING, unique: true},

// 这与在模型选项中创建索引完全相同。
{someUnique: {type: Sequelize.STRING}},
{indexes: [{unique: true, fields: ['someUnique']}]},

// primaryKey 用于定义主键。
identifier: { type: Sequelize.STRING, primaryKey: true},

// autoIncrement 可用于创建自增的整数列
incrementMe: { type: Sequelize.INTEGER, autoIncrement: true },

// 你可以通过'field'属性指定自定义列名称：
fieldWithUnderscores: { type: Sequelize.STRING, field: 'field_with_underscores' },

// 这可以创建一个外键:
bar_id: {
  type: Sequelize.INTEGER,

  references: {
  // 这是引用另一个模型
  model: Bar,

      // 这是引用模型的列名称
      key: 'id',

      // 这声明什么时候检查外键约束。 仅限PostgreSQL。
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE

  }
}
})
```

- 3.时间戳

```ts
/**
 * 默认情况下，Sequelize 会将 createdAt 和 updatedAt 属性添加到模型中
 * 以便您能够知道数据库条目何时进入数据库以及何时被更新
 */
```

- 4.数据类型

```ts
Sequelize.STRING; // VARCHAR(255)
Sequelize.STRING(1234); // VARCHAR(1234)
Sequelize.STRING.BINARY; // VARCHAR BINARY
Sequelize.TEXT; // TEXT
Sequelize.TEXT('tiny'); // TINYTEXT

Sequelize.INTEGER; // INTEGER
Sequelize.BIGINT; // BIGINT
Sequelize.BIGINT(11); // BIGINT(11)

Sequelize.FLOAT; // FLOAT
Sequelize.FLOAT(11); // FLOAT(11)
Sequelize.FLOAT(11, 12); // FLOAT(11,12)

Sequelize.REAL; // REAL 仅限于 PostgreSQL.
Sequelize.REAL(11); // REAL(11) 仅限于 PostgreSQL.
Sequelize.REAL(11, 12); // REAL(11,12) 仅限于 PostgreSQL.

Sequelize.DOUBLE; // DOUBLE
Sequelize.DOUBLE(11); // DOUBLE(11)
Sequelize.DOUBLE(11, 12); // DOUBLE(11,12)

Sequelize.DECIMAL; // DECIMAL
Sequelize.DECIMAL(10, 2); // DECIMAL(10,2)

Sequelize.DATE; // DATETIME 针对 mysql / sqlite, TIMESTAMP WITH TIME ZONE 针对 postgres
Sequelize.DATE(6); // DATETIME(6) 针对 mysql 5.6.4+. 小数秒支持多达 6 位精度
Sequelize.DATEONLY; // DATE 不带时间.
Sequelize.BOOLEAN; // TINYINT(1)

Sequelize.ENUM('value 1', 'value 2'); // 一个允许具有 “value 1” 和 “value 2” 的 ENUM
Sequelize.ARRAY(Sequelize.TEXT); // 定义一个数组。 仅限于 PostgreSQL。
Sequelize.ARRAY(Sequelize.ENUM); // 定义一个 ENUM 数组. 仅限于 PostgreSQL。

Sequelize.JSON; // JSON 列. 仅限于 PostgreSQL, SQLite and MySQL.
Sequelize.JSONB; // JSONB 列. 仅限于 PostgreSQL .

Sequelize.BLOB; // BLOB (PostgreSQL 二进制)
Sequelize.BLOB('tiny'); // TINYBLOB (PostgreSQL 二进制. 其他参数是 medium 和 long)

Sequelize.UUID; // PostgreSQL 和 SQLite 的 UUID 数据类型, CHAR(36) BINARY 针对于 MySQL (使用默认值: Sequelize.UUIDV1 或 Sequelize.UUIDV4 来让 sequelize 自动生成 ID)

Sequelize.CIDR; // PostgreSQL 的 CIDR 数据类型
Sequelize.INET; // PostgreSQL 的 INET 数据类型
Sequelize.MACADDR; // PostgreSQL 的 MACADDR

Sequelize.RANGE(Sequelize.INTEGER); // 定义 int4range 范围. 仅限于 PostgreSQL.
Sequelize.RANGE(Sequelize.BIGINT); // 定义 int8range 范围. 仅限于 PostgreSQL.
Sequelize.RANGE(Sequelize.DATE); // 定义 tstzrange 范围. 仅限于 PostgreSQL.
Sequelize.RANGE(Sequelize.DATEONLY); // 定义 daterange 范围. 仅限于 PostgreSQL.
Sequelize.RANGE(Sequelize.DECIMAL); // 定义 numrange 范围. 仅限于 PostgreSQL.

Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)); // 定义 tstzrange 范围的数组. 仅限于 PostgreSQL.

Sequelize.GEOMETRY; // 空间列. 仅限于 PostgreSQL (具有 PostGIS) 或 MySQL.
Sequelize.GEOMETRY('POINT'); // 具有几何类型的空间列. 仅限于 PostgreSQL (具有 PostGIS) 或 MySQL.
Sequelize.GEOMETRY('POINT', 4326); // 具有几何类型和 SRID 的空间列. 仅限于 PostgreSQL (具有 PostGIS) 或 MySQL.
```

- 5.验证

```ts
const ValidateMe = sequelize.define('foo', {
  foo: {
    type: Sequelize.STRING,
    validate: {
      is: ['^[a-z]+$', 'i'], // 只允许字母
      is: /^[a-z]+$/i, // 与上一个示例相同,使用了真正的正则表达式
      not: ['[a-z]', 'i'], // 不允许字母
      isEmail: true, // 检查邮件格式 (foo@bar.com)
      isUrl: true, // 检查连接格式 (http://foo.com)
      isIP: true, // 检查 IPv4 (129.89.23.1) 或 IPv6 格式
      isIPv4: true, // 检查 IPv4 (129.89.23.1) 格式
      isIPv6: true, // 检查 IPv6 格式
      isAlpha: true, // 只允许字母
      isAlphanumeric: true, // 只允许使用字母数字
      isNumeric: true, // 只允许数字
      isInt: true, // 检查是否为有效整数
      isFloat: true, // 检查是否为有效浮点数
      isDecimal: true, // 检查是否为任意数字
      isLowercase: true, // 检查是否为小写
      isUppercase: true, // 检查是否为大写
      notNull: true, // 不允许为空
      isNull: true, // 只允许为空
      notEmpty: true, // 不允许空字符串
      equals: 'specific value', // 只允许一个特定值
      contains: 'foo', // 检查是否包含特定的子字符串
      notIn: [['foo', 'bar']], // 检查是否值不是其中之一
      isIn: [['foo', 'bar']], // 检查是否值是其中之一
      notContains: 'bar', // 不允许包含特定的子字符串
      len: [2, 10], // 只允许长度在 2 到 10 之间的值
      isUUID: 4, // 只允许 uuids
      isDate: true, // 只允许日期字符串
      isAfter: '2011-11-05', // 只允许在特定日期之后的日期字符串
      isBefore: '2011-11-05', // 只允许在特定日期之前的日期字符串
      max: 23, // 只允许值 <= 23
      min: 23, // 只允许值 >= 23
      isCreditCard: true, // 检查有效的信用卡号码

      // 也可以自定义验证:
      isEven(value) {
        if (parseInt(value) % 2 != 0) {
          throw new Error('Only even values are allowed!');
          // 我们也在模型的上下文中，所以如果它存在的话,
          // this.otherField会得到otherField的值。
        }
      },
    },
  },
});
```

- 6.notNull 验证器来自定义 allowNull 错误消息, 像这样

```ts
const User = sequelize.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notNull: {
        msg: 'Please enter your name',
      },
    },
  },
});
```

- 7.确保纬度和经度都不设置，或者两者都设置，如果设置了一个而另一个未设置则验证失败。

```ts
const Pub = Sequelize.define(
  'pub',
  {
    name: { type: Sequelize.STRING },
    address: { type: Sequelize.STRING },
    latitude: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      validate: { min: -90, max: 90 },
    },
    longitude: {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
      validate: { min: -180, max: 180 },
    },
  },
  {
    validate: {
      bothCoordsOrNone() {
        if ((this.latitude === null) !== (this.longitude === null)) {
          throw new Error(
            'Require either both latitude and longitude or neither'
          );
        }
      },
    },
  }
);
```

- 8.你还可以修改 Sequelize 处理列名称的方式：配置篇

```ts
const Bar = sequelize.define(
  'bar',
  { bla },
  {
    // 不添加时间戳属性 (updatedAt, createdAt)
    timestamps: false,

    // 不删除数据库条目，但将新添加的属性 deletedAt 设置为当前日期（删除完成时）。
    // paranoid 只有在启用时间戳时才能工作
    paranoid: true,

    // 将自动设置所有属性的字段选项为下划线命名方式。
    // 不会覆盖已经定义的字段选项
    underscored: true,

    // 禁用修改表名; 默认情况下，sequelize 将自动将所有传递的模型名称（define 的第一个参数）转换为复数。 如果你不想这样，请设置以下内容
    freezeTableName: true,

    // 定义表的名称
    tableName: 'my_very_custom_table_name',

    // 启用乐观锁定。 启用时，sequelize 将向模型添加版本计数属性，
    // 并在保存过时的实例时引发 OptimisticLockingError 错误。
    // 设置为 true 或具有要用于启用的属性名称的字符串。
    version: true,
  }
);
```

- 9.sequelize 处理时间戳，但只想要其中一部分，或者希望您的时间戳被称为别的东西，则可以单独覆盖每个列：

```ts
/**
 *
 * 处理时间戳，但只想要其中一部分，或者希望您的时间戳被称为别的东西，则可以单独覆盖每个列：
 */
const Foo = sequelize.define(
  'foo',
  { bla },
  {
    // 不要忘记启用时间戳！
    timestamps: true,

    // 我不想要 createdAt
    createdAt: false,

    // 我想 updateAt 实际上被称为 updateTimestamp
    updatedAt: 'updateTimestamp',

    // 并且希望 deletedA t 被称为 destroyTime（请记住启用 paranoid 以使其工作）
    deletedAt: 'destroyTime',
    paranoid: true,
  }
);
```

- 10.您也可以更改数据库引擎，例如 变更到到 MyISAM, 默认值是 InnoDB。

```ts
const Person = sequelize.define('person', { /_ attributes _/ }, {
engine: 'MYISAM'
})

// 或全局的
const sequelize = new Sequelize(db, user, pw, {
define: { engine: 'MYISAM' }
})
```

- 11.您可以为 MySQL 和 PG 中的表指定注释

```ts
const Person = sequelize.define(
  'person',
  { attributes },
  {
    comment: "I'm a table comment!",
  }
);
```

- 11.数据库同步

```ts
// 创建表:
Project.sync()
Task.sync()

// 强制创建!
Project.sync({force: true}) // 这将先丢弃表，然后重新创建它

// 删除表:
Project.drop()
Task.drop()

// 事件处理:
Project.[sync|drop]().then(() => {
// 好吧...一切都很好！
}).catch(error => {
// oooh，你输入了错误的数据库凭据？
})
```

- 12.因为同步和删除所有的表可能要写很多行，你也可以让 Sequelize 来为做这些：

```ts
// 同步所有尚未在数据库中的模型
sequelize.sync()

// 强制同步所有模型
sequelize.sync({force: true})

// 删除所有表
sequelize.drop()

// 广播处理:
sequelize.[sync|drop]().then(() => {
// woot woot
}).catch(error => {
// whooops
})
```

- 13.只有当数据库名称以'\_test'结尾时，才会运行.sync（）

```ts
sequelize.sync({ force: true, match: /\_test\$/ });
```

## Model usage - 模型使用

- find - 搜索数据库中的一个特定元素

```ts
// 查找 id 为 1 的记录
User.findById(1).then((user) => {
  console.log('===============================================');
  console.log(user.dataValues);
});

// 按照字段值查询 1 条记录
User.findOne({ where: { id: 3 } }).then((user) => {
  console.log('===============================================');
  console.log(user.dataValues);
});

// 定义记录查询展示结果

User.findOne({
  where: { id: 3 },
  attributes: ['birthday', ['username', 'id']], // username 当做 id 的值 { birthday: 1980-07-19T16:00:00.000Z, id: 'janedoe' }
}).then((user) => {
  console.log('===============================================');
  console.log(user.dataValues);
});
```

- findOrCreate - 搜索特定元素或创建它（如果不可用）

```ts
/**
 * 一些应该注意的默认行为 1.默认会自动添加 id(主键) createdAt updatedAt 字段 2.表名会自动修改为负数
 */
```

## 注意：

```ts
/**
 * 1.Sequelize 中文官方文档
 * https://github.com/demopark/sequelize-docs-Zh-CN
 */
```

- 单词：

```pug
solution 溶解 解决
general 一般
decimal 十进制的
sequelize 续集
acquire 获得
aliases 别名
alter 改变
freeze 冻结
Getting started 入门
authenticate 认证
definition 定义
deferrable 可推迟的
initially 最初
immediate 立即的
blob 斑点 一滴
inclusive 包含的
exclusive 排他的
paranoid 偏执狂
underscored 划线于…下 强调
dataValues 数据流
```
