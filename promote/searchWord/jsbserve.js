
const cssModulesPlugin = require('esbuild-css-modules-plugin');
const esbuild = require('esbuild')
esbuild.serve({
    port: 4000, // default 8000
    // hsot: 0.0.0.0 // default 0.0.0.0
    servedir: __dirname, // .
    onRequest: (obj) => {
        console.log('obj', obj)
    }
}, {
    entryPoints: ['src/index.js'],
    bundle: true,
    outdir: 'out',
    loader: {
        '.js': 'jsx',
        '.css': 'css',
    },
    splitting: true,
    format: 'esm',
    plugins: [cssModulesPlugin()]
})