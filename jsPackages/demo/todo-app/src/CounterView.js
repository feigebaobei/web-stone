import { useState } from "react";
import store from "./store";

function CounterView() {
  let [counter, setCounter] = useState(store.getState().counter)
  // 在订阅者是更新state。react会在state更新时更新组件。
  store.subscribe(() => {
    setCounter(store.getState().counter)
  })
  return (
    <div className="CounterView">
        {counter}
    </div>
  );
}

export default CounterView;
