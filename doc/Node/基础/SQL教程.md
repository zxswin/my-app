- 主流关系数据库

```bash
# 目前，主流的关系数据库主要分为以下几类：
# 商用数据库，例如：Oracle，SQL Server，DB2等；
# 开源数据库，例如：MySQL，PostgreSQL等；
# 桌面数据库，以微软Access为代表，适合桌面应用程序使用；
# 嵌入式数据库，以Sqlite为代表，适合手机应用和桌面程序。
```

- 常用的数据类型

```bash
# INT	整型	4字节整数类型，范围约+/-21亿
# BIGINT	长整型	8字节整数类型，范围约+/-922亿亿
# REAL	浮点型	4字节浮点数，范围约+/-1038
# DOUBLE	浮点型	8字节浮点数，范围约+/-10308
# DECIMAL(M,N)	高精度小数	由用户指定精度的小数，例如，DECIMAL(20,10)表示一共20位，其中小数10位，通常用于财务计算
# CHAR(N)	定长字符串	存储指定长度的字符串，例如，CHAR(100)总是存储100个字符的字符串
# VARCHAR(N)	变长字符串	存储可变长度的字符串，例如，VARCHAR(100)可以存储0~100个字符的字符串
# BOOLEAN	布尔类型	存储True或者False
# DATE	日期类型	存储日期，例如，2018-06-22
# TIME	时间类型	存储时间，例如，12:20:59
# DATETIME	日期和时间类型	存储日期+时间，例如，2018-06-22 12:20:59
# 上面的表中列举了最常用的数据类型。很多数据类型还有别名，例如，REAL又可以写成FLOAT(24)。
# 还有一些不常用的数据类型，例如，TINYINT（范围在0~255）。各数据库厂商还会支持特定的数据类型，例如JSON。
# 通常来说，BIGINT能满足整数存储的需求，VARCHAR(N)能满足字符串存储的需求，这两种类型是使用最广泛的。
```

- Mysql 数据库常用引擎

```bash
# InnoDB：由 Innobase Oy 公司开发的一款支持事务的数据库引擎，2006 年被 Oracle 收购；
# MyISAM：MySQL 早期集成的默认数据库引擎，不支持事务。
```

- 关系模型

```bash
# 1.班级表和学生表的关系就是“一对多” : 一个班级里有多个学生
# 2.学生表和班级表是“多对一”的关系 : 多个学生可能是在同一个班级里
# 3.班级表和教师表就是“一对一”关系：一个班级只有一个班主任
# 4.1个老师可以对应多个班级，一个班级也可以对应多个老师 “多对多关系”

# 注意 NULL 表示字段数据不存在。一个整型字段如果为 NULL 不表示它的值为 0，同样的，一个字符串型字段为 NULL 也不表示它的值为空串''
```

- 主键

```bash
# 主键是关系表中记录的唯一标识。主键的选取非常重要：主键不要带有业务含义，而应该使用 BIGINT 自增或者 GUID 类型。主键也不应该允许 NULL。
# 可以使用多个列作为联合主键，但联合主键并不常用。
```

- 外键

```bash
# 1.定义外键
# FOREIGN KEY (class_id)指定了 class_id 作为外键，REFERENCES classes (id)指定了这个外键将关联到 classes 表的 id 列（即 classes 表的主键）
# ALTER TABLE students
# ADD CONSTRAINT fk_class_id
# FOREIGN KEY (class_id)
# REFERENCES classes (id);

# 通过定义外键约束，关系数据库可以保证无法插入无效的数据。即如果 classes 表不存在 id=99 的记录，students 表就无法插入 class_id=99 的记录。
# 由于外键约束会降低数据库的性能，大部分互联网应用程序为了追求速度，并不设置外键约束，而是仅靠应用程序自身来保证逻辑的正确性。

# 2.删除外键约束
# ALTER TABLE students
# DROP CONSTRAINT fk_class_id;

# 3.表格的拆分
# 还有一些应用会把一个大表拆成两个一对一的表，目的是把经常读取和不经常读取的字段分开，以获得更高的性能。
# 用户表可以拆分为：基本信息表 user_info 和用户详细信息表 user_profiles
# 大部分时候，只需要查询 user_info 表，并不需要查询 user_profiles 表，这样就提高了查询速度。
```

- 索引

