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
- [风水](/confuse/fengshui.html)
- [默沙东](https://www.msdmanuals.cn/)
- [快捷键备忘录](https://hotkeycheatsheet.com/zh)
- [麦田艺术](https://www.nbfox.com)
- [ubuntu 科学上网](/confuse/ubuntuKeXueShangWang.html)
- [沉淀](/confuse/deposit.html)
- [前端中的 aop](/confuse/aop.html)
- [错误&解决方案](/confuse/errorResolve.html)
- [图片响应式](/confuse/imgReactive.html)
- [优化用户体验](/confuse/ux.html)
- [骨架屏](/confuse/skeleton.html)
- [web worker & service worker & shared worker](/confuse/worker3.html)
- [正向代理 & 反向代理](/confuse/forwardProxyReverseProxy.html)
- [考架构师](/confuse/kaoJiaGouShi.html)
- [石家庄高新区实验小学](/confuse/primarySchool.html)
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

《经纬》
儒家《六经》：《易经》《诗经》《尚书》《礼记》《乐记》《春秋》
《六纬》：《易纬》《诗纬》《尚书纬》《礼纬》《乐纬》《春秋纬》

借力 造势 做局

https://www.longyu.com.tw/news/index.php?group_id=1085&title_id=5100#prod_cbox

《How to Catch a Man》
《社会运行的基本逻辑》《潜规则应用指南》《规则破坏者》《低道德通向成功之路》《中国社会生存法则》《》
intermediate algebra

圆周角定理的内容为：一条弧所对的圆周角等于它所对的圆心角的一半。
圆周角定理有三大推论：一是同弧或等弧所对的圆周角相等；
二是半圆（或直径）对应的圆周角为直角，且 90° 的圆周角所对的弦是直径；
三是圆内接四边形的对角互补

腾
辛卯年 【兔年】 丁酉月 壬申日 戊申时
庚金丙火戊土
蓝
丁酉年 【鸡年】 己酉月 丙辰日 戊戌时
yxq
庚午年 【马年】 甲申月 癸酉日 丁巳时
用神丁-甲
用神辛-丙

流年助我生旺财，功名福禄贵人来。
八方圣贤助我力，福禄安康财业兴。
八方聚令生无量。

1990 庚午 1
1991 辛未 2 戊子大运
1992 壬申 3
1993 癸酉 4
1994 甲戌 5
1995 乙亥 6
1996 丙子 7
1997 丁丑 8 上学
1998 戊寅 9 土年
1999 己卯 10 土年
2000 庚辰 11 辰年
2001 辛巳 12 己丑大运
2002 壬午 13
2003 癸未 14 上初中
2004 甲申 15
2005 乙酉 16
2006 丙戌 17
2007 丁亥 18 上高中
2008 戊子 19 土年
2009 己丑 20 土年
2010 庚寅 21
2011 辛卯 22 大学 庚寅大运
2012 壬辰 23 辰年
2013 癸巳 24
2014 甲午 25
2015 乙未 26 大学毕业
2016 丙申 27
2017 丁酉 28 在龙浩 谈恋爱 妻子工作变动
2018 戊戌 29 土年 结婚 在学而思
2019 己亥 30 土年 生大女
2020 庚子 31 在投肯
2021 辛丑 32 生二女 辛卯大运
2022 壬寅 33 水年 在瓜子
2023 癸卯 34 水年
2024 甲辰 35 辰年
2025 乙巳 36 丢子 在马上
2026 丙午 37
2027 丁未 38
2028 戊申 39 土年
2029 己酉 40
2030 庚戌 41
2031 辛亥 42 壬辰大运 食神
2032 壬子 43 水年
2033 癸丑 44 水年
2034 甲寅 45
2035 乙卯 46
2036 丙辰 47 辰年
2037 丁巳 48
2038 戊午 49
2039 己未 50
2040 庚申 51
2041 辛酉 52 癸巳大运
2042 壬戌 53
2043 癸亥 54
2044 甲子 55
2045 乙丑 56
2046 丙寅 57
2047 丁卯 58
2048 戊辰 59 辰年
2049 己巳 60
2050 庚午 61
2051 辛未 62 甲午大运
2052 壬申 63
2053 癸酉 64
2054 甲戌 65
2055 乙亥 66
2056 丙子 67
2057 丁丑 68
2058 戊寅 69
2059 己卯 70
2060 庚辰 71 辰年
2061 辛巳 72 乙未大运
2062 壬午 73
2063 癸未 74
2064 甲申 75
2065 乙酉 76
2066 丙戌 77
2067 丁亥 78
2068 戊子 79
2069 己丑 80
2070 庚寅 81
2071 辛卯 82
2072 壬辰 83 辰年
2073 癸巳 84 丙申大运
2074 甲午 85
2075 乙未 86
2076 丙申 87
2077 丁酉 88
2078 戊戌 89
2079 己亥 90
2080 庚子 91
2081 辛丑 92
2082 壬寅 93
2083 癸卯 94
2084 甲辰 95 辰年
2085 乙巳 96 戊戌大运
2086 丙午 97
2087 丁未 98
2088 戊申 99
2089 己酉 100
2090 庚戌 101
2091 辛亥 102

甲乙丙丁戊己庚辛壬癸
子丑寅卯辰巳午未申酉戌亥
丁亥月
戊己庚辛壬癸甲乙 丙
子丑寅卯辰巳午未 申酉戌亥

戊己庚辛壬癸甲乙
子丑寅卯辰巳午未

戊子 2 岁 霹雳火
己丑 12 岁 霹雳火 金库
庚寅 22 岁 松柏木
辛卯 32 岁 松柏木
壬辰 42 岁 长流水 水库
癸巳 52 岁 长流水
甲午 62 岁 沙中金
乙未 72 岁 沙中金 木库

庚金
功能：1. 成为钟鼎之器。2. 砍削木头。
怕旺火（寅午戌、巳午未、丙过旺、丁过旺），庚金遇到旺火会被融化为无用之物
克木，怕木旺。金能克木，木重金缺。

袁 08.21 出来的成绩
听力 7.5
阅读 7.5
写作 6
口语 5.5
总分 6.5
雅思 7.0 分可英语课。

| 庚午 | 九钱
| 十月 | 八钱 |
初五 | 一两六钱
0.9+0.8+1.6=3.3
| 卯时 | 一两 | 4.3
辰时 | 九钱 4.2
| 巳时 | 一两六钱 | 5.9

首部图书馆卡
000700402187

《金科灵文》
大丹秘诀
玉匣秘诀
命理约言
《易经证释》
《金不换骨髓歌》
《周易变通解》
《易学应用之研究》
《观易外编》
《易问》
《河洛理气象数图说》
《八字数字学教科书》
《易经八字证释》
《易经八字新论》
《打通「增删卜易」的任督二脉》
《造命千金歌》
《天罡三十六秘法》

入宅移居吉日
甲子,乙丑,丙寅,戊辰,庚午,丁丑,戊寅,乙酉,庚寅,
壬辰,癸巳,乙未,壬寅,癸卯,甲辰,丙午,辛亥,癸丑,丙
辰,丁巳,壬戌。

入宅移居吉日
甲子
甲辰 2026.09.27
乙丑
乙酉 2026.09.08
乙未 2026.09.18
丙寅
丙午 2026.09.29
丙辰
丁丑
丁巳
戊辰
戊寅
庚午
庚寅 2026.09.13
辛亥
壬辰 2026.09.15
壬寅 2026.09.25
壬戌
癸巳 2026.09.16
癸卯 2026.09.26
癸丑

130121199010050253
Feige177105
润江煦园 3-1-303
18515195415@163.com

参与做功的字称为功神（互制双方都为功神），不参与做功的字称为废神或闲神，帮助功神做功的字称为辅神。
做功的区别在于做事的效率高低不同及做的是正功还是负功，这是相对于命主而言。

湿土晦火之功远远超出水灭火的能力。
