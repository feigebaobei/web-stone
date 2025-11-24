# 常用 sql 语句

```
创建表
CREATE TABLE table_name (
    id INT PRIMARY KEY, # 可以有多个
    name TEXT,
)

删除表
DROP TABLE table_name

清空表
TRUNCATE TABLE table_name
sqlite3没有TRUNCATE命令
DELETE FROM table_name

修改表名
ALTER TABLE table_name RENAME TO table_name2

查询表结构
PRAGMA table_info(table_name) # 我在学习时，发现在sqlite3无效

增加列
ALTER TABLE table_name ADD COLUMN column_name column_type

删除列
ALTER TABLE table_name DROP COLUMN column_name

修改列名
UPDATE table_name SET field_name=value WHERE field_name2=value2

增加行
INSERT INTO table_name (id, name, age) VALUES (1, 'one', 1)

查询行
SELECT * FROM sqlite_master

删除行
DELETE FROM table_name WHERE field_name=1

查询行
SELECT field_name FROM table_name WHERE field_name=value ORDER BY field DESC LIMIT 5










```

## 约束条件

```
WHERE
    WHERE id>10
    > < = like not
ORDER BY
    ORDER BY id ASC
    ASC
    DESC
LIKE
    LIKE "200%" // 以200开头的
    % 零个或多个字符
    _ 表示一个数字或字符
LIMIT
    LIMIT 3 OFFSET 1
    数据库表中的下标是从0开始的
GROUP BY
    GROUP BY field_name
    在WHERE之后，在ORDER BY之前
    把相同的名放在一个组合中
HAVING
    HAVING COUNT(field_name)>=2
    指定过滤条件，与GROUP BY连用
    在GROUP BY之后，再一次筛选
DISTINCT
    SELECT DISTINCT field_name FROM table_name
    与SELECT一起使用，查找出不重复的结果。
JOIN

```

## 常用函数

```
COUNT()
    SELECT COUNT(field_name) FROM table_name WHERE field_name2=value2
SUM()
    SELECT SUM(field_name) FROM table_name WHERE field_name=value
COUNT()
COUNT()
COUNT()
```
