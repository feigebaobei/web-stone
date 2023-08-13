# 模块

<!-- prettier-ignore-start -->
||||
|-|-|-|
|BrowserModule|@angular/platform-browser|用于启动和运行浏览器应用的的基本服务|
|CommonModule|@angular/common|使用 NgIf、NgFor 之类的内置指令|
|FormsModule|@angular/forms|使用 NgModel 构建模板驱动表单|
|ReactiveFormsModule|@angular/forms|构建响应式表单|
|RouterModule|@angular/router|使用前端路由|
|HttpClientModule|@angular/common/http|发起 http 请求|
<!-- prettier-ignore-end -->

## 模块 & esm & cjs

<!-- prettier-ignore-start -->
|  | NgModule| 模块| module|
|  | ----- |--- | -------- |
|  | angular | esm  | cjs|
|  | 使用 @NgModule 修饰的类 | 每个文件都是一个模块。 | 每个文件都是一个模块 |
|  | - | import / export  | require / module.exports/exports |
|  ||| |
|  ||| |
<!-- prettier-ignore-end -->

## @NgModule 的参数

|              |                                                                            |     |
| ------------ | -------------------------------------------------------------------------- | --- |
| declarations | 当前模块中的组件、指令、管道                                               |     |
| imports      | 当前模块所需的其它 NgModule 模块                                           |     |
| exports      | 其它模块中可以使用到当前模块可声明的对象                                   |     |
| providers    | 当前模块向当前应用中其它应用模块暴露的服务                                 |     |
| bootstrap    | 用来定义整个应用的根组件，是应用中所有其它视图的宿主，只有根模块中才会存在 |     |

## 根模块

- 通常命名为 AppModule
- 使用 angular cli 创建项目时会创建。
-
