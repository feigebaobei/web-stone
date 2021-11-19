props中类型断言。

``` ts
import type {PropType} from 'vue'
type Fn = (p: number, q: boolean) => void
props: {
    key: {
        type: Function as PropType<Fn>
    },
    k1: {
        type: Array as PropType<Fn[]>
    },
    k2: {
        type: [String, Object] as PropType<string | {[p: string]: any}>
    }
}
```