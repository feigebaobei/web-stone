# skeleton

## 实现方式

### html + css 手写。适用于简单页面

- 使用 div/p 等标签占位。再使用 liner-gradient + animate 实现动画。

### 工具、插件自动生成（推荐）

- 微信小程序已经内置骨架屏代码。可以直接使用
- vue/ webpack 插件 vue-skeleton-webpack-plugin + ssr

### 组件化实现（现代框架）

- 创建一个骨架屏组件。
- 加载数据时，显示骨架屏。加载完数据后，隐藏骨架屏。

#### 具体示例

```
<template>
    <div class="skeleton-container">
        <div class="skeleton-header"></div>
        <div class="skeleton-body"></div>
        <div class="skeleton-footer"></div>
    </div>
</template>
<style>
    .skeleton-container {...}
    .skeleton-header {...}
    .skeleton-body {...}
    .skeleton-footer {...}
</style>
```

```js
<loading v-if="loadingR === 1"></loading>
<pageElement v-if="loadingR === 2"></pageElement>

let loadingR = ref(0)
// 0 不显示loading 不显示数据
// 1   显示loading 不显示数据
// 2 不显示loading   显示数据
let waitP = (t = 500) => {
    return new Promise((s, j) => {
        setTimeout(() => {s({
            res: {},
            flag: 'wait'
        })}, t)
    })
}


onMounted(() => {
    let p0 = req().then((res) => {
        return {
            res,
            flag: 'req'
        }
    }).catch((error) => {
        return Promise.resolve({
            error,
            flag: 'req'
        })
    })
    let p1 = waitP()
    let p2 = Promise.race([p0, p1]).then((obj: any) => {
        let r
        switch (obj.flag) {
            case 'req':
                if (obj.res) {
                    r = obj.res
                } else {
                    r = obj.error
                }
                break;
            case 'wait':
                loadingR.value = 1
                r = obj.res
                break;
        }
        clog('loadingR', loadingR.value)
        return r
    })
    Promise.all([p2, p0]).then((res) => {
        loadingR.value = 2
        res // 使用res
        clog('loadingR', loadingR.value)
        return
    })
    // 请求数据，开始500后并没收响应，则显示骨架屏。
    // 收到数据后关闭骨架屏。
})
```
