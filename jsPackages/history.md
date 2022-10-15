# `history`

## overview

> 提供多平台操作 history 的功能。

## install

`npm i history`

## usage

```
const history = require('history');
// or
// import history from 'history';
// TODO: DEMONSTRATE API
```

## api

```js
parsedPath(path?) => {
    hash?: hash值
    search?: 查询字符串
    pathname?: path
}
解析path

createPath(pathname = '/', search = '', hash = '') => Partial<Path>
创建path

createMemoryHistory(
  options: MemoryHistoryOptions = {}
): MemoryHistory
返回一个MemoryHistory对象

createHashHistory(options: HashHistoryOptions = {}) => HashHistory
返回一个hashHistory对象。

createBrowserHistory(
  options: BrowserHistoryOptions = {}
): BrowserHistory
返回一个Browserhistory对象


type MemoryHistoryOptions = {
  initialEntries?: InitialEntry[];
  initialIndex?: number;
};
type InitialEntry = string | Partial<Location>;
interface Location extends Path {
    state: unknown,
    key: Key
}
type Key = string;
interface MemoryHistory extends History {
  readonly index: number;
}.
interface History {
  readonly action: Action;
  readonly location: Location;
  createHref(to: To): string; // 返回path
  push(to: To, state?: any): void; //
  replace(to: To, state?: any): void;
  go(delta: number): void;
  back(): void;
  forward(): void;
  listen(listener: Listener): () => void;
  block(blocker: Blocker): () => void;
}
enum Action {
  Pop = 'POP',
  Push = 'PUSH',
  Replace = 'REPLACE'
}
interface HashHistory extends History {}
type HashHistoryOptions = { window?: Window };
type BrowserHistoryOptions = { window?: Window };
interface BrowserHistory extends History {}
```

## principle

使用原生提供的操作 history 的方法。做成一个 adaptor。

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
