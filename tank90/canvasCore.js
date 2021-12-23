window.requestNextAnimateionFrame = (
    function () {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequeatAnimationFrame || window.msRequestAnimationFrame || function (cb, element) {
            var self = this, start, finish;
            window.setTimeout(function () {
                start = +new Date()
                cb(start)
                finish = +new Date()
                self.timeout = 100 / 60 - (finish - start)
            }, self.timeout)
        }
    }
)
window.cancelNextAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame || window.clearTimeout;



class Sprite {
    constructor({name ='', left = 0, top = 0, width = 0, height = 0, vx = 0, vy = 0, visible = true, animating = false}, painter, behaviors = {}) {
        this.name = name
        this.left = left
        this.top = top
        this.width = width
        this.height = height
        this.vx = vx
        this.vy = vy
        this.visible = visible
        this.animating = animating
        this.painter = painter // object
        this.behaviors = new Map() // 可优化为map对象
        Object.entries(behaviors).forEach(([k, fn]) => {
        	this.behaviors[k] = fn
        })
        // this.behaviors: map = {
        //     key: fn,
        //     ...
        // }
        // this.tempRandomArr = new Set()
        // while (tempRandomArr.size < behaviors.length) {
        //     tempRandomArr.push(Math.floor(Math.random() * 100000))
        // }
        // // array
        // // obj
        // // set
        // // map
        // if (Array.isArray(behaviors)) {
        //     this.behaviors = new Map()
        //     behaviors.forEach((fn, index) => {
        //         this.behaviors.set(this.tempRandomArr(index), fn)
        //     })
        // } else {
        //     Object.entries(behaviors).forEach(([k, v]) => {
        //         this.behaviors.set(k, v)
        //     })
        // }


    }
    paint(context) {
        if (this.painter && this.visible) {
            this.painter.paint(this, context)
        }
    }
    update(context, time) {
        this.behaviors.forEach(behavior => {
            behavior.execute(this, context, time)
        })
    }
    // update painter

    // add behavior
    setBehavior(key, value = null) {
        // if (!value) {
        //     value = key
        //     do {
        //         key = Math.floor(Math.random() * 100000)
        //     } while (this.tempRandomArr.has(key))
        //     key = this.tempRandomArr[this.tempRandomArr.length - 1]
        // }
        this.behaviors.set(key, value)

    }
    // remove behavior
    removeBehavior(key) {
        this.behaviors.delete(key)
    }
    // clear behaviors
    clearBehavior() {
        this.behaviors = new Map()
    }
}