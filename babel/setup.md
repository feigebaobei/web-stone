# setup

快速使用方法。
[官网的 setup](https://babeljs.io/setup.html#installation)  
下面是按使用环境区分的。好多环境我都没用过。

## in the browser

## cli

见前文。

## require hook

## broccoli

## browserify

## brunch

## duo

## grunt

## gulp

## jspm

## make

## msbuild

## requirejs

## rollup

```shell
npm i -D @rollup/plugin-babel @babel/core
```

```js
import babel from '@rollup/plugin-babel'
const config = {
  input: 'src/index.js',
  output: {
    dir: 'dist',
    format: 'esm',
  },
  plugins: [
    babel({
      babelHelpers: 'bundled',
    }),
  ],
}
export default config
```

```json
// babel.config.json
{
  "presets": ["@babel/preset-env"]
}
```

## sprockets

## webpack

```shell
npm i -D babel-loader @babel/core @babel/preset-env
```

```js
// webpack.config.js
{
  module: {
    rules: [
      {
        test: /\.m?js/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ]
  }
}
```

```json
// babel.config.json
{
  "presets": ["@babel/preset-env"]
}
```

## start

## ember

## meteor

## rails

## sails

## ava

## jasmine

## jest

```shell
npm i -D babel-jest
```

```js
// package.json
"script": {
    "jest": "jest",
},
// 我在实际使用中没设置此字段
"jest": {
    "transform": {
        "^.+\\.[t|j]sx?$": "babel-jest"
    }
}
```

```json
// babel.config.json
{
  "presets": ["@babel/preset-env"]
}
```

## karma

## lab

## mocka

## connect

## nodemon

## c# & .net

## node

## ruby

## pug

## webstorm

## node inspector
