# 生命周期

- setup 可替代 data/method/computed/watch/xxx

| 选项式        | hook inside setup |     |     |
| ------------- | ----------------- | --- | --- |
| beforeCreate  | -(setup)          |     |     |
| created       | -(setup)          |     |     |
| beforeMount   | onBeforeMount     |     |     |
| mounted       | onMounted         |     |     |
| beforeUpdate  | onBeforeUpdate    |     |     |
| updated       | onUpdated         |     |     |
| beforeUnmount | onBeforeUnmount   |     |     |
| unMounted     | onUnmounted       |     |     |
| activated     | onActivated       |     |     |
| deactivated   | onDeactivated     |     |     |
|               |                   |     |     |
|               |                   |     |     |
