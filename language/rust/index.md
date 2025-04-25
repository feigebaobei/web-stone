# rustup
rust安装器和版本管理工具。
```shell
# 安装rust
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
```

# 安装
# cargo
rust的构建工具和包管理器

```
cargo build   构建项目
cargo run     运行项目
cargo test    测试项目
cargo doc     为项目构建文档
cargo publish 发布该库到crates.io
```

## 创建项目

# node生态&rust生态

||||||
|-|-|-|-|-|
|安装|在网站下载|使用rustup安装|||
|版本管理工具|nvm / n / xxx|rustup|||
|构建工具|-|cargo|||
|包管理器|npm / pnpm / yarn|cargo|||
||||||


# setup

1. 创建/编写 `*.rs` 文件
2. 编译。`rustc *.rs`
3. 运行可执行文件 `./*.rs`


```
cargo new greeting
cd ./greeting
cargo build
cargo run
```