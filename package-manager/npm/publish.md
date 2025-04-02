在 npm 维护 package 可以方便版本更新、使用、复用。  
这篇文章里会聊从零开始在 npm 上创建发布 package.  
简单来说就是：

1. 在本地初始化包。（npm init）
2. 创建内容。（最后规范）
3. 在https://www.npmjs.com网站上注册账号。
4. 在本地用这个账号登录。（npm login, 再输 name,password,email）
5. 发布（npm publish）

以下是详细步骤。

###1. install

初装必要环境。  
node, npm

###2. register

在 npm 网站创建一个账号。  
进入官网-进入注册页面-验证邮箱地址。

###3. create

在本地创建一个目录，并进入。

    mkdir ...
    cd ...
    // 可以在no.6时执行 npm init
    // 再输入相应信息。

###4. adduser

     npm adduser

###5. login

    npm login
    //有可能是 npm adduser
    // 再输入账号、密码。

#### 报错

`409 Conflict - PUT https://registry.npm.taobao.org/-/user/org.couchdb.user:feigebaobei - [conflict] User feigebaobei already exists`
意思是：xxx 用户已经存在了。
我们想要登录和用户是否存在没有关系。登录都是登录已经存在的用户的，不存在的用户都登录不上去。
原因在于使用的 npm 注册者不对。这行报错信息中提示 npm 注册者是淘宝的代理。应该使用 npm 官方作为注册者。
解决方法：执行`npm config set registry https://registry.npmjs.org/`

#### tip

建议使用`nrm`管理注册者

```
npm i -g nrm
nrm ls // 显示可选注册者与当前使用的注册者
nrm use npm // 使用指定的注册者
```

###6. 创建基本内容

README.md // 介绍当前 package，可以不创建。  
npm init // 根据 readme 生成 package.json 文件。  
index.js // 与 package.json 里的 main 值一样。它是作为入口文件的。  
再创建 package 的内容。包文档结构如下：

![](../../image/npm/docuConstruct.jpg)

`src/assets` 是用来放置资源。  
`src/assets/basic` 我个人习惯用来放置基本内容。可以不管。  
`src/assets/img` 是用来放置图片。  
`src/conponents` 是用来放置组件。  
`src/conponents/vueName` 是用来放置当前组件需要的子组件。  
`src/conponents/vueName/index` 一般是该子组件的主体。  
`src/lib` 所有组件需要的数据资源。  
`.gitignore` 指定需要 git 忽略的内容。  
`index` 当前包的入口文件。  
`package` 当前包的信息。  
`README.md` 介绍当前包。

当前包的入口文件中 index.js 文件。在该文件中输出各个组件。

    // package/index.js
    import first from './src/components/first'
    import second from './src/components/second'
    export {
      first,
      second
    }

###7. 测试

分为 npm 模块、项目。
若模块、项目不在同一个目录下，可以使用相对路径。

```
npm link ../module
```

若不在同一目录下，可以使用全局路径。

```
cd 模块目录
npm link
// up to date in 0.206s
// /Users/feige/.nvm/versions/node/v12.13.0/lib/node_modules/token_sdk_client -> /Users/feige/Documents/code/github/tokenSDKClient

cd 项目目录
npm link module_name
// /Users/feige/Documents/code/github/mockvue/node_modules/token_sdk_client -> /Users/feige/.nvm/versions/node/v12.13.0/lib/node_modules/token_sdk_client -> /Users/feige/Documents/code/github/tokenSDKClient
```

解除 link

```
cd 模块目录
npm unlink

cd 项目目录
npm unlink module_name
```

#### 有可能报错

`No ESLint configuration found`
原因是在模块项目中没有`.eslintrc.js`文件。不是模块代码有错。与使用`vue-cli*`没关系。
解决方法：删除`.eslintrc.js`（若没有则不用删除）。执行

```
npm i -g eslint
eslint --init
// 会在模块的根目录生成`.eslintrc.js`。这个文件中eslint的配置文件。若有不编码风格，可以在该文件里设置。若不知道怎么设置就去官网看看。https://eslint.org/
```

###8. 发布

    npm publish

    <!-- package name 已经被注册 -->
    npm ERR! publish Failed PUT 403
    npm ERR! code E403
    npm ERR! Package name too similar to existing packages; try renaming your package to '@feigebaobei/secondtest' and publishing with 'npm publish --access=public' instead : secondtest

    <!-- 邮箱未验证 -->
    <!-- 镜像问题 -->

    nrm ls

    * npm -------- https://registry.npmjs.org/
      yarn ------- https://registry.yarnpkg.com/
      cnpm ------- http://r.cnpmjs.org/
      taobao ----- https://registry.npm.taobao.org/
      nj --------- https://registry.nodejitsu.com/
      npmMirror -- https://skimdb.npmjs.com/registry/
      edunpm ----- http://registry.enpmjs.org/
      newssdk ---- http://10.0.68.202:4873/

