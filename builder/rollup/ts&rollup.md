# ts & rollup

建议先使用 tsc 命令把 ts 文件编译为 js 文件，再使用 rollup 把 js 文件打包。

## 使用 rollup 打包 ts 项目。多个输出。

创建一个简单的 ts 项目。目录结构如下：

```
<root>
|-- src
    |-- math
        |-- index.ts
    |-- string
        |-- index.ts
    |-- app.ts
|-- typings
|-- package.json
|-- ...
```

在`app.ts`中引入并使用`math/index.ts`/`string/index.ts`  
生成 ts 的配置文件`tsconfig.json`。一般在 ts 项目中必须有它。

```json
{
  "compilerOptions": {
    "target": "es2018",
    "module": "esnext",
    "moduleResolution": "node",
    "noEmitOnError": true,
    "lib": ["es2017"],
    "strict": true,
    "esModuleInterop": false,
    "outDir": "out-tsc",
    "rootDir": "./"
  },
  "include": ["./src/**/*.ts"]
}
```

编辑`rollup.config.js`

```js
// rollup.config.js
import merge from 'deepmerge'
import { createBasicConfig } from '@open-wc/building-rollup'
// 不用预置的配置项，自己编写配置项也行。我在rollup的文档中列出了常用配置项。

const baseConfig = createBasicConfig()

export default merge(baseConfig, {
  input: './out-tsc/src/app.js',
  output: {
    dir: 'dist',
  },
})
```

设置打包脚本

```json
{
  ...
  "scripts": {
    "build": "rimraf dist && tsc && rollup -c rollup.config.js"
    // 删除上一次打包结果，编译，打包。
  },
  ...
}
```

执行打包

```shell
npm run build
```

## 整理代码

```js
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
  input: './out-tsc/src/app.js',
  output: [
    { dir: 'dist1', format: 'cjs' },
    { dir: 'dist2', format: 'esm' },
  ],
  plugins: [nodeResolve()],
}
```

**思路：**  
使用 tsc 把 ts 文件编译为 js 文件。使用 rollup 把 js 文件打包。用于打包的 js 文件可删除。

## 使用 rollup 打包 ts 项目。一个输出。

项目结构同上。修改`rollup.config.js`为：

```js
// import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript'
export default [
  {
    input: ['src/index.ts'],
    output: [
      // 只能有一个输出
      {
        dir: 'dist_esm',
        // entryFileNames: [name].js,
        assetFileNames: '[name]-[hash][extend]',
        chunkFileNames: '[name]-[hash].js',
        format: 'esm',
        sourcemap: true,
        compact: false,
        // plugins: [terser()],
        preserveModules: true, // 保留目录结构
        // preserveModulesRoot: 'src' // 将保留的模块目录结构放在根目录下该路径下
      },
    ],
    plugins: [
      typescript(), // 使其可打包ts文件。会使用tsconfig.json中的compilerOptions配置项
    ],
  },
]
```