```bash
# 索引是关系数据库中对某一列或多个列的值进行预排序的数据结构。通过使用索引，可以让数据库系统不必扫描整个表，而是直接定位到符合条件的记录，这样就大大加快了查询速度。 1.对 score 列创建索引
# 使用 ADD INDEX idx_score (score)就创建了一个名称为 idx_score，使用列 score 的索引
# ALTER TABLE students
# ADD INDEX idx_score (score);

# 2.设置多列索引
# ALTER TABLE students
# ADD INDEX idx_name_score (name, score);

# 3.关于索引的效率和性能
# 索引的效率取决于索引列的值是否散列，即该列的值如果越互不相同，那么索引效率越高。
# 可以对一张表创建多个索引。索引的优点是提高了查询效率，缺点是在插入、更新和删除记录时，需要同时修改索引，因此，索引越多，插入、更新和删除记录的速度就越慢。
# 对于主键，关系数据库会自动对其创建主键索引。使用主键索引的效率是最高的，因为主键会保证绝对唯一。

# 4.设置唯一索引
# 假设 students 表的 name 不能重复：
# ALTER TABLE students
# ADD UNIQUE INDEX uni_name (name);

# 5.创建唯一约束
# name 列没有索引，但仍然具有唯一性保证。
# ALTER TABLE students
# ADD CONSTRAINT uni_name UNIQUE (name);
```

## 查询数据

- 测试数据准备

```bash
-- 创建数据库
# CREATE DATABASE test CHARACTER SET 'utf8' COLLATE 'utf8_general_ci'; // 设置编码 否则可能会出现乱码问题
# -- 切换到 test 数据库
# USE test;

# -- 创建 classes 表：
# CREATE TABLE classes (
# id BIGINT NOT NULL AUTO_INCREMENT,
# name VARCHAR(100) NOT NULL,
# PRIMARY KEY (`id`)
# ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# -- 创建 students 表：
# CREATE TABLE students (
# id BIGINT NOT NULL AUTO_INCREMENT,
# class_id BIGINT NOT NULL,
# name VARCHAR(100) NOT NULL,
# gender VARCHAR(1) NOT NULL,
# score INT NOT NULL,
# PRIMARY KEY (`id`)
# ) ENGINE=InnoDB DEFAULT CHARSET=utf8;

# -- 插入 classes 记录：
# INSERT INTO classes(id, name) VALUES (1, '一班');
# INSERT INTO classes(id, name) VALUES (2, '二班');
# INSERT INTO classes(id, name) VALUES (3, '三班');
# INSERT INTO classes(id, name) VALUES (4, '四班');

# -- 插入 students 记录：
# INSERT INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'M', 90);
# INSERT INTO students (id, class_id, name, gender, score) VALUES (2, 1, '小红', 'F', 95);
# INSERT INTO students (id, class_id, name, gender, score) VALUES (3, 1, '小军', 'M', 88);
# INSERT INTO students (id, class_id, name, gender, score) VALUES (4, 1, '小米', 'F', 73);
# INSERT INTO students (id, class_id, name, gender, score) VALUES (5, 2, '小白', 'F', 81);
# INSERT INTO students (id, class_id, name, gender, score) VALUES (6, 2, '小兵', 'M', 55);
# INSERT INTO students (id, class_id, name, gender, score) VALUES (7, 2, '小林', 'M', 85);
# INSERT INTO students (id, class_id, name, gender, score) VALUES (8, 3, '小新', 'F', 91);
# INSERT INTO students (id, class_id, name, gender, score) VALUES (9, 3, '小王', 'M', 89);
# INSERT INTO students (id, class_id, name, gender, score) VALUES (10, 3, '小丽', 'F', 85);

```

- 基本查询

```bash
# SELECT _ FROM students;
# SELECT _ FROM classes;
# SELECT 100+200;
# 许多检测工具会执行一条 SELECT 1;来测试数据库连接
```

- 条件查询

```bash
# -- 条件运算按照 NOT、AND、OR 的优先级进行，即 NOT 优先级最高，其次是 AND，最后是 OR。加上括号可以改变优先级。
# SELECT _ FROM students WHERE score >= 80;
# SELECT _ FROM students WHERE score >= 80 AND gender = 'M';
# SELECT _ FROM students WHERE score >= 80 OR gender = 'M';
# SELECT _ FROM students WHERE NOT class_id = 2;
# SELECT \* FROM students WHERE (score < 80 OR score > 90) AND gender = 'M';

# -- 常用的条件表达式
# 使用=判断相等 score = 80 name = 'abc' 字符串需要用单引号括起来
# 使用>判断大于 score > 80 name > 'abc' 字符串比较根据 ASCII 码，中文字符比较根据数据库设置
# 使用>=判断大于或相等 score >= 80 name >= 'abc'
# 使用<判断小于 score < 80 name <= 'abc'
# 使用<=判断小于或相等 score <= 80 name <= 'abc'
# 使用<>判断不相等 score <> 80 name <> 'abc'
# 使用 LIKE 判断相似 name LIKE 'ab%' name LIKE '%bc%' %表示任意字符，例如'ab%'将匹配'ab'，'abc'，'abcd'
```

