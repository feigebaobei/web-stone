# introjs

## overview

> 一步一步地展示介绍或提示的工具。  
> 官网的文档就是坑。都按照示例把功能写完了，才告诉读者还与各框架结合的独立包。

### feature

- 控制是否不再提示
- 显示提示点
- 与原生 js 结合使用/与常用框架结合使用

## install

```shell
# 请选择合适的安装
npm i introjs
# react
npm install intro.js-react
# angular
# dart
# drupal
# ember
# gwt
# r
# rails
# wordpress
# yii
# yii2
# magento
```

不支持 vue

## usage

### 直接使用

1. 安装
2. 在 html 中定义好属性
3. 使用 js 代码调用 api

```shell
npm i introjs
```

```html
<div
  data-step="1"
  data-title="title"
  data-intro="Hello step one!"
  data-hint="hint"
>
  str
</div>
```

```js
import introJs from 'intro.js'
introJs().start()
```

### 使用配置文件

```js
introJs()
  .setOptions({
    steps: [
      {
        title: 'Welcome',
        intro: 'Hello World! 👋',
      },
      {
        element: document.querySelector('.card-demo'),
        intro: 'This step focuses on an image',
      },
      {
        title: 'Farewell!',
        element: document.querySelector('.card__image'),
        intro: 'And this is our final step!',
      },
    ],
  })
  .start()
```

### 与 react 一起使用

```shell
npm install intro.js-react
```

在主文件中引入样式文件

```js
import 'intro.js/introjs.css'
```

```js
import { Steps, Hints } from 'intro.js-react'
// 只2个。
// Steps 定义介绍的步骤
// Hints 定义介绍的提示点
const steps = [
  {
    element: '.selector1',
    intro: 'test 1',
    position: 'right',
    tooltipClass: 'myTooltipClass',
    highlightClass: 'myHighlightClass',
  },
  {
    element: '.selector2',
    intro: 'test 2',
  },
  {
    element: '.selector3',
    intro: 'test 3',
  },
]
;<Steps
  enabled={stepsEnabled}
  steps={steps}
  initialStep={initialStep}
  ref={(steps) => (this.steps = steps)}
  onExit={this.onExit}
/>
onBeforeChange = (nextStepIndex) => {
  if (nextStepIndex === 4) {
    this.steps.updateStepElement(nextStepIndex)
  }
}

const hints = [
  {
    element: '.selector1',
    hint: 'test 1',
    hintPosition: 'middle-middle',
  },
  {
    element: '.selector2',
    hint: 'test 2',
  },
]
;<Hints
  enabled={hintsEnabled}
  hints={hints}
  ref={(hints) => (this.hints = hints)}
/>
```

#### Steps

props

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|required||
|-|-|-|-|-|-|-|-|
|enabled|是否显示|boolean|false|||||
|initialStep|初始步骤值|number||||y||
|steps|所有的步骤|step[]||||y||
|onExit|退出时的回调|Function||||y||
|onBeforeExit|退出前的回调|Function||||||
|onStart|开始|Function||||||
|onChange|当步骤改变时触发的回调|Function||||||
|onBeforeChange|改变步骤前回调|Function||||||
|onAfterChange|改变步骤后回调|Function||||||
|onPreventChange|阻止改变步骤的回调。当返回false时不改变步骤。|Function||||||
|onComplete|完成时回调|Function||||||
|options||Objecg||||||
|||||||||
<!-- prettier-ignore-end -->

step 的属性

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|required||
|-|-|-|-|-|-|-|-|
|element||string||||||
|intro||string/ReactElement||||y||
|position||string||||||
|tooltipClass||string||||||
|highlightClass||string||||||
<!-- prettier-ignore-end -->

#### Hints

props

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|required||
|-|-|-|-|-|-|-|-|
|enabled||boolean||||||
|hints||hint[]||||y||
|onClick||Function||||||
|onClose||Function||||||
|options||boolean||||||
<!-- prettier-ignore-end -->

hints

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|required||
|-|-|-|-|-|-|-|-|
|elment||string||||y||
|hint||string||||y||
|hintPosition||string||||||
<!-- prettier-ignore-end -->

### 与 angular 一起使用

