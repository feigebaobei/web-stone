# overview
> 文本编辑器。  
> vi的加强版。  

# usage
```shell
vim --help
VIM - Vi IMproved 8.2 (2019 Dec 12, compiled Feb 28 2021 06:52:11)

Usage: vim [arguments] [file ..]       edit specified file(s)
   or: vim [arguments] -               read text from stdin
   or: vim [arguments] -t tag          edit file where tag is defined
   or: vim [arguments] -q [errorfile]  edit file with first error

Arguments:
   --			Only file names after this
   -v			Vi mode (like "vi")
   -e			Ex mode (like "ex")
   -E			Improved Ex mode
   -s			Silent (batch) mode (only for "ex")
   -d			Diff mode (like "vimdiff")
   -y			Easy mode (like "evim", modeless)
   -R			Readonly mode (like "view")
   -Z			Restricted mode (like "rvim")
   -m			Modifications (writing files) not allowed
   -M			Modifications in text not allowed
   -b			Binary mode
   -l			Lisp mode
   -C			Compatible with Vi: 'compatible'
   -N			Not fully Vi compatible: 'nocompatible'
   -V[N][fname]		Be verbose [level N] [log messages to fname]
   -D			Debugging mode
   -n			No swap file, use memory only
   -r			List swap files and exit
   -r (with file name)	Recover crashed session
   -L			Same as -r
   -T <terminal>	Set terminal type to <terminal>
   --not-a-term		Skip warning for input/output not being a terminal
   --ttyfail		Exit if input or output is not a terminal
   -u <vimrc>		Use <vimrc> instead of any .vimrc
   --noplugin		Don't load plugin scripts
   -p[N]		Open N tab pages (default: one for each file)
   -o[N]		Open N windows (default: one for each file)
   -O[N]		Like -o but split vertically
   +			Start at end of file
   +<lnum>		Start at line <lnum>
   --cmd <command>	Execute <command> before loading any vimrc file
   -c <command>		Execute <command> after loading the first file
   -S <session>		Source file <session> after loading the first file
   -s <scriptin>	Read Normal mode commands from file <scriptin>
   -w <scriptout>	Append all typed commands to file <scriptout>
   -W <scriptout>	Write all typed commands to file <scriptout>
   -x			Edit encrypted files
   --startuptime <file>	Write startup timing messages to <file>
   -i <viminfo>		Use <viminfo> instead of .viminfo
   --clean		'nocompatible', Vim defaults, no plugins, no viminfo
   -h  or  --help	Print Help (this message) and exit
   --version		Print version information and exit
```