- 投影查询

```bash
# 我们可以用 SELECT 列 1, 列 2, 列 3 FROM ...，让结果集仅包含指定列。这种操作称为投影查询。
# SELECT id, score, name FROM students;

# -- 使用投影查询，并将列名重命名：
# SELECT id, score points, name FROM students;
# SELECT id, score points, name FROM students WHERE gender = 'M';
```

- 排序

```bash
# 默认的排序规则是 ASC：“升序”，即从小到大。ASC 可以省略，
# -- 按 score 从低到高
# SELECT id, name, gender, score FROM students ORDER BY score;

# -- 按 score 从高到低
# SELECT id, name, gender, score FROM students ORDER BY score DESC;

# -- 按 score, gender 排序:
# 使用 ORDER BY score DESC, gender 表示先按 score 列倒序，如果有相同分数的，再按 gender 列排序：
# SELECT id, name, gender, score FROM students ORDER BY score DESC, gender;

# -- 带 WHERE 条件的 ORDER BY:
# SELECT id, name, gender, score
# FROM students
# WHERE class_id = 1
# ORDER BY score DESC;
```

- 分页查询

```bash
# 使用 LIMIT <M> OFFSET <N>可以对结果集进行分页，每次查询返回结果集的一部分；
# 分页查询需要先确定每页的数量和当前页数，然后确定 LIMIT 和 OFFSET 的值。
# LIMIT 总是设定为 pageSize；
# OFFSET 计算公式为 pageSize \* (pageIndex - 1)。
# OFFSET 超过了查询的最大数量并不会报错，而是得到一个空的结果集。

# OFFSET 是可选的，如果只写 LIMIT 15，那么相当于 LIMIT 15 OFFSET 0。
# 在 MySQL 中，LIMIT 15 OFFSET 30 还可以简写成 LIMIT 30 15。

# -- 查询第 1 页
# SELECT id, name, gender, score
# FROM students
# ORDER BY score DESC
# LIMIT 3 OFFSET 0;
```

- 聚合查询

```bash
# 对于统计总数、平均数这类计算，SQL 提供了专门的聚合函数，使用聚合函数进行查询，就是聚合查询，它可以快速获得结果。
# -- 使用聚合查询:
# SELECT COUNT(\*) FROM students;

# -- 使用聚合查询并设置结果集的列名为 num:
# SELECT COUNT(\*) num FROM students;

# -- 使用聚合查询并设置 WHERE 条件:
# SELECT COUNT(\*) boys FROM students WHERE gender = 'M';

# SUM 计算某一列的合计值，该列必须为数值类型
# AVG 计算某一列的平均值，该列必须为数值类型
# MAX 计算某一列的最大值
# MIN 计算某一列的最小值
# MAX()和 MIN()函数并不限于数值类型。如果是字符类型，MAX()和 MIN()会返回排序最后和排序最前的字符。

# -- 使用聚合查询计算男生平均成绩:
# SELECT AVG(score) average FROM students WHERE gender = 'M';
# 如果聚合查询的 WHERE 条件没有匹配到任何行，COUNT()会返回 0，而 MAX()、MIN()、MAX()和 MIN()会返回 NULL：

# -- 按 class_id 分组: 分组聚合
# SELECT COUNT(\*) num FROM students GROUP BY class_id;

# -- 按 class*id 分组 显示统计的是那些班级的
# SELECT class_id, COUNT(*) num FROM students GROUP BY class*id;
# SELECT name, class_id, COUNT(*) num FROM students GROUP BY class_id; // 可能会报错

# -- 按 class_id, gender 分组:
# SELECT class_id, gender, COUNT(\*) num FROM students GROUP BY class_id, gender;
# SELECT class_id , AVG(score) num FROM students GROUP BY class_id; // 查看每个班级的平均分

```

- 多表查询

