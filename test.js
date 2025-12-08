var clog = console.log
var singleton = function (target) {
  target.prototype.getInstance = function () {}
  return target
}
// @singleton()
var A = /** @class */ (function () {
  function A(p) {
    this.p = p
    this.instance = new A(p)
  }
  return A
})()
var a = new A(1)
clog(a)
