# principle
## 渲染机制
程序员使用vue框架，编写sfc文件。vue会把它们搞vdom。vue根据vdom生成dom，当vdom改变时vue更新dom。  

## vue2不能做到的事
- 在data中不声明的对象、属性，不能响应式。  
- 使用this.$set(this.data.k, 'p', v) 可实现响应式。  
- 对数组根据下标改变数据时，不能响应式。  
- 使用vm.items.splice(arr, 1, nv) 可实现响应式。（vue2对splice做了修改）  
- 当改变数组长度时，不能响应式。  
- 使用vm.items.splice(newLength) 可实现响应式  
- 内部使用Promise.then() MutationObserver setImmediate setTimeout处理异步功能。  
- Vue.nextTick(cb) 在数据变化后立即执行回调。  
- 