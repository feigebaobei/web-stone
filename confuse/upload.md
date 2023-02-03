# 上传数据那点事儿

上传数据可以使用：

- form
- ajax（axios）
- get 请求

## form 上传

| `enctype`属性                     |                                                              |
| --------------------------------- | ------------------------------------------------------------ |
| application/x-www-form-urlencoded | 在发送前编码所有字符（默认）                                 |
| multipart/form-data               | 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。 |
| text/plain                        | 空格转换为 "+" 加号，但不对特殊字符编码。                    |

## ajax 上传

使用[xhr 对象](/language/javascript/xhr.html)。通常上传的是 json 对象。  
当需要使用上传文件，且不方便使用 form 时。可以使用 xhr 上传[FormData 对象](/language/javascript/FormData.html)。

```js
let formField = new FormData();
formField.append('idCard', idCard)
formField.append('levelCert', inputFileDom.files[0])
axiosInstance.post(url, formField).then(...).catch(...)
```

## get 上传

get 请求一般不用于上传，用于请求。  
但是有些 tracker 使用 get 请求做跟踪。

```html
<div>
  <img src="host/path.gif" alt="" />
</div>
```
