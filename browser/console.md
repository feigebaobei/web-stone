# console 命令的详解

## 1、显示信息的命令

    console.log("hello");
    console.info("信息");
    console.debug("debug");
    console.error("错误");
    console.warn("警告");

## 2、占位符

    console.log("%d年%d月%d日", 2011, 02, 16);
    console.log("%o年%d月%d日", obj);

## 3、信息分组

    console.group('第一组信息');
    	console.log('1');
    	console.log('2');
    console.groupEnd();
    console.group('第二组信息');
    	console.log('3');
    	console.log('4');
    console.groupEnd();

## 4、查看对象的所有属性和方法

    var info = {
    	blog:"http://www.email.com",
    	QQGroup: 48513458,
    };
    console.dir( info );

## 5、显示某个节点(node)的内容（所包含的 html/xml 代码）

    <div class="info">
    	<p>this is p</p>
    	<h3>this is h3</h3>
    </div>
    console.dirxml( $('.info') );

## 6、判断变量是否是真

    var i = 0;
    console.assert( i == 1 );//若判断的结果是真的，则不做事。若判断的结果是假，则输出信息且抛出一个异常

## 7、追踪函数的调用轨迹

    function nume( a, b ) {
    	console.trace();
    	return ( a + b );
    }
    nume();

最早调用的在最下面。

## 8、代码运行的时间

不能用于测试性能。

    console.time('计时器1');
    for( var i = 0; i < 10; i++ ) {
    	console.log( i );
    }
    console.timeEnd('计时器1');

## 9、性能分析

    console.profile('性能分析器');
    allnuma();
    console.profileEnd("性能分析器");

## 10/ https://developer.chrome.com/docs/devtools/console/api?hl=zh-cn#createtask

## timeStamp

console.timeStamp(label)

# $()

是`document.querySelector()`的简写。

# $$()

是`document.querySelectorAll()`的简写。
