# watch

## 监听 data

```js
data() {
    return {
        key: 'str'
    }
},
watch: {
    key: function (nv, ov) { // 请使用function
        // this.req()
    }
}
```

## 监听 props

```js
props() {
    initData: {
        type: String,
        dafault: ''
    }
},
data () {
    return {
        boxD: ''
    }
},
computed: {
    compData: {
        set: funtion (v) {
            this.boxD = v
        },
        get: funtion () {
            this.boxD
        },
    }
},
watch: {
    compData: function (nv, ov) {
        // this.req()
    }
}
```
