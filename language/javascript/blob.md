## Blob

原始数据就是基本数据（number, string, boolean, null, undefined, symbol）
Blob 是包含原始数据的类文件对象。这些原始数据只读。
基于 Blob 开发了 File 对象  
Blob 有三种得到方法：

- 使用构造函数。`new Blob(data, option)` data 类数组对象、另一个 blob、domstring optoin: {tyep: 'MIME', endings: 'transparent(写入行结束符\n) / native(使用适合宿主的换行符) '}
- 从另一个 Blob 对象上切出来。 `otherBlob.slice(start, end)` 非现代浏览器有兼容问题。
- 从 canvas（dom）对象上得到。`canvas.toBlob()` // 需要确定这个方法是否正确

Blob 有一个方法（slice）
Blob 有两个属性（size / type）

### 构造函数

new Blob(data, option)

data 是一个类数组、数组。Blob 会把（类）数组的每一个元素使用串联方式生成 blob 对象。

### 什么地方会用到 blob

大文件分割。  
图片跨域请求。 https://createjs.com/docs/preloadjs/files/preloadjs_loaders_ImageLoader.js.html#l37
隐藏视频源路径。

    var video = document.getElementById('video')
    var obj_url = URL.createObjectURL(blob)
    video.src = obj_url
    video.play()
    URL.revokeObjectURL(obj_url)

### [node-blob](/jsPackages/node-blob.html)

## MIME

MIME(Multipurpose Internet Mail Extensions)多用途网络邮件扩展类型，可被称为 Media type 或 Content type，  
它设定某种类型的文件当被浏览器打开的时候需要用什么样的应用程序，多用于 HTTP 通信和设定文档类型例如 HTML。  
之所以叫多用途网络邮件扩展类型，因为它最早被用于电子邮件系统，后用于浏览器，服务器将此类型名放入传给浏览器的数据中以告诉浏览器用什么样的插件打开它

**MIME 组成:(type/subtype; parameter))** 主类型+子类型+参数（可选）也可称为信息头+段头，这种称为更接近于“邮件”的概念  
写法上，传统写法是全小写，但其本身对大小写不敏感  
当前被认可的主类型包括: application text image multipart audio example font message model multipart video  
子类型也由媒体类型组成，但它也能包含其他内容，例如前缀、作者名。

### 常见 MIME 类型：

application: 某种二进制附件,对于没有 subtype 的情况，默认是 application/octet-stream  
text: 文本，理论上可读，对于没有 subtype 的情况，默认是 text/plain。未知的文本文件（纯文本文件），浏览器会认为这是可以直接显示的。  
image: 图像  
audio: 音频  
video: 视频  
multipart: 多部分文档文件（复合文档文件）  
multipart/form-data 多用于 form 表单提交，其中 multipart 即多部分文档。