```bash
# 查询多张表的语法是：SELECT \* FROM <表 1> <表 2>

# -- FROM students, classes: # 同时从 students 表和 classes 表的“乘积”，即查询数据 数据量翻倍
# 结果集的列数是 students 表和 classes 表的列数之和，行数是 students 表和 classes 表的行数之积。
# SELECT \* FROM students, classes;

# -- 利用投影查询的“设置列的别名”来给两个表各自的 id 和 name 列起别名
# -- set alias:
# SELECT
# students.id sid,
# students.name,
# students.gender,
# students.score,
# classes.id cid,
# classes.name cname
# FROM students, classes;

# --SQL 还允许给表设置一个别名
# SELECT
# s.id sid,
# s.name,
# s.gender,
# s.score,
# c.id cid,
# c.name cname
# FROM students s, classes c;

# --多表查询也是可以添加 WHERE 条件的，我们来试试：
# SELECT
# s.id sid,
# s.name,
# s.gender,
# s.score,
# c.id cid,
# c.name cname
# FROM students s, classes c
# WHERE s.gender = 'M' AND c.id = 1;
```

- 连接查询

```bash
# 连接查询是另一种类型的多表查询。连接查询对多个表进行 JOIN 运算，简单地说，就是先确定一个主表作为结果集，然后，把其他表的行有选择性地“连接”在主表结果集上。

# JOIN 查询需要先确定主表，然后把另一个表的数据“附加”到结果集上；
# INNER JOIN 是最常用的一种 JOIN 查询，它的语法是 SELECT ... FROM <表 1> INNER JOIN <表 2> ON <条件...>；
# JOIN 查询仍然可以使用 WHERE 条件和 ORDER BY 排序。

# -- 选出所有学生，同时返回班级名称 INNER JOIN 内连接
# SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
# FROM students s
# INNER JOIN classes c
# ON s.class_id = c.id;

# -- INNER JOIN 内连接 写法要点 -先确定主表，仍然使用 FROM <表 1>的语法； -再确定需要连接的表，使用 INNER JOIN <表 2>的语法； -然后确定连接条件，使用 ON <条件...>，这里的条件是 s.class_id = c.id，表示 students 表的 class_id 列与 classes 表的 id 列相同的行需要连接； -可选：加上 WHERE 子句、ORDER BY 等子句。

# -- 使用 OUTER JOIN 外连接
# 执行上述 RIGHT OUTER JOIN 可以看到，和 INNER JOIN 相比，RIGHT OUTER JOIN 多了一行，多出来的一行是“四班”，但是，学生相关的列如 name、gender、score 都为 NULL。
# SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
# FROM students s
# RIGHT OUTER JOIN classes c
# ON s.class_id = c.id;

# INNER JOIN 只返回同时存在于两张表的行数据，由于 students 表的 class_id 包含 1，2，3，classes 表的 id 包含 1，2，3，4，所以，INNER JOIN 根据条件 s.class_id = c.id 返回的结果集仅包含 1，2，3。
# RIGHT OUTER JOIN 返回右表都存在的行。如果某一行仅在右表存在，那么结果集就会以 NULL 填充剩下的字段。
# LEFT OUTER JOIN 则返回左表都存在的行。如果我们给 students 表增加一列，并添加 class_id=5，由于 classes 表并不存在 id=5 的列，所以，LEFT OUTER JOIN 的结果会增加一列，对应的 class_name 是 NULL：

# -- 先增加一列 class_id=5:
# INSERT INTO students (class_id, name, gender, score) values (5, '新生', 'M', 88);
# -- 使用 LEFT OUTER JOIN
# SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
# FROM students s
# LEFT OUTER JOIN classes c
# ON s.class_id = c.id;

# --使用 FULL OUTER JOIN，它会把两张表的所有记录全部选择出来，并且，自动把对方不存在的列填充为 NULL：报错不可使用待解决
# SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
# FROM students s
# FULL OUTER JOIN classes c
# ON s.class_id = c.id;

# 变通实现 ：left join + right join
# SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
# FROM students s
# LEFT OUTER JOIN classes c
# ON s.class_id = c.id
# UNION
# SELECT s.id, s.name, s.class_id, c.name class_name, s.gender, s.score
# FROM students s
# RIGHT OUTER JOIN classes c
# ON s.class_id = c.id;

# -要选择那种 JOIN 查询
# INNER JOIN 是选出两张表都存在的记录：
# LEFT OUTER JOIN 是选出左表存在的记录：
# RIGHT OUTER JOIN 是选出右表存在的记录：
# FULL OUTER JOIN 则是选出左右表都存在的记录：
```

## 修改数据

- 1.插入数据 INSERT

