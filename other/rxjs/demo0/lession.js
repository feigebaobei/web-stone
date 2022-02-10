let {log} = console
log(rxjs)

let {
    of,
    // create
} = rxjs

// const observable = rxjs.Observable.create((observer) => {
// const observable = create((observer) => {
//     observer.next('hello')
//     observer.next('word')
// })

// observable.subscribe(val => print(val))

log(of)

let source = of(1,2,3,4,5)
log(source)
let subscribe = source.subscribe(v => {
    console.log(v)
    print(v)
})


























function print(val) {
    let el = document.createElement('p')
    el.innerText = val
    document.body.appendChild(el)
}