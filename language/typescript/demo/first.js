// import { type } from "os"
var clog = console.log;
var A = /** @class */ (function () {
    function A(a) {
        this.a = 0;
        this.a = a;
    }
    A.prototype.b = function () {
        clog('b');
    };
    return A;
}());
var B = /** @class */ (function () {
    // b: () => void
    // d: () => void
    function B() {
        this.a = 2;
    }
    B.prototype.b = function () {
        clog('b');
    };
    B.prototype.d = function () {
        clog('d');
    };
    B.c = 2;
    return B;
}());
var b = new B();
// B.b()
clog(B.c);
// B.d()
