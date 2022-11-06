## mysql 常用命令行

```bash
# 链接数据库
mysql -uroot -p -p3306 -h 127.0.0.1

# 退出数据库
exit;

# 显示所有数据库
show databases;

# 创建数据库
create database shop charset utf8;


# 访问某个数据库
use shop;

# 删除某个数据库
drop database shop;
drop database if exists shop;

# 查看数据库及相关结构编码
show create database shop;

# 导入外部的sql文件 其实就是把sql语句再执行一遍
mysql -uroot -p < sql.sql # 第一种导入方式
source sql.sql # 第二种导入方式

```

## 生成表详细介绍

```sql
-- 创建数据表
CREATE TABLE class (id int PRIMARY KEY AUTO_INCREMENT,cname varchar(30),description varchar(100)) charset utf8;
-- 显示表的描述
desc calss;

-- 删除表格
drop table if EXISTS class;

-- 设置字段不能为空
CREATE TABLE class (id int PRIMARY KEY AUTO_INCREMENT,cname varchar(30) not null,description varchar(100) null) charset utf8;


-- 添加测试数据
-- 插入单条数据
INSERT INTO class set cname = 'PHP',description = '学习PHP 开发网站';
-- 插入多条数据
INSERT INTO class (cname,description) VALUES('Linux','服务器知识'),('Mysql','数据库学习'),('JS',null);


-- 复制表
CREATE TABLE test like class;
-- 复制表数据
INSERT INTO test SELECT * FROM class;
-- 复制表中的某个字段的数据
INSERT INTO test (cname) SELECT cname from class;
-- 在创建表的时候就复制数据 这种方式创建的表没有主键
CREATE TABLE testa SELECT * from class;
-- 在创建表的时候只复制某个字段的值
CREATE TABLE testb (id INT PRIMARY KEY AUTO_INCREMENT,cname VARCHAR(30)) SELECT cname from class;
-- 在创建表的时候只复制某个字段的值(自定义字段名称)
CREATE TABLE testc (id INT PRIMARY KEY AUTO_INCREMENT,name VARCHAR(30)) SELECT cname as name from class;
```

## 表查询

```sql
-- 查询表中的所有数据
SELECT * FROM class;
-- 查询表中某些字段的数据
SELECT cname,id FROM class;
-- 查询表中的数据以字段别名显示
SELECT cname,id AS ids FROM class;

-- 条件筛选查询(不包含关键字p,同时id>2)
SELECT * FROM class WHERE description not like '%p%' and id>2;

-- 将多个字段的查询结果合并到一个单元格中显示
SELECT CONCAT(cname,description) as class_info from class;

-- 创建一张学生表
CREATE TABLE stu (id INT PRIMARY KEY AUTO_INCREMENT,sname char(10),class_id INT DEFAULT null,age SMALLINT not null) charset utf8;
-- 往学生表里面插入相关数据
INSERT INTO stu(sname,class_id,age) VALUES('小明',1,33),('小张',2,28),('小李',3,42),('小赵',2,19),('小关',null,25);
-- OR 为两个条件满足一个就可以
SELECT * FROM stu WHERE class_id = 2 OR sname LIKE '%张%';
-- AND 为两个条件必须同时满足
SELECT * FROM stu WHERE class_id = 2 AND sname LIKE '%张%';
-- 通过添加distinct 关键字可以查询不重复的数据
SELECT DISTINCT class_id FROM stu;
-- 查询某个范围的数据
SELECT * from stu WHERE age>=20 and age<=40;
SELECT * from stu WHERE age NOT BETWEEN 20 AND 40;
SELECT * from stu WHERE class_id = 2 or class_id = 3;
SELECT * from stu WHERE class_id not in(2,3);

-- mysql 查询null的数据(mysql中null不能跟null比较)
SELECT * from stu WHERE class_id IS null;
SELECT * from stu WHERE class_id IS NOT null;
-- class_id如果是null则显示未未分配
SELECT sname,if(class_id,class_id,'未分配') from stu;
SELECT sname,IFNULL(class_id,'未分配') from stu;


-- 排序与数据区间筛选
-- 升序排序
SELECT sname,age FROM stu ORDER BY age asc;
SELECT * FROM stu ORDER BY class_id asc,age asc;
-- 降序排序
SELECT * FROM stu ORDER BY id DESC;
-- 通过LIMIT显示某个范围的数据
SELECT * FROM stu ORDER BY id DESC LIMIT 1,3;

-- 把两个sql语句合并查询
SELECT age FROM stu WHERE class_id = 2 and age IS NOT NULL ORDER BY age ASC LIMIT 1;
SELECT * FROM stu WHERE age =(SELECT age FROM stu WHERE class_id = 2 and age IS NOT NULL ORDER BY age ASC LIMIT 1);
```

## 更新与删除数据技巧

