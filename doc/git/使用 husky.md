## 使用 husky

- 原理分析

```ts
/**
 * 在安装 husky 的时候，husky会根据 package.json里的配置，
 * 在.git/hooks 目录生成所有的 hook 脚本
 * 如果你已经自定义了一个hook脚本，husky不会覆盖它
 *
 * 从 1.0.0 开始，husky 的配置可以使用
 * .huskyrc、.huskyrc.json、.huskyrc.js 或 husky.config.js 文件
 *
 * hook 拦截
 * 为了阻止提交，pre-commit 脚本必须以非零的退出代码退出。
 * 如果您的提交未被阻止，请检查脚本退出代码。
 *
 * 依赖安装
 * npm install husky --save-dev
 * npm i lint-staged -D
 * npm i -D eslint eslint-loader eslint-plugin-import babel-eslint eslint-plugin-flowtype
 * npm i prettier -D
 */
```

- 使用

```ts
/**
  * husky是一个npm包，安装后，可以很方便的在package.json配置git hook 脚本
  * 在后续的每一次git commit 之前，都会执行一次对应的 hook 脚本npm run lint
  */
"scripts": {
    "lint": "eslint src"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run lint"
    }
  },

/**
  * 钩子中执行多个命令
  */
"husky": {
  "hooks": {
    "pre-commit": "echo \"git commit trigger husky pre-commit hook\" && npm run test"
  }
}

/**
  * 喜欢使用数组，建议的方法是在 .huskyrc.js
  */
const tasks = arr => arr.join(' && ')

module.exports = {
  'hooks': {
    'pre-commit': tasks([
      'npm run lint',
      'npm run test'
    ])
  }
}
```

## 配合 lint-staged

```ts
/**
 * lint-staged，一个仅仅过滤出 Git 代码暂存区文件(被 git add 的文件)的工具
 * lint-staged 总是将所有暂存文件的列表传递给任务
 */
// package.json

// 在 git 的待提交的文件中，在 src 目录下的所有 .js .vue 都要执行三条命令
// 将处理过的代码重新 add 到 git 中
"lint-staged": {
  "src/**/*.{js,vue}": [
    "prettier --write",
    "eslint --cache --fix",
    "git add"
  ]
}


/**
  *  husky 的 pre-commit 钩子，将会形成一个自动化工具链
  * 在 commit 之前，将暂存区的内容做一次 代码检查 和 代码美化，然后再添加到暂存区
  */
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
  "src/**/*.{js,vue}": ["prettier --write", "eslint --cache --fix", "git add"]
}

/**
  * 从 v3.1 开始，您现在可以使用不同的方式进行 lint-staged 配置：
  * 1.int-staged 在你的对象 package.json
  * 2..lintstagedrc JSON或YML格式的文件
  * 3.lint-staged.config.js JS格式的文件
  * 4.使用 --config 或 -c 标志传递配置文件
  */

```

## mrm 工具的使用

```ts
/**
 * mrm 是一个自动化工具
 * 它将根据 package.json 依赖项中的代码质量工具来安装和配置 husky 和 lint-staged，
 * 确保在此之前安装并配置所有代码质量工具，如 Prettier 和 ESlint
 */

// 安装 mrm 并执行 lint-staged 任务：
// 将会自动给你安装相关依赖工具，以及相关配置文件
// npm i mrm -D --registry=https://registry.npm.taobao.org
// npx mrm lint-staged
```
