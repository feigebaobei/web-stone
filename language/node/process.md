# process

process.cwd() 当前 node.js 进程的工作目录
process.chdir(directory) 改变当前工作进程，若失败，则抛出异常。
process.memoryUsage() 返回一个对象，描述 node 进程的内存使用情况。包括 rss(常驻集大小)heapTotal(堆的总空间)heapUsed(已使用的堆空间)external(外部内存使用量)
process.uptime() 已经运行的秒数
process.hrtime() 返回当前的高分辨时间，形式为[秒、纳秒]的元组数组。它不受时钟漂移的影响。主要用于精确测量时间间隔
process.kill(pid, [signal]) 向指定 pid 的进程发送一个信号，如无指定信号，则默认发送'SIGTERM'
process.abort() 触发 node 的 abort 事件，导致 node 进程异常终止并生成一个核心文件。
process.exit([code]) 终止当前进程并返回给定的退出码。code 默认是 0.0 表示成功。
process.exitCode() 自定义退出码。当进程正常结束或使用 process.exit()时，该码被 node shell 捕获。
process.stdout 这些是标准 I/O 流。分别表示标准输出，标准错误，标准输入。它们是可写的流可或读的流。
process.stderr
process.stdin
process.nextTick(cb) 将回调函数排入队列，在当前事件循环的下一个迭代中执行。这是一种高效的方式来处理需要在当前操作完成后立即执行的任务。
process.on(event, listener) 监听进程事件。如监听'uncaughtException'事件捕获未处理的异常，防止进程异常退出。
