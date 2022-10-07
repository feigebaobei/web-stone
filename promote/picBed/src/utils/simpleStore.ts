type SimpleStore = any
let createSimpleStore: any = () => {
    let simpleStore: SimpleStore = {
        value: new Set(),
        isExist: function (v: SimpleStore) {
            return simpleStore.value.has(v)
        },
        add: function(v: SimpleStore) {
            simpleStore.value.add(v)
        },
        remove: function (v: SimpleStore) {
            simpleStore.value.delete(v)
        }
    }
    return simpleStore
}
export default createSimpleStore