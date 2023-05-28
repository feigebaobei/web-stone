## ts + axios

```ts
import axios from 'axios'

let instance = axios.create({
  baseURL: '...',
  timeout: 5000,
})

let req = (params) => {
  return instance(params)
    .then((res) => {
      return res.data
    })
    .catch((error) => {
      return Promise.reject(error)
    })
}
export { instance, req }
```
