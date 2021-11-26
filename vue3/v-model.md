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

`v-model`的默认props是`modelValue`，事件是`update:modelValue`