```sql
-- 更新某条记录中的数据
UPDATE stu SET class_id = 2 WHERE class_id IS NULL;
UPDATE stu SET class_id = 1 WHERE age < 20;
UPDATE stu SET age = age + 10 WHERE class_id = 1 AND age < 20;

-- 删除数据操作
DELETE FROM stu WHERE age<30 AND class_id IS null;
DELETE FROM stu ORDER BY id DESC LIMIT 2;

-- 插入数据
INSERT INTO stu set sname = '小盾', age=22,class_id=3;
INSERT INTO stu (sname,age,class_id) VALUES('小明',22,1),('张三',18,null);
```

## MySql 数据表维护

```sql
-- 修改表名
ALTER TABLE stu RENAME stus;
RENAME TABLE stus TO stu;
-- 备份表(没有主键)
CREATE TABLE stu_bak SELECT * FROM stu;
-- 修改表的字符编码
ALTER TABLE stu_bak charset gbk;
-- 删除所有数据(速度比较慢)
DELETE FROM stu_bak;
-- 删除所有数据(速度比较快)
TRUNCATE stu2;
-- 删除表
DROP TABLE IF EXISTS stu_bak;

-- 改变字段属性
ALTER TABLE stu2 MODIFY sname VARCHAR(50) NOT null;
-- 改变字段的名称及属性
ALTER TABLE stu2 CHANGE sname name CHAR(30) NOT null;
-- 添加字段
ALTER TABLE stu2 ADD sex SMALLINT DEFAULT null;
-- 添加字段并控制字段的顺序
ALTER TABLE stu2 ADD email VARCHAR(50) DEFAULT null AFTER id;
-- 添加字段并把它放在第一位
ALTER TABLE stu2 ADD qq VARCHAR(30) DEFAULT null FIRST;
-- 删除表字段
ALTER TABLE stu2 DROP qq;
```

## 数据表组件的管理

```sql
-- 删除主键
ALTER TABLE stu2 DROP PRIMARY KEY;
-- 添加主键
ALTER TABLE stu2 ADD PRIMARY KEY (id);
-- 添加自增列
ALTER TABLE stu MODIFY id INT NOT null AUTO_INCREMENT;

-- 复制表后添加自增和主键
CREATE TABLE stu3 SELECT * FROM stu2;
ALTER TABLE stu3 MODIFY id INT NOT null AUTO_INCREMENT, ADD PRIMARY KEY(id);
```

## 正确使用数据类型(字符串类型)

- 字符串类型使用分析

```sql
-- CHAR 0-255字节 定长字符串
-- VARCHAR 0-65535字节 变长字符串
-- TINYBLOB 0-255字节 不超过255个字符的二进制字符串
-- TINYTEXT 0-255字节 短文本字符串
-- BLOB 0-65535字节 二进制形式的长文本数据
-- TEXT 0-65535字节 长文本数据
-- MEDIUMBLOB 0-16777215字节 二进制形式的中等长度文本数据
-- MEDIUMTEXT 0-16777215字节 中等长度文本数据
-- LONGBLOB 0-4294967295字节 二进制形式的极大文本数据
-- LONGTEXT 0-4294967295字节 极大文本数据


-- char类型:是定长类型，比如定义了20长度的char 类型，只存一个字符也点20个长度，好处是处理速度
-- 快，缺点是空间占用大，把手机号、邮箱、密码等设置为char类型是不错的选择。

-- varchar类型与char相反，点用空间受内容影响，可以把文章标题、介绍等设置为varchar类型更合适。
```

- 字符集的处理

```sql
-- 查看系统支持的字符集
SHOW CHARACTER SET;
```

- 校对规则使用

```sql
-- 影响字符串的排序还有比较
-- utf8-bin 区分大小写
-- utf8-general_ci 不区分大小写
```

- 常用字符串处理函数的使用

```sql
-- 字符串的截取
SELECT LEFT(cname,2),RIGHT(cname,2),MID(cname,2,1),MID(cname,2) FROM class;
-- 替换操作
UPDATE class SET cname= CONCAT('HTTP-',MID(cname,2)) WHERE id>=2;
-- 截取字符串
SELECT SUBSTRING(cname,2) FROM class;
-- 获取字符串的长度
SELECT CHAR_LENGTH(cname) FROM class;
-- 超过特定位数则进行截取并连接
SELECT IF(CHAR_LENGTH(cname)>3,CONCAT(LEFT(cname,2),'......'),cname) as cname FROM class;
```

- 正则表达式在 mysql 中的使用

```sql
-- 正则表达式的使用
SELECT * FROM class WHERE cname REGEXP '^.h';
SELECT * FROM class WHERE description REGEXP 'PHP|MYSQL';
-- %表示模糊匹配多个
SELECT * FROM class WHERE cname like '%p%';
-- _号表示匹配一个
SELECT * FROM class WHERE cname like '_t%';
```

## 正确使用数据类型(数值类型)

