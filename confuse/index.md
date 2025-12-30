> 精英：在某领域特别牛的人，有一技之长的人。或者在社会上有很高地位和影响力的人。这些人比普通人更容易接受到隐秘的知识。
> 可视化是强大的工具，可以帮助你的思想和情感与想要的实现的事物保持一致。

- [浅、深复制](/confuse/clone.html)
- [异步](/confuse/async.html)
- [原型链 pptx](/confuse/jsPrototypeChain.pptx)
- [pagePosition](/confuse/pagePosition.html)
- [upload](/confuse/upload.html)
- [二进制](/confuse/bit.html)
- [console](/browser/console.html)
- [json 格式化](/language/javascript/json-transfer.html)
- [节流、去抖](/confuse/throttleDebouncd.html)
- [如何接手老项目](/confuse/takeOverProject.html)
- [html encode & decode](/confuse/htmlEncodeDecode.html)
- [|| && ??](/confuse/shortCircuitOperator.html)
- [react 方法式组件使用 ref ](/confuse/reactFnComp%26Ref.html)
- [性能优先的设计哲学](/confuse/title.html)
- [cdn](/confuse/cdn.html)
- [ts 里的?!](/confuse/tsQuestionMarkExclamationPoint.html)
- [前后端交互常识](/confuse/front&end.html)
- [如何写一个脚本](/confuse/writeScript.html)
- [promise 的工具方法](/confuse/promise.html)
- [单位](/confuse/unit.html)
- [execCommand](/confuse/execCommand.html)
- [session&jwt](/confuse/session&jwt.html)
- [计算属性](/confuse/getComputedStyle.html)
- [从 html 中提取纯文本](/confuse/extractText.html)
- [vue3 的 class 失效的解决方案](/confuse/vue3Class.html)
- [复制](/confuse/copy.html)
- [编辑](/confuse/edit.html)
- [下载](/confuse/download.html)
- [contenteditable](/confuse/contenteditable.html)
- [compositionstart & compositionend](/confuse/compositionstartCompositionend.html)
- [坐标](/confuse/position.html)
- [宏任务 & 微任务](/confuse/macroTask&MicroTask.html)
- [ts 类型 积累](/confuse/tsTypeAccumulate.html)
- [class & Object.create](/confuse/classObjectCreate.html)
- [mac](/confuse/mac.html)
- [time 转换](/confuse/timeTransfer.html)
- [代码趋于 0bug](/confuse/bug0.html)
- [performance](/confuse/performance.html)
- [import meta](/confuse/importMeta.html)
- [form-data 与 json 的不同](/confuse/formData&json.html)
<!-- - [ors指标](/confuse/ors.html) -->
- [webhook](/confuse/webhook.html)
- [import.meta](/confuse/importMata.html)
- [基础设施即代码 iac](/confuse/iac.html)
- [页面生命周期](/confuse/pageLife.html)
- [奇门遁甲起局](/confuse/qiMenDunJiaStart.html)
- [默沙东](https://www.msdmanuals.cn/)
- [快捷键备忘录](https://hotkeycheatsheet.com/zh)
- [麦田艺术](https://www.nbfox.com)
- [ubuntu 科学上网](/confuse/ubuntuKeXueShangWang.html)
- [沉淀](/confuse/deposit.html)
- [前端中的 aop](/confuse/aop.html)
- [错误&解决方案](/confuse/errorResolve.html)
- [图片响应式](/confuse/imgReactive.html)
- [优化用户体验](/confuse/ux.html)
- [title](/confuse/title.html)
- [title](/confuse/title.html)
- [title](/confuse/title.html)
- [title](/confuse/title.html)
- [title](/confuse/title.html)

> 最好的奴隶是那个认为自己是自由的人
> 最完善的奴隶就是自称自己根本不是奴隶的人
> 人类往往以为自己所崇拜的邪其实是善。他强调许多崇拜看似于神圣或者光明的东西的人其实是在崇拜某种被包装起来的坏。也有人引述线人曾经说过你们并不理解我们所生活的这个世界的真正面目。
> 需要提问者先能够正确的提出问题，并认识到某些答案只能依靠个人的领悟，否则就没有意义。
> 真正的战斗只在当下，只在个人。如果还在外部去寻找敌人，想要攻击某个外在的对象，那就是在浪费宝贵的能量。
> 他认为一件事情即使在当下看起来是在负面的也可能对灵魂的整体发展有好处。
> 这里就是一个因果之地。每个人必须完成自己的功课。
> 在线人看来：如果一个人抱怨没有自由意志，那只是因为他没能真正理解自己何时应该做什么事情。狱中犯人仍可以自己决定如何度过狱中的时光，可以思考，可以行动。只是有限制罢了。在地球上也是一样。人类拥有自由意志，所以更能够感受到痛苦的存在和束缚。

已婚男人梦见蛇钻进衣服里，这个孩子日后会成为一个远近闻名的学者。

借我运者七日内速速归还。
好运归位。
霉运远离八方。

# ubuntu 安装 docker

sudo apt update
sudo apt install snapd # 先安装 snapd
sudo snap install docker # 使用 snap 安装 docker
sudo snap start docker # 启动 docker
docker --version # 验证是否安装成功

# issue

## Failed to restart docker.service: Unit docker.service not found.

sudo apt-get install docker-ce docker-ce-cli containerd.io docker-compose-plugin

## Error response from daemon: Get "https://registry-1.docker.io/v2/": context deadline exceeded

sudo vi /etc/docker/daemon.json
添加已下内容

```
{
　　"registry-mirrors":
　　　　[
　　　　　　"https://docker.m.daocloud.io/",
　　　　　　"https://huecker.io/",
　　　　　　"https://dockerhub.timeweb.cloud",
　　　　　　"https://noohub.ru/",
　　　　　　"https://dockerproxy.com",
　　　　　　"https://docker.mirrors.ustc.edu.cn",
　　　　　　"https://docker.nju.edu.cn",
　　　　　　"https://xx4bwyg2.mirror.aliyuncs.com",
　　　　　　"http://f1361db2.m.daocloud.io",
　　　　　　"https://registry.docker-cn.com",
　　　　　　"http://hub-mirror.c.163.com",
　　　　　　"https://docker.mirrors.ustc.edu.cn"
　　　　]
}
```

修改完成后，重启 Docker 服务：
sudo systemctl restart docker
增加请求超时时间
export COMPOSE_HTTP_TIMEOUT=120
sudo systemctl daemon-reload
sudo systemctl restart docker

# snap

是 linux 的包管理工具。以自容模式（self-contained format）安装/管理应用。兼容不同分支的 linux 系统。可以安装更新必要的依赖。

## install snap on ubuntu

```
sudo apt update
sudo apt install snapd
```

安装示例：  
$ sudo snap install hello-world
hello-world 6.4 from Canonical✓ installed
$ hello-world
Hello World!

## 常用命令

```
snap find app_name # 根据应用名查询
snap info app_name # 列出此应用的信息
snap list # 列出所有安装的应用
snap refresh app_name # 更新
snap revert app_name # 反向更新
snap disable app_name # 禁用
snap enable app_name # 启用
snap remove app_name # 删除
```

Docker 的 6 大优势

对比传统的运维发布方式，Docker 有以下 6 大优势：

1、更高效地利用系统资源
2、更快的启动时间
3、一致的运行环境开发中常见的问题是环境一致性问题
4、持续交付和部署对开发和运维（DevOps）来说，最希望的就是一次创建或配置，可以在任意地方正常运行，使用 Docker 可以通过定制应用镜像来实现持续集成、持续交付、部署。
5、更轻松迁移 Docker 确保了执行环境的一致性，使得应用的迁移更加容易，Docker 可以在很多平台上运行，无论是物理机、虚拟机、公有云、私有云，甚至是笔记本，其运行结果是一致的。因此用户不用担心运行环境的变化导致应用无法正常运行的情况。
6、更轻松地维护和拓展

分析出竞品有什么特点、优点、缺点（在公司内不能正确运行的地方。）。基于这些我们应该如何创建我们的产品。
在达到哪此要求。产品终态是什么。开发完成后，收益是什么？
如何实现。即画出架构图。
排期是什么。需要多少人天。

不界入别人的因果。要做到见死不救。当然大概率不会见死。
别人不支持我的工作，我也不支持别人的工作。别人回答我的问题，我也只做到回答别人的问题。
