# 上传数据那点事儿
上传数据可以使用：  
- form
- ajax（axios）
- get请求

## form上传
`enctype`属性  
application/x-www-form-urlencoded 在发送前编码所有字符（默认）  
multipart/form-data 不对字符编码。在使用包含文件上传控件的表单时，必须使用该值。  
text/plain  空格转换为 "+" 加号，但不对特殊字符编码。  
我不知道为什么会有这三种。  

## ajax上传
使用[xhr对象](/confuse/xhr.html)
有时需要使用上传文件，但是不方便使用form。需要[FormData对象](/confuse/FormData.html)。
```
let formField = new FormData();
formField.append('idCard', idCard)
formField.append('levelCert', inputFileDom.files[0])
axiosInstance.post(url, formField).then(...).catch(...)
```

## get上传
get请求一般不用于上传，但是有些tracker使用get请求做跟踪。
```
// html
<div>
    <img src="host/path.gif" alt="" />
</div>
```
