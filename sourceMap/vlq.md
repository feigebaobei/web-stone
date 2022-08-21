# `vlq`

## overview
把整数转换为base64编码的vlq字符串。
一个base64字符可表示6bit（2^6）的数据

### feature
- 把“在计算机中保存数字”改为“在计算机中保存文本”。
- 减少体积。
- feature2

## install
`npm i vlq`

## usage
```
const vlq = require('vlq');
// or
// import vlq from 'vlq';
vlq.encode( 123 ); // '2H';
vlq.encode([ 123, 456, 789 ]); // '2HwcqxB'
vlq.decode( '2H' ); // [ 123 ]
vlq.decode( '2HwcqxB' ); // [ 123, 456, 789 ]
```

## 什么是vlq字符串
variable length quantity
数字占的空间比vlq string占的空间大。

## api
`vlq.encode(number | number[]) => string | string[]`
把数字编码为string

`vlq.decode(string) => number[]`
把字符串解码

## 限制
因整个过程会用到32bit，所以数字的范围是2^30-1或1073741823

## principle
定义a-zA-Z0-9与码值的对应表。
在编码、解码时按一定位运算逻辑从对应表中取得数据，并返回此数据。

### 每6bit的表示的含义
```
     1        1  0  1  0       1
  是否连续       具体的值        是否是负数
因为每个base 64只能使用6bit的数据，也就是可表示2^6的数据。为了可以表示更大的数据，使用6bit中的最高位表示是否与下一个6bit表示同一个数据（即：连续）。若数据很大则需要多个6bit表示。如：123456的表示结果为 xxxxxxx
每6bit中最低位表示是否是负数。0表示正数，1表示负数。
中间4bit表示具体的值。
```
### vlq编码逻辑
1. 把数字转换为二进制。
2. 按每7bit分一组。非最后一组在最高位补1，最后一组在最高位补0。因为若最高位是1则表示连续。否则表示不连续。
// demo：
```
137
128 + 8 + 1
1000 1001       // 转换为二进制
000 0001    000 1001   // 每7bit分一组
1000 0001  0000 1001   // 补1或0。
```
其结果是二进制。

### base64 vlq编码逻辑
1. 把数字x转换为二进制b。
2. 按x的正负号在b的最低位补0或1.
3. 从最低位开始，每5bit分为一组。若组内不够5bit则在最高位开始补0，直到够5bit。
4. 把组倒序排列。
5. 最后一组在最高位补0.表示不连续。其他组在最高位补1，表示连续。
6. 把每组转化为十进制。再从base64中取相应的文本。
这是比较详细的逻辑说明。实际代码中不是这么一步一步处理的。

### uml
```
```

## todo
在学习vlq时遇到过几个问题。如下：
### 1. 为什么在分段后倒序排列？这个问题是错误的。
根本不存在倒序排列。之所以在处理逻辑中这么说，是想表达从最底位开始处理。每5位处理一次。
### 2. 为什么使用base 64？为什么不使用base 32、base 16、ascii。
base64使用的都是安全字符串（即不会出错乱码）。也不是可用字符量不是太少。