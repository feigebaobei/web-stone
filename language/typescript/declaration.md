# declaration

## declaration 是什么
- 大名叫 typescrip declaration file 存放一些声明文件，类似c/c++的.h头文件。  
- `*.d.ts`文件  

## declaration 是做什么
- 用于命名类型。让ts语言（我感觉应该是vscode）知道数据类型。  


## declaration 如何使用
在编译时检查类型，在编译结果中无声明文件。  

### 使用场景
|||
|-|-|
|全局变量：|通过 `<script>` 标签引入第三方库，注入全局变量|
|npm包：|通过 `import foo from 'foo'` 导入，符合 ES6 模块规范|
|UMD 库：|既可以通过 `<script>` 标签引入，又可以通过 `import` 导入|
|模块插件：|通过 `import` 导入后，可以改变另一个模块的结构|
|直接扩展全局变量：|通过 `<script>` 标签引入后，改变一个全局变量的结构。比如为 String.prototype 新增了一个方法|
|通过导入扩展全局变量：|通过 `import` 导入后，可以改变一个全局变量的结构|

## declaration 如何产生
tsc命令行在编译ts文件时会生`*.d.ts`文件。（自动生成）  
若源文件是js文件，则需要手动写`*.d.ts`文件。（手动编写）  
一般放在src目录下。  

## 如何编写
因使用js包（非ts包）的方式不同，所以定义数据类型的声明文件也不同。大约有6种。如下：  

### 全局变量
当以“`<script>`标签的方式”引入第三方js库（或包）时，在使用该包时需要引入该包的声明文件或定义与该包的数据类型相匹配的全局变量数据类型（这么多数据类型肯定会用到namespace）。  
```ts
// src/jQuery.d.ts
// demo
// declare var 声明全局变量
declare let jQuery: (selector: string) => any;
// declare function 声明全局方法
declare function jQuery(selector: string): any;
// declare class 声明全局类
declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}
// declare enum 声明全局枚举类型
declare enum Direction {
    Up, Down, Left, Right
}
// declare namespace 声明（含有子属性的）全局对象
declare namespace jQuery {
    function ajax(url: string, settings: any): void;
    namespace fn {
        function extend(obj: any): void;
    }
}
// 命名空间可嵌套
// 使用 jQuery.ajax(...)
// 使用 jQuery.fn.ented(...)
// interface 和 type 声明全局类型
interface AjaxSettings {
    method?: 'GET' | 'POST';
    data?: any;
}
// 使用 let s: AjaxSettings = {method: 'GET'}
```
#### 声明合并
当定义多次时会相同标识符的合并到一起。  
类似interface的叠加功能。  
```ts
declare function jQuery(selector: string): any;
declare namespace jQuery{
    function ajax(url: string, settting?: any): void;
}
```

### npm包
使用npm包的方式如下：
```ts
import foo from 'foo'
```
声明npm包的方式：
- 在package.json中设置types或创建`index.d.ts`文件。（也就是使用ts编写）  
- 为已经使用js写好的包创建声明包，提交到`@types`私包中  

#### 使用没有声明文件（*.d.ts）的包
- 自己写声明文件在项目中，如`<root>/src/types/xx/index.d.ts`  
  - 在`tsconfig.json`文件中设置配置项。  
- 

#### 编写
```ts
// types/foo/index.d.ts
// 只声明类型
// 都是局部变量
export const name: string;
export function getName(): string;
export class Animal {
    constructor(name: string);
    sayHi(): string;
}
export enum Directions {
    Up,
    Down,
    Left,
    Right
}
export interface Options {
    data: any;
}
```
```ts
// src/index.ts
// 使用声明文件
import { name, getName, Animal, Directions, Options } from 'foo';

console.log(name);
let myName = getName();
let cat = new Animal('Tom');
let directions = [Directions.Up, Directions.Down, Directions.Left, Directions.Right];
let options: Options = {
    data: {
        name: 'foo'
    }
};
```

#### 语法
|||
|-|-|
|export|导出变量|`export const name: string`|
|export namespace|导出（含有子属性的）对象|`export namespace foo {const name: string}`|
|export default|es6默认导出|`export default function foo(): string;`|
|export =| commonjs导出模块。在commonjs规范中使用。|`export.bar = bar``module.exports = foo`|

### umd库
符合umd规范的库有2种引入方式：1. `<script>` 标签引入。2. `import` 导入.  

需要声明局部变量和全局变量。  
```ts
// types/xxx/index.d.ts
export as namespace foo; // commonjs规范导出
export = foo // commonjs规范导出
declare function foo(): string // esm规范导出
declare namespace foo{ // esm规范导出
    const bar: number;
}
```

### 模块插件
使用import引入一个模块插件。此时模块的声明文件中无此插件的数据类型。需要新增数据类型，即“扩展原有模块”
```ts
// types/xxx/index.d.ts
import * as moment from 'moment'
declare module 'moment' {
    export function foo(): moment.CalendarKey;
}
```
```ts
import * as moment from 'moment'
import 'moment-plugin';
moment.foo();
```

### 引入依赖
```ts
// types/xxx/index.d.ts
import * as moment from 'moment' // 引入另一个声明文件中的类型
declare module 'moment' {
    export function foo(): moment.CalendarKey;
}

// or
/// <reference types="jquery">
declare function foo(options: JQuery.AjaxSettings): string;
// 使用： foo({})
```

### 拆分 & 合并
```ts
// types/xx/index.d.ts
/// <reference types="sizzle">
/// <reference types="JQueryStatic.d.ts">
/// <reference types="JQuery.d.ts">
/// <reference types="misc.d.ts">
/// <reference types="legacy.d.ts">
export = jQuery;
```

## 发布声明文件
1. 写好声明文件。
2. 测试。
3. 发布到`@types`中。