```bash
# INSERT 语句的基本语法是：
# INSERT INTO <表名> (字段 1, 字段 2, ...) VALUES (值 1, 值 2, ...);

# -- 添加一条新记录
# 字段顺序不必和数据库表的字段顺序一致，但值的顺序必须和字段顺序一致。
# 没有列出 id 字段，也没有列出 id 字段对应的值，这是因为 id 字段是一个自增主键，它的值可以由数据库自己推算出来
# INSERT INTO students (class_id, name, gender, score) VALUES (2, '大牛', 'M', 80);

# -- 一次性添加多条新记录
# INSERT INTO students (class_id, name, gender, score) VALUES
# (1, '大宝', 'M', 87),
# (2, '二宝', 'M', 81);
```

- 修改数据 UPDATE

```bash
# UPDATE 语句的基本语法是：
# UPDATE <表名> SET 字段 1=值 1, 字段 2=值 2, ... WHERE ...;

# -- 更新 id=1 的记录
# UPDATE students SET name='大牛', score=66 WHERE id=1;

# -- 更新 id=5,6,7 的记录
# UPDATE students SET name='小牛', score=77 WHERE id>=5 AND id<=7;

# -- 更新 score<80 的记录
# 在 UPDATE 语句中，更新字段时可以使用表达式。例如，把所有 80 分以下的同学的成绩加 10 分：
# UPDATE students SET score=score+10 WHERE score<80;

# -- 如果 WHERE 条件没有匹配到任何记录，UPDATE 语句不会报错，也不会有任何记录被更新

# -- UPDATE 语句可以没有 WHERE 条件 这时，整个表的所有记录都会被更新
# UPDATE students SET score=60;

# -- 在使用 MySQL 这类真正的关系数据库时，UPDATE 语句会返回更新的行数以及 WHERE 条件匹配的行数。
```

- 删除数据库表中的记录

```bash
# DELETE 语句的基本语法是：
# DELETE FROM <表名> WHERE ...;

# -- 删除 id=1 的记录
# DELETE FROM students WHERE id=1;

# -- 删除 id=5,6,7 的记录
# UPDATE 类似，DELETE 语句也可以一次删除多条记录：
# DELETE FROM students WHERE id>=5 AND id<=7;

# -- 如果 WHERE 条件没有匹配到任何记录，DELETE 语句不会报错，也不会有任何记录被删除

# -- 不带 WHERE 条件的 DELETE 语句会删除整个表的数据

# -- DELETE 语句也会返回删除的行数以及 WHERE 条件匹配的行数。
```

## MySQL

- mysql 基本操作

```bash
# 1.默认端口号是 3306 , 地址就是 127.0.0.1:3306
# -- 连接 MySQL 服务器
# 输入命令 mysql -u root -p

# 断开与 MySQL 服务器的链接
# exit

# 链接远程的 MySQL 服务器
# mysql -h 10.0.1.99 -u root -p
```

- 管理 MySQL

```bash
-- 列出所有的数据库
# information_schema、mysql、performance_schema 和 sys 是系统库，不要去改动它们。其他的是用户创建的数据库。
# SHOW DATABASES;

# -- 创建数据库
# CREATE DATABASE test;

# -- 删除数据库
# 删除一个数据库将导致该数据库的所有表全部被删除
# DROP DATABASE test;

# -- 切换数据库
# 对一个数据库进行操作时，要首先将其切换为当前数据库：
# USE test;

# -- 列出当前数据库的所有表
# SHOW TABLES;

# -- 查看表字段结构
# DESC students;
# 或
# SHOW COLUMNS FROM students;

# -- 查看创建表的 SQL 语句
# SHOW CREATE TABLE students;

# -- 创建表格
# CREATE TABLE `students` (
# `id` bigint(20) NOT NULL AUTO_INCREMENT,
# `class_id` bigint(20) NOT NULL,
# `name` varchar(100) NOT NULL,
# `gender` varchar(1) NOT NULL,
# `score` int(11) NOT NULL,
# PRIMARY KEY (`id`)
# ) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

# -- 删除表格
# DROP TABLE students;

# -- 修改表就比较复杂。如果要给 students 表新增一列 birth，使用：
# ALTER TABLE students ADD COLUMN birth VARCHAR(10) NOT NULL;

# -- 要修改 birth 列，例如把列名改为 birthday，类型改为 VARCHAR(20)：
# ALTER TABLE students CHANGE COLUMN birth birthday VARCHAR(20) NOT NULL;

# -- 要删除列，使用：
# ALTER TABLE students DROP COLUMN birthday;

# -- 退出 mysql
# EXIT 命令退出 MySQL
# 注意 EXIT 仅仅断开了客户端和服务器的连接，MySQL 服务器仍然继续运行。
```

- 实用 SQL 语句

