# css-in-js

- 在 js 文件中编写样式。
- 在当前组件范围内的样式。
- 基于 props 使用动态样式。
- 避免 class name 冲突。

需要安装包`styled-components`，可能还有别的方法。
`npm i styled-components`

## demo

```jsx
import styled from 'styled-components'

const MyHeader = styled.h1`
  color: blue;
`

function App() {
  return <MyHeader>string</MyHeader>
}
```

如果没有 css-in-js，则需要：

- 写一个单独\*.css 文件。再引入到 react 组件文件中。
- 写行内样式
  如果没有 css-in-js，则可以收益：
- 使用`styled`对象去创建组件。
- 样式与组件写在一个文件中。
- 可以使用常规的 css 语法。

## 在 style 中使用 props

```jsx
import styled from 'styled-components'

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  background-color: ${(props) =>
    props.btntype === 'primary' ? '#007bff' : '#6c757d'};
  color: white;
  cursor: pointer;
`

function App() {
  return (
    <div>
      <Button btntype="primary">Primary Button</Button>
      <br />
      <br />
      <Button>Secondary Button</Button>
    </div>
  )
}
```

## 扩展样式

```jsx
import styled from 'styled-components'

const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: white;
  cursor: pointer;
`

const PrimaryButton = styled(Button)`
  background-color: #007bff;
`

const SuccessButton = styled(Button)`
  background-color: #28a745;
`

function App() {
  return (
    <div>
      <PrimaryButton>Primary</PrimaryButton>
      <SuccessButton>Success</SuccessButton>
    </div>
  )
}
```

## 全局样式

```jsx
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  h1 {
    color: white;
    background-color: purple;
    font-family: Arial, sans-serif;
  }

  .myparagraph {
    font-family: courier, monospace;
    color: blue;
  }
`

function App() {
  return (
    <>
      <GlobalStyle />
      <h1>Welcome!</h1>
      <p className="myparagraph">
        This paragraph is styled with global styles.
      </p>
    </>
  )
}
```

- 可在浏览器中编译。
- 可使用 node 在服务端打包。
- 代表是[jss]()
