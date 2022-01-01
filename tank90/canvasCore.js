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
)()
window.cancelNextAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.msCancelAnimationFrame || window.clearTimeout;



class Point {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
    }
    distanceWithPoint(p) {
        return Math.hypot(this.x - p.x, this.y - p.y)
    }
    // 中心对称
    // 轴对称
}

class Sprite {
    constructor(
        {
            name ='', 
            left = 0, 
            top = 0, 
            width = 0, 
            height = 0, 
            v = new Vector(0, 0), 
            visible = true, 
            animating = false, 
            direction = new Vector(0, 1),
            // 相对于left/top
            crashGraphPoints = [], // 必须顺时针或逆时针
        }, painter, behaviors = {}, category = []) {
        this.name = name
        this._left = left
        this._top = top
        this.width = width
        this.height = height
        this.v = v
        this.visible = visible
        this.animating = animating
        this.direction = direction // 应该是个单位向量
        this.painter = painter // object
        this.behaviors = behaviors
        // this.crashGraphPoints = crashGraphPoints
        this._crashGraphPoints = crashGraphPoints
        this.crashGraph = new Polygon(crashGraphPoints)
        this.category = category

        // this.crashGraph = 
        // this.behaviors = new Map() // 可优化为map对象
        // Object.entries(behaviors).forEach(([k, fn]) => {
        // 	this.behaviors[k] = fn
        // })
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
    get top () {
        return this._top
    }
    set top (v) {
        this._top = v

    }
    get left () {
        return this._left
    }
    set left (v) {
        this._left = v
    }
    get crashGraphPoints () {
        return this._crashGraphPoints
    }
    set crashGraphPoints (v) {
        if (Array.isArray(v)) {
            this._crashGraphPoints = v
            this.crashGraph = new Polygon(v)
        } else {
            throw new Error('可碰撞图形的点必须是数组')
        }
    }
    paint(context) {
        if (this.painter && this.visible) {
            this.painter.paint(this, context)
        }
    }
    update(context, time) {
        // time: fps
        this.updateGraph(context, time)
    }
    updateGraph(context, fps) {
        this.behaviors.forEach(behavior => {
            behavior.execute(this, context, fps)
        })
    }
    updateCrashGraph() {
        
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
class ImagePainter {
    constructor(src) {
        this.image = new Image()
        this.image.src = src
    }
    paint(sprite, context) {
        if (this.image.complete) {
            context.drawImage(this.image, sprite.left, sprite.top, sprite.width, sprite.height)
        }
    }
}
class CanvasPainter {
    constructor(canvas) {
        this.canvas = canvas
    }
    paint(sprite, context) {
        context.drawImage(this.canvas, sprite.left, sprite.top, sprite.width, sprite.height)
    }
}


class Polygon {
    constructor(points = []) {
        this.points = points
    }
    collidesWith(shape) {
        return !this.isSeparationOnAxes(this.getAxes().concat(shape.getAxes()), shape)
    }
    isSeparationOnAxes(axes, shape) { // 是否处于分离状态
        for (let i = 0; i < axes.length; i++) {
            let p1 = this.project(axes[i])
            let p2 = shape.project(axes[i])
            if (!p1.isOverlap(p2)) {
                return true
            }
        }
        return false
    }
    getAxes() {
        let [v1, v2] = [new Vector(), new Vector()]
        let axes = []
        for (let i = 0; i < this.points.length - 1; i++) {
            v1.x = this.points[i].x
            v1.y = this.points[i].y
            v2.x = this.points[i + 1].x
            v2.y = this.points[i + 1].y
            axes.push(v1.edge(v2)[0].normal()[0])
        }
        v1.x = this.points[this.points.length - 1].x
        v1.y = this.points[this.points.length - 1].y
        v2.x = this.points[0].x
        v2.y = this.points[0].y
        axes.push(v1.edge(v2)[0].normal()[0])
        return axes
    }
    project(axis) {
        let [v, scalars] = [new Vector(), []]
        this.points.forEach(point => {
            v.x = point.x
            v.y = point.y
            scalars.push(v.dotProduct(axis))
        })
        return new Projection(Math.min.apply(null, scalars), Math.max.apply(null, scalars))
    }
    // move(shape) {}
    // createPath(shape) {}
    // fill(shape) {}
    // stroke(shape) {}
    createPath(context) {
        if (!this.points.length) {
            return
        }
        context.beginPath()
        context.moveTo(this.points[0].x, this.points[0].y)
        for (let i = 1; i < this.points.length; i++) {
            context.lineTo(this.points[i].x, this.points[i].y)
        }
        context.closePath()
    }
    isPointInPath(context, x, y) {
        this.createPath(context)
        return context.inPointInPath(x, y)
    }
}

class Projection {
    constructor(min = 0, max = 0) {
        this.min = min
        this.max = max
    }
    isOverlap(projection) {
        return this.max > projection.min && projection.max > this.min
    }
}
class Game {
    constructor (gameName, canvasId, effectDraw,
        option = {
            showTime: false
        }, crashCb
    ) {
        this.name = gameName
        this.canvas = document.querySelector(canvasId)
        this.context = this.canvas.getContext('2d')
        this.edgeLength = Math.min(this.canvas.width, this.canvas.height)
		this.edgeLengthHalf = this.edgeLength * 0.5
		this.edgeLength01 = edgeLength * 0.1
        this.edgeLength02 = edgeLength * 0.2
        this.edgeLength03 = edgeLength * 0.3
        this.edgeLength04 = edgeLength * 0.4
        this.edgeLength05 = edgeLength * 0.5
        this.edgeLength06 = edgeLength * 0.6
        this.edgeLength07 = edgeLength * 0.7
        this.edgeLength08 = edgeLength * 0.8
        this.edgeLength09 = edgeLength * 0.9
		
        this.sprites = new Map()
        this.startTime = +new Date()
        this.lastTime = null
        this.gameTime = null
        this.fps = 60
        // this.STARTING_FPS = 60
        // this.paused = false
        this._animating = false
        this.startedPauseAt = null
        this.PAUSE_TIMEOUT = 100 // 可能用不上
        this.animateId = 0
        this.animate = () => {}
        this.queueSource = new SourceMap()
        this.soundOn = true
        this.NUM_SOUND_CHANNELS = 10 // 音频的数量
        this.soundChannels = new Array(this.NUM_SOUND_CHANNELS).fill(new Audio)
        this.audio = new Audio()
        this.keyListeners = new Map()
        this.HIGH_SCORES_SUFFIX = '_highscores'
        this.over = false
        this.effectDraw = effectDraw
        this._lastTimeForCalcFps = 0 // +new Date()
        this.option = option
        window.onkeydown = (event) => {
            this.keydowned(event)
        }
        window.onkeyup = (event) => {
            this.keyuped(event)
        }
        // this.spritesCategory = new WeakMap()
        this.spritesCategory = new Map()
        this.crashCb = crashCb
        this.title = 0
        this.title = 0
        this.title = 0
    }
    updateFrameRate = () => {
        // let now = +new Date()
        // this.fps = 1000 / (now - this._lastTimeForCalcFps)
        // console.log(now, this._lastTimeForCalcFps)
        // this._lastTimeForCalcFps = now
        // if (this.lastTime) {
        //     this.fps = this.STARTING_FPS
        // } else {
        //     this.fps = 1000 / (time - this.lastTime)
        // }
        // return fps
        if (this._lastTimeForCalcFps) {
            // this.fps = this.STARTING_FPS
            this.fps = 60
        } else {
            let now = +new Date()
            this.fps = 1000 / (now - this._lastTimeForCalcFps)
            this._lastTimeForCalcFps = now
        }
        return this.fps
    }
    clearScreen = () => {
        this.context.clearRect(0, 0, canvas.width, canvas.height)
    }
    // 考虑使用懒方法优化
    start() {
        if (this.over) return
        this.startTime = +new Date()
        // this.clearScreen()
        this.animate = (time) => {
            // context.clearRect(0, 0, edgeLength, edgeLength)
            // fps = calcFps()
            // this.draw()
            this.clearScreen()
            this.updateFrameRate()
            // this.option.showTime && this.tick()
            if (this.option.showTime) {
                this.tick()
            }
            this.updateSprites()
            this.paintSprites()
            this.effectDraw()
            this.detectCrash()
            // log(this)
            this.animateId = requestNextAnimateionFrame(this.animate)
        }
        this.animateId = requestNextAnimateionFrame(this.animate)
        this._animating = true
    }
    detectCrash () {}
    end() {
        // 解绑所有事件
        // cancelNextAnimationFrame(this.animateId)
        this.animating = false
        this.over = true
    }
    // draw() {
    //     // log('draw')
    // }
    get animating () {
        // this.updateFrameRate = () => {}
        return this._animating
    }
    set animating (flag) {
        if (flag) { // 开始动画
            this.startTime = +new Date()
            // this.clearScreen()
            this.animate = (time) => {
                // context.clearRect(0, 0, edgeLength, edgeLength)
                // fps = calcFps()
                // this.draw()
                this.clearScreen()
                this.updateFrameRate()
                // this.option.showTime && this.tick()
                if (this.option.showTime) {
                    this.tick()
                }
                this.updateSprites()
                this.paintSprites()
                this.effectDraw()
                this.animateId = requestNextAnimateionFrame(this.animate)
            }
            this.animateId = requestNextAnimateionFrame(this.animate)
            this._animating = true
        } else { // 结束动画
            // this.animate = () => {}
            cancelNextAnimationFrame(this.animateId)
        }
        return this._animating = flag
    }
    toggleAnimating () {
        this.animating = !this.animating
    }
    tick(time) { // 计算游戏进行了多少时间
        console.log('tik')
        // this.context
        // this.updateFrameRate(time)
        // this.gameTime = (+new Date()) - this.startTime
        // this.lastTime = time
    }
    updateSprites(time) {
        this.sprites.forEach(sprite => {
            if (sprite.visible && sprite.animating) {
                // console.log(this.fps)
                sprite.update(this.context, this.fps)
            }
        })
    }
    getSprite(spriteName) {
        this.sprite.get(spriteName)
    }
    setSprite(sprite) {
        this.sprites.set(sprite.name, sprite)
        // this.spritesCategory.set(this.sprites.get(sprite.name), sprite.category)
        // this.spritesCategory.set(sprite, sprite.category)
        // this.spritesCategory.set(sprite.category, sprite)
        if (this.spritesCategory.has(sprite.category)) {
            this.spritesCategory.get(sprite.category).push(sprite)
        } else {
            this.spritesCategory.set(sprite.category, [sprite])
        }
    }
    removeSprite(p) {
        let spriteName = typeof p === 'string' ? p : p.name
        let res = this.sprites.get(spriteName)
        this.sprites.delete(spriteName)
        this.spritesCategory.set(p.category, this.spritesCategory.get(p.category).filter((item) => item.name !== spriteName))
        return res
    }
    paintSprites() {
        this.sprites.forEach(sprite => {
            sprite.paint(this.context)
        })
    }
    pixelsPerFrame(time, velocity) {
        return velocity / this.fps
    }
    ppf(time, velocity) {
        this.pixelsPerFrame(time, velocity)
    } // pixelsPerFrame的别名

    startAnimate() {} // 游戏开始时的动画
    paintUnderSprites() {
        
    } // 绘制背景
    paintOverSprites() {} // 绘制前景
    endAnimate() {} // 游戏结束时的动画
    setKeyListener(keyCode, listener, isDown = true) {
        // isDown 是否按下
        this.keyListeners.set(`${keyCode}-${isDown ? 'down' : 'up'}`, listener)
    }
    getKeyListener(key,) {
        // return this.keyListeners.get(`${keyCode}-${isDown ? 'down' : 'up'}`)
        return this.keyListeners.get(key)
    }
    keydowned(e) {
        let listener = this.getKeyListener(e.keyCode + '-down')
        if (listener && this.animating) {
            listener(e)
        }
    }
    keyuped(e) {
        let listener = this.getKeyListener(e.keyCode + '-up')
        if (listener && this.animating) {
            listener(e)
        }
    }
    canPlaySound() {}
    // 待开发高分榜
    setHightScore() {}
    getHightScore() {}
    clearHighScore() {}
    canPlayOgggVorbis() {
        // 可优化为查出可播放类型后加载该类型的音频
        return '' !== this.audio.canPlayType('audio/ogg; codecs="vorbis"')
    }
    canPlayMp4() {
        return '' !== this.audio.canPlayType('audio/mp4')
    }
    getAvailableSoundChannel() {
        return this.soundChannels.find(audio => {
            if (audio.played && audio.played.length > 0) {
                if (audio.ended) {
                    return true
                }
            } else {
                if (!audio.ended) {
                    return true
                }
            }
            return false
        })
    }
    playSound(id) {
        let [track, element] = [this.getAvailableSoundChannel(), document.getElementById(id)]
        if (track && element) {
            track.src = element.src === '' ? element.currentSrc : element.src
            track.load()
            track.play()
        }
    }
    // title() {}
    // title() {}
    // title() {}
}
class SourceMap {
    constructor(sourceName, sourceType, sourceUrl) {
        // this.name = sourceName
        // this.url = sourceUrl
        this.map = new Map()
        // this.map.set(sourceName, sourceUrl)
        this.sourceLoaded = new Set()
        this.sourceFailedToLoad = new Set()
        // this.sourceLoaded = new Set()
    }
    set(sourceName, sourceType, sourceUrl) {
        this.loadSorce(sourceName, sourceType, sourceUrl)
    }
    get(sourceName) {
        return this.map.get(sourceName)
    }
    loadedPercent() {
        return this.sourceLoaded.length / this.map.keys().length * 100
    }
    loadedCb(event) {}
    loadedErrorCb(event) {}
    loadSorce(sourceName, sourceType, sourceUrl) {
        let self = this
        // 检查重复sourceName
        // 添加资源
        switch(sourceType) {
            case 'image':
                let image = new Image()
                image.src = sourceUrl
                image.addEventListener('load', (e) => {
                    self.loadedCb(e)
                    self.sourceLoaded.add(sourceName)
                })
                image.addEventListener('error', (e) => {
                    self.loadedErrorCb(e)
                    self.sourceFailedToLoad.add(sourceName)
                })
                this.map.set(sourceName, sourceUrl)
                break
            default:
                throw new Error('暂不支持该类型的资源')
                break
        }
    }
    // 因add时就已经开始加载资源了，所以不需要laodAllSource()了。
    // loadAllSource() {}
}

class Vector {
    constructor(x = 0, y = 0) {
        this.x = x
        this.y = y
        // this.magnitude = Math.hypot(this.x, this.y)
    }
    // set x(x) {
    //  this.x = x
    // }
    // setX(x) {
    //  this.x = x
    //  this.magnitude = Math.hypot(this.x, this.y)
    // }
    // setY(y) {
    //  this.y = y
    //  this.magnitude = Math.hypot(this.x, this.y)
    // }
    opposite() {
        return new Vector(-this.x, -this.y)
    }
    add(v2) {
        return new Vector(this.x + v2.x, this.y + v2.y)
    }
    subtract(v2) {
        return this.add(v2.opposite())
    }
    product(v2) {
        if (Vector.prototype.isPrototypeOf(v2)) {
            this.x *= v2.x
            this.y *= v2.y
            return this
        } else {
            this.x *= v2
            this.y *= v2
            return this
        }
    }
    magnitude() {
        return Math.hypot(this.x, this.y)
    }
    isZero() {
        return this.magnitude() === 0
    }
    isParallel(v2) {
        if (!this.magnitude() || !v2.magnitude()) {
            return false
        } else if (this.y === 0 || v2.y === 0) {
            return !this.y && !v2.y
        } else {
            return this.x / this.y === v2.x / v2.y
        }
    }
    isEquality(v2) {
        return this.x === v2.x && this.y === v2.y
    }
    quadrant () {
        if (this.x === 0 || this.y === 0) {
            return 0
        } else if (Math.sign(this.x) > 0) {
            if (Math.sign(this.y) > 0) {
                return 1
            } else {
                return 4
            }
        } else {
            if (Math.sign(this.y) > 0) {
                return 2
            } else {
                return 3
            }
        }
    }
    vertical() {
        return [new Vector(-this.y, this.x), new Vector(this.y, -this.x)] // 第一个值是顺时针方向的。第二个是逆时针方向的。
    }
    edge(v2) { // 返回边缘向量
        let [p, q] = [this.subtract(v2), v2.subtract(this)]
        return this.magnitude() > v2.magnitude() ? [p, q] : [q, p]
    }
    normalize() { // 返回单位向量
        let m = this.magnitude()
        if (m) {
            return new Vector(this.x / m, this.y / m)
        } else {
            return undefined
        }
    }
    normal() { // 返回垂直的单位向量
        let v = this.normalize()
        if (v) {
            return v.vertical()
        } else {
            return undefined
        }
    }
    dotProduct(v2) { // 返回点积
        return this.x * v2.x + this.y * v2.y
    }
    toProject(v2) { // 把当前向量投影到v2上。
        let v2n = v2.normalize()
        if (v2n) {
            return this.dotProduct(v2n)
        } else {
            return undefined
        }
    }
    radian() { // 返回该向量的弧度 [0, 2PI)
        let res
        switch(this.quadrant()) {
            case 0:

                if (this.x === 0) {
                    switch (Math.sign(this.y)) {
                        case 0:
                            res = undefined
                            break
                        case 1:
                            res = Math.PI / 2
                            break
                        case -1:
                            res = 3 * Math.PI / 2
                            break
                    }
                } else {
                    if (this.x > 0) {
                        res = 0
                    } else {
                        res = Math.PI
                    }
                }

            break
            case 1:
            case 2:
                res = Math.acos(this.x / this.magnitude())
            break
            case 3:
                let v2 = this.opposite()
                return v2.radian() + Math.PI
            break
            case 4:
                res = Math.PI * 2 + Math.asin(this.y / this.magnitude())
            break
        }
        return res
    }
    intersectionAngle(v2) {
        return Math.abs(v2.radian() - this.radian())
    }
    // 旋转
    rotate(b) {
        let curRadian = this.radian() + b
        let r = this.magnitude()
        return new Vector(r * Math.cos(curRadian), r * Math.sin(curRadian))
    }
    rebounceWithSurface() {
        let rv = this.radian()
        let rm = this.normal[0].radian()
        let rr = 2 * (Math.PI / 2 - (rv - rm))
        return this.rotate(rr)
    }
    rebounceWithAxes() {
        let rv = this.radian()
        let rm = this.normal[0].radian()
        let rr = Math.PI - 2 * Math.abs(rv - rm)
        if (rm > rv) {
            return this.rotate(-rr)
        } else if (rm === rv) {
            return this.opposite() // 为了计算快一点
        } else {
            return this.rotate(rr)
        }
    }
}

class OffsetCanvasSprite {
    constructor(spriteOpt, painter, behaviors, cwidth, cheight) {
        this.memo = new Map()
        this.width = cwidth
        this.height = cheight
        this.offsetSprite = new Sprite(spriteOpt, painter, behaviors)
        let v = spriteOpt.direction || new Vector(0, 1)
        this.direction = v
        this.setDirection(this.direction)
    }
    setDirection(v) {
        if (!Vector.prototype.isPrototypeOf(v)) {
            v = new Vector(v.x, v.y)
        }
        let n = v.normalize()
        this.direction = n
        // console.log('set', this.direction.x, this.direction.y)
        if (!this.memo.has(`${n.x}-${n.y}`)) {
            let offsetCanvas = document.createElement('canvas')
            offsetCanvas.width = this.width
            offsetCanvas.height = this.height
            let offsetContext = offsetCanvas.getContext('2d')
            // 当前只支持4个方向
            if (n.x === 0 && n.y === 1) {} else if (n.x === 1 && n.y === 0) {
                offsetContext.rotate(Math.PI / 2)
                offsetContext.translate(0, -this.height)
            } else if (n.x === 0 && n.y === -1) {
                offsetContext.rotate(Math.PI)
                offsetContext.translate(-this.width, -this.height)
            } else if (n.x === -1 && n.y === 0) {
                offsetContext.rotate(Math.PI / -2)
                offsetContext.translate(-this.width, 0)
            }
            this.offsetSprite.paint(offsetContext)
            this.memo.set(`${n.x}-${n.y}`, offsetCanvas)
        }
    }
    getCanvas(v = new Vector(0, 1)) {
        return this.memo.get(`${v.x}-${v.y}`)
        // let c = this.memo.get(`${v.x}-${v.y}`)
        // if (c) {
        //     return c
        // } else {
        //     this.setDirection(v)
        //     return this.getCanvas(v)
        // }
    }
    // getImage(v = new Vector(0, 1)) {
    //     return this.memo.get(`${v.x}-${v.y}`).getContext('2d')
    // }
}