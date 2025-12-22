# react 中的方法式组件使用 ref prop

- 明确环境的 reactElement 元素，并全部暴露。
- 只暴露指定的属性（包括数据、方法）

```js
let InputComp = React.forwardRef((props, ref) => {
    return <input ref={ref} />
})
function C () {
    let inputEl = useRef(null)
    let btClickHandler = () => {
        inputEl.current.focus()
    }
    return (
        <>
            <InputComp ref={inputEl}>
            <button onClick={btClickHandler}>bt</button>
        </>
    )
}
```

```js
// App.js
export default function App () {
    let counterRef = useRef()
    let reset = () => {
        counterRef.current.resetCount && counterRef.current.resetCount()
    }
    return (<div>
        <button onClick={reset}>reset</button>
        <MyC ref={counterRef}/>
    </div>)
}

// C.js
function C (props, ref) {
    let [count, setCount] = useState(0)
    let btClickHandler = () => {
        setCount(count + 1)
    }
    let resetCount = () => {setCount(0)}
    React.useImperativeHandle(ref, () => {
        resetCount: resetCount
    })
    return (<div>
        <span>{count}<span>
        <button onClick={btClickHandler}>+1</button>
    </div>)
}
export default MyC = React.forwardRef(C)
```
