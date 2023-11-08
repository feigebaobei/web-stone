# 样式穿透

## less

```
.parent-class /deep/ .inner-class {
    ...
}
```

## sass

```
.parent-class {
    & >>> .inner-class {
        ...
    }
    /deep/ .inner-class {...}
    ::v-deep .inner-class {...}
}
```

## scss

## stylus