```bash
# -- 插入或替换
# 插入一条新记录（INSERT），但如果记录已经存在，就先删除原记录，再插入新记录 , 如果数据不存在则直接插入
# REPLACE INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'F', 99);

# -- 插入或更新(报错 待测试)
# 若 id=1 的记录不存在，INSERT 语句将插入新记录，否则，当前 id=1 的记录将被更新，更新的字段由 UPDATE 指定。
# 使用 INSERT INTO ... ON DUPLICATE KEY UPDATE ...语句
# INSERT INTO students (id, class_id, name, gender, score) VALUES (1, 1, '小明', 'F', 99) DUPLICATE KEY UPDATE name='小明', gender='F', score=99;

# -- 插入或忽略
# 若 id=1 的记录不存在，INSERT 语句将插入新记录，否则，不执行任何操作。

# -- 快照(复制表)
# 如果想要对一个表进行快照，即复制一份当前表的数据到一个新表，可以结合 CREATE TABLE 和 SELECT：
# 新创建的表结构和 SELECT 使用的表结构完全一致。

# -- 对 class_id=1 的记录进行快照，并存储为新表 students_of_class1:
# CREATE TABLE students_of_class1 SELECT \* FROM students WHERE class_id=1;

# -- 写入查询结果集
# 创建一个统计成绩的表 statistics，记录各班的平均成绩：
# CREATE TABLE statistics (
# id BIGINT NOT NULL AUTO_INCREMENT,
# class_id BIGINT NOT NULL,
# average DOUBLE NOT NULL,
# PRIMARY KEY (id)
# );

# 我们就可以用一条语句写入各班的平均成绩：
# INSERT INTO statistics (class_id, average) SELECT class_id, AVG(score) FROM students GROUP BY class_id;
```

## 事务

- 1.什么是事务

```bash
# 在执行 SQL 语句的时候，某些业务要求，一系列操作必须全部执行，而不能仅执行一部分。例如，一个转账操作：
# -- 从 id=1 的账户给 id=2 的账户转账 100 元
# -- 第一步：将 id=1 的 A 账户余额减去 100
# UPDATE accounts SET balance = balance - 100 WHERE id = 1;
# -- 第二步：将 id=2 的 B 账户余额加上 100
# UPDATE accounts SET balance = balance + 100 WHERE id = 2;

# 这种把多条语句作为一个整体进行操作的功能，被称为数据库事务
# 如果事务失败，那么效果就和没有执行这些 SQL 一样，不会对数据库数据有任何改动。
```

- 2.数据库事务具有 ACID 这 4 个特性：

```bash
# A：Atomic，原子性，将所有 SQL 作为原子工作单元执行，要么全部执行，要么全部不执行；
# C：Consistent，一致性，事务完成后，所有数据的状态都是一致的，即 A 账户只要减去了 100，B 账户则必定加上了 100；
# I：Isolation，隔离性，如果有多个事务并发执行，每个事务作出的修改必须与其他事务隔离；
# D：Duration，持久性，即事务完成后，对数据库数据的修改被持久化存储。

# 对于单条 SQL 语句，数据库系统自动将其作为一个事务执行，这种事务被称为隐式事务。
```

- 3.显式事务

```bash
# BEGIN 开启一个事务，使用 COMMIT 提交一个事务，这种事务被称为显式事务，例如，把上述的转账操作作为一个显式事务：
# 很显然多条 SQL 语句要想作为一个事务执行，就必须使用显式事务
# -- COMMIT 是指提交事务，即试图把事务内的所有 SQL 所做的修改永久保存。如果 COMMIT 语句执行失败了，整个事务也会失败。
# BEGIN;
# UPDATE accounts SET balance = balance - 100 WHERE id = 1;
# UPDATE accounts SET balance = balance + 100 WHERE id = 2;
# COMMIT;

# -- 有些时候，我们希望主动让事务失败，这时，可以用 ROLLBACK 回滚事务，整个事务会失败：
# BEGIN;
# UPDATE accounts SET balance = balance - 100 WHERE id = 1;
# UPDATE accounts SET balance = balance + 100 WHERE id = 2;
# ROLLBACK;
```

- 4.隔离级别

```bash
# SQL 标准定义了 4 种隔离级别，分别对应可能出现的数据不一致的情况：
# 对于两个并发执行的事务，如果涉及到操作同一条记录的时候，可能会发生问题。
# 数据库系统提供了隔离级别来让我们有针对性地选择事务的隔离级别，避免数据不一致的问题。

# Isolation Level 脏读（Dirty Read） 不可重复读（Non Repeatable Read） 幻读（Phantom Read）
# Read Uncommitted Yes Yes Yes
# Read Committed - Yes Yes
# Repeatable Read - - Yes
# Serializable - - -
```

