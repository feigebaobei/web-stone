# 前后端交互常识

## 请求方式

| 常用请求方式 | 用途                         |     |     |
| ------------ | ---------------------------- | --- | --- |
| option       | 预检请求，检查是否可以使用。 |     |     |
| get          | 读数据                       |     |     |
| post         | 添加数据                     |     |     |
| put          | 修改数据                     |     |     |
| delete       | 删除数据                     |     |     |

语义 > 功能：前端告诉后端要做什么

## cors

Cross-Origin Resource Sharing，跨域资源共享  
必须实例的 4 个 header 字段。

- Access-Control-Allow-Origin 指示请求的资源能共享给哪些域。
- Access-Control-Allow-Credentials 指示当请求的凭证标记为 true 时，是否响应该请求。
- Access-Control-Allow-Headers 用在对预请求的响应中，指示实际的请求中可以使用哪些 HTTP 头。
- Access-Control-Allow-Methods 指定对预请求的响应中，哪些 HTTP 方法允许访问请求的资源。

## 数据结构不变

```js
{
    code: number,
    message: string
    data: any
}
```

| 数据类型 | 无数据时 |     |
| -------- | -------- | --- |
| array    | `[]`     |     |
| string   | `''`     |     |
| object   | `{}`     |     |

尽量不要给 null。
因为 null 在原型链的最顶端。它什么方法也没有。

## 无法传递 undefined

## 最大数字问题

JavaScript 内部使用 64 位浮点数  
Number.MAX_SAFE_INTEGER 最大安全数 2^53 - 1  
Number.MIN_SAFE_INTEGER 最小安全数 -(2^53 - 1)  
Number.isSafeInteger(value) 返回是否是安全数。(-(2^53 - 1), 2^53 - 1)

## 接口重载

## 最小权限原则

非必要字段不给前端

## 只传递必要字段

- 后端使用惟一键可以得到对应的详细信息。
- 后端不应该相信前端

## 前端做什么？不做什么？

|     |                  | eg         |                |
| --- | ---------------- | ---------- | -------------- |
|     | 不为敏感结果计算 | 不算钱     | 不包括边缘计算 |
|     | 不传递敏感数据   | 不传递金额 |                |
|     |                  |            |                |

|     |                    |     |     |
| --- | ------------------ | --- | --- |
|     | 正确渲染页面       |     |     |
|     | 正确操作逻辑       |     |     |
|     | 传递操作结果后后端 |     |     |

前端是一个接口，为用户使用后端服务提供接口。

## 前后端都要做数据检查

- 必传字段
- 数据类型（兼容/严格）
- 数据结构
- 数据值的范围
- 数据值的精度

## restful

```
/path/data
get     得到
post    创建
put     修改
delete  删除
```

## 可以谈

根据实际情况可灵活变动。

## 参考

- [restful](https://baike.baidu.com/item/RESTful/4406165?fr=aladdin)