```sql
-- tinyint(m) 1个字节范围(-128~127)
-- smallint(m) 2个字节范围(-32768-32767)
-- mediumint(m) 3个字节范围(-8388608~8388607)
-- int(m)  4个字节范围(-2147483648~2147483647)
-- bigint(m) 8个字节范围(+-9.22*10的18次方)

-- ● 取值范围如果加了unsigned,则最大值翻倍，如tinyint unsigned的取值范围为(0~256)。
-- ● m的含义不是允许字段的长度，而是显示长度，在为字段设置zerofill 时有效。


ALTER TABLE class ADD status TINYINT;
ALTER TABLE class ADD stat TINYINT UNSIGNED;
-- ZEROFILL不够5位的时候会自动补0
ALTER TABLE class ADD numstat int(5);
ALTER TABLE class ADD numfill int(5) ZEROFILL;
```

- 浮点数和定点数在 mysql 中的使用

```sql
-- float: 2^23 = 8388608， -共七位，这意味着最多能有7位有效数字，但绝对能保证的为6位，即float的精度为6-7位有效数字
-- double: 2^52 = 4503599627370496, - 共16位，double的精度为15~16位
-- .浮点型在数据库中存放的是近似值，而定点类型在数据库中存放的是精确值
-- decimal(m,d) 参数m<65是总个数，d<30且 d<m是小数位
-- 对货币等对精度敏感的数据，应该用定点数decimal存储
```

## EMUM 枚举类型的使用

```sql
-- 适用于单选类型,1对应男,2对应女
ALTER TABLE stu3 MODIFY sex ENUM('男','女') DEFAULT NULL;
INSERT INTO stu3 (name,class_id,sex,age) VALUES('李月',1,'女',11),('小江',2,1,12),('小红',2,2,13),('小赵',1,'男',14);
SELECT name,IF(sex=1,'男同学','女同学') as sex2,sex FROM stu3 WHERE sex='女';
```

## SET 多选值操作

```sql
CREATE TABLE article (id INT PRIMARY KEY AUTO_INCREMENT,title VARCHAR(100) NOT NULL,status TINYINT(4) DEFAULT 1);
-- 设置set多选值
ALTER TABLE article ADD flag SET('推荐','置顶','热文','图文');
-- 插入数据
INSERT INTO article (title,flag) VALUES('后盾人','推荐,置顶,热文');
-- 数据的查找
SELECT * FROM article WHERE FIND_IN_SET('推荐',flag);
SELECT * FROM article WHERE flag LIKE '%置顶%';
SELECT * FROM article WHERE flag = '推荐,置顶';
```

## 二进制模糊匹配 SET 类型

```sql
-- 推荐  0001   1
-- 置顶  0010   2
-- 热门  0100   4
-- 图文  1000   8
SELECT * FROM article WHERE flag & 10;
```

## MySql 日期高级玩法

```sql
-- 日期时间类型/占用空间/日期格式/最小值/最大值/零值表示
DATETIME
-- DATETIME 8 bytes YYY-MM-DD HH:MM:SS 1000-01-01 00:00:00 9999-12-31 23:59:59 0000-00-00 00:00:00
TIMESTAMP
-- TIMESTAMP 4 bytes YYYY-MM-DD HH:MM:SS  1970-01-01 08:00:01 2038-01-19 03:14:07 00000000000

DATE
-- DATE 4bytes YYYY-MM-DD 1000-01-01 9999-12-31 0000-00-00

TIME
-- TIME 3bytes HH:MM:SS -838:59:59 838:5959  00:00:00

YEAR
-- YEAR 1bytes YYYY 1901 2155 0000


-- ● Mysq|保存 日期格式使用YYYY-MM-DD HH:MM:SS的ISO 8601标准
-- ● 向数据表储存日期与时间必须使用ISO格式

-- 修改字段为日期类型
ALTER TABLE stu ADD birthday DATETIME DEFAULT NULL;
-- ALTER TABLE stu change brithday birthday datetime DEFAULT NULL;
UPDATE stu set birthday="1988-1-2 2:4:5" WHERE id=1;
UPDATE stu set birthday="1991-10-12 20:14:15" WHERE id=2;
UPDATE stu set birthday="1994-1-12 15:4:16" WHERE id=3;
UPDATE stu set birthday="2003-12-2 5:14:6" WHERE id=4;
UPDATE stu set birthday="2007-8-21 23:59:59" WHERE id=5;

-- 日期查询格式化语句
SELECT sname,DATE_FORMAT(birthday,'%Y年%m月%d日 %h:%i:%s') from stu;
-- 查询格式化日期时分秒
SELECT sname , TIME_FORMAT(birthday,'%h:%i:%s') from stu;

-- 添加update_at字段在内容发送改变的时候更新当前的时间戳
ALTER TABLE stu ADD update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP;
UPDATE stu SET sname = '赵小四' WHERE id=2;
```

- 时间处理函数的使用

