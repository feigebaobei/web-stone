# <cstdio>(stdio.h)
###FILE * fopen(const char * filename, const char * mode);
打开指定文件。
使用FOPEN_MAX可以指定最多同时打开多少文件。
filename
  文件名。支持包括路径。
mode
  r 打开只读文件，该文件必须存在。
  r+ 打开可读写的文件，该文件必须存在。
  w 打开只写文件，若存在则覆盖，若不存在则建立。
  w+ 打开可读写文件，若存在则覆盖。若不存在则建立。
  a 以附加的方式打开只写文件。若文件不存在，则会建立该文件，如果文件存在，则附加。
  a+ 以附加方式打开可读写的文件。若文件不存在，则会建立该文件，如果文件存在，则附加。
  b 字符打开为二进制文件。rb、w+b或ab＋等组合，
返回一个指向流的指针，或空指针。

### int fclose (FILE * stream)
params stream
  一个指向特定流的FILE对象
return int

### int fprintf(FILE * stream, const char * format, ...);
按指定格式写入流中。

### int fscanf(FILE * stream, const char * format, ...);
从流中读出指定格式的数据。

### int printf(const char * format, ...)
按格式输出数据

### void rewind(FILE * stream)
重置流的内部指针的开始位置

### int fputc(int character, FILE * stream)
在流中写入一个字母。

### int scanf(const char * fromat, ...)
按格式从stdin中读取数据。

### void perror(const char * str)
print error message
先打印str再打印出error.
error会一直存在。

### int fflush(FILE * stream)
刷新流stream的输出缓冲区
若成功则返回零值，否则返回EOF。

### char * fgets(char * str, int num, FILE * stream);
get string from stream
从stream里复制出num字母给str。
params
  str
  num
  stream
return
  str

### int puts(const char * str);
write string to stdout

### int fputs(const char * str, FILE * stream)
write string to stream
把string写入steam

### int getc(FILE * stream)
get character from stream

### int getchar(void)
get character from stdin
return int

### char * gets(char * str)
get string from stdin

### int putc(int character, FILE * stream)
write character to stream

### int putchar(int character)
write character to stdout









