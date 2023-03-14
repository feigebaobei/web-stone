|                                    |                                                       |
| ---------------------------------- | ----------------------------------------------------- |
| use databasename                   | 在 mysql 工作区的数据库                               |
| show databases                     |                                                       |
| show tables                        |                                                       |
| show columns from tablename        | 显示属性、属性类型...                                 |
| show index from tablename          | 所有指标的详细信息表                                  |
| show table status like tablename\g | 报告 mysql 的数据库管理系统的性能和统计数据的详细信息 |

##创建数据库

    craeta database dbname;

##删除 database

    drop database dbname;

##使用 database

    use dbname;

##数据类型

主要有：number, date, time, string

| number       |                                      |
| ------------ | ------------------------------------ |
| int          |                                      |
| tinyint      |                                      |
| smallint     |                                      |
| mediumint    |                                      |
| bigint       |                                      |
| float        |                                      |
| double(m,d)  | 双精度浮点。m:显示长度。d:小数位数。 |
| decimal(m,d) | 非压缩浮点                           |

| date      |                     |
| --------- | ------------------- |
| date      | YYYY-MM-DD          |
| datetime  | YYYY-MM-DD HH:MM:SS |
| timestamp | YYYYMMDDHHMMSS      |
| time      | HH:MM:SS            |
| year(M)   |                     |

| string                   |                                      |
| ------------------------ | ------------------------------------ |
| char(m)                  |                                      |
| varchar(m)               | 必须                                 |
| blob or text             | blob 区分大小写，text 不区分大小写。 |
| tinyblob or tinytext     |                                      |
| mediumblob or mediumtext |                                      |
| longblob or longtext     |                                      |
| enum                     | 枚举                                 |

##create table

    create table tablename (columnname columntype);

    CREATE TABLE tutorials_tbl(
    tutorial_id INT NOT NULL AUTO_INCREMENT,
    tutorial_title VARCHAR(100) NOT NULL,
    tutorial_author VARCHAR(40) NOT NULL,
    submission_date DATE,
    PRIMARY KEY ( tutorial_id )
    );

##del table

    drop table tablename;

## insert data

    insert into tablename (field0, field1, field2...) values (value0, value1, value2...);

## select

    select field0, field1, field2 tablename, tablename2... [where clause] [offset m] [limit n];

##update

    update tn set field = value, [field2 = value2, ...] [where field = value, field2 = value2];

##where

    select field0, field1, field2 tablename1, tablename2... [where condition1 [and [or]] condition2...];

## del

    delete from tablename [where clause];

##like
like 可以与 % 一起使用。

    select field0, field1, field2 tn, tn2, tn3 where field1 like condition0 [an [or]] field2 = 'string';

##order by

    select field1... from tn [where condition] order by field1, [field2...] [asc [desc]];

##join

    select a.id, b.author from tn1 a, tn2 b where a.id = b.author;

##null

    is null
    is not null

##regexp

    ... where name regexp 'value&';

##事务性质

- 原子性
- 一致性
- 隔离
- 持久性

##alter

添加、删除表字段。

    alter table tn drop fieldname; // 若删除最后一列则会失败。
    alter table tn add column field int; // 添加一个i列，类型是int.

更改列定义、名称。  
modify/change

    alter table tn modify fieldname char(10); // 更改类型
    alter table tn change i j int;

设置默认值

    alter table tn alter field set default 1000;

删除默认值

    alter table tn alter fieldname drop default;

##更改表类型

    alter table tn type = myisam;
    show table status like 'value$'\g;

    alter table tn rename to tn2;

##查看表结构

    desc tablename;

##索引

###唯一索引

    create unique index index_name on tn (column1, column2...);
    create unique index author_index on tn (field desc);

###add/del index

    alter table tn add primary key (column_list);
    alter table tn add unique index_name (column_list);
    alter table tn add index index_name (column_list);
    alter table tn add pulltext index_name (column_list);
    alter table tn drop primary key;

    show index from tn\g;

## mysql 临时表

    create temporary table tn (fieldname0 varchar(50) not null, ...);
    // 可以 insert...
    dorp table tn;

##复制表

1. 查看表详情。
2. 创建一个一模一样的表。
3. 把表里的所有数据插入到新表。

```
    show create table tn\g;
    create table clonetn (field int(11), ...) type=myisam;
    insert into clonetn (field, ...) select field, ... from tn;
```

##获取服务器元数据

- select version()
- select database()
- select user()
- show status
- show variables

##导出数据

    select * from tn into outrile 'C:\xx.txt';

    masqldump -u root -p dbname tn > dump.txt;
    password ****

##导入数据

    load data local infile 'C:\dump.txt' into table tn;
    mysqlimport -u root -p --loacl dbname dump.txt;
    password ****

---

2018/10/27 by stone