```sql
-- 获取日期的时分秒
SELECT YEAR(birthday),MONTH(birthday),DAY(birthday),HOUR(birthday),MINUTE(birthday),SECOND(birthday) FROM stu;
-- 获取当前日期和时间
SELECT now(),CURRENT_DATE(),CURRENT_TIME();
-- 查询现在是一年中的第几条
SELECT DAYOFYEAR(NOW());
-- 查询时1月中的第几天
SELECT DAYOFMONTH(NOW());
-- 查询时一周中的第几天 星期日是1 星期六是7
SELECT DAYOFWEEK(NOW());
-- 查询现在是周几 0-周一
SELECT WEEKDAY(NOW());

-- 创建一个文章表
CREATE TABLE article (id INT PRIMARY KEY AUTO_INCREMENT,title VARCHAR(100) NOT NULL,publish_time DATETIME DEFAULT NULL,status TINYINT DEFAULT 1);
-- 插入相关数据
INSERT INTO article (title,status) VALUES('PHP很好学习,功能强大',1);
INSERT INTO article (title,publish_time,status) VALUES('MYSQL系统课程正在更新','2019-10-22',0);
-- 查询发布时间小于当前时间并且处于未发送状态的文章
SELECT * FROM article WHERE status = 0 AND publish_time < NOW();
-- 把未发送状态的文章改为发送状态
UPDATE article SET status = 1 WHERE status = 0 AND publish_time < NOW();
```

- 日期与时间差值计算技巧

```sql
-- 设置@time变量
SET @time = TIME(NOW());
-- 查询当前的秒数
SELECT @time;
-- 把当前的秒数转换为时间
SELECT TIME_TO_SEC(@time),SEC_TO_TIME(TIME_TO_SEC(@time));
-- 查询已经过了多少天
SELECT TO_DAYS(NOW());
-- 转换为当前日期
SELECT TO_DAYS(NOW()),FROM_DAYS(TO_DAYS(NOW()));
-- 查询出生日期距离现在多少天
SELECT DATEDIFF(NOW(),birthday) FROM stu;
-- 查询两个时间的差值
SELECT TIMEDIFF(TIME(NOW()),TIME(birthday)) from stu;
-- 查询从出生到现在距离多少天
SELECT TIMESTAMPDIFF(day,birthday,NOW()) FROM stu;
```

- 日期操作查询入门技巧

```sql
-- 查询某个时间段出生的人数
SELECT * FROM stu WHERE birthday BETWEEN '1990-01-01' AND '1999-12-31';
-- 查询年龄最小的学生(通过子查询)
SELECT * FROM stu WHERE birthday = (SELECT birthday FROM stu ORDER BY birthday DESC LIMIT 1);
-- 查询1班和2班中1991年出生的学生
SELECT * FROM stu WHERE class_id in(1,2) and YEAR(birthday)='1991';
-- 统计各个班级中90后的数量
SELECT COUNT(id),class_id FROM stu WHERE YEAR(birthday) >=1990 AND YEAR(birthday) <=2000 GROUP BY class_id;
-- 统计90后最喜欢的班级
SELECT COUNT(id) as total,class_id FROM stu WHERE YEAR(birthday) >=1990 AND YEAR(birthday) <=2000 GROUP BY class_id ORDER BY total DESC LIMIT 1;

-- 查询现在的学生都多少岁了
SELECT TIMESTAMPDIFF(YEAR,birthday,NOW()) FROM stu;
-- 大于20岁的女生最喜欢上的班级
SELECT class_id FROM stu WHERE sex = '女' AND TIMESTAMPDIFF(YEAR,birthday,NOW()) > 20 GROUP BY class_id ORDER BY COUNT(id) DESC LIMIT 1;
```

- 日期时间计算妙用

```sql
-- 当前时间加8个小时
SELECT ADDTIME(NOW(),'08:00:00');
SELECT TIMESTAMP(NOW(),'08:00:00');

-- 查询10天以后的日期(可以是负数)
SELECT DATE_ADD(NOW(),INTERVAL 10 DAY);
-- 查询10年以后的日期(可以是负数)
SELECT DATE_ADD(NOW(),INTERVAL 10 YEAR);
-- 查询10小时22分钟后的日期
SELECT DATE_ADD(NOW(),INTERVAL "10:22" HOUR_MINUTE);
-- 获取3天8小时之后的日期
SELECT DATE_ADD(NOW(),INTERVAL "3 8" DAY_HOUR);

-- 查询计算之前的日期(获取3天8小时之前的日期)
SELECT DATE_SUB(NOW(),INTERVAL "3 8" DAY_HOUR);
```

- 月初与月末日期计算技巧

```sql
-- 获取这个月的最后一天
SELECT LAST_DAY(NOW());
-- 动态获取月初的日期
SELECT DATE_SUB(NOW(),INTERVAL DAYOFMONTH(NOW())-1 DAY);
```

- 日期月份计算技巧

```sql
-- 获取下个月的第一天
SELECT DATE_ADD(LAST_DAY(NOW()),INTERVAL 1 DAY);
-- 获取上个月的最后一天
SELECT LAST_DAY(DATE_SUB(NOW(),INTERVAL 1 MONTH));
```

- 超灵活星期几管理

