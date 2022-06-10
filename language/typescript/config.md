# config of ts
配置文件是：`tsconfig.json / jsconfig.json`  

## usage
- 使用`--project / -p`。指定已经存在的配置文件的目录。则要此配置文件执行转换。
- 不使用当前目录链中存在的配置文件执行转换。

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