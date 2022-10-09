# config

## 基本结构
```
[include]
[ignore]
[untyped]
[libs]
[lints]
[options]
[version]
[declarations]
[strict]
```

||说明||demo||
|-|-|-|-|-|
|`[include]`|包含的目录、文件。每行一个。|支持 * **|||
|`[ignore]`|指定不处理的目录、文件。|`<PROJECT_ROOT>`在运行时会替换为项目的根目录。|||
|`[untyped]`|指定不检测类型的目录、文件|不明白与ignore的不同|||
|`[libs]`|不会||||
|`[lints]`|处理flow编写格式是否规范的验证||`ruleA=securityA`||
|`[options]`|看着像lint的规则||||
|`[version]`|设置版本号||||
|`[declarations]`|||||
|`[strict]`|||||
||||||