```sql
-- 获取星期二的日期
SELECT DATE_ADD(NOW(),INTERVAL 3-DAYOFWEEK(NOW()) DAY);
SELECT DATE_ADD(NOW(),INTERVAL 1-WEEKDAY(NOW()) DAY);

-- 获取三周之前的星期二
SELECT DATE_SUB(DATE_ADD(NOW(),INTERVAL 1-WEEKDAY(NOW()) DAY),INTERVAL 21 DAY);
```

- 按月考勤打卡管理

```sql
-- 查询这个月迟到两次的学生编号
SELECT stu_id,COUNT(id) FROM stu
WHERE TIME(created_at)>'08:30:00'
AND DATE(created_at) > DATE(DATE_SUB(NOW(),INTERVAL DAYOFMONTH(NOW())-1 DAY))
GROUP BY stu_id
HAVING count(id) >=2;
```

## MYSQL 统计汇总摘要高效使用攻略

- mysql 的排序方法

```sql
-- 升序排序
SELECT * FROM stu ORDER BY sex ASC;
-- 降序排序
SELECT * FROM stu ORDER BY sex DESC;
SELECT * FROM stu WHERE sex = 2 ORDER BY id DESC LIMIT 1;
-- 多个字段参与排序
SELECT * FROM stu ORDER BY sex DESC , age ASC;
```

- 随机排序使用技巧

```sql
-- 随机排序
SELECT * FROM stu ORDER BY RAND() DESC LIMIT 1;
-- 按月份降序排序
SELECT sname,birthday,MONTH(birthday) as m FROM stu ORDER BY m DESC;
-- 按月份降序排序
SELECT sname,birthday,MID(birthday,6,2) as m FROM stu
WHERE birthday is not null
ORDER BY m;
-- 查询年龄最大的90后
SELECT * FROM stu WHERE YEAR(birthday)>'1990' ORDER BY birthday ASC LIMIT 1;
```

- 自定义字段排序

```sql
-- z在第三位出现所有查询结果是3
SELECT FIELD('z','f','a','z','c');
SELECT sname,LEFT(sname,1) as s FROM stu ORDER BY FIELD(s,'小','李','刘') DESC;
```

- COUNT 统计使用技巧

```sql
-- 统计所有学生的记录
SELECT COUNT(*) FROM stu;
-- 统计所有的女学生
SELECT COUNT(*) FROM stu WHERE sex = '女';
-- 统计class_id不为null的记录
SELECT COUNT(*) FROM stu WHERE class_id IS NOT NULL;
-- 统计class_id不为null的记录
SELECT COUNT(class_id) FROM stu;
```

- MIN & MAX 最小值和最大值的使用

```sql
-- 查询最小的班级编号
SELECT MIN(class_id) from stu;
-- 查询年龄最小的学生
SELECT YEAR(MAX(birthday)) FROM stu;
```

- ONLY_FULL_GROUP_BY 使用技巧

```sql
-- 在GROUP BY 中使用额外字段
-- 这样的查询语句执行会报错
SELECT MIN(class_id),sex from stu;
-- 通过下面语句的执行后就可以解决上面的查询语句报错的问题
SET sql_mode=(SELECT REPLACE(@@sql_mode,'ONLY_FULL_GROUP_BY',''));
```

- SUM 和 AVG 的实际使用案例

```sql
SELECT SUM(class_id) FROM stu;
SELECT AVG(class_id) FROM stu;
-- 获取class_id小于平均数的记录
SELECT * FROM stu WHERE class_id < (SELECT AVG(class_id) FROM stu);
--  获取学生的平均年龄
SELECT ROUND(AVG(TIMESTAMPDIFF(YEAR,birthday,NOW()))) AS age FROM stu;
```

- DISTINCT 去除重复数据

```sql
-- 查询不重复的班级
SELECT DISTINCT class_id FROM stu WHERE class_id IS NOT NULL;
-- 查询班级和姓名不重复的数量
-- SELECT COUNT(DISTINCT class_id,sname) FROM stu WHERE class_id IS NOT NULL;
```

- GROUP 分组统计 SQLMODE 与查询技巧

```sql
-- 统计有女同学的班级进行分组显示(每个班级有几个女同学)
SELECT COUNT(class_id),class_id from stu WHERE class_id IS NOT NULL AND sex = '女' GROUP BY class_id;
-- 查询每个班级中年龄最小的同学
SELECT * FROM stu WHERE birthday IN (SELECT MIN(birthday) FROM stu GROUP BY class_id);
```

- 分组筛选 HAVING 的使用规则

```sql
-- 统计班级中有多少个男生多少个女生并进行排序
SELECT COUNT(*),class_id,sex FROM stu
WHERE class_id IS NOT NULL
GROUP BY class_id,sex
ORDER BY class_id DESC;

-- 统计学生人数超过两个人的班级
SELECT class_id , COUNT(*) as c FROM stu GROUP BY class_id HAVING c>=2;
```

## MYSQL 多表操作

- 多表关系

