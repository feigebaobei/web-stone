# api

## api styles

|            | options api                  | composition api                                                      |
| ---------- | ---------------------------- | -------------------------------------------------------------------- |
|            | 选项式 api                   | 组成式 api                                                           |
|            | 基于 composition api         | 也不知道怎么翻译成“沉浸式 api”的                                     |
|            | 各选项会绑定到`this`上       | 使用`<script setup>`，vue 框架会把编译它。                           |
|            |                              | 此时可以使用 setup().setup()返回的东西，会绑定到 this 对象上         |
|            | 用于低复杂度，如：功能增强。 | 若全应用中使用 vue,则使用 composition api + sfc                      |
| 这个功能好 | 不支持 tree shaking          | 支持 import 方式引入，即支持 tree shaking                            |
|            |                              | vue2.7 中可以使用`@vue/composition-api`包支持 composition api 写法。 |
|            |                              | vue3 中常用此写法，再与`<script setup>`结合使用。                    |
|            | 不可以                       | 可以脱离 vue 框架使用。该用例被称为“组合式函数”                      |
|            |                              |                                                                      |

## options api

## composition api

可分为三类：

- 响应式 api
- 生命周期方法
- 依赖注入，（需要与响应 api 结合使用）

### 为什么使用组合式 api

- 更好逻辑复用
- 方便扩展
- 更好的类型推断。主要与 ts 结合使用。
- 打包结果更小
-

## title

## title

## title

## title
