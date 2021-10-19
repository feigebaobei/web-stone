# gulp

## overview
> 此包作者的出发点是批量化、自动化。
> 任务式的处理工具，不太算是打包器。
> 功能单一，使用简单。
> gulp命令执行的文件是`<root>/gulpfile.js`
> 这是一个任务执行器。在任务中可以定义好多东西。如定义打包等。
> 不推荐使用gulp的注册器

### feature
- 支持公开、私有任务。
- 总是异步执行任务。

## install
`npm i gulp`

## usage
在终端中执行`gulp`会运行`gulpfile.js`
```
const gulp = require('gulp');
// or
// import gulp from 'gulp';
// TODO: DEMONSTRATE API
```
### tast
||public|private|||
|-|-|-|-|-|
||公有任务|私有任务|||
||从gulpfile文件中输出|未从gulpfile文件中输出|||
||可被`gulp`执行|不可被`gulp`执行|||
|||通常用于`series() / parallel()`|||

```
// 任务可返回cb/stream/promise/event emitters/child processes/observables
// return a cb
function callbackError(cb) {
  // `cb()` should be called by some async work
  cb(new Error('kaboom'));
}
exports.default = callbackError;
// return a stream
const { src, dest } = require('gulp');
function streamTask() {
  return src('*.js')
    .pipe(dest('output'));
}
exports.default = streamTask;
// return a promise
function promiseTask() {
  return Promise.resolve('the value is ignored');
}
exports.default = promiseTask;
// return an event emitter
const { EventEmitter } = require('events');
function eventEmitterTask() {
  const emitter = new EventEmitter();
  // Emit has to happen async otherwise gulp isn't listening yet
  setTimeout(() => emitter.emit('finish'), 250);
  return emitter;
}
exports.default = eventEmitterTask;
// return a child process
const { exec } = require('child_process');
function childProcessTask() {
  return exec('date');
}
exports.default = childProcessTask;
// return an observable
const { Observable } = require('rxjs');
function observableTask() {
  return Observable.of(1, 2, 3);
}
exports.default = observableTask;
// using async / await
const fs = require('fs');
async function asyncAwaitTask() {
  const { version } = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(version);
  await Promise.resolve('some result');
}
exports.default = asyncAwaitTask;
```

### 注册器
功能：
- 插入到任务系统后可提供共享的任务或功能类参数。
官网就是坑。不建议使用gulp。它已经很久没更新了。官网没说清如何使用注册器。论坛中的文章也没提到注册器用法，可能他们也不知道如何使用。
```
// TestRgistry.js
// 使用构造函数方式
let util = require('util')
let DefaultRegistry = require('undertaker-registry');
function TestRegistry() {
    DefaultRegistry.call(this)
}
util.inherit(TestRegistry, DefaultRegistry)
TestRegistry.prototype.init = function(gulpInst) {
    gulpInst.tesk('taskName', function () {
        // ...
    })
}
module.exports = TestRegistry
// 无法使用class方法定义
// usage
let TestRegistry = require('./TestRegistry.js')
let gulp = require('gulp')
gulp.registry(new TestRegistry())
gulp.tast('first', () => {...})
gulp.tesk('build', gulp.series('taskName', 'first'))
```

### 整合多个任务
```
gulp.task('task-name', ['first-task', 'second-task'], () => {...})
```

## configuration
配置文件：
- `<root>/gulpfile.js`
- `<root>/Gulpfile.js`
- `<root>/gulpfile/index.js`
- `<root>/Gulpfile/index.js`

|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||
## api
`gulp.src(globs, [options]) => Vinyl`
从文件系统中读取数据作为`Vinyl`对象。返回一个流对象。
globs
options
||||||
|-|-|-|-|-|
|buffer|||||
|read|||||
|read|||||
|read|||||
|read|||||
|read|||||
|read|||||
|read|||||

`gulp.dest(direcotry, [options]) => Vinyl`
创建一个写入流
directory
options
|||||
|-|-|-|-|
|||||