```sql
-- 一对一关系
-- 学生班级表
-- 一个学生只能有一个性别

-- 一对多的关系
-- 一个学生可以有多个课程

-- 多对多的关系
-- 学生课程表格
-- 一个学生可以学习多个课程
-- 一个课程也可以被多个学生学习
-- 通过建立一个学生-课程中间表来实现一对多的关系
```

- 笛卡尔积与多表查询注意细节

```sql
-- 多表查询
SELECT s.sname,c.cname
FROM stu AS s,class AS c
WHERE s.class_id = c.id;
```

- 多表操作分组查询实例

```sql
-- INNER JOIN  ... ON 多表查询
SELECT * FROM stu AS s INNER JOIN class AS c ON s.class_id = c.id;

-- 只有在stu_info表设置学生信息的数据才可以被查出来
SELECT * FROM stu AS s INNER JOIN stu_info AS si ON s.id = si.stu_id;

-- 多表关联
SELECT c.id,COUNT(*) FROM stu AS s INNER JOIN class as c ON s.class_id = c.id
INNER JOIN article AS a ON s.id = a.stu_id GROUP BY c.id;
```

- 多表分组多表查询操作

```sql
-- 多个表关联查询
SELECT * FROM stu AS s
INNER JOIN class AS c
INNER JOIN article AS a
ON s.class_id = c.id AND s.id = a.stu_id;

-- 查询大学班级中所有女生发表的文章
SELECT a.title FROM stu AS s
INNER JOIN class AS c
INNER JOIN article AS a
ON s.class_id = c.id AND s.id = a.stu_id
WHERE s.sex = '女';

-- 那个班级发表的文章数量超过2篇
SELECT c.id,COUNT(*) AS total FROM stu AS s
INNER JOIN class AS c
INNER JOIN article AS a
ON s.class_id = c.id AND s.id = a.stu_id
GROUP BY c.id
HAVING total >= 2;

-- 每个班级的文章平均点击数与总点击数
SELECT c.id,SUM(a.click),AVG(a.click) FROM stu AS s
INNER JOIN class AS c
INNER JOIN article AS a
ON s.class_id = c.id AND s.id = a.stu_id
GROUP BY c.id
```

- 外链接在多表查询中的使用

```sql
-- 把左侧的表全部拿出来
-- 查询没有设置qq信息的同学
SELECT * FROM stu AS s
LEFT JOIN stu_info AS i
ON s.id = i.stu_id
WHERE i.qq IS NULL;

-- 查询没有发布文章的同学
SELECT * FROM stu AS s
LEFT JOIN article AS a
ON s.id = a.stu_id
WHERE a.id IS NULL;

-- 查询那个班级没有学生(右查询)
-- 右表班级的数据会全部出来
SELECT * FROM stu AS s
RIGHT JOIN class AS C
ON s.class_id = c.id;
WHERE s.id IS NULL;

-- 把没有分配班级的学生全部取出来(右查询)
SELECT s.sname,IF(s.class_id,c.cname,'无') AS cname FROM class AS c
RIGHT JOIN stu AS s
ON c.id = s.class_id;
```

- 自链接操作使用技巧

```sql
-- 查找与某个同学在同一个班级的学生(关联同一张表)
SELECT * FROM stu AS s1
INNER JOIN stu AS s2
ON s1.class_id = s2.class_id
WHERE s1.sname='后盾人'
AND s2.sname != '后盾人';
```

- 多表查询之多对多关系

```sql
-- 获取某个学生学生的课程(学生表stu,课程表lesson,学生与课程关联中间表lesson_id,班级表class)
SELECT l.name,s.sname FROM stu AS s
INNER JOIN stu_lesson AS sl
ON s.id = sl.stu_id
INNER JOIN lesson AS l
ON l.id = sl.lesson_id
WHERE s.sname = '后盾人';

-- 那个班的同学最喜欢学习PHP
SELECT c.id,COUNT(*) AS total FROM class AS c
INNER JOIN stu AS s
ON c.id = s.class_id
INNER JOIN stu_lesson AS sl
ON s.id = sl.stu_id
INNER JOIN lesson AS l
ON sl.lesson_id = l.id
WHERE l.name = 'PHP'
GROUP BY c.id
ORDER BY total DESC
LIMIT 1;
```

- UNION 神奇的多表合并操作

```sql
-- 查询年龄最小和年龄最大的学生
(SELECT * FROM stu WHERE birthday IS NOT NULL ORDER BY birthday ASC LIMIT 1)
UNION
(SELECT * FROM stu WHERE birthday IS NOT NULL ORDER BY birthday DESC LIMIT 1);

-- 最新发表的文章和学生学习的课程组合网站的最新动态
(SELECT CONCAT(s.sname,'发表了：',a.title) AS title FROM article AS a JOIN stu AS s ON s.id =a.stu_id ORDER BY a.id DESC LIMIT 3)
UNION
(SELECT CONCAT(s.sname,'正在学习:',l.name) FROM stu AS s INNER JOIN stu_lesson AS sl ON s.id= sl.stu_id INNER JOIN lesson as l ON l.id = sl.lesson_id LIMIT 3);
```

- 删除多表查询数据