####issue

##### 1

    // 报错
    npm ERR! publish Failed PUT 401
    npm ERR! code E401
    npm ERR! 404 unauthorized Login first: firstasdfqwer1234
    npm ERR! 404
    npm ERR! 404  'firstasdfqwer1234' is not in the npm registry.
    npm ERR! 404 You should bug the author to publish it (or use the name yourself!)
    // 解决方法
    npm config set registry https://registry.npmjs.org/
    npm adduser
    npm login
    npm publish

    // 报错
    Package name triggered spam detection; if you believe this is in error, please contact support@npmjs.com : firstasdfqwer1234
    // 解决方法
    // 改为正常的名字

##### 2

```
npm ERR! path C:\Users\Admin\AppData\Local\Temp\npm-12284-cd09bc74\tmp\fromDir-8703ef80\package.tgz
npm ERR! code EPERM
npm ERR! errno -4048
npm ERR! syscall unlink
npm ERR! Error: EPERM: operation not permitted, unlink 'C:\Users\Admin\AppData\Local\Temp\npm-12284-cd09bc74\tmp\fromDir-8703ef80\package.tgz'
npm ERR!  { Error: EPERM: operation not permitted, unlink 'C:\Users\Admin\AppData\Local\Temp\npm-12284-cd09bc74\tmp\fromDir-8703ef80\package.tgz'
npm ERR!   cause:
npm ERR!    { Error: EPERM: operation not permitted, unlink 'C:\Users\Admin\AppData\Local\Temp\npm-12284-cd09bc74\tmp\fromDir-8703ef80\package.tgz'
npm ERR!      errno: -4048,
npm ERR!      code: 'EPERM',
npm ERR!      syscall: 'unlink',
npm ERR!      path: 'C:\\Users\\Admin\\AppData\\Local\\Temp\\npm-12284-cd09bc74\\tmp\\fromDir-8703ef80\\package.tgz' },
npm ERR!   isOperational: true,
npm ERR!   stack: 'Error: EPERM: operation not permitted, unlink \'C:\\Users\\Admin\\AppData\\Local\\Temp\\npm-12284-cd09bc74\\tmp\\fromDir-8703ef80\\package.tgz\'',
```

大概意思是说没有登录.需要使用`npm login`登录。

使用`npm login`登录时，输入 Username/Password/Email 后，提示：

##### 3

```
npm ERR! code E409
npm ERR! Registry returned 409 for PUT on http://registry.npm.taobao.org/-/user/org.couchdb.user:feigebaobei: [conflict] User feigebaobei already exists
```

去网上搜了一下，原因是淘宝镜像的问题。

`npm config set registry http://registry.npm.org`

npm config [set | get | delete | list | edit]

##### 4

执行`npm publish`后，提示发布的版本号（说明已经发布成功）。
去 npm 网站上查询，结果是没有该包。在作者的 packages 里没有找到相应的包。不会中因为缓存的问题。
再执行`npm publish`后，仍提示发布的版本号。（没有升级版本号）。应该提示“因版本号冲突，发布失败”的消息。
再去 npm 网站上查询仍没有结果。
原因是执行`npm publish`时使用非`https://registry.npmjs.org/`。
使用淘宝等代理都会发布失败。

###9. 删除

当前包的作者可以删除。admin 角色（24 小时内可删除）

    npm unpublish packagename --force

当前团队的拥有者或 owner 角色。点击删除按钮可把该 package 从 team 中删除。

###10. 不足

npm 还有一些不足。eg:1.协作者不能删除 package.2.多个协作者不能同时编辑同一个 package.3.无法删除 org。4.24h 后不可删除该包。

---

2018/11/06 by stone

发布到指定源。方法有多种：

```
方法一
npm config set registry http://nexus.dsv.myhost/nexus/repository/npmjs
方法二
npm config set @<your scope here>:registry http://nexus.dsv.myhost/nexus/repository/npmjs
方法三
package.json
{
  ...
  "publishConfig": {
    "registry": "http://nexus.dsv.myhost/nexus/repository/npmjs"
  },
  ...
}
方法四
.npmrc
registry=http://nexus.dsv.myhost/nexus/repository/npmjs
```
