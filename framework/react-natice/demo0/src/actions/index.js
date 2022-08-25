
let increment = (nr = 1) => {
  return {
    type: 'INCREMENT',
    payload: nr
  }
}
let decrement = () => {
  return {
    type: 'DECREMENT'
  }
}
export {
    increment,
    decrement
}