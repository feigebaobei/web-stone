demo.md
```
npm install -g express-generator typescript
express
tsc --init
// 创建<root>/app.ts
// 把<root>/app.js的内容复制到<root>/app.ts中。
npm i -D @types/node
npm set-script dev "tsc app.ts"
npm run dev
npm run start
// 预期结果是在`localhost:3000`中可访问
```