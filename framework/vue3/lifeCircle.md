# 生命周期

- setup 可替代 data/method/computed/watch/xxx

<!-- prettier-ignore-start -->
|          | 选项式        | hook inside setup （composition api 组合式 api） |    |     |
| -------- | - | -------- | --------- | --- |
| 创建阶段 | beforeCreate  | -(setup)    |    |     |
| 创建阶段 | created       | -(setup)              |    |     |
| 挂载阶段 | beforeMount   | onBeforeMount         |  |     |
| 挂载阶段 | mounted       | onMounted             |    |     |
| 更新阶段 | beforeUpdate  | onBeforeUpdate        |    |     |
| 更新阶段 | updated       | onUpdated             | 不要修改状态，防止无限循环。  |     |
| 卸载阶段 | beforeUnmount | onBeforeUnmount       |    |     |
| 卸载阶段 | unMounted     | onUnmounted           |    |     |
|          | activated     | onActivated           |    |     |
|          | deactivated   | onDeactivated         |    |     |
|          | errorCaptured | onErrorCaptured       | (err, instance, info) => {...} 捕获后代组件的错误 |     |
|          | 无            | onRenderTracked       | 跟踪虚拟 dom 重新渲染时依赖的响应式数据           |     |
|          | 无            | onRenderTriggered     | 跟踪触发虚拟 dom 重新渲染的响应式数据             |     |
<!-- prettier-ignore-end -->
