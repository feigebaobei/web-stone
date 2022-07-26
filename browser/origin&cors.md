# origin (同源策略)
协议、域名、接口号都相同，则为同源。  

# cors
Cross-Origin Resource Sharing，跨域资源共享  

||header|||
|-|-|-|-|
||Access-Control-Allow-Origin|指示请求的资源能共享给哪些域。||
||Access-Control-Allow-Credentials|指示当请求的凭证标记为 true 时，是否响应该请求。||
||Access-Control-Allow-Headers|用在对预请求的响应中，指示实际的请求中可以使用哪些 HTTP 头。||
||Access-Control-Allow-Methods|指定对预请求的响应中，哪些 HTTP 方法允许访问请求的资源。||
||Access-Control-Expose-Headers|指示哪些 HTTP 头的名称能在响应中列出。||
||Access-Control-Max-Age|指示预请求的结果能被缓存多久。||
||Access-Control-Request-Headers|用于发起一个预请求，告知服务器正式请求会使用那些 HTTP 头。||
||Access-Control-Request-Method|用于发起一个预请求，告知服务器正式请求会使用哪一种 HTTP 请求方法。||
||Origin|指示获取资源的请求是从什么域发起的。||

