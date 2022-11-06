# sequelize 经验笔记

## 模型的构建经验
* 模型名使用复数 字段名用单数(仅为规范)
* 字段名尽量不要和模型名的单复数重复(如果重复在复杂的关联模型下会报错)
* egg-sequelize默认字段为下划线形式
* 并非每个模型都需要指定关联关系，关联关系会影响查询结果，可根据想要的查询结果结果 指定模型的关联关系
``` js
/** 模型中的字段 不能和模型名重复 特别是在使用belongsTo进行关联的时候会报错  */
"use strict";
module.exports = app => {
  const { STRING, INTEGER, DATE , CHAR } = app.Sequelize;

  const Content = app.model.define("contents", {
      content: {
        type: STRING(1000),
        allowNull: false
      },
      user: {
        type: STRING(1000),
        allowNull: false
      },
    },
    {
      charset: "utf8mb4",
      collate: "utf8mb4_bin"
    }
  );


  Content.associate = function() {
    /** 一个内容对应一个用户  
     * 报错 因为User模型名 和 contents表字段user 重复了
     * 报错 因为Users模型名 和 contents表字段user 重复了
    */
    app.model.Content.belongsTo(app.model.User, {
      foreignKey: "user_id"
    });
  };
  return Content;
};

```
* 模型文件使用复数
``` bash
comments.js
contents.js
likes.js
users.js
```

## 运行种子文件
> npx sequelize db:seed:all


