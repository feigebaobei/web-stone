# 数据可视化
## 参考资料
《信息可视化-交互设计》 robert spence
[《Visualization Analysis and Design》 Tamara Munzner](https://www.cs.ubc.ca/~tmm/vadbook/)

## 名言
show data variation, not design variation
   -- Edward Tufte

## 功能
基于计算机的可视化系统通过提供对数据的视觉表达形式来帮助人们更有效地完成特定任务。
可视化数据，可以降低大众分析数据的门槛。从而可以给人们提供新的视角。

## 引论
### 大数据处理流程
```
数据管理                            数据分析
1. 数据获取                         1. 建模和分析
2. 数据抽取、清理                    2. 意义构建
3. 数据整合、聚集和表示
```
### 为什么包括人
1. 全自动解决方案可信时，不需要可视化。
2. 许多分析问题不明确，不知道提前要问什么。
3. 可能性
   1. 给终端用户长期使用
   2. 展示已知的结果
   3. 在开发模型之前更好地理解需求的垫脚石。
   4. 帮助开发人员完成对自动解决方案的细化、调试，确定参数。
   5. 把人和机器联系起来。
   6. 帮助终端用户自动解决方案的验证，建立信任。

### 为什么把计算机包含在内
扩展到大型数据集，支持交互性

### 可视化的构型的设计空间
如何创建以及视频表示交互。
构型：创建或操纵视觉表达的独特方法
- 如何绘制
- 如何操作

### 什么是有效的可视化构型
- 新颖 支持全新的分析类型和能力
- 更快 加速现有工作流程

### 资源的限制因素
- 计算限制 处理时间、系统内存
- 人类限制 人的关注和记忆
- 显示限制 （信息密度）

### 可视化的历史
1. 手绘
2. 在书上
3. 在计算机上

[《visualization in scientific computing》](http://www.sci.utah.edu/vrc2005/McCormick-1987-VSC.pdf)

### 框架
- palantir
- many eyes
- jigsaw
- vega
- visual analyse
- d3

## 数据抽象
### 术语
- 结构化数据
- 非结构化数据。没有预定义的数据模型：文字、视频、图像。
  - 转换为结构化数据
    - 自然语言处理
    - 文本挖掘
- 可视化的对象
- 数据类型

### 数据集类型
- tables/multidimensional tables
  - 每一行一个数据项
  - 每一列一种属性
  - 唯一索引
  - 无重复
  - 多维表格（基于多个键的索引）
- networks
- graphs
  - 力导向图
  - 相关矩阵
  - 树图
- fields（场）
  - 单一网格，可以计算几何和拓扑
  - 直线网格，非均匀采样
  - 结构化网格，允许曲线网格
  - 非结构化网格，完全的灵活性，存储位置和连接。
- geometry 几何
- trees
- sets
- lists
- clusters

### 数据基本类型
元数据：描述数据的数据。

### 属性类型
- 定类型。明确类型
- 有序型。名次、时间，用于比较、排序。
- 定量型。用于运算。

定距、定比。

### 编码的组合学
- 一致性原则：图像的属性（视觉变量）应与数据的属性匹配。
- 重要性排序原则：以最有效的方式编码最重要的信息

## 数据编码
### 视觉标记
- 符号标记
  - 基本可视化图形元素
  - 表示数据项和连接
- 视觉通道
  - 符号标记的表现形式
  - 表现数据的属性

### 视觉通道
demo
- 柱状图：1个定量型长度，一个定类型位置
- 散点图：2个定量型位置，1个定类型颜色，1个定量型大小

视觉通道类型
- 度量型通道（定量型、定序型）
  - 位置
  - 长度
  - 饱和度
- 特性型通道（定类型）
  - 形状
  - 颜色、色相

有效性
1. 同范围内的位置比较
1. 不同范围内的位置比较
2. 长度（一维空间）
3. 角度、倾斜度
4. 面积（二维空间）
5. 深度（三维空间）
6. 颜色亮度、颜色饱和度
7. 曲率、体积

通道特性
- 区别性（选择性）。标记符号是否容易区分
- 关联性。是否支持标记符号间的归并分组
- 量化性。
- 可序性。
- 容量。最多能支持多少个不同的视觉标记

### 史蒂文心理物理强度定律
![](/dataVisual/visualChannel.png)

### 属性可分离性
![](/dataVisual/WX20220424-072641%402x.png)

## 可视化任务与分析
### 三要素
- 对象：需要表达什么
- 目的：用户为何需要
- 手段：如何表达
### 任务抽象
分析
- 使用
  - 发现 vs 展示
    - 探索 vs 解释
  - 欣赏
    - 非正式的，社交性的
- 生成
  - 注释：为已有可视化元素添加图像或文字注释
  - 记录：永久保存可视化元素
  - 衍生：生成新的可视化元素
    - 不可只绘制原始数据
    - 对原始数据集进行一系列的变换
    - 输出可视化结果，进行有对应性的绘制

![](/dataVisual/WX20220425-073954%402x.png)
![](/dataVisual/WX20220425-074013@2x.png)

### 设计构型
### 验证模型
领域情况                      | 问题导向的工作
(观察目标用)
  数据、任务抽象               V
    可视化编码、交互用例             ^
      算法                        | 技术导向的工作
![](/dataVisual/issue%26resolve.png)  

## 交互
![](/dataVisual/progress.png)  
为了按需求查找相关信息  

### 交互分类
![](/dataVisual/opData.png)  


### 视图操作
- 重排（排序）
- 过渡动画

交互技术
- 键鼠
- 大屏幕，hover/click/多次点击
- 小屏幕，无hover/click
- 手势操作
- 眼动追踪
- 导览

### 视图分面
- 关联高亮
- 单身、双向关联
- 动态查询（通过改变查询条件来改变显示结果）
  - 有利于有效操作
  - 快速探索数据
  - 适用于简单查询
  - 操作繁琐
  - 屏幕空间限制下的大量数据显示

### 视图约简
- 约简、增加
- 过滤
- 聚集
- 不完全互斥

## 颜色

### 光和颜色
物理世界 ---》 视觉系统 ---》 心理模型

### 颜色与心理因素
可视化用色时需要考虑色盲要素
有色觉缺陷的人约10%。男性》女性。

### 颜色模型
### 颜色设计准则
如何使颜色有效
- 考虑上下文
  - 直接的    需学习的
  - 任何人    专家
  - 关键的    上下文的
  - 文化      预期
  - 时间      金钱

![](/dataVisual/control%26alert.png)  

### colorbrewer
[颜色选择网站](https://colorbrewer2.org/)

## 表格可视化
### 表格数据的比较
![](/dataVisual/basis.png)

### 表格数据的相关性

### 表格数据的组成

### 表格数据的分布
![](/dataVisual/boxPolt.png)
![](/dataVisual/heatMap.png)
![](/dataVisual/smallVilion.png)

《Exploring Large Tables With The Table Lens》
## 高维数据可视化
### 介绍

### 几何方法
![](/dataVisual/parcel.png)  
![](/dataVisual/parcel2.png)  
![](/dataVisual/star.png)  

### 降维方法
- 多维缩放：地形图表示
- 维度嵌套
[论文](https://vis.pku.edu.cn/course/visclass_f21/material/dr_clustering.pdf)
[论文](https://vis.pku.edu.cn/course/visclass_f21/material/dr_interaction.pdf)

### 多方法耦合
[平行坐标+散点图](/dataVisual/parcelMatrix.png)  
[像素点图](/dataVisual/shapeCode.png)
[罗旋像素点图](/dataVisual/colorIcon.png)
### 其他方法
## 层次结构数据
### 网络数据中的层次结构数据
||树|网络|
|-|-|-|
|顶点|有|无|
|环|无|有|

### 显示树可视化
层次结构数据
[树](/dataVisual/tree.png)
[树](/dataVisual/tree2.png)
[Degree-of-interest trees: A component of an attention-reactive user interface
](https://www.researchgate.net/publication/228685532_Degree-of-interest_trees_A_component_of_an_attention-reactive_user_interface)

### 隐式树可视化
![显示vs隐式](/dataVisual/tree3.png)

### 树比较可视化
![tree](/dataVisual/tree4.png)
[树图](http://www.cs.umd.edu/hcil/trs/91-06/91-06.pdf)
[论文](http://vis.pku.edu.cn/research/publication/infovis19_barcodetree.pdf)

## 图数据可视化
### 介绍
不同目的、任务
基于属性、基于拓扑。

- 定位
- 量化
- 排序

### 图的理论基础
![常见的几种图](/dataVisual/graph.png)  
![图测量](/dataVisual/graph2.png)  

### 显示式表现形式
图片表现形式
- 显式
- 矩阵
- 隐式

布局相对标准
- 最小化边交叉
- 最小化相邻节点距离
- 最小化绘图区域
- 边长度统一
- 最小化边弯曲
- 最大化不同边之间的角距离
- 宽高比约为1
- 对称性：类似的图结构看起来相似
- ……

### 矩阵可视化方法
![图测量](/dataVisual/graph3.png)  
![图测量](/dataVisual/graph4.png)  

矩阵形式
- 优点
  - 可以表示除超图外的所有类型的图
  - 把重点放在边集合上，而不是放在节点集合上
  - 简单的网格-》不需要精心布局或渲染
  - 可着色矩阵单元，非常适合边的abt
  - 可遍历行、列，非常适合领域相关的tbts
- 缺点
  - 需要大量二维屏幕空间
  - 不适合路径相关的tbts

### nodeTrix
![图测量](/dataVisual/graph5.png)  
[论文](https://hal.inria.fr/file/index/docid/689983/filename/Henry-InfoVis2007.pdf)  

### 力导向布局算法
- 模拟物理模型  
- 边 = 弹簧
- 顶点 = 互斥磁铁
- 在实践中：减震
- 计算上的花费 O(n^3)
- 限制（交互式）~1000个节点

![力导向公式](/dataVisual/force0.png)  

### 图可视化要解决的重要问题
![边捆绑](/dataVisual/bind.png)  
## 时变数据可视化
### 时间序列可视化介绍
[网站](https://vcg.informatik.uni-rostock.de/~ct/timeviz/timeviz.html)  

### 缩略组图
- 静态替换（）
- 缩略组图 small multiples
- 时间序列图 
- 嵌套可视化
- 刷选和链接

![缩略组图](/dataVisual/smallMultiples.png)  
![缩略组图](/dataVisual/smallMultiples2.png)  

### 静态替换
- 将时间视为从显示中隐藏的维度
- 将时间划分为时间段
- 为每个时间 帧生成可视化
- 使用另一个时间帧的显示替换一个时间帧的显示
- 动画，追踪

[gapminder trendalyzer](https://www.gapminder.org/tools/) 

变化盲视

### 时间序列图
![时间序列图](/dataVisual/time0.png)  
- 编织线图
- 水平线图
- 简单线图
- 缩略线图
- 堆叠线图

### 螺旋图
方便体现周期性
- 扩展到大型数据集
- 支持识别数据中的周期性结构
- 比较多个数据集
- 使用阿基米德的螺旋 r=aO
  - 从原点发出的光线以恒定距离2paia穿过螺旋的两个连续弧

[论文](http://vis.pku.edu.cn/course/datavis_f21/material/Visualizing_Time-Series_on_Spirals.pdf)  

### 像素驱动的方法

### 时间曲线

### 主题河流