- 5.Read Uncommitted

```bash
# Read Uncommitted 是隔离级别最低的一种事务级别。在这种隔离级别下，一个事务会读到另一个事务更新后但未提交的数据，如果另一个事务回滚，那么当前事务读到的数据就是脏数据，这就是脏读（Dirty Read）。
# 不可重复读是指，在一个事务内，多次读同一数据，在这个事务还没有结束时，如果另一个事务恰好修改了这个数据，那么，在第一个事务中，两次读取的数据就可能不一致。
# 在 Read Committed 隔离级别下，事务不可重复读同一条记录，因为很可能读到的结果不一致。


```

- 6.Repeatable Read

```bash
# 在 Repeatable Read 隔离级别下，一个事务可能会遇到幻读（Phantom Read）的问题。
# 幻读是指，在一个事务中，第一次查询某条记录，发现没有，但是，当试图更新这条不存在的记录时，竟然能成功，并且，再次读取同一条记录，它就神奇地出现了。
# 可见，幻读就是没有读到的记录，以为不存在，但其实是可以更新成功的，并且，更新成功后，再次读取，就出现了。
```

- 7.Serializable

```bash
# Serializable 是最严格的隔离级别。在 Serializable 隔离级别下，所有事务按照次序依次执行，因此，脏读、不可重复读、幻读都不会出现。
# 虽然 Serializable 隔离级别下的事务具有最高的安全性，但是，由于事务是串行执行，所以效率会大大下降，应用程序的性能会急剧降低。如果没有特别重要的情景，一般都不会使用 Serializable 隔离级别。
```

- 8.在 MySQL 中，如果使用 InnoDB，默认的隔离级别是 Repeatable Read。

## 一个简单的数据库设计案例

```bash
# 1.VARCHAR(M)定义的列的长度为可变长字符串，M 取值可以为 0~65535 之间
# 5.0 版本以上，varchar(20)，指的是 20 字符，无论存放的是数字、字母还是 UTF8 汉字（每个汉字 3 字节），都可以存放 20 个，最大大小是 65532 字节 ；
# VARCHAR 类型的实际长度是它的值的实际长度+1,一个字节来记录长度(如果列声明的长度超过 255，则使用两个字节)。

# 2.CHAR(M)定义的列的长度为固定的，M 取值可以为 0 ～ 255 之间
# 定义 char(10)，那么不论你存储的数据是否达到了 10 个字节，都要占去 10 个字节的空间,不足的自动用空格填充。

# 3.如果分配给 CHAR 或 VARCHAR 列的值超过列的最大长度，则对值进行裁剪以使其适合

# 4.Innodb 引擎的话，推荐使用 varchar 代替 char

# 5.BLOB 和 TEXT 类型需要 1，2，3 或 4 个字节来记录列值的长度，这取决于类型的最大可能长度。
# 一个 BLOB 是一个能保存可变数量的数据的二进制的大对象。
# BLOB 可以储存图片,TEXT 不行，TEXT 只能储存纯文本文件。
# BLOB 值的排序和比较以大小写敏感方式执行，而对 TEXT 值是大小写不敏感的。
# 用 text，最大能到 4G。

# 6.MySQL 中 int(M)和 tinyint(M)数值类型中 M 值的意义
# 整数型的数值类型已经限制了取值范围，有符号整型和无符号整型都有，而 M 值并不代表可以存储的数值字符长度，它代表的是数据在显示时显示的最小长度；
# 当存储的字符长度超过 M 值时，没有任何的影响，只要不超过数值类型限制的范围；
# 当存储的字符长度小于 M 值时，只有在设置了 zerofill 用 0 来填充，才能够看到效果，换句话就是说，没有 zerofill，M 值就是无用的。

# TINYINT 1 字节 (-128,127) (0,255) 小整数值
# SMALLINT 2 字节 (-23768,32768) (0,65535) 大整数值
# MEDIUMINT 3 字节 (-8388608,8386607) (0,16777215) 大整数值
# INT 或 INTEGER 4 字节 (-2147483648,2147483647) (0,4294967295) 大整数值

# DROP TABLE IF EXISTS `course`; # 如果表格已经存在则删除表格
```

- 创建 课程信息表格 表格

