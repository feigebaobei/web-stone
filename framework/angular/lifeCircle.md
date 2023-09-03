# 生命周期

<!-- prettier-ignore-start -->
| 钩子函数 | 触发时机   |     |
| --------------------- | ------------------- | --- |
| ngOnChanges           | 被绑定的输入属性值发生变化时触发，会调用多次；如果没有使用到父子组件传值，则不会触发 |     |
| ngOnInit              | 初始化组件时会调用一次，一般是用来在构造函数之后执行组件复杂的初始化逻辑|     |
| ngDoCheck             | 只要数据发生改变就会被调用           |     |
| ngAfterContentInit    | 组件内容渲染完成后调用一次     |     |
| ngAfterContentChecked | 只要组件的内容发生改变就会被调用|     |
| ngAfterViewInit       | 视图加载完成后触发一次，一般用来对视图的 dom 元素进行操作 |     |
| ngAfterViewChecked    | 视图发生变化时调用，在组件的生命周期中会调用多次          |     |
| ngOnDestroy           | 只在销毁组件时调用一次，一般用来在组件销毁前执行某些操作  |     |
<!-- prettier-ignore-end -->
