# `prop-types`

## overview

> 检查传入 react 组件的数据的类型。
> propTypes 仅在开发模式下进行检查。
> 从 react v15.5 后分离出`prop-types`包。

### feature

## install

建议使用`^`指明版本。
`npm i -D prop-types`

```html
<script src="https://unpkg.com/prop-types@15.6/prop-types.js"></script>
```

## usage

```js
import PropTypes from 'prop-types'p
class Comp extends React.Component {...}
Comp.propTypes = {
    key: PropTypes.string
}
```

## type

```js
import PropTypes from 'prop-types'
Comp.propTypes = {
  optionalArray: PropTypes.array,
  optionalBool: PropTypes.bool,
  optionalFunc: PropTypes.func,
  optionalNumber: PropTypes.number,
  optionalObject: PropTypes.object,
  optionalString: PropTypes.string,
  optionalSymbol: PropTypes.symbol,
  optionalNode: PropTypes.node,
  optionalElement: PropTypes.element,
  optionalElementType: PropTypes.elementType,
  optionalMessage: PropTypes.instanceOf(Message),
  optionalEnum: PropTypes.oneOf(['News', 'Photos']),
  optionalUnion: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.instanceOf(Message),
  ]),
  optionalArrayOf: PropTypes.arrayOf(PropTypes.number),
  optionalObjectOf: PropTypes.objectOf(PropTypes.number),
  optionalObjectWithShape: PropTypes.shape({
    color: PropTypes.string,
    fontSize: PropTypes.number,
  }),
  optionalObjectWithStrictShape: PropTypes.exact({
    name: PropTypes.string,
    quantity: PropTypes.number,
  }),
  requiredFunc: PropTypes.func.isRequired,
  requiredAny: PropTypes.any.isRequired,
}
```

## configuration

默认配置文件：`path/to/file.json`。  
| key | description | default | enum | demo | | |
| --- | ----------- | ------- | ---- | ---- | --- | --- |
| | | | | | | |
| | | | | | | |
| | | | | | | |

## api

## principle

1. 使用 browserify 打包

```js
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
```

### uml

```

```

## todo

> react 怎么去调用 PropTypes 的验证方法的？
