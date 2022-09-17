// 需要手动刷新页面
const cssModulesPlugin = require('esbuild-css-modules-plugin');

require('esbuild').build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outdir: 'out',
    loader: {
        '.js': 'jsx',
        '.css': 'css',
    },
    watch: true,
    // analyze: true,
    // analyzeMetafile: true,
    plugins: [cssModulesPlugin()]
    // outfile: 'out.js',
}).then(result => {
    console.log('result', result)
}).catch(() => process.exit(1))