# 用法

```html
文本插值
<p>{{title}}</p>

import { Component } from '@angular/core'
<!-- 装饰组件 -->
<!-- 按照指定条件渲染组件 -->
@Component({ selector: '..', templateUrl: '..', standalone: true, styleUrls:
['...'], }) export class AppComponent { title = 'string' }

<!-- *ngIf 条件渲染 -->
<p *ngIf="var else def">str</p>
<!-- #def 是模板变量 -->
<ng-template #def>
  <p>hi</p>
</ng-template>

ngIf ngFor ngSwitch ngStyle 都来自 @angular/common

<!-- 绑定事件 -->
<button (click)="fn()">bt</button>

<!-- 循环渲染 -->
<p *ngFor="let item of items">{{item.title}}</p>

<a [routerLink]="['a', 'b']">link</a>
<router-outlet></router-outlet>

import { HttpClient } from '@angular/common/http' constructor(private http:
HttpClient) {} ngOnInit(): void { this.http.get<T[]
  >('url') .subscribe((items) => { this.arr = items }) }
</T[]>
```
