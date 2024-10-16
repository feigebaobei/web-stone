# overview

JSON：JavaScript 对象表示法（JavaScript Object Notation）。  
常用于数据结构。

- 以 k:v 形式编写。
- key 全为 string.
- value 的枚举值：number/string/boolean/array（有序的）/object（无序的）/null

# 操作

```js
jsonObj.newKey = 'value'
delete jsonObj.oldKey
jsonObj.oldKey = 'newValue'
jsonObj.arr[index] = 'newValue'
let t = jsonObj.oldKey
```

## json.parse(jsonStr, [reviver])

reviver(key, value) => {...}  
先按照从前向后，从按照最里层向外调用。

## json.stringify(obj, [repalcer, [space]])

repalcer: array | fn  
 fn(key, value) 当处理最外层对象时，key 为空字符串。  
 当返回 number，则转换为 string  
 当返回 string，则返回 string  
 当返回 boolean，则返回 string  
 当返回对象，则递归处理 此处会决定执行顺序。  
 当返回 undefined，则不返回  
 array
只处理指定的 key。
space: number  
 用于美化输出。  
 表示需要多少个空格，`[0, 10]`。

# 属性方法

```js
JSON.stringify()
JSON.parse()
```

# jsonp

json with padding  
可以让网页从别的域名（网站）那获取资料，即跨域读取数据。  
Jsonp 的实现原理是利用 `<script>` 标签可以获取不同源资源的特点，来达到跨域访问某个资源的目的。  
同源策略：它是由 Netscape 提出的一个著名的安全策略，现在所有支持 JavaScript 的浏览器都会使用这个策略。

## 原理

前端定义处理数据方法。后端提供数据。浏览器运行方法。  
**前端部分**

1. 定义好处理数据的方法 fn。
2. 设置`<script>`的 src 属性，拼接上 fn 的名字。（key 需要和后端商定）  
   **后端部分**
3. 接到请求后整理数据。
4. 取出 fn
5. 把数据传入 fn.返回给前端。

## demo

如客户想访问 :​ /try/ajax/jsonp.php?jsonp=callbackFunction​。  
假设客户期望返回 JSON 数据：​["customername1","customername2"]​。  
真正返回到客户端的数据显示为: ​callbackFunction(["customername1","customername2"])​。

```php
<?php header('Content-type: application/json');
//获取回调函数名
$jsoncallback = htmlspecialchars($_REQUEST ['jsoncallback']);
//json数据
$json_data = '["customername1","customername2"]';
//输出jsonp格式的数据
echo $jsoncallback . "(" . $json_data . ")"; ?>
```

```js
<script type="text/javascript">
function onCustomerLoaded(result, methodName){
    var html = '<ul>';
    for(var i = 0; i < result.length; i++){
        html += '<li>' + result[i] + '</li>';
    }
    html += '</ul>';
    document.getElementById('divCustomers').innerHTML = html;
}
</script>
```

```html
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <title>JSONP 实例</title>
  </head>
  <body>
    <div id="divCustomers"></div>
    <script type="text/javascript">
      function callbackFunction(result, methodName) {
        var html = '<ul>'
        for (var i = 0; i < result.length; i++) {
          html += '<li>' + result[i] + '</li>'
        }
        html += '</ul>'
        document.getElementById('divCustomers').innerHTML = html
      }
    </script>
    <script
      type="text/javascript"
      src="/try/ajax/jsonp.php?jsoncallback=callbackFunction"
    ></script>
  </body>
</html>

<!-- or use jquery -->
<!DOCTYPE html>
<html>
  <head>
    <title>JSONP 实例</title>
    <script
      src="http://apps.bdimg.com/libs/jquery/1.8.3/jquery.js"
      rel="external nofollow"
    ></script>
  </head>
  <body>
    <div id="divCustomers"></div>
    <script>
      $.getJSON('/try/ajax/jsonp.php?jsoncallback=?', function (data) {
        var html = '<ul>'
        for (var i = 0; i < data.length; i++) {
          html += '<li>' + data[i] + '</li>'
        }
        html += '</ul>'
        $('#divCustomers').html(html)
      })
    </script>
  </body>
</html>
```

# [转换](/language/javascript/json-transfer.html)

## json => xml

## xml => json

## excel => json

## csv => json

# 格式化

# 后记

undefined / function 无法在 json 中使用。
