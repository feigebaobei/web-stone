# overview
定义打包时的别名。

# install
`npm install @rollup/plugin-alias --save-dev`

# usage
    alias({
      entries: [
        {
          find: 'src',
          replacement: path)
          // OR place `customResolver` here. See explanation below.
        }
      ],

## options
||||||||
|-|-|-|-|-|-|-|
|customResolver|为单个别名提供单独的模块解析||||||
|entries|||||||

# principle

```
(RollupAliasOptions) => Plugin
Plugin: {name: string; buildStart: (inputOptions) => Promise; resolveId: (importee, importer)=>Promise}
RollupAliasOptions: {find, replacement, customResolve}
```
我还不知道返回的plugin对象如何被rollup使用了。
rollup一定有一个串联起所有插件的“轨道”。
