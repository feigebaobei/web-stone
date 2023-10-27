# directive

- 操作 dom

分类

- 组件指令
- 结构指令 `*ngFor/*ngIf/*ngSwitch/*ngSwitchCase/*ngSwitchDefault`
- 属性指令 `*ngStyle/*ngClass`
- 自定义指令

## ngModelChange

用于监听 ngModel（双向绑定）的值改变。

```
<input [(ngModel)]="value" (ngModelChange)="onChange($event)">
```

当 input type="file"时请使用`onchange`事件。