## 主题

- classic
- Royal
- Nassim
- Nazanin
- Dark
- Modern

## configuration

默认配置文件：`path/to/file.json`。

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|||||||||
|||||||||
|||||||||
<!-- prettier-ignore-end -->

## api

### introJs 的 api

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|introJs(dom?) => introJs|创建并返回一个introJs对象|||||||
|`introJs.start() => Promise<introJs>`|开始介绍|||||||
|`introJs.goToStep(step: number => Promise<introJs>)`|跳到指定的步骤|||||||
|`introJs.goToStepNumber(step: number => Promise<introJs>)`|跳到指定的步骤|||||||
|`introJs.addStep(options)`|添加新步骤|||||||
|`introJs.addSteps(steps)`|添加新步骤|||||||
|`introJs.nextStep() => Promise<introJs>`|下一步|||||||
|`introJs.previousStep() => Promise<introJs>`||||||||
|`introJs.exit(force?: boolean) => Promise<introJs>`|退出介绍|||||||
|`introJs.setOption(option, value) => introJs`|为introJs对象设置option|||||||
|`introJs.setOption(options) => introJs`|为introJs对象设置option|||||||
|`introJs.refresh() => introJs`|刷新所有介绍步骤|||||||
|`introJs.isActive() => boolean`|是否在活动|||||||
|`introJs.setDontShowAgain(dontShowAgain: boolean) => introJs`|是否显示不再提示|||||||
|`introJs.oncomplete(providedCallback: Function) => introJs`|完成介绍时的回调方法|||||||
|`introJs.onexit(cb: Function) => introJs`|退出介绍时的回调|||||||
|`introJs.onbeforeexit(cb) => introJs`|设置退出前的回调，若返回false，则不退出。|||||||
|`introJs.onchange(cb) => introJs`|当|||||||
|`introJs.onbeforechange(cb) => introJs`|进入新步骤前的回调。该回调方法的参数是新步骤。|||||||
|`introJs.onafterchange(cb) => introJs`|进入新步骤后的回调，该回调方法的参数是当前步骤。|||||||
<!-- prettier-ignore-end -->

### html 中的属性

<!-- prettier-ignore-start -->
|key|description|type|default|enum|demo|||
|-|-|-|-|-|-|-|-|
|data-intro|介绍的内容|||||||
|data-title|介绍的标题|||||||
|data-step|指定步骤，可选。|||||||
|data-tooltip-class|可选|||||||
|data-highlight-class|可选|||||||
|data-position|位置|string|'bottom'|'top'/ 'left'/ 'right'/ 'bottom'/ 'bottom-left-aligned' (same as bottom)/ 'bottom-middle-aligned'/ 'bottom-right-aligned'/ 'auto' ||||
|data-scroll-to|滚动到element还是tootip。|string|'element'|||||
|data-disable-interaction|不可交互。|boolean / number||true/false/1/0||||
<!-- prettier-ignore-end -->

### option 的属性

<!-- prettier-ignore-start -->
|isActive||||||||
|steps||||||||
|nextLabel||||||||
|prevLabel||||||||
|skipLabel||||||||
|doneLabel||||||||
|hidePrev||||||||
|hideNext||||||||
|nextToDone||||||||
|tooltipPosition||||||||
|tooltipClass||||||||
|group||||||||
|highlightClass||||||||
|exitOnEsc||||||||
|exitOnOverlayClick||||||||
|showStepNumbers||||||||
|stepNumbersOfLabel||||||||
|keyboardNavigation||||||||
|showButtons||||||||
|showBullets||||||||
|showProgess||||||||
|scrollToElement||||||||
|scrollTo||||||||
|scrollPadding||||||||
|overlayOpacity||||||||
|autoPosition||||||||
|positionPrecedence||||||||
|disableInteraction||||||||
|dontShowAgain||||||||
|dontShowAgainLabel||||||||
|dontShowAgainCookie||||||||
|dontShowAgainCookieDays||||||||
|helperElementsPadding||||||||
|buttonClass||||||||
|progressBarAdditionalClass||||||||
<!-- prettier-ignore-end -->

## principle

此包的处理逻辑。

### uml

```

```

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
