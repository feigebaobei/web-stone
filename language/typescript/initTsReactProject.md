# 初始化一个 ts&react 项目

## 最小化创建

```shell
mkdir react-ts
cd react-ts
npm init -y
npm i react react-dom
npm i parcel
npm i -g typescript
npm i @types/react @types/react-dom
mkdir src

# cd src
```

创建`<root>/src/index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <title>React + TypeScript</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
    <div id="main"></div>
    <script type="module" src="./App.tsx"></script>
  </body>
</html>
```

```shell
npm pkg set script.dev="parcel src/index.html"
```

创建`<root>/src/Counter.tsx`

```ts
import * as React from 'react'

export default class Counter extends React.Component {
  state = {
    count: 0,
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }

  decrement = () => {
    this.setState({
      count: this.state.count - 1,
    })
  }

  render() {
    return (
      <div>
        <h1>{this.state.count}</h1>
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    )
  }
}
```

创建`<root>/src/App.tsx`

```ts
import * as React from 'react'
import { render } from 'react-dom'

import Counter from './Counter'

render(<Counter />, document.getElementById('main'))
```

执行修改权限的命令

```shell
sudo ufw allow 1234
```

我不知道它是做什么的。
执行启动命令

```shell
npm run dev
```

## ts & cra

```shell
create-react-app ts-react-app --template typescript
```

方法式组件的写法

```ts
import * as React from 'react'

interface Props {
  count: number
}

const Count: React.FunctionComponent<Props> = (props) => {
  return <h1>{props.count}</h1>
}

export default Count
```

class 式组件的写法

```ts
import * as React from 'react'

import Count from './Count'

interface Props {}

interface State {
  count: number
}

export default class Counter extends React.Component<Props, State> {
  state: State = {
    count: 0,
  }

  increment = () => {
    this.setState({
      count: this.state.count + 1,
    })
  }

  decrement = () => {
    this.setState({
      count: this.state.count - 1,
    })
  }

  render() {
    return (
      <div>
        <Count count={this.state.count} />
        <button onClick={this.increment}>Increment</button>
        <button onClick={this.decrement}>Decrement</button>
      </div>
    )
  }
}
```