```sql
-- 删除没有选择任何课程的同学
DELETE FROM stu WHERE id IN(
SELECT * FROM( SELECT s.id FROM stu AS s LEFT JOIN stu_lesson AS sl ON s.id = sl.stu_id WHERE sl.lesson_id is NULL) AS s
)

-- 删除没有选择任何课程的同学
DELETE s FROM stu AS s
LEFT JOIN stu_lesson AS sl
ON s.id = sl.stu_id
WHERE sl.lesson_id IS NULL;
```

## Mysql 事务处理与隔离级别

- 选择合适的存储引擎来操作事务

```sql
-- 查询目前用到的数据库引擎
SHOW engines;

-- InnoDB数据库引擎支持事务处理
-- 修改数据表的数据库引擎
ALTER TABLE stu ENGINE = 'InnoDB';
```

- 事务单独开启机制

```sql
-- 事务如果没有最终COMMIT 则只有当前用户才可以看到 数据并没有被写入到硬盘中
-- 开启一个事物 执行多条sql语句
BEGIN;
INSERT INTO stu(sname,class_id,sex) VALUES('刘洁',2,2);
INSERT INTO class(cname) VALUES('研究生');
COMMIT;

-- 也可以使用 START TRANSACTION 来开启一个事物
START TRANSACTION;
INSERT INTO stu(sname,class_id,sex) VALUES('刘洁',2,2);
INSERT INTO class(cname) VALUES('研究生');
COMMIT;

-- 执行ROLLBACK可以在出现异常的时候执行回滚操作
START TRANSACTION;
INSERT INTO stu(sname,class_id,sex) VALUES('刘洁',2,2);
INSERT INTO class(cname) VALUES('研究生');
ROLLBACK;
```

- 全局事务使用方法

```sql
-- 全局事务开启 开启后每次都必须执行COMMIT才可以提交成功
SET autocommit = 0;
INSERT INTO stu(sname,class_id,sex) VALUES('刘洁',2,2);
COMMIT;
```

- 事务隔离级别与脏读

```sql
-- 隔离级别即是受其他事务影响的程度

-- 读未提交(read-uncommitted)
-- 最低的事务隔离级别，一个事务还没提交时，它做的变更就能被别的事务看到
-- 脏读 + 不可重复读 + 幻读

-- 不可重复读(read-comitted)
-- 保证一个事物提交后才能被另外-个事务读取。另外一个事务不能读取该事物未提交的数据。
-- 不可重复读 + 幻读

-- 可重复读(repeatable-read)
-- 多次读取同一范围的数据会返回第一次查询的快照，即使
-- 其他事务对该数据做了更新修改。事务在执行期间看到的
-- 数据前后必须是一致的。
-- 幻读

-- 串行化(serializable)
-- 事务100%隔离，可避免脏读、不可重复读、幻读的发生。花费最高代价但最可靠的事务隔离级别。


-- 查询当前使用的隔离级别(默认为第三种) REPEATABLE-READ
SELECT @@tx_isolation;

-- 设置隔离级别
-- 用于脏读测试可以设置为读未提交(read-uncommitted)类型
-- 事务a还没提交 事务b就可查询到事物a更改的数据
SET SESSION TRANSACTION ISOLATION LEVEL READ UNCOMMITTED;

```

- 高并发带来的不可重复读的隔离级别设置

```sql
-- 不可重复读
-- 多次读取同一范围的数据会返回第一次查询的快照，其他事务对该数据做了更新修改并不影响该事务的查询接口
-- 即是查询结果不受其他事务影响
```

- 幻读实例操作与隔离级别处理

```sql
-- 1.隔离级别设置为可重复读(repeatable-read)
-- 2.事务a去执行查询操作 此时查询记录为7条
-- 3.事务b去执行插入操作
-- 4.事务a执行查询操作 此时查询记录为7条
-- 5.事务a执行update更新操作, 此时查询的记录为8条(出现了幻读的情况)


-- 串行化(serializable)
-- 必须等a事务处理完毕(已经执行了commit)才会执行b事务
```

## MYSQL 高并发与锁机制

- mysql 事务处理中的表锁

```sql
-- 行级锁(把行锁住)

-- 表级锁(把表锁住)
```

- 索引对表锁的影响有多大

```sql
-- 如果事务a修改的数据不是通过索引列匹配到的 则 事务b修改数据时候整张表都会被锁定 必须等事务a提交后才可以
```

- 查询范围对 Mysql 锁的影响

```sql
-- 如果事务b修改的数据在事务a修改数据的范围之内则会被锁定 必须等待事务a完成才能进行修改操作
SET autocommit =0;
UPDATE goods SET num = 500 WHERE id>1 AND id<5;
COMMIT;
```

- 高并发下商城秒杀悲观锁

```sql
-- 查询语句加上FOR UPDATE 则事务a在查询的时候 事务b执行查询操作需要等待
SET autocommit =0;
SELECT * FROM goods WHERE id=1 FOR UPDATE;
UPDATE goods SET num = 0 WHERE id = 1;
COMMIT;
```

