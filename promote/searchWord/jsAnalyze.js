(async () => {
    const cssModulesPlugin = require('esbuild-css-modules-plugin');
    const esbuild = require('esbuild')
    let result = await esbuild.build({
        entryPoints: ['src/index.js'],
        entryNames: '[dir]/[name]',
        bundle: true,
        outdir: 'out',
        loader: {
            '.js': 'jsx',
            '.css': 'css',
        },
        watch: true,
        metafile: true,
        chunkNames: '[name]-[hash]',
        color: true,
        plugins: [cssModulesPlugin()]
    })
    require('fs').writeFileSync('meta.json', JSON.stringify(result.metafile))
})()