// import { type } from "os"

let clog = console.log

interface T {
    a: number
}
type G = {
    a: number
    // protected 
    b(): void
    // d(): void
}

class A implements T {
    public a: number = 0
    constructor(a: number) {
        this.a = a
    }
    protected b() {
        clog('b')
    }
}

class B implements G {
    a: number
    // b: () => void
    // d: () => void
    constructor () {
        this.a = 2
    }
    protected b() {
        clog('b')
    }
    static c = 2
    private d() {
        clog('d')
    }
}
let b = new B()
// B.b()
clog(B.c)
// B.d()