# 三种模式
![https://img-blog.csdnimg.cn/20190323111944688.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTMwMDg3OTU=,size_16,color_FFFFFF,t_70](https://img-blog.csdnimg.cn/20190323111944688.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3UwMTMwMDg3OTU=,size_16,color_FFFFFF,t_70)  
【i】:在当前光标所在字符的前面，转为输入模式
【a】:在当前光标所在字符的后面，转换为输入模式
【o】:在当前光标所在行的下方，新建一行，并转换为输入模式：
【I】:在当前光标所在行的行首，转换为输入模式
【A】:在当前光标所在行的行尾，转换为输入模式
【O】:在当前光标所在行的上方，新建一行，并转换为输入模式;
【cc】删除当前行并输入新内容，相当于S。扩展【#cc】
【C】删除当前光标到行尾，并切换成插入模式

# 打开文件
```
vim first.md
vim +# first.md   打开first，并把光标称到第#行
#                 代表数字
vim f1 f2 f3      同时打开多个文件
    :next         切换至下一个文件
    :prev         切换至下一个文件
    :last         切换至下一个文件
    :first        切换至下一个文件
```

# 方向
【h】向左
【l】向右（小写的L）
【j】向上
【k】向下
【#COMMAND】移动#个字符

# 移到光标
【H】:当前页的页首
【M】:当前页的中间行
【L】当前页的页底
【w】移动至下一个单词的词首
【e】跳至当前或下一个单词的词尾
【b】跳至当前或前一个单词的词首
【#COMMAND】跳到第#个单词
【0】(零) ：绝对行首，光标移动到当前行的行首
【^】光标移动到当前行首的第一个非空白字符
【$】光标移动到当前行的行尾
【G】跳转到最后一行（整个文档的最后一行）
【gg或者1G】跳转到文档的第一行
【#G】跳转到第#行（文档最上为第一行）
         注意：想要跳转到最后一行可以输入【0G】也是最后一行
【)】下一句
【(】上一句
【}】下一段
【{】上一段
【Ctrl + e】向下滚动一行
【Ctrl + y】向上滚动一行
【Ctrl + d】向下滚动半屏
【Ctrl + u】向上滚动半屏
【Ctrl + f】向下滚动一屏
【Ctrl + b】向上滚动一屏
         
# 编辑
【x】删除光标处的字符
【#x】删除从光标处开始向后#个字符
【xp】光标所在处的字符和光标后面的字符对调位置
【~】转换大小写
【J】删除当前行后的换行符
【r】替换光标所在字符
【R】切换成REPLACE模式
【d】删除命令，可以结合光标跳转字符，实现范围删除
【d$】删除到行尾
【d^】删除到非空行首
【d0】删除到行首
【dd】删除光标所在行
【#dd】多行删除
【D】从当前光标位置一直删除到行尾，留空行，等同于【d$】
【de】
【dw】
【db】
【#COMMAND】
【Shift + j】删除两行质检的空行，实际上是合并两行
被删除的文件会默认复制到剪贴板。
【y】复制，可以结合光标跳转字符，实现范围复制（行为与d有类似之处）
【y$】复制到行尾
【y^】复制到非空行首
【y0】复制到行首
【yy】复制当前行
【#yy】复制多行
【Y】整行复制
【ye】
【yw】
【yb】
【#COMMAND】
【p】缓冲区存的如果为整行，则粘贴当前光标所在行的下方，否则粘贴至当前光标所在处的后面
【P】缓冲区存的如果为整行，则粘贴当前光标所在行的上方，否则粘贴至当前光标所在处的前面
【u】撤销最近的更改
【#u】撤销之前多次更改
【U】撤销光标落在这行后所有此行的更改
【按Ctrl + r】重做最后的“撤销”更改（相当于取消撤销）
【.】重做前一个操作
【#】重复前一个操作#次

# 末行模式（扩展模式）
【:q】退出
【:x】保存退出
【:wq】保存并退出
【:q!】强制退出并或略所有更改
【:e!】放弃所有修改，并打开源文件
注意：在默认模式的退出方法
【ZZ】保存并退出
【ZQ】不保存退出
附加：
【:!COMMAND】执行COMMAND命令，和shell交互
【r!COMMAND】读入命令的输出
【r filename】读取filename文件内容到当前文件中
【w filename】将当前文件内容下入filename文件中
【：start_pos,end_pos】地址定界(可以用于查找和替换等)

# 查找 & 替换
【:/PATTERN】从当前光标所在处向文件尾部查找匹配“PATTERN”相同的内容。
【:?PATTERN】从当前光标所在处向文件首部查找匹配“PATTERN”相同内容
【n】与命令同方向
【N】与命令反方向
扩展命令模型：查找并替换
【s】在扩展模式下完成查找替换操作
    修饰符：
    【i】忽略大小写
    【g】管局替换；默认情况下，每行只替换第一次出现
    【gc】全局替换，每次替换前询问
    注意：查找替换中的分隔符【/】可用其他符号替代，例如【@】【#】等
也可以指定范围。如`4s@^.*\(你好\).*@\1@ig`把第4行的`^.*\(你好\).*`替换为`1`
如：`:4,8s/^.*\(你好\).*/\1/ig`，在4-8行之间执行替换。

# 设置
【:.】重复前一次命令

【:set ruler?】查看是否设置了ruler,在.vimrc中，使用set命令设置的选项都可以通过这个命令查看

【:scriptnames】查看vim脚本文件的位置，比如.vimrc文件，语法文件及plugin等

显示非打印字符
    【:set list】显示非打印字符，比如tab,空格,行尾等。如果tab无法显示，请确定用set lcs=tab:>-命令设置了.vimrc文件，并确保你的文件中的确有tab，如果开启了expendtab，那么tab将被扩展为空格。
    【:set nolist】关闭非打印字符

行号：
【:set number】显示行号或者【:set nu】
【:set nu】关闭行号显示

大小写
【:set ignorecase】忽略区分大小写或者【:set ic】
【:set noignorecase】不忽略大小写或者【:set noic】

设置自动缩进
【:set autoindent】设置自动缩进或者【:set ai】
【:set noai】取消制动缩进

查找文本高亮显示或取消
【:set hlsearch】设置高亮显示
【:set nohlsearch】取消高亮显示

语法高亮显示
【:syntax on】开启语法高亮显示
【:synatx off】关闭语法高亮显示

辅助保留格式
【:set paste】启用复制保留格式
【:set noPaste】关闭复制保留格式

文件格式
【:set fileforma=doc】启用windows格式。或者【:set ff=doc】
【:set fileforma=unix】启用unix格式。或者【:set ff=nuix】

设置文本宽度
【:set textwidth=65】启用
【:set wrapmargin=15】禁用

设置光标所在行的标识线
【:set cursorline】或者【:set cul】启用标识线
【:set no cursorline】或者【:set not cul】禁用标识线

【:set or】查看set帮助或者【:set all】

# 可视化模式
默认模式下输入：
【v】按照字符选取,或者【ctrl + v】
【V】按矩形快选取
可视化建可用于与移动建结合使用
【w】【)】【}】箭头灯
突出显示的文字可被删除，复制，变更，过滤，搜索，替换等

# vim多窗口
语法：【vim –o|-O FILE1 FILE2 …】
           【-o】水平分割显示
           【-O】垂直分割显示
命令模式下输入【:qa】关闭所有窗口
窗口间切换：Ctrl+w,Arrow

单文件窗口分割：
【Ctrl+w,s】split,水平分割
【Ctrl+w,v】vertical,垂直分割
【Ctrl+w,q】取消相邻窗口
【Ctrl+w,o】取消全部窗口
【:wqall】退出

# vim配置文件
【/etc/vimrc】vim的全局配置文件
【~/.vimrc】用户的vim配置文件

# title
# title
# title
# title
# title
# title
