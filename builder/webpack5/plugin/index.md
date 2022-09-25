
- [workbox-webpack-plugin](/builder/webpack/plugin/workbox-webpack-plugin.html)
- [title-webpack-plugin](/builder/webpack/plugin/title-webpack-plugin.html)
- [title-webpack-plugin](/builder/webpack/plugin/title-webpack-plugin.html)
- [title-webpack-plugin](/builder/webpack/plugin/title-webpack-plugin.html)
- [title-webpack-plugin](/builder/webpack/plugin/title-webpack-plugin.html)
- [title-webpack-plugin](/builder/webpack/plugin/title-webpack-plugin.html)
- [title-webpack-plugin](/builder/webpack/plugin/title-webpack-plugin.html)

## 基本结构
```js
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
  apply(compiler) {
    compiler.hooks.run.tap(pluginName, (compilation) => {
      console.log('The webpack build process is starting!');
    });
  }
}

module.exports = ConsoleLogOnBuildWebpackPlugin;
```



