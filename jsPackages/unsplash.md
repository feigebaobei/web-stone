# unsplash

## overview
> 一个图片床网站。  
> 国内有一些模仿它的oss网站。如：七牛（它不支持对外api）。  

### feature
- 管理自己的图片  
- 支持分级别对外api  

## login
## install
- 支持多个语言的sdk.
  - php
  - ruby  
  - [js](https://github.com/unsplash/unsplash-js#usage)  
  - ios
  - andriod

## use api
```js
// 不使用包请求
// 点击首页的'Register as a developer'去成为一个开发者。然后记住2个key，后面会用到。
import axios from 'axios'
axios({
    method: 'get',
    url: 'https://api.unsplash.com/photos',
    headers: { // 这个配置很重要
        'Accept-Version': 'v1',
        'Authorization': `Client-ID ${ACCESS_KEY}`,
    },
    params: {
        count: 5
    }
}).then(data => {
    console.log(data)
})

// 使用unsplash.js包请求。
import {createApi} form 'unsplash-js'
let unsplash = createApi({
    accessKey: `${ACCESS_KEY}`,
    headers: {'Accept-Version': 'v1'}
})
unsplash.photo.get({photoId: '123'}).then(...).catch(...)
```

## schema
- location: `https://api.unsplash.com/`  
- version: 在请求头中设置`Accept-Version: v1`  
- 支持的请求方式：`GET / POST / PUT / DELETE`  
- 错误信息：`{errors: ['Username is missing', 'Password cannot be blank']}`  
  - 200 ok  
  - 400 bad request  
  - 401 unauthorized  
  - 403 forbidden  
  - 404 not found  
  - 500,503 服务器出错  

## authorization
大部分请求不需要用户登录，需要设计请求头的`authorization: Client-ID ${ACCESS_KEY}`字段。  

## 分页
- 每页面默认为10条数据，最多30条数据。  
- 回馈头中`X-Per-Page`表示每页多少条数据，`X-Total`总共多少条数据。  
- 使用`page`设置请求哪页面数据。从1开始数。  

## 请求速率
demo级的请求速率是50次/时。  
production级的请求速率是5000次/时。  
在每次请求后回馈头中都会使用`X-Ratelimit-Limit`表示当前小时总共的请求次数，`X-Ratelimit-Remaining`表示当前小时所剩的请求次数。  

## 图片的动态大小
每个图片的链接都是动态的。可以使用相应参数得到相应格式的图片。  
- w/h  
- crop 裁剪  
- fm 指定格式  
- auto=format
- q 压缩
- fit 得到合适尺寸的图片
- dpr 得到适合设备dpr的图片  
- full 最大尺寸的图片  
- regular w=1080px  
- small w=400px  
- thumb w=200  
- raw  

可以通过设置图片的设置项得到相应的图片，如：
```js
`photo.urls.raw{&w=15000&dpr=2}`
```

## users
|path|method|params|response|||
|-|-|-|-|-|-|
|`/me`|get|-|-|||
|`/me`|put|username / first_name / last_name / email / url / location / bio / instagram_username|-|||
|`/users/:username`|get|username|||
|`/users/:username/photos`|get|username|`{username, page, per_page, order_by, stats, resolution, quantity, orientation}`||
|`user/:username/likes`|get|username, page, per_page, order_by, orientation|||
|`users/:username/collections`|get|username, page, per_page|||
|`users/:username/statistic`|get|username, resolution, quantity|||
|`/photos`|get|page, per_page, order_by||得到一页图片||
|`/photos/:id`|get|id||得到指定的图片||
|`/photos/random`|get|||得到一个任意图片||
|`/photos/:id/statistics`|get|id, resolution默认days, quantity默认30||得到一个图片的统计数据||
|`/photos/:id/download`|get|id, resolution默认days, quantity默认30||得到一个图片的统计数据||
|`/photos/:id`|put|太多了||更新指定的图片||
|`/photos/:id/like`|post|id||添加到like列表中|需要用户登录|
|`/photos/:id/like`|delete|id||从用户的like列表中删除|需要用户登录|
|`/search/photos`|get|query, page, per_page, order_by, collections, content_filter, color, orientation||查询图片||
|`/search/collection`|get|query, page, per_page, ||查询图片的集合||
|`/search/users`|get|query, page, per_page, ||查询用户||
|`/collections`|get|query, page, per_page, ||列出集合||
|`/collections/:id`|get|query, page, per_page, ||列出指定集合||
|`/collections/:id/photos`|get|query, page, per_page, orientation||列出指定集合的图片||
|`/collections/:id/related`|get|query, page, per_page, orientation||列出指定集合的相关集合||
|`/collections`|post|title, description, private||创建一个新集合||
|`/collections/:id`|put|title, description, private||更新一个集合||
|`/collections/:id`|delete|id||删除一个集合||
|`/collections/:collection_id/add`|post|collection_id, photo_id||向集合中添加一个图片||
|`/collections/:collection_id/remove`|delete|collection_id, photo_id||删除集合中指定的图片||
|`/topics`|get|ids, page, per_page, order_by||列出所有主题||
|`/topics/:id_or_slug`|get|id_or_slug||列出所有主题||
|`/topics/:id_or_slug/photos`|get|id_or_slug, page, per_page, orientation, order_by||列出指定主题的图片||
|`/stats/total`|get|||得到unsplash的图片总量||
|`/stats/month`|get|||得到最近30天unsplash的全部图片||

### 如何登录
不会。

## api
```js
import { createApi  } from 'unsplash-js';
createApi: {
    collecttions: {
        get()
        getPhotos()
        getRelated()
        list()
    }
    photos: {
        get()
        getRandom()
        getStats()
        list()
        trackDownload()
    }
    search: {
        getCollections()
        getPhotos()
        getUsers()
    }
    topics: {
        get()
        getPhotos()
        list()
    }
    users: {
        get()
        getCollections()
        getLikes()
        getPhotos()
    }
}
```

## principle
此包的处理逻辑。  
unsplash团队创建了一个图片床项目。提供了浏览、编辑、上传的功能。也公开了支持开发者调用的服务。  
我平时在开发时需要一些图片，手头没有一堆图片。这个网站为一提供了图片，方便了我的开发工作。  
国内的网站不支持公开的api。只有花钱后才可以使用。unsplash为开发者提供了“网开一面”的功能。这些开发者也用不了多少流量，但是数量多。unsplash这样做就用小量的流量得到了较多的开发者。这些开发者日后有可能成长为团队领导。那么他就优先考虑unsplash。若没有成为团队领导，取对unsplash也没多大负面影响。有人才有一切。  
公开此功能后要面对过量攻击。该团队故意把公开api的控制范围（或影响范围）控制在一个可控制的范围。若有恶意攻击，则只能影响很小部分。同时让恶意攻击者成功被攻击对象之一。若有人想全面黑掉unsplash，则需要海量用户，执行海量恶意操作。显然很难实现。  

### uml
```
```

## todo
> 
> 未来迭代计划。
> 未来迭代计划。