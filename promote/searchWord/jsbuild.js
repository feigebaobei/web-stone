const cssModulesPlugin = require('esbuild-css-modules-plugin');

require('esbuild').build({
    entryPoints: ['src/index.js'],
    bundle: true,
    outdir: 'out',
    loader: {
        '.js': 'jsx',
        '.css': 'css',
    },
    plugins: [cssModulesPlugin()]
    // outfile: 'out.js',
}).catch(() => process.exit(1))