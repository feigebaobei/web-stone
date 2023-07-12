# 环境变量

## 内置环境变量

```js
import.meta.env.MODE // 应用运行的模式
import.meta.env.BASE_URL // 基本url.  base
import.meta.env.PROD // 是否是生产环境
import.meta.env.DEV // 是否是开发环境
import.meta.env.SSR // 是否运行在server上
```

## `.env`文件

```shell
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略
```

mode 是此环境文件的名称。

常用的环境变量名称

```
.env
.env.production
.env.test
.env.development
```

```
# 定义
# 必须以VITE_开头。否则不会被vite处理。
VITE_SOME_KEY=123
# $必须被转义
VITE_KEY2=a\$b
```

使用环境变量

```js
console.log(import.meta.env.VITE_SOME_KEY)
```

使用环境文件

```shell
vite build --mode development
```

## 环境文件 & 类型

`env.d.ts`

```ts
/// <reference types="vite/client">
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // ...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
```

## html 环境变量替换

```html
<p>str %VITE_API_URL%</p>
```
