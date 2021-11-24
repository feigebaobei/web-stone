```
<my-comp v-model:first-name="value"></my-comp>

props: {
    firstName: String
},
emits: ['update:firstName'],
handle() {
    emit('update:firstName', payload)
}
```