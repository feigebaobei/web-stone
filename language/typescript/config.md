# config of ts
配置文件是：`tsconfig.json / jsconfig.json`  
配置文件是为`tsc`命令服务的。

## usage
- 使用`--project / -p`。指定已经存在的配置文件的目录。则要此配置文件执行转换。
- 不使用当前目录链中存在的配置文件执行转换。

## demo
```json
{
    "compilerOptions": {
        "module": "commonjs",
    },
    "files": [
        "core.ts",
        "sys.ts",
        "types.ts"
    ],
    "include": ["src/**/*", "tests/**/*"]
}
```

# 配置文件的各字段说明
||||||
|-|-|-|-|-|
|type checking||类型检测|||
|files||指定程序中包含的文件允许列表。如果找不到任何一个，就会出现错误。|||
|extends||不编译的文件，相对于配置文件所在的目录。|`*`匹配0或多个字母 `?`匹配1个字母 `**/`匹配一个目录||
|include||编译的文件，相对于配置文件所在的目录。|||
|allowUnreachableCode|处理不能到达的代码|undefined(default)在编辑器中提示建议 true忽略 false提示错误 |||
|alwaysStrict||是否使用严格模式处理每一个源文件|||
|exactOptionalPropertyTypes||不知道ts怎么处理可选属性的。|||
|noFallthroughCasesInSwitch||处理switch方法中的错误|||
|noImplicitAny||是否默认使用any类型|||
|noImplicitOverride||子类是否可重写父类中的属性|||
|noImplicitReturns||是否要求方法必须返回值|||
|noImplicitThis||是否默认this是any类型|||
|noPropertyAccessFromIndexSignature||是否允许使用一致的语法访问数据。|||
|noUncheckedIndexedAccess||是否允许设置不知道key知道value的数据。|||
|noUnusedLocals||是否对未使用的变量提出错误|||
|noUnusedParameters||-|||
|strict|||||
|strictBindCallApply||是否处理当使用abc改变this的方法的参数|||
|strictFunctionTypes||是否严格使用方法类型|||
|strictNullChecks||是否严格处理null/undefined|||
|strictPropertyInitialization||是否严格init时有数据|||
|useUnknownInCatchVariables||是否允许在catch中使用不知道的变量|||
|modules||模块|||
|allowUmdGlobalAccess||是否可使用ump格式的包|||
|baseUrl||设置基本目录|||
|module||设置编写规范|`'CommonJS'``'UMD'``'AMD'``'System'``'ESNext'``'ES2020'``'ES2015/ES6'``'node16/nodenext'``'None'`||
|moduleResolution||设置模块的解决策略|||
|moduleSuffixes||设置模块的后缀|||
|noResolve|||||
|paths||设置从哪个目录中取包|||
|resolveJsonModule||是否可引入json文件|||
|rootDir||设置ts编译的根目录。与outDir的目录结构一致。|||
|rootDirs||设置多个根目录。数组型。|||
|typeRoots||设置返回声明文件的目录。数组型。|||
|types||数组型|||
|emit||忽略|||
|declaration||是否生成声明文件|||
|declarationDir||设置忽略的声明文件目录|||
|declarationMap|||||
|downlevelIteration|||||
|emitBox|||||
|emitDeclarationOnly|||||
|importHelpers|||||
|inlineSourceMap|||||
|inlineSources|||||
|mapRoot|||||
|newLine|||||
|noEmit|||||
|noEmitHelpers|||||
|noEmitOnError|||||
|outDir||输出目录。内部结构与rootDir(s)相同|||
|outFile|||||
|preserveConstEnums|||||
|preserveValueImports|||||
|removeComments||删除注释|默认false||
|sourceMap|||||
|sourceRoot|||||
|stripInternal|||||
|javascript support|||||
|allowJs||是否允许使用js|||
|checkJs|||||
|maxNodeModuleJsDepth|||||
|Editor Support|||||
|disableSizeLimit||限制文件的最大值|||
|plugins||设置插件|||
|interop Constraints|||||
|allowSyntheticDefaultImports||允许合成默认值|||
|esModuleInterop|||||
|forceConsistentCasingInfileNames|||||
|isolatedModules|||||
|preserveSymlinks|||||
|backwards compatibility|||||
|charset|||||
|keyofStringsOnluy|||||
|noImplicitUseStrict|||||
|noStrictGenericChecks|||||
|suppressExcessPropertyErrors|||||
|suppressImplicitAnyIndexErrors|||||
|language and Environment|||||
|emitDecoratorMetaData|||||
|experimentalDecorators|||||
|jsx|||||
|jsxFactory|||||
|jsxFragmentFactory|||||
|jsxImportSource|||||
|lib|||||
|moduleDetection|||||
|noLib|||||
|reactNamespace|||||
|target|||||
|useDefineForClassFields|||||
|Compiler Diagnostics|||||
|explainFiles|||||
|extendedDiagnostics|||||
|generateCpuProfile|||||
|listEmittedFiles|||||
|listFiles|||||
|traceResolution|||||
|Project|||||
|composite|||||
|comosite|||||
|disableReferencedProjectLoad|||||
|disableSolutionSearching|||||
|disabledSourceOfProjectReferenceRedirect|||||
|incremental|||||
|tsBuildInfoFile|||||
|Output Formatting|||||
|onErrorTruncation|||||
|preseveWatchOutput|||||
|pretty|||||
|Completeness|||||
|skipDefaultLibCheck|||||
|skipLibCheck|||||
|CommandLine|||||
|Watch Options|||||
|assumeChangesOnlyAffectDirectDependencies|||||
|watchFile|||||
|watchDirectory|||||
|fallbackPolling|||||
|synchronousWatchDirectory|||||
|excludeDirectories|||||
|excludeFiles|||||
|Type Acquisition|||||
|enable|||||
|include|||||
|exclude|||||
|disableFilenameBasedTypeAcquisition|||||

