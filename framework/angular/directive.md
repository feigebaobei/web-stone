# directive

- 面向 dom 的公共解决方案

分类

- 组件指令
- 结构指令 `*ngFor/*ngIf/*ngSwitch/*ngSwitchCase/*ngSwitchDefault`
- 属性指令 `*ngStyle/*ngClass`
- 自定义指令

## demo

```
<div *ngIf="boolean">...</div>
<div *ngFor="let item of list">
    <div [data]="item">
</div>


```

## ngModelChange

用于监听 ngModel（双向绑定）的值改变。

```
<input [(ngModel)]="value" (ngModelChange)="onChange($event)">
```

当 input type="file"时请使用`onchange`事件。
