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
    getTime(), // 
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

|||||
|-|-|-|-|
|s|1000|||
|m|60000|||
|h|3600000|||
|d|86400000|||
|m||||
|y||||