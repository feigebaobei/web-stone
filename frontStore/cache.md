# CacheStorage
> 它处于实验阶段
> 表示 Cache 对象的存储。
> 一个window对象下有一个Caches，其值是CacheStorage对象。该对象中有好多Cache对象。
> 一个域下可以有多个命名cache对象。
> 需要使用脚本（如：serviceworker）控制添加、更新、删除等。  

## feature
- 可访问所有命名cache的主目录。  

## usage
```js
// 如何创建
window.caches // 返回CacheStorage对象。里面可以放很多cache对象
```

## api

|CacheStorage||||||
|-|-|-|-|-|-|
|属性|description|||||
|||||||
|方法|description|||||
||match(requestOrUrl: Request | string, options?: {ignoreSearch: boolean, ignoreMethod: boolean, ignoreVary: boolean, cacheName: DOMString})|返回值为Response | undefined的promise|Response是cache的缓存数据|caches.match()等同于每个缓存上调用cache.match()（按照caches.keys()返回的顺序，直到返回Response对象）。||
||has(cacheName)|返回值是是否存在指定的缓存的promise||||
||open(cacheName)|返回值是Cache的promise。若不存在，则**创建**。||||
||delete(cacheName)|返回是否删除了指定cacheName对应的cache的promise|cache被删除后，该cache中所有项的数据都被删除了。|||
||keys(无参数)|返回值是Cache名称（cacheName）的数组的promise||||

ignoreSearch    是否使用qs(查询字符串)查询  默认值false
ignoreMethod    是否使用Request对象中的请求方式（通常只允许GET/HEAD）查询   默认值false
ignoreVary      是否使用VARY头信息去查询
cacheName       要搜索的缓存名称

# cache
> 它处于实验阶段
> 有时需要不同浏览器的前缀。  

## feature
- 一个域中可存在多个Cache对象。
- 需要使用脚本更新缓存。若不明确更新缓存，则一直不更新。
- 不会过期
- 先打开`CacheStorage.open(cacheName)`，再处理缓存。

## usage
```js
```

## 生命周期
StorageEstimate
> 需要浏览器支持 + https  
> 提供对你的域名或Web app的数据存储空间总量和已用量的**估计值**,该对象实例由StorageManager的estimate() 方法返回的Promise返回.  

||||||
|-|-|-|-|-|
|quote|当前设备为当前域名或web app预留的存储空间。虽然实际上可能有比这更多的存储空间,但这时你不应使用那多余的部分.||||
|usage|你的域名或Web app已经使用的存储空间大小,且该大小为**估计值**。||||
||||||

## 存储空间

## api
|Cache||||||
|-|-|-|-|-|-|
|属性|description|||||
|||||||
|方法|description|||||
||match(requestOrUrl, options?: {ignoreSearch, ignoreMethod, ignoreVery, cacheName})|返回一个值为response / undefined的promise||||
||matchAll([request, options: {ignoreSearch, ignoreMethod, ignoreVary, cacheName}])|返回一个值是匹配请求的数组的promise||||
||add(requestOrUrl)|自动把request与对应的response缓存起来|返回值为undefined的promise|只能缓存response.status在200范围内的响应|只能在get请求中使用|
||addAll(requestOrUrl[])|把数组中的每个request/response缓存起来|返回值为undefined的promise|只能缓存response.status在200范围内的响应|只能在get请求中使用|
||put(request, reponse)|在cache对象中设置request与response的对应关系。会发生覆盖。|返回一个值为undefined的promise|可缓存任意状态码|只能在get请求中使用|
||delete(request, options?: {ignoreSearch, ignoreMethod, ignoreVary, cacheName})||返回值为是否删除指定的缓存的promise|||
||keys(request?, options?: {ignoreSearch, ignoreMethod, ignoreVary, cacheName})||返回值为cache键组成的数组的promise|||

## todo
### Cache & CacheStorage
||Cache|CacheStorage|
|-|-|-|
|||Cache对象的存储。一个CacheStorage对象可存储多个Cache对象|
|创建||不用创建。window.cache是CacheStorage对象。|
|match方法|||
|||定义一个字符串与一个cache相对应|
||||


window.caches是CacheStorage对象。  
全局只有一个CacheStorage对象。该对象有多个Cache对象。每个Cache对象有多项数据。  
使用``在CacheStorage中找Cache对象。  
使用``在Cache中找特定数据项。  

### title
### title