`gulp.symlink(directory, [options]) => vinyl`
为链接的Vinyl对象创建一个流对象到文件系统中。
directory 输出目录

`gulp.lastRun(task: string | function, [precision: number]) => timestamp | undefined`
task
precision 时间精度。相对于ms
返回最后一次执行成功的时间或undefined

`gulp.series(...task) => void`
依次执行任务
series与parallel可互相嵌套。

`gulp.parallel(...task) => void`
同时执行任务

`gulp.watch(globs, [options], [task]) => void`
当globs对应的文件有变化时执行task

`gulp.task([taskName], taskFunction) => task`
创建任务（或检索一个任务）

`gulp.registry([registryInstance]) => registryInstance`
不会

`gulp.tree([{deep: boolean}]) => object`
返回一个已经注册的任务的tree.
```
{
  label: 'Tasks',
  nodes: [ 'one', 'two', 'three', 'four', 'five' ]
}
// or
{
  label: "Tasks",
  nodes: [
    {
      label: "one",
      type: "task",
      nodes: []
    },
    {
      label: "two",
      type: "task",
      nodes: []
    },
    {
      label: "three",
      type: "task",
      nodes: []
    },
    {
      label: "four",
      type: "task",
      nodes: [
        {
          label: "<series>",
          type: "function",
          branch: true,
          nodes: [
            {
              label: "one",
              type: "function",
              nodes: []
            },
            {
              label: "two",
              type: "function",
              nodes: []
            }
          ]
        }
      ]
    },
    {
      label: "five",
      type: "task",
      nodes: [
        {
          label: "<series>",
          type: "function",
          branch: true,
          nodes: [
            {
              label: "<series>",
              type: "function",
              branch: true,
              nodes: [
                {
                  label: "one",
                  type: "function",
                  nodes: []
                },
                {
                  label: "two",
                  type: "function",
                  nodes: []
                }
              ]
            },
            {
              label: "<parallel>",
              type: "function",
              branch: true,
              nodes: [
                {
                  label: "three",
                  type: "function",
                  nodes: []
                },
                {
                  label: "<anonymous>",
                  type: "function",
                  nodes: []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

`new Vinyl([options]) => vinyl`
创建一个vinyl对象。`gulp.src()`方法返回的就是vinyl对象。使用`new Vinyl(opt)`可以更灵活地生成vinyl对象。gulp的流式操作就是对`vinyl`对象操作的。
||||||
|-|-|-|-|-|
|cwd|||||
|base|||||
|path|||||
|history|||||
|stat|||||
|contents|||||
|`<custome>`|||||

viny对象的属性、方法
||||||
|-|-|-|-|-|
|contents|ReadableStream / Buffer / null||||
|stat|||||
|cwd|||||
|base|||||
|path|||||
|history|||||
|relative|||||
|dirname|||||
|stem|||||
|extname|||||
|basename|||||
|isBuffer()|||||
|isStream()|||||
|isNull()|||||
|isDirectory()|||||
|isSymbolic()|||||
|`clone([options])`|||||
|inspect()|||||
|isVinyl(p)|||||
|isCustomProp(p)|||||

## principle
此包的处理逻辑。
可能也是可插件化的。好多大功能的包都是可插件化的。如：`babel/webpack`

### uml
#### undertaker-registry
定义`DefaultRegistry()`，再定义`DefaultRegistry.prototype.init()/`DefaultRegistry.prototype.get()/`DefaultRegistry.prototype.set()/`DefaultRegistry.prototype.tasks()`
#### undertaker
以`async-done`支持的方式执行异步方法。
#### gulp
好多使用es5的方式写的代码。
使用`class`方式根本写不了。

## plugin
[查询插件](https://gulpjs.com/plugins/)
- gulp-rename
- gulp-uglify
- gulp-imagemin
- gulp-autoprefix
- gulp-minify-css
- gulp-concat
- BrowserSync 当html文件中相关的css文件有变化时更新浏览器。
- gulp-if
- gulp-sass
- gulp-less
- gulp-changed

## todo
> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。