# options
下列是`tsc`的选项。  
不用全记。在实际项目中大多不会全用上。记一些常用的够用就行了。能全记住最好了。  
好多选项的命名方式大多相同。看一遍选项大概也能明白它的功能。  
优点：使用驼峰命名法。

|常用的||||||
|-|-|-|-|-|-|
|--all|显示所有转换项|||||
|--build -b|编译所有项目中的依赖|||||
|--init|显示所有转换项|||||
|--listFilesOnly||||||
|--locale||||||
|--project -p|使用指定的配置文件|||||
|--watch -w|监听指定的文件|||||
|--allowJs|是否允许使用`*.js`文件|||||
|--checkJs|是否检测js文件的类型检测|||||
|--maxNodeModuleJsDeptg|node_modules的最大深度|||||
|--baseUrl|指定相对目录|||||
|--module -m|指定输出模式|||||
|--rootDir|指定根目录|||||
|--noImplicityAny|是否检测any类型的错误|||||
|--noUnusedParameters|是否检测未使用的参数|||||
|--strict|是否严格使用要类型检测|||||
|--strictNullChecks|是否严格检测null / undefined|||||
|--declaration -d|是否为ts/js文件生成.d.ts文件。|||||
|--declarationDir|注解文件的目录|||||
|--inlineSourceMap|显示所有转换项|||||
|--outDir|指定生成文件的目录|||||
|--outFile|指定生成文件|||||
|--removeComments|删除注释|||||
|--sourcemap|是否为js文件生成source map文件|||||
|--listFile|列出所有转换的文件|||||
|--jsx|指定哪种jsc代码被生成。|preserve/react-native/react/react-jsx/react-jsxdev||||
|--target|转换的目标es版本|||||
|--pretty|美化当编译出错时的输出文本|||||
|--skipLibCheck|跳过检测.d.ts文件|||||
|--watchFile|监听指定的文件变化|||||
|--excludeDirectories|排除监听的目录|||||
|--excludeFiles|排除监听的文件|||||
|--verbose -v|停止编译|||||
|--dry|列出将要被编译的文件|||||
|--clean|删除output指定的文件|||||
|--force -f|构建所有项目，包括那些看起来是最新的项目|||||

|||||||
|-|-|-|-|-|-|
|--all|列出所有转换项|||||
|--generateTrace||||||
|--help||||||
|--init|生成配置文件|||||
|--listFilesOnly||||||
|--locale||||||
|--project|使用指定的配置文件|||||
|--showConfig|列出配置项|||||
|--version|列出tsc的版本|||||
|--build|编译所有项目中的依赖|||||
|--clean|删除output指定的文件|||||
|--dry|列出将要被编译的文件|||||
|--force|构建所有项目，包括那些看起来是最新的项目|||||
|--verbose|停止编译|||||
|--excludeDirectories|排除监听的目录|||||
|--excludeFiles|排除监听的文件|||||
|--fallbackPolling||||||
|--synchronousWatchDirectory||||||
|--watch|监听指定的文件|||||
|--watchDirectory||||||
|--watchFile||||||
|--allowJs|是否允许使用`*.js`文件|||||
|--removeComments|是否删除注释|||||
|--noImplicitAny|当使用含蓄的`any`时是否报错|||||
|--declaration|是否根据`*.ts/*.js`生成`*.d.ts`|||||
|--module|指定生成模块|||||
|--jsx|设置如何转化jsx代码|||||
|--outDir|设置生成文件的目录|||||
|--sourcemap|是否为js文件生成source map文件|||||
|--target||||||
|--noResolve||||||
|--mapRoot||||||
|--charset||||||
|--emitBOM||||||
|--noLib||||||
|--preserveConstEnums||||||
|--suppressImplicitAnyIndexErrors||||||
|--noEmitHelpers||||||
|--inlineSourceMap||||||
|--newLine||||||
|--isolatedModules||||||
|--emitDecoratorMetadata||||||
|--rootDir||||||
|--experimetalDecorators||||||
|--moduleResolution||||||
|--suppressExcessPropertyErrors||||||
|--reactNamespace||||||
|--skipDefaultLibCheck||||||
|--allowUnusedLabels||||||
|--noImplicitReturns||||||
|--noFallthroughCasesInSwitch||||||
|--allowUnreachableCode||||||
|--forceConsistentCasingInFileNames||||||
|--allowSyntheticDefaultImports||||||
|--noImplicitUseStrict||||||
|--lib||||||
|--baseurl||||||
|--declarationDir||||||
|--noImplicitThis||||||
|--skipLibCheck||||||
|--strictNullChecks||||||
|--noUnusedLocals||||||
|--unUnusedParameters||||||
|--alwaysStrict||||||
|--importHelpers||||||
|--jsxFactory||||||
|--stripInternal||||||
|--checkJs||||||
|--downlevelIteration||||||
|--strict||||||
|--noStrictGenericChecks||||||
|--preserveSymlinks||||||
|--strictFunctionTypes||||||
|--strictPropertyInitialization||||||
|--esModuleInterop||||||
|--emitDeclarationOnly||||||
|--keyofStringsOnly||||||
|--useDefineForClassFields||||||
|--declarationMap||||||
|--resolveJsonModule||||||
|--strictBindCallApply||||||
|--noEmitOnError||||||