- 使用乐观锁控制高并发下的商品下单

```sql
-- 乐观锁
-- 事务a 购买完商品后会把版本号version字段自增 事务a如果同时操作还是用之前的版本号则不能操作下单成功
SET autocommit =0;
SELECT * FROM goods WHERE id=1;
UPDATE goods SET num = num-100,version=version +1 WHERE id = 1 AND version = 0;
COMMIT;
```

- 读锁与写锁

```sql
-- 读锁操作
-- 锁定goods表
LOCK TABLE goods READ;
-- 事务a 和 事务b 查询goods表此时可以查询
SELECT * FROM goods;
-- 事务a修改goods表数据会发现报错 无法修改
-- 事务b修改goods表则会发生阻塞
INSERT INTO goods (name,num) VALUES('苹果手机',100);
-- 解锁
-- 解锁后事务b可以正常修改数据
UNLOCK TABLES;


-- 写锁操作
-- 事务a锁定goods表
LOCK TABLE goods WRITE;
-- 事务a查询goods表此时可以查询
-- 事务b 查询goods表此时会发生阻塞
SELECT * FROM goods;
-- 事务a修改goods表数据可以修改
-- 事务b修改goods表数据会发生阻塞
INSERT INTO goods (name,num) VALUES('苹果手机',100);
-- 解锁
-- 解锁后事务b可以正常修改数据
UNLOCK TABLES;
```

- 使用表锁运用高并发下单

```sql
-- 可以一次锁定多张表 (因为锁定的时候整张表 所以性能会比较差)
LOCK TABLE goods WRITE,stu WRITE;
UPDATE goods SET num = num - 200 WHERE id = 1;
-- 写单 发送 扣除余额
UNLOCK TABLES;
```

## MySql 中的外键约束

- 外键约束的前期注意事项

```sql
-- InnoDB支持外接约束关联
-- 关联的外交和主键的类型必须一致
-- 在那个表定义外键那个表就是子表
```

- 新表创建外键约束详解

```sql
-- 创建stu2表
CREATE TABLE stu2(
	id INT PRIMARY KEY AUTO_INCREMENT,
	sname CHAR(30) NOT NULL,
	class_id INT DEFAULT NULL,
  -- 创建外键约束关联字段
	CONSTRAINT stu2_class
  -- 指定外键
	FOREIGN KEY (class_id)
  -- 关联class表中的字段
	REFERENCES class(id)
  -- 指定主表(class) 删除后的操作 目前为删除对应stu2中的记录
	ON DELETE CASCADE
) ENGINE=INNODB DEFAULT CHARSET=utf8; -- 指定数据库引擎和数据库编码
```

- 对已经存在的表添加与删除外键约束

```sql
-- 给表添加外键约束
ALTER TABLE stu ADD
CONSTRAINT stu1_class
FOREIGN KEY (class_id)
REFERENCES class(id)
ON DELETE CASCADE;

-- 删除外键
ALTER TABLE stu DROP FOREIGN KEY stu1_class;

-- 重新添加外键约束
ALTER TABLE stu ADD
CONSTRAINT stu_class
FOREIGN KEY (class_id)
REFERENCES class(id)
ON DELETE CASCADE;
```

- ON DELETE 多种关联动作

```sql
-- CASCADE 如果主表记录被删除 则 子表记录会跟着删除
ALTER TABLE stu ADD
CONSTRAINT stu_class
FOREIGN KEY (class_id)
REFERENCES class(id)
ON DELETE CASCADE;

-- SET NULL 如果主表记录被删除 则 子表记录对应的值会被设置为null
ALTER TABLE stu ADD
CONSTRAINT stu_class
FOREIGN KEY (class_id)
REFERENCES class(id)
ON DELETE SET NULL;

-- 无动作 NO ACTION,子表有关联记录的时候 主表相关关联记录不可以被删除
ALTER TABLE stu ADD
CONSTRAINT stu_class
FOREIGN KEY (class_id)
REFERENCES class(id)
ON DELETE NO ACTION;

```

- ON UPDATE 关联更新

```sql
-- UPDATE CASCADE 主表中的关联字段发送改变 则子表记录中对应的关联字段也会发生改变
ALTER TABLE stu ADD
CONSTRAINT stu_class
FOREIGN KEY (class_id)
REFERENCES class(id)
ON DELETE NO ACTION
ON UPDATE CASCADE;

-- SET NULL 主表中的关联字段发送改变 则子表记录中对应的关联字段也会设置为null
ALTER TABLE stu ADD
CONSTRAINT stu_class
FOREIGN KEY (class_id)
REFERENCES class(id)
ON DELETE NO ACTION
ON UPDATE SET NULL;


-- 无动作 NO ACTION,子表有关联记录的时候 主表相关关联记录不可以被更改
ALTER TABLE stu ADD
CONSTRAINT stu_class
FOREIGN KEY (class_id)
REFERENCES class(id)
ON DELETE NO ACTION;
ON UPDATE NO ACTION;
```
