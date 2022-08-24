# overview
以一个最基本的demo展示rollup的功能/用法。
# init project
```
mkdir exRollup
cd exRollup
npm init
npm i -d rollup
npm i -d rollup-plugin-json
```
# 编辑package.json

```
{
  ...
  "scripts": {
  	...
    "build:cjs": "rollup -c ./config/rollup.config.cjs.js",
    "build:esm": "rollup -c ./config/rollup.config.esm.js",
    "build:iife": "rollup -c ./config/rollup.config.iife.js",
    "build:umd": "rollup -c ./config/rollup.config.umd.js",
    "build": "npm run build.cjs & npm run build:esm & npm run build:iife & npm run build:cmd"
  }
}
```
# 编辑配置文件
本示例中有4个配置文件。分别用于生成`commonjs`规范代码/`esm`规范代码/立即执行代码/`umd`规范代码。
```
// rollup.config.cjs.js
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.cjs.js',
    format: 'cjs'
  },
  plugins: [ json() ]
};
```
```
// rollup.config.esm.js
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.esm.js',
    format: 'esm'
  },
  plugins: [ json() ]
};
```
```
// rollup.config.iife.js
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.iife.js',
    format: 'iife'
  },
  plugins: [ json() ]
};
```
```
// rollup.config.umd.js
import json from 'rollup-plugin-json';

export default {
  input: 'src/index.js',
  output: {
    file: 'dist/bundle.umd.js',
    format: 'umd'
  },
  plugins: [ json() ]
};
```
# 编辑代码
```
// src/foo.js
export default function (a, b) {
	return a + b
}
```

```
// src/index.js
import {version} from '../package.json'
import add from './foo.js'
export default function () {
	console.log(`version: ${version}`)
}
export let sum = function (a, b) {
	return add(a, b)
}
```

# 执行打包
```
npm run build
```


