# 装饰器

用到的装饰器

## @Directive 指令

| 选项                                                                                                                  | 类型     | 说明                                                                                                                                                    |     |
| --------------------------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| selector                                                                                                              | string   | css 选择器                                                                                                                                              |     |
| inputs                                                                                                                | string[] | 定义了一组从 directiveProperty 指向 bindingProperty 的配置项：directiveProperty 用于指定要写入值的指令内属性。                                          |
| · bindingProperty 用于指定要从中读取值的 DOM 属性。当没有提供 bindingProperty 时，就假设它和 directiveProperty 一样。 |          |
| output                                                                                                                | string[] | 一组可供事件绑定的输出属性。当输出属性发出事件时，就会调用模板中一个附加到该事件的处理器。每个输出属性都会把 directiveProperty 映射到 bindingProperty： |

· directiveProperty 指定要发出事件的组件属性。
· bindingProperty 指定要附加事件处理器的 HTML 属性。||
|provides|Provider[]|服务提供商的集合||
|exportAs|string|一个或多个名字，可以用来在模板中把该指令赋值给一个变量。当有多个名字时，请使用逗号分隔它们。||
|queries|{[key: string]: any}|||
|jit|true|||
|host|`Record<string, string>`|||

## @Component

| 选项            | 类型 | 说明 |     |
| --------------- | ---- | ---- | --- |
| changeDetection |      |      |     |

## @NgModule

| 选项         | 类型                                               | 说明 |     |
| ------------ | -------------------------------------------------- | ---- | --- |
| declarations | 可用于本模块的视图类。组件、指令、管道。           |      |     |
| imports      | 引入其他模块                                       |      |     |
| providers    | 服务提供者，会加入到全局服务列表中。               |      |     |
| bootstrap    | 指定根组件。只有根模块才设置此属性。               |      |     |
| exports      | declarations 的子集，可用于其他模块的 declaration. |      |     |

## @Component

## @Component

## @Component
