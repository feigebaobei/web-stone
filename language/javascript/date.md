# overview

时间

# usage

```js
new Date()
new Date(value);
new Date(dateString);
new Date(year, monthIndex [, day [, hours [, minutes [, seconds [, milliseconds]]]]]);
```

# 属性 & 方法

```js
date: {
    constructor,
    prototype,
    getDate(), // 返回一个月中的当前日期。
    getDay(), // 返回星期几。星期日是第一个星期。
    getMonth(), // 返回第几个月份。从0开始数。
    getFullYear(), // 返回4位数字的年份。
    getHours(),  // 返回小时数（0-23）
    getMinutes(), // 返回分钟数（0-59）
    getSeconds(), // 返回秒数（0-59）
    getTime(), // 得到ms值
    now(),返回从1970.01.01至今的毫秒数。
    getTimezoneOffset(),返回本地时间与格林威治标准时间（GMT）的分钟差。
    getUTCDate(),根据世界时从Date对象中返回月的当前日期。
    getUTCDay(),
    getUTCMonth(),
    getUTCFullYear(),
    getUTCHours(),
    getUTCMinutes(),
    getUTCSeconds(),
    getUTCMilliseconds(),
    parse(dateString)(),
    setDate(number), // number 数字 必填  设置date对象中的日期。
    setMonth(number),
    setFullYear(number),
    setHours(number), // [0, 23]
    setMinutes(number), // [0, 59]
    setSeconds(number), // [0, 59]
    setMilliseconds(number), // [0, 999]
    setTime(number), // 以毫秒设置date对象。
    setUTCDate(number), // [1, 31]
    setUTCMonth(number), // [0, 11]
    setUTCFullYear(number), // 4位数字
    setUTCHours(number), // [0， 23]
    setUTCMinutes(number), // [0， 59]
    setUTCSeconds(number), // [0， 59]
    setUTCMilliseconds(number), // [0， 999]
    toSource(), //
    toString(),
    toTimeString(), // 将time部分（时、分、秒、及后面的）转换为字符串。
    toDateString(), // 将date部分（星期、月、日、年）转换为字符串。
    toUTCString(),
    toLocalString(),
    toLocalTimeString(),
    toLocalDateString(),
    UTC(year(4位), mounth, day, hours, minutes, seconds, ms), // 返回1970.01.01到指定时间的毫秒数。
    valueOf(),
}
```

|     |          |     |     |
| --- | -------- | --- | --- |
| s   | 1000     |     |     |
| m   | 60000    |     |     |
| h   | 3600000  |     |     |
| d   | 86400000 |     |     |
| m   |          |     |     |
| y   |          |     |     |

# 时间

## GMT / UTC

GMT 是格林尼治时间。从本初子午线开始计算的时间。就是实际的时间。因地球自转不均匀，导致不能推广使用。
UTC 是协调时间。是在 GMT 上加减闰秒，它与 gmt 相差不超过 0.9s.它是以原子时秒长为基础的。
只要你不是搞导弹的。2 种时间就可以等效使用。

## 时区

从英国的格林尼治天文台旧址为零时区。把地球分为 24 个时区。北京处于东 8 区（GMT+8）。

## unix 时间戳(unix timestamp)

单位是 s.
从 1940-01-01T00:00:00 为起点。
Math.round(Date.now() / 1000)

## 时间格式

| 格式 | 说明         | 示例 |                                                  |
| ---- | ------------ | ---- | ------------------------------------------------ |
| CST  | 北京时间     |      | Sun Aug 30 2020 23:07:43 GMT+0800 (中国标准时间) |
| GMT  | 格林尼治时间 |      | Sun, 30 Aug 2020 15:09:23 GMT                    |
| UTC  | 国际协调时间 |      |                                                  |
| ISO  | 标准时间     |      | 2020-08-30T15:09:23.786Z                         |
|      |              |      |                                                  |
