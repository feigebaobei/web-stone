# `typescript`

## overview

> typescript 的包。
> 在命令行中使用 tsc

### feature

- 根据配置文件转换本地项目。

## install

`npm i typescript -g`

## usage

```
tsc
// 使用配置文件编译
tsc index.ts
// 编译index.ts
tsc src/*.ts
// 编译src目录下的ts文件
tsc --project tsconfig.production.json
// 指定配置文件
tsc index.js --declaration --emitDeclarationOnly
// 指定配置项
// 为js文件设置注解文件
tsc app.ts utils.ts --target esnext --outfile index.js
// 编译为一个js文件。index.js
```

## compiler options

默认配置文件：`<root>/tsconfig.json`。  
[官网地址](https://www.typescriptlang.org/docs/handbook/compiler-options.html)  
|key|description|default|enum|demo|||
|-|-|-|-|-|-|-|
|--all|||||||
|--generateTrace|||||||
|--help|||||||
|--init|生成`tsconfig.json`||||||
|--listFilesOnly||||||
|--locale|||||||
|--project|||||||
|--showConfig|||||||
|--version|||||||
|--build|||||||
|--clean|||||||
|--dry|||||||
|--force|||||||
|--verbose|||||||
|--excludeDirectories|||||||
|--excludeFiles|||||||
|--fallbackPolling|||||||
|--synchronousWatchDirectory|||||||
|--watch|||||||
|--watchDirectory|||||||
|--watchFile|||||||
|--allowJs|||||||
|--allowSyntheticDefaultImports|||||||
|--allowUmdGlobalAccess|||||||
|--allowUnreachableCode|||||||
|--allowUnusedLabels|||||||
|--alwaysStrict|||||||
|--assumeChangesOnlyAffectDirectionDependencies|||||||
|--baseUrl|||||||
|--charset|||||||
|--checkJs|||||||
|--composite|||||||
|--declaration|||||||
|--declarationDir|||||||
|--declarationMap|||||||
|--diagnostics|||||||
|--disableReferencedProjectLoad|||||||
|--disabledSizeLimit|||||||
|--disabledSolutionSearching|||||||
|--disableSourceOfProjectReferenceRedirect|||||||
|--downLevelIteration|||||||
|--emitBOM|||||||
|--emitDeclarationOnly|||||||
|--emitDecoratorMetadata|||||||
|--esModuleInterop|||||||
|--exactOptionalPropertyTypes|||||||
|--experimentalDecorators|||||||
|--explainFiles|||||||
|--extendedDiagnostics|||||||
|--forceConsistentCasingInFileNames|||||||
|--generateCpuProfile|||||||
|--importHelpers|||||||
|--importsNotUsedAsValues|||||||
|--incremental|||||||
|--inlineSourceMap|||||||
|--inlineSources|||||||
|--isolatedModules|||||||
|--jsx|||||||
|--jsxFactory|||||||
|--jsxFragmentFactory|||||||
|--jsxImportSource|||||||
|--keyofStsringsOnly|||||||
|--lib|||||||
|--listEmittedFiles|||||||
|--listFiles|||||||
|--mapRoot|||||||
|--maxNodeModuleJsDepth|||||||
|--module|||||||
|--moduleResolution|||||||
|--newLine|||||||
|--noEmit|||||||
|--noEmitHelpers|||||||
|--noEmitOnError|||||||
|--noErrorTruncation|||||||
|--onFallthroughCasesInSwitch|||||||
|--noImplicitAny|||||||
|--noImplicitOverride|||||||
|--noImplicitReturns|||||||
|--noImplicitThis|||||||
|--noImplicitUseStrict|||||||
|--noLib|||||||
|--noPropertyAccessFromIndexSignature|||||||
|--noResolve|||||||
|--noStrictGenericChecks|||||||
|--noUncheckedIndexedAccess|||||||
|--noUnusedLocals|||||||
|--noUnusedParameters|||||||
|--out|||||||
|--outDir|||||||
|--outFile|||||||
|--paths|||||||
|--plugins|||||||
|--preserveConstEnums|||||||
|--preserveSymlinks|||||||
|--preserveValueImports|||||||
|--preserveWatchOutput|||||||
|--pretty|||||||
|--reactNamespace|||||||
|--removeComments|||||||
|--resolveJsonModule|||||||
|--rootDir|||||||
|--rootDirs|||||||
|--skipDefaultLibCheck|||||||
|--skipLibCheck|||||||
|--sourcemap|||||||
|--sourceroot|||||||
|--strict|||||||
|--strictBindCallApply|||||||
|--strictFunctionTypes|||||||
|--strictNullChecks|||||||
|--strictPropertyInitialization|||||||
|--stripInternal|||||||
|--suppressExcessPropertyErrors|||||||
|--suppressImplicitAnyIndexErrors|||||||
|--target|||||||
|--traceResolution|||||||
|--tsBuildInfoFile|||||||
|--typeRoots|||||||
|--types|||||||
|--useDefineForClassFields|||||||
|--useUnknownInCatchVariables|||||||

## tsc & babel

|     | tsc                  | babel                |     |
| --- | -------------------- | -------------------- | --- |
|     | 可以生成\*.d.ts 文件 | 不会生成\*.d.ts 文件 |     |
|     |                      |                      |     |

## todo

> 未来迭代计划。
> 未来迭代计划。
> 未来迭代计划。
