const clog = console.log
const getEnv = () => {
  // 0 本地
  // 10 prev
  // 20 生产
  let { host } = location
  if (host.includes('localhost')) {
    return 0
  } else if (host.includes('lixiaodan.org')) {
    return 20
  } else if (host.includes('vercel')) {
    return 21
  } else if (host.includes('netlify')) {
    return 22
  }
}

let parseUrlQS = (url = window.location.href, useCode = true) => {
  let index = url.indexOf('?')
  let qs = url.slice(index)
  qs = qs.slice(1)
  if (qs) {
    let res = qs
      .split('&') // [k=v, ...]
      .reduce((r, c) => {
        let [k, v] = c.split('=')
        if (useCode) {
          v = decodeURIComponent(v)
        }
        r[k] = v
        return r
      }, {})
    return res
  } else {
    return {}
  }
}

export { clog, getEnv, parseUrlQS }
