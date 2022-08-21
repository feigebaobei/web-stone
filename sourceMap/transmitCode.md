# 转码

base64、base32、base16分别编码转化8位字节为6位、5位、4位。
## base64 码值对应
```
|value|char|
|-|-|
|0|A|
|1|B|
|2|C|
|3|D|
|4|E|
|5|F|
|6|G|
|7|H|
|8|I|
|9|J|
|10|K|
|11|L|
|12|M|
|13|N|
|14|O|
|15|P|
|16|Q|
|17|R|
|18|S|
|19|T|
|20|U|
|21|V|
|22|W|
|23|X|
|24|Y|
|25|Z|
|26|a|
|27|b|
|28|c|
|29|d|
|30|e|
|31|f|
|32|g|
|33|h|
|34|i|
|35|j|
|36|k|
|37|l|
|38|m|
|39|n|
|40|o|
|41|p|
|42|q|
|43|r|
|44|s|
|45|t|
|46|u|
|47|v|
|48|w|
|49|x|
|50|y|
|51|z|
|52|0|
|53|1|
|54|2|
|55|3|
|56|4|
|57|5|
|58|6|
|59|7|
|60|8|
|61|9|
|62|+|
|63|/|
```
还有一个垫字"="。一共65个字符。
base64转码逻辑：
1. 按字符取ascii码值。
2. 每3个8bit转换为4个6bit。（`3*8 = 6*4 = 24`）
3. 每6bit前加2个0。形成4个8bit.
4. 按base64码值每8bit取一个字符。
demo:
The
84 104 101
0101 0100    0110 1000    0110 0101
010101     000110   100001   100101
00010101 00000110 00100001 00100101
21 6 33 37
VGhl

## base32 码值对应
```
|value|char|
|-|-|
|0|A|
|1|B|
|2|C|
|3|D|
|4|E|
|5|F|
|6|G|
|7|H|
|8|I|
|9|J|
|10|K|
|11|L|
|12|M|
|13|N|
|14|O|
|15|P|
|16|Q|
|17|R|
|18|S|
|19|T|
|20|U|
|21|V|
|22|W|
|23|X|
|24|Y|
|25|Z|
|26|2|
|27|3|
|28|4|
|29|5|
|30|6|
|31|7|
```
pad =

## base16 码值对应
```
|value|char|
|-|-|
|0|0|
|1|1|
|2|2|
|3|3|
|4|4|
|5|5|
|6|6|
|7|7|
|8|8|
|9|9|
|10|A|
|11|B|
|12|C|
|13|D|
|14|E|
|15|F|
```




