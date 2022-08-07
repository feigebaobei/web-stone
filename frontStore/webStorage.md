# web storage
> 包括sessionStorage（会话存储） / localStorage（本地存储）
> 它是Storage对象

# sessionStorage
# localStorage
## feature
- 存储数据
- 只能存字符串
- <5m

## usage
```js
```

## api
|||说明|返回值|||
|-|-|-|-|-|-|
|属性|只读|||||
||length|返回已经存储的数据项数量||||
|方法|description|||||
||key(index: number)||返回第n数据项的**键名**|||
||getItem(k)||返回键名对应的值 string / null|`localStorage.k / localStorage['k']`||
||setItem(k, v)|创建或更新对象的键值|undefined|||
||removeItem(k)|在storage中删除指定的键名|undefined|||
||clear()|清空存储对象（storage）的所有键值|undefined|||

## todo
### ls & ss
||ls|ss||
|-|-|-|-|
|作用范围|同网站|同页面||
|大小|<5m|<5m||
||在隐私模式下不可读取|||
||存太多，会卡|||
||不能被爬虫抓取|||
|||||
|||||

### cookie & ls & ss & userData & web sql & indexedDB
|特性|cookie|localStorage|sessionStorage|userData|web sql|indexedDB|
|-|-|-|-|-|-|-|
|生命周期|一般由服务器生成，可设置失效时间。若在浏览器生成，默认关闭浏览器后失效。|在手动删除前一直存在|关闭当前页面后被清除||||
|可存放大小|<4k|<5m|<5m||||
|与服务器通信|每次都在http头部信息中。过多会影响性能|仅在客户端不能与通信|仅在客户端不能与通信||||
|易用性|原生的方法较难使用，自己封装后会好用。|原生的方法就挺好用。可再交封装|原生的方法就挺好用。可再交封装||||

### title
