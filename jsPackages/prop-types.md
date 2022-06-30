# `prop-types`

## overview
> 检查传入react组件的数据的类型。

### feature

## install
建议使用`^`指明版本。
`npm i -D prop-types`
```html
<script src="https://unpkg.com/prop-types@15.6/prop-types.js"></script>
```

## usage
```js
import PropTypes from 'prop-types'
class Comp extends React.Component {...}
Comp.propTypes = {
    key: PropTypes.string
}
```

## configuration
默认配置文件：`path/to/file.json`。  
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
||||||||
||||||||
||||||||
## api

## principle
1. 使用browserify打包

fn() {
    let ReactPropTypes = {
        array: createPrimitiveTypeChecker('array'),
        ...
    }
    let createPrimitiveTypeChecker = (expectedType) => {
        function validate (...) {...}
        return createChainableTypeChecker(validate) // 高阶函数
    }
    let createChainableTypeChecker = () => {
        let checkType = (...) => {....}
        let chainedCheckType = checkType(...)
        return chainedCheckType
    }
    ReactPropTypes.PropTypes = ReactPropTypes // 循环指向 自循环
    return ReactPropTypes
}

### uml
```
```

## todo
> react怎么去调用PropTypes的验证方法的？