```sql
-- 课程编码 课程名称 课程学时 课程学分

CREATE TABLE `course` (
`course_num` int(11) NOT NULL COMMENT '课程号',
`course_name` varchar(100) NOT NULL COMMENT '课程名',
`course_hour` int(2) NOT NULL COMMENT '课程学时',
`course_score` varchar(10) NOT NULL COMMENT '课程学分',
PRIMARY KEY (`course_num`),
KEY `course_num` (`course_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='课程信息表';
```

- 插入数据

```sql
INSERT INTO `course` VALUES ('1', '概率论', '5', '2');
INSERT INTO `course` VALUES ('2', 'MySQL', '5', '2');
INSERT INTO `course` VALUES ('3', '英语', '5', '3');
INSERT INTO `course` VALUES ('4', '毛概', '2', '5');
-- 如果表格已经存在则删除
DROP TABLE IF EXISTS `score`;
```

- 创建 分数表 表格 同时添加对应的外键约束

```sql
-- on update cascade 是级联更新的意思，on delete cascade 是级联删除的意思，意思就是说当你更新或删除主键表，那外见表也会跟随一起更新或删除
CREATE TABLE `score` (
`score_id` int(11) NOT NULL,
`course_num` int(11) NOT NULL,
`student_num` int(11) NOT NULL,
`score` int(3) NOT NULL COMMENT '分数',
PRIMARY KEY (`score_id`),
KEY `course_num` (`course_num`),
KEY `student_num` (`student_num`),
CONSTRAINT `score_ibfk_1` FOREIGN KEY (`course_num`) REFERENCES `course` (`course_num`) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT `score_ibfk_2` FOREIGN KEY (`student_num`) REFERENCES `student` (`student_num`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='学生成绩表';
```

- 插入数据

```sql
INSERT INTO `score` VALUES ('1', '1', '15001', '89');
INSERT INTO `score` VALUES ('2', '1', '15002', '78');
INSERT INTO `score` VALUES ('3', '1', '15003', '80');
INSERT INTO `score` VALUES ('4', '1', '16004', '78');
INSERT INTO `score` VALUES ('5', '2', '15001', '85');
INSERT INTO `score` VALUES ('6', '2', '15002', '78');
INSERT INTO `score` VALUES ('7', '2', '15003', '75');
INSERT INTO `score` VALUES ('8', '2', '16004', '89');
INSERT INTO `score` VALUES ('9', '3', '15001', '87');
INSERT INTO `score` VALUES ('10', '3', '15002', '77');
INSERT INTO `score` VALUES ('11', '3', '15003', '88');
INSERT INTO `score` VALUES ('12', '3', '16004', '90');
INSERT INTO `score` VALUES ('13', '4', '15001', '90');
INSERT INTO `score` VALUES ('14', '4', '15002', '98');
INSERT INTO `score` VALUES ('15', '4', '15003', '89');
INSERT INTO `score` VALUES ('16', '4', '16004', '88');
```

- 创建 学生信息表 表格

```sql

DROP TABLE IF EXISTS `student`;
CREATE TABLE `student` (
`student_num` int(11) NOT NULL COMMENT '学生学号',
`student_name` varchar(5) CHARACTER SET utf8 NOT NULL COMMENT '学生姓名',
`student_sex` varchar(1) CHARACTER SET utf8 NOT NULL DEFAULT '男' COMMENT '学生性别',
`student_birthday` varchar(20) CHARACTER SET utf8 NOT NULL COMMENT '学生生日',
PRIMARY KEY (`student_num`),
KEY `student_num` (`student_num`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='学生基本信息表';
```

- 插入数据

```sql
INSERT INTO `student` VALUES ('15001', 'Mark', '男', '1997-02-19');
INSERT INTO `student` VALUES ('15002', 'Wen', '男', '1997-09-16');
INSERT INTO `student` VALUES ('15003', 'Lee', '女', '1997-03-12');
INSERT INTO `student` VALUES ('16004', 'Mary', '女', '1996-07-12');
```

## 单词

```pug
score 得分
domain 领域
access 接近 访问
structured 结构化的
definition 定义
manipulation 操纵
decimal 十进制的
edition 版本
community 社区
standard 标准
enterprise 企业
cluster 丛 蔟
carrier 运输公司
grade 班级 阶级
constraint 约束 强制
contacts 联络
profile 轮廓
alter 更改
drop 滴
unique 独特的
collate 校对
general 一般的 普通的
certificate 证明书 证书
retrieve 检索
information 信息
schema 概要 计划 图表
performance 性能 表现
duplicate 复制品
atomic 原子的
consistent 一致的
isolation 隔离
duration 持续 期间
begin 开始
commit 提交
rollback 回滚
dirty 污染 肮脏的
phantom 幻影 幽灵
course 课程
cascade 串联
formed 形成
incorrectly 不正确的
correctly 正确的